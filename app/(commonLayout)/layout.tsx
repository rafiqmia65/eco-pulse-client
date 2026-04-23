import FooterSection from "@/components/shared/FooterSection/FooterSection";
import Navbar from "@/components/layouts/Navbar/Navbar";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <FooterSection />
    </>
  );
}
