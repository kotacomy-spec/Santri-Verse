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
import DeletePelanggaranRecordDialog from "./DeleteDialog/Delete";
import { Link } from "react-router-dom";

const Pelanggaran = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [PelanggaranSantri, SetPelanggaranSantri] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [filteredData, setFilteredData] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getKesehatanSantri = async () => {
    setLoading(true);
    const { data: PelanggaranData } = await supabase
      .from("pelanggaran_santri")
      .select(
        `*, santri:santri_id(id, nama), pelanggaran:data_pelanggaran_id(id, nama, kategori, poin)`
      )
      .order("created_at", { ascending: false });

    SetPelanggaranSantri(PelanggaranData);
    setLoading(false);
  };

  useEffect(() => {
    getKesehatanSantri();
    const channel = supabase
      .channel("pelanggaran_data_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "pelanggaran_santri",
        },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            const { data: NewRecord } = await supabase
              .from("pelanggaran_santri")
              .select(
                `*, santri:santri_id(id, nama), pelanggaran:data_pelanggaran_id(id, nama)`
              )
              .eq("id", payload.new.id)
              .single();

            if (NewRecord) {
              // SetPelanggaranSantri((prev) => [...prev, NewRecord]);
              SetPelanggaranSantri((prev) => [NewRecord, ...prev]);
            }
          } else if (payload.eventType === "UPDATE") {
            const { data: updatedRecord } = await supabase
              .from("pelanggaran_santri")
              .select(
                `*, santri:santri_id(id, nama), pelanggaran:data_pelanggaran_id(id, nama, kategori, poin)`
              )
              .eq("id", payload.new.id)
              .single();
            if (updatedRecord) {
              // SetPelanggaranSantri((prev) =>
              //   prev.map((item) =>
              //     item.id === payload.new.id ? updatedRecord : item
              //   )
              // );
              SetPelanggaranSantri((prev) => {
                const filtered = prev.filter(
                  (item) => item.id !== payload.new.id
                );
                return [updatedRecord, ...filtered];
              });
            }
          } else if (payload.eventType === "DELETE") {
            SetPelanggaranSantri((prev) =>
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
    const filtered = PelanggaranSantri.filter((item) => {
      const statusMatch =
        statusFilter === "all" || item.status === statusFilter;

      const searchMatch = item.santri.nama
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return searchMatch && statusMatch;
    });
    setFilteredData(filtered);
  }, [searchTerm, statusFilter, PelanggaranSantri]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getPointBadgeVariant = (poin) => {
    if (poin >= 400) return "bg-red-600 text-white";
    if (poin >= 250) return "bg-orange-500 text-white";
    if (poin >= 100) return "bg-yellow-400 text-black";
    return "bg-gray-200 text-black";
  };

  const getKategoriBadgeVariant = (kategori) => {
    switch (kategori) {
      case "Sangat Berat":
        return "bg-red-700 text-white";
      case "Berat":
        return "bg-red-500 text-white";
      case "Sedang":
        return "bg-orange-400 text-white";
      case "Ringan":
        return "bg-yellow-300 text-black";
      default:
        return "bg-gray-200 text-black";
    }
  };

  return (
    <>
      <DeletePelanggaranRecordDialog
        deleteId={deleteId}
        setDialogState={setDeleteId}
      />
      <div className="bg-background text-foreground">
        <Card>
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Data Pelanggaran Santri
                </h1>
                <p className="text-mu ted-foreground mt-1">
                  Dokumentasi pelanggaran santri untuk tindak lanjut dan
                  evaluasi.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari santri..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="Ringan">Ringan</SelectItem>
                    <SelectItem value="Sedang">Sedang</SelectItem>
                    <SelectItem value="Berat">Berat</SelectItem>
                    <SelectItem value="Sangat Berat">Sangat Berat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  className={`bg-green-700 hover:bg-green-800 cursor-pointer`}
                >
                  <Link to={"/musyrif/pelanggaran/create"}>Tambah Data</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No Refrensi</TableHead>
                    <TableHead>Nama Santri</TableHead>
                    <TableHead>Pelanggaran</TableHead>
                    <TableHead>Poin</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal Pelanggaran</TableHead>
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
                    paginatedData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          PL-{item.id}
                        </TableCell>
                        <TableCell>{item.santri.nama}</TableCell>
                        <TableCell>{item.pelanggaran.nama}</TableCell>
                        <TableCell className="max-w-[300px]">
                          <Badge
                            className={getPointBadgeVariant(
                              item.pelanggaran.poin
                            )}
                          >
                            <div className=" truncate">
                              {item.pelanggaran.poin}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[300px]">
                          <Badge
                            className={getKategoriBadgeVariant(
                              item.pelanggaran.kategori
                            )}
                          >
                            <div className=" truncate">
                              {item.pelanggaran.kategori}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(item.tanggal).toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link
                                  to={`/musyrif/pelanggaran/edit/${item.id}`}
                                >
                                  Detail
                                </Link>
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

export default Pelanggaran;
