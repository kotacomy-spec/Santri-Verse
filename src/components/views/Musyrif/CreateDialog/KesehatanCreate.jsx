import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase/supabaseClient";

const CreateKesehatan = (props) => {
  const { dialogstate, setDialogState } = props;
  const [isLoading, setLoading] = useState(true);
  const [OpenDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [Prioritas, setPrioritas] = useState("");
  const [openCombo, setOpenCombo] = useState(false);
  const [value, setValue] = useState("");
  const [musyrif, setMusyrif] = useState();
  const [santriData, setSantri] = useState([]);

  const getData = async () => {
    setLoading(true);
    const { data: Musyrif } = await supabase.auth.getUser();
    const musyrifId = Musyrif.user.id;

    const { data: SantriData } = await supabase
      .from("santri")
      .select(`nama, id`);

    const { data: MusyirfProfile } = await supabase
      .from("profiles")
      .select("id , username")
      .eq("id", musyrifId)
      .single();

    const formatted = SantriData.map((item) => ({
      label: item.nama,
      value: item.id,
    }));

    setSantri(formatted);
    setMusyrif(MusyirfProfile);
    setLoading(false);
  };

  //   const handleSubmitForm()

  useEffect(() => {
    getData();
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
          <form>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Tambah Data Kesehatan Santri</DialogTitle>
                <DialogDescription>
                  Tambahkan data kesehatan santri agar kami dapat memantau
                  kondisi dan penanganannya dengan baik.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="grid gap-3">
                  <Label htmlFor="santri">Santri</Label>
                  <Popover open={openCombo} onOpenChange={setOpenCombo}>
                    <PopoverTrigger asChild>
                      <Button
                        id="santri"
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
                          santriData.find((santri) => santri.value === value)
                            ?.label
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
                                    value={santri.value}
                                    onSelect={(currentValue) => {
                                      setValue(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );
                                      setOpenCombo(false);
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
                      defaultValue={musyrif?.username}
                      placeholder="Nama musyrif"
                      disabled
                    />
                  )}
                </div>
                <div className="grid gap-3">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="date" className="px-1">
                      Tgl Diperiksa
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
                  <Label htmlFor="diperiksa_oleh">Diperiksa Oleh</Label>
                  <Input
                    id="diperiksa_oleh"
                    name="diperiksa_oleh"
                    placeholder="Nama petugas medis"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="diagnosa">Diagnosa</Label>
                  <Input
                    id="diagnosa"
                    name="diagnosa"
                    placeholder="Hasil diagnosa"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="keluhan">Keluhan</Label>
                  <Textarea
                    className={`resize-none`}
                    id="keluhan"
                    name="keluhan"
                    placeholder="Tulisa keluhan santri disini..."
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="prioritas">Prioritas</Label>
                  <Select onValueChange={(value) => setPrioritas(value)}>
                    <SelectTrigger id="prioritas" className="w-full">
                      <SelectValue placeholder="Pilih Prioritas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rendah">Rendah</SelectItem>
                      <SelectItem value="Sedang">Sedang</SelectItem>
                      <SelectItem value="Tinggi">Tinggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Batal</Button>
                </DialogClose>
                <Button
                  className={`bg-green-700 cursor-pointer hover:bg-green-800`}
                  type="submit"
                >
                  Simpan
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </>
  );
};

export default CreateKesehatan;
