import { SignIn } from "@/components/organism/sign-in";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 w-full items-center justify-center">
      <div className="flex flex-1 max-w-screen-2xl">
        <div className="flex w-2/4 justify-end">
          <Image
            src={"/assets/InsuranceScreenLogin.svg"}
            alt={"E-Farms"}
            width={500}
            height={500}
          />
        </div>

        <div className="flex flex-1 items-center pl-14">
          <SignIn />
        </div>
      </div>
    </main>
  );
}
