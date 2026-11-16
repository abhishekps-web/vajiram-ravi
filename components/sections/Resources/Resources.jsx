import Button from '@/components/ui/Button/Button';
import SectionLabel from '@/components/ui/SectionLabel';
import Stylesheet from '@/components/ui/Stylesheet';
import ResourceMock from './ResourceMock';
import { RESOURCES } from './data';

// ============ FREE RESOURCES: six resource cards, each with its own action, and more resources as small links;
// styles/v49.css .sm / .sm__card--res, the folders public/css/resources.css. Content in ./data.jsx; links rewritten by ./resource-links.js.
// Each card is a manila file folder from the editorial desk: the back with a coloured index tab, the resource itself
// (./ResourceMock) sticking out of it, and the front flap with the copy and a rubber "Free" stamp. ============

function ResourceCard({ title, desc, action, stages, mock }) {
  return (
    <li className="sm__card sm__card--res rf">
      <span className="rf__back" aria-hidden="true" />
      <ResourceMock kind={mock} />
      <div className="rf__front">
        <span className="rf__stamp" aria-hidden="true">Free</span>
        <h3 className="sm__t">{title}</h3>
        <p className="sm__d">{desc}</p>
        {stages && (
          <ul className="sm__stages" aria-label="Stages with dates in the calendar">
            {stages.map(s => <li key={s}>{s}</li>)}
          </ul>
        )}
        <Button variant="link" className="sm__act" href="#" data-rs="" iconEnd="arrow">{action}</Button>
      </div>
    </li>
  );
}

export default function Resources() {
  return (
    <section className="sm" id="resources" aria-labelledby="resrcH">
      <Stylesheet href="/css/resources.css" />
      <div className="sm__in">
        <div className="sm__head">
          <div className="sm__titles">
            <SectionLabel>Free resources</SectionLabel>
            <h2 id="resrcH" className="h2 h2--sec rv" style={{ "--d": ".12s" }}>Your preparation can begin today.</h2>
            <p className="intro rv" style={{ "--d": ".2s" }}>Daily current affairs, a monthly magazine and the official papers, free, from the Vajiram & Ravi editorial desk.</p>
          </div>
        </div>
        <ul className="sm__grid sm__grid--res">
          {RESOURCES.map(r => <ResourceCard key={r.title} {...r} />)}
        </ul>
      </div>
    </section>
  );
}
