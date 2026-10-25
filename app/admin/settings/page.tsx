"use client";

import * as React from "react";
import {
  MOCK_SITE_SETTINGS,
  updateMockSiteSettings,
  SiteSettings,
} from "@/lib/data/mock-db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Building2,
  Truck,
  IndianRupee,
  Gift,
  RotateCcw,
  ShieldAlert,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = React.useState<SiteSettings>({
    ...MOCK_SITE_SETTINGS,
  });
  const [pincodesInput, setPincodesInput] = React.useState(
    settings.serviceable_prefixes.join(", ")
  );
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Parse pincodes
      const prefixes = pincodesInput
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      const updated = updateMockSiteSettings({
        store_name: settings.store_name,
        tagline: settings.tagline,
        contact_email: settings.contact_email,
        contact_phone: settings.contact_phone,
        whatsapp_number: settings.whatsapp_number,
        free_shipping_threshold: Number(settings.free_shipping_threshold),
        flat_shipping_rate: Number(settings.flat_shipping_rate),
        cod_enabled: settings.cod_enabled,
        cod_fee: Number(settings.cod_fee),
        cod_max_limit: Number(settings.cod_max_limit),
        return_window_days: Number(settings.return_window_days),
        gift_wrap_fee: Number(settings.gift_wrap_fee),
        maintenance_mode: settings.maintenance_mode,
        serviceable_prefixes: prefixes,
      });

      setSettings({ ...updated });
      toast.success("Maison store parameters updated successfully.");
    } catch {
      toast.error("Failed to update store parameters.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block mb-1">
            Maison Configuration
          </span>
          <h1 className="font-heading text-3xl font-normal text-[#111111]">
            Store & Commerce Parameters
          </h1>
        </div>

        <Button
          type="submit"
          disabled={isSaving}
          className="bg-[#111111] hover:bg-[#B08D57] text-[#FFFFFF] text-xs uppercase tracking-[0.18em] px-6 py-2.5 rounded-none flex items-center gap-2"
        >
          {isSaving ? (
            "Saving..."
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              Save Configuration
            </>
          )}
        </Button>
      </div>

      {/* Brand & Concierge */}
      <div className="bg-white border border-[#E4DFD5] p-6 space-y-6">
        <div className="flex items-center gap-2.5 border-b border-[#E4DFD5] pb-3">
          <Building2 className="w-4 h-4 text-[#B08D57]" />
          <h2 className="font-heading text-lg font-normal text-[#111111]">
            Store Identity & Concierge
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-[0.18em] text-[#8A857C]">
              Storefront Name
            </Label>
            <Input
              value={settings.store_name}
              onChange={(e) =>
                setSettings({ ...settings, store_name: e.target.value })
              }
              className="rounded-none border-[#E4DFD5] bg-[#F7F4EE] text-xs"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-[0.18em] text-[#8A857C]">
              Maison Tagline
            </Label>
            <Input
              value={settings.tagline}
              onChange={(e) =>
                setSettings({ ...settings, tagline: e.target.value })
              }
              className="rounded-none border-[#E4DFD5] bg-[#F7F4EE] text-xs"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-[0.18em] text-[#8A857C]">
              Concierge Email
            </Label>
            <Input
              type="email"
              value={settings.contact_email}
              onChange={(e) =>
                setSettings({ ...settings, contact_email: e.target.value })
              }
              className="rounded-none border-[#E4DFD5] bg-[#F7F4EE] text-xs"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-[0.18em] text-[#8A857C]">
              Concierge Telephone
            </Label>
            <Input
              value={settings.contact_phone}
              onChange={(e) =>
                setSettings({ ...settings, contact_phone: e.target.value })
              }
              className="rounded-none border-[#E4DFD5] bg-[#F7F4EE] text-xs"
              required
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-[11px] uppercase tracking-[0.18em] text-[#8A857C]">
              WhatsApp Direct Stylist Number
            </Label>
            <Input
              value={settings.whatsapp_number}
              onChange={(e) =>
                setSettings({ ...settings, whatsapp_number: e.target.value })
              }
              className="rounded-none border-[#E4DFD5] bg-[#F7F4EE] text-xs"
              placeholder="+91..."
            />
          </div>
        </div>
      </div>

      {/* Logistics & Shipping */}
      <div className="bg-white border border-[#E4DFD5] p-6 space-y-6">
        <div className="flex items-center gap-2.5 border-b border-[#E4DFD5] pb-3">
          <Truck className="w-4 h-4 text-[#B08D57]" />
          <h2 className="font-heading text-lg font-normal text-[#111111]">
            Shipping & Fulfilment Rules
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-[0.18em] text-[#8A857C]">
              Free Insured Delivery Threshold (₹)
            </Label>
            <Input
              type="number"
              value={settings.free_shipping_threshold}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  free_shipping_threshold: Number(e.target.value),
                })
              }
              className="rounded-none border-[#E4DFD5] bg-[#F7F4EE] text-xs font-mono"
              required
            />
            <p className="text-[10px] text-[#8A857C]">
              Orders at or above this value qualify for complimentary courier delivery.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-[0.18em] text-[#8A857C]">
              Standard Courier Rate (₹)
            </Label>
            <Input
              type="number"
              value={settings.flat_shipping_rate}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  flat_shipping_rate: Number(e.target.value),
                })
              }
              className="rounded-none border-[#E4DFD5] bg-[#F7F4EE] text-xs font-mono"
              required
            />
            <p className="text-[10px] text-[#8A857C]">
              Charged on commissions below the complimentary threshold.
            </p>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-[11px] uppercase tracking-[0.18em] text-[#8A857C]">
              Serviceable Pincode Prefix Whitelist
            </Label>
            <Input
              value={pincodesInput}
              onChange={(e) => setPincodesInput(e.target.value)}
              className="rounded-none border-[#E4DFD5] bg-[#F7F4EE] text-xs font-mono"
              placeholder="11, 40, 56, 60, 50, 70, 38, 30..."
            />
            <p className="text-[10px] text-[#8A857C]">
              Comma-separated 2-digit Indian postal zone prefixes currently served by our high-value courier partners.
            </p>
          </div>
        </div>
      </div>

      {/* Cash on Delivery & Packaging */}
      <div className="bg-white border border-[#E4DFD5] p-6 space-y-6">
        <div className="flex items-center gap-2.5 border-b border-[#E4DFD5] pb-3">
          <IndianRupee className="w-4 h-4 text-[#B08D57]" />
          <h2 className="font-heading text-lg font-normal text-[#111111]">
            Cash on Delivery (COD) & Packaging Fees
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-3 flex items-center justify-between p-3 bg-[#F7F4EE] border border-[#E4DFD5]">
            <div>
              <p className="text-xs font-medium text-[#111111]">
                Enable Cash on Delivery at Checkout
              </p>
              <p className="text-[11px] text-[#8A857C]">
                Allow patrons to settle upon physical receipt of garments.
              </p>
            </div>
            <Switch
              checked={settings.cod_enabled}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, cod_enabled: checked })
              }
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-[0.18em] text-[#8A857C]">
              COD Handling Fee (₹)
            </Label>
            <Input
              type="number"
              value={settings.cod_fee}
              onChange={(e) =>
                setSettings({ ...settings, cod_fee: Number(e.target.value) })
              }
              className="rounded-none border-[#E4DFD5] bg-[#F7F4EE] text-xs font-mono"
              disabled={!settings.cod_enabled}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-[0.18em] text-[#8A857C]">
              Maximum COD Order Ceiling (₹)
            </Label>
            <Input
              type="number"
              value={settings.cod_max_limit}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  cod_max_limit: Number(e.target.value),
                })
              }
              className="rounded-none border-[#E4DFD5] bg-[#F7F4EE] text-xs font-mono"
              disabled={!settings.cod_enabled}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-[0.18em] text-[#8A857C]">
              Gift Presentation Fee (₹)
            </Label>
            <Input
              type="number"
              value={settings.gift_wrap_fee}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  gift_wrap_fee: Number(e.target.value),
                })
              }
              className="rounded-none border-[#E4DFD5] bg-[#F7F4EE] text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Return Window & Maintenance */}
      <div className="bg-white border border-[#E4DFD5] p-6 space-y-6">
        <div className="flex items-center gap-2.5 border-b border-[#E4DFD5] pb-3">
          <RotateCcw className="w-4 h-4 text-[#B08D57]" />
          <h2 className="font-heading text-lg font-normal text-[#111111]">
            Policy & Security Settings
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-[0.18em] text-[#8A857C]">
              Return Request Window (Days)
            </Label>
            <Input
              type="number"
              value={settings.return_window_days}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  return_window_days: Number(e.target.value),
                })
              }
              className="rounded-none border-[#E4DFD5] bg-[#F7F4EE] text-xs font-mono"
            />
            <p className="text-[10px] text-[#8A857C]">
              Number of days after delivery during which a patron may submit a return request.
            </p>
          </div>

          <div className="space-y-1.5 flex flex-col justify-end">
            <div className="flex items-center justify-between p-3 bg-[#F7F4EE] border border-[#E4DFD5]">
              <div>
                <p className="text-xs font-medium text-[#111111] flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                  Maintenance Mode
                </p>
                <p className="text-[11px] text-[#8A857C]">
                  Temporarily lock storefront checkout for private private previews.
                </p>
              </div>
              <Switch
                checked={settings.maintenance_mode}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, maintenance_mode: checked })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
