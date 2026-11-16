// The small object at the top of each Free resources card: a drawing in HTML of what the resource is (a newspaper page,
// the magazine cover, a stack of question papers, the three stages, a pile of books, a calendar page). Decorative only.
// Styles: public/css/resources.css (.rmk).

const lines = (n, cls = 'rmk__ln') => Array.from({ length: n }, (_, i) => <i key={i} className={cls} />);

function Paper() {
  return (
    <div className="rmk__obj rmk__news">
      <div className="rmk__sheet rmk__sheet--back" />
      <div className="rmk__sheet">
        <b className="rmk__mast">The Daily Brief</b>
        <span className="rmk__rule" />
        <i className="rmk__hl" /><i className="rmk__hl rmk__hl--s" />
        <div className="rmk__cols">
          <span className="rmk__pic" />
          <div className="rmk__col">{lines(5)}</div>
        </div>
        <div className="rmk__col">{lines(3)}</div>
      </div>
    </div>
  );
}

function Magazine() {
  return (
    <div className="rmk__obj rmk__mag">
      <div className="rmk__cover rmk__cover--back" />
      <div className="rmk__cover">
        <span className="rmk__kick">Monthly</span>
        <b className="rmk__mt">The Recitals</b>
        <span className="rmk__seal" />
        <i className="rmk__ln rmk__ln--w" /><i className="rmk__ln rmk__ln--w rmk__ln--s" />
      </div>
      <span className="rmk__badge">PDF</span>
    </div>
  );
}

function Papers() {
  return (
    <div className="rmk__obj rmk__pyq">
      <div className="rmk__sheet rmk__sheet--b2" />
      <div className="rmk__sheet rmk__sheet--b1" />
      <div className="rmk__sheet">
        <b className="rmk__qh">GS Paper I</b>
        {[1, 2, 3].map(q => (
          <div key={q} className="rmk__q"><span>{q}.</span><div className="rmk__col">{lines(2)}</div></div>
        ))}
        <span className="rmk__stamp">Answer key</span>
      </div>
    </div>
  );
}

function Stages() {
  return (
    <div className="rmk__obj rmk__steps">
      {['Prelims', 'Mains', 'Interview'].map((s, i) => (
        <div key={s} className="rmk__step" style={{ '--s': i }}>
          <span className="rmk__bar" />
          <b>{s}</b>
        </div>
      ))}
      <span className="rmk__flag" />
    </div>
  );
}

function Books() {
  return (
    <div className="rmk__obj rmk__books">
      {['Polity', 'History', 'Economy', 'Geography'].map((t, i) => (
        <div key={t} className="rmk__book" style={{ '--b': i }}><b>{t}</b><span /></div>
      ))}
    </div>
  );
}

function Calendar() {
  // 35 cells; the marked ones stand for the stages' dates (not real dates).
  const marked = { 9: 'a', 19: 'b', 26: 'c', 31: 'd' };
  return (
    <div className="rmk__obj rmk__cal">
      <div className="rmk__calhd"><span /><b>UPSC 2027</b><span /></div>
      <div className="rmk__grid">
        {Array.from({ length: 35 }, (_, i) => <i key={i} className={marked[i] ? `rmk__day rmk__day--${marked[i]}` : 'rmk__day'} />)}
      </div>
    </div>
  );
}

const KINDS = { paper: Paper, magazine: Magazine, papers: Papers, stages: Stages, books: Books, calendar: Calendar };

export default function ResourceMock({ kind }) {
  const Kind = KINDS[kind];
  if (!Kind) return null;
  return (
    <div className={`rmk rmk--${kind}`} aria-hidden="true">
      <Kind />
    </div>
  );
}
