import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import brandConfig from "@/config/brand.config";
import { MOCK_CATEGORIES, MOCK_COLLECTIONS, MOCK_PRODUCTS, MOCK_JOURNAL_POSTS } from "@/lib/data/mock-db";
import { ArrowRight, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: `Store Directory & HTML Sitemap | ${brandConfig.name}`,
  description: `Complete directory of all atelier categories, collections, dispatches, client care, and legal policies for ${brandConfig.name}.`,
};

export default function HTMLSitemapPage() {
  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="default">
        <div className="mb-12 space-y-3 max-w-2xl">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Store Directory & Sitemap" },
            ]}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
            Archival Index
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111]">
            Store Directory &amp; Sitemap
          </h1>
          <p className="text-xs sm:text-sm text-[#8A857C] leading-relaxed">
            A comprehensive catalog directory linking all storefront avenues, numbered collections, atelier dispatches, and client service policies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Collections & Curations */}
          <div className="bg-white border border-[#E4DFD5] p-6 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Curations &amp; Drops
            </span>
            <ul className="space-y-2 text-xs text-[#111111]">
              <li>
                <Link href="/shop" className="hover:text-[#B08D57] transition-colors">
                  All Ready-to-Wear Catalog
                </Link>
              </li>
              <li>
                <Link href="/new-in" className="hover:text-[#B08D57] transition-colors">
                  New In Arrivals
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="hover:text-[#B08D57] transition-colors">
                  Winter Nocturne Lookbook
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#B08D57] transition-colors">
                  All Featured Collections
                </Link>
              </li>
              {MOCK_COLLECTIONS.map((c) => (
                <li key={c.id}>
                  <Link href={`/collections/${c.slug}`} className="text-[#8A857C] hover:text-[#111111] transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Categories */}
          <div className="bg-white border border-[#E4DFD5] p-6 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Wardrobe Categories
            </span>
            <ul className="space-y-2 text-xs text-[#111111]">
              {MOCK_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-[#B08D57] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sale" className="text-[#8A857C] hover:text-[#111111] transition-colors">
                  Archival Private Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The House & Dispatches */}
          <div className="bg-white border border-[#E4DFD5] p-6 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              The House &amp; Journal
            </span>
            <ul className="space-y-2 text-xs text-[#111111]">
              <li>
                <Link href="/about" className="hover:text-[#B08D57] transition-colors">
                  Atelier Heritage &amp; Manifesto
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-[#B08D57] transition-colors">
                  The Atelier Journal Index
                </Link>
              </li>
              {MOCK_JOURNAL_POSTS.map((post) => (
                <li key={post.id}>
                  <Link href={`/journal/${post.slug}`} className="text-[#8A857C] hover:text-[#111111] transition-colors line-clamp-1">
                    {post.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/design-system" className="text-[#8A857C] hover:text-[#111111] transition-colors">
                  Design System Showcase
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Services & Legal */}
          <div className="bg-white border border-[#E4DFD5] p-6 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Client Care &amp; Legal
            </span>
            <ul className="space-y-2 text-xs text-[#111111]">
              <li>
                <Link href="/contact" className="hover:text-[#B08D57] transition-colors">
                  Client Concierge &amp; Inquiries
                </Link>
              </li>
              <li>
                <Link href="/book-consultation" className="hover:text-[#B08D57] transition-colors">
                  Private Styling Appointment
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#B08D57] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-[#B08D57] transition-colors">
                  Size &amp; Measurement Guide
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="hover:text-[#B08D57] transition-colors">
                  Atelier Gift Cards
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-[#B08D57] transition-colors">
                  Shipping &amp; Delivery Protocols
                </Link>
              </li>
              <li>
                <Link href="/care-guide" className="hover:text-[#B08D57] transition-colors">
                  Textile Care Manifesto
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#B08D57] transition-colors">
                  Privacy Policy &amp; Discretion
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#B08D57] transition-colors">
                  Terms of Commission
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#B08D57] transition-colors">
                  Refund &amp; Reimbursement
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-[#B08D57] transition-colors">
                  Cookie &amp; Local Storage Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
