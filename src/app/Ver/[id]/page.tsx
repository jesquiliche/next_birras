import { fetchCervezasById } from "@/services/api";
import { Cerveza } from "@/interfaces/interfaces";
export default async function Detalle({ params }: { params: { id: string } })  {
  const id=params.id;

  const cerveza=await fetchCervezasById(id)
  console.log(cerveza);
};

  