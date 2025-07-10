import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
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

const EditKategoriPelanggaranData = (props) => {
  const { editId, setDialogState } = props;
  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openCombo, setOpenCombo] = useState(false);
  const [nama, setNama] = useState("");
  const [JenisPelanggaran, SetJenisPelanggaran] = useState([]);
  const [kategori, SetKategori] = useState("");
  const [poin, setPoin] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!editId) return;

      setIsLoading(true);
      setOpen(true);

      const { data, error } = await supabase
        .from("data_pelanggaran")
        .select("id, nama, jenis_pelanggaran_id, kategori, poin")
        .eq("id", editId)
        .single();

      if (error) {
        toast.error("Gagal mengambil data");
        setIsLoading(false);
        return;
      }

      setNama(data.nama || "");
      setValue(data.jenis_pelanggaran_id);
      SetKategori(data.kategori || "");
      setPoin(data.poin?.toString() || "");
      setIsLoading(false);
    };

    fetchData();
  }, [editId]);

  const getJenisPelanggaran = async () => {
    setIsLoading(true);
    const { data: jenisPelanggaranData } = await supabase
      .from("jenis_pelanggaran")
      .select("id, nama, aktif")
      .eq("aktif", true)
      .order("created_at", { ascending: false });

    if (jenisPelanggaranData) {
      const mappedData = jenisPelanggaranData.map((item) => ({
        value: item.id,
        label: item.nama,
      }));
      SetJenisPelanggaran(mappedData);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getJenisPelanggaran();
  }, []);

  const handleClose = () => {
    setDialogState(null);
    setOpen(false);
    setNama("");
    setValue(undefined);
    SetKategori("");
    setPoin("");
    setIsLoading(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("data_pelanggaran")
        .update({
          nama,
          jenis_pelanggaran_id: value,
          kategori,
          poin: parseInt(poin, 10),
        })
        .eq("id", editId);

      if (error) throw error;

      toast.success("Data berhasil diperbarui");
      handleClose();
    } catch (error) {
      toast.error(error.message || "Gagal memperbarui data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmitForm}>
            {isLoading ? (
              <>
                <DialogHeader>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Edit Jenis Pelanggaran</DialogTitle>
                  <DialogDescription className="mb-3 -mt-1">
                    Edit jenis pelanggaran santri.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="nama">Nama Kategori Pelanggaran</Label>
                    <Input
                      id="nama"
                      name="nama"
                      placeholder="Jenis Pelanggaran"
                      autoComplete="off"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="prioritas">Jenis Pelanggaran</Label>
                    <Popover open={openCombo} onOpenChange={setOpenCombo}>
                      <PopoverTrigger asChild>
                        <Button
                          id="jenis_pelanggaran"
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCombo}
                          className="justify-between"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 mr-2"></div>
                              Memuat...
                            </div>
                          ) : value ? (
                            JenisPelanggaran.find(
                              (jenis) => jenis.value === value
                            )?.label
                          ) : (
                            "Pilih Jenis Pelanggaran"
                          )}

                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent align="start" className="w-[300px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Cari jenis pelanggaran"
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
                                  Tidak bisa menemukan jenis pelanggaran
                                </CommandEmpty>
                                <CommandGroup>
                                  {JenisPelanggaran.map((jenis) => (
                                    <CommandItem
                                      key={jenis.value}
                                      value={jenis.label}
                                      onSelect={(currentLabel) => {
                                        const selectedJenis =
                                          JenisPelanggaran.find(
                                            (item) =>
                                              item.label === currentLabel
                                          );
                                        if (selectedJenis) {
                                          setValue(selectedJenis.value);
                                        }
                                        setOpenCombo(false);
                                      }}
                                    >
                                      {jenis.label}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          value === jenis.value
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
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="prioritas">Kategori</Label>
                    <Select
                      value={kategori}
                      onValueChange={(value) => SetKategori(value)}
                    >
                      <SelectTrigger id="prioritas" className="w-full">
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ringan">Ringan</SelectItem>
                        <SelectItem value="Sedang">Sedang</SelectItem>
                        <SelectItem value="Berat">Berat</SelectItem>
                        <SelectItem value="Sangat Berat">
                          Sangat Berat
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="poin">Poin</Label>
                    <Input
                      id="poin"
                      name="poin"
                      value={poin}
                      onChange={(e) => setPoin(e.target.value)}
                      placeholder="Poin"
                    />
                  </div>
                </div>
              </>
            )}

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" disabled={isLoading}>
                  Batal
                </Button>
              </DialogClose>
              <Button
                className="bg-green-700 hover:bg-green-800"
                type="submit"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditKategoriPelanggaranData;
