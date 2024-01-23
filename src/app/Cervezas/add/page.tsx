"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Tipo, Pais, Color, Graduacion } from "@/interfaces/interfaces";
import { useSession, signOut } from "next-auth/react";
import {
  fetchTipos,
  fetchPaises,
  fetchColores,
  fetchGraduaciones,
} from "@/services/api";
import DisplayErrors from "@/components/DisplayErrors";
import Load from "@/components/Load";

interface CervezaData {
  nombre: string;
  descripcion: string;
  color_id: number;
  graduacion_id: number;
  tipo_id: number;
  pais_id: number;
  novedad: boolean | number;
  oferta: boolean | number;
  precio: number;
  foto: string;
  marca: string;
  file: File | null;
  stock: number;
  unidades: number;
  formato: string;
}

interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}
const Formulario: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [ok, setOK] = useState("");
  const [errors, setErrors] = useState<any>(null);
  const { data: session, status } = useSession();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [paises, setPaises] = useState<Pais[] | undefined>([]);
  const [colores, setColores] = useState<Color[]>([]);
  const [graduaciones, setGraduaciones] = useState<Graduacion[]>([]);
  const [cerveza, setCerveza] = useState<CervezaData>({
    nombre: "",
    descripcion: "",
    color_id: 0,
    graduacion_id: 0,
    tipo_id: 0,
    pais_id: 0,
    novedad: true,
    oferta: false,
    precio: 0,
    foto: "",
    marca: "",
    file: null,
    unidades: 1,
    formato: "",
    stock: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tiposData = await fetchTipos();
        setTipos(tiposData.data);

        const paisesData = await fetchPaises();
        setPaises(paisesData?.data);

        const coloresData = await fetchColores();
        setColores(coloresData);

        const graduacionesData = await fetchGraduaciones();
        setGraduaciones(graduacionesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    if (e.target.type === "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;
      const { name, value } = e.target;
      const check = isChecked;

      setCerveza({
        ...cerveza,
        [name]: check,
      });
    } else if (e.target.type === "number" || e.target.type === "select-one") {
      const { name, value } = e.target;
      setCerveza({
        ...cerveza,
        [name]: +value,
      });
    } else {
      const { name, value } = e.target;
      setCerveza({
        ...cerveza,
        [name]: value,
      });
    }
  };

  const resetCampos = () => {
    setCerveza({
      nombre: "",
      descripcion: "",
      color_id: 0,
      graduacion_id: 0,
      tipo_id: 0,
      pais_id: 0,
      novedad: true,
      oferta: false,
      precio: 0,
      foto: "",
      marca: "",
      file: null,
      formato: "Lata",
      stock: 1,
      unidades: 1,
    });
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    setOK("");
    const token = session?.authorization.token || "";
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1/";
    const formData = new FormData();
    formData.append("nombre", cerveza.nombre);
    formData.append("descripcion", cerveza.descripcion);
    formData.append("color_id", cerveza.color_id.toString());
    formData.append("graduacion_id", cerveza.graduacion_id.toString());
    formData.append("tipo_id", cerveza.tipo_id.toString());
    formData.append("pais_id", cerveza.pais_id.toString());
    formData.append("novedad", cerveza.novedad.toString());
    formData.append("oferta", cerveza.oferta.toString());
    formData.append("precio", cerveza.precio.toString());

    formData.append("marca", cerveza.marca);
    formData.append("unidades", cerveza.unidades.toString());
    formData.append("stock", cerveza.unidades.toString());
    formData.append("formato", cerveza.unidades.toString());

    // Aquí puedes agregar el campo de archivo si es necesario
    if (cerveza.file) {
      formData.append("file", cerveza.file);
      formData.append("foto", cerveza.file.name);
    }

    try {
      const response = await fetch(`${apiUrl}cervezas`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      setOK("");
      setErrors(null);
      // Manejar la respuesta
      if (response.ok) {
        const data = await response.json();
        setOK("Producto " + data.nombre + " guardado correctamente.");
        resetCampos();
      } else {
        const errores = await response.json();
        setErrors(errores);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(
        "No se pudo conectar con el servidor. Puede que la sesión halla expirado."
      );
      console.error("Error en la solicitud:");
    }
  };

  const handleImagenChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Crear una URL de objeto para la vista previa de la imagen
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setCerveza({
        ...cerveza,
        file: file,
        foto: file.name,
      });
    } else {
      // Si no hay archivo seleccionado, restablecer la vista previa y el estado del archivo
      setImagePreview(null);
      setCerveza({
        ...cerveza,
        file: null,
        foto: "", // Otra opción sería mantener el nombre del archivo anterior si lo necesitas
      });
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Añadir producto</h1>
      <form
       onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-11/12 mx-auto rounded-lg shadow-lg p-4 border-2">
          <div>
            <label className="block w-full">Foto:</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImagenChange}
              required
            ></input>
            <img
              className="rounded-lg h-80 mt-2"
              id="image-preview"
              src={imagePreview || ""}
              alt="Vista previa de la imagen"
              style={{
                display: imagePreview ? "block" : "none",
                maxWidth: "100%",
                margin: "0 auto",
              }}
            />
          </div>
          <div className="md:col-span-2">
            {" "}
            <label className="block w-full">Nombre:</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              id="nombre"
              maxLength={150}
              value={cerveza.nombre}
              onChange={handleOnChange}
              required
            ></input>
            <label className="">Descripción:</label>
            <textarea
              className="form-control row-span-4 h-64"
              id="descripcion"
              name="descripcion"
              value={cerveza.descripcion}
              onChange={handleOnChange}
              required
            ></textarea>
          </div>
          <div className="">
            {" "}
            <label htmlFor="tipo" className="block text-gray-700">
              Tipo:
            </label>
            <select
              name="tipo_id"
              id="tipo_id"
              onChange={handleOnChange}
              className="form-control"
              value={cerveza.tipo_id}
              required
            >
              <option key={0}></option>
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pais" className="block text-gray-700">
              País:
            </label>
            <select
              name="pais_id"
              id="pais_id"
              onChange={handleOnChange}
              value={cerveza.pais_id}
              className="form-control"
              required
            >
              <option key={0}></option>
              {paises &&
                paises.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="color" className="block text-gray-700">
              Color:
            </label>
            <select
              name="color_id"
              id="color_id"
              onChange={handleOnChange}
              value={cerveza.color_id}
              className="form-control"
              required
            >
              <option key={0}></option>
              {colores.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="graduacion" className="block text-gray-700">
              Graduación:
            </label>
            <select
              name="graduacion_id"
              id="graduacion_id"
              onChange={handleOnChange}
              value={cerveza.graduacion_id}
              className="form-control"
              required
            >
              <option key={0}></option>
              {graduaciones.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block w-full">Marca:</label>
            <input
              type="text"
              className="form-control"
              value={cerveza.marca}
              required
              name="marca"
              onChange={handleOnChange}
              id="marca"
            ></input>
          </div>
          <div>
            <label className="block w-full">Precio:</label>
            <input
              type="number"
              className="form-control"
              name="precio"
              id="precio"
              step="0.01"
              onChange={handleOnChange}
              value={cerveza.precio}
              required
            ></input>
          </div>
          <div>
            <label className="block w-full">Formato:</label>
            <input
              type="text"
              className="form-control"
              name="formato"
              id="formato"
              maxLength={100}
              value={cerveza.formato}
              onChange={handleOnChange}
              required
            ></input>
          </div>
          <div>
            <label className="block w-full">Unidades:</label>
            <input
              type="number"
              className="form-control"
              name="unidades"
              id="unidades"
              maxLength={100}
              step="1"
              value={cerveza.unidades}
              onChange={handleOnChange}
              required
            ></input>
          </div>
          <div>
            <label className="block w-full">Stock:</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              id="stock"
              maxLength={100}
              step="1"
              value={cerveza.stock}
              onChange={handleOnChange}
              required
            ></input>
          </div>
          <div className="flex p-2 items-center">
            <input
              type="checkbox"
              onChange={handleOnChange}
              id="novedad"
              name="novedad"
              value={0}
              className="p-2 border rounded bg-gray-100"
            />
            <label className="ml-4 flex">Novedad</label>
            <input
              type="checkbox"
              id="oferta"
              name="oferta"
              onChange={handleOnChange}
              value={0}
              className="ml-4 p-2 border rounded bg-gray-100"
            />
            <label className="ml-4 flex">Oferta</label>
          </div>
          {loading && <Load />}

          <div className="col-span-1 md:col-span-3">
            {errors && <DisplayErrors errors={errors} />}
            {ok && !errors && <p className="bg-green-300 rounded p-4">{ok}</p>}
            <button type="submit" className="btn-primary">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Formulario;
