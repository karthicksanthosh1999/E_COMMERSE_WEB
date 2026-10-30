import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import QueryProvider from "@/providers/QueryProvider";
import { SessionProvider } from "@/providers/AuthProviders";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sri Gowri",
  description: "Sri Gowri - Online Shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {/* <QueryProvider> */}
          {/* <SessionProvider> */}
            {children}
          {/* </SessionProvider> */}
        {/* </QueryProvider> */}
      </body>
    </html>
  );
}