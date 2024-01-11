import { fetchPaises, fetchTipos } from "@/services/api"
import { Pais } from "@/interfaces/interfaces"


const page = async() => {
  const paises:Pais[]=await fetchPaises();
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">
        Paises
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
        <th className="w-10">
          Editar
        </th>
        <th className="w-10">
          borrar
        </th>
        </thead>
        <tbody>
      {paises.map(t=>(
        <tr key={t.id}>
           <td className="p-2">
          {t.id}
          </td>
          <td className="p-2">
          {t.nombre}
          </td>
          <td className="p-4">
          <a className="btn-primary"> 
          Editar</a>
          </td>
          <td>
          <a className="btn-primary"> 
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
