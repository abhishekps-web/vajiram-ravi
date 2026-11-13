import { ArrowIcon } from '@/components/ui/ArrowIcon';
import SectionLabel from '@/components/ui/SectionLabel';
import { RESOURCES, MORE_RESOURCES } from './data';

// ============ FREE RESOURCES: six resource cards, each with its own action, and more resources as small links;
// styles/v49.css .sm / .sm__card--res. Content in ./data.jsx; links rewritten by ./resource-links.js. ============

function ResourceCard({ title, desc, action, stages, ill }) {
  return (
    <li className="sm__card sm__card--res">
      <img className="sm__rays" src="/assets/img/patterns/surya-rays.svg" alt="" width="300" height="300" />
      <svg className="sm__ill" viewBox="0 0 96 96" aria-hidden="true">{ill}</svg>
      <h3 className="sm__t">{title}</h3>
      <p className="sm__d">{desc}</p>
      {stages && (
        <ul className="sm__stages" aria-label="Stages with dates in the calendar">
          {stages.map(s => <li key={s}>{s}</li>)}
        </ul>
      )}
      <a className="tlink sm__act" href="#" data-rs="">{action}<ArrowIcon /></a>
    </li>
  );
}

export default function Resources() {
  return (
    <section className="sm" id="resources" aria-labelledby="resrcH">
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
        <div className="sm__more rv" style={{ "--d": ".08s" }}>
          <p className="sm__more-k" id="smMoreK">More free resources</p>
          <ul className="sm__more-list sm__more-list--bento" aria-labelledby="smMoreK">
            {MORE_RESOURCES.map(t => (
              <li key={t}>
                <a className="sm__mini" href="#" data-rs="">
                  <span className="sm__mini-t">{t}</span>
                  <ArrowIcon className="sm__mini-go" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
