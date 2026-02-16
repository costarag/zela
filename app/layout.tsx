import type { Metadata } from "next";
import { Nunito_Sans, Sora } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zela | Cuidado humano para idosos",
  description:
    "Encontre cuidadores de idosos verificados com uma experiencia acolhedora e segura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${sora.variable} ${nunitoSans.variable} antialiased`}>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
