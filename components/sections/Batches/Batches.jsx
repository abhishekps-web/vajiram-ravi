import Button from '@/components/ui/Button/Button';
import Dialog from '@/components/ui/Dialog';
import { BFAM, BATCHES, BYEAR, BANNERS } from './data';

// ============ BATCHES ============
// Server-rendered from data.js (user 2026-11-16: "make Batches server-rendered"; batches.js built the tickets and the dialog's list
// in the browser before): the paper tickets (a dyed head with the start date and a lotus line mark, the details on cream paper, a
// perforated stub with the Enroll button) and the "all batches" dialog. batches.js now only adds the hover tilt and opens the dialog.

// every programme with admissions open (the results banner isn't a programme)
const OPEN = BANNERS.filter(([, t]) => !/^Top 10/.test(t));

function Ticket({ b, i }) {
  const [d, mon] = b.d.split(' ');
  const fam = BFAM[b.fam] || BFAM.gs;
  const flagship = b.chip === 'Flagship';
  // the family as inv--fam-<key>: a bare inv--pre (the Prelims key) is the old entrance class and hid those tickets
  return (
    <article className={`inv inv--ticket inv--fam-${b.fam}${flagship ? ' inv--flagship' : ''}`} style={{ "--i": i, "--ticket": fam.c }}>
      <div className="inv__frame">
        <div className="ticket__head">
          <img className="ticket__lotus" src="/assets/img/brand/lotus-ticket.svg" alt="" aria-hidden="true" />
          <div className="ticket__date"><span>Batch starts</span><time><b>{d}</b><span>{mon || ''}<small>{BYEAR}</small></span></time></div>
          <span className="ticket__target">Target exam<strong>UPSC {b.tgt}</strong></span>
        </div>
        <div className="ticket__body">
          <span className="inv__tag">{fam.t}{flagship ? ' · Flagship' : ''}</span>
          <h3>{b.n}</h3>
          <p className="inv__w">{b.what}</p>
          <div className="ticket__meta">
            <dl><div><dt>Study mode</dt><dd>Classroom and LIVE{'‑'}Online</dd></div></dl>
            {b.chip === 'Limited seats' && <span className="ticket__limited" aria-label="Limited seats"><span>Limited<br />seats</span></span>}
          </div>
        </div>
        <div className="ticket__stub">
          <Button href="#contact" ariaLabel={`Enroll now in ${b.full}`} iconEnd="arrow" fullWidth className="inv__reg" data-prog={b.full}>Enroll now</Button>
        </div>
      </div>
    </article>
  );
}

export default function Batches() {
  return (
    <>
      <section className="band dots band--gap" id="batches" aria-labelledby="batH">
        <h2 id="batH" className="h2 h2--sec rv" style={{ "--d": ".08s" }}>Next batches starting soon.</h2>
        <div className="bhead rv" style={{ "--d": ".16s" }}>
          <p className="intro">{"Register online, or call "}<a href="tel:08062206330">080-6220-6330</a>{" for registration or seat allotment, Monday to Saturday, 9 am to 7 pm."}</p>
          <Button variant="link" id="allBatches" iconEnd="arrow">View all batches</Button>
        </div>
        {/* one horizontal carousel (user 2026-11-13): the tickets in a single scroll-snapping row (the .rail primitive, v25.css;
            sizes and arrows at the end of v49.css), turned by the arrows (components/ui/rail.js), a swipe, or ← → on the focused row */}
        <div className="rail rail--batch">
          <div className="cards rail__track" id="price" tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Upcoming batches">
            {BATCHES.map((b, i) => <Ticket key={b.full} b={b} i={i} />)}
          </div>
          <div className="rail__nav rv" style={{ "--d": ".24s" }}>
            <Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous batches" className="cbtn cbtn--prev" />
            <Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next batches" className="cbtn cbtn--next" />
          </div>
        </div>
      </section>
      <Dialog id="batchDlg" className="dlg dlg--cat" titleId="batchDlgH" title={`Admissions open: ${OPEN.length} programmes`} closeId="batchDlgX" listClass="dlg__ban" listId="batchList">
        {OPEN.map(([f, t]) => (
          <li key={f}>
            <a href="#contact" data-prog={t}>
              <img src={`/assets/img/banners/${f}.webp`} alt="" loading="lazy" />
              <span>{t}<img src="/assets/img/icons/arrow-list.svg" alt="" width="16" height="16" /></span>
            </a>
          </li>
        ))}
      </Dialog>
    </>
  );
}
