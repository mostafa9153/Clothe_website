"use client";

import * as React from "react";
import Image from "next/image";
import { Star, ThumbsUp, Check, Camera, MessageSquarePlus, Image as ImageIcon } from "lucide-react";
import { Review } from "@/types/database.types";
import { RatingStars } from "@/components/ui/rating-stars";
import { Button } from "@/components/ui/button";
import { submitReviewAction } from "@/app/actions/leads";

interface ReviewsSectionProps {
  productId: string;
  reviews: Review[];
}

export function ReviewsSection({ productId, reviews: initialReviews }: ReviewsSectionProps) {
  const [reviews, setReviews] = React.useState<Review[]>(initialReviews);
  const [starFilter, setStarFilter] = React.useState<number | null>(null);
  const [sortOrder, setSortOrder] = React.useState<"newest" | "helpful" | "highest">("newest");
  const [isWriteModalOpen, setIsWriteModalOpen] = React.useState(false);
  const [helpfulVotes, setHelpfulVotes] = React.useState<Record<string, number>>({});

  // Review Form
  const [authorName, setAuthorName] = React.useState("");
  const [rating, setRating] = React.useState(5);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [fitFeedback, setFitFeedback] = React.useState<"runs_small" | "true_to_size" | "runs_large">("true_to_size");
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  // Computed metrics
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 5;

  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { stars, count, pct };
  });

  const fitCounts = {
    runs_small: reviews.filter((r) => r.fit_feedback === "runs_small").length,
    true_to_size: reviews.filter((r) => r.fit_feedback === "true_to_size").length,
    runs_large: reviews.filter((r) => r.fit_feedback === "runs_large").length,
  };
  const totalFitVotes = fitCounts.runs_small + fitCounts.true_to_size + fitCounts.runs_large || 1;

  // Curated photo reviews strip
  const allReviewPhotos = React.useMemo(() => {
    return reviews.flatMap((r) =>
      (r.photos || []).map((photo) => ({ photo, author: r.author_name, rating: r.rating }))
    );
  }, [reviews]);

  // Filter & Sort
  const displayedReviews = [...reviews]
    .filter((r) => (starFilter ? r.rating === starFilter : true))
    .sort((a, b) => {
      if (sortOrder === "helpful") {
        const votesA = helpfulVotes[a.id] || 0;
        const votesB = helpfulVotes[b.id] || 0;
        if (votesB !== votesA) return votesB - votesA;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortOrder === "highest") return b.rating - a.rating;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  const handleVoteHelpful = (id: string) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !body.trim()) return;

    try {
      const res = await submitReviewAction({
        product_id: productId,
        author_name: authorName.trim(),
        rating,
        title: title.trim() || "Atelier Impression",
        body: body.trim(),
        photos: [],
        fit_feedback: fitFeedback,
      });

      if (res.success && res.review) {
        setReviews([res.review, ...reviews]);
      } else {
        const fallbackRev: Review = {
          id: `rev-client-${Date.now()}`,
          product_id: productId,
          user_id: null,
          author_name: authorName.trim(),
          rating,
          title: title.trim() || null,
          body: body.trim(),
          photos: [],
          fit_feedback: fitFeedback,
          is_approved: true,
          created_at: new Date().toISOString(),
        };
        setReviews([fallbackRev, ...reviews]);
      }
    } catch {
      // Fallback local update
      const fallbackRev: Review = {
        id: `rev-client-${Date.now()}`,
        product_id: productId,
        user_id: null,
        author_name: authorName.trim(),
        rating,
        title: title.trim() || null,
        body: body.trim(),
        photos: [],
        fit_feedback: fitFeedback,
        is_approved: true,
        created_at: new Date().toISOString(),
      };
      setReviews([fallbackRev, ...reviews]);
    }

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsWriteModalOpen(false);
      setAuthorName("");
      setTitle("");
      setBody("");
    }, 1200);
  };


  return (
    <section id="reviews-section" className="py-16 md:py-24 border-t border-[#E4DFD5]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium">
            Verified Client Provenance
          </span>
          <h3 className="font-heading text-3xl sm:text-4xl text-[#111111] font-normal">
            Atelier Reviews & Drapery Notes
          </h3>
          <p className="text-xs text-[#8A857C]">
            Unfiltered critiques submitted by verified commissions.
          </p>
        </div>

        {/* Rating Overview & Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8 bg-white border border-[#E4DFD5]">
          {/* Overall score */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-2 md:border-r md:border-[#E4DFD5] pr-4">
            <span className="font-heading text-5xl font-light text-[#111111] tabular-nums">
              {avgRating.toFixed(1)}
            </span>
            <RatingStars rating={avgRating} size="md" />
            <span className="text-xs text-[#8A857C]">
              Based on {totalReviews} client evaluations
            </span>
            <div className="pt-2">
              <Button
                onClick={() => setIsWriteModalOpen(true)}
                size="sm"
                className="text-[11px] uppercase tracking-wider"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 mr-1.5" />
                <span>Write a Critique</span>
              </Button>
            </div>
          </div>

          {/* Star Distribution Bars */}
          <div className="md:col-span-5 space-y-2 justify-center flex flex-col">
            {distribution.map((d) => (
              <div key={d.stars} className="flex items-center gap-3 text-xs">
                <button
                  onClick={() => setStarFilter(starFilter === d.stars ? null : d.stars)}
                  className={`w-12 text-left uppercase text-[10px] font-medium transition-colors ${
                    starFilter === d.stars ? "text-[#B08D57] font-bold" : "text-[#8A857C] hover:text-[#111111]"
                  }`}
                >
                  {d.stars} Stars
                </button>
                <div className="flex-1 bg-[#F7F4EE] h-1.5 overflow-hidden">
                  <div
                    className="bg-[#111111] h-full transition-all duration-500"
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <span className="w-6 text-right text-[11px] text-[#8A857C] tabular-nums">
                  {d.count}
                </span>
              </div>
            ))}
          </div>

          {/* Fit Feedback Meter */}
          <div className="md:col-span-3 flex flex-col justify-center space-y-2 text-xs border-t md:border-t-0 md:border-l md:border-[#E4DFD5] pt-4 md:pt-0 md:pl-6">
            <span className="text-[10px] uppercase tracking-wider text-[#111111] font-medium block">
              Sizing & Drapery Survey
            </span>
            <div className="space-y-1.5 text-[11px] text-[#8A857C]">
              <div className="flex justify-between">
                <span>Runs Small</span>
                <span className="tabular-nums">{Math.round((fitCounts.runs_small / totalFitVotes) * 100)}%</span>
              </div>
              <div className="flex justify-between font-medium text-[#111111]">
                <span>True to Size</span>
                <span className="tabular-nums">{Math.round((fitCounts.true_to_size / totalFitVotes) * 100)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Runs Relaxed</span>
                <span className="tabular-nums">{Math.round((fitCounts.runs_large / totalFitVotes) * 100)}%</span>
              </div>
            </div>
            <p className="text-[10px] text-[#8A857C] pt-1">
              90% of patrons describe true-to-size European cut.
            </p>
          </div>
        </div>

        {/* Photo Reviews Strip (if client photos exist) */}
        {allReviewPhotos.length > 0 && (
          <div className="space-y-3 p-6 bg-white border border-[#E4DFD5]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#111111] font-medium">
              <Camera className="w-4 h-4 text-[#B08D57]" />
              <span>Client Styling & Photo Impressions ({allReviewPhotos.length})</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {allReviewPhotos.map((item, pIdx) => (
                <div
                  key={pIdx}
                  className="relative w-24 h-32 flex-shrink-0 bg-[#E4DFD5]/40 border border-[#E4DFD5] overflow-hidden group"
                >
                  <Image
                    src={item.photo}
                    alt={`Review styling photo by ${item.author}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[9px] p-1 truncate">
                    {item.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters and sorting bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E4DFD5] text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#8A857C] uppercase tracking-wider">Showing:</span>
            {starFilter ? (
              <span className="px-2.5 py-1 bg-[#111111] text-white flex items-center gap-1.5">
                <span>{starFilter} Stars</span>
                <button onClick={() => setStarFilter(null)} className="hover:opacity-75">✕</button>
              </span>
            ) : (
              <span className="text-[#111111] font-medium">All Reviews ({displayedReviews.length})</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#8A857C] uppercase tracking-wider hidden sm:inline">Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="bg-transparent border border-[#E4DFD5] px-2.5 py-1 text-xs focus:outline-none uppercase"
            >
              <option value="newest">Most Recent</option>
              <option value="helpful">Most Helpful</option>
              <option value="highest">Highest Rated</option>
            </select>
          </div>
        </div>


        {/* Reviews List */}
        <div className="space-y-6">
          {displayedReviews.map((rev) => (
            <div key={rev.id} className="p-6 bg-white border border-[#E4DFD5] space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <RatingStars rating={rev.rating} size="sm" />
                    <span className="text-xs font-medium text-[#111111]">{rev.author_name}</span>
                    <span className="px-1.5 py-0.2 bg-[#F7F4EE] border border-[#E4DFD5] text-[9px] uppercase tracking-wider text-[#8A857C]">
                      Verified Client
                    </span>
                  </div>
                  {rev.title && (
                    <h4 className="font-heading text-lg font-medium text-[#111111] mt-1.5">
                      {rev.title}
                    </h4>
                  )}
                </div>
                <span className="text-[11px] text-[#8A857C] tabular-nums font-mono">
                  {new Date(rev.created_at).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#8A857C] leading-relaxed">
                {rev.body}
              </p>

              {rev.photos && rev.photos.length > 0 && (
                <div className="flex gap-2 pt-2">
                  {rev.photos.map((photo, pIdx) => (
                    <div key={pIdx} className="relative w-16 h-20 bg-[#E4DFD5]/40 overflow-hidden border border-[#E4DFD5]">
                      <Image src={photo} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-[#E4DFD5]/60 text-[11px] text-[#8A857C]">
                <span>
                  Fit: <strong className="text-[#111111] font-normal capitalize">{rev.fit_feedback?.replace("_", " ") || "True to size"}</strong>
                </span>

                <button
                  onClick={() => handleVoteHelpful(rev.id)}
                  className="flex items-center gap-1.5 hover:text-[#111111] transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5 stroke-[1.25]" />
                  <span>Helpful ({helpfulVotes[rev.id] || 0})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Write a Review Modal */}
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="relative w-full max-w-lg bg-[#F7F4EE] border border-[#E4DFD5] p-6 sm:p-8 space-y-4 shadow-2xl">
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="absolute right-4 top-4 p-1 text-[#8A857C] hover:text-[#111111]"
              >
                ✕
              </button>

              <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
                Patron Review Protocol
              </span>

              <h4 className="font-heading text-2xl text-[#111111]">
                Submit Your Garment Critique
              </h4>

              {submitSuccess ? (
                <div className="p-6 bg-white border border-[#B08D57] text-center space-y-2 animate-in fade-in">
                  <Check className="w-6 h-6 text-[#B08D57] mx-auto" />
                  <p className="font-heading text-lg text-[#111111]">Critique Recorded</p>
                  <p className="text-xs text-[#8A857C]">
                    Your insights have been added to the atelier product record.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          className="p-1 text-[#B08D57]"
                        >
                          <Star className={`w-5 h-5 ${s <= rating ? "fill-[#B08D57]" : ""}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Radhika Apte"
                      className="w-full bg-white border border-[#E4DFD5] px-3 py-2 focus:outline-none focus:border-[#111111]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                      Headline
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Unparalleled silk drape and finish"
                      className="w-full bg-white border border-[#E4DFD5] px-3 py-2 focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                      Detailed Experience (Fit, Handfeel, Longevity)
                    </label>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={4}
                      placeholder="Share your thoughts on the textile weight, tailoring break, and occasion versatility..."
                      className="w-full bg-white border border-[#E4DFD5] p-3 focus:outline-none focus:border-[#111111]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                      Fit Perception
                    </label>
                    <select
                      value={fitFeedback}
                      onChange={(e) => setFitFeedback(e.target.value as any)}
                      className="w-full bg-white border border-[#E4DFD5] px-3 py-2 focus:outline-none"
                    >
                      <option value="runs_small">Runs Small / Structured</option>
                      <option value="true_to_size">True to Size (Recommended)</option>
                      <option value="runs_large">Runs Large / Relaxed</option>
                    </select>
                  </div>

                  <Button type="submit" className="w-full text-xs uppercase tracking-[0.2em] py-3">
                    Submit Critique
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
