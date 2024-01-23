"use client";
import { fetchPaises, fetchDeletePaisesById } from "@/services/api";
import { PaisesData } from "@/interfaces/interfaces";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Load from "@/components/Load";
import { useState, useEffect } from "react";

const page = () => {
  const [paises, setPaises] = useState<PaisesData | undefined>();
  const { data: session, status } = useSession();

  const borrarPais = async (id: string) => {
    const token = session?.authorization.token || "";
    const ok = await fetchDeletePaisesById(id, token);
    if (!ok) {
      alert("No se pudo borrar el tipo, tiene cervezas relacionadas");
    } else {
    }
  };

  if (status == "loading") {
    return (
      <p>
        <Load />
      </p>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const paisesData = await fetchPaises();
    
      setPaises(paisesData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Paises</h1>
      <div className="w-11/12 mx-auto border-2 p-4 rounded-lg">
        <Link href="/Paises/Add" className="btn-primary py-2">
          Añadir
        </Link>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <th className="hidden md:table-cell">#</th>
              <th>Nombre</th>
              <th className="hidden md:table-cell">Descripción</th>
              <th className="w-10">Editar</th>
              <th className="w-10">borrar</th>
            </thead>
            <tbody>
              {paises &&
                paises.data.map((t) => (
                  <tr key={t.id}>
                    <td className="p-2 hidden md:table-cell">{t.id}</td>
                    <td className="p-2">{t.nombre}</td>
                    <td className="p-2 hidden md:table-cell">{t.descripcion}</td>
                    <td className="p-4">
                      <Link
                        href={`/Paises/Edit/${t.id}`}
                        className="btn-primary"
                      >
                        Editar
                      </Link>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={async () => borrarPais(t.id.toString())}
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default page;
