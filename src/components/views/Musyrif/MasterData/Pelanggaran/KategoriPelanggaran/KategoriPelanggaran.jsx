import React, { useEffect, useState } from "react";
import {
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/supabaseClient";
import CreateKategoriPelanggaran from "./CreateDialog/KategoriPelanggaranCreate";
import DeleteKategoriPelanggaranDialog from "./DeleteDialog/Delete";
import EditKategoriPelanggaranData from "./EditDialog/EditDialog";

const KategoriPelanggaran = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jenisFilter, setJenisFilter] = useState("all");
  const [kategoriFilter, setKategoriFilter] = useState("all");
  const [KategoripelanggaranSantri, SetKategoriPelanggaran] = useState([]);
  const [JenisPelanggaran, SetJenisPelanggaran] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [createDialog, setCreateDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [filteredData, setFilteredData] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getKategoriPelanggaran = async () => {
    setLoading(true);
    const { data: KategoriPelanggaranData } = await supabase
      .from("data_pelanggaran")
      .select(`*, jenis:jenis_pelanggaran_id(id, nama)`)
      .order("created_at", { ascending: false });

    const { data: jenisPelanggaranData } = await supabase
      .from("jenis_pelanggaran")
      .select("id, nama, aktif")
      .eq("aktif", true)
      .order("created_at", { ascending: false });

    SetJenisPelanggaran(jenisPelanggaranData);

    SetKategoriPelanggaran(KategoriPelanggaranData);
    setLoading(false);
  };

  useEffect(() => {
    getKategoriPelanggaran();

    const channel = supabase
      .channel("kategori_pelanggaran_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "data_pelanggaran",
        },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            const { data: NewRecord } = await supabase
              .from("data_pelanggaran")
              .select(`*, jenis:jenis_pelanggaran_id(id, nama)`)
              .eq("id", payload.new.id)
              .single();

            if (NewRecord) {
              //setJenisPelanggaran((prev) => [...prev, NewRecord]);
              SetKategoriPelanggaran((prev) => [NewRecord, ...prev]);
            }
          } else if (payload.eventType === "UPDATE") {
            const { data: updatedRecord } = await supabase
              .from("data_pelanggaran")
              .select(`*, jenis:jenis_pelanggaran_id(id, nama)`)
              .eq("id", payload.new.id)
              .single();
            if (updatedRecord) {
              //setJenisPelanggaran((prev) =>
              //   prev.map((item) =>
              //     item.id === payload.new.id ? updatedRecord : item
              //   )
              // );
              SetKategoriPelanggaran((prev) => {
                const filtered = prev.filter(
                  (item) => item.id !== payload.new.id
                );
                return [updatedRecord, ...filtered];
              });
            }
          } else if (payload.eventType === "DELETE") {
            SetKategoriPelanggaran((prev) =>
              prev.filter((item) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const filtered = KategoripelanggaranSantri.filter((item) => {
      const searchMatch =
        item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keterangan?.toLowerCase().includes(searchTerm.toLowerCase());

      const jenisMatch =
        jenisFilter === "all" || item.jenis?.id?.toString() === jenisFilter;

      const kategoriMatch =
        kategoriFilter === "all" ||
        item.kategori?.toLowerCase() === kategoriFilter;

      return searchMatch && jenisMatch && kategoriMatch;
    });

    setFilteredData(filtered);
  }, [searchTerm, jenisFilter, kategoriFilter, KategoripelanggaranSantri]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getKategoriVariant = (kategori) => {
    switch (kategori) {
      case "Ringan":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "Sedang":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "Berat":
        return "bg-orange-200 text-orange-900 border border-orange-300";
      case "Sangat Berat":
        return "bg-red-200 text-red-800 border border-red-300";
      default:
        return "bg-gray-200 text-gray-700 border border-gray-300";
    }
  };

  return (
    <>
      <CreateKategoriPelanggaran
        dialogstate={createDialog}
        setDialogState={setCreateDialog}
      />
      <DeleteKategoriPelanggaranDialog
        deleteId={deleteId}
        setDialogState={setDeleteId}
      />
      <EditKategoriPelanggaranData editId={editId} setDialogState={setEditId} />
      <div className="bg-background text-foreground">
        <Card>
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Master Data Kategori Pelanggaran
                </h1>
                <p className="text-muted-foreground mt-1">
                  Kelola data kategori pelanggaran santri
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari jenis pelanggaran..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select
                  onValueChange={(value) => setJenisFilter(value)}
                  defaultValue="all"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jenis Pelanggaran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Jenis Pelanggaran</SelectItem>
                    {JenisPelanggaran?.map((jenis) => (
                      <SelectItem key={jenis.id} value={jenis.id.toString()}>
                        {jenis.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={(value) => setKategoriFilter(value)}
                  defaultValue="all"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="ringan">Ringan</SelectItem>
                    <SelectItem value="sedang">Sedang</SelectItem>
                    <SelectItem value="berat">Berat</SelectItem>
                    <SelectItem value="sangat_berat">Sangat Berat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  className={`bg-green-700 hover:bg-green-800 cursor-pointer`}
                  onClick={() => setCreateDialog(true)}
                >
                  Tambah Data
                </Button>
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Nama Pelanggaran</TableHead>
                    <TableHead>Jenis Pelanggaran</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Poin</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [...Array(5)].map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : paginatedData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center text-gray-500"
                      >
                        Data tidak ditemukan.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedData.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{item.nama}</TableCell>
                        <TableCell>
                          {item.jenis.nama || "Keterangan Tidak Diatur"}
                        </TableCell>
                        <TableCell className="max-w-[300px]">
                          <Badge className={getKategoriVariant(item.kategori)}>
                            <div className=" truncate">{item.kategori}</div>
                          </Badge>
                        </TableCell>
                        <TableCell>{item.poin}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => setEditId(item.id)}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setDeleteId(item.id)}
                                className="text-red-600 "
                              >
                                Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Baris per halaman
                </span>
                <Select
                  value={String(rowsPerPage)}
                  onValueChange={(value) => {
                    setRowsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground mx-4">
                  Halaman {currentPage} dari {totalPages || 1}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default KategoriPelanggaran;
