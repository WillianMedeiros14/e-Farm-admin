import Image from "next/image";

import { ModalCar } from "../organism/modal-car";
import { isLoginSSR } from "@/functions/isLoginSSR";
import { DialogSignOut } from "./dialogSignOut";

export function Navbar() {
  return (
    <div className="max-w-screen-2xl mx-auto mb-9 flex w-full items-center justify-between flex-wrap gap-4 p-10">
      <div className="flex items-center gap-4">
        <Image
          src={"/assets/logoEFarmas.svg"}
          alt={"E-Farms"}
          width={112}
          height={20}
        />
      </div>

      <div className="flex">
        {isLoginSSR() && (
          <div className="flex gap-3">
            <ModalCar />

            <DialogSignOut
              label={"Sair"}
              title={"Confirmar saída"}
              description={
                "Você está prestes a sair do sistema. Tem certeza de que deseja prosseguir? Se você sair, será desconectado da sua conta e precisará fazer login novamente para acessar o sistema."
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
