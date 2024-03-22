import { ProductsHome } from "@/components/organism/products-home";

export default function products() {
  return (
    <main className="flex flex-1 w-full flex-col">
      <main className="flex flex-1 w-full justify-center">
        <div className="flex flex-1 max-w-screen-2xl pl-10 pr-10 flex-col">
          <span className="text-2xl font-semibold mb-4">Produtos</span>
          <ProductsHome />
        </div>
      </main>
    </main>
  );
}
