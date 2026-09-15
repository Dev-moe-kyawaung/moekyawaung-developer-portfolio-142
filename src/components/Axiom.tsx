import { useEffect, useRef, useState } from "react";
import { FiCpu, FiSend, FiX } from "react-icons/fi";
import { axiomDocs, profile } from "../data";

type Msg = { from: "axiom" | "you"; text: string };

export default function Axiom() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "axiom", text: axiomDocs.greeting }]);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs, busy, open]);

  const ask = (preset?: string) => {
    const q = (preset ?? input).trim();
    if (!q || busy) return;
    setMsgs((m) => [...m, { from: "you", text: q }]);
    setInput("");
    setBusy(true);
    window.setTimeout(() => {
      setMsgs((m) => [...m, { from: "axiom", text: axiomDocs.answer(q) }]);
      setBusy(false);
    }, 500);
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-[80] group" aria-label="Open AXIOM">
        <span className="absolute -inset-3 rounded-full border border-[#7c6aff]/40 pulse-dot" />
        <span className="relative flex items-center gap-3 ax-panel px-4 py-3">
          <span className="w-10 h-10 rounded-full grid place-items-center text-white" style={{ background: "linear-gradient(135deg,#7c6aff,#3dd6bd)" }}>
            <FiCpu className="text-lg" />
          </span>
          <span className="text-left">
            <small className="block f-mono text-[9px] text-[#8d99a8] tracking-[.18em]">PORTFOLIO AGENT</small>
            <strong className="f-display font-bold text-sm text-white">AXIOM</strong>
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[80] w-full sm:w-[430px] h-[100dvh] sm:h-[600px] sm:max-h-[84vh] ax-panel flex flex-col overflow-hidden" style={{ borderColor: "#7c6aff" }}>
      <div className="flex items-center justify-between p-3 border-b border-[#232a35] bg-[#0f1216]">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full grid place-items-center text-white" style={{ background: "linear-gradient(135deg,#7c6aff,#3dd6bd)" }}>
            <FiCpu />
          </span>
          <div>
            <p className="f-display font-bold text-xs text-white tracking-[.12em]">AXIOM · AGENT</p>
            <p className="f-mono text-[9px] text-[#3dd6bd] tracking-widest">SIX 2026 BUILDS · GROUNDED</p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="w-8 h-8 grid place-items-center border border-[#232a35] text-[#8d99a8] hover:text-white hover:border-[#7c6aff]" aria-label="Close">
          <FiX />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#0b0d10]">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[88%] p-3 border text-xs leading-relaxed ${
              m.from === "you"
                ? "border-[#7c6aff]/40 bg-[#7c6aff]/10 text-[#e6e2ff]"
                : "border-[#2d3644] bg-[#13171d] text-[#c9d2e0]"
            }`}>
              <div className="f-mono text-[9px] mb-1" style={{ color: m.from === "you" ? "#c9c2ff" : "#7c6aff" }}>
                {m.from === "you" ? "YOU" : "AXIOM"}
              </div>
              {m.text}
            </div>
          </div>
        ))}
        {busy && (
          <div className="flex gap-1.5 pl-1">
            <i className="w-1.5 h-1.5 rounded-full bg-[#7c6aff] animate-pulse" />
            <i className="w-1.5 h-1.5 rounded-full bg-[#3dd6bd] animate-pulse" style={{ animationDelay: ".15s" }} />
            <i className="w-1.5 h-1.5 rounded-full bg-[#ffb84d] animate-pulse" style={{ animationDelay: ".3s" }} />
          </div>
        )}
        <div ref={end} />
      </div>

      <div className="px-3 py-2 border-t border-[#232a35] flex flex-wrap gap-1.5 bg-[#0f1216]">
        {axiomDocs.quick.map((q) => (
          <button key={q} onClick={() => ask(q)} className="f-mono text-[9px] px-2 py-1 border border-[#2d3644] text-[#8d99a8] hover:text-[#c9c2ff] hover:border-[#7c6aff] transition">
            +{q}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); ask(); }} className="p-3 flex gap-2 border-t border-[#232a35] bg-[#0b0d10]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about any 2026 build…"
          className="flex-1 bg-[#13171d] border border-[#2d3644] focus:border-[#7c6aff] outline-none px-3 py-2.5 f-mono text-xs text-white placeholder:text-[#586472]"
        />
        <button type="submit" className="ax-btn !p-3 grid place-items-center" aria-label="Send"><FiSend /></button>
      </form>
      <p className="pb-2 text-center f-mono text-[9px] text-[#586472] tracking-[.14em]">{profile.name} · GROUNDED IN THE SIX 2026 BUILDS</p>
    </div>
  );
}
