export interface Cerveza {
  id: number
  nombre: string
  descripcion: string
  novedad: number
  oferta: number
  precio: string
  foto: string
  marca: string
  color: string
  graduacion: string
  tipo: string
  pais: string
}
  

  export interface Pais {
    id: number
    nombre: string
    created_at: any
    updated_at: any
  }
  
  

  export interface Tipo {
    id: number
    nombre: string
    created_at: any
    updated_at: any
  }
  
  export interface Color {
    id: number
    nombre: string
    created_at: any
    updated_at: any
  }
  
  export interface Graduacion {
    id: number
    nombre: string
    created_at: any
    updated_at: any
  }
