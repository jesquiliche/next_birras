

import ButtonAuth from  "@/components/ButtonAuth";
import Link from 'next/link';


const Navbar = () => {
  
  return (
    <div className="px-2 mx-0 rounded-lg border-1 shadow-lg w-full mb-5 flex justify-between items-center">
      <h1 className="hidden md:block md:text-2xl font-bold italic">
        Cervezas artesanas y de importación
      </h1>
      <div className="flex ">
        <Link href="/register" className="m-5">
          Registro
        </Link>
        <ButtonAuth/>
        
      </div>
      
    </div>
  );
};

export default Navbar;
