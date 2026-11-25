import { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowUpRight,
  CheckCircle2,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
  Send,
  AlertCircle,
} from 'lucide-react';
import { portfolioConfig } from '../config/portfolioConfig';
import MagneticButton from './MagneticButton';
import { LeetCodeIcon } from './SocialIcons';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const hasEmailJS = Boolean(
    portfolioConfig.contact.emailjs.serviceId &&
      portfolioConfig.contact.emailjs.templateId &&
      portfolioConfig.contact.emailjs.publicKey
  );

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.email.trim()) {
      next.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address.';
    }
    if (!form.subject.trim()) next.subject = 'Subject is required.';
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = 'Please include at least 10 characters in your message.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (hasEmailJS) {
      setStatus({ type: 'loading', message: 'Sending message...' });
      try {
        await emailjs.send(
          portfolioConfig.contact.emailjs.serviceId,
          portfolioConfig.contact.emailjs.templateId,
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
          },
          portfolioConfig.contact.emailjs.publicKey
        );
        setStatus({
          type: 'success',
          message: 'Message delivered. Thank you for reaching out!',
        });
        setForm({ name: '', email: '', subject: '', message: '' });
      } catch {
        setStatus({
          type: 'error',
          message:
            'Could not dispatch via EmailJS. Please email directly at jaysuriya.rv@gmail.com.',
        });
      }
      return;
    }

    // Functional mailto fallback when EmailJS credentials are not configured
    const mailtoSubject = encodeURIComponent(`[Portfolio] ${form.subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${portfolioConfig.personal.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setStatus({
      type: 'success',
      message: `Opened your default mail client addressed to ${portfolioConfig.personal.email}.`,
    });
  };

  const onChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="relative bg-[#080808] py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-14 border-b border-white/10 pb-8">
          <p className="mb-3 font-mono text-xs tracking-[0.22em] text-lime">
            08 // INITIATE COLLABORATION
          </p>
          <h2 className="max-w-5xl font-display text-[clamp(2.4rem,6vw,5.4rem)] font-extrabold leading-[0.94] tracking-[-0.03em] text-white">
            {portfolioConfig.contact.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-base text-white/75 sm:text-xl">
            {portfolioConfig.contact.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Direct Channels & Resume */}
          <div className="flex flex-col justify-between gap-10 lg:col-span-5">
            <div className="space-y-4">
              <a
                href={portfolioConfig.socials.email}
                className="group flex items-center justify-between border border-white/15 bg-[#111111] p-5 transition-colors hover:border-lime"
              >
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-lime" />
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.18em] text-muted">
                      EMAIL
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-white sm:text-base">
                      {portfolioConfig.personal.email}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime" />
              </a>

              <a
                href={`tel:${portfolioConfig.personal.phone.replace(/\s+/g, '')}`}
                className="group flex items-center justify-between border border-white/15 bg-[#111111] p-5 transition-colors hover:border-lime"
              >
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-lime" />
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.18em] text-muted">
                      PHONE
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-white sm:text-base">
                      {portfolioConfig.personal.phone}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime" />
              </a>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <a
                  href={portfolioConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-white/15 bg-[#111111] px-4 py-3.5 font-mono text-xs tracking-[0.14em] text-white transition-colors hover:border-lime hover:text-lime"
                >
                  <span className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GITHUB
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <a
                  href={portfolioConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-white/15 bg-[#111111] px-4 py-3.5 font-mono text-xs tracking-[0.14em] text-white transition-colors hover:border-lime hover:text-lime"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LINKEDIN
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <a
                  href={portfolioConfig.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-white/15 bg-[#111111] px-4 py-3.5 font-mono text-xs tracking-[0.14em] text-white transition-colors hover:border-lime hover:text-lime"
                >
                  <span className="flex items-center gap-2">
                    <LeetCodeIcon className="h-4 w-4" />
                    LEETCODE
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="border border-lime/30 bg-[#111111] p-6">
              <div className="font-mono text-[11px] tracking-[0.2em] text-lime">
                CURRICULUM VITAE &amp; RESUME
              </div>
              <p className="mt-2 text-sm text-white/75">
                Download the latest 1-page technical resume in PDF format.
              </p>
              <div className="mt-5">
                <MagneticButton
                  as="a"
                  href={portfolioConfig.personal.resumeUrl}
                  download="Jay_Suriya_R_Resume.pdf"
                  className="w-full border border-lime bg-lime px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.18em] text-[#080808] transition-colors hover:bg-white hover:border-white"
                >
                  <Download className="h-4 w-4" />
                  DOWNLOAD RESUME (PDF)
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border border-white/15 bg-[#111111] p-6 sm:p-10 lg:col-span-7">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <span className="font-mono text-xs tracking-[0.18em] text-white">
                DIRECT MESSAGE
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-lime">
                {hasEmailJS ? 'EMAILJS CONNECTED' : 'MAILTO DISPATCH FALLBACK'}
              </span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block font-mono text-[11px] tracking-[0.18em] text-muted"
                  >
                    NAME *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={onChange('name')}
                    placeholder="Your name"
                    className="w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-lime focus:outline-none"
                  />
                  {errors.name && (
                    <p className="mt-1.5 font-mono text-[11px] text-amber-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block font-mono text-[11px] tracking-[0.18em] text-muted"
                  >
                    EMAIL *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={onChange('email')}
                    placeholder="you@domain.com"
                    className="w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-lime focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1.5 font-mono text-[11px] text-amber-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block font-mono text-[11px] tracking-[0.18em] text-muted"
                >
                  SUBJECT *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={onChange('subject')}
                  placeholder="Internship, research, or project inquiry"
                  className="w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-lime focus:outline-none"
                />
                {errors.subject && (
                  <p className="mt-1.5 font-mono text-[11px] text-amber-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block font-mono text-[11px] tracking-[0.18em] text-muted"
                >
                  MESSAGE *
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={onChange('message')}
                  placeholder="Tell me about the problem, timeline, or collaboration..."
                  className="w-full resize-y border border-white/15 bg-[#080808] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-lime focus:outline-none"
                />
                {errors.message && (
                  <p className="mt-1.5 font-mono text-[11px] text-amber-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {status.type !== 'idle' && (
                <div
                  role="status"
                  className={`flex items-center gap-2.5 border p-3.5 font-mono text-xs ${
                    status.type === 'success'
                      ? 'border-lime/40 bg-lime/10 text-lime'
                      : status.type === 'error'
                      ? 'border-red-500/40 bg-red-500/10 text-red-300'
                      : 'border-white/15 bg-white/5 text-white'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : status.type === 'error' ? (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  ) : null}
                  <span>{status.message}</span>
                </div>
              )}

              <MagneticButton
                as="button"
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full border border-lime bg-lime px-7 py-4 font-mono text-xs font-semibold tracking-[0.18em] text-[#080808] transition-colors hover:bg-white hover:border-white disabled:opacity-60 sm:w-auto"
              >
                <Send className="h-4 w-4" />
                {status.type === 'loading'
                  ? 'SENDING...'
                  : hasEmailJS
                  ? 'SEND MESSAGE'
                  : 'OPEN IN EMAIL CLIENT'}
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
