"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { InputComponent } from "../atoms/input-comnponent";

import { Form, FormField } from "../ui/form";
import { useToast } from "../ui/use-toast";
import { InputSelect } from "../atoms/input-select";
import { newProductService } from "@/services/newProduct.service";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Digite um nome",
  }),
  category: z.string().min(1, {
    message: "Selecione uma categoria",
  }),
  description: z.string().min(1, {
    message: "Digite uma descrição",
  }),
  expirationDate: z.string().min(1, {
    message: "Informe a data de validade",
  }),
  image: z.string().min(1, {
    message: "Selecione uma imagem",
  }),
  amount: z.string().min(1, {
    message: "Informe a quantidade",
  }),
  manufacturer: z.string().min(1, {
    message: "Informe o fabricante",
  }),
  pharmaceuticalForm: z.string().min(1, {
    message: "Infome a forma farmaceutica",
  }),
  presentation: z.string().min(1, {
    message: "Informe a apresentação",
  }),
  price: z.string().min(1, {
    message: "Informe o preço do produto",
  }),
  quantityInStock: z.string().min(1, {
    message: "Informe a quantidade em estoque",
  }),
});

export type TypeFormNewProduct = z.infer<typeof formSchema>;

interface ModalNewProductProps {
  refetchApi: () => void;
}

export function ModalNewProduct({ refetchApi }: ModalNewProductProps) {
  const { toast } = useToast();

  const form = useForm<TypeFormNewProduct>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      expirationDate: "",
      image: "",
      manufacturer: "",
      pharmaceuticalForm: "",
      presentation: "",
      amount: "",
      price: "",
      quantityInStock: "",
    },
  });

  const [open, setOpen] = React.useState(false);
  const [image, setImage] = useState<File | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: TypeFormNewProduct) => {
      return newProductService({ data: values, imageSelected: image });
    },
    onSuccess: () => {
      form.reset();
      handleClose();

      setTimeout(() => {
        setImage(null);
      }, 500);

      refetchApi();

      toast({
        description: "Cadastro realizado com sucesso!",
        className: "bg-green-600 text-white",
      });
    },

    onError(error: any) {
      const { data } = error?.response;

      console.log({ data });

      toast({
        description: "Erro ao cadastr produto",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
    mutate(values);
  }

  const handleChange = (e: any) => {
    const selectedImage = e.target.files[0];
    if (selectedImage && selectedImage.type.includes("image")) {
      setImage(selectedImage);
      setTimeout(() => {
        form.setValue("image", selectedImage.name);
      }, 500);
    } else {
      toast({
        description: "Por favor, selecione um arquivo de imagem válido.",
        variant: "destructive",
      });
    }
  };

  function changeImage() {
    form.reset({ image: undefined });

    setTimeout(() => {
      setImage(null);
    }, 500);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="w-17 bg-secondary text-white hover:bg-secondary"
          onClick={() => {
            form.reset();
          }}
        >
          Adicionar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-screen overflow-auto">
        <AlertDialogHeader>
          <div className="flex flex-row items-center justify-between">
            <AlertDialogTitle className="font-semibold flex text-center text-2xl justify-center items-center">
              Novo produtos
            </AlertDialogTitle>
            <Button
              variant={"outline"}
              disabled={false}
              type="submit"
              className="w-3 text-1xl border-0"
              onClick={handleClose}
            >
              x
            </Button>
          </div>
        </AlertDialogHeader>

        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 w-full space-y-4"
            >
              <span className="font-semibold">Informações do produto</span>
              <div className="mb-8">
                {image === null ? (
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <InputComponent
                        title="Foto"
                        placeholder="Arraste e solte ou insira sua foto aqui"
                        isLoading={isPending}
                        field={{ ...field }}
                        onChange={handleChange}
                        accept="image/*"
                        type="file"
                      />
                    )}
                  />
                ) : (
                  <div className="flex justify-between items-end gap-4">
                    <div className="w-[100%]">
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <InputComponent
                            title="Foto"
                            placeholder="Arraste e solte ou insira sua foto aqui"
                            isLoading={isPending}
                            field={{ ...field }}
                            onChange={handleChange}
                            disabled={true}
                          />
                        )}
                      />
                    </div>

                    <Button
                      className="text-black bg-amber-500 text-xs font-semibold hover:bg-amber-500"
                      onClick={changeImage}
                    >
                      Editar
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <div className="w-[62%] gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <InputComponent
                        title="Produto"
                        placeholder="Nome do produto"
                        isLoading={isPending}
                        field={{ ...field }}
                      />
                    )}
                  />
                </div>

                <div className="w-[35%]">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <InputComponent
                        title="Valor"
                        placeholder="Informe o valor"
                        isLoading={isPending}
                        field={{ ...field }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-[62%] gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <InputSelect
                        title="Categoria"
                        placeholder="Selecione uma categoria"
                        data={[
                          { id: "Todas", name: "Todas" },
                          {
                            id: " Anti-inflamatório",
                            name: " Anti-inflamatório",
                          },
                          { id: "Alergias", name: "Alergias" },
                          { id: "Dores", name: "Dores" },
                          { id: "Gripe", name: "Gripe" },
                        ]}
                        field={{ ...field }}
                        placeholderSearch="Pesquise uma ocorrência"
                        placeholderSearchNotFound="Ocorrência não encontrada"
                      />
                    )}
                  />
                </div>

                <div className="w-[35%]">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <InputComponent
                        title="Quantidade"
                        placeholder="Informe a qtd."
                        isLoading={isPending}
                        field={{ ...field }}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-between ">
                <div className="w-[48.5%] gap-4">
                  <FormField
                    control={form.control}
                    name="manufacturer"
                    render={({ field }) => (
                      <InputComponent
                        title="Fabricante"
                        placeholder="Informe o fabricante"
                        isLoading={isPending}
                        field={{ ...field }}
                      />
                    )}
                  />
                </div>

                <div className="w-[48.5%]">
                  <FormField
                    control={form.control}
                    name="pharmaceuticalForm"
                    render={({ field }) => (
                      <InputComponent
                        title="Forma farmaceutica"
                        placeholder="Informe a farmaceutica"
                        isLoading={isPending}
                        field={{ ...field }}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-between ">
                <div className="w-[48.5%]">
                  <FormField
                    control={form.control}
                    name="presentation"
                    render={({ field }) => (
                      <InputComponent
                        title="Apresentação"
                        placeholder="Informe a apresentação"
                        isLoading={isPending}
                        field={{ ...field }}
                      />
                    )}
                  />
                </div>

                <div className="w-[48.5%] gap-4">
                  <FormField
                    control={form.control}
                    name="expirationDate"
                    render={({ field }) => (
                      <InputComponent
                        title="Data de validade"
                        placeholder="Informe o a data de validade"
                        isLoading={isPending}
                        field={{ ...field }}
                        type="date"
                      />
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <InputComponent
                    title="Descrição"
                    placeholder="Digite a descrição do remédio"
                    isLoading={isPending}
                    field={{ ...field }}
                  />
                )}
              />

              <div className="mt-8">
                <span className="font-semibold ">Informações de estoque</span>
              </div>

              <div className="w-[35%]">
                <FormField
                  control={form.control}
                  name="quantityInStock"
                  render={({ field }) => (
                    <InputComponent
                      title="Quantidade em estoque"
                      placeholder="Informe a qtd. em estoque"
                      isLoading={isPending}
                      field={{ ...field }}
                    />
                  )}
                />
              </div>
              <Button
                disabled={false}
                type="submit"
                className="w-full bg-green-400 text-black hover:bg-green-400"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar
              </Button>
            </form>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
