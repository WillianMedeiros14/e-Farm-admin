"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { db, doc, deleteDoc } from "@/config/firebase";

import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface DialogSignOutProps {
  id: string;
}

export function DeleteProduct({ id }: DialogSignOutProps) {
  const { back } = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const docRef = doc(db, "products", id);
        await deleteDoc(docRef);
        console.log(`Item com ID ${id} foi deletado com sucesso.`);
      } catch (error) {
        console.error("Erro ao deletar o item:", error);
      }
      return null;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["dataGetCompanyAll"] });
      toast({
        description: "Produto deletado",
      });
      setOpen(false);
      back();
    },

    onError() {
      toast({
        description: "Erro ao deletar produto",
        variant: "destructive",
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-15 border bg-red-500 text-black hover:bg-red-500">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Exluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir item</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir esse item do estoque?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutate();
            }}
          >
            Sim, excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
