"use client";
import React, { useState, useEffect } from "react";
import Load from "@/components/Load";
import DisplayErrors from "@/components/DisplayErrors";
import { useSession } from "next-auth/react";

interface Tipo {
  nombre: string;
  descripcion?: string;
}

const Add: React.FC = () => {
  const { data: session, status } = useSession();
  const [tipo, setTipo] = useState<Tipo>({ nombre: "" });
  const [ok, setOK] = useState<string>("");
  const [errors, setErrors] = useState<any>(null);

  if (status == "loading") {
    return (
      <p>
        <Load />
      </p>
    );
  }

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
    setErrors(null);
    setOK("");
    const token = session?.authorization.token || "";

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1/";

    try {
      const response = await fetch(`${apiUrl}tipos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tipo),
      });

      if (response.ok) {
        setOK("Solicitud enviada con éxito.");
      } else {
        const errores = await response.json();
        setErrors(errores);
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
        <h1 className="text-xl5 text-center ">Tipo</h1>
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
              value={tipo.nombre}
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

          <div className="mt-3">
            {ok && <p className="bg-green-300 rounded p-4">{ok}</p>}
            {errors && <DisplayErrors errors={errors} />}

            <button type="submit" className="btn-primary mt-2">
              Añadir
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add;
