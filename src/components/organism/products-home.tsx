"use client";

import { useState } from "react";
import { useGetProductsHome } from "@/hooks/useGetProductsHome";

import { Loader2 } from "lucide-react";

import { ModalNewProduct } from "./modal-new-product";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { queryClient } from "@/app/providers";
import { ModalEditProduct } from "./modal-edit-product";
import Link from "next/link";

export function ProductsHome() {
  const [search, setSearch] = useState("");

  const [input, setInput] = useState("");

  const { data, isLoading } = useGetProductsHome({
    search,
  });

  function refetchApi(isEdit: boolean) {
    setSearch("");
    setInput("");

    if (isEdit) {
      queryClient.invalidateQueries({
        queryKey: ["keyProductsHome", search],
      });
    } else {
      queryClient.invalidateQueries({
        queryKey: ["keyProductsHome", ""],
      });
    }
  }

  return (
    <view className="flex flex-1 w-full flex-col">
      <div className="flex justify-between mb-4">
        <div>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Pesquisar remédio"
              onChange={(event) => {
                setInput(event.target.value);
              }}
            />
            <Button
              type="submit"
              className="bg-primary-main hover:bg-primary-main"
              onClick={() => {
                setSearch(input);
              }}
            >
              Pesquisar
            </Button>
          </div>
        </div>

        <ModalNewProduct refetchApi={() => refetchApi(true)} />
      </div>

      {isLoading && (
        <div className="flex flex-wrap mx-auto pt-10 justify-center">
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        </div>
      )}

      {data && data.length === 0 && (
        <div className="flex flex-wrap mx-auto pt-10 justify-center">
          Produto não encontrado
        </div>
      )}

      {data && data?.length > 0 && (
        <table className="flex w-full flex-col border rounded-xl p-8">
          <thead className="w-full">
            <tr className="flex justify-between border-b">
              <th
                scope="col"
                className="font-medium text-left text-base text-neutral-500 min-w-52 py-4"
              >
                ID
              </th>
              <th
                scope="col"
                className=" flex flex-1 font-medium text-base text-neutral-500 py-4"
              >
                Remédio
              </th>
            </tr>
          </thead>

          {data && data?.length > 0 && (
            <>
              {data?.map((item) => (
                <tbody
                  key={item.id}
                  className="w-full flex flex-col justify-center"
                >
                  <tr className="flex justify-between pt-4 pb-4 border-b ">
                    <th
                      scope="row"
                      className="font-normal text-left text-base min-w-52 flex items-center"
                    >
                      {item.id}
                    </th>
                    <td className="flex flex-1 font-normal text-base items-center">
                      {item.name}
                    </td>
                    <td>
                      <Link
                        href={`/products/${item.id}`}
                        className="w-17 text-white bg-sky-400 text-xs font-semibold hover:bg-sky-400 p-3 rounded-sm "
                      >
                        Visualizar
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </>
          )}
        </table>
      )}
    </view>
  );
}
