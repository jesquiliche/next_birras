"use client";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

interface UserData {
  password: string;
  email: string;
}

const Login: React.FC = () => {
  const [errors, setErrors] = useState('');
  const [userData, setUserData] = useState<UserData>({
    password: "admin_password",
    email: "admin@test.com",
  });

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const responseNextAuth = await signIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: false,
    });

    
    console.log(responseNextAuth);

    
    if (responseNextAuth?.status!=200) {
      setErrors("Credenciales no validas")
    } else {
     
      //router.push('/Cervezas');
      router.back();
    }
   

    useEffect(() => {}, [errors]);
       // router.back();
  };

  return (
    <div className="py-5">
      <div className="p-10 w-5/6 border rounded-lg shadow-lg  mx-auto sm:w-4/6  bg-white">
        <h1 className="text-center text-xl font-bold mt-2">Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="font-bold mt-2">Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              required
              minLength={8}
              maxLength={100}
              onChange={handleChange}
              className="form-control mt-2"
            />
          </div>

          <div>
            <label className="font-bold mt-2">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              minLength={8}
              required
              onChange={handleChange}
              className="form-control mt-2"
            />
          </div>
          <div className="mx-auto w-2/5">
            <button type="submit" className="btn-primary mt-5 justify-center">
              Iniciar sesión
            </button>
          </div>
        </form>
        {errors && (
          <div className="bg-red-100 rounded-lg border mt-5 p-4">
           
              
                <p>{errors}</p>
              
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
