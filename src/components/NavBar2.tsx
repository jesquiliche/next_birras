'use client'
import Link from 'next/link';
import React, { useState } from 'react';

const Hamburguesa = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="relative">
      <div className="cursor-pointer text-xl mt-4" onClick={() => setMenuAbierto(!menuAbierto)}>
        ☰
      </div>
      {menuAbierto && (
        <div className="absolute  z-10 -left-24 text-md w-max bg-white border-2 rounded-lg shadow-lg p-4">
          <ul className="">
          <li className="mb-2">
            <Link href="/"  className='hover:bg-gray-200 rounded-lg p-2'>
            Inicio
            </Link>
            </li>
            <li className="mb-2">
            <Link href="/register"  className='hover:bg-gray-200 rounded-lg p-2'>
            Registro
            </Link>
            </li>
            <li className="mb-2">
            <Link href="/Cervezas"  className='hover:bg-gray-200 rounded-lg p-2'>
            Cervezas
            </Link>
            </li>
            <li className="mb-2">
            <Link href="/Paises" className='hover:bg-gray-200 rounded-lg p-2'>
            Paises
            </Link>
            </li>
            <li className="mb-2">
            <Link href="/Tipos"  className='hover:bg-gray-200 rounded-lg p-2'>
            Tipos
            </Link>
            </li>
            <li className="mb-2">
            <Link href="/Colores" className='hover:bg-gray-200 rounded-lg p-2'>
            Colores
            </Link>
            </li>
            <li className="mb-2">
            <Link href="/Tipos"  className='hover:bg-gray-200 rounded-lg p-2'>
            Graduaciones
            </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Hamburguesa;
