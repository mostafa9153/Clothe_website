"use client";

import * as React from "react";
import Link from "next/link";
import { Check, X, Clock, RotateCcw, AlertCircle, FileText } from "lucide-react";
import { MOCK_RETURNS, updateMockReturnStatus } from "@/lib/data/mock-db";
import { ReturnRequest } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminReturnsPage() {
  const [returns, setReturns] = React.useState<ReturnRequest[]>(MOCK_RETURNS);

  const handleUpdateStatus = (id: string, newStatus: "approved" | "rejected" | "completed") => {
    try {
      const updated = updateMockReturnStatus(id, newStatus);
      setReturns((prev) => prev.map((r) => (r.id === id ? updated : r)));
      toast.success(`Return request ${id} updated to ${newStatus}.`);
    } catch {
      toast.error("Failed to update return request.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block mb-1">
            Client Care & Exchanges
          </span>
          <h1 className="font-heading text-3xl font-normal text-[#111111]">
            Return & Exchange Dossiers ({returns.length})
          </h1>
        </div>
      </div>

      <div className="bg-white border border-[#E4DFD5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#111111] bg-[#F7F4EE]/60 text-[10px] uppercase tracking-[0.15em] text-[#8A857C]">
                <th className="p-4 font-medium">Return ID</th>
                <th className="p-4 font-medium">Commission Reference</th>
                <th className="p-4 font-medium">Patron</th>
                <th className="p-4 font-medium">Reason Stated</th>
                <th className="p-4 font-medium">Client Notes</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Moderation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DFD5]">
              {returns.map((ret) => (
                <tr key={ret.id} className="hover:bg-[#F7F4EE]/40 transition-colors">
                  <td className="p-4 font-mono font-medium text-[#111111]">{ret.id}</td>
                  <td className="p-4 font-mono text-[#B08D57]">
                    <Link href={`/admin/orders/${ret.order_id}`} className="hover:underline">
                      {ret.order_number || ret.order_id}
                    </Link>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-[#111111]">{ret.customer_name}</p>
                    <p className="text-[11px] text-[#8A857C]">{ret.customer_email}</p>
                  </td>
                  <td className="p-4 font-mono uppercase text-[11px] text-[#111111]">
                    {ret.reason.replace(/_/g, " ")}
                  </td>
                  <td className="p-4 text-[#8A857C] max-w-xs truncate" title={ret.notes}>
                    {ret.notes || "No notes provided"}
                  </td>
                  <td className="p-4 text-[#8A857C]">
                    {new Date(ret.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium border ${
                      ret.status === "approved"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                        : ret.status === "rejected"
                        ? "bg-red-50 text-red-800 border-red-300"
                        : "bg-amber-50 text-amber-800 border-amber-300"
                    }`}>
                      {ret.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {ret.status === "requested" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(ret.id, "approved")}
                            className="text-[10px] uppercase tracking-wider p-1.5 h-auto bg-emerald-800 hover:bg-emerald-900"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(ret.id, "rejected")}
                            className="text-[10px] uppercase tracking-wider p-1.5 h-auto text-red-700"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {ret.status === "approved" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleUpdateStatus(ret.id, "completed")}
                          className="text-[10px] uppercase tracking-wider p-1.5 h-auto"
                        >
                          Mark Restocked / Closed
                        </Button>
                      )}
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
