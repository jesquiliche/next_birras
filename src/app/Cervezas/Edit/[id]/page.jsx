"use client";
import React, { useState, useEffect } from "react";
import {
  fetchTipos,
  fetchPaises,
  fetchColores,
  fetchGraduaciones,
  fetchCervezasById,
  fetchDeleteTiposById,
} from "@/services/api";
import DisplayErrors from "@/components/DisplayErrors";
import Load from "@/components/Load";
import { useSession } from "next-auth/react";

const Edit = ({ params }) => {
  const id = params.id;
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [ok, setOK] = useState("");
  const [errors, setErrors] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [paises, setPaises] = useState([]);
  const [colores, setColores] = useState([]);
  const [graduaciones, setGraduaciones] = useState([]);
  const [cerveza, setCerveza] = useState({
    nombre: "",
    descripcion: "",
    color_id: 0,
    graduacion_id: 0,
    tipo_id: 0,
    pais_id: 0,
    novedad: 1,
    oferta: 1,
    precio: 0,
    foto: "",
    marca: "",
    stock: 0,
    unidades: 0,
    formato:""
  });

  if (session.status == "loading") {
    return <p>Cargando</p>;
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        const tiposData = await fetchTipos();
        setTipos(tiposData.data);

        const paisesData = await fetchPaises();
        setPaises(paisesData.data);

        const coloresData = await fetchColores();
        setColores(coloresData);

        const graduacionesData = await fetchGraduaciones();
        setGraduaciones(graduacionesData);

        const data = await fetchCervezasById(id);
        setCerveza(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleOnChange = (e) => {
    if (e.target.type === "checkbox") {
      const { name, checked } = e.target;
      const valor = checked ? 1 : 0;

      setCerveza({
        ...cerveza,
        [name]: valor,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setErrors(null);
    setOK("");
    const token = session?.authorization.token || "";
    
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1/";

    try {
      const response = await fetch(`${apiUrl}cervezas/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cerveza),
      });

      // Manejar la respuesta
      if (response.ok) {
        const data = await response.json();
        
        setOK("Producto " + data.nombre + " guardado correctamente.");
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

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Editar producto</h1>
      <div className="w-11/12 mx-auto border-2 rounded-lg shadow-lg py-2">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-3 w-11/12 mx-auto"
        >
          <div className="p-2 col-span-1">
            <img
              className="rounded-lg h-80 mt-2"
              id="image-preview"
              src={cerveza.foto}
              alt="Vista previa de la imagen"
            />
          </div>
          <div className="p-2 col-span-2">
            <label className="block w-full">Nombre:</label>
            <input
              type="text"
              className="form-control mb-2"
              name="nombre"
              id="nombre"
              maxLength={150}
              value={cerveza.nombre}
              onChange={handleOnChange}
              required
            ></input>
            <label className=" ">Descripción:</label>
            <textarea
              className="form-control row-span-4 h-64"
              id="descipcion"
              name="descripcion"
              value={cerveza.descripcion}
              onChange={handleOnChange}
              required
            ></textarea>
          </div>
          <div className="w-full p-2">
            <label className="block text-gray-700">Tipo:</label>
            <select
              name="tipo_id"
              id="tipo_id"
              onChange={handleOnChange}
              className="form-control"
              value={cerveza.tipo_id}
              required
            >
              {tipos.map((t) => (
                <option
                  key={t.id}
                  value={t.id}
                  selected={t.id == cerveza.tipo_id}
                >
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full p-2">
            <label className="block text-gray-700">País:</label>
            <select
              name="pais_id"
              id="pais_id"
              onChange={handleOnChange}
              value={cerveza.pais_id}
              className="form-control"
              required
            >
              {paises.map((p) => (
                <option
                  key={p.id}
                  value={p.id}
                  selected={p.id === cerveza.pais_id}
                >
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full p-2">
            <label className="block text-gray-700">Color:</label>
            <select
              name="color_id"
              id="color_id"
              onChange={handleOnChange}
              value={cerveza.color_id}
              className="form-control"
              required
            >
              {colores.map((c) => (
                <option
                  key={c.id}
                  value={c.id}
                  selected={c.id === cerveza.color_id}
                >
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full p-2">
            <label className="block text-gray-700">Graduación:</label>
            <select
              name="graduacion_id"
              id="graduacion_id"
              onChange={handleOnChange}
              value={cerveza.graduacion_id}
              className="form-control"
              required
            >
              {graduaciones.map((g) => (
                <option
                  key={g.id}
                  value={g.id}
                  selected={g.id === cerveza.graduacion_id}
                >
                  {g.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2">
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
          <div className="p-2">
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
            <label className="block w-full">Stoxk::</label>
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
              checked={cerveza.novedad != 0}
              className="p-2 border rounded bg-gray-100"
            />
            <label className="ml-4 flex">Novedad</label>
            <input
              type="checkbox"
              id="oferta"
              name="oferta"
              checked={cerveza.oferta != 0}
              onChange={handleOnChange}
              value={0}
              className="ml-4 p-2 border rounded bg-gray-100"
            />
            <label className="ml-4 flex">Oferta</label>
          </div>

          {loading && <Load />}
          <div className="w-full p-2 col-span-3 mt-2">
            {errors && <DisplayErrors errors={errors} />}
            {ok && <p className="bg-green-300 rounded p-4">{ok}</p>}
            <button type="submit" className="btn-primary mt-2">
              Guardar
            </button>
           
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
