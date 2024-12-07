import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/providers/theme-provider";
import { Header } from "@/components/layout/header";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Lost Saga Database",
  description: "a Web Database for Lost Saga (Character,Item,Tools)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"

          disableTransitionOnChange
        >
          <Header />
          <main className="container mx-auto px-8 lg:px-12 py-8">
            {children}
          </main>
          {/* footer */}
          <footer>
            <div className="container mx-auto text-center my-8">
              Powered by &copy; <Link href="https://github.com/LSFDC">Lost Saga For Developer Community</Link>
            </div>
          </footer>

        </ThemeProvider>
      </body>
    </html>
  );
}
