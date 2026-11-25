const GS = '#C64613', PRE = '#B47A20', CA = '#9D485B', MAINS = '#326F66', MENTOR = '#3F5B87';
const LOOK = {
  'gs-11': [GS, 'General Studies', 'gs'], 'gs-2yr': [GS, 'General Studies', 'gs'],
  'prelims-ts': [PRE, 'Prelims', 'omr'], csat: [PRE, 'CSAT', 'omr'],
  module: [CA, 'Module course', 'class'], crash: [CA, 'Crash course', 'class'], enrichment: [CA, 'Enrichment', 'class'],
  'mains-ts': [MAINS, 'Mains', 'notes'], optional: [MAINS, 'Optional subject', 'online'], 'optional-ts': [MAINS, 'Optional test series', 'notes'],
  mentorship: [MENTOR, 'Mentorship', 'mentor'], interview: [MENTOR, 'Interview', 'campus'],
  ifos: [MAINS, 'IFoS', 'parl'], postal: [PRE, 'Postal course', 'notes'],
};

export default function Cover({ it }) {
  const [c, label, art] = LOOK[it.f] || LOOK['gs-11'];
  return (
    <span className="cf-cover" style={{ '--ticket': c }} aria-hidden="true">
      <span className="cf-cover__art"><img src={`/assets/img/courses/cat/${art}.webp`} alt="" loading="lazy" decoding="async" /></span>
      <span className="cf-cover__k">{label}</span>
      <span className="cf-cover__t">{it.t}</span>
    </span>
  );
}
