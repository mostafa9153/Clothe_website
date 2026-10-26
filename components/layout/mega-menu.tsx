"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Category, Collection } from "@/types/database.types";
import { ArrowRight } from "lucide-react";

interface MegaMenuProps {
  categories: Category[];
  collections: Collection[];
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ categories, collections, isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#E4DFD5] shadow-lg transition-all duration-300 z-40 py-10"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
        {/* Category Columns */}
        <div className="col-span-3 space-y-4">
          <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#8A857C]">
            Burkha & Modest Wear
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                href="/category/burkha"
                onClick={onClose}
                className="text-[#111111] hover:text-[#B08D57] transition-colors"
              >
                Burkha & Abaya
              </Link>
            </li>
            <li>
              <Link
                href="/category/abaya"
                onClick={onClose}
                className="text-[#111111] hover:text-[#B08D57] transition-colors"
              >
                Abaya & Jilbab
              </Link>
            </li>
            <li>
              <Link
                href="/category/prayer-wear"
                onClick={onClose}
                className="text-[#111111] hover:text-[#B08D57] transition-colors"
              >
                Prayer Wear & Khimar
              </Link>
            </li>
            <li>
              <Link
                href="/category/sets-combos"
                onClick={onClose}
                className="text-[#111111] hover:text-[#B08D57] transition-colors"
              >
                Modest Sets & Combos
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-3 space-y-4">
          <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#8A857C]">
            Hijab, Niqab & Panjabi
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                href="/category/hijab"
                onClick={onClose}
                className="text-[#111111] hover:text-[#B08D57] transition-colors"
              >
                Hijab & Stoles
              </Link>
            </li>
            <li>
              <Link
                href="/category/niqab"
                onClick={onClose}
                className="text-[#111111] hover:text-[#B08D57] transition-colors"
              >
                Niqab & Veils
              </Link>
            </li>
            <li>
              <Link
                href="/category/panjabi"
                onClick={onClose}
                className="text-[#111111] hover:text-[#B08D57] transition-colors"
              >
                Men&apos;s Panjabi & Jubba
              </Link>
            </li>
            <li>
              <Link
                href="/category/accessories"
                onClick={onClose}
                className="text-[#111111] hover:text-[#B08D57] transition-colors"
              >
                Modest Accessories & Caps
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-[#B08D57] font-medium pt-2 group"
              >
                <span>View Complete Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Curated Collections */}
        <div className="col-span-3 space-y-4 border-l border-[#E4DFD5]/60 pl-8">
          <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#8A857C]">
            Curated Collections
          </p>
          <ul className="space-y-3 text-sm">
            {collections.map((col) => (
              <li key={col.id}>
                <Link
                  href={`/collections/${col.slug}`}
                  onClick={onClose}
                  className="group block"
                >
                  <span className="text-[#111111] group-hover:text-[#B08D57] font-medium transition-colors block">
                    {col.name}
                  </span>
                  <span className="text-xs text-[#8A857C] line-clamp-1">
                    {col.is_drop ? "Strictly Limited Edition" : col.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual Editorial Teaser */}
        <div className="col-span-3 relative h-60 overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80"
            alt="The Royal Eid Collection"
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#E8D8C8]">
              Featured Atelier
            </span>
            <h4 className="font-heading text-lg font-normal">The Royal Eid Collection</h4>
            <Link
              href="/collections/eid-collection"
              onClick={onClose}
              className="text-xs tracking-wider uppercase underline underline-offset-4 mt-2 text-white/90 hover:text-white"
            >
              Discover The Drop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
