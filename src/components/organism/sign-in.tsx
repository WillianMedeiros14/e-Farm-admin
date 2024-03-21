"use client";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputComponent } from "../atoms/input-comnponent";

const formSchema = z.object({
  email: z.string().min(5, {
    message: "E-mail é um campo obrigatório",
  }),
  password: z.string().min(6, {
    message: "Senha deve conter pelo menos 6 caracteres",
  }),
});

export function SignIn() {
  const { SignIn } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return SignIn({
        ...values,
      });
    },
    onSuccess: () => {
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-16 w-2/4 space-y-4 flex flex-col"
      >
        <p className="font-semibold text-2xl text-black text-center">
          Administre sua farmácia
        </p>

        <p className="text-base text-black text-center">
          Informe seu e-mail e senha
        </p>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <InputComponent
              title="E-mail"
              placeholder="Informe seu e-mail"
              isLoading={isPending}
              field={{ ...field }}
            />
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <InputComponent
              title="Senha"
              type="password"
              placeholder="Informe sua senha"
              isLoading={isPending}
              field={{ ...field }}
            />
          )}
        />

        <Button
          disabled={isPending}
          type="submit"
          className="w-full bg-primary-main"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Entrar
        </Button>
      </form>
    </Form>
  );
}
