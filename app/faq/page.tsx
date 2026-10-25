"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import brandConfig from "@/config/brand.config";
import { Search, ChevronDown, HelpCircle, Package, Truck, RotateCcw, Ruler, CreditCard, MessageSquare } from "lucide-react";

interface FAQItem {
  id: string;
  category: "orders" | "shipping" | "returns" | "sizing" | "payments";
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  // Orders
  {
    id: "ord-01",
    category: "orders",
    question: `How are ${brandConfig.name} garments numbered and certified?`,
    answer: "Every garment produced in our atelier is assigned a sequential archival production serial number. This number is hand-inscribed onto the interior silk or cotton label and accompanied by an authenticated atelier certificate verifying origin and fiber lineage.",
  },
  {
    id: "ord-02",
    category: "orders",
    question: "Can I modify or augment my order once placed?",
    answer: "Because our atelier prepares orders with expedited care, alterations to sizing or delivery address must be requested within 3 hours of order placement. Please contact our telephone concierge at " + brandConfig.contact.phone + " with your order reference number.",
  },
  {
    id: "ord-03",
    category: "orders",
    question: "Do you offer bespoke customization and monogramming?",
    answer: "We offer monogramming on all tailored shirts and leather goods, as well as hem adjustments for silk slip gowns. You may specify requirements in the order notes at checkout or reserve a consultation with our styling team.",
  },

  // Shipping
  {
    id: "ship-01",
    category: "shipping",
    question: "What are your delivery timelines across India?",
    answer: "Standard courier delivery requires 3 to 6 business days. Express air courier to major metropolitan centers (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata) arrives within 48 to 72 hours. All shipments are insured and require signature upon receipt.",
  },
  {
    id: "ship-02",
    category: "shipping",
    question: "Is complimentary shipping provided?",
    answer: `Complimentary insured courier delivery is extended on all domestic commissions exceeding ₹${brandConfig.shipping.freeAbove.toLocaleString("en-IN")}. For orders beneath this threshold, a flat shipping fee of ₹${brandConfig.shipping.flatRate} applies.`,
  },
  {
    id: "ship-03",
    category: "shipping",
    question: "How is my garment packaged?",
    answer: "Every piece arrives folded in an organic unbleached cotton dustbag, wrapped in acid-free tissue, and encased in an FSC-certified architectural hardboard box sealed with wax emblem. Gift orders can include an engraved letterpress card with your bespoke message.",
  },

  // Returns & Exchanges
  {
    id: "ret-01",
    category: "returns",
    question: "What is the return and exchange window?",
    answer: `We provide a gracious ${brandConfig.returnWindowDays}-day return and exchange window from the date of confirmed doorstep delivery. Garments must be unworn, unaltered, and retained with original authentication seals and dustbags intact.`,
  },
  {
    id: "ret-02",
    category: "returns",
    question: "How do I initiate a return or exchange?",
    answer: "Navigate to your Patron Account under Order History, select the relevant piece, and click 'Request Return / Exchange'. Our concierge will schedule a complimentary doorstep pickup. Once inspected at our atelier, your refund or replacement will be processed within 48 hours.",
  },
  {
    id: "ret-03",
    category: "returns",
    question: "Are bespoke or customized pieces returnable?",
    answer: "Garments that have been individually tailored to custom patron measurements or monogrammed are non-returnable, but qualify for complimentary atelier adjustments within 30 days.",
  },

  // Sizing
  {
    id: "size-01",
    category: "sizing",
    question: `How do ${brandConfig.name} silhouettes fit?`,
    answer: "Our tailoring follows standard European sizing with intentional ease for graceful drape. Each product page features exact garment measurements in both centimeters and inches, as well as detailed fit notes from our atelier fit models.",
  },
  {
    id: "size-02",
    category: "sizing",
    question: "Can I receive personal sizing guidance before ordering?",
    answer: "Yes. Our concierge stylists are available via WhatsApp and phone to review your measurements and advise on the ideal silhouette for your posture and preferences. You can also view our full interactive Size Guide.",
  },

  // Payments
  {
    id: "pay-01",
    category: "payments",
    question: "Which payment methods are accepted?",
    answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express), UPI (Google Pay, PhonePe, Paytm), Net Banking across 50+ Indian banking institutions, and Cash on Delivery for serviceable pincodes.",
  },
  {
    id: "pay-02",
    category: "payments",
    question: "Are prices inclusive of GST?",
    answer: "Yes. All prices displayed on our storefront are fully inclusive of statutory Goods and Services Tax (GST). A detailed tax breakdown showing CGST, SGST, or IGST is provided on your checkout invoice and downloadable tax receipt.",
  },
  {
    id: "pay-03",
    category: "payments",
    question: "Is Cash on Delivery available for all orders?",
    answer: `Cash on Delivery is available for domestic orders up to ₹25,000 for verified residential pincodes, accompanied by a nominal handling fee of ₹${brandConfig.shipping.codFee}.`,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Questions", icon: HelpCircle },
  { id: "orders", label: "Orders & Atelier", icon: Package },
  { id: "shipping", label: "Shipping & Transit", icon: Truck },
  { id: "returns", label: "Returns & Exchanges", icon: RotateCcw },
  { id: "sizing", label: "Silhouettes & Fit", icon: Ruler },
  { id: "payments", label: "Billing & Taxes", icon: CreditCard },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [openItems, setOpenItems] = React.useState<string[]>([FAQ_DATA[0].id]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = FAQ_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="narrow">
        <div className="mb-10 space-y-3 text-center">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Client Assistance" },
              { label: "Frequently Asked Questions" },
            ]}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block pt-3">
            Atelier Knowledge Base
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#8A857C] max-w-lg mx-auto leading-relaxed">
            Essential protocols covering our sartorial standards, shipping logistics, fiber care, and client privileges.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="mb-8">
          <div className="relative flex items-center bg-white border border-[#E4DFD5] px-4 py-3 shadow-xs focus-within:border-[#111111] transition-colors">
            <Search className="w-4 h-4 text-[#8A857C] mr-3 stroke-[1.25]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. shipping, silk, exchange, GST, bespoke)..."
              className="w-full bg-transparent text-xs text-[#111111] placeholder:text-[#8A857C] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-[10px] uppercase tracking-wider text-[#8A857C] hover:text-[#111111]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none text-xs">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 border text-[11px] uppercase tracking-wider whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-[#111111] text-white border-[#111111] font-medium shadow-xs"
                    : "bg-white text-[#8A857C] border-[#E4DFD5] hover:text-[#111111] hover:border-[#8A857C]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="bg-white border border-[#E4DFD5] p-12 text-center space-y-3">
              <p className="font-heading text-2xl text-[#111111]">
                No matching inquiries found
              </p>
              <p className="text-xs text-[#8A857C] max-w-sm mx-auto">
                Our concierge team is at your disposal to answer any specific questions regarding our atelier.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="text-xs uppercase tracking-wider text-[#111111] hover:text-[#B08D57] underline font-medium"
                >
                  Contact Client Concierge
                </Link>
              </div>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = openItems.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-[#E4DFD5] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F7F4EE]/50 transition-colors"
                  >
                    <span className="font-medium text-xs sm:text-sm text-[#111111] pr-2">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8A857C] flex-shrink-0 transition-transform duration-300 stroke-[1.25] ${
                        isOpen ? "rotate-180 text-[#B08D57]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 pt-1 text-xs sm:text-sm text-[#8A857C] leading-relaxed border-t border-[#E4DFD5]/50 animate-in fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-8 bg-white border border-[#E4DFD5] text-center space-y-3">
          <h3 className="font-heading text-2xl text-[#111111]">
            Have an unaddressed question?
          </h3>
          <p className="text-xs text-[#8A857C] max-w-md mx-auto">
            Our personal shopping consultants and tailoring master are delighted to assist you directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs">
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-[#111111] text-white uppercase tracking-wider text-[11px] hover:bg-[#B08D57] transition-colors"
            >
              Contact Concierge
            </Link>
            <Link
              href="/size-guide"
              className="px-5 py-2.5 border border-[#111111] text-[#111111] uppercase tracking-wider text-[11px] hover:bg-[#F7F4EE] transition-colors"
            >
              View Size Guide
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
