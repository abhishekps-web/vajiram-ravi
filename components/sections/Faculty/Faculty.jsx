import Button from '@/components/ui/Button/Button';
import SectionLabel from '@/components/ui/SectionLabel';

// ============ FACULTY ============
export default function Faculty() {
  return (
    <section className="band dots band--fac" id="faculty" aria-labelledby="facH">
      <SectionLabel>Faculty</SectionLabel>
      <h2 id="facH" className="h2 h2--sec rv" style={{ "--d": ".12s" }}>Taught by subject specialists.</h2>
      <p className="intro rv" style={{ "--d": ".2s" }}>Specialists for every GS paper, the essay, the optionals and the interview.</p>
      <div className="rail rail--fac">
        <div className="fgrid rail__track" id="team" tabIndex="0" aria-label="Faculty" />
        <Button className="cbtn cbtn--prev" iconOnly iconStart="arrow-left" label="Previous faculty" />
        <Button className="cbtn cbtn--next" iconOnly iconStart="arrow" label="Next faculty" />
      </div>
    </section>
  );
}
