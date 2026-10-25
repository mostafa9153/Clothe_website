"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  RotateCcw,
  Users,
  Tag,
  Star,
  FileText,
  Mail,
  Sliders,
  Activity,
  LogOut,
  Bell,
  Search,
  ExternalLink,
  Menu,
  X,
  ShieldAlert,
} from "lucide-react";
import brandConfig from "@/config/brand.config";
import { MOCK_ORDERS, MOCK_REVIEWS } from "@/lib/data/mock-db";
import { toast } from "sonner";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const pendingOrdersCount = MOCK_ORDERS.filter((o) => ["pending", "confirmed"].includes(o.status)).length;
  const pendingReviewsCount = MOCK_REVIEWS.filter((r) => !r.is_approved).length;

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products Catalog", href: "/admin/products", icon: Package },
    { label: "Categories & Drops", href: "/admin/categories", icon: Layers },
    { label: "Variant Inventory", href: "/admin/inventory", icon: Sliders },
    { label: "Orders & Provenance", href: "/admin/orders", icon: ShoppingBag, badge: pendingOrdersCount },
    { label: "Return Requests", href: "/admin/returns", icon: RotateCcw },
    { label: "Patrons / Customers", href: "/admin/customers", icon: Users },
    { label: "Privilege Coupons", href: "/admin/coupons", icon: Tag },
    { label: "Review Moderation", href: "/admin/reviews", icon: Star, badge: pendingReviewsCount },
    { label: "Homepage & Content", href: "/admin/content", icon: Layers },
    { label: "Journal Articles", href: "/admin/journal", icon: FileText },
    { label: "Marketing Leads", href: "/admin/marketing", icon: Mail },
    { label: "Store Settings", href: "/admin/settings", icon: Sliders },
    { label: "Audit Activity Log", href: "/admin/activity", icon: Activity },
  ];

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Admin session terminated.");
    router.push("/account/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex text-[#111111]">
      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex lg:w-64 bg-[#111111] text-[#F7F4EE] flex-col justify-between border-r border-[#2B2E26] shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Brand Wordmark */}
          <div className="space-y-1 pb-4 border-b border-stone-800">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
              Atelier Director
            </span>
            <Link href="/admin" className="font-heading text-xl uppercase tracking-wider block text-white">
              {brandConfig.name}
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-0.5 text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 transition-colors uppercase tracking-wider text-[11px] ${
                    isActive
                      ? "bg-[#2B2E26] text-white font-medium border-l-2 border-[#B08D57]"
                      : "text-[#8A857C] hover:text-white hover:bg-stone-900"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 stroke-[1.25]" />
                    <span>{item.label}</span>
                  </span>
                  {Boolean(item.badge && item.badge > 0) && (
                    <span className="px-1.5 py-0.2 bg-[#B08D57] text-white text-[10px] font-mono rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-stone-800 space-y-3 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-[#8A857C] hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Storefront</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#B08D57]">Live</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors pt-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out of Atelier</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-[#E4DFD5] px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#8A857C] hover:text-[#111111]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#8A857C]">
              <span className="font-medium text-[#111111]">Director Portal</span>
              <span>•</span>
              <span>Active Atelier Deployment (Local Demo)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/orders"
              className="relative p-2 text-[#8A857C] hover:text-[#111111] transition-colors"
              title="Pending Commissions"
            >
              <Bell className="w-4 h-4 stroke-[1.25]" />
              {pendingOrdersCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B08D57]" />
              )}
            </Link>

            <div className="flex items-center gap-2.5 pl-3 border-l border-[#E4DFD5]">
              <div className="w-7 h-7 rounded-full bg-[#111111] text-[#B08D57] flex items-center justify-center font-serif text-xs font-medium">
                MA
              </div>
              <div className="hidden sm:block text-left text-xs leading-tight">
                <p className="font-medium text-[#111111]">Marc Aurèle</p>
                <p className="text-[10px] text-[#8A857C]">Atelier Director</p>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#111111] text-[#F7F4EE] border-b border-stone-800 p-6 space-y-4">
            <nav className="grid grid-cols-2 gap-2 text-xs">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 border border-stone-800 text-[#8A857C] hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="pt-2 border-t border-stone-800 flex justify-between text-xs">
              <Link href="/" target="_blank" className="text-[#B08D57]">
                View Live Storefront &rarr;
              </Link>
              <button onClick={handleSignOut} className="text-red-400">
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="p-6 sm:p-10 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
