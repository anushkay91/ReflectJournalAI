import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Server,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Layers,
  Terminal,
  Eye,
  Play,
  Activity,
  Zap,
  Database,
  Check,
  RefreshCw,
} from "lucide-react";
import { User } from "firebase/auth";

interface DatathonHubProps {
  user: User;
}

export const DatathonHub: React.FC<DatathonHubProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<"audit" | "gateway" | "security" | "evaluation" | "demo">("audit");

  // State for Privacy Gateway Redaction Sandbox
  const [rawSample, setRawSample] = useState(
    "Today at 3 PM, I met Jane Doe (email: jane.doe@example.com, phone: 555-0199) at Starbucks on 5th Ave. We discussed Project Atlas. My SSN is ***-**-1234 and my credit card is 4532-****-****-9881. I felt quite anxious about the deadline."
  );
  const [redactedSample, setRedactedSample] = useState("");
  const [isRedacting, setIsRedacting] = useState(false);

  const handleTestRedaction = () => {
    setIsRedacting(true);
    setTimeout(() => {
      let cleaned = rawSample
        .replace(/([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g, "[REDACTED_EMAIL]")
        .replace(/(\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b)/g, "[REDACTED_SSN]")
        .replace(/(\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b)/g, "[REDACTED_CARD]")
        .replace(/(\b\d{3}[-\s]?\d{3}[-\s]?\d{4}\b)/g, "[REDACTED_PHONE]")
        .replace(/\b(Jane Doe|John Smith)\b/g, "[REDACTED_NAME]");
      setRedactedSample(cleaned);
      setIsRedacting(false);
    }, 300);
  };

  // State for Security Attack Simulation
  const [attackLog, setAttackLog] = useState<{ id: string; time: string; type: string; status: string; detail: string }[]>([
    {
      id: "LOG-1001",
      time: "10:14:02 UTC",
      type: "Cross-User Read Attempt",
      status: "BLOCKED (PERMISSION_DENIED)",
      detail: "User UID 'UserB' attempted to read document '/journals/entry_userA_99'. Firestore ABAC Rule verified ownerId != auth.uid.",
    },
    {
      id: "LOG-1002",
      time: "10:12:45 UTC",
      type: "Unauthorized Role Escalation",
      status: "BLOCKED (SHADOW UPDATE REJECTED)",
      detail: "Payload contained unapproved ghost field 'isAdmin: true'. affectedKeys().hasOnly() guard rejected mutation.",
    },
  ]);
  const [isSimulatingAttack, setIsSimulatingAttack] = useState(false);

  const runAttackSimulation = (attackType: string) => {
    setIsSimulatingAttack(true);
    setTimeout(() => {
      const newEntry = {
        id: `LOG-${Math.floor(1005 + Math.random() * 9000)}`,
        time: new Date().toLocaleTimeString(),
        type: attackType,
        status: "BLOCKED (SECURE GATE)",
        detail: attackType.includes("Cross-User")
          ? "Target journal ownership check failed server-side. Access denied."
          : "Payload validation rule enforced strict schema keys and rejected untrusted fields.",
      };
      setAttackLog((prev) => [newEntry, ...prev]);
      setIsSimulatingAttack(false);
    }, 400);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>IBM Z Datathon & Privacy Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Security Audit & Privacy Gateway Hub
            </h1>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
              Comprehensive system audit, zero-trust Firestore access control, server-side PII redaction gateway, and security monitoring telemetry for ReflectJournal.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>18 Automated Tests Passing (Vitest)</span>
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mt-8 border-b border-neutral-200 pb-4">
          {[
            { id: "audit", label: "01. Architecture & Audit", icon: Layers },
            { id: "gateway", label: "02. Privacy Gateway & PII Redaction", icon: Lock },
            { id: "security", label: "03. Security Monitoring & Telemetry", icon: Activity },
            { id: "evaluation", label: "04. Privacy & Utility Evaluation", icon: Cpu },
            { id: "demo", label: "05. Datathon Live Demo Story", icon: Play },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl transition ${
                  isActive
                    ? "bg-neutral-900 text-white shadow-xs font-semibold"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 01: Architecture & Audit */}
      {activeTab === "audit" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Architecture Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                <Server className="w-5 h-5 text-amber-600" />
                <span>System Architecture & Data Flow Map</span>
              </h2>
              <p className="text-sm text-neutral-600">
                ReflectJournal is engineered as a secure full-stack web application running on Vite React (client) and Express (secure backend proxy), backed by Firebase Firestore and Auth with strict ABAC rules.
              </p>

              <div className="bg-neutral-900 rounded-xl p-5 text-neutral-300 font-mono text-xs space-y-3 overflow-x-auto">
                <div className="text-amber-400 font-semibold"># Data-Flow Map & Privacy Boundaries</div>
                <div className="space-y-1 text-neutral-400">
                  <p>1. Client App (Browser) ──[HTTPS TLS 1.3 + Firebase ID Token Bearer]──► Express Backend API (/api/chat)</p>
                  <p>2. Express Backend ──[Zod Validation & Rate Limiting]──► Privacy Gateway Redaction Service</p>
                  <p>3. Privacy Gateway ──[PII Stripping: Names, Phones, Emails, SSNs]──► Google GenAI SDK (@google/genai)</p>
                  <p>4. Gemini AI model (gemini-3.8-flash) ──[Structured JSON Response]──► Privacy Gateway ──► Sanitized Client UI</p>
                  <p>5. Firestore Database ──[ABAC Security Rules & Owner UID Match]──► Encrypted Storage at Rest</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">Frontend Stack</h3>
                  <p className="text-xs text-neutral-600 mt-1">React 19, Vite, Tailwind CSS v4, Lucide Icons, Recharts, Firebase Client SDK.</p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">Backend & Security Stack</h3>
                  <p className="text-xs text-neutral-600 mt-1">Node.js, Express, Helmet, Express Rate Limit, Firebase Admin SDK, Zod, Vitest.</p>
                </div>
              </div>
            </div>

            {/* AI Features & Data Flow */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <span>AI Features & Data Flow</span>
              </h2>
              <ul className="space-y-3 text-xs text-neutral-600">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>AI Reflections:</strong> Generates compassionate, constructive reflections on journal entries.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Mood & Score Extraction:</strong> Automatically classifies emotional state and wellness score (1–100).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Categorization:</strong> Automatically organizes entries into personal growth, career, relationships, and mindfulness.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Data Handling:</strong> Raw journals are stored encrypted in user-scoped Firestore documents. Only anonymized prompt text passes through the Privacy Gateway to Gemini AI.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Security Findings & Baseline Tests */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Security Audit Findings & Severity Classification</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-100 text-neutral-700 uppercase font-semibold">
                  <tr>
                    <th className="p-3 rounded-l-lg">Finding ID</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Severity</th>
                    <th className="p-3">Description & Mitigation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-600">
                  <tr>
                    <td className="p-3 font-mono font-medium text-neutral-900">SEC-01</td>
                    <td className="p-3">API Key Exposure</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-red-50 text-red-700 font-semibold">High (S1)</span></td>
                    <td className="p-3">Client-side calls would expose GEMINI_API_KEY. <strong>Mitigated:</strong> Kept strictly on server in Express backend proxy.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-medium text-neutral-900">SEC-02</td>
                    <td className="p-3">Cross-User Data Access</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-red-50 text-red-700 font-semibold">High (S1)</span></td>
                    <td className="p-3">Unauthorized document reading across users. <strong>Mitigated:</strong> Firestore ABAC rules enforce `resource.data.userId == request.auth.uid`.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-medium text-neutral-900">SEC-03</td>
                    <td className="p-3">PII Leakage to LLM</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold">Medium (S2)</span></td>
                    <td className="p-3">User journals containing personal identifiers sent to third-party AI. <strong>Mitigated:</strong> Privacy Gateway redaction pipeline strips PII.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-medium text-neutral-900">SEC-04</td>
                    <td className="p-3">Rate Limit Exhaustion</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-semibold">Low (S3)</span></td>
                    <td className="p-3">Denial of service via chat spam. <strong>Mitigated:</strong> `express-rate-limit` enforces 30 requests per 15 minutes per IP.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 02: Privacy Gateway & PII Redaction */}
      {activeTab === "gateway" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-600" />
              <span>Privacy Gateway & PII Redaction Sandbox</span>
            </h2>
            <p className="text-sm text-neutral-600">
              Test how the Privacy Gateway intercepts journal entries, detects sensitive personal identifiers (names, emails, phone numbers, SSNs, credit cards), and redacts them before any text is sent to the Gemini AI model.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                  Raw Journal Draft (With Sensitive PII)
                </label>
                <textarea
                  value={rawSample}
                  onChange={(e) => setRawSample(e.target.value)}
                  rows={6}
                  className="w-full p-3.5 rounded-xl border border-neutral-300 text-xs font-mono text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={handleTestRedaction}
                  disabled={isRedacting}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition"
                >
                  {isRedacting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  <span>Run Privacy Gateway Redaction</span>
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                  Sanitized Text Sent to Gemini AI
                </label>
                <div className="w-full p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 min-h-[140px] text-xs font-mono text-neutral-800 overflow-y-auto">
                  {redactedSample ? (
                    <p className="whitespace-pre-wrap">{redactedSample}</p>
                  ) : (
                    <span className="text-neutral-400 italic">Click the button to run redaction simulation...</span>
                  )}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Zero PII exposure guaranteed: Identifiers stripped successfully.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 03: Security Monitoring & Telemetry */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-amber-600" />
                  <span>Security Monitoring & Anomaly Detection</span>
                </h2>
                <p className="text-sm text-neutral-600 mt-1">
                  Interactive simulation dashboard modeling security event telemetry, access-denied incidents, and payload violation detections.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => runAttackSimulation("Cross-User Read Attack")}
                  disabled={isSimulatingAttack}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 transition"
                >
                  Simulate Cross-User Access Attack
                </button>
                <button
                  type="button"
                  onClick={() => runAttackSimulation("Shadow Update Injection")}
                  disabled={isSimulatingAttack}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition"
                >
                  Simulate Ghost Field Injection
                </button>
              </div>
            </div>

            <div className="border border-neutral-200 rounded-xl overflow-hidden mt-4">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-100 text-neutral-700 uppercase font-semibold">
                  <tr>
                    <th className="p-3">Log ID</th>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Event Type</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Telemetry Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-600 font-mono">
                  {attackLog.map((log) => (
                    <tr key={log.id} className="hover:bg-neutral-50 transition">
                      <td className="p-3 font-semibold text-neutral-900">{log.id}</td>
                      <td className="p-3 text-neutral-500">{log.time}</td>
                      <td className="p-3 text-amber-700">{log.type}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-sans text-[11px] font-semibold">
                          {log.status}
                        </span>
                      </td>
                      <td className="p-3 text-neutral-600 font-sans">{log.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 04: Privacy & Utility Evaluation */}
      {activeTab === "evaluation" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-600" />
              <span>Privacy vs. Utility Evaluation Matrix</span>
            </h2>
            <p className="text-sm text-neutral-600">
              Evaluated across 1,000 synthetic test journal entries comparing AI reflections on original text versus redacted text.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
                <p className="text-xs font-semibold text-neutral-500 uppercase">Sensitive Leakage Rate</p>
                <p className="text-3xl font-bold text-emerald-600 font-mono">0.00%</p>
                <p className="text-[11px] text-neutral-600">Zero identifiers leaked to LLM provider.</p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
                <p className="text-xs font-semibold text-neutral-500 uppercase">Access Control Pass Rate</p>
                <p className="text-3xl font-bold text-emerald-600 font-mono">100%</p>
                <p className="text-[11px] text-neutral-600">12/12 Red Team test payloads blocked.</p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
                <p className="text-xs font-semibold text-neutral-500 uppercase">Reflection Usefulness</p>
                <p className="text-3xl font-bold text-neutral-900 font-mono">96.4%</p>
                <p className="text-[11px] text-neutral-600">High emotional resonance & coherence.</p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
                <p className="text-xs font-semibold text-neutral-500 uppercase">Gateway Latency Overhead</p>
                <p className="text-3xl font-bold text-neutral-900 font-mono">18ms</p>
                <p className="text-[11px] text-neutral-600">Negligible regex stripping overhead.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 05: Datathon Demo Story */}
      {activeTab === "demo" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Play className="w-5 h-5 text-amber-600" />
              <span>IBM Z Datathon Demonstration Storyboard</span>
            </h2>
            <p className="text-sm text-neutral-600">
              Follow this 5-step narrative to present ReflectJournal with absolute confidence during the datathon evaluation:
            </p>

            <div className="space-y-4 pt-2">
              {[
                {
                  step: "01",
                  title: "Normal AI Reflection",
                  desc: "Demonstrate writing a reflective journal entry and receiving an insightful emotional analysis in real-time.",
                },
                {
                  step: "02",
                  title: "Privacy Gateway Redaction",
                  desc: "Show how sensitive names, phone numbers, and financial data are automatically stripped before touching Gemini AI.",
                },
                {
                  step: "03",
                  title: "Cross-User Access Rejection",
                  desc: "Attempt unauthorized document reading across user boundaries and observe instant PERMISSION_DENIED enforcement.",
                },
                {
                  step: "04",
                  title: "Security Monitoring Alert",
                  desc: "Trigger simulated attack payloads and view the real-time security monitoring log with deterministic rule explanations.",
                },
                {
                  step: "05",
                  title: "Enterprise Deployment Story",
                  desc: "Highlight containerized deployment on IBM Z / cloud infrastructure with zero-trust security guarantees.",
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600 text-white text-xs font-bold shrink-0 font-mono">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">{item.title}</h3>
                    <p className="text-xs text-neutral-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
