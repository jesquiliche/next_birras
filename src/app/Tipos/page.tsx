'use client'
import {
  fetchDeleteTiposById,
  fetchTipos,
} from "@/services/api";
import { Tipo } from "@/interfaces/interfaces";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Load from "@/components/Load";
import { MagicMotion } from "react-magic-motion";

const page =  () => {
  const [tipos, setTipos] = useState<Tipo[] | undefined>([]);
  const { data: session, status} = useSession();
  const [actualiza,setActualiza]=useState(false)

  if (status == "loading") {
    return (
      <p>
        <Load />
      </p>
    );
  }

  console.log(session)
  const borrarTipo = async (id: string) => {
    const token = session?.authorization.token || "";
    await fetchDeleteTiposById(id, token);
    setActualiza(true);
  };

useEffect(() => {
    const fetchData = async () => {
      const tiposData=await fetchTipos()
      console.log(tiposData);
      setTipos(tiposData);
    };

    fetchData();
  }, []);


  
 useEffect(() => {
    
    const fetchData = async () => {
      if(actualiza){
      setTipos(await fetchTipos());
      setActualiza(false)
      }
    };

    fetchData();
  }, [session,actualiza]);


  return (
    <MagicMotion>
    <div>
      <h1 className="text-2xl font-bold text-center">Tipos</h1>

      <div className="w-11/12 mx-auto border-2 p-4 rounded-lg">
        <Link href="/Tipos/Add" className="btn-primary py-2">
          Añadir
        </Link>
        <table className="w-full">
          <thead>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th className="w-10">Acción</th>
          </thead>
          <tbody>
            {tipos &&
              tipos?.map((t) => (
                <tr key={t.id}>
                  <td className="p-2">{t.id}</td>
                  <td className="p-2">{t.nombre}</td>
                  <td className="p-2">{t.descripcion}</td>
                  <td className="p-4 flex items-center">
                    <Link href={`/Tipos/Edit/${t.id}`} className="btn-primary">
                      Editar
                    </Link>

                    <button
                      type="button"
                      className="btn-primary"
                      onClick={async () => borrarTipo(t.id.toString())}
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
    </MagicMotion>
  );
};

export default page;
