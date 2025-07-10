import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { supabase } from "@/lib/supabase/supabaseClient";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DeleteKeteranganIzinDialog = (props) => {
  const { deleteId, setDialogState } = props;
  const [Open, SetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (deleteId) SetOpen(true);
  }, [deleteId]);

  const handleClose = () => {
    setDialogState(null);
    SetOpen(false);
  };

  const deleteKeseahtanRecord = async (deleteId) => {
    setIsLoading(true);
    const id = deleteId;
    try {
      const { error } = await supabase
        .from("keterangan_izin")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast.success("Data Berhasil Dihapus");
      handleClose();
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.message || "Gagal menghapus data dari server");
    }
  };

  return (
    <AlertDialog
      open={Open}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <AlertDialogContent className="sm:max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda Yakin ?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus
            data Anda dari server kami.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteKeseahtanRecord(deleteId)}
            className={`bg-red-600 hover:bg-red-700 cursor-pointer`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              "Hapus"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteKeteranganIzinDialog;
