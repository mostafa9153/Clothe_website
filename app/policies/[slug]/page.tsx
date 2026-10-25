import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import brandConfig from "@/config/brand.config";

interface PolicyPageProps {
  params: Promise<{ slug: string }>;
}

const POLICY_TITLES: Record<string, { title: string; content: string }> = {
  shipping: {
    title: "Shipping & Delivery Protocols",
    content: brandConfig.policies.shippingAndReturns,
  },
  returns: {
    title: `${brandConfig.returnWindowDays}-Day Doorstep Exchange & Returns`,
    content: `${brandConfig.name} extends a gracious ${brandConfig.returnWindowDays}-day return window from the date of confirmed delivery. All returned garments must be unwashed, unworn, and enclosed in original protective dustbags with intact garment authentication seals. Our complimentary courier service will collect the parcel directly from your doorstep.`,
  },
  privacy: {
    title: "Client Privacy & Discretion",
    content: brandConfig.policies.privacy,
  },
  terms: {
    title: "Terms of Commission",
    content: brandConfig.policies.terms,
  },
  care: {
    title: "Textile Care Guide",
    content: brandConfig.policies.careGuide,
  },
  authenticity: {
    title: "Artisanal Lineage & Authenticity",
    content: brandConfig.policies.authenticity,
  },
  refund: {
    title: "Refund & Reimbursement Policy",
    content: `Once inspected and verified at our atelier, refunds are credited back to the original payment source within 48 to 72 business hours in accordance with our ${brandConfig.returnWindowDays}-day return window.`,
  },
  cookie: {
    title: "Cookie & Preference Policy",
    content: `${brandConfig.name} uses minimal client-side cookies strictly necessary to maintain your shopping bag, authentication token, and site preferences without third-party tracking.`,
  },
};

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const policy = POLICY_TITLES[slug];
  if (!policy) return { title: "Policy Not Found" };
  return {
    title: `${policy.title} | ${brandConfig.name}`,
    description: policy.content.slice(0, 150),
  };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = await params;
  const policy = POLICY_TITLES[slug];

  if (!policy) {
    notFound();
  }

  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="narrow">
        <div className="mb-8 space-y-2">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Client Care" },
              { label: policy.title },
            ]}
          />
          <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#111111]">
            {policy.title}
          </h1>
        </div>

        <div className="bg-white border border-[#E4DFD5] p-8 sm:p-12 space-y-6 text-xs sm:text-sm text-[#111111] leading-relaxed font-light">
          <p>{policy.content}</p>
          <p>
            Should you require personalized assistance with an ongoing commission or order inquiry, please do not hesitate to contact our Colaba concierge team directly via telephone at {brandConfig.contact.phone} or email {brandConfig.contact.email}.
          </p>
        </div>
      </Container>
    </div>
  );
}
