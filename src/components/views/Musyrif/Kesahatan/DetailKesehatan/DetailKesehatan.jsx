import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Save,
  User,
  FileText,
  Activity,
  Clock,
  Edit,
  X,
  ChevronsUpDown,
  Check,
  ChevronDownIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase/supabaseClient";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

const KesehatanDetailEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [IsLoading, SetIsLoading] = useState(false);
  const [santriData, setSantriData] = useState([]);
  const [openCombo, setOpenCombo] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [tglSelesai, setTglSelesai] = useState(null);
  const [openTglSelesai, setOpenTglSelesai] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    santri_id: "",
    tgl_diperiksa: "",
    keluhan: "",
    diagnosa: "",
    obat: "",
    lokasi_rawat: "",
    tgl_selesai: "",
    prioritas: "",
    catatan: "",
    status: "",
    diperiksa_oleh: "",
  });

  useEffect(() => {
    SetIsLoading(true);
    const fetchSantri = async () => {
      const { data } = await supabase.from("santri").select("id, nama");
      if (data) {
        const formatted = data.map((s) => ({
          label: s.nama,
          value: s.id,
        }));
        setSantriData(formatted);
      }
    };
    fetchSantri();
    const getDetailData = async () => {
      const { data: detailData, error } = await supabase
        .from("kesehatan_santri")
        .select("*, santri:santri_id(id, nama)")
        .eq("id", id)
        .single();

      if (error || !detailData) {
        navigate("/not-found");
        SetIsLoading(false);
        return;
      }

      setFormData({
        id: detailData.id,
        santri_id: detailData.santri.id,
        tgl_diperiksa: detailData.tgl_diperiksa,
        keluhan: detailData.keluhan,
        diagnosa: detailData.diagnosa,
        obat: detailData.obat,
        lokasi_rawat: detailData.lokasi_rawat,
        tgl_selesai: detailData.tgl_selesai,
        prioritas: detailData.prioritas,
        catatan: detailData.catatan,
        status: detailData.status,
        diperiksa_oleh: detailData.diperiksa_oleh,
      });

      if (detailData.tgl_diperiksa) {
        setDate(new Date(detailData.tgl_diperiksa));
      }

      if (detailData.tgl_selesai) {
        setTglSelesai(new Date(detailData.tgl_selesai));
      }

      SetIsLoading(false);
    };

    if (id) getDetailData();
  }, [id, navigate]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("kesehatan_santri")
        .update(formData)
        .eq("id", id);
      setIsEditMode(false);
      toast.success("Data Berhasil Di Edit");
      if (error) throw error;
    } catch (error) {
      toast.error(error?.message || "Terjadi Kesalahan");
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Tinggi":
        return "bg-red-500";
      case "Sedang":
        return "bg-orange-500";
      case "Rendah":
        return "bg-gray-200 text-black";
      default:
        return "bg-gray-200 text-black";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Dalam Perawatan":
        return "bg-sky-500";
      case "Selesai":
        return "bg-green-700";
      case "Menunggu":
        return "bg-gray-200 text-black";
      default:
        return "bg-gray-200 text-black";
    }
  };

  return IsLoading ? (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div>
                <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="w-64 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-40 h-5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-full h-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-28 h-5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="w-36 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-full h-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-36 h-5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-full h-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50">
              <CardContent className="">
                <div className="w-20 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-full h-4 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to={"/musyrif/kesehatan"} variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Detail Data Kesehatan
                </h1>
                <p className="text-sm font-semibold text-gray-500">
                  {isEditMode
                    ? "Edit informasi kesehatan santri"
                    : "Lihat informasi kesehatan santri"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isEditMode ? (
                <Button
                  className={`bg-green-700 hover:bg-green-800`}
                  onClick={() => setIsEditMode(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={handleSave}
                    className="bg-green-700 hover:bg-green-800"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Simpan
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Batal
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>Informasi Dasar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="id">No. Referensi</Label>
                    <Input
                      id="id"
                      value={`KS - ${formData.id}`}
                      onChange={(e) => handleInputChange("id", e.target.value)}
                      disabled={true}
                      placeholder="Masukkan no referensi"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="santri_id">Nama Santri</Label>
                    <Popover open={openCombo} onOpenChange={setOpenCombo}>
                      <PopoverTrigger asChild>
                        <Button
                          id="santri"
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCombo}
                          className="justify-between w-full"
                          disabled={!isEditMode}
                        >
                          {IsLoading ? (
                            <div className="flex items-center">
                              <div className="h-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 mr-2"></div>
                              Memuat...
                            </div>
                          ) : formData.santri_id ? (
                            santriData.find(
                              (s) => s.value === formData.santri_id
                            )?.label
                          ) : (
                            "Pilih Santri"
                          )}
                          <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent align="start" className="w-[300px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Cari Santri..."
                            className="h-9"
                            disabled={IsLoading}
                          />
                          <CommandList>
                            {IsLoading ? (
                              <div className="p-4">Loading...</div>
                            ) : (
                              <>
                                <CommandEmpty>
                                  Santri tidak ditemukan
                                </CommandEmpty>
                                <CommandGroup>
                                  {santriData.map((santri) => (
                                    <CommandItem
                                      key={santri.value}
                                      value={santri.label}
                                      onSelect={() => {
                                        setFormData((prev) => ({
                                          ...prev,
                                          santri_id: santri.value,
                                        }));
                                        setOpenCombo(false);
                                      }}
                                    >
                                      {santri.label}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          formData.santri_id === santri.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </>
                            )}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tgl_diperiksa">Tanggal Periksa</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          disabled={!isEditMode}
                          className="justify-between font-normal w-full"
                        >
                          {date
                            ? date.toLocaleDateString("id-ID", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Pilih Tanggal"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            setDate(date);
                            setFormData((prev) => ({
                              ...prev,
                              tgl_diperiksa: date?.toLocaleDateString("sv-SE"),
                            }));
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tgl_selesai">Tanggal Selesai</Label>
                    <Popover
                      open={openTglSelesai}
                      onOpenChange={setOpenTglSelesai}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="tgl_selesai"
                          disabled={!isEditMode}
                          className="justify-between font-normal w-full"
                        >
                          {tglSelesai
                            ? tglSelesai.toLocaleDateString("id-ID", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Pilih Tanggal Selesai"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={tglSelesai}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            setTglSelesai(date);
                            setFormData((prev) => ({
                              ...prev,
                              tgl_selesai: date?.toLocaleDateString("sv-SE"),
                            }));
                            setOpenTglSelesai(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-red-600" />
                  <span>Keluhan & Diagnosa</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="keluhan">Keluhan</Label>
                    <Textarea
                      id="keluhan"
                      value={formData.keluhan}
                      onChange={(e) =>
                        handleInputChange("keluhan", e.target.value)
                      }
                      disabled={!isEditMode}
                      placeholder="Deskripsikan keluhan santri..."
                      rows={3}
                      className={`resize-none`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diagnosa">Diagnosa</Label>
                    <Textarea
                      id="diagnosa"
                      value={formData.diagnosa}
                      onChange={(e) =>
                        handleInputChange("diagnosa", e.target.value)
                      }
                      disabled={!isEditMode}
                      placeholder="Masukkan diagnosa..."
                      rows={3}
                      className={`resize-none`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <span>Pengobatan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="obat">Obat yang Diberikan</Label>
                    <Textarea
                      id="obat"
                      value={formData.obat}
                      onChange={(e) =>
                        handleInputChange("obat", e.target.value)
                      }
                      disabled={!isEditMode}
                      placeholder="Masukkan obat dan dosisnya..."
                      rows={3}
                      className={`resize-none`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lokasi_rawat">Lokasi Rawat</Label>
                    <Input
                      id="lokasi_rawat"
                      value={formData.lokasi_rawat}
                      onChange={(e) =>
                        handleInputChange("lokasi_rawat", e.target.value)
                      }
                      disabled={!isEditMode}
                      placeholder="Masukkan lokasi rawat"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diperiksa_oleh">Diperiksa Oleh</Label>
                    <Input
                      id="diperiksa_oleh"
                      value={formData.diperiksa_oleh}
                      onChange={(e) =>
                        handleInputChange("diperiksa_oleh", e.target.value)
                      }
                      disabled={!isEditMode}
                      placeholder="Masukkan nama pemeriksa"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <span>Catatan Tambahan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="catatan">Catatan</Label>
                  <Textarea
                    id="catatan"
                    value={formData.catatan}
                    onChange={(e) =>
                      handleInputChange("catatan", e.target.value)
                    }
                    disabled={!isEditMode}
                    placeholder="Masukkan catatan tambahan..."
                    rows={4}
                    className={`resize-none`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span>Status & Prioritas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prioritas">Prioritas</Label>
                    {isEditMode ? (
                      <Select
                        value={formData.prioritas}
                        onValueChange={(value) =>
                          handleInputChange("prioritas", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih prioritas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Rendah">Rendah</SelectItem>
                          <SelectItem value="Sedang">Sedang</SelectItem>
                          <SelectItem value="Tinggi">Tinggi</SelectItem>
                          {/* <SelectItem value="Darurat">Darurat</SelectItem> */}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge className={getPriorityColor(formData.prioritas)}>
                        {formData.prioritas}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    {isEditMode ? (
                      <Select
                        value={formData.status}
                        onValueChange={(value) => {
                          handleInputChange("status", value);

                          if (value === "Selesai") {
                            const today = new Date();
                            const formattedToday =
                              today.toLocaleDateString("sv-SE");

                            handleInputChange("tgl_selesai", formattedToday);
                            setTglSelesai(today);
                          }
                          if (value !== "Selesai") {
                            handleInputChange("tgl_selesai", null);
                            setTglSelesai(null);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Menunggu">Menunggu</SelectItem>
                          <SelectItem value="Dalam Perawatan">
                            Dalam Perawatan
                          </SelectItem>
                          <SelectItem value="Selesai">Selesai</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge className={getStatusColor(formData.status)}>
                        {formData.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-100 border-green-300">
              <CardContent className="">
                <h3 className="font-medium text-green-900 mb-2">Informasi</h3>
                <div className="text-sm text-green-800 space-y-1">
                  <p>
                    •{" "}
                    {isEditMode
                      ? "Klik Simpan untuk menyimpan perubahan"
                      : "Klik Edit untuk mengubah data"}
                  </p>
                  <p>• Prioritas tinggi akan ditampilkan dengan warna merah</p>
                  <p>• Status draft masih bisa diedit kapan saja</p>
                </div>
              </CardContent>
            </Card>

            {isEditMode && (
              <div className="space-y-3">
                <Button
                  onClick={handleSave}
                  className="w-full bg-green-700 hover:bg-green-800"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Perubahan
                </Button>

                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  Batal
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KesehatanDetailEdit;
