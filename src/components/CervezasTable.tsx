import { Cerveza } from '@/interfaces/interfaces'
import Link from 'next/link'
import React from 'react'


interface Props{
    cervezas:Cerveza[]
}
const CervezasTable = ({cervezas}:Props) => {
  return (
    <table className="w-full">
    <thead>
      <tr>
        <th>#</th>
        <th>Nombre</th>
        <th>Tipo</th>
        <th>País</th>
        <th>Color</th>
        <th>Graduación</th>
        <th>Foto</th>
        <th className="w-10">Ver</th>
        <th className="w-10">Editar</th>
        <th className="w-10">Borrar</th>
      </tr>
    </thead>
    <tbody>
      {cervezas.map((cerveza) => (
        <tr
          key={cerveza.id}
          className="border-2 rounded-lg bg-gray-50 mb-5"
        >
          <td className="p-2">{cerveza.id}</td>
          <td className="p-2">{cerveza.nombre}</td>
          <td className="p-2">{cerveza.tipo}</td>
          <td className="p-2">{cerveza.pais}</td>
          <td className="p-2">{cerveza.color}</td>
          <td className="p-2">{cerveza.graduacion}</td>
          <td className="p-2">
            <img
              src={cerveza.foto}
              className="min-w-[100px]"
              alt={cerveza.nombre}
            />
          </td>
          <td className="p-4">
            <Link href={`/Cervezas/Ver/${cerveza.id}`}className="bg-green-500 text-white rounded-lg px-4 py-1">
              Ver
            </Link>
          </td>
          <td className="p-4">
            <Link href={`/Cervezas/Edit/${cerveza.id}`} className="bg-yellow-500 text-white rounded-lg px-4 py-1">
              Editar
            </Link>
          </td>
          <td>
            <a className="bg-red-600 text-white rounded-lg px-4 py-1">
              Borrar
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default CervezasTable
