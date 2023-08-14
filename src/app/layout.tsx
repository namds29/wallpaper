"use client";
import { usePathname } from "next/navigation";
import Header from "./components/layout/header/header";
import "./globals.scss";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "./lib/registry";
import Layout from "./components/layout/layout";
import AuthContextProvider from "./context/auth-context";

const inter = Inter({ subsets: ["latin"] });

// const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldRenderLayout = pathname !== "/" && pathname !== "/login";
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AuthContextProvider>
            {shouldRenderLayout && <Layout>{children}</Layout>}
            {!shouldRenderLayout && (
              <div className="grid place-items-center min-h-screen bg-slate-300">
                {children}
              </div>
            )}
          </AuthContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}