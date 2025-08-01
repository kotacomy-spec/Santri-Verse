/* eslint-disable */
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  ChevronsUpDown,
  Check,
  Loader2,
  NotebookPen,
  CalendarClock,
  CalendarIcon,
  ImageIcon,
  X,
  Eye,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState, useRef } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/supabaseClient";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SkeletonLoading from "@/components/AdminKomponen/SkeletonLoading";

const PerizinanCreate = () => {
  const [openSantriCombo, setOpenSantriCombo] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [musyrif, setMusyrif] = useState();
  const [santriData, setSantri] = useState([]);
  const [value, setValue] = useState("");
  const [kategori, setKategori] = useState("");
  const [IsSubmit, SetIsSubmit] = useState(false);
  const [tglIjin, setTglIjin] = useState(new Date());
  const [tglKembali, setTglKembali] = useState();
  const [waktuKeluar, setWaktuKeluar] = useState("08:00");
  const [waktuKembali, setWaktuKembali] = useState("17:00");
  const [fotoBukti, setFotoBukti] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const inputRef = useRef();

  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFotoBukti(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFotoBukti(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const getData = async () => {
    setLoading(true);
    const { data: Musyrif } = await supabase.auth.getUser();
    const musyrifId = Musyrif.user.id;

    const { data: SantriData } = await supabase
      .from("santri")
      .select(`nama, id`);

    const { data: musyrifData } = await supabase
      .from("musyrif")
      .select("id, profile:profiles(id, username)")
      .eq("profile_id", musyrifId)
      .single();

    const formatted = SantriData.map((item) => ({
      label: item.nama,
      value: item.id,
    }));

    setSantri(formatted);
    setMusyrif(musyrifData);
    setLoading(false);
  };

  function combineDateTime(date, time) {
    const [hours, minutes] = time.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(0);
    return newDate;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    SetIsSubmit(true);

    if (!value || !tglIjin) {
      toast.error("Santri dan tanggal izin wajib diisi");
      SetIsSubmit(false);
      return;
    }

    let fotoUrl = null;

    if (fotoBukti) {
      const filename = `${Date.now()}_${fotoBukti.name}`;
      const filePath = `images/perizinan/${filename}`;
      const { error: uploadError } = await supabase.storage
        .from("pesantren")
        .upload(filePath, fotoBukti);

      if (uploadError) {
        console.log(uploadError);
        toast.error("Gagal upload foto");
        SetIsSubmit(false);
        return;
      }

      const { data: publicUrl } = supabase.storage
        .from("pesantren")
        .getPublicUrl(filePath);

      fotoUrl = publicUrl.publicUrl;
    }

    const formData = new FormData(e.target);
    const keperluan = formData.get("keperluan");
    const catatan = formData.get("catatan");
    const penjemput = formData.get("penjemput");

    const { error } = await supabase.from("perizinan_santri").insert([
      {
        santri_id: value,
        musyrif_id: 11,
        tgl_ijin: tglIjin,
        tgl_kembali: tglKembali,
        waktu_keluar: combineDateTime(tglIjin, waktuKeluar),
        waktu_kembali: combineDateTime(tglKembali, waktuKembali),
        penjemput,
        status: kategori || "Draft",
        keperluan,
        catatan,
        foto_bukti: fotoUrl,
      },
    ]);

    if (error) {
      toast.error("Gagal menyimpan data");
      console.log(error);
    } else {
      toast.success("Data berhasil disimpan");
      navigate("/musyrif/perizinan");
    }

    SetIsSubmit(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            key="modal"
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              <img
                src={previewUrl}
                alt="Full Preview"
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
              />
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 text-white bg-black p-2 rounded-full cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <div className=" min-h-screen bg-background text-foreground">
          <Card>
            <div className="container mx-auto p-6">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    Tambah Data Perizinan Santri
                  </h1>
                  <p className="text-mu ted-foreground mt-1">
                    Tambahkan informasi perizinan santri untuk keperluan
                    pencatatan dan penanganan lebih lanjut.
                  </p>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-16">
                  <div>
                    <div className="flex gap-2 border-b-1 border-gray-300 pb-3 mb-7">
                      <User />
                      <h2 className="font-semibold">Informasi Santri</h2>
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                      <div className="grid gap-3">
                        <Label htmlFor="santri">Santri</Label>
                        <Popover
                          open={openSantriCombo}
                          onOpenChange={setOpenSantriCombo}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              id="santri"
                              variant="outline"
                              role="combobox"
                              aria-expanded={openSantriCombo}
                              className="justify-between"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <div className="flex items-center">
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 mr-2"></div>
                                  Memuat...
                                </div>
                              ) : value ? (
                                santriData.find(
                                  (santri) => santri.value === value
                                )?.label
                              ) : (
                                "Pilih Santri"
                              )}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent
                            align="start"
                            className="w-[300px] p-0"
                          >
                            <Command>
                              <CommandInput
                                placeholder="Cari Santri..."
                                className="h-9"
                                disabled={isLoading}
                              />
                              <CommandList>
                                {isLoading ? (
                                  <div className="p-4">
                                    <div className="space-y-2">
                                      {[...Array(5)].map((_, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center space-x-2"
                                        >
                                          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                                          <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <CommandEmpty>
                                      Tidak bisa menemukan santri
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {santriData.map((santri) => (
                                        <CommandItem
                                          key={santri.value}
                                          value={santri.label}
                                          onSelect={(currentLabel) => {
                                            const selectedSantri =
                                              santriData.find(
                                                (item) =>
                                                  item.label === currentLabel
                                              );
                                            if (selectedSantri) {
                                              setValue(selectedSantri.value);
                                            }
                                            setOpenSantriCombo(false);
                                          }}
                                        >
                                          {santri.label}
                                          <Check
                                            className={cn(
                                              "ml-auto",
                                              value === santri.value
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
                      <div className="grid gap-3">
                        <Label htmlFor="musyrif">Musyrif</Label>
                        {isLoading ? (
                          <div className="relative">
                            <Input
                              placeholder="Memuat..."
                              disabled
                              className="pl-10"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                            </div>
                          </div>
                        ) : (
                          <Input
                            id="musyrif"
                            name="musyrif"
                            defaultValue={musyrif?.profile.username}
                            placeholder="Nama musyrif"
                            disabled
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-2 border-b-1 border-gray-300 pb-3 mb-7">
                      <NotebookPen />
                      <h2 className="font-semibold">Informasi Perizinan</h2>
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="tgl_ijin">Tanggal Izin</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {tglIjin ? (
                                  format(tglIjin, "PPP")
                                ) : (
                                  <span>Pilih tanggal izin</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={tglIjin}
                                onSelect={setTglIjin}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="tgl_kembali">Tanggal Kembali</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {tglKembali ? (
                                  format(tglKembali, "PPP")
                                ) : (
                                  <span>Pilih tanggal kembali</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={tglKembali}
                                onSelect={setTglKembali}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="penjemput">Penjemput</Label>
                          <Input
                            id="penjemput"
                            name="penjemput"
                            placeholder="Nama penjemput..."
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="status">Status</Label>
                          <Select value={kategori} onValueChange={setKategori}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "Draft",
                                "Diperiksa",
                                "Disetujui",
                                "Ditolak",
                                "Keluar",
                                "Kembali",
                              ].map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="keperluan">Keperluan</Label>
                        <Textarea
                          id="keperluan"
                          name="keperluan"
                          placeholder="Tulis keperluan perizinan di sini..."
                          className="resize-none"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="catatan">Catatan Tambahan</Label>
                        <Textarea
                          id="catatan"
                          name="catatan"
                          placeholder="Catatan dari musyrif (opsional)..."
                          className="resize-none"
                        />
                      </div>
                      <div className="grid gap-3">
                        <label>Upload Foto Bukti Perizinan (opsional)</label>
                        <div
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          onDragEnter={handleDragEnter}
                          onDragLeave={handleDragLeave}
                          onClick={handleClick}
                          className={`flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-xl cursor-pointer text-center transition-colors
                          ${
                            isDragging
                              ? "border-blue-400 bg-blue-50"
                              : "border-gray-300 hover:border-blue-400"
                          }
                        `}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            ref={inputRef}
                            onChange={handleFileChange}
                            className="hidden"
                          />

                          {previewUrl ? (
                            <div className="relative">
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="max-h-64 rounded-md object-contain"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowImageModal(true);
                                }}
                                className="absolute top-1 right-10 bg-white p-1 rounded-full shadow"
                              >
                                <Eye className="w-6 h-6 text-blue-500" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPreviewUrl(null);
                                  setFotoBukti(null);
                                }}
                                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow"
                              >
                                <X className="w-6 h-6 text-red-500" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                              <p className="text-gray-600">
                                Seret file ke sini atau klik untuk memilih
                              </p>
                              <p className="text-sm text-gray-500">
                                PNG, JPG, JPEG hingga 10MB
                              </p>
                              <button
                                type="button"
                                className="mt-4 bg-green-700 text-white py-2 px-6 rounded-md hover:bg-green-800 transition"
                              >
                                Pilih File
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-2 border-b-1 border-gray-300 pb-3 mb-7">
                      <CalendarClock />
                      <h2 className="font-semibold">
                        Detail Waktu Keluar & Kembali
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="waktu_keluar">Waktu Keluar</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            id="waktu_keluar"
                            step="1"
                            value={waktuKeluar}
                            onChange={(e) => setWaktuKeluar(e.target.value)}
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                          />
                        </div>
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="waktu_kembali">Waktu Kembali</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            id="waktu_kembali"
                            step="1"
                            value={waktuKembali}
                            onChange={(e) => setWaktuKembali(e.target.value)}
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2 md:justify-end md:flex-row">
                    <Button
                      type="button"
                      onClick={() => navigate("/keamanan/perizinan")}
                      disabled={IsSubmit}
                      className={`bg-red-700 cursor-pointer hover:bg-red-800 md:w-1/6 w-full`}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      disabled={IsSubmit}
                      className={`bg-green-700 cursor-pointer hover:bg-green-800 md:w-1/6 w-full`}
                    >
                      {IsSubmit ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        "Simpan"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default PerizinanCreate;
