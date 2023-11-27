"use client";
import { useState } from "react";
import { MagicMotion } from "react-magic-motion";
import Link from 'next/link'

const items = [
  {
    id: 0,
    name: "Cervezas",
    path: "/Cervezas"
  },
  {
    id: 1,
    name: "Usuarios",
    path: "/User"
  },
  {
    id: 2,
    name: "Paises",
    path: "/Paises"
  },
  {
    id: 3,
    name: "Tipos",
    path: "/Tipos"
  },
  {
    id: 4,
    name: "Colores",
    path: "/Colores"
  },
  {
    id: 5,
    name: "Graduaciones",
    path: "/Graduaciones"
  },
];
export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [menu,setMenu]=useState(items);

  return (
    <MagicMotion>
      <aside
        style={{
          

          width: isCollapsed ? "3rem" : "17rem",
          
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflow: "hidden",
          minHeight: "40rem",
        }}
        className="bg-gray-300 rounded-lg shadow-lg p-4"
      >
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!isCollapsed && <h4 style={{ margin: 0 }}>Cervezas importación</h4>}

          <button
            style={{ cursor: "pointer", padding: 0, border: 0 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <svg
                width="15"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 12.9999V10.9999H15.4853L12.2427 7.75724L13.6569 6.34303L19.3137 11.9999L13.6569 17.6567L12.2427 16.2425L15.4853 12.9999H1Z"
                  fill="currentColor"
                />
                <path
                  d="M20.2877 6V18H22.2877V6H20.2877Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                style={{ minWidth: "24px", minHeight: "24px" }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.2877 11.0001V13.0001H7.80237L11.045 16.2428L9.63079 17.657L3.97394 12.0001L9.63079 6.34326L11.045 7.75748L7.80236 11.0001H22.2877Z"
                  fill="currentColor"
                />
                <path d="M3 18V6H1V18H3Z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>

        <ul>
          {menu.map((item)=>(
            <li key={item.id}>
              <Link href={item.path}>
              <h1 className="ml-6 mt-3 font-semibold px-4 py-1 rounded-lg hover:bg-gray-800 hover:text-white">{item.name}</h1>
            </Link>
            </li>
          ))} 
                </ul>
      </aside>
    </MagicMotion>
  );
}
