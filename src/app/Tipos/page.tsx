import { fetchTipos } from "@/services/api"
import { Tipo } from "@/interfaces/interfaces"
import Link from "next/link";


const page = async() => {
  const tipos:Tipo[]=await fetchTipos();
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">
        Tipos
      </h1>
      <div className="w-11/12 mx-auto border-2 p-4 rounded-lg">
      <table className="w-full" >
        <thead>
        <th >
          #
        </th>
        <th >
          Nombre
        </th>
        <th >
          Descripción
        </th>
        <th className="w-10">
          Editar
        </th>
        <th className="w-10">
          borrar
        </th>
        </thead>
        <tbody>
      {tipos.map(t=>(
        <tr key={t.id}>
           <td className="p-2">
          {t.id}
          </td>
          <td className="p-2">
          {t.nombre}
          </td>
          <td className="p-2">
          {t.descripcion}
          </td>
          <td className="p-4">
          <Link href={`/Tipos/Edit/${t.id}`} className="btn-primary"> 
          Editar
          </Link>
          </td>
          <td>
          <a className="bg-red-600 text-white rounded-lg px-4 py-1"> 
          Borrar</a>
          </td>
        </tr>
      
        
       ))}
       </tbody>
      </table>
      </div>
    </div>
  )
}

export default page
