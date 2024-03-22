import {
  IGetProductsHomeServiceProps,
  getProductsHomeService,
} from "@/services/getProductsHome.service";

import { useQuery } from "@tanstack/react-query";

export function useGetProductsHome({ search }: IGetProductsHomeServiceProps) {
  return useQuery({
    queryKey: ["keyProductsHome", search],
    queryFn: () => getProductsHomeService({ search }),
  });
}
