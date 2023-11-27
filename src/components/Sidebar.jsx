'use client'
import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative bg-gray-800 text-white">
      
      <div className={`bg-gray-800 text-white h-screen w-1/4 fixed left-0 transition-transform transform z-20 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Contenido de la barra lateral */}
        <button onClick={toggleSidebar} className="p-4 z-10">
        Toggle
      </button>
        <ul className="py-4">
          <li>Enlace 1</li>
          <li>Enlace 2</li>
          <li>Enlace 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
