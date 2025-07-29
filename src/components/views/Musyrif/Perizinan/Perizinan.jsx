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
import DeletePerizinanRecordDialog from "./DeleteDialog/Delete";
import { Link } from "react-router-dom";

const Perizinan = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [PerizinanSantri, SetPerizinanSantri] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [filteredData, setFilteredData] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getKesehatanSantri = async () => {
    setLoading(true);
    const { data: PerizinanSantriData } = await supabase
      .from("perizinan_santri")
      .select(`*, santri:santri_id(id,nama)`)
      .order("created_at", { ascending: false });

    SetPerizinanSantri(PerizinanSantriData);
    setLoading(false);
  };

  useEffect(() => {
    getKesehatanSantri();

    const channel = supabase
      .channel("perizinan_santri_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "perizinan_santri",
        },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            const { data: NewRecord } = await supabase
              .from("perizinan_santri")
              .select(`*`)
              .eq("id", payload.new.id)
              .single();

            if (NewRecord) {
              // SetPerizinanSantri((prev) => [...prev, NewRecord]);
              SetPerizinanSantri((prev) => [NewRecord, ...prev]);
            }
          } else if (payload.eventType === "UPDATE") {
            const { data: updatedRecord } = await supabase
              .from("perizinan_santri")
              .select(`*`)
              .eq("id", payload.new.id)
              .single();
            if (updatedRecord) {
              // SetPerizinanSantri((prev) =>
              //   prev.map((item) =>
              //     item.id === payload.new.id ? updatedRecord : item
              //   )
              // );
              SetPerizinanSantri((prev) => {
                const filtered = prev.filter(
                  (item) => item.id !== payload.new.id
                );
                return [updatedRecord, ...filtered];
              });
            }
          } else if (payload.eventType === "DELETE") {
            SetPerizinanSantri((prev) =>
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
    const filtered = PerizinanSantri.filter((item) => {
      const statusMatch =
        statusFilter === "all" || item.status === statusFilter;

      const searchMatch = item.santri.nama
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return searchMatch && statusMatch;
    });
    setFilteredData(filtered);
  }, [searchTerm, statusFilter, PerizinanSantri]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getStatusVariant = (kategori) => {
    switch (kategori) {
      case "Masuk":
        return "bg-green-700 text-white";
      case "Keluar":
        return "bg-red-500 text-white";
      case "Draft":
        return "bg-gray-200 text-black";
      default:
        return "bg-gray-200 text-black";
    }
  };

  return (
    <>
      <DeletePerizinanRecordDialog
        deleteId={deleteId}
        setDialogState={setDeleteId}
      />
      <div className="bg-background text-foreground">
        <Card>
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Data Perizinan Santri
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
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Keluar">Keluar</SelectItem>
                    <SelectItem value="Masuk">Masuk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  className={`bg-green-700 hover:bg-green-800 cursor-pointer`}
                >
                  <Link to={"/musyrif/perizinan/create"}>Tambah Data</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No Refrensi</TableHead>
                    <TableHead>Nama Santri</TableHead>
                    <TableHead>Keperluan</TableHead>
                    <TableHead>Penjemput</TableHead>
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
                    paginatedData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          IZ-{item.id}
                        </TableCell>
                        <TableCell>{item.santri.nama}</TableCell>
                        <TableCell>{item.keperluan}</TableCell>
                        <TableCell>{item.penjemput}</TableCell>
                        <TableCell className="max-w-[300px]">
                          <Badge className={getStatusVariant(item.status)}>
                            <div className=" truncate">{item.status}</div>
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
                              <DropdownMenuItem asChild>
                                <Link to={`/musyrif/perizinan/edit/${item.id}`}>
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

export default Perizinan;
