"use client";

import * as React from "react";
import Image from "next/image";
import { Save, Plus, Trash2, Edit2, CheckCircle2, Layers } from "lucide-react";
import { MOCK_SITE_SETTINGS } from "@/lib/data/mock-db";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminContentPage() {
  const [heroSlides, setHeroSlides] = React.useState(MOCK_SITE_SETTINGS.hero_slides);
  const [announcements, setAnnouncements] = React.useState(MOCK_SITE_SETTINGS.announcement_messages);
  const [newAnnouncement, setNewAnnouncement] = React.useState("");

  const handleSaveHeroSlides = (e: React.FormEvent) => {
    e.preventDefault();
    MOCK_SITE_SETTINGS.hero_slides = heroSlides;
    toast.success("Hero slider content updated for storefront immediately.");
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.trim()) return;
    const updated = [...announcements, newAnnouncement.trim()];
    setAnnouncements(updated);
    MOCK_SITE_SETTINGS.announcement_messages = updated;
    setNewAnnouncement("");
    toast.success("Announcement message added.");
  };

  const handleRemoveAnnouncement = (index: number) => {
    const updated = announcements.filter((_, i) => i !== index);
    setAnnouncements(updated);
    MOCK_SITE_SETTINGS.announcement_messages = updated;
    toast.success("Announcement message removed.");
  };

  return (
    <div className="space-y-10 max-w-5xl">
      <div className="pb-6 border-b border-[#E4DFD5]">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block mb-1">
          Storefront CMS
        </span>
        <h1 className="font-heading text-3xl font-normal text-[#111111]">
          Homepage Hero & Visual Content Manager
        </h1>
      </div>

      {/* Hero Slides Editor */}
      <div className="bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex justify-between items-center pb-2 border-b border-[#E4DFD5]">
          <div>
            <h3 className="font-heading text-xl text-[#111111]">
              Hero Carousel Slides ({heroSlides.length})
            </h3>
            <p className="text-[#8A857C] text-xs">Full-viewport editorial image slides and calls-to-action</p>
          </div>
          <Button onClick={handleSaveHeroSlides} size="sm" className="text-xs uppercase tracking-wider">
            Commit Hero Changes
          </Button>
        </div>

        <div className="space-y-6">
          {heroSlides.map((slide, idx) => (
            <div key={slide.id || idx} className="p-5 border border-[#E4DFD5] bg-[#F7F4EE]/40 space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E4DFD5]">
                <span className="font-medium text-xs uppercase tracking-wider text-[#111111]">
                  Slide {idx + 1}
                </span>
                <span className="font-mono text-[10px] text-[#8A857C]">{slide.id}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Small-Caps Eyebrow</label>
                  <input
                    type="text"
                    value={slide.eyebrow}
                    onChange={(e) => {
                      const val = e.target.value;
                      setHeroSlides((prev) =>
                        prev.map((s, i) => (i === idx ? { ...s, eyebrow: val } : s))
                      );
                    }}
                    className="w-full bg-white border border-[#E4DFD5] p-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Serif Headline</label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setHeroSlides((prev) =>
                        prev.map((s, i) => (i === idx ? { ...s, title: val } : s))
                      );
                    }}
                    className="w-full bg-white border border-[#E4DFD5] p-2 text-xs focus:outline-none font-serif"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Primary CTA Label</label>
                  <input
                    type="text"
                    value={slide.cta_primary}
                    onChange={(e) => {
                      const val = e.target.value;
                      setHeroSlides((prev) =>
                        prev.map((s, i) => (i === idx ? { ...s, cta_primary: val } : s))
                      );
                    }}
                    className="w-full bg-white border border-[#E4DFD5] p-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Primary CTA Destination</label>
                  <input
                    type="text"
                    value={slide.cta_primary_link}
                    onChange={(e) => {
                      const val = e.target.value;
                      setHeroSlides((prev) =>
                        prev.map((s, i) => (i === idx ? { ...s, cta_primary_link: val } : s))
                      );
                    }}
                    className="w-full bg-white border border-[#E4DFD5] p-2 text-xs font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcement Bar Messages */}
      <div className="bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="font-heading text-xl text-[#111111] pb-2 border-b border-[#E4DFD5]">
          Rotating Announcement Bar Messages
        </h3>

        <div className="divide-y divide-[#E4DFD5] text-xs">
          {announcements.map((msg, i) => (
            <div key={i} className="py-2.5 flex items-center justify-between">
              <span className="text-[#111111]">{msg}</span>
              <button
                type="button"
                onClick={() => handleRemoveAnnouncement(i)}
                className="text-red-600 hover:underline text-[11px] uppercase"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddAnnouncement} className="flex gap-2 pt-2">
          <input
            type="text"
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
            placeholder="Add rotating notice (e.g. Complimentary tailoring this weekend in Mumbai atelier)..."
            className="flex-1 bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
          />
          <Button type="submit" size="sm" className="text-xs uppercase tracking-wider">
            Add Message
          </Button>
        </form>
      </div>
    </div>
  );
}
