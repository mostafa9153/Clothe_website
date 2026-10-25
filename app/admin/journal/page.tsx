"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { MOCK_JOURNAL_POSTS } from "@/lib/data/mock-db";
import { JournalPost } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminJournalPage() {
  const [posts, setPosts] = React.useState<JournalPost[]>(MOCK_JOURNAL_POSTS);

  // New Post Form
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [body, setBody] = React.useState("");
  const [coverImage, setCoverImage] = React.useState("https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newPost: JournalPost = {
      id: `post-${Date.now()}`,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      excerpt,
      body,
      cover_image: coverImage,
      published_at: new Date().toISOString(),
      is_published: true,
      created_at: new Date().toISOString(),
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setBody("");
    toast.success(`Journal dispatch "${newPost.title}" published.`);
  };

  const handleTogglePublish = (id: string, current: boolean) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_published: !current } : p))
    );
    toast.success("Publication status toggled.");
  };

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Article deleted.");
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-6 border-b border-[#E4DFD5]">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block mb-1">
          Editorial Chronicle
        </span>
        <h1 className="font-heading text-3xl font-normal text-[#111111]">
          Atelier Journal & Essays ({posts.length})
        </h1>
      </div>

      {/* Create New Post Form */}
      <div className="bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="font-heading text-xl text-[#111111] pb-2 border-b border-[#E4DFD5]">
          Publish New Editorial Dispatch
        </h3>

        <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Article Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                }}
                required
                placeholder="e.g. The Weave of Mongolian Cashmere"
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs font-serif focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Slug *</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Cover Image URL</label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Excerpt Summary</label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Article Content (Markdown)</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs focus:outline-none leading-relaxed"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" size="sm" className="text-xs uppercase tracking-wider py-2.5 px-6">
              Publish Dispatch
            </Button>
          </div>
        </form>
      </div>

      {/* Posts Table */}
      <div className="bg-white border border-[#E4DFD5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#111111] bg-[#F7F4EE]/60 text-[10px] uppercase tracking-[0.15em] text-[#8A857C]">
                <th className="p-4 font-medium">Article</th>
                <th className="p-4 font-medium">Slug</th>
                <th className="p-4 font-medium">Published Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DFD5]">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#F7F4EE]/40 transition-colors">
                  <td className="p-4">
                    <p className="font-serif font-medium text-sm text-[#111111]">{post.title}</p>
                    <p className="text-[11px] text-[#8A857C] line-clamp-1">{post.excerpt}</p>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-[#8A857C]">/journal/{post.slug}</td>
                  <td className="p-4 text-[#8A857C]">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "Draft"}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleTogglePublish(post.id, post.is_published)}
                      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border ${
                        post.is_published
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-stone-100 text-stone-600 border-stone-200"
                      }`}
                    >
                      {post.is_published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/journal/${post.slug}`}
                        target="_blank"
                        className="text-[#8A857C] hover:text-[#111111] p-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
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
