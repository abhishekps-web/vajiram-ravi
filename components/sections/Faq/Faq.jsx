import Button from '@/components/ui/Button/Button';
import { FAQS } from './data';
// ============ FAQ ============
// The questions are server-rendered from data.js (user 2026-11-16: "make FAQ server-rendered"; faq.js built them in the browser before).
// One answer open at a time and the open/close motion: components/ui/accordion.js.
export default function Faq() {
  return (
    <section className="sheet sheet--pad sheet--gap faq" id="faq" aria-labelledby="faqH">
      <div className="faq__l">
        <h2 id="faqH" className="h2 h2--sec rv" style={{ "--d": ".12s" }}>Frequently asked questions</h2>
        <p className="intro rv" style={{ "--d": ".2s" }}>Still unsure? A counsellor can help, with no pressure to enrol.</p>
        <div className="rv-btn rv" style={{ "--d": ".28s" }}>
          <Button href="#contact" iconEnd="arrow">Talk to a counsellor</Button>
        </div>
      </div>
      <div className="qas" id="faqList">
        {FAQS.map(([q, a], i) => (
          <details key={q} className="qa" open={i === 0}>
            <summary>
              {q}
              <svg className="qa__ic" width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
