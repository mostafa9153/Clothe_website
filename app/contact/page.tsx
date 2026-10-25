"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import brandConfig from "@/config/brand.config";
import { submitContactAction } from "@/app/actions/leads";
import { Check, Mail, Phone, MapPin, Clock, MessageSquare, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg("Please complete all required fields with your inquiry details.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitContactAction({
        name,
        email,
        phone: phone || undefined,
        subject,
        message,
      });

      if (!res.success) {
        setErrorMsg(res.message);
        toast.error(res.message);
      } else {
        setSubmitted(true);
        toast.success("Your inquiry has been relayed to the concierge.");
      }
    } catch {
      setErrorMsg("Unable to transmit your message at this time. Please try again or reach us via telephone.");
      toast.error("Transmission error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="default">
        <div className="mb-10 space-y-3">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Concierge & Inquiries" },
            ]}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
            Direct Atelier Concierge
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111]">
            Contact &amp; Client Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-[#8A857C] max-w-xl leading-relaxed">
            Whether inquiring regarding bespoke commission sizing, archival textiles, or delivery protocols, our senior atelier concierge responds within 24 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8 bg-white border border-[#E4DFD5] p-8 shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
              Atelier Coordinates
            </span>

            <div className="space-y-6 text-xs text-[#8A857C]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B08D57] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#111111] font-medium block">Showroom &amp; Workshop</strong>
                  <span>{brandConfig.contact.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#B08D57] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#111111] font-medium block">Telephone Concierge</strong>
                  <a href={`tel:${brandConfig.contact.phone}`} className="hover:text-[#111111] transition-colors">
                    {brandConfig.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#B08D57] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#111111] font-medium block">Client Dossier</strong>
                  <a href={`mailto:${brandConfig.contact.email}`} className="hover:text-[#111111] transition-colors">
                    {brandConfig.contact.email}
                  </a>
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

            {/* Direct WhatsApp Callout */}
            <div className="p-4 bg-[#F7F4EE] border border-[#E4DFD5] space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-medium block">
                Instant Personal Stylist
              </span>
              <p className="text-xs text-[#8A857C]">
                Need immediate guidance regarding fabric drape or sizing? Chat directly with our private concierge team on WhatsApp.
              </p>
              <div className="pt-1">
                <a
                  href={`https://wa.me/${brandConfig.whatsapp.number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(brandConfig.whatsapp.prefilledMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-[#111111] hover:text-[#B08D57] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>Open WhatsApp Stylist</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-[#E4DFD5] p-8 sm:p-10 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 bg-[#F7F4EE] border border-[#B08D57]/40 rounded-full flex items-center justify-center mx-auto text-[#B08D57]">
                  <Check className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-heading text-3xl text-[#111111]">Inquiry Received</h3>
                <p className="text-xs sm:text-sm text-[#8A857C] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#111111]">{name}</strong>. A dedicated senior atelier concierge will review your message regarding &ldquo;{subject}&rdquo; and reply to <strong className="text-[#111111]">{email}</strong> within 24 hours.
                </p>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setPhone("");
                      setSubject("");
                      setMessage("");
                    }}
                  >
                    Send Another Dispatch
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Singhal"
                      disabled={isSubmitting}
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111] transition-colors"
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
                      placeholder="patron@domain.com"
                      disabled={isSubmitting}
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      disabled={isSubmitting}
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                      Subject Inquiry *
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Silk Gown Hem Alterations"
                      disabled={isSubmitting}
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                    Your Message / Specifications *
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please describe your styling requirements, order reference, or custom commission details in depth..."
                    disabled={isSubmitting}
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111] transition-colors resize-none"
                    required
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Transmitting to Concierge...
                      </span>
                    ) : (
                      <span>Transmit Concierge Inquiry</span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
