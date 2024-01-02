import { fetchCervezasById } from "@/services/api";
import { CervezaData } from "@/interfaces/interfaces";

export default async function Detalle({ params }: { params: { id: string } }) {
  const id = params.id;

  const cerveza = await fetchCervezasById(id);

  return (
    <>
      <article className="w-11/12 border-2 shadow-lg rounded-lg mx-auto p-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-bold mt-2 text-lg">Foto:</label>
            <img src={cerveza?.foto} />
          </div>
          <div className="bg-gray-100 p-4 mb-2">
            <label className="font-bold mt-2 text-lg">Nombre:</label>
            <h1>{cerveza?.nombre}</h1>
            <label className="font-bold mt-2 text-lg">Descripción:</label>
            <h1>{cerveza?.descripcion}</h1>
            {/* La línea siguiente tiene un div de más (un ">" de más) */}
            <div className="grid grid-cols-2 gap-4 bg-gray-100 rounded-lg mt-2">
            {cerveza?.novedad == 0 && (
                  <div className="font-bold mt-2 border-2 rounded-lg border-white  bg-gray-400">
                  <label className="font-bold p-2 italic text-white">
                    Novedad
                  </label>
                  </div>
                )}
              
              
                {cerveza?.oferta == 0 && (
              <div className="font-bold mt-2 border-2 rounded-lg border-white  bg-gray-400">

                  <label className="font-bold p-2 italic text-white text-center">
                    Oferta
                  </label>
                  </div>
                )}
              
              
          
              <div>
                {" "}
                {/* Quité el ">" sobrante */}
                <label className="font-bold mt-2">
                  Precio: {cerveza?.precio}
                </label>
              </div>
              <div>
                {" "}
                {/* Quité el ">" sobrante */}
                <label className="font-bold mt-2">
                  Marca: {cerveza?.marca}
                </label>
              </div>
              <div>
                {" "}
                {/* Quité el ">" sobrante */}
                <label className="font-bold mt-2">
                  Color: {cerveza?.color}
                </label>
              </div>
              <div>
                <label className="font-bold mt-2 p-2">
                  Tipo: {cerveza?.tipo}
                </label>
              </div>
              <div>
                <label className="font-bold mt-2">País: {cerveza?.pais}</label>
              </div>
              <div>
                <label className="font-bold mt-2">
                  Graduación: {cerveza?.graduacion}
                </label>
              </div>
              
              
              
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
