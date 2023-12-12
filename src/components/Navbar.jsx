

import ButtonAuth from  "@/components/ButtonAuth";


const Navbar = () => {
  
  return (
    <div className="px-2 mx-0 rounded-lg border-1 shadow-lg w-full mb-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold italic">
        Cervezas artesanas y de importación
      </h1>
      <div className="flex ">
        <a href="#" className="m-5">
          Registro
        </a>
        <ButtonAuth/>
        
      </div>
      
    </div>
  );
};

export default Navbar;
