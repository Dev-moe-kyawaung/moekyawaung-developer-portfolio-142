import { useEffect, useRef, useState, type ReactNode } from "react";
import type { CSSProperties } from "react";

export function Reveal({ children, delay = "", className = "" }: { children: ReactNode; delay?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`rv ${delay} ${className}`}>{children}</div>;
}

export function SectionHead({ num, tag, title, sub }: { num: string; tag: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-5 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="f-mono text-[11px] px-2.5 py-1 border border-[#7c6aff] text-[#c9c2ff]">[{num}]</span>
            <span className="f-mono text-[10px] tracking-[.25em] text-[#7c6aff] uppercase">{tag}</span>
            <span className="hairline w-16" />
          </div>
          <h2 className="f-display font-extrabold uppercase leading-[.95] text-[clamp(2rem,4.8vw,3.5rem)] text-white">{title}</h2>
        </div>
        {sub && <p className="max-w-sm text-sm leading-relaxed text-[#8d99a8] pb-1">{sub}</p>}
      </div>
    </Reveal>
  );
}

export function Magnetic({ children, power = 0.3, className = "" }: { children: ReactNode; power?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * power}px, ${(e.clientY - (r.top + r.height / 2)) * power}px)`;
  };
  const out = () => { const el = ref.current; if (el) el.style.transform = "translate(0,0)"; };
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={out} className={`mag ${className}`}>{children}</div>;
}

export function ProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const d = document.documentElement;
      setP(d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight));
    };
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[96] bg-transparent">
      <div className="h-full origin-left transition-transform duration-150" style={{ transform: `scaleX(${p})`, background: "linear-gradient(90deg,#7c6aff,#3dd6bd,#ffb84d)" }} />
    </div>
  );
}

export function Code({ code }: { code: string }) {
  const html = code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/(\/\/[^\n]*)/g, `<span class="tok-c">$1</span>`)
    .replace(/\b(class|object|fun|val|var|private|override|when|is|return|if|else|for|in|out|by|data|sealed|interface|import|suspend|launch|const|abstract|new|else|as|composable)\b/g, `<span class="tok-k">$1</span>`)
    .replace(/("[^"]*")/g, `<span class="tok-s">$1</span>`)
    .replace(/\b(\d[\d_.]*)\b/g, `<span class="tok-n">$1</span>`);
  return <pre className="codeblock whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Ticker({ items }: { items: string[] }) {
  return (
    <div className="border-y border-[#232a35] py-3 overflow-hidden">
      <div className="ticker">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {items.map((w, i) => (
              <span key={i} className="f-display font-bold uppercase text-xl sm:text-2xl px-5 whitespace-nowrap text-[#8d99a8]">
                {w}<span className="text-[#7c6aff] pl-5">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function InView({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <Reveal className={className}>{children}</Reveal>;
}

export type { CSSProperties };
