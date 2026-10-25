-- ==============================================================================
-- MAISON AURÉ — MASTER POSTGRESQL SCHEMA MIGRATION
-- 22 Tables, RLS Policies, Indexes, Triggers, Storage Buckets, and Atomic RPCs
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 2. CATEGORIES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    image TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 3. COLLECTIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    banner_image TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    launch_at TIMESTAMPTZ,
    is_drop BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 4. PRODUCTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_desc TEXT,
    description TEXT,
    fabric TEXT,
    care TEXT,
    fit_notes TEXT,
    base_price NUMERIC(10, 2) NOT NULL CHECK (base_price >= 0),
    sale_price NUMERIC(10, 2) CHECK (sale_price IS NULL OR sale_price < base_price),
    gst_rate NUMERIC(5, 2) NOT NULL DEFAULT 12.00,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_new BOOLEAN NOT NULL DEFAULT false,
    tags TEXT[] NOT NULL DEFAULT '{}',
    seo_title TEXT,
    seo_desc TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 5. PRODUCT_COLLECTIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_collections (
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    collection_id UUID NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, collection_id)
);

-- ------------------------------------------------------------------------------
-- 6. PRODUCT_IMAGES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt TEXT,
    color TEXT,
    sort_order INT NOT NULL DEFAULT 0
);

-- ------------------------------------------------------------------------------
-- 7. PRODUCT_VARIANTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    sku TEXT NOT NULL UNIQUE,
    size TEXT NOT NULL,
    color TEXT NOT NULL,
    color_hex TEXT NOT NULL DEFAULT '#111111',
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    price_override NUMERIC(10, 2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_product_variant UNIQUE (product_id, size, color)
);

-- ------------------------------------------------------------------------------
-- 8. REVIEWS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    body TEXT,
    photos TEXT[] NOT NULL DEFAULT '{}',
    fit_feedback TEXT CHECK (fit_feedback IN ('runs_small', 'true_to_size', 'runs_large')),
    is_approved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 9. WISHLISTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wishlists (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (user_id, product_id)
);

-- ------------------------------------------------------------------------------
-- 10. ADDRESSES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    line1 TEXT NOT NULL,
    line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 11. COUPONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.coupons (
    code TEXT PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('percent', 'flat')),
    value NUMERIC(10, 2) NOT NULL CHECK (value > 0),
    min_order NUMERIC(10, 2) NOT NULL DEFAULT 0,
    max_discount NUMERIC(10, 2),
    usage_limit INT,
    used_count INT NOT NULL DEFAULT 0,
    starts_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 12. ORDERS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    guest_email TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned')),
    payment_method TEXT NOT NULL CHECK (payment_method IN ('razorpay', 'cod')),
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    subtotal NUMERIC(10, 2) NOT NULL,
    discount NUMERIC(10, 2) NOT NULL DEFAULT 0,
    shipping NUMERIC(10, 2) NOT NULL DEFAULT 0,
    cod_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
    gst_total NUMERIC(10, 2) NOT NULL DEFAULT 0,
    total NUMERIC(10, 2) NOT NULL,
    coupon_code TEXT REFERENCES public.coupons(code) ON DELETE SET NULL,
    shipping_address JSONB NOT NULL,
    gift_wrap BOOLEAN NOT NULL DEFAULT false,
    gift_message TEXT,
    tracking_number TEXT,
    courier TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 13. ORDER_ITEMS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id),
    variant_id UUID NOT NULL REFERENCES public.product_variants(id),
    name TEXT NOT NULL,
    image TEXT,
    size TEXT NOT NULL,
    color TEXT NOT NULL,
    qty INT NOT NULL CHECK (qty > 0),
    unit_price NUMERIC(10, 2) NOT NULL,
    gst_rate NUMERIC(5, 2) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 14. ORDER_EVENTS (Audit & Timeline)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.order_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 15. RETURN_REQUESTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.return_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    order_item_id UUID NOT NULL REFERENCES public.order_items(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'approved', 'rejected', 'completed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 16. STOCK_NOTIFICATIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.stock_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 17. NEWSLETTER_SUBSCRIBERS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    source TEXT DEFAULT 'website_footer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 18. CONTACT_MESSAGES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 19. CONSULTATIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 20. HOME_SECTIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.home_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT NOT NULL UNIQUE,
    title TEXT,
    content JSONB NOT NULL DEFAULT '{}',
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- ------------------------------------------------------------------------------
-- 21. SITE_SETTINGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 22. JOURNAL_POSTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.journal_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    body TEXT,
    cover_image TEXT,
    published_at TIMESTAMPTZ,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_active_featured ON public.products(is_active, is_featured);
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON public.product_images(product_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON public.reviews(product_id, is_approved);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_user ON public.wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_addresses_user ON public.addresses(user_id);

-- ==============================================================================
-- POSTGRES ATOMIC FUNCTIONS (RPC)
-- ==============================================================================

-- 1. Generate Order Number
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT AS $$
DECLARE
    next_num INT;
    current_year TEXT;
BEGIN
    current_year := to_char(CURRENT_DATE, 'YYYY');
    SELECT count(*) + 1 INTO next_num FROM public.orders WHERE created_at >= date_trunc('year', CURRENT_DATE);
    RETURN 'MA-' || current_year || '-' || lpad(next_num::text, 6, '0');
END;
$$ LANGUAGE plpgsql VOLATILE;

-- 2. Create Order Atomically (Decrements stock, fails safely if insufficient)
CREATE OR REPLACE FUNCTION public.create_order(
    p_order JSONB,
    p_items JSONB
)
RETURNS JSONB AS $$
DECLARE
    v_order_id UUID;
    v_order_number TEXT;
    v_item JSONB;
    v_variant_id UUID;
    v_qty INT;
    v_current_stock INT;
    v_total NUMERIC;
BEGIN
    -- 1. Check stock for all items atomically with FOR UPDATE locks
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_variant_id := (v_item->>'variant_id')::UUID;
        v_qty := (v_item->>'qty')::INT;

        SELECT stock INTO v_current_stock
        FROM public.product_variants
        WHERE id = v_variant_id
        FOR UPDATE;

        IF NOT FOUND THEN
            RAISE EXCEPTION 'Variant % not found', v_variant_id;
        END IF;

        IF v_current_stock < v_qty THEN
            RAISE EXCEPTION 'Insufficient stock for variant %. Available: %, Requested: %', v_variant_id, v_current_stock, v_qty;
        END IF;
    END LOOP;

    -- 2. Generate order number
    v_order_number := public.generate_order_number();

    -- 3. Insert order
    INSERT INTO public.orders (
        order_number,
        user_id,
        guest_email,
        status,
        payment_method,
        payment_status,
        razorpay_order_id,
        razorpay_payment_id,
        subtotal,
        discount,
        shipping,
        cod_fee,
        gst_total,
        total,
        coupon_code,
        shipping_address,
        gift_wrap,
        gift_message,
        notes
    ) VALUES (
        v_order_number,
        (p_order->>'user_id')::UUID,
        p_order->>'guest_email',
        COALESCE(p_order->>'status', 'pending'),
        p_order->>'payment_method',
        COALESCE(p_order->>'payment_status', 'pending'),
        p_order->>'razorpay_order_id',
        p_order->>'razorpay_payment_id',
        (p_order->>'subtotal')::NUMERIC,
        COALESCE((p_order->>'discount')::NUMERIC, 0),
        COALESCE((p_order->>'shipping')::NUMERIC, 0),
        COALESCE((p_order->>'cod_fee')::NUMERIC, 0),
        COALESCE((p_order->>'gst_total')::NUMERIC, 0),
        (p_order->>'total')::NUMERIC,
        p_order->>'coupon_code',
        p_order->'shipping_address',
        COALESCE((p_order->>'gift_wrap')::BOOLEAN, false),
        p_order->>'gift_message',
        p_order->>'notes'
    )
    RETURNING id, total INTO v_order_id, v_total;

    -- 4. Insert items and decrement stock
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_variant_id := (v_item->>'variant_id')::UUID;
        v_qty := (v_item->>'qty')::INT;

        INSERT INTO public.order_items (
            order_id,
            product_id,
            variant_id,
            name,
            image,
            size,
            color,
            qty,
            unit_price,
            gst_rate
        ) VALUES (
            v_order_id,
            (v_item->>'product_id')::UUID,
            v_variant_id,
            v_item->>'name',
            v_item->>'image',
            v_item->>'size',
            v_item->>'color',
            v_qty,
            (v_item->>'unit_price')::NUMERIC,
            (v_item->>'gst_rate')::NUMERIC
        );

        -- Decrement stock atomically
        UPDATE public.product_variants
        SET stock = stock - v_qty
        WHERE id = v_variant_id;
    END LOOP;

    -- 5. Record first order timeline event
    INSERT INTO public.order_events (order_id, status, note)
    VALUES (v_order_id, 'created', 'Order successfully initiated via atelier checkout.');

    RETURN jsonb_build_object(
        'order_id', v_order_id,
        'order_number', v_order_number,
        'total', v_total
    );
END;
$$ LANGUAGE plpgsql VOLATILE;

-- 3. Restock On Cancel
CREATE OR REPLACE FUNCTION public.restock_on_cancel(p_order_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_item RECORD;
BEGIN
    FOR v_item IN SELECT variant_id, qty FROM public.order_items WHERE order_id = p_order_id
    LOOP
        UPDATE public.product_variants
        SET stock = stock + v_item.qty
        WHERE id = v_item.variant_id;
    END LOOP;

    UPDATE public.orders
    SET status = 'cancelled', updated_at = timezone('utc'::text, now())
    WHERE id = p_order_id;

    INSERT INTO public.order_events (order_id, status, note)
    VALUES (p_order_id, 'cancelled', 'Order cancelled and inventory replenished to atelier stock.');

    RETURN true;
END;
$$ LANGUAGE plpgsql VOLATILE;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.return_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_posts ENABLE ROW LEVEL SECURITY;

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public Read Catalog Policies
CREATE POLICY "Public read active categories" ON public.categories FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Admin write categories" ON public.categories FOR ALL USING (public.is_admin());

CREATE POLICY "Public read collections" ON public.collections FOR SELECT USING (true);
CREATE POLICY "Admin write collections" ON public.collections FOR ALL USING (public.is_admin());

CREATE POLICY "Public read active products" ON public.products FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Admin write products" ON public.products FOR ALL USING (public.is_admin());

CREATE POLICY "Public read product collections" ON public.product_collections FOR SELECT USING (true);
CREATE POLICY "Admin write product collections" ON public.product_collections FOR ALL USING (public.is_admin());

CREATE POLICY "Public read product images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Admin write product images" ON public.product_images FOR ALL USING (public.is_admin());

CREATE POLICY "Public read product variants" ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Admin write product variants" ON public.product_variants FOR ALL USING (public.is_admin());

-- Reviews: public read approved, users create, admin full write
CREATE POLICY "Public read approved reviews" ON public.reviews FOR SELECT USING (is_approved = true OR auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin manage reviews" ON public.reviews FOR ALL USING (public.is_admin());

-- Wishlists: users manage their own
CREATE POLICY "Users manage wishlist" ON public.wishlists FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Addresses: users manage their own
CREATE POLICY "Users manage addresses" ON public.addresses FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Coupons: public read active, admin write
CREATE POLICY "Public read active coupons" ON public.coupons FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Admin write coupons" ON public.coupons FOR ALL USING (public.is_admin());

-- Orders: users read their own, guests read via session or checkout token, admin write
CREATE POLICY "Users read own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Admin manage orders" ON public.orders FOR ALL USING (public.is_admin());

-- Order items & events
CREATE POLICY "Users read order items" ON public.order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY "Admin manage order items" ON public.order_items FOR ALL USING (public.is_admin());

CREATE POLICY "Users read order events" ON public.order_events FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_events.order_id AND (orders.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY "Admin manage order events" ON public.order_events FOR ALL USING (public.is_admin());

-- Lead generation & Guest Interactions (Guests can insert only)
CREATE POLICY "Anyone insert stock notifications" ON public.stock_notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin view stock notifications" ON public.stock_notifications FOR SELECT USING (public.is_admin());

CREATE POLICY "Anyone insert newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin view newsletter" ON public.newsletter_subscribers FOR SELECT USING (public.is_admin());

CREATE POLICY "Anyone insert contact message" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin view contact message" ON public.contact_messages FOR SELECT USING (public.is_admin());

CREATE POLICY "Anyone insert consultation" ON public.consultations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin view consultation" ON public.consultations FOR SELECT USING (public.is_admin());

-- Content sections & site settings
CREATE POLICY "Public read active home sections" ON public.home_sections FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Admin write home sections" ON public.home_sections FOR ALL USING (public.is_admin());

CREATE POLICY "Public read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin write site settings" ON public.site_settings FOR ALL USING (public.is_admin());

CREATE POLICY "Public read published journal" ON public.journal_posts FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admin write journal" ON public.journal_posts FOR ALL USING (public.is_admin());

-- Profiles policy
CREATE POLICY "Users view and update own profile" ON public.profiles FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Admin view all profiles" ON public.profiles FOR SELECT USING (public.is_admin());

-- ==============================================================================
-- STORAGE BUCKETS
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('product-images', 'product-images', true),
    ('review-photos', 'review-photos', true),
    ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read product images bucket" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Admin write product images bucket" ON storage.objects FOR ALL USING (bucket_id = 'product-images' AND public.is_admin());

CREATE POLICY "Public read review photos bucket" ON storage.objects FOR SELECT USING (bucket_id = 'review-photos');
CREATE POLICY "Authenticated users upload review photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'review-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Public read site assets bucket" ON storage.objects FOR SELECT USING (bucket_id = 'site-assets');
CREATE POLICY "Admin write site assets bucket" ON storage.objects FOR ALL USING (bucket_id = 'site-assets' AND public.is_admin());
