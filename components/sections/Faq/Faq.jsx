import Button from '@/components/ui/Button/Button';
// ============ FAQ ============
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
      <div className="qas" id="faqList" />
    </section>
  );
}
