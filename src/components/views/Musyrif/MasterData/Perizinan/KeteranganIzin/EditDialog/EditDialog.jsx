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
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const EditKeteranganIzinData = (props) => {
  const { editId, setDialogState } = props;

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!editId) return;

      setIsLoading(true);
      setOpen(true);

      const { data, error } = await supabase
        .from("keterangan_izin")
        .select("id, nama, deskripsi")
        .eq("id", editId)
        .single();

      if (error) {
        toast.error("Gagal mengambil data");
        setIsLoading(false);
        return;
      }

      setNama(data.nama || "");
      setDeskripsi(data.deskripsi || "");
      setIsLoading(false);
    };

    fetchData();
  }, [editId]);

  const handleClose = () => {
    setDialogState(null);
    setOpen(false);
    setNama("");
    setDeskripsi("");
    setIsLoading(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("keterangan_izin")
        .update({
          nama,
          deskripsi,
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
                    <Label htmlFor="nama">Nama Jenis Pelanggaran</Label>
                    <Input
                      id="nama"
                      name="nama"
                      placeholder="Jenis Pelanggaran"
                      value={nama}
                      autoComplete="off"
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="keterangan">Deskripsi/Keterangan</Label>
                    <Input
                      id="keterangan"
                      name="keterangan"
                      placeholder="Deskripsi/Keterangan"
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
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

export default EditKeteranganIzinData;
