"use client";

import * as React from "react";
import Link from "next/link";
import { Download, Search, Mail, Phone, ShoppingBag, ShieldCheck } from "lucide-react";
import { MOCK_USERS, MOCK_ORDERS } from "@/lib/data/mock-db";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminCustomersPage() {
  const [search, setSearch] = React.useState("");

  // Aggregate customer data with lifetime value and order count
  const customerList = [
    {
      id: "cust-01",
      name: "Alisha Singhania",
      email: "customer@demo.com",
      phone: "+91 98765 43210",
      tier: "Private Circle Patron",
      ordersCount: 6,
      lifetimeValue: 184500,
      joinedDate: "15 Jan 2026",
    },
    {
      id: "cust-02",
      name: "Rohan Mehta",
      email: "rohan.mehta@outlook.com",
      phone: "+91 98200 11223",
      tier: "Select Patron",
      ordersCount: 2,
      lifetimeValue: 38500,
      joinedDate: "10 Feb 2026",
    },
    {
      id: "cust-03",
      name: "Tanya Sharma",
      email: "tanya.sharma@gmail.com",
      phone: "+91 98711 33445",
      tier: "Select Patron",
      ordersCount: 3,
      lifetimeValue: 56000,
      joinedDate: "18 Feb 2026",
    },
    {
      id: "cust-04",
      name: "Vikram Malhotra",
      email: "vikram.malhotra@yahoo.com",
      phone: "+91 99001 12244",
      tier: "Private Circle Patron",
      ordersCount: 4,
      lifetimeValue: 122000,
      joinedDate: "02 Feb 2026",
    },
  ];

  const filtered = customerList.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const handleExportCSV = () => {
    const headers = "Customer Name,Email,Phone,Tier,Total Orders,Lifetime Value (INR),Joined Date\n";
    const rows = customerList
      .map((c) => `"${c.name}","${c.email}","${c.phone}","${c.tier}",${c.ordersCount},${c.lifetimeValue},"${c.joinedDate}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `maison-aure-patrons-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Patron registry exported to CSV.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block mb-1">
            Clientele Dossiers
          </span>
          <h1 className="font-heading text-3xl font-normal text-[#111111]">
            Patron Circle Registry ({customerList.length})
          </h1>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          className="text-xs uppercase tracking-wider flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Patrons CSV</span>
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white border border-[#E4DFD5] p-4 text-xs shadow-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patron by name, email, or telephone..."
            className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2 pl-8 text-xs text-[#111111] focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-[#8A857C] absolute left-2.5 top-3 stroke-[1.25]" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E4DFD5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#111111] bg-[#F7F4EE]/60 text-[10px] uppercase tracking-[0.15em] text-[#8A857C]">
                <th className="p-4 font-medium">Patron Name</th>
                <th className="p-4 font-medium">Contact Dossier</th>
                <th className="p-4 font-medium">Patron Tier</th>
                <th className="p-4 font-medium">Registered Orders</th>
                <th className="p-4 font-medium">Lifetime Spend (LTV)</th>
                <th className="p-4 font-medium">Registry Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DFD5]">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#F7F4EE]/40 transition-colors">
                  <td className="p-4 font-medium text-[#111111]">{c.name}</td>
                  <td className="p-4 text-[#8A857C]">
                    <p>{c.email}</p>
                    <p className="text-[11px]">{c.phone}</p>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-[#F7F4EE] text-[#B08D57] border border-[#E4DFD5] text-[10px] uppercase tracking-wider font-medium">
                      {c.tier}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-medium text-[#111111]">
                    {c.ordersCount} commissions
                  </td>
                  <td className="p-4 font-mono font-medium text-[#111111] tabular-nums">
                    {formatPrice(c.lifetimeValue)}
                  </td>
                  <td className="p-4 text-[#8A857C]">{c.joinedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
