import { collection, db, getDocs, query, where } from "@/config/firebase";

interface IError {
  error: {};
  message: string;
}

export interface IProducts {
  amount?: string;
  category?: string;
  description?: string;
  expirationDate: string;
  id: string;
  image: string;
  manufacturer?: string;
  name: string;
  pharmaceuticalForm?: string;
  presentation?: string;
  price: number;
  quantityInStock?: number;
}

export interface IGetProductsHomeServiceProps {
  search: string;
}

export async function getProductsHomeService({
  search,
}: IGetProductsHomeServiceProps): Promise<IProducts[] | null> {
  try {
    const docRef = collection(db, "products");
    let queryRef;

    if (search.length === 0) {
      queryRef = docRef;
    } else {
      const startAt = search;
      const endAt = search + "\uf8ff";
      queryRef = query(
        docRef,
        where("name", ">=", startAt),
        where("name", "<=", endAt)
      );
    }

    const docSnap = await getDocs(queryRef);

    let value: IProducts[] = [];

    docSnap.forEach((doc) => {
      const data = doc.data() as IProducts;
      const newValue = {
        ...data,
        id: doc.id,
      };
      value.push(newValue);
    });

    if (value.length > 0) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    console.log({ error });
    return null;
  }
}
