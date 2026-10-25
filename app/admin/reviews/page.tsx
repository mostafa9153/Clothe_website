"use client";

import * as React from "react";
import Image from "next/image";
import { Star, Check, X, Trash2, Filter } from "lucide-react";
import { MOCK_REVIEWS, moderateMockReview, MOCK_PRODUCTS } from "@/lib/data/mock-db";
import { Review } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = React.useState<Review[]>(MOCK_REVIEWS);
  const [ratingFilter, setRatingFilter] = React.useState<number | "all">("all");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "approved" | "pending">("all");

  const filtered = reviews.filter((r) => {
    const matchesRating = ratingFilter === "all" || r.rating === ratingFilter;
    const matchesStatus =
      statusFilter === "all" || (statusFilter === "approved" ? r.is_approved : !r.is_approved);
    return matchesRating && matchesStatus;
  });

  const handleAction = (id: string, action: "approve" | "reject" | "delete") => {
    try {
      moderateMockReview(id, action);
      if (action === "delete") {
        setReviews((prev) => prev.filter((r) => r.id !== id));
        toast.success("Review deleted.");
      } else {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, is_approved: action === "approve" } : r))
        );
        toast.success(`Review ${action === "approve" ? "approved for storefront display" : "rejected"}.`);
      }
    } catch {
      toast.error("Failed to moderate review.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block mb-1">
            Patron Feedback
          </span>
          <h1 className="font-heading text-3xl font-normal text-[#111111]">
            Review Moderation Queue ({reviews.length})
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs focus:outline-none"
          >
            <option value="all">All Reviews</option>
            <option value="pending">Pending Moderation ({reviews.filter((r) => !r.is_approved).length})</option>
            <option value="approved">Approved & Displayed</option>
          </select>

          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
            className="bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs focus:outline-none"
          >
            <option value="all">All Star Ratings</option>
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-[#E4DFD5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#111111] bg-[#F7F4EE]/60 text-[10px] uppercase tracking-[0.15em] text-[#8A857C]">
                <th className="p-4 font-medium">Patron</th>
                <th className="p-4 font-medium">Rating</th>
                <th className="p-4 font-medium">Headline & Content</th>
                <th className="p-4 font-medium">Fit Meter</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DFD5]">
              {filtered.map((rev) => (
                <tr key={rev.id} className="hover:bg-[#F7F4EE]/40 transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-[#111111]">{rev.author_name}</p>
                    <span className="text-[10px] text-[#8A857C]">
                      {new Date(rev.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex text-[#B08D57]">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </td>

                  <td className="p-4 max-w-md">
                    <p className="font-medium text-[#111111]">{rev.title}</p>
                    <p className="text-[#8A857C] text-[11px] leading-relaxed line-clamp-2">{rev.body}</p>
                    {rev.photos.length > 0 && (
                      <span className="text-[10px] text-[#B08D57] font-mono mt-1 block">
                        📸 {rev.photos.length} patron photo attached
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-[#8A857C] uppercase font-mono text-[10px]">
                    {rev.fit_feedback ? rev.fit_feedback.replace(/_/g, " ") : "Not specified"}
                  </td>

                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium border ${
                      rev.is_approved
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}>
                      {rev.is_approved ? "Approved" : "Pending"}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {!rev.is_approved ? (
                        <Button
                          size="sm"
                          onClick={() => handleAction(rev.id, "approve")}
                          className="text-[10px] uppercase tracking-wider p-1.5 h-auto bg-emerald-800 hover:bg-emerald-900"
                        >
                          Approve
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction(rev.id, "reject")}
                          className="text-[10px] uppercase tracking-wider p-1.5 h-auto"
                        >
                          Revoke
                        </Button>
                      )}
                      <button
                        onClick={() => handleAction(rev.id, "delete")}
                        className="text-[#8A857C] hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
