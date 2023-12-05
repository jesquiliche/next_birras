export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/Tipos/:path*",
  "/Cervezas/:path*",
  "/Colores/:path*",
  "/Paises/:path*",
  "/Graduaciones/:path*"
]
};
