"use client";

import * as React from "react";
import { MOCK_ACTIVITY_LOGS } from "@/lib/data/mock-db";
import { ActivityLog } from "@/types/database.types";
import { Input } from "@/components/ui/input";
import {
  Search,
  History,
  ShieldCheck,
  Package,
  RotateCcw,
  Tag,
  Settings,
  ShoppingBag,
} from "lucide-react";

export default function AdminActivityPage() {
  const [logs] = React.useState<ActivityLog[]>(MOCK_ACTIVITY_LOGS);
  const [search, setSearch] = React.useState("");
  const [actionFilter, setActionFilter] = React.useState<string>("all");

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.actor.toLowerCase().includes(search.toLowerCase());

    const matchesAction =
      actionFilter === "all" ||
      log.action.toLowerCase().includes(actionFilter.toLowerCase());

    return matchesSearch && matchesAction;
  });

  const getActionIcon = (action: string) => {
    const act = action.toLowerCase();
    if (act.includes("order")) return <ShoppingBag className="w-4 h-4 text-[#B08D57]" />;
    if (act.includes("product") || act.includes("inventory"))
      return <Package className="w-4 h-4 text-emerald-700" />;
    if (act.includes("return")) return <RotateCcw className="w-4 h-4 text-amber-700" />;
    if (act.includes("coupon")) return <Tag className="w-4 h-4 text-purple-700" />;
    if (act.includes("setting")) return <Settings className="w-4 h-4 text-blue-700" />;
    return <ShieldCheck className="w-4 h-4 text-[#8A857C]" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block mb-1">
            Audit & Compliance
          </span>
          <h1 className="font-heading text-3xl font-normal text-[#111111]">
            Administrative Activity Log ({filteredLogs.length})
          </h1>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E4DFD5] p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A857C]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail by actor, order ID, product, or keyword..."
            className="pl-9 text-xs rounded-none border-[#E4DFD5] bg-[#F7F4EE]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-[11px] uppercase tracking-[0.18em] text-[#8A857C] whitespace-nowrap">
            Filter:
          </span>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="bg-[#F7F4EE] border border-[#E4DFD5] text-xs p-2 focus:outline-none w-full sm:w-auto"
          >
            <option value="all">All Events</option>
            <option value="order">Orders & Dispatch</option>
            <option value="product">Products & Catalog</option>
            <option value="inventory">Inventory Restocks</option>
            <option value="return">Returns Moderation</option>
            <option value="coupon">Coupons & Privileges</option>
            <option value="setting">Store Settings</option>
          </select>
        </div>
      </div>

      {/* Activity Timeline Table */}
      <div className="bg-white border border-[#E4DFD5]">
        {filteredLogs.length === 0 ? (
          <div className="p-12 text-center">
            <History className="w-8 h-8 text-[#8A857C] mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium text-[#111111]">
              No audit log entries match your criteria
            </p>
            <p className="text-xs text-[#8A857C] mt-1">
              Try adjusting your query or filter parameters.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#E4DFD5]">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F7F4EE]/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F7F4EE] border border-[#E4DFD5] flex items-center justify-center shrink-0 mt-0.5">
                    {getActionIcon(log.action)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium text-[#111111]">
                        {log.action}
                      </span>
                      <span className="text-[10px] text-[#8A857C] uppercase tracking-wider px-2 py-0.5 bg-[#F7F4EE] border border-[#E4DFD5]">
                        {log.actor}
                      </span>
                    </div>
                    <p className="text-xs text-[#8A857C] mt-1">{log.details}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[11px] font-mono text-[#8A857C]">
                    {new Date(log.created_at).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
