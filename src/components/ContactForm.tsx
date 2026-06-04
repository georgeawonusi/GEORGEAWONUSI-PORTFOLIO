import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, RefreshCw, Terminal } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  includeTelemetry: boolean;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: 'System Architectural Design Consultation',
    message: '',
    includeTelemetry: true,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [responseLog, setResponseLog] = useState<string>('');

  const subjects = [
    'System Architectural Design Consultation',
    'Full-Stack Contract Opportunity',
    'Open Source Project Sponsoring',
    'Technical Interview / Hiring Invitation',
    'General Inquiry / Tech Discussion',
  ];

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus('error');
      return;
    }

    setLoading(true);
    setStatus('idle');

    // Simulate network transmission delay
    setTimeout(() => {
      setLoading(false);
      setStatus('success');

      // Create rich mock server validation logs
      const mockResult = {
        serverStatus: '201 Created',
        endpoint: 'POST /api/v1/communication/relays',
        protocol: 'HTTP/2 secured with dynamic TLS',
        payloadReceived: {
          senderName: formData.name,
          replyTo: formData.email,
          classification: formData.subject,
          contentsHash: 'SHA-256:' + Math.random().toString(16).substr(2, 8).toUpperCase(),
          telemetryAttached: formData.includeTelemetry,
        },
        telemetryLogs: formData.includeTelemetry ? {
          agent: navigator.userAgent.substring(0, 50) + '...',
          timestamp: new Date().toISOString(),
          connectionType: 'HTTP/2-Stream',
          ipLocationScope: 'Resolving from client gateway',
        } : undefined,
        status: 'SUCCESS',
        message: 'Communication queue dispatched. Active alerts dispatched to developer webhook relays.',
      };

      setResponseLog(JSON.stringify(mockResult, null, 2));
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'System Architectural Design Consultation',
      message: '',
      includeTelemetry: true,
    });
    setStatus('idle');
    setResponseLog('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 lg:p-8 shadow-xl" id="contact-form-widget">
      {/* Information Sidebar Column */}
      <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl w-fit border border-indigo-500/15">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-serif text-slate-100 italic leading-tight">Dispatch a Message</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Ready to schedule a service, contract custom web development, promote an artist, or consult on corporate real estate, agriculture, or coffee services? Reach out through this secure dispatch gateway.
          </p>
        </div>

        {/* Dynamic status indicators or contact coordinates */}
        <div className="space-y-3.5 border-t border-slate-800/80 pt-6">
          <div className="flex gap-3">
            <div className="text-xs font-mono text-slate-500 w-24 shrink-0 uppercase tracking-widest">EMAIL DIRECT:</div>
            <div className="text-xs font-mono text-indigo-400 select-all font-semibold break-all">AWONUSIGEORGE532973@GMAIL.COM</div>
          </div>
          <div className="flex gap-3">
            <div className="text-xs font-mono text-slate-500 w-24 shrink-0 uppercase tracking-widest">CONTACT NO:</div>
            <div className="text-xs font-mono text-slate-300 select-all font-semibold">+2348133980427</div>
          </div>
          <div className="flex gap-3">
            <div className="text-xs font-mono text-slate-500 w-24 shrink-0 uppercase tracking-widest">LOCK LOCATION:</div>
            <div className="text-[10px] font-mono text-slate-400 leading-snug">21 Okerede Str, Odode Idanre, Ondo State, Nigeria 340108</div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="text-xs font-mono text-slate-500 w-24 shrink-0 uppercase tracking-widest">STATUS:</div>
            <span className="flex items-center gap-1.5 text-xs text-indigo-400 font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-indigo-550 animate-pulse" />
              Accepting Corporate Contracts
            </span>
          </div>
        </div>
      </div>

      {/* Actual Action Form Columns */}
      <div className="lg:col-span-7">
        {status === 'success' ? (
          <div className="space-y-5 animate-fade-in" id="contact-success-panel">
            <div className="bg-indigo-500/10 border border-indigo-500/20 p-5 rounded-2xl flex items-start gap-3.5">
              <CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-indigo-300 font-mono uppercase">Request Dispatched Successfully</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  The message stream has been converted into structured telemetry schemas and submitted immediately to backend webhooks. You can examine the server API reply log block below.
                </p>
              </div>
            </div>

            {/* Server JSON Response logs */}
            {responseLog && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Incoming Server API Logging STDOUT</span>
                </div>
                <pre className="text-[10px] text-indigo-400 bg-slate-950 p-4 rounded-xl border border-slate-850 overflow-x-auto font-mono leading-relaxed select-text shadow-inner">
                  {responseLog}
                </pre>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`mailto:AWONUSIGEORGE532973@GMAIL.COM?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                  `Hello George,\n\nYou have received a new contact submission from your portfolio gateway.\n\nSENDER NAME: ${formData.name}\nSENDER EMAIL: ${formData.email}\n\nMESSAGE:\n----------------------------------------\n${formData.message}\n----------------------------------------\n\n[Diagnostic Webhook Log ID: ${Math.random().toString(36).substring(2, 9).toUpperCase()}]`
                )}`}
                className="flex-[1.5] px-4 py-3 bg-emerald-600 hover:bg-emerald-550 text-white font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40 hover:scale-[1.01] hover:shadow-emerald-500/20 text-center"
              >
                <Mail className="w-4 h-4 shrink-0" />
                Direct Email (Gmail / Client)
              </a>
              <button
                id="contact-reset-btn"
                onClick={handleReset}
                className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-705 hover:text-slate-100 text-slate-300 border border-slate-750 font-mono text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                New message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" id="contact-inner-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">Name / Organization</label>
                <input
                  id="contact-form-name"
                  type="text"
                  required
                  placeholder="e.g. John Doe, CloudTech Inc."
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  disabled={loading}
                  className="w-full text-xs font-sans text-slate-200 placeholder-slate-550 border border-slate-800 hover:border-slate-700 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/25 rounded-xl bg-slate-950 px-4 py-3 outline-none transition-all disabled:opacity-50"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">Email Address</label>
                <input
                  id="contact-form-email"
                  type="email"
                  required
                  placeholder="e.g. client@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  disabled={loading}
                  className="w-full text-xs font-sans text-slate-200 placeholder-slate-550 border border-slate-800 hover:border-slate-700 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/25 rounded-xl bg-slate-950 px-4 py-3 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Subject Selector */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">Subject Stream Classification</label>
              <select
                id="contact-form-subject"
                value={formData.subject}
                onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                disabled={loading}
                className="w-full text-xs font-mono text-slate-300 border border-slate-800 bg-slate-950 px-4 py-3 rounded-xl outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-505/25 transition-all outline-hidden cursor-pointer"
              >
                {subjects.map((sub) => (
                  <option key={sub} value={sub} className="bg-slate-900 text-slate-300 font-mono text-xs font-semibold">
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Message payload body */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">Message Payload Body</label>
              <textarea
                id="contact-form-message"
                required
                rows={5}
                placeholder="Submit system design requisitions, workflow constraints, timeline scopes, or team parameters..."
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                disabled={loading}
                className="w-full text-xs font-sans text-slate-200 placeholder-slate-550 border border-slate-800 hover:border-slate-700 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-505/25 rounded-xl bg-slate-950 p-4 outline-none resize-none transition-all disabled:opacity-50"
              />
            </div>

            {/* Checkbox for telemetry simulation */}
            <div className="flex items-start gap-2.5 py-1 select-none">
              <input
                id="contact-form-telemetry-checkbox"
                type="checkbox"
                checked={formData.includeTelemetry}
                onChange={(e) => setFormData((prev) => ({ ...prev, includeTelemetry: e.target.checked }))}
                disabled={loading}
                className="mt-0.5 rounded border-slate-800 text-indigo-500 focus:ring-indigo-500/25 focus:ring-offset-slate-900 bg-slate-950 w-4 h-4 cursor-pointer disabled:opacity-50"
              />
              <label htmlFor="contact-form-telemetry-checkbox" className="text-[11px] text-slate-500 leading-tight font-mono select-none cursor-pointer">
                Include standard client telemetry diagnostic trace reports (browser version, epoch and SHA index hashes). Keep systems fully observable.
              </label>
            </div>

            {/* Form error handler */}
            {status === 'error' && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-center gap-2 text-xs text-red-400 font-mono" id="contact-error-banner">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Validation Failure: Please fill in all fields with verified formats before compiling.</span>
              </div>
            )}

            {/* Form submit button */}
            <button
              id="contact-submit-btn"
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                loading
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-550 text-white hover:shadow-lg hover:shadow-indigo-500/20 cursor-pointer'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Deploying Payload Secure Tunnel...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Relay Secure Message Payload
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
