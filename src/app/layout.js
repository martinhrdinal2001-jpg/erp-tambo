import "./globals.css";

export const metadata = {
  title: "Fundo el Raulí",
  description: "Sistema de gestión integral del campo lechero",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased text-stone-900">{children}</body>
    </html>
  );
}
