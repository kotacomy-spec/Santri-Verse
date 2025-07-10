import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { supabase } from "@/lib/supabase/supabaseClient";
import { toast } from "sonner";

const CreateJenisPelanggaran = (props) => {
  const { dialogstate, setDialogState } = props;
  const [OpenDialog, setOpenDialog] = useState(false);
  const [Status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const nama = formData.get("nama");
    const keterangan = formData.get("keterangan");

    if (!Status) {
      toast.error("Pilih prioritas terlebih dahulu");
      return;
    }

    if (!nama) {
      toast.error("Nama Jenis Pelanggaran Wajib Disii !");

      return;
    }

    setIsSubmitting(true);

    try {
      const insertData = {
        nama,
        keterangan,
        aktif: Status,
      };

      const { error } = await supabase
        .from("jenis_pelanggaran")
        .insert([insertData]);

      if (error) throw error;
      toast.success("Data Berhasil Ditambah");

      setStatus("");
      e.target.reset();

      handleClose();
      setIsSubmitting(false);
    } catch (error) {
      if (error) {
        toast.error(error?.message || "Terjadi kesalahan saat insert data");
        console.log(error?.message);
      }
    }
  };

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
                <DialogTitle>Tambah Jenis Pelanggaran</DialogTitle>
                <DialogDescription className={`mb-3 -mt-1`}>
                  Tambah Jenis pelanggaran santri
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="nama">Nama Jenis Pelanggaran</Label>
                  <Input
                    id="nama"
                    name="nama"
                    placeholder="Jenis Pelanggaran"
                    autoComplete="off"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="keterangan">Keterangan</Label>
                  <Input
                    id="keterangan"
                    name="keterangan"
                    placeholder="Keterangan"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="prioritas">Status</Label>
                  <Select onValueChange={(value) => setStatus(value)}>
                    <SelectTrigger id="prioritas" className="w-full">
                      <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Aktif</SelectItem>
                      <SelectItem value="false">Tidak Aktif</SelectItem>
                    </SelectContent>
                  </Select>
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

export default CreateJenisPelanggaran;
