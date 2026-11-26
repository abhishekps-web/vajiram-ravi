import Button from '@/components/ui/button';
import SectionWrapper from '@/components/ui/section-wrapper';
import { FAQS } from '@/lib/data/faq';
// ============ FAQ ============
// The questions are server-rendered from data.js (user 2026-11-16: "make FAQ server-rendered"; faq.js built them in the browser before).
// One answer open at a time and the open/close motion: components/ui/accordion.jsx.
export default function Faq() {
  return (
    <SectionWrapper id="faq" labelledBy="faqH" compact className="sheet sheet--pad sheet--gap faq">
      <div className="faq__l">
        <h2 id="faqH" className="h2 h2--sec rv cu:mt-0!" style={{ "--d": ".12s" }}>Frequently asked questions</h2>
        <p className="intro rv" style={{ "--d": ".2s" }}>Still unsure? A counsellor can help, with no pressure to enrol.</p>
        <div className="rv-btn rv" style={{ "--d": ".28s" }}>
          <Button href="#contact" iconEnd="arrow">Talk to a counsellor</Button>
        </div>
      </div>
      <div className="qas" id="faqList">
        {FAQS.map(([q, a]) => (
          <details key={q} className="qa">
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
    </SectionWrapper>
  );
}
