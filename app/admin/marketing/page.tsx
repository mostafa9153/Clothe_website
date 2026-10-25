"use client";

import * as React from "react";
import { Download, Mail, MessageSquare, Calendar, ShoppingCart, Check } from "lucide-react";
import { MOCK_ABANDONED_CARTS, MOCK_NEWSLETTER_SUBSCRIBERS } from "@/lib/data/mock-db";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminMarketingPage() {
  const [activeTab, setActiveTab] = React.useState<"subscribers" | "abandoned" | "consultations" | "inbox">("abandoned");

  const subscribers = Array.from(MOCK_NEWSLETTER_SUBSCRIBERS);
  const abandoned = MOCK_ABANDONED_CARTS;

  const [inboxMessages, setInboxMessages] = React.useState([
    {
      id: "msg-01",
      name: "Devika Rao",
      email: "devika@rao.com",
      phone: "+91 98200 44556",
      subject: "Bespoke Silk Gown Sizing Inquiry",
      message: "I am inquiring whether the Mulberry Silk Bias Slip Dress can be customized in length for an upcoming state gala.",
      date: "25 Feb 2026",
      handled: false,
    },
    {
      id: "msg-02",
      name: "Vikram Singhania",
      email: "vikram@singhania.com",
      phone: "+91 98111 22334",
      subject: "Private Groom Wardrobe Appointment",
      message: "Requesting private consultation in South Mumbai atelier for winter wedding collection.",
      date: "24 Feb 2026",
      handled: true,
    },
  ]);

  const [consultations, setConsultations] = React.useState([
    {
      id: "cons-01",
      name: "Tanya Kapoor",
      email: "tanya@kapoor.com",
      phone: "+91 99000 11223",
      preferred_date: "02 Mar 2026",
      preferred_time: "15:00 - 16:30",
      notes: "Looking for complete cashmere winter capsule.",
      status: "confirmed",
    },
    {
      id: "cons-02",
      name: "Aditya Roy",
      email: "aditya@roy.com",
      phone: "+91 98765 11223",
      preferred_date: "05 Mar 2026",
      preferred_time: "11:00 - 12:30",
      notes: "Italian wool tailoring consultation.",
      status: "requested",
    },
  ]);

  const handleExportSubscribers = () => {
    const csv = "Email Address\n" + subscribers.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `maison-aure-subscribers-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Newsletter subscribers exported to CSV.");
  };

  const handleToggleHandled = (id: string) => {
    setInboxMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, handled: !m.handled } : m))
    );
    toast.success("Message status updated.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block mb-1">
            Audience & Retention
          </span>
          <h1 className="font-heading text-3xl font-normal text-[#111111]">
            Marketing Leads & Inquiries
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-white border border-[#E4DFD5] p-1 text-xs">
          <button
            onClick={() => setActiveTab("abandoned")}
            className={`px-3 py-1.5 uppercase tracking-wider text-[11px] transition-colors ${
              activeTab === "abandoned" ? "bg-[#111111] text-white font-medium" : "text-[#8A857C] hover:text-[#111111]"
            }`}
          >
            Abandoned Bags ({abandoned.length})
          </button>
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`px-3 py-1.5 uppercase tracking-wider text-[11px] transition-colors ${
              activeTab === "subscribers" ? "bg-[#111111] text-white font-medium" : "text-[#8A857C] hover:text-[#111111]"
            }`}
          >
            Subscribers ({subscribers.length})
          </button>
          <button
            onClick={() => setActiveTab("inbox")}
            className={`px-3 py-1.5 uppercase tracking-wider text-[11px] transition-colors ${
              activeTab === "inbox" ? "bg-[#111111] text-white font-medium" : "text-[#8A857C] hover:text-[#111111]"
            }`}
          >
            Contact Inbox ({inboxMessages.length})
          </button>
          <button
            onClick={() => setActiveTab("consultations")}
            className={`px-3 py-1.5 uppercase tracking-wider text-[11px] transition-colors ${
              activeTab === "consultations" ? "bg-[#111111] text-white font-medium" : "text-[#8A857C] hover:text-[#111111]"
            }`}
          >
            Consultations ({consultations.length})
          </button>
        </div>
      </div>

      {/* ABANDONED CARTS */}
      {activeTab === "abandoned" && (
        <div className="bg-white border border-[#E4DFD5] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E4DFD5] flex justify-between items-center text-xs">
            <span className="font-medium text-[#111111]">
              Recent Abandoned Carts Snapshot Data
            </span>
            <span className="text-[#8A857C]">Ready for automated email dispatches</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#111111] bg-[#F7F4EE]/60 text-[10px] uppercase tracking-[0.15em] text-[#8A857C]">
                  <th className="p-4 font-medium">Session ID</th>
                  <th className="p-4 font-medium">Patron Email</th>
                  <th className="p-4 font-medium">Pieces Left in Bag</th>
                  <th className="p-4 font-medium">Bag Value (₹)</th>
                  <th className="p-4 font-medium">Recorded At</th>
                  <th className="p-4 font-medium text-right">Recovery Trigger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DFD5]">
                {abandoned.map((ac) => (
                  <tr key={ac.id} className="hover:bg-[#F7F4EE]/40 transition-colors">
                    <td className="p-4 font-mono font-medium text-[#111111]">{ac.session_id}</td>
                    <td className="p-4 text-[#111111]">{ac.email || "Anonymous Guest"}</td>
                    <td className="p-4 text-[#8A857C]">
                      {ac.items.map((i) => `${i.name} (${i.size})`).join(", ")}
                    </td>
                    <td className="p-4 font-mono font-medium text-[#111111] tabular-nums">
                      {formatPrice(ac.subtotal)}
                    </td>
                    <td className="p-4 text-[#8A857C]">
                      {new Date(ac.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toast.success(`Simulated recovery courtesy email dispatched to ${ac.email || "patron"}`)}
                        className="text-[10px] uppercase tracking-wider p-1.5 h-auto"
                      >
                        Send Recovery Dispatch
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBSCRIBERS */}
      {activeTab === "subscribers" && (
        <div className="bg-white border border-[#E4DFD5] shadow-xs p-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-[#E4DFD5]">
            <h3 className="font-heading text-xl text-[#111111]">
              Newsletter Subscribers ({subscribers.length})
            </h3>
            <Button size="sm" variant="outline" onClick={handleExportSubscribers} className="text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </Button>
          </div>

          <div className="divide-y divide-[#E4DFD5] text-xs">
            {subscribers.map((email, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-[#111111]">{email}</span>
                <span className="text-[10px] uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 border border-green-200">
                  Subscribed • WELCOME10 Granted
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTACT INBOX */}
      {activeTab === "inbox" && (
        <div className="bg-white border border-[#E4DFD5] shadow-xs overflow-hidden">
          <div className="divide-y divide-[#E4DFD5]">
            {inboxMessages.map((msg) => (
              <div key={msg.id} className="p-6 space-y-2 hover:bg-[#F7F4EE]/30 transition-colors text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm text-[#111111]">{msg.subject}</h4>
                    <p className="text-[#8A857C] text-[11px] mt-0.5">
                      From: <strong>{msg.name}</strong> ({msg.email}) • Tel: {msg.phone} • {msg.date}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleHandled(msg.id)}
                    className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium border ${
                      msg.handled
                        ? "bg-green-50 text-green-800 border-green-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {msg.handled ? "Handled" : "Mark as Handled"}
                  </button>
                </div>
                <p className="text-[#444444] pt-1 leading-relaxed bg-[#F7F4EE]/50 p-3 border border-[#E4DFD5]">
                  &ldquo;{msg.message}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONSULTATIONS */}
      {activeTab === "consultations" && (
        <div className="bg-white border border-[#E4DFD5] shadow-xs p-6 space-y-4">
          <h3 className="font-heading text-xl text-[#111111] pb-2 border-b border-[#E4DFD5]">
            Private Styling Consultations ({consultations.length})
          </h3>
          <div className="divide-y divide-[#E4DFD5] text-xs">
            {consultations.map((c) => (
              <div key={c.id} className="py-4 space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-sm text-[#111111]">{c.name}</h4>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 text-[10px] uppercase tracking-wider">
                    {c.status}
                  </span>
                </div>
                <p className="text-[#8A857C]">
                  Appointment Date: <strong>{c.preferred_date}</strong> at <strong>{c.preferred_time}</strong>
                </p>
                <p className="text-[#8A857C]">Contact: {c.email} • {c.phone}</p>
                {c.notes && <p className="italic text-[#8A857C]">&ldquo;{c.notes}&rdquo;</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
