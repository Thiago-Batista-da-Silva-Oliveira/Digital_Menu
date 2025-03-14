import "./globals.css";
import { Providers } from "./provider";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <Providers>
         {children}
        </Providers>
      </body>
    </html>
  )
}
