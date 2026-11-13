import SectionLabel from '@/components/ui/SectionLabel';

// ============ PROGRAMMES ============
export default function Programmes() {
  return (
    <section className="band dots band--wall" id="courses" aria-labelledby="crsH">
      <div className="band__in">
        <SectionLabel>Programmes</SectionLabel>
        <h2 id="crsH" className="h2 h2--sec h2--full rv" style={{ "--d": ".12s" }}>Programmes for every stage of UPSC.</h2>
        <p className="intro rv" style={{ "--d": ".2s" }}>Choose the stage you're preparing for, then the programme. Every programme runs in the classroom and LIVE-Online.</p>
        <div className="pgrid" id="pgrid" />
      </div>
    </section>
  );
}
