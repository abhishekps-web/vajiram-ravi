// The small object at the top of each Free resources card: a drawing in HTML of what the resource is (a newspaper page,
// the magazine cover, a stack of question papers, an infographic poster, a pile of books, a fan of revision cards). Decorative only.
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

function Magazine({ kick = 'Monthly', title = 'The Recitals', tone }) {
  return (
    <div className="rmk__obj rmk__mag" style={tone ? { '--mag': tone } : undefined}>
      <div className="rmk__cover rmk__cover--back" />
      <div className="rmk__cover">
        <span className="rmk__kick">{kick}</span>
        <b className="rmk__mt">{title}</b>
        <span className="rmk__seal" />
        <i className="rmk__ln rmk__ln--w" /><i className="rmk__ln rmk__ln--w rmk__ln--s" />
      </div>
      <span className="rmk__badge">PDF</span>
    </div>
  );
}

function Recitals() {
  // The Recitals cover, drawn: white page, brand strip, the title, a wheel of photo wedges, a "Current Affairs / July 2026" band
  return (
    <div className="rmk__obj rmk__mag rmk__mag--rec">
      <div className="rmk__cover rmk__cover--back" />
      <div className="rmk__cover rmk__rc">
        <span className="rmk__rcbrand">Vajiram &amp; Ravi</span>
        <b className="rmk__rct"><i>the</i>recitals</b>
        <span className="rmk__wheel"><span className="rmk__hub" /></span>
        <span className="rmk__band"><b>Current Affairs</b><i>July 2026</i></span>
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

function Poster() {
  // an infographic poster: a banner, three icon rows and a footer strip
  return (
    <div className="rmk__obj rmk__poster">
      <div className="rmk__sheet rmk__sheet--back" />
      <div className="rmk__pbody">
        <b className="rmk__pt">Know the Basics</b>
        {[0, 1, 2].map(i => (
          <div key={i} className="rmk__prow"><span className={`rmk__dot rmk__dot--${i}`} /><div className="rmk__col">{lines(2)}</div></div>
        ))}
        <span className="rmk__pfoot" />
      </div>
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

function Cards() {
  // a fan of revision flash-cards
  return (
    <div className="rmk__obj rmk__fc">
      <div className="rmk__card rmk__card--b2" />
      <div className="rmk__card rmk__card--b1" />
      <div className="rmk__card">
        <span className="rmk__fck">Quick revision</span>
        <b className="rmk__fct">Fundamental Rights</b>
        {lines(3)}
        <span className="rmk__fcn">Art. 12–35</span>
      </div>
    </div>
  );
}

const Kurukshetra = () => <Magazine kick="Monthly journal" title="Kurukshetra" tone="linear-gradient(160deg, #3F8A5F, #25583B)" />;

const KINDS = { kurukshetra: Kurukshetra, paper: Paper, magazine: Recitals, papers: Papers, poster: Poster, books: Books, cards: Cards };

export default function ResourceMock({ kind }) {
  const Kind = KINDS[kind];
  if (!Kind) return null;
  return (
    <div className={`rmk rmk--${kind}`} aria-hidden="true">
      <Kind />
    </div>
  );
}
