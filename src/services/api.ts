'use server'
import { Cerveza, Color, Pais, Tipo,Graduacion } from "@/interfaces/interfaces";

export async function fetchCervezas(): Promise<Cerveza[]> {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:1337/api/";
  
  try {
    const response = await fetch(
      `${apiUrl}cervezas`,{ cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();
    
    return data.data;
    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    console.error(error);
    return []; // Debes devolver un valor adecuado en caso de error
  }
}

export async function fetchCervezasById(id:string): Promise<Cerveza|undefined> {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:1337/api/";
  
  try {
    const response = await fetch(
      `${apiUrl}cervezas/${id}`,{ cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();
    console.log(data);
    
    return data;
    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    console.error(error);
  }
}


export async function fetchCervezasQuery(query: string): Promise<Cerveza[]> {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:1337/api/";
  try {
    const response = await fetch(
      `${apiUrl}cervezas?${query}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();
    return data.data;

    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    return []; // Debes devolver un valor adecuado en caso de error
  }
}


export async function fetchPaises(): Promise<Pais[]> {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:8000/api/v1/";
  try {
    const response = await fetch(`${apiUrl}paises`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();
    return data;
    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    console.error("Error al obtener datos:", error);

    return [];
  }
}

export async function fetchColores(): Promise<Color[] | any> {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:8000/api/v1/";
  try {
    const response = await fetch(`${apiUrl}colores`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();
    return data.colores;
    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    console.error("Error al obtener datos:", error);

    
  }
}

export async function fetchTipos(): Promise<Tipo[]> {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:8000/api/v1/";

  try {
    const response = await fetch(`${apiUrl}tipos`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();
    return data;
    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    console.log(error);
    return []; // Debes devolver un valor adecuado en caso de error
  }
}

export async function fetchGraduaciones(): Promise<Graduacion[]> {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:8000/api/v1/";
  try {
    const response = await fetch(`${apiUrl}graduaciones`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();
    return data.graduaciones;
    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    console.error("Error al obtener datos:", error);

    return [];
  }
}


export async function postRegister(url:string,datos: {
  name: string;
  password: string;
  email: string;
}):Promise<string>{
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    if (response.ok) {
     
      console.log('Datos enviados correctamente.');
      // Aquí puedes realizar acciones adicionales después de enviar los datos
    } else {
      switch (response.status) {
        case 409:
          throw new Error('Ya existe un Usuario con este email: '+response.statusText);    
          break;
          case 422:
           // const data=await response.json();
           // console.log(data)
            throw new Error('Ya existe un Usuario con este email: ');

        default:
          throw new Error('Error al enviar los datos:'+response.statusText);
          break;
      }
      
    }
    return("ok");
  } catch (error:any) {
    return (error.message);
   
  }
};