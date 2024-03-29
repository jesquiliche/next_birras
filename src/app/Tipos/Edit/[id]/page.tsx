"use client";
import React, { useState, useEffect } from "react";
import { fetchTiposById, fetchDeleteTiposById } from "@/services/api";
import Load from "@/components/Load";
import { useSession } from "next-auth/react";

interface Tipo {
  nombre?: string;
  descripcion?: string;
}

interface EditProps {
  params: {
    id: string;
  };
}

const Edit: React.FC<EditProps> = ({ params }) => {
  const id = params.id;
  const { data: session, status: sessionStatus } = useSession();
  const [tipo, setTipo] = useState<any>({});
  const [ok, setOK] = useState<string>("");

  if (sessionStatus == "loading") {
    return (
      <p>
        <Load />
      </p>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      setTipo(await fetchTiposById(id));
    };

    fetchData();
  }, [id]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTipo({
      ...tipo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = session?.authorization.token || "";

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1/";

    try {
      const response = await fetch(`${apiUrl}tipos/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tipo),
      });

      // Manejar la respuesta
      if (response.ok) {
        setOK("Solicitud enviada con éxito.");
      } else {
        alert(response.status);
      }
    } catch (error) {
      alert(
        "No se pudo conectar con el servidor. Puede que la sesión haya expirado."
      );
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto mt-2 border-2 rounded-lg shadow-lg">
        <h1 className="text-xl5 text-center ">Tipo {id}</h1>
        <form onSubmit={handleSubmit} className="w-4/5 mx-auto p-4">
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              className="form-control"
              type="text"
              id="nombre"
              name="nombre"
              maxLength={100}
              onChange={handleOnChange}
              value={tipo.nombre || ""}
              required
            />
          </div>

          <div>
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              className="form-control h-48"
              id="descripcion"
              name="descripcion"
              onChange={handleOnChange}
              value={tipo.descripcion || ""}
            ></textarea>
          </div>

          <div className="flex items-centert mt-3">
            {ok && <p className="bg-green-300 rounded p-4">{ok}</p>}

            <button type="submit" className="btn-primary mt-2">
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
