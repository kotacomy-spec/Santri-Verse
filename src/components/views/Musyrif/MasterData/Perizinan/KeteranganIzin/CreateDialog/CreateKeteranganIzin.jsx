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

const CreateKeteranganIzin = (props) => {
  const { dialogstate, setDialogState } = props;
  const [OpenDialog, setOpenDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const nama = formData.get("nama");
    const deskripsi = formData.get("deskripsi");

    if (!nama) {
      toast.error("Masukkan Nama Terlebih dahulu");
      return;
    }

    setIsSubmitting(true);

    try {
      const insertData = {
        nama,
        deskripsi,
      };

      const { error } = await supabase
        .from("keterangan_izin")
        .insert([insertData]);

      if (error) throw error;
      toast.success("Data Berhasil Ditambah");

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
                  <Label htmlFor="nama">Nama Keterangan Izin</Label>
                  <Input
                    id="nama"
                    name="nama"
                    placeholder="Jenis Pelanggaran"
                    autoComplete="off"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="deskripsi">Deskripsi/Keterangan</Label>
                  <Input
                    id="deskripsi"
                    name="deskripsi"
                    placeholder="Keterangan/Deskripsi"
                  />
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

export default CreateKeteranganIzin;
