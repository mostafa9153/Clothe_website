"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import brandConfig from "@/config/brand.config";
import { bookConsultationAction } from "@/app/actions/leads";
import { Calendar, Clock, Check, Sparkles, User, Mail, Phone, MapPin, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const TIME_SLOTS = [
  "10:30 AM – 11:45 AM",
  "12:00 PM – 01:15 PM",
  "02:30 PM – 03:45 PM",
  "04:00 PM – 05:15 PM",
  "05:30 PM – 06:45 PM",
];

const CONSULTATION_TYPES = [
  {
    id: "in-person",
    title: "In-Person Colaba Showroom Appointment",
    desc: "Private 75-minute fitting salon with dedicated senior sartorialist, champagne refreshments, and private archive inspection.",
  },
  {
    id: "virtual",
    title: "Virtual Private Video Stylist Salon",
    desc: "High-definition video salon reviewing fabric swatches, silhouettes, and measurements from the comfort of your residence.",
  },
];

export default function BookConsultationPage() {
  // Tomorrow's date formatted as YYYY-MM-DD for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().slice(0, 10);

  const [appointmentType, setAppointmentType] = React.useState("in-person");
  const [date, setDate] = React.useState(minDateStr);
  const [time, setTime] = React.useState(TIME_SLOTS[0]);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = React.useState<any | null>(null);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name || !email || !phone || !date || !time) {
      setErrorMsg("Please complete all required appointment details.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await bookConsultationAction({
        name,
        email,
        phone,
        preferred_date: date,
        preferred_time: `${time} (${appointmentType === "in-person" ? "Colaba Atelier" : "Virtual Salon"})`,
        notes,
      });

      if (!res.success) {
        setErrorMsg(res.message);
        toast.error(res.message);
      } else {
        setConfirmedBooking({
          name,
          email,
          phone,
          date,
          time,
          appointmentType,
          bookingId: res.data?.id || `cons-${Date.now()}`,
        });
        toast.success("Private consultation requested successfully.");
      }
    } catch {
      setErrorMsg("Unable to reserve appointment. Please contact our telephone concierge directly.");
      toast.error("Booking error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="default">
        <div className="mb-12 space-y-3 max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Client Services", href: "/about" },
              { label: "Private Styling Consultation" },
            ]}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
            Private Client Commission
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111]">
            Reserve Private Styling Appointment
          </h1>
          <p className="text-xs sm:text-sm text-[#8A857C] leading-relaxed">
            Experience our numbered collection alongside a dedicated senior sartorial consultant. Whether preparing for a state gala, wardrobe revision, or bespoke commission, every appointment is conducted with quiet discretion.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation State Modal/Card */
          <div className="max-w-2xl mx-auto bg-white border border-[#E4DFD5] p-8 sm:p-12 shadow-md animate-in fade-in space-y-6">
            <div className="w-14 h-14 bg-[#F7F4EE] border border-[#B08D57]/40 rounded-full flex items-center justify-center mx-auto text-[#B08D57]">
              <Check className="w-7 h-7 stroke-[1.5]" />
            </div>

            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
                Appointment Reserved
              </span>
              <h2 className="font-heading text-3xl text-[#111111]">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-xs text-[#8A857C] max-w-md mx-auto leading-relaxed">
                A confirmation dossier has been dispatched to <strong className="text-[#111111]">{confirmedBooking.email}</strong>. Our senior concierge will phone you at <strong className="text-[#111111]">{confirmedBooking.phone}</strong> 24 hours prior to confirm fitting preferences.
              </p>
            </div>

            {/* Appointment Summary Box */}
            <div className="p-6 bg-[#F7F4EE] border border-[#E4DFD5] space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#E4DFD5] pb-2">
                <span className="text-[#8A857C]">Patron Name:</span>
                <span className="font-medium text-[#111111]">{confirmedBooking.name}</span>
              </div>
              <div className="flex justify-between border-b border-[#E4DFD5] pb-2">
                <span className="text-[#8A857C]">Format:</span>
                <span className="font-medium text-[#111111]">
                  {confirmedBooking.appointmentType === "in-person"
                    ? "In-Person Colaba Showroom"
                    : "Virtual Video Salon"}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#E4DFD5] pb-2">
                <span className="text-[#8A857C]">Confirmed Date:</span>
                <span className="font-medium text-[#111111]">
                  {new Date(confirmedBooking.date).toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#E4DFD5] pb-2">
                <span className="text-[#8A857C]">Time Slot:</span>
                <span className="font-medium text-[#111111]">{confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#8A857C]">Atelier Venue:</span>
                <span className="font-medium text-[#111111] text-right max-w-xs">
                  {confirmedBooking.appointmentType === "in-person"
                    ? brandConfig.contact.address
                    : "Encrypted Video Link sent via email"}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/lookbook">Explore Collection Looks</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/shop">Return to Catalog</Link>
              </Button>
            </div>
          </div>
        ) : (
          /* Interactive Booking Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 bg-white border border-[#E4DFD5] p-8 sm:p-10 shadow-xs">
              <form onSubmit={handleBooking} className="space-y-8 text-xs">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                    {errorMsg}
                  </div>
                )}

                {/* Step 1: Appointment Format */}
                <div className="space-y-3">
                  <span className="text-[11px] uppercase tracking-wider text-[#111111] font-medium block">
                    1. Select Consultation Format
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CONSULTATION_TYPES.map((type) => {
                      const isSelected = appointmentType === type.id;
                      return (
                        <div
                          key={type.id}
                          onClick={() => setAppointmentType(type.id)}
                          className={`p-5 border cursor-pointer transition-all ${
                            isSelected
                              ? "border-[#111111] bg-[#F7F4EE]/60 ring-1 ring-[#111111]"
                              : "border-[#E4DFD5] hover:border-[#8A857C]"
                          }`}
                        >
                          <h4 className="font-medium text-[#111111] text-xs mb-1">
                            {type.title}
                          </h4>
                          <p className="text-[11px] text-[#8A857C] leading-relaxed">
                            {type.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Date & Time Picker */}
                <div className="space-y-3 pt-2 border-t border-[#E4DFD5]">
                  <span className="text-[11px] uppercase tracking-wider text-[#111111] font-medium block">
                    2. Select Preferred Date &amp; Salon Window
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#8A857C] block mb-1">
                        Calendar Date (Excluding Sundays) *
                      </label>
                      <input
                        type="date"
                        min={minDateStr}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#8A857C] block mb-1">
                        Time Slot Window *
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Step 3: Patron Details */}
                <div className="space-y-3 pt-2 border-t border-[#E4DFD5]">
                  <span className="text-[11px] uppercase tracking-wider text-[#111111] font-medium block">
                    3. Patron Particulars
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#8A857C] block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Radhika Merchant"
                        className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#8A857C] block mb-1">
                        Mobile Number (+91) *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9820012345"
                        className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#8A857C] block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="patron@domain.com"
                        className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="text-[10px] uppercase tracking-wider text-[#8A857C] block mb-1">
                      Styling Notes / Garment Interests (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Share pieces you wish to inspect, specific color preferences, or tailoring considerations..."
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111] resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E4DFD5]">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Confirming Appointment...
                      </span>
                    ) : (
                      <span>Request Private Salon Appointment</span>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Sidebar Guidelines */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-[#E4DFD5] p-6 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
                  Atelier Etiquette &amp; Care
                </span>
                <div className="space-y-4 text-xs text-[#8A857C]">
                  <div>
                    <h5 className="font-medium text-[#111111] mb-0.5">Complimentary Hospitality</h5>
                    <p className="leading-relaxed">
                      Consultations include custom beverage service and a personalized wardrobe dossier prepared by our resident stylist.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-[#111111] mb-0.5">Discreet Rescheduling</h5>
                    <p className="leading-relaxed">
                      Should your schedule alter, kindly notify our telephone concierge 12 hours in advance to release the reserved atelier salon.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-[#111111] mb-0.5">Atelier Address</h5>
                    <p className="leading-relaxed">
                      {brandConfig.contact.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#2B2E26] text-[#F7F4EE] space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
                  Direct Line
                </span>
                <p className="text-xs text-[#E4DFD5]/80">
                  Prefer direct vocal arrangement? Phone the senior atelier director directly:
                </p>
                <p className="font-heading text-lg text-white">
                  {brandConfig.contact.phone}
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
