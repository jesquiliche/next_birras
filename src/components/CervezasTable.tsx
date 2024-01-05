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
const CervezasTable = ({  cervezas, setCervezas  }: Props) => {
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
      setCervezas(cervezas.filter((e) => e.id !== id));
    } catch (error) {
      alert(error);
    }
  };

 
  return (
    <MagicMotion>
          <table className="w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>País</th>
          <th>Color</th>
          <th>Graduación</th>
          <th>Foto</th>
          <th className="w-10">Ver</th>
          <th className="w-10">Editar</th>
          <th className="w-10">Borrar</th>
        </tr>
      </thead>
      <tbody>
        {cervezas.map((cerveza) => (
          <tr key={cerveza.id} className="border-2 rounded-lg bg-gray-50 mb-5">
            <td className="p-2">{cerveza.id}</td>
            <td className="p-2">{cerveza.nombre}</td>
            <td className="p-2">{cerveza.tipo}</td>
            <td className="p-2">{cerveza.pais}</td>
            <td className="p-2">{cerveza.color}</td>
            <td className="p-2">{cerveza.graduacion}</td>
            <td className="p-2">
              <img
                src={cerveza.foto}
                className="min-w-[100px]"
                alt={cerveza.nombre}
              />
            </td>
            <td className="p-4">
              <Link
                href={`/Cervezas/Ver/${cerveza.id}`}
                className="bg-green-500 text-white rounded-lg px-2 py-1"
              >
                Ver
              </Link>
            </td>
            <td className="p-4 w-30">
              <Link
                href={`/Cervezas/Edit/${cerveza.id}`}
                className="bg-yellow-500 text-white rounded-lg px-2  py-1"
              >
                Editar
              </Link>
            </td>
            <td>
              <button className="bg-red-600 text-white rounded-lg px-2"
              onClick={async()=>await BorrarCerveza(cerveza.id)}
              >
                Borrar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </MagicMotion>

  );
};

export default CervezasTable;
