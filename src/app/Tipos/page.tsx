"use client";
import { fetchDeleteTiposById, fetchTipos,fetchTiposQuery } from "@/services/api";
import { Tipo } from "@/interfaces/interfaces";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Load from "@/components/Load";
import { MagicMotion } from "react-magic-motion";

const page = () => {
  //Paginación
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(10);

  const [actualizaPaginas, setActualizaPaginas] = useState<boolean>(false);
  const [tipos, setTipos] = useState<Tipo[] | undefined>([]);
  const { data: session, status } = useSession();
  const [actualiza, setActualiza] = useState(false);

  if (status == "loading") {
    return (
      <p>
        <Load />
      </p>
    );
  }

  const RenderPagination: React.FC = () => {
    // Define el valor máximo de botones de página a mostrar (en este caso, x)
    let x: number = 1;
    if (totalPages > 5) {
      x = 5;
    } else {
      x = totalPages;
    }

    const pageButtons = [];

    // Genera los botones de página en el rango calculado
    for (let i = 1; i <= x; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`flex  justify-center btn-page ${
            i === page ? "bg-gray-600" : "btn-page"
          }  hover:bg-gray-800`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }

    const TiposQuery = async (queryString: string) => {
      // Aquí puedes construir el query string con los valores de formData
  
      const tiposData = await fetchTiposQuery(queryString);
      setTipos(tiposData.data);
  
      setTotalPages(tiposData.last_page);
      setTotalRecords(tiposData.total);
    };

    const retrocedePagina = () => {
      if (page > 1) {
        setPage(page - 1); // Resta 1 para retroceder de página si no estás en la primera página
      }
    };

    const primeraPagina = () => {
      if (page > 1) {
        setPage(1);
      }
    };

    const ultimaPagina = () => {
      if (page < totalPages) {
        setPage(totalPages);
      }
    };

    const avanzaPagina = () => {
      if (page < totalPages) {
        setPage(page + 1); // Suma 1 para avanzar de página si no estás en la última página
      }
    };

    
    useEffect(() => {
      if (actualizaPaginas) {
        const ObtenerDatos = async () => {
          const queryString = `page=${page}&per_page=${limit}`;
  
          await TiposQuery(queryString);
          
        };
        ObtenerDatos();
        setActualizaPaginas(false);
      }
    }, [actualizaPaginas]);

    useEffect(() => {
          const ObtenerDatos = async () => {
          const queryString = `page=${page}&per_page=${limit}`;
  
          await TiposQuery(queryString);
          
        };
        ObtenerDatos();
        setActualizaPaginas(false);
      
    }, [page]);

    


    return (
      <>
        <h4 className="text-center font-semibold">
          {totalRecords !== 0 ? `${page} de ${totalPages}` : ""}
        </h4>
        <div className="flex flex-col items-center mb-2">
          <div className="inline-flex mt-2">
            {/* Oculta los botones "<<" y "<" si estás en la primera página */}
            {page > 1 && (
              <>
                <button className="btn-page" onClick={primeraPagina}>
                  {"<<"}
                </button>
                <button className="btn-page" onClick={retrocedePagina}>
                  {"<"}
                </button>
              </>
            )}
            {pageButtons}
            {/* Oculta los botones ">>" y ">" si estás en la última página */}
            {page < totalPages && (
              <>
                <button onClick={avanzaPagina} className="btn-page">
                  {">"}
                </button>
                <button onClick={ultimaPagina} className="btn-page">
                  {">>"}
                </button>
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  const borrarTipo = async (id: string) => {
    const token = session?.authorization.token || "";
    const ok=await fetchDeleteTiposById(id, token);
    if(!ok){
      alert("No se pudo borrar el tipo, tiene cervezas relacionadas")
    } else {}
      setActualizaPaginas(true);
  };

  useEffect(() => {
    const fetchData = async () => {
    const tiposData= await fetchTiposQuery(`page=${page}&per_page=${limit}`);
    setTipos(tiposData.data);
    setTotalPages(tiposData.last_page);
    setTotalRecords(tiposData.total);
    };

    fetchData();
  }, []);

  return (
    <MagicMotion>
      <div>
        <h1 className="text-2xl font-bold text-center">Tipos</h1>
        <p className="text-center font-bold">Resultados : {totalRecords}</p>
        {totalRecords > limit && <RenderPagination />}
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
                      <Link
                        href={`/Tipos/Edit/${t.id}`}
                        className="btn-primary"
                      >
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
