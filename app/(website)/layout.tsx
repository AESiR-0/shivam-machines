import Navbar from "@/components/layout/navbar";
import FooterSection from "@/components/layout/footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { fetchSanityData } from "@/lib/sanity/fetch";
import { machineToolCategoriesQuery } from "@/lib/sanity/queries";
import type { MachineToolCategory } from "@/lib/sanity/types";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await fetchSanityData<MachineToolCategory[]>(
    machineToolCategoriesQuery,
  );

  return (
    <>
      <Navbar categories={categories || []} />
      {children}
      <FooterSection />
      <WhatsAppButton />
    </>
  );
}
