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
import CreateJenisPelanggaran from "./CreateDialog/JenisPelanggaranCreate";
import DeleteJenisPelanggaranDialog from "./DeleteDialog/Delete";
import EditJenisPelanggaranData from "./EditDialog/EditDialog";

const JenisPelanggaran = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pelanggaranSantri, setJenisPelanggaran] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [createDialog, setCreateDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [filteredData, setFilteredData] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getKesehatanSantri = async () => {
    setLoading(true);
    const { data: jenisPelanggaranData } = await supabase
      .from("jenis_pelanggaran")
      .select("id, nama, keterangan, aktif")
      .order("created_at", { ascending: false });

    setJenisPelanggaran(jenisPelanggaranData);
    setLoading(false);
  };

  useEffect(() => {
    getKesehatanSantri();

    const channel = supabase
      .channel("jenis_pelanggaran_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "jenis_pelanggaran",
        },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            const { data: NewRecord } = await supabase
              .from("jenis_pelanggaran")
              .select("id, nama, keterangan, aktif")
              .eq("id", payload.new.id)
              .single();

            if (NewRecord) {
              //setJenisPelanggaran((prev) => [...prev, NewRecord]);
              setJenisPelanggaran((prev) => [NewRecord, ...prev]);
            }
          } else if (payload.eventType === "UPDATE") {
            const { data: updatedRecord } = await supabase
              .from("jenis_pelanggaran")
              .select("id, nama, keterangan, aktif")
              .eq("id", payload.new.id)
              .single();
            if (updatedRecord) {
              //setJenisPelanggaran((prev) =>
              //   prev.map((item) =>
              //     item.id === payload.new.id ? updatedRecord : item
              //   )
              // );
              setJenisPelanggaran((prev) => {
                const filtered = prev.filter(
                  (item) => item.id !== payload.new.id
                );
                return [updatedRecord, ...filtered];
              });
            }
          } else if (payload.eventType === "DELETE") {
            setJenisPelanggaran((prev) =>
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
    const filtered = pelanggaranSantri.filter((item) => {
      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "aktif" && item.aktif === true) ||
        (statusFilter === "tidak-aktif" && item.aktif === false);

      const searchMatch =
        item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keterangan?.toLowerCase().includes(searchTerm.toLowerCase());

      return statusMatch && searchMatch;
    });
    setFilteredData(filtered);
  }, [searchTerm, statusFilter, pelanggaranSantri]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getStatusVariant = (status) => {
    switch (status) {
      case true:
        return "bg-green-600 text-white";
      case false:
        return "bg-red-500 text-white";
      default:
        return "bg-gray-200 text-black";
    }
  };

  return (
    <>
      <CreateJenisPelanggaran
        dialogstate={createDialog}
        setDialogState={setCreateDialog}
      />
      <DeleteJenisPelanggaranDialog
        deleteId={deleteId}
        setDialogState={setDeleteId}
      />
      <EditJenisPelanggaranData editId={editId} setDialogState={setEditId} />
      <div className="bg-background text-foreground">
        <Card>
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Master Data Pelanggaran Santri
                </h1>
                <p className="text-muted-foreground mt-1">
                  Kelola data pelanggaran santri.
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
              <div>
                <Select
                  onValueChange={(value) => setStatusFilter(value)}
                  defaultValue="all"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="aktif">Aktif</SelectItem>
                    <SelectItem value="tidak-aktif">Tidak Aktif</SelectItem>
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
                    <TableHead>Jenis Pelanggaran</TableHead>
                    <TableHead>Keterangan</TableHead>
                    <TableHead>Status</TableHead>
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
                          {item.keterangan || "Keterangan Tidak Diatur"}
                        </TableCell>
                        <TableCell className="max-w-[300px]">
                          <Badge className={getStatusVariant(item.aktif)}>
                            <div className=" truncate">
                              {item.aktif ? "Aktif" : "Tidak Aktif"}
                            </div>
                          </Badge>
                        </TableCell>

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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
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
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <span className="text-sm text-muted-foreground whitespace-nowrap order-2 sm:order-1">
                  Halaman {currentPage} dari {totalPages || 1}
                </span>

                <div className="flex gap-1 order-1 sm:order-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="h-8 w-8 p-0"
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

export default JenisPelanggaran;
