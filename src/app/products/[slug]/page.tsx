import { DeleteProduct } from "@/components/molecules/deleteProduct";
import { ModalEditProduct } from "@/components/organism/modal-edit-product";
import { Button } from "@/components/ui/button";
import { db, doc, getDoc } from "@/config/firebase";
import { IProducts } from "@/services/getProductsHome.service";

import { cookies } from "next/headers";
import Image from "next/image";

export interface RegisterProps {
  id: string;
  type: string;
  description: string;
  agent: AgentProps;
}

export interface AgentProps {
  id: string;
  name: string;
  phone: string;
  company: CompanyProps;
}

export interface CompanyProps {
  name: string;
  organ: string;
  sector: string;
  address: AddressProps;
}

export interface AddressProps {
  id: string;
  zipCode: string;
  streetAddress: string;
  number: number;
  district: string;
  state: string;
  city: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

async function getData({ id }: { id: string }): Promise<IProducts | undefined> {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as IProducts;
  } else {
    return undefined;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData({ id: params.slug });

  return (
    <main className="flex flex-1 w-full flex-col">
      <div className="flex flex-1 w-full justify-center">
        <div className="flex flex-1 max-w-screen-2xl pl-10 pr-10 flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">
              Produto
              <span className="font-normal"> {data?.name}</span>
            </h1>
          </div>

          {data && (
            <div className="flex justify-end w-full gap-4">
              <div className="flex items-center gap-4">
                <ModalEditProduct
                  id={params.slug}
                  dataProduct={{
                    amount: String(data?.amount),
                    category: String(data?.category),
                    description: String(data?.description),
                    expirationDate: data?.expirationDate,
                    image: data?.image,
                    manufacturer: String(data?.manufacturer),
                    name: data?.name,
                    pharmaceuticalForm: String(data?.pharmaceuticalForm),
                    presentation: String(data?.presentation),
                    price: String(data?.price),
                    quantityInStock: String(data?.quantityInStock),
                  }}
                />
              </div>

              <div className="flex items-center gap-2">
                <DeleteProduct id={params.slug} />
              </div>
            </div>
          )}

          {data && (
            <div>
              <div className="flex items-center">
                <Image
                  src={data?.image}
                  alt={"E-Farms"}
                  width={274}
                  height={274}
                />

                <div className="pl-8">
                  <div>
                    <span className="font-normal text-sm text-gray-400">
                      Produto
                    </span>
                    <p className="font-normal text-2xl">{data?.name}</p>

                    <p className="font-bold text-sm text-gray-400">
                      {data?.category}
                    </p>
                  </div>

                  <div className="flex mt-8 gap-8">
                    <div>
                      <span className="font-normal text-sm text-gray-400">
                        Valor
                      </span>
                      <p className="font-bold text-4xl">
                        R$ {data?.price.toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <span className="font-normal text-sm text-gray-400">
                        Quantidade
                      </span>
                      <p className="font-bold text-4xl">{data?.amount}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <div>
                  <span className="font-normal text-sm text-gray-400">
                    Fabricante
                  </span>
                  <p className="font-regular text-sm">{data?.manufacturer}</p>
                </div>

                <div>
                  <span className="font-normal text-sm text-gray-400">
                    Forma farmacêutica
                  </span>
                  <p className="font-regular text-sm">
                    {data?.pharmaceuticalForm}
                  </p>
                </div>

                <div>
                  <span className="font-normal text-sm text-gray-400">
                    Apresentação
                  </span>
                  <p className="font-regular text-sm">{data?.presentation}</p>
                </div>

                <div>
                  <span className="font-normal text-sm text-gray-400">
                    Data de validade
                  </span>
                  <p className="font-regular text-sm">{data?.expirationDate}</p>
                </div>

                <div>
                  <span className="font-normal text-sm text-gray-400">
                    Quantidade em estoque
                  </span>
                  <p className="font-regular text-sm">
                    {data?.quantityInStock}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <span className="font-normal text-sm text-gray-400">
                  Descrição
                </span>
                <p className="font-regular text-sm">{data?.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
