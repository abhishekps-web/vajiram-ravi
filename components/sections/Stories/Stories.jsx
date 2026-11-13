import SectionLabel from '@/components/ui/SectionLabel';

// ============ STORIES: inland letter cards ============
export default function Stories() {
  return (
    <section className="sheet sheet--pad" id="stories" aria-labelledby="stH">
      <SectionLabel reveal={false}>Success stories</SectionLabel>
      <h2 id="stH" className="h2 h2--sec">
        <span className="st-line" style={{ "--i": "1" }}>
          <span>Hear it from our students</span>
        </span>
      </h2>
      <div className="ilgrid" id="tcar" />
    </section>
  );
}
