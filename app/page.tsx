import {
  MOCK_CATEGORIES,
  MOCK_COLLECTIONS,
  MOCK_PRODUCTS,
  MOCK_JOURNAL_POSTS,
} from "@/lib/data/mock-db";
import { HeroSlider } from "@/components/home/hero-slider";
import { PressMarquee } from "@/components/home/press-marquee";
import { CategoryGrid } from "@/components/home/category-grid";
import { NewArrivalsCarousel } from "@/components/home/new-arrivals-carousel";
import { EditorialSplit } from "@/components/home/editorial-split";
import { ShoppableLook } from "@/components/home/shoppable-look";
import { BestsellersTabs } from "@/components/home/bestsellers-tabs";
import { TheDrop } from "@/components/home/the-drop";
import { BrandPromise } from "@/components/home/brand-promise";
import { TestimonialsSlider } from "@/components/home/testimonials-slider";
import { InstagramGrid } from "@/components/home/instagram-grid";
import { JournalTeaser } from "@/components/home/journal-teaser";
import { WelcomeNewsletter } from "@/components/home/welcome-newsletter";
import { WelcomePopup } from "@/components/home/welcome-popup";

export default function HomePage() {
  const newArrivals = MOCK_PRODUCTS.filter((p) => p.is_new);
  const bestsellers = MOCK_PRODUCTS.filter((p) => p.is_featured);
  const dropCollection = MOCK_COLLECTIONS.find((c) => c.is_drop);

  return (
    <div className="w-full">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Press Marquee */}
      <PressMarquee />

      {/* 3. Shop By Category */}
      <CategoryGrid categories={MOCK_CATEGORIES} />

      {/* 4. New Arrivals Carousel */}
      <NewArrivalsCarousel products={newArrivals} />

      {/* 5. Editorial Split Story */}
      <EditorialSplit />

      {/* 6. Featured Shoppable Look with Hotspots */}
      <ShoppableLook />

      {/* 7. Bestsellers Tabs */}
      <BestsellersTabs products={bestsellers} />

      {/* 8. The Drop Countdown & Notification */}
      <TheDrop dropCollection={dropCollection} />

      {/* 9. Brand Promise Strip */}
      <BrandPromise />

      {/* 10. Testimonials Slider */}
      <TestimonialsSlider />

      {/* 11. Instagram Grid */}
      <InstagramGrid />

      {/* 12. Journal Teaser */}
      <JournalTeaser posts={MOCK_JOURNAL_POSTS} />

      {/* 13. Welcome Newsletter Banner with 10% Code */}
      <WelcomeNewsletter />

      {/* 14. First-visit Welcome Popup */}
      <WelcomePopup />
    </div>
  );
}
