
import { fetchColores,fetchCervezas, fetchGraduaciones} from "@/services/api"
import { Graduacion } from "@/interfaces/interfaces"


const page = async() => {
  const c:Graduacion[]=await fetchGraduaciones();
  console.log(c)
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">
        Graduaciones
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
     {c && c.map(t=>(
        <tr key={t.id}>
           <td className="p-2">
          {t.id}
          </td>
          <td className="p-2">
          {t.nombre}
          </td>
          <td className="p-4">
          <a className="bg-yellow-500 text-white rounded-lg px-4 py-1"> 
          Editar</a>
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
