import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24 bg-[#F7F4EE]">
      <div className="max-w-md space-y-5">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C]">
          Atelier Archive Notice
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl text-[#111111] font-normal">
          Page Not Found
        </h1>
        <p className="text-sm text-[#8A857C] leading-relaxed">
          The creation or archival page you are seeking is either no longer cataloged or has been relocated to another collection.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="w-full sm:w-auto px-8">
            <Link href="/">Return to Atelier</Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto px-8">
            <Link href="/shop">Explore All Pieces</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
