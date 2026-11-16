import Stylesheet from '@/components/ui/Stylesheet';
import { BATCHES, BYEAR } from '@/components/sections/Batches/data';

// ============ BATCH STRIPS: one straight orange ribbon that runs across the page, announcing the next batches (the idea of the
// "Admissions open" strips on the reference homepage, kept to a single level ribbon). The items come from the batch tickets' data (Batches/data.js), so a new batch
// appears here as soon as it is added there. Pure CSS: the track is the list twice and slides by exactly one copy (no script).
// Each batch is a link to the enquiry form with that programme chosen (the same [data-prog] link the Enroll buttons use).
// Styles: public/css/batch-strips.css. ============

const LOTUS = '/assets/img/brand/lotus-white-solid.svg';

function Run({ copy, reverse }) {
  const items = reverse ? [...BATCHES].reverse() : BATCHES;
  return (
    <div className="bstrip__run" aria-hidden={copy || undefined}>
      {items.map(b => (
        <a key={b.n} className="bstrip__it" href="#contact" data-prog={b.full} tabIndex={copy ? -1 : undefined}
          aria-label={copy ? undefined : `${b.n}, starts ${b.d} ${BYEAR}: enquire about this batch`}>
          <b>{b.n}</b>
          <span>starts {b.d} {BYEAR}</span>
          <i className="bstrip__orn" style={{ "--lotus": `url(${LOTUS})` }} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function Strip({ tone, reverse }) {
  return (
    <div className={`bstrip bstrip--${tone} rv`} style={{ "--d": reverse ? ".18s" : ".08s" }}>
      <div className="bstrip__track" data-dir={reverse ? "r" : "l"}>
        <Run />
        <Run copy />
      </div>
    </div>
  );
}

export default function BatchStrips() {
  return (
    <section className="bstrips" id="batchStrips" aria-label="Upcoming batches">
      <Stylesheet href="/css/batch-strips.css" />
      <h2 className="bstrips__sr">Upcoming batches: {BATCHES.map(b => `${b.n} starts ${b.d}`).join(', ')}</h2>
      <Strip tone="orange" />
    </section>
  );
}
