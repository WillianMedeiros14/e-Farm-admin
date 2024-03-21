import { db, doc, getDoc } from "@/config/firebase";

export interface IUser {
  type: string;
}

export interface IGetUserDetailsServiceProps {
  userId: string;
  isEnabled?: boolean;
}

export async function getUserDetailsService({
  userId,
}: IGetUserDetailsServiceProps) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as IUser;
  } else {
    return undefined;
  }
}
