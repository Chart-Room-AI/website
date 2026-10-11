import { Fraunces } from "next/font/google";
import { BosunFooter } from "@/components/bosun/BosunFooter";
import { BosunHeader } from "@/components/bosun/BosunHeader";

// Display face for the Bosun section only. Body text stays on the site-wide Inter
// (loaded once in the root layout as --font-inter).
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-fraunces",
});

export default function BosunLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${fraunces.variable} flex flex-1 flex-col bg-bosun-sailcloth`}>
      <BosunHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <BosunFooter />
    </div>
  );
}
