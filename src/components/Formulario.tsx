import { Tipo, Pais, Color,Graduacion } from "@/interfaces/interfaces";
import { fetchTipos, fetchPaises, fetchColores, fetchGraduaciones } from "@/services/api";

const Formulario: React.FC = async () => {
  const tipos: Tipo[] = await fetchTipos();
  const paises: Pais[] = await fetchPaises();
  const colores: Color[] = await fetchColores();
  const graduaciones:Graduacion[]=await fetchGraduaciones();

  return (
    <>
    <h1 className="text-2xl font-bold text-center">Filtro</h1>
    <form className="flex flex-wrap">
        
      <div className="w-full md:w-1/4 p-2">
        <label htmlFor="tipo" className="block text-gray-700">
          Tipo:
        </label>
        <select name="tipo" id="tipo" className="w-full p-2 border rounded bg-gray-100">
          {tipos.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-1/4 p-2">
        <label htmlFor="pais" className="block text-gray-700">
          País:
        </label>
        <select name="pais" id="pais" className="w-full p-2 border  bg-gray-100 rounded">
          {paises.map((p) => (
            <option value={p.id}>{p.nombre}</option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-1/4 p-2">
        <label htmlFor="color" className="block text-gray-700">
          Color:
        </label>
        <select name="color" id="color" className="w-full p-2 border  bg-gray-100 ºrounded">
          {colores.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-1/4 p-2">
        <label htmlFor="graduacion" className="block text-gray-700">
          Graduación:
        </label>
        <select
          name="graduacion"
          id="graduacion"
          className="w-full p-2 border rounded  bg-gray-100"
        >
           {graduaciones.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full p-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </div>
    </form>
    </>
  );
};

export default Formulario;
