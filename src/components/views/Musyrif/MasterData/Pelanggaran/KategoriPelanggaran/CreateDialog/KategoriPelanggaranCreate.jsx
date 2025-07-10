import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";
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

const CreateKategoriPelanggaran = (props) => {
  const { dialogstate, setDialogState } = props;
  const [OpenDialog, setOpenDialog] = useState(false);
  const [Kategori, SetKategori] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openCombo, setOpenCombo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [JenisPelanggaran, SetJenisPelanggaran] = useState([]);
  const [value, setValue] = useState();

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const nama = formData.get("nama");
    const poin = formData.get("poin");
    setIsSubmitting(true);

    try {
      const insertData = {
        nama,
        kategori: Kategori,
        poin,
        jenis_pelanggaran_id: value,
      };

      const { error } = await supabase
        .from("data_pelanggaran")
        .insert([insertData]);

      if (error) throw error;
      toast.success("Data Berhasil Ditambah");

      e.target.reset();

      handleClose();
      setIsSubmitting(false);
    } catch (error) {
      if (error) {
        toast.error(error?.message || "Terjadi kesalahan saat insert data");
        setIsSubmitting(false);
      }
    }
  };

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

  useEffect(() => {
    setOpenDialog(dialogstate);
  }, [dialogstate]);

  const handleClose = () => {
    setOpenDialog(false);
    setDialogState(false);
  };

  return (
    <>
      <div>
        <Dialog
          open={dialogstate}
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
        >
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSubmitForm}>
              <DialogHeader>
                <DialogTitle>Tambah Kategori Pelanggaran</DialogTitle>
                <DialogDescription className={`mb-3 -mt-1`}>
                  Tambah kategori pelanggaran santri
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
                                          (item) => item.label === currentLabel
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
                  <Select onValueChange={(value) => SetKategori(value)}>
                    <SelectTrigger id="prioritas" className="w-full">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ringan">Ringan</SelectItem>
                      <SelectItem value="Sedang">Sedang</SelectItem>
                      <SelectItem value="Berat">Berat</SelectItem>
                      <SelectItem value="Sangat Berat">Sangat Berat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="poin">Poin</Label>
                  <Input id="poin" name="poin" placeholder="Poin" />
                </div>
              </div>
              <DialogFooter className={`mt-4`}>
                <DialogClose asChild>
                  <Button variant="outline">Batal</Button>
                </DialogClose>
                <Button
                  className={`bg-green-700 cursor-pointer hover:bg-green-800`}
                  type="submit"
                  disabled={isSubmitting}
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
      </div>
    </>
  );
};

export default CreateKategoriPelanggaran;
