"use client";

import { useState } from "react";
import Link from "next/link";
import brandConfig from "@/config/brand.config";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RatingStars } from "@/components/ui/rating-stars";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { PriceDisplay } from "@/components/ui/price-display";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Reveal } from "@/components/ui/reveal";
import { toast } from "@/components/ui/toast";
import { ArrowLeft, Check, Sparkles, ShoppingBag } from "lucide-react";

export default function DesignSystemPage() {
  const [stepperVal, setStepperVal] = useState(1);
  const [currentPage, setCurrentPage] = useState(2);
  const [selectedRadio, setSelectedRadio] = useState("express");
  const [checkedBox, setCheckedBox] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F4EE] pb-32">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#F7F4EE]/90 backdrop-blur-md border-b border-[#E4DFD5]">
        <Container className="h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#111111] hover:text-[#B08D57] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 stroke-[1.25]" />
            <span>Return to Atelier</span>
          </Link>
          <div className="font-heading text-lg tracking-widest text-[#111111]">
            {brandConfig.name} — DESIGN ATELIER
          </div>
          <Badge variant="gold">Phase 0 Spec</Badge>
        </Container>
      </header>

      <Container className="pt-16">
        <Reveal>
          <SectionHeading
            eyebrow="Aesthetic Foundations"
            title="Design System & Component Library"
            subtitle="Built on the principles of quiet luxury: tactile ivory surfaces, generous architectural whitespace, razor-thin hairlines, and purposeful restraint."
          />
        </Reveal>

        {/* 01. COLOR PALETTE */}
        <section className="mt-16 pt-12 border-t border-[#E4DFD5]">
          <div className="mb-8">
            <span className="label-caps text-[#B08D57] block mb-1">01 / Chromatic Architecture</span>
            <h3 className="text-2xl font-heading text-[#111111]">The Color Palette</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Object.entries(brandConfig.colors).map(([name, hex]) => (
              <div key={name} className="border border-[#E4DFD5] bg-white p-3 flex flex-col justify-between">
                <div
                  className="w-full h-20 mb-3 border border-black/5"
                  style={{ backgroundColor: hex }}
                />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#111111]">
                    {name.replace(/([A-Z])/g, " $1")}
                  </p>
                  <p className="text-[11px] font-mono text-[#8A857C] uppercase">{hex}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 02. TYPOGRAPHY */}
        <section className="mt-20 pt-12 border-t border-[#E4DFD5]">
          <div className="mb-8">
            <span className="label-caps text-[#B08D57] block mb-1">02 / Typography</span>
            <h3 className="text-2xl font-heading text-[#111111]">Serif & Small Caps Hierarchy</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 border border-[#E4DFD5]">
            <div className="space-y-6">
              <div>
                <span className="label-caps text-[#8A857C] block mb-2">Display Heading (Cormorant Garamond)</span>
                <p className="text-4xl md:text-5xl font-heading text-[#111111] leading-tight">
                  Elegance is the refusal of excess.
                </p>
              </div>
              <div>
                <span className="label-caps text-[#8A857C] block mb-2">Section Headline H2</span>
                <p className="text-3xl font-heading text-[#111111]">The Autumn/Winter Capsule</p>
              </div>
              <div>
                <span className="label-caps text-[#8A857C] block mb-2">Product Title H3</span>
                <p className="text-xl font-heading text-[#111111]">Double-Faced Cashmere Overcoat</p>
              </div>
            </div>
            <div className="space-y-6 border-t md:border-t-0 md:border-l border-[#E4DFD5] md:pl-8 pt-6 md:pt-0">
              <div>
                <span className="label-caps text-[#8A857C] block mb-2">Eyebrow / Small Caps (0.18em Letter Spaced)</span>
                <p className="label-caps text-[#111111]">Atelier Collection 2026 • Limited Edition</p>
              </div>
              <div>
                <span className="label-caps text-[#8A857C] block mb-2">Body Copy (Jost Sans-Serif)</span>
                <p className="text-sm text-[#8A857C] leading-relaxed">
                  Spun from 100% Mongolian combed cashmere, each fiber measures precisely 15.2 microns in diameter. Sourced ethically from generational pastures and woven slowly in northern Italy.
                </p>
              </div>
              <div>
                <span className="label-caps text-[#8A857C] block mb-2">Tabular Pricing Numerals</span>
                <p className="text-lg font-medium tabular-nums text-[#111111]">₹48,500 <span className="text-xs text-[#8A857C] font-normal">(GST Inclusive)</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* 03. BUTTONS */}
        <section className="mt-20 pt-12 border-t border-[#E4DFD5]">
          <div className="mb-8">
            <span className="label-caps text-[#B08D57] block mb-1">03 / Interaction</span>
            <h3 className="text-2xl font-heading text-[#111111]">Architectural Buttons</h3>
          </div>
          <div className="bg-white p-8 border border-[#E4DFD5] space-y-8">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Primary (Ink + Gold Slide)</Button>
              <Button variant="secondary">Secondary (1px Outline)</Button>
              <Button variant="outline">Subtle Outline</Button>
              <Button variant="gold">Champagne Gold</Button>
              <Button variant="link">Underline Grow</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E4DFD5]">
              <Button variant="primary" size="sm">Small (36px)</Button>
              <Button variant="primary" size="default">Default (48px)</Button>
              <Button variant="primary" size="lg">Large (56px)</Button>
              <Button variant="primary" isLoading>Processing Order</Button>
              <Button variant="secondary" disabled>Out of Stock</Button>
            </div>
          </div>
        </section>

        {/* 04. FORMS & INPUTS */}
        <section className="mt-20 pt-12 border-t border-[#E4DFD5]">
          <div className="mb-8">
            <span className="label-caps text-[#B08D57] block mb-1">04 / Form Controls</span>
            <h3 className="text-2xl font-heading text-[#111111]">Minimalist Inputs</h3>
          </div>
          <div className="bg-white p-8 border border-[#E4DFD5] grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="input-name" className="block mb-2">Full Name</Label>
                <Input id="input-name" placeholder="Lady Catherine de Bourgh" />
              </div>
              <div>
                <Label htmlFor="input-email" className="block mb-2">Email Address</Label>
                <Input id="input-email" type="email" placeholder="client@maisonaure.com" />
              </div>
              <div>
                <Label htmlFor="input-error" className="block mb-2">Pincode (Error State Demo)</Label>
                <Input id="input-error" placeholder="999999" error="Pincode unserviceable for expedited courier delivery" />
              </div>
              <div>
                <Label htmlFor="select-size" className="block mb-2">Bespoke Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="select-size">
                    <SelectValue placeholder="Select Garment Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xs">XS — Extra Small (IT 38)</SelectItem>
                    <SelectItem value="small">S — Small (IT 40)</SelectItem>
                    <SelectItem value="medium">M — Medium (IT 42)</SelectItem>
                    <SelectItem value="large">L — Large (IT 44)</SelectItem>
                    <SelectItem value="xl">XL — Extra Large (IT 46)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="textarea-instructions" className="block mb-2">Special Delivery Notes</Label>
                <Textarea
                  id="textarea-instructions"
                  placeholder="Please specify signature-required or private concierge gate instructions..."
                  rows={4}
                />
              </div>

              <div className="pt-2">
                <Label className="block mb-3">Delivery Preference</Label>
                <RadioGroup value={selectedRadio} onValueChange={setSelectedRadio}>
                  <div className="flex items-center space-x-3 p-3 border border-[#E4DFD5]">
                    <RadioGroupItem value="standard" id="r-standard" />
                    <Label htmlFor="r-standard" className="text-xs cursor-pointer font-normal normal-case tracking-normal">
                      Standard Atelier Courier (3–5 Business Days) — <span className="font-medium text-[#111111]">Complimentary</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border border-[#E4DFD5]">
                    <RadioGroupItem value="express" id="r-express" />
                    <Label htmlFor="r-express" className="text-xs cursor-pointer font-normal normal-case tracking-normal">
                      White-Glove Same Day Dispatch — <span className="font-medium text-[#111111]">₹450</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <Checkbox
                  id="newsletter"
                  checked={checkedBox}
                  onCheckedChange={(val) => setCheckedBox(!!val)}
                />
                <Label htmlFor="newsletter" className="text-xs cursor-pointer normal-case tracking-normal text-[#8A857C]">
                  Receive private invitations to confidential showroom drops and trunk sales.
                </Label>
              </div>
            </div>
          </div>
        </section>

        {/* 05. OVERLAYS & MODALS */}
        <section className="mt-20 pt-12 border-t border-[#E4DFD5]">
          <div className="mb-8">
            <span className="label-caps text-[#B08D57] block mb-1">05 / Overlays & Feedback</span>
            <h3 className="text-2xl font-heading text-[#111111]">Modal, Drawer & Toast Notifications</h3>
          </div>
          <div className="bg-white p-8 border border-[#E4DFD5] flex flex-wrap gap-4 items-center">
            {/* Modal Dialog */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">Open Luxury Modal</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Garment Lineage & Provenance</DialogTitle>
                  <DialogDescription>
                    Serial verification No. MA-2026-8849
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 text-sm text-[#8A857C] leading-relaxed">
                  Every thread in this limited creation originated from single-estate regenerative cotton farms in Gujarat, woven on century-old restored shuttle looms.
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => {
                    setIsModalOpen(false);
                    toast.success("Provenance Certificate Downloaded");
                  }}>
                    Acquire Certificate
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Slide Drawer */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="primary" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 stroke-[1.25]" />
                  <span>Open Drawer (Side Panel)</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent side="right">
                <DrawerHeader>
                  <DrawerTitle>Your Atelier Bag</DrawerTitle>
                  <DrawerDescription>1 Exclusive Creation Reserved</DrawerDescription>
                </DrawerHeader>
                <div className="py-6 flex-1 flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 border border-[#B08D57] flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-[#B08D57] stroke-[1.25]" />
                  </div>
                  <h4 className="text-lg font-heading text-[#111111] mb-1">Raw Silk Kimono Trench</h4>
                  <p className="text-xs text-[#8A857C] uppercase tracking-wider mb-2">Size M • Desert Ochre</p>
                  <PriceDisplay price={32900} />
                </div>
                <DrawerFooter>
                  <Button variant="primary" onClick={() => {
                    setIsDrawerOpen(false);
                    toast.success("Proceeding to secure checkout");
                  }}>
                    Proceed to Bag
                  </Button>
                  <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                    Continue Browsing
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

            {/* Toast Buttons */}
            <Button
              variant="outline"
              onClick={() => toast.success("Added to Atelier Bag", { description: "Double-Faced Cashmere Overcoat (Size 42)" })}
            >
              Trigger Success Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error("Bespoke Size Unavailable", { description: "Kindly subscribe to notification list for restocking." })}
            >
              Trigger Error Toast
            </Button>
          </div>
        </section>

        {/* 06. PRODUCT & COMMERCE WIDGETS */}
        <section className="mt-20 pt-12 border-t border-[#E4DFD5]">
          <div className="mb-8">
            <span className="label-caps text-[#B08D57] block mb-1">06 / Commerce Micro-Components</span>
            <h3 className="text-2xl font-heading text-[#111111]">Price, Ratings, Steppers & Badges</h3>
          </div>
          <div className="bg-white p-8 border border-[#E4DFD5] grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <span className="label-caps text-[#8A857C] block mb-2">Price Formats</span>
                <div className="flex flex-col gap-3">
                  <PriceDisplay price={14500} size="xl" />
                  <PriceDisplay price={24000} salePrice={18500} size="lg" />
                  <PriceDisplay price={8900} salePrice={6900} size="sm" />
                </div>
              </div>

              <div>
                <span className="label-caps text-[#8A857C] block mb-2">Quantity Stepper (Stock bounded 1–10)</span>
                <QuantityStepper
                  value={stepperVal}
                  onChange={setStepperVal}
                  min={1}
                  max={5}
                />
              </div>

              <div>
                <span className="label-caps text-[#8A857C] block mb-2">Rating Stars</span>
                <div className="space-y-2">
                  <RatingStars rating={4.9} totalReviews={128} size="md" />
                  <RatingStars rating={3.5} totalReviews={42} size="sm" />
                </div>
              </div>
            </div>

            <div className="space-y-6 border-t md:border-t-0 md:border-l border-[#E4DFD5] md:pl-8 pt-6 md:pt-0">
              <div>
                <span className="label-caps text-[#8A857C] block mb-3">Status Badges</span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">New Arrival</Badge>
                  <Badge variant="gold">Atelier Exclusive</Badge>
                  <Badge variant="olive">Organic Linen</Badge>
                  <Badge variant="sale">25% Off</Badge>
                  <Badge variant="secondary">Pre-Order</Badge>
                  <Badge variant="outline">Low Stock</Badge>
                </div>
              </div>

              <div>
                <span className="label-caps text-[#8A857C] block mb-2">Breadcrumbs</span>
                <Breadcrumb
                  items={[
                    { label: "Atelier", href: "/" },
                    { label: "Women", href: "/category/women" },
                    { label: "Outerwear", href: "/category/outerwear" },
                    { label: "Alpaca Trench" },
                  ]}
                />
              </div>

              <div>
                <span className="label-caps text-[#8A857C] block mb-2">Skeleton Shimmer Loader</span>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-72" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 07. ACCORDION & TABS */}
        <section className="mt-20 pt-12 border-t border-[#E4DFD5]">
          <div className="mb-8">
            <span className="label-caps text-[#B08D57] block mb-1">07 / Structure & Layout</span>
            <h3 className="text-2xl font-heading text-[#111111]">Accordion & Tabs</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border border-[#E4DFD5]">
              <span className="label-caps text-[#8A857C] block mb-4">Vertical Accordion (Product PDP Spec)</span>
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Textile Composition & Craft</AccordionTrigger>
                  <AccordionContent>
                    100% long-staple French flax linen grown sustainably along the coastal belt of Normandy. Enzyme-washed for unmatched drape and an exceptionally soft hand-feel.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Sizing & Silhouette Fit</AccordionTrigger>
                  <AccordionContent>
                    Cut with an architectural, slightly relaxed shoulder that falls straight through the torso. If you prefer a tailored fit, we advise selecting one size down.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Complimentary Courier & Returns</AccordionTrigger>
                  <AccordionContent>
                    Complimentary doorstep insured courier delivery. 10-day exchange window with prepaid packaging pickup provided for all orders.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="bg-white p-8 border border-[#E4DFD5]">
              <span className="label-caps text-[#8A857C] block mb-4">Content Tabs</span>
              <Tabs defaultValue="women">
                <TabsList>
                  <TabsTrigger value="women">Women</TabsTrigger>
                  <TabsTrigger value="men">Men</TabsTrigger>
                  <TabsTrigger value="accessories">Objects & Leather</TabsTrigger>
                </TabsList>
                <TabsContent value="women">
                  <p className="text-sm text-[#8A857C] leading-relaxed">
                    Sculptural tunics, fluid silk shirts, and double-pleated wool trousers tailored for refined silhouettes.
                  </p>
                </TabsContent>
                <TabsContent value="men">
                  <p className="text-sm text-[#8A857C] leading-relaxed">
                    Unstructured linen blazers, sea-island cotton overshirts, and relaxed drawstring trousers.
                  </p>
                </TabsContent>
                <TabsContent value="accessories">
                  <p className="text-sm text-[#8A857C] leading-relaxed">
                    Vegetable-tanned leather totes, hand-fringed silk scarves, and unlacquered brass cuff jewelry.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* 08. IMAGERY & FALLBACK */}
        <section className="mt-20 pt-12 border-t border-[#E4DFD5]">
          <div className="mb-8">
            <span className="label-caps text-[#B08D57] block mb-1">08 / Editorial Imagery</span>
            <h3 className="text-2xl font-heading text-[#111111]">Aspect Ratios & Elegant Fallback</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 border border-[#E4DFD5]">
              <span className="label-caps text-[#8A857C] block mb-2">3:4 Portrait (Editorial Image)</span>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80"
                alt="Model in tailored minimalist coat"
                aspectRatio="portrait"
                width={600}
                height={800}
              />
              <p className="mt-3 text-xs uppercase tracking-wider text-[#111111] font-medium">Fine Merino Tunic</p>
              <PriceDisplay price={16800} size="sm" className="mt-1" />
            </div>

            <div className="bg-white p-4 border border-[#E4DFD5]">
              <span className="label-caps text-[#8A857C] block mb-2">3:4 Portrait (Second Look)</span>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                alt="Model in modern minimalist fashion"
                aspectRatio="portrait"
                width={600}
                height={800}
              />
              <p className="mt-3 text-xs uppercase tracking-wider text-[#111111] font-medium">Oversized Poplin Shirt</p>
              <PriceDisplay price={12400} size="sm" className="mt-1" />
            </div>

            <div className="bg-white p-4 border border-[#E4DFD5]">
              <span className="label-caps text-[#8A857C] block mb-2">Fallback Test (Broken URL Demo)</span>
              <ImageWithFallback
                src="https://images.unsplash.com/invalid-image-path-404.jpg"
                alt="Missing photograph fallback"
                aspectRatio="portrait"
                fallbackText="Archival Atelier Piece"
                width={600}
                height={800}
              />
              <p className="mt-3 text-xs uppercase tracking-wider text-[#111111] font-medium">Archival Linen Blazer</p>
              <PriceDisplay price={21000} size="sm" className="mt-1" />
            </div>
          </div>
        </section>

        {/* 09. PAGINATION */}
        <section className="mt-20 pt-12 border-t border-[#E4DFD5]">
          <div className="mb-4">
            <span className="label-caps text-[#B08D57] block mb-1">09 / Pagination</span>
            <h3 className="text-2xl font-heading text-[#111111]">Pagination Control</h3>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={(page) => {
              setCurrentPage(page);
              toast(`Navigated to catalog page ${page}`);
            }}
          />
        </section>
      </Container>
    </div>
  );
}
