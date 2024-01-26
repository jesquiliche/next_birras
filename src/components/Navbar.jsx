

import ButtonAuth from  "@/components/ButtonAuth";
import Link from 'next/link';
import Hamburgueza from '@/components/NavBar2';


const Navbar = () => {
  
  return (
    <div className="p-2 mx-0 rounded-lg border-1 shadow-lg w-full mb-5 flex  justify-end md:justify-between items-center">
      <h1 className="hidden md:block md:text-2xl font-bold italic">
        Cervezas artesanas y de importación
      </h1>
      <div className="flex ">

        <ButtonAuth/>
        <div className="flex flex-end md:hidden">
          <Hamburgueza/>
        </div>
        
      </div>
      
    </div>
  );
};

export default Navbar;
