"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import brandConfig from "@/config/brand.config";
import { Check, Calendar, Sparkles } from "lucide-react";

export default function ConsultationPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("11:00 AM");
  const [notes, setNotes] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date) return;
    setSubmitted(true);
  };

  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="narrow">
        <div className="mb-10 space-y-2 text-center">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Private Consultation" },
            ]}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block pt-3">
            Bespoke Client Appointments
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111]">
            Reserve Private Atelier Fitting
          </h1>
          <p className="text-xs sm:text-sm text-[#8A857C] max-w-lg mx-auto leading-relaxed">
            Experience our full collection with a dedicated senior stylist at our Colaba showroom or via private virtual appointment.
          </p>
        </div>

        <div className="bg-white border border-[#E4DFD5] p-8 sm:p-12 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <Check className="w-10 h-10 text-[#B08D57] mx-auto" />
              <h3 className="font-heading text-3xl text-[#111111]">
                Private Appointment Requested
              </h3>
              <p className="text-xs text-[#8A857C] max-w-md mx-auto leading-relaxed">
                Thank you, {name}. Our atelier manager will call you at {phone} to confirm your appointment reservation for {date} at {time}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Meera Singhania"
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                    Telephone Mobile (+91) *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@domain.com"
                  className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none uppercase"
                  >
                    <option value="11:00 AM">11:00 AM (Morning Session)</option>
                    <option value="02:00 PM">02:00 PM (Afternoon Fitting)</option>
                    <option value="04:30 PM">04:30 PM (Tea & Lookbook Session)</option>
                    <option value="06:00 PM">06:00 PM (Evening Private Salon)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                  Styling Notes or Specific Silhouettes of Interest
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mention any specific pieces you wish to try (e.g. Mulberry Silk Slip in Champagne, Sculpted Trench)..."
                  className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                />
              </div>

              <Button type="submit" className="w-full text-xs uppercase tracking-[0.2em] py-3.5">
                Request Private Fitting Reservation
              </Button>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}
