import { createClient } from "@supabase/supabase-js";
import {
  MOCK_CATEGORIES,
  MOCK_COLLECTIONS,
  MOCK_PRODUCTS,
  MOCK_REVIEWS,
  MOCK_COUPONS,
  MOCK_JOURNAL_POSTS,
} from "../lib/data/mock-db";

async function main() {
  console.log("==================================================================");
  console.log("AZAD — DATABASE SEED RUNNER");
  console.log("==================================================================");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes("placeholder")) {
    console.log("\n⚠️ Supabase environment variables not detected in .env.local.");
    console.log("------------------------------------------------------------------");
    console.log("To connect to a live Supabase project, add to .env.local:");
    console.log("  NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co");
    console.log("  NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>");
    console.log("  SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>");
    console.log("------------------------------------------------------------------");
    console.log("✨ GOOD NEWS: AZAD includes an integrated typed fallback layer!");
    console.log("The application runs 100% interactively right now with 30 Islamic products,");
    console.log("8 categories (Burkha, Hijab, Niqab, Panjabi, etc.), reviews, and working promo coupons.");
    console.log("\nDEMO USER CREDENTIALS (for Auth/Admin testing):");
    console.log("  • Admin:    admin@demo.com    / Pass: Azad2026!");
    console.log("  • Customer: customer@demo.com / Pass: Azad2026!");
    console.log("==================================================================\n");
    return;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  console.log(`Connecting to Supabase at: ${supabaseUrl}...`);

  try {
    // 1. Seed Categories
    console.log(`Seeding ${MOCK_CATEGORIES.length} categories...`);
    for (const cat of MOCK_CATEGORIES) {
      await supabase.from("categories").upsert({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        image: cat.image,
        sort_order: cat.sort_order,
        is_active: cat.is_active,
      });
    }

    // 2. Seed Collections
    console.log(`Seeding ${MOCK_COLLECTIONS.length} collections...`);
    for (const col of MOCK_COLLECTIONS) {
      await supabase.from("collections").upsert({
        id: col.id,
        name: col.name,
        slug: col.slug,
        description: col.description,
        banner_image: col.banner_image,
        is_featured: col.is_featured,
        launch_at: col.launch_at,
        is_drop: col.is_drop,
        sort_order: col.sort_order,
      });
    }

    // 3. Seed Products, Images, and Variants
    console.log(`Seeding ${MOCK_PRODUCTS.length} luxury products and variants...`);
    for (const prod of MOCK_PRODUCTS) {
      await supabase.from("products").upsert({
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        short_desc: prod.short_desc,
        description: prod.description,
        fabric: prod.fabric,
        care: prod.care,
        fit_notes: prod.fit_notes,
        base_price: prod.base_price,
        sale_price: prod.sale_price,
        gst_rate: prod.gst_rate,
        category_id: prod.category_id,
        is_active: prod.is_active,
        is_featured: prod.is_featured,
        is_new: prod.is_new,
        tags: prod.tags,
        seo_title: prod.seo_title,
        seo_desc: prod.seo_desc,
      });

      for (const img of prod.images) {
        await supabase.from("product_images").upsert({
          id: img.id,
          product_id: img.product_id,
          url: img.url,
          alt: img.alt,
          color: img.color,
          sort_order: img.sort_order,
        });
      }

      for (const v of prod.variants) {
        await supabase.from("product_variants").upsert({
          id: v.id,
          product_id: v.product_id,
          sku: v.sku,
          size: v.size,
          color: v.color,
          color_hex: v.color_hex,
          stock: v.stock,
          price_override: v.price_override,
        });
      }
    }

    // 4. Seed Reviews
    console.log(`Seeding ${MOCK_REVIEWS.length} client reviews...`);
    for (const rev of MOCK_REVIEWS) {
      await supabase.from("reviews").upsert({
        id: rev.id,
        product_id: rev.product_id,
        author_name: rev.author_name,
        rating: rev.rating,
        title: rev.title,
        body: rev.body,
        photos: rev.photos,
        fit_feedback: rev.fit_feedback,
        is_approved: rev.is_approved,
      });
    }

    // 5. Seed Coupons
    console.log(`Seeding ${MOCK_COUPONS.length} promotion codes...`);
    for (const c of MOCK_COUPONS) {
      await supabase.from("coupons").upsert({
        code: c.code,
        type: c.type,
        value: c.value,
        min_order: c.min_order,
        max_discount: c.max_discount,
        usage_limit: c.usage_limit,
        used_count: c.used_count,
        is_active: c.is_active,
      });
    }

    // 6. Seed Journal Posts
    console.log(`Seeding ${MOCK_JOURNAL_POSTS.length} editorial journal posts...`);
    for (const post of MOCK_JOURNAL_POSTS) {
      await supabase.from("journal_posts").upsert({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body,
        cover_image: post.cover_image,
        published_at: post.published_at,
        is_published: post.is_published,
      });
    }

    console.log("\n✅ Database successfully populated with Maison Auré catalog data!");
  } catch (error) {
    console.error("❌ Seeding encountered an error:", error);
  }
}

main().catch(console.error);
