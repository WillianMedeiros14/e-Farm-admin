import { TypeFormNewProduct } from "@/components/organism/modal-new-product";
import {
  db,
  collection,
  addDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@/config/firebase";

export interface INewProductServiceProps {
  data: TypeFormNewProduct;
  imageSelected: File | null;
}

export async function newProductService({
  data,
  imageSelected,
}: INewProductServiceProps) {
  try {
    if (imageSelected) {
      const storageRef = ref(storage, `product_images/${imageSelected.name}`);
      await uploadBytes(storageRef, imageSelected);

      const imageUrl = await getDownloadURL(storageRef);

      let values = {
        ...data,
        createdAt: new Date(),
        image: imageUrl,
        price: parseFloat(data.price),
        quantityInStock: parseFloat(data.quantityInStock),
      };

      const docRef = await addDoc(collection(db, "products"), {
        ...values,
      });
    }
  } catch (error) {
    console.error("Erro ao finalizar a compra:", error);
  }
}
