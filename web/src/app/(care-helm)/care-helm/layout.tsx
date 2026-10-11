import { CareHelmFooter } from "@/components/care-helm/CareHelmFooter";
import { CareHelmHeader } from "@/components/care-helm/CareHelmHeader";

export default function CareHelmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CareHelmHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <CareHelmFooter />
    </>
  );
}
