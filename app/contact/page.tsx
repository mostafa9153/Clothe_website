"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import brandConfig from "@/config/brand.config";
import { Check, Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="default">
        <div className="mb-10 space-y-2">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Concierge & Inquiries" },
            ]}
          />
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111]">
            Client Concierge & Direct Atelier Inquiries
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8 bg-white border border-[#E4DFD5] p-8">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
              Direct Communication
            </span>

            <div className="space-y-6 text-xs text-[#8A857C]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B08D57] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#111111] font-medium block">Showroom & Workshop</strong>
                  <span>{brandConfig.contact.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#B08D57] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#111111] font-medium block">Telephone Concierge</strong>
                  <span>{brandConfig.contact.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#B08D57] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#111111] font-medium block">Client Dossier</strong>
                  <span>{brandConfig.contact.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#B08D57] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#111111] font-medium block">Operating Hours</strong>
                  <span>{brandConfig.contact.hours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-[#E4DFD5] p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-3 animate-in fade-in">
                <Check className="w-8 h-8 text-[#B08D57] mx-auto" />
                <h3 className="font-heading text-2xl text-[#111111]">Inquiry Received</h3>
                <p className="text-xs text-[#8A857C] max-w-md mx-auto">
                  A senior atelier concierge will review your message and reply within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alisha Mehta"
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                      required
                    />
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
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                    Subject / Commission Reference
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Sizing inquiry regarding Sculpted Trench"
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please specify details regarding tailoring, private fitting requests, or bespoke commission..."
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                    required
                  />
                </div>

                <Button type="submit" className="w-full text-xs uppercase tracking-[0.2em] py-3.5">
                  Transmit Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
