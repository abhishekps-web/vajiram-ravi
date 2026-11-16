'use client';
// The hero banner types (/hero-banners): ten carousel ideas for the homepage hero, to compare and pick from. A = toppers,
// B = course highlights, C = both. Each is a self-contained carousel on the shared engine (./carousel.jsx), with its content
// from ./data.js and its look in public/css/hero-banners.css (one block per type, `.hb--a1` …).
// Pattern: a slide's text is rendered for the current slide only and keyed by it, so its lines rise in again on each change
// (.hb-ln, staggered by --k); pictures are all rendered and stacked, and CSS moves them by their data-pos (on / out / before /
// after). Slides that hold links are `inert` while they are not shown.
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button/Button';
import { useCarousel, Timer, Arrows, Indicators } from './carousel';
import { TOP10, ALL_TOPPERS, COURSES, PAIRS, NEXT_BATCHES, PLAYLIST, STAGES, toppersFor } from './data';

const ln = (k, cls = '') => ({ className: `${cls} hb-ln`.trim(), style: { '--k': k } });
const live = c => (c.playing ? 'off' : 'polite');
const carousel = label => ({ role: 'region', 'aria-roledescription': 'carousel', 'aria-label': label });
const pad = n => String(n).padStart(2, '0');

/* ---------- shared pieces ---------- */

function CourseCopy({ course, onDark = false, k0 = 0 }) {
  return (
    <>
      <p {...ln(k0, `hb-tag ${onDark ? 'hb-tag--dark' : ''}`)}>{course.tag}</p>
      <h3 {...ln(k0 + 1, "hb-h")}>{course.name}</h3>
      <p {...ln(k0 + 2, "hb-p")}>{course.line}</p>
      <ul {...ln(k0 + 3, "hb-meta")}>
        {course.meta.map(m => <li key={m}>{m}</li>)}
        {course.batch && <li><b>Next batch {course.batch.d}</b></li>}
      </ul>
      <div {...ln(k0 + 4, "hb-btns")}>
        <Button onDark={onDark} href="/#contact" iconEnd="arrow">Enrol now</Button>
        <Button variant="link" onDark={onDark} href={course.href} iconEnd="arrow">View course</Button>
      </div>
    </>
  );
}

function Portrait({ t, className = '', eager = false }) {
  return <img className={className} src={t.photo} alt="" width="768" height="768" loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}

/** days until a date, worked out in the browser (the server's clock must not decide it) */
function useDaysTo(date) {
  const [d, setD] = useState(null);
  useEffect(() => { setD(Math.max(0, Math.ceil((date - new Date()) / 864e5))); }, [date]);
  return d;
}

/* ---------- A. Toppers ---------- */

/** A1 Rank reveal: one topper per slide, the cut-out rising in front of a huge outlined rank number. */
export function RankReveal() {
  const c = useCarousel(TOP10.length, { interval: 5000 });
  const t = TOP10[c.i];
  return (
    <div className="hb hb--dark hb--a1" {...c.bind} {...carousel('CSE 2025 rank holders')}>
      <div className="a1__art" aria-hidden="true">
        {TOP10.map((p, k) => (
          <div key={p.rank} className="a1__fig" data-pos={c.pos(k)}>
            <span className="a1__num">{p.rank}</span>
            <Portrait t={p} className="a1__ph" eager={k < 2} />
          </div>
        ))}
      </div>
      <div className="hb-copy a1__copy" key={c.i} aria-live={live(c)}>
        <p {...ln(0, "hb-k hb-k--dark")}>UPSC CSE 2025 · All India Rank</p>
        <p {...ln(1, "a1__air")}><small>AIR</small>{pad(t.rank)}</p>
        <h3 {...ln(2, "hb-h")}>{t.name}</h3>
        <p {...ln(3, "hb-p")}>Prepared with our <b>{t.took}</b>.</p>
      </div>
      <div className="hb-btns a1__btns">
        <Button onDark href="/#toppers" iconEnd="arrow">See all 2025 results</Button>
        <Button variant="link" onDark href="/#contact" iconEnd="arrow">Talk to a counsellor</Button>
      </div>
      <div className="hb-foot"><Indicators c={c} onDark /><Arrows c={c} onDark /></div>
      <Timer c={c} />
    </div>
  );
}

/** A2 Line-up with a spotlight: the ten stand in a row; one at a time steps forward in colour, its caption under the row. */
export function Lineup() {
  const c = useCarousel(TOP10.length, { interval: 4000 });
  const t = TOP10[c.i];
  return (
    <div className="hb hb--light hb--a2" {...c.bind} {...carousel('CSE 2025 top ten')}>
      <div className="a2__head">
        <p className="hb-k">UPSC CSE 2025</p>
        <h3 className="hb-h">10 of the top 10 rank holders prepared at Vajiram &amp; Ravi</h3>
      </div>
      <div className="a2__stage">
        <ul className="a2__row" style={{ '--i': c.i }}>
          {TOP10.map((p, k) => (
            <li key={p.rank} className="a2__p" data-pos={k === c.i ? 'on' : 'off'} style={{ '--n': k }}>
              <button type="button" className="a2__b" onClick={() => c.go(k)} aria-label={`AIR ${p.rank}, ${p.name}`} aria-pressed={k === c.i}>
                <Portrait t={p} className="a2__ph" eager />
                <span className="a2__rk">{p.rank}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="a2__cap" key={c.i} aria-live={live(c)}>
        <p {...ln(0, "a2__name")}><b>AIR {t.rank}</b> {t.name}</p>
        <p {...ln(1, "a2__took")}>{t.took}</p>
      </div>
      <div className="hb-foot">
        <div className="hb-btns"><Button href="/#toppers" iconEnd="arrow">Meet our toppers</Button></div>
        <Arrows c={c} />
      </div>
      <Timer c={c} />
    </div>
  );
}

/** A3 Results marquee + featured topper: every rank holder scrolls past as a chip; one is featured above, any chip features its own. */
export function Marquee() {
  const c = useCarousel(ALL_TOPPERS.length, { interval: 4500 });
  const t = ALL_TOPPERS[c.i];
  const chips = (copy) => ALL_TOPPERS.map((p, k) => (
    <li key={`${copy}${p.rank}`}>
      <button type="button" className="a3__chip" data-on={k === c.i || undefined} onClick={() => c.go(k)} tabIndex={copy ? -1 : 0}
        aria-hidden={copy ? true : undefined} aria-label={copy ? undefined : `AIR ${p.rank}, ${p.name}`}>
        <img src={p.photo} alt="" width="40" height="40" loading="lazy" decoding="async" />
        <b>AIR {p.rank}</b><span>{p.first}</span>
      </button>
    </li>
  ));
  return (
    <div className="hb hb--brand hb--a3" {...c.bind} {...carousel('CSE 2025 rank holders')}>
      <div className="a3__feat">
        <div className="a3__frame" aria-hidden="true">
          {ALL_TOPPERS.map((p, k) => <img key={p.rank} className="a3__ph" data-pos={c.pos(k)} data-cut={p.rank <= 10 || undefined}
            src={p.photo} alt="" width="768" height="768" loading={k < 2 ? 'eager' : 'lazy'} decoding="async" />)}
        </div>
        <div className="hb-copy" key={c.i} aria-live={live(c)}>
          <p {...ln(0, "hb-k hb-k--dark")}>{ALL_TOPPERS.length} rank holders in the top 50 · CSE 2025</p>
          <p {...ln(1, "a3__air")}>AIR {t.rank}</p>
          <h3 {...ln(2, "hb-h")}>{t.name}</h3>
          <p {...ln(3, "hb-p")}>{t.programmes.join(' · ')}</p>
          <div {...ln(4, "hb-btns")}><Button onDark href="/#toppers" iconEnd="arrow">See all results</Button></div>
        </div>
        <div className="a3__ctl"><span className="a3__count" aria-hidden="true">{pad(c.i + 1)} / {c.n}</span><Arrows c={c} onDark /></div>
      </div>
      <div className="a3__marq">
        <ul className="a3__track">{chips('')}{chips('b')}</ul>
      </div>
      <Timer c={c} />
    </div>
  );
}

/** A4 Topper card stack: the current topper's card in front, the next two fanned out behind it; a change deals the front card away. */
export function ToppersStack() {
  const c = useCarousel(TOP10.length, { interval: 5000 });
  const t = TOP10[c.i];
  return (
    <div className="hb hb--light hb--a4" {...c.bind} {...carousel('CSE 2025 rank holders')}>
      <div className="hb-copy a4__copy" key={c.i} aria-live={live(c)}>
        <p {...ln(0, "hb-k")}>Toppers from Vajiram &amp; Ravi · CSE 2025</p>
        <h3 {...ln(1, "hb-h hb-h--xl")}>{t.name}</h3>
        <p {...ln(2, "hb-p")}>All India Rank {t.rank}, prepared with our {t.took}.</p>
        <div {...ln(3, "hb-btns")}><Button href="/#toppers" iconEnd="arrow">See all results</Button></div>
      </div>
      <div className="a4__deck" aria-hidden="true">
        {TOP10.map((p, k) => {
          const o = (k - c.i + c.n) % c.n;
          return (
            <div key={p.rank} className="a4__card" data-o={o <= 2 ? o : 'h'} data-out={(k === c.prev && c.dir === 1) || undefined}>
              <Portrait t={p} className="a4__ph" eager={k < 3} />
              <span className="a4__rk"><small>AIR</small>{p.rank}</span>
              <span className="a4__nm">{p.name}</span>
            </div>
          );
        })}
      </div>
      <div className="hb-foot"><Indicators c={c} kind="dots" /><Arrows c={c} /></div>
      <Timer c={c} />
    </div>
  );
}

/* ---------- B. Courses ---------- */

const SPOT = COURSES.filter(x => ['gs', 'gs2', 'pre', 'mains', 'int'].includes(x.key));

/** B1 Course spotlight: one programme per slide, its copy on the left and its photo wiping in on the right. */
export function CourseSpotlight() {
  const c = useCarousel(SPOT.length);
  return (
    <div className="hb hb--jaali hb--b1" {...c.bind} {...carousel('Programmes')}>
      <div className="hb-copy b1__copy" key={c.i} aria-live={live(c)}><CourseCopy course={SPOT[c.i]} /></div>
      <div className="b1__media" aria-hidden="true">
        {SPOT.map((x, k) => (
          <div key={x.key} className="b1__img" data-pos={c.pos(k)}>
            <img src={x.img} alt="" style={{ objectPosition: x.pos }} loading={k ? 'lazy' : 'eager'} decoding="async" />
          </div>
        ))}
      </div>
      <div className="hb-foot"><Indicators c={c} labels={SPOT.map(x => x.name.split(' ').slice(0, 2).join(' '))} /><Arrows c={c} /></div>
      <Timer c={c} />
    </div>
  );
}

/** B2 Course tabs by stage: a full photo per stage, the stages as tabs along the bottom that fill while they are shown. */
export function StageTabs() {
  const c = useCarousel(STAGES.length, { interval: 6500 });
  return (
    <div className="hb hb--dark hb--b2" {...c.bind} {...carousel('Programmes by stage')}>
      <div className="b2__bg" aria-hidden="true">
        {STAGES.map((x, k) => <img key={x.key} data-pos={c.pos(k)} src={x.img} alt="" style={{ objectPosition: x.pos }} loading={k ? 'lazy' : 'eager'} decoding="async" />)}
      </div>
      <div className="hb-copy b2__copy" key={c.i} aria-live={live(c)}>
        <p {...ln(0, "hb-k hb-k--dark")}>Your stage: {STAGES[c.i].stage}</p>
        <CourseCopy course={STAGES[c.i]} onDark k0={1} />
      </div>
      <Indicators c={c} onDark className="b2__tabs" labels={STAGES.map(x => x.stage)} />
      <Arrows c={c} onDark className="b2__arrows" />
      <Timer c={c} />
    </div>
  );
}

/** B3 Upcoming batch countdown: the next batches listed by date; the chosen one is dealt as a ticket with its countdown. */
export function BatchCountdown() {
  const c = useCarousel(NEXT_BATCHES.length, { interval: 5000 });
  const b = NEXT_BATCHES[c.i];
  const days = useDaysTo(b.date);
  return (
    <div className="hb hb--jaali hb--b3" {...c.bind} {...carousel('Upcoming batches')}>
      <div className="b3__list">
        <p className="hb-k">Upcoming batches · {b.date.getFullYear()}</p>
        <h3 className="hb-h">Seats are filling for the 2027 attempt</h3>
        <ol>
          {NEXT_BATCHES.map((x, k) => (
            <li key={x.full}>
              <button type="button" className="b3__row" aria-pressed={k === c.i} onClick={() => c.go(k)} style={{ '--fam': x.fam.c }}>
                <span className="b3__d"><b>{x.day}</b>{x.mon}</span><span className="b3__n">{x.n}</span>
                {x.chip && <span className="b3__chip">{x.chip}</span>}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="b3__stage">
        <article className="b3__ticket" key={c.i} style={{ '--fam': b.fam.c }} aria-live={live(c)}>
          <header className="b3__head">
            <p className="b3__fam">{b.fam.t} · {b.tgt}</p>
            <p className="b3__date"><b>{b.day}</b> {b.mon}</p>
            <p className="b3__cd">{days == null ? ' ' : <>Starts in <b>{days}</b> days</>}</p>
          </header>
          <div className="b3__body">
            {b.chip && <p className="b3__seat">{b.chip}</p>}
            <h4 className="b3__t">{b.full}</h4>
            <p className="hb-p">{b.what}</p>
            <Button href="/#contact" iconEnd="arrow" fullWidth>Reserve a seat</Button>
          </div>
        </article>
        <p className="hb-note">Dates are the Batches section’s, still to be confirmed.</p>
      </div>
      <div className="hb-foot b3__foot"><Arrows c={c} /></div>
      <Timer c={c} />
    </div>
  );
}

/* ---------- C. Toppers + courses ---------- */

/** C1 "Their course could be yours": a topper on the left, the course they took on the right; the card flips to the next course. */
export function TopperCourse() {
  const c = useCarousel(PAIRS.length, { interval: 6500 });
  const { topper: t, course: x } = PAIRS[c.i];
  return (
    <div className="hb hb--split hb--c1" {...c.bind} {...carousel('Toppers and their courses')}>
      <div className="c1__who">
        <div className="c1__art" aria-hidden="true">
          {PAIRS.map((p, k) => (
            <div key={p.topper.rank} className="c1__fig" data-pos={c.pos(k)}><Portrait t={p.topper} className="c1__ph" eager={k < 2} /></div>
          ))}
        </div>
        <div className="c1__id" key={c.i}>
          <p {...ln(0, "c1__air")}>AIR {t.rank} · CSE 2025</p>
          <p {...ln(1, "c1__name")}>{t.name}</p>
        </div>
      </div>
      <div className="c1__course">
        <p className="hb-k">Their course could be yours</p>
        <div className="c1__card" key={c.i} aria-live={live(c)}>
          <p className="c1__took">{t.first} took</p>
          <CourseCopy course={x} />
        </div>
        <div className="hb-foot"><Indicators c={c} labels={PAIRS.map(p => `AIR ${p.topper.rank}`)} /><Arrows c={c} /></div>
      </div>
      <Timer c={c} />
    </div>
  );
}

const WITH_TOPPERS = COURSES.filter(x => ['gs', 'pre', 'mains', 'opt', 'int'].includes(x.key)).map(x => ({ ...x, toppers: toppersFor(x) }));

/** C2 Course first, with its toppers: each course shows the faces of the rank holders who took it; a face shows who they are. */
export function CourseToppers() {
  const c = useCarousel(WITH_TOPPERS.length, { interval: 7000 });
  const x = WITH_TOPPERS[c.i];
  const shown = x.toppers.slice(0, 8);
  return (
    <div className="hb hb--light hb--c2" {...c.bind} {...carousel('Programmes and their toppers')}>
      <div className="hb-copy c2__copy" key={c.i} aria-live={live(c)}>
        <CourseCopy course={x} />
        <div {...ln(5, "c2__pile")}>
          <ul>
            {shown.map((t, k) => (
              <li key={t.rank} style={{ '--n': k }}>
                <button type="button" className="c2__face" aria-label={`AIR ${t.rank}, ${t.name}`}>
                  <img src={t.photo} alt="" width="48" height="48" loading="lazy" decoding="async" />
                  <span className="c2__tip" aria-hidden="true">AIR {t.rank} · {t.name}</span>
                </button>
              </li>
            ))}
            {x.toppers.length > shown.length && <li className="c2__more">+{x.toppers.length - shown.length}</li>}
          </ul>
          <p><b>{x.toppers.length}</b> of our CSE 2025 rank holders took this</p>
        </div>
      </div>
      <div className="c2__media" aria-hidden="true">
        {WITH_TOPPERS.map((y, k) => <img key={y.key} data-pos={c.pos(k)} src={y.img} alt="" style={{ objectPosition: y.pos }} loading={k ? 'lazy' : 'eager'} decoding="async" />)}
      </div>
      <div className="hb-foot"><Indicators c={c} labels={WITH_TOPPERS.map(y => y.stage)} /><Arrows c={c} /></div>
      <Timer c={c} />
    </div>
  );
}

/** C3 Mixed playlist: a planned order of different slides (results, a course, a topper with their course …), one transition. */
export function Playlist() {
  const c = useCarousel(PLAYLIST.length, { interval: 6500 });
  return (
    <div className="hb hb--jaali hb--c3" {...c.bind} {...carousel('Highlights')}>
      <div className="c3__slides">
        {PLAYLIST.map((s, k) => (
          <div key={k} className={`c3__s c3__s--${s.kind}`} data-pos={c.pos(k)} inert={k !== c.i || undefined} aria-hidden={k !== c.i || undefined}>
            {s.kind === 'results' && (
              <>
                <div className="hb-copy">
                  <p className="hb-k">UPSC CSE 2025 results</p>
                  <p className="c3__big"><b>10</b>/10</p>
                  <h3 className="hb-h">of the top 10 rank holders prepared at Vajiram &amp; Ravi</h3>
                  <div className="hb-btns"><Button href="/#toppers" iconEnd="arrow">See the results</Button></div>
                </div>
                <ul className="c3__faces">{TOP10.map((t, n) => <li key={t.rank} style={{ '--n': n }}><Portrait t={t} eager={n < 4} /></li>)}</ul>
              </>
            )}
            {s.kind === 'course' && (
              <>
                <div className="hb-copy"><CourseCopy course={s.course} /></div>
                <div className="c3__img"><img src={s.course.img} alt="" style={{ objectPosition: s.course.pos }} loading="lazy" decoding="async" /></div>
              </>
            )}
            {s.kind === 'pair' && (
              <>
                <div className="c3__who"><Portrait t={s.pair.topper} /><p><b>AIR {s.pair.topper.rank}</b>{s.pair.topper.name}</p></div>
                <div className="hb-copy"><p className="c1__took">{s.pair.topper.first} took</p><CourseCopy course={s.pair.course} /></div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="hb-foot c3__foot"><Indicators c={c} labels={PLAYLIST.map(s => s.label)} /><Arrows c={c} /></div>
      <Timer c={c} />
    </div>
  );
}
