import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  AlertCircle,
  ChevronsUpDown,
  Check,
  FileText,
  ChevronDownIcon,
  Loader2,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import { useEffect, useState } from "react";
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

const PelanggaranCreate = () => {
  const [openSantriCombo, setOpenSantriCombo] = useState(false);
  const [openPelanggaranCombo, setOpenPelanggaranCombo] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [musyrif, setMusyrif] = useState();
  const [santriData, setSantri] = useState([]);
  const [value, setValue] = useState("");
  const [pelanggaranList, setPelanggaranList] = useState([]);
  const [selectedPelanggaranId, setSelectedPelanggaranId] = useState(null);
  const [jenisPelanggaran, setJenisPelanggaran] = useState("");
  const [poin, setPoin] = useState("");
  const [kategori, setKategori] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [IsSubmit, SetIsSubmit] = useState(false);

  const navigate = useNavigate();

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

    const { data: PelanggaranData } = await supabase
      .from("data_pelanggaran")
      .select(
        "id ,nama, kategori , poin ,jenis:jenis_pelanggaran_id(id, nama)"
      );

    const formatted = SantriData.map((item) => ({
      label: item.nama,
      value: item.id,
    }));

    setSantri(formatted);
    setMusyrif(musyrifData);
    setPelanggaranList(PelanggaranData);
    setLoading(false);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    SetIsSubmit(true);

    const formData = new FormData(e.target);

    const deskripsi = formData.get("deskripsi");

    const tindakan = formData.get("tindakan");

    if (!value || !selectedPelanggaranId) {
      toast.error(`Isi ${!value ? "Santri" : "Pelanggaran"} Terlebih Dahulu`);
      SetIsSubmit(false);
      return;
    }

    try {
      const inserData = {
        santri_id: value,
        data_pelanggaran_id: selectedPelanggaranId,
        deskripsi,
        status: kategori,
        tanggal: date,
        tindakan,
        musyrif_id: musyrif.id,
      };

      const { error } = await supabase
        .from("pelanggaran_santri")
        .insert([inserData]);

      if (error) throw error;

      toast.success("Berhasil Menambahkan Data");
      navigate("/musyrif/pelanggaran");
    } catch (error) {
      toast.error(error?.message || "Terjadi Kesalahan");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="bg-background text-foreground">
        <Card>
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Tambah Data Pelanggaran Santri
                </h1>
                <p className="text-mu ted-foreground mt-1">
                  Tambahkan informasi pelanggaran yang dilakukan santri untuk
                  keperluan pencatatan dan penanganan lebih lanjut.
                </p>
              </div>
            </div>
            <form onSubmit={handleSumbit}>
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

                        <PopoverContent align="start" className="w-[300px] p-0">
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
                    <AlertCircle />
                    <h2 className="font-semibold">Informasi Pelanggaran</h2>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="pelanggaran">Pelanggaran</Label>
                        <Popover
                          open={openPelanggaranCombo}
                          onOpenChange={setOpenPelanggaranCombo}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              id="pelanggaran"
                              variant="outline"
                              role="combobox"
                              aria-expanded={openPelanggaranCombo}
                              className="justify-between"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <div className="flex items-center">
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 mr-2"></div>
                                  Memuat
                                </div>
                              ) : selectedPelanggaranId ? (
                                pelanggaranList.find(
                                  (p) => p.id === selectedPelanggaranId
                                )?.nama
                              ) : (
                                "Pilih Pelanggaran"
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
                                placeholder="Cari Pelanggaran..."
                                className="h-9"
                                disabled={isLoading}
                              />
                              <CommandList>
                                <CommandEmpty>Tidak ada data</CommandEmpty>
                                <CommandGroup>
                                  {pelanggaranList.map((pelanggaran) => (
                                    <CommandItem
                                      key={pelanggaran.id}
                                      value={pelanggaran.nama}
                                      onSelect={() => {
                                        setSelectedPelanggaranId(
                                          pelanggaran.id
                                        );
                                        setJenisPelanggaran(
                                          pelanggaran.jenis.nama
                                        );
                                        setPoin(pelanggaran.poin);
                                        setKategori(pelanggaran.kategori);
                                        setOpenPelanggaranCombo(false);
                                      }}
                                    >
                                      {pelanggaran.nama}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          selectedPelanggaranId ===
                                            pelanggaran.id
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="tgl_pelanggaran">
                          Tanggal Pelanggaran
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date"
                              className="justify-between font-normal"
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
                                setOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="deskripsi">Deskripsi Pelanggaran</Label>
                      <Textarea
                        id="deskripsi"
                        placeholder="Deskripsi Pelanggaran..."
                        name="deskripsi"
                        className={`resize-none`}
                      ></Textarea>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 border-b-1 border-gray-300 pb-3 mb-7">
                    <FileText />
                    <h2 className="font-semibold">Detail Pelanggaran</h2>
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <div className="grid gap-3">
                      <Label htmlFor="jenis">Jenis Pelanggaran</Label>
                      <Input
                        id="jenis"
                        value={jenisPelanggaran}
                        placeholder="Jenis Pelanggaran"
                        name="jenis_pelanggaran"
                        disabled
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="poin">Poin</Label>
                      <Input
                        id="poin"
                        value={poin}
                        placeholder="Poin"
                        name="poin"
                        disabled
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="kategori">Kategori</Label>
                      <Input
                        id="kategori"
                        value={kategori}
                        placeholder="Kategori"
                        disabled
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="tindakan">Tindakan</Label>
                      <Input
                        id="tindakan"
                        name="tindakan"
                        placeholder="Tindakan"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end">
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
    </>
  );
};

export default PelanggaranCreate;
