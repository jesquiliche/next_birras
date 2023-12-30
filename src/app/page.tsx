import Image from 'next/image'

export default function Home() {
  return (
    <>
    <h1 className='text-2xl font-bold p-4 text-center'>Estadisticas</h1>
    <div className='w-11/12 grid grid-cols-4 gap-4 mx-auto'>
      
      <article className='bg-red-500 rounded-lg shadow-lg p-4'>
      <h1 className='text-xl text-white'>Cervezas</h1>
      </article>
      <article className='bg-gray-400 rounded-lg shadow-lg p-4'>
      <h1 className='text-xl text-white'>Tipos</h1>
      </article>
      <article className='bg-blue-600 rounded-lg shadow-lg p-4'>
      <h1 className='text-xl text-white'>Colores</h1>
      </article>
      <article className='bg-yellow-600 rounded-lg shadow-lg p-4'>
      <h1 className='text-xl text-white'>Graduaciones</h1>
      </article>
    </div>
    </>
  )
}
