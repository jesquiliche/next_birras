`use client`
import { Cerveza } from "@/interfaces/interfaces";
import Link from "next/link";
import React, { cache, useEffect } from "react";
import { useSession } from "next-auth/react";
import { MagicMotion } from "react-magic-motion";




interface Props {
  cervezas: Cerveza[];
  setCervezas: React.Dispatch<React.SetStateAction<Cerveza[]>>;
}
const Cards = ({  cervezas, setCervezas  }: Props) => {
  const { data: session, status } = useSession();

  const BorrarCerveza =async (id: number) => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1/";
    
    const token = session?.authorization.token;
    try {
      const response = await fetch(`${apiUrl}cervezas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
      if(!response.ok){
        alert("Su sesión ha caducado")
      }
      setCervezas(cervezas.filter((e) => e.id !== id));
    } catch (error) {
      alert(error);
    }
  };

 
  return (
    <MagicMotion>
        <div className="grid grid-cols-4 gap-4">

        {cervezas.map((cerveza) => (
  <div key={cerveza.id} className="border-2 shadow-lg p-2 rounded-lg bg-gray-50 flex flex-col justify-between">
    
    <img
      src={cerveza.foto}
      className="w-[200px]"
      alt={cerveza.nombre}
    />
    <h3 className="font-bold text-md">{cerveza.nombre}</h3>
    <div className="flex justify-between p-2 mt-2">
      <Link
        href={`/Cervezas/Ver/${cerveza.id}`}
        className="bg-green-500 text-white rounded-lg px-2 py-1"
      >
        Ver
      </Link>
      <Link
        href={`/Cervezas/Edit/${cerveza.id}`}
        className="bg-yellow-500 text-white rounded-lg px-2 py-1"
      >
        Editar
      </Link>
      <button
        className="bg-red-600 text-white rounded-lg px-2"
        onClick={async () => await BorrarCerveza(cerveza.id)}
      >
        Borrar
      </button>
    </div>
  </div>
))}
</div>
    </MagicMotion>

  );
};

export default Cards;
