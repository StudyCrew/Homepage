import { siteMetaData } from "@/config/site";
import "@/styles/globals.css";

// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = siteMetaData;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
