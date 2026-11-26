import Button from '@/components/ui/button';
import SectionWrapper from '@/components/ui/section-wrapper';
import SectionLabel from '@/components/ui/section-label';
import Tabs, { initTabs } from '@/components/ui/tabs';
import BatchCard from '@/components/ui/batch-card';
import '@/app/tailwind-sections.css';
import { ALL_BATCHES, BATCH_GROUPS, BATCHES_PAGE as P } from '@/lib/data/batches';
import { $, $$ } from '@/lib/site';

const fmt = (iso, opts) => new Intl.DateTimeFormat('en-IN', { timeZone: 'UTC', ...opts }).format(new Date(`${iso}T00:00:00Z`));
const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());

const LIST = ALL_BATCHES.filter(b => b.tgt === P.target && b.start >= today()).map(b => {
  const g = BATCH_GROUPS.find(x => x.match.test(b.link));
  return {
    key: `${b.start} ${b.name} ${b.link}`,
    start: b.start,
    g,
    m: b.start.slice(0, 7),
    year: b.start.slice(0, 4),
    card: { n: b.name, full: b.name, d: `${fmt(b.start, { day: 'numeric' })} ${fmt(b.start, { month: 'short' })}`, tgt: b.tgt },
  };
});
const MONTHS = [...new Set(LIST.map(b => b.m))];
const GROUPS = BATCH_GROUPS.filter(g => LIST.some(b => b.g === g));
const FIRST_YEAR = MONTHS[0]?.slice(0, 4);

const monthTab = m => fmt(`${m}-01`, m.startsWith(FIRST_YEAR) ? { month: 'short' } : { month: 'short', year: 'numeric' });
const count = n => `${n} ${n === 1 ? P.one : P.many}`;

const COURSE_TABS = [{ id: 'all', label: P.allCourses }, ...GROUPS.map(g => ({ id: g.id, label: g.t }))];
const MONTH_TABS = [{ id: 'all', label: P.allMonths }, ...MONTHS.map(m => ({ id: m, label: monthTab(m) }))];

const GRID = 'cu:grid cu:grid-cols-4 cu:gap-(--card-gap) cu:mt-[20px] cu:max-[1180px]:grid-cols-3 cu:max-[900px]:grid-cols-2 cu:max-[640px]:grid-cols-1 cu:max-[640px]:max-w-[420px] cu:max-[640px]:mx-auto';

export default function BatchesPage() {
  return (
    <SectionWrapper id="all-batches" labelledBy="allBatH" compact className="cu:text-center">
      <SectionLabel align="center">{P.eyebrow}</SectionLabel>
      <h1 id="allBatH" className="h2 h2--sec rv cu:mx-auto! cu:text-balance" style={{ '--d': '.08s' }}>{P.heading}</h1>
      <p className="intro rv cu:mx-auto! cu:text-balance" style={{ '--d': '.16s' }}>{P.intro}</p>
      <div className="rv cu:mt-(--hd-gap) cu:flex cu:max-w-full cu:flex-col cu:items-center cu:gap-[12px]" style={{ '--d': '.24s' }}>
        <Tabs id="batchCourse" items={COURSE_TABS} value="all" label={P.courseLabel} controls="batchGrid" className="cu:max-w-full" />
        <Tabs id="batchMonth" items={MONTH_TABS} value="all" label={P.monthLabel} controls="batchGrid" className="cu:max-w-full" />
        <p id="batchCount" aria-live="polite" className="cu:m-0 cu:[font:500_14px/1.4_var(--f)] cu:text-(--muted)">{count(LIST.length)}</p>
      </div>
      <div id="batchGrid" className="cu:mt-[28px] cu:grid cu:gap-[48px] cu:text-left cu:[&_[hidden]]:hidden!">
        {MONTHS.map(m => {
          const items = LIST.filter(b => b.m === m);
          return (
            <section key={m} data-month={m} aria-labelledby={`bm-${m}`}>
              <h2 id={`bm-${m}`} className="rv cu:m-0 cu:flex cu:items-baseline cu:justify-between cu:gap-3 cu:border-b-2 cu:border-(--line) cu:pb-[10px] cu:[font:500_28px/1.2_Newsreader,Georgia,serif] cu:text-(--ink) cu:max-[640px]:text-[24px]">
                {fmt(`${m}-01`, { month: 'long', year: 'numeric' })}
                <span data-count className="cu:[font:500_14px/1_var(--f)] cu:text-(--muted)">{count(items.length)}</span>
              </h2>
              <div className={GRID}>
                {items.map(b => (
                  <div key={b.key} data-group={b.g.id} data-start={b.start} className="cu:flex cu:[&>article]:w-full">
                    <BatchCard b={b.card} fam={b.g} year={b.year} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <p id="batchEmpty" hidden className="cu:mx-auto cu:mt-[24px] cu:max-w-[520px] cu:[font:500_16px/1.5_var(--f)] cu:text-(--muted)">{P.empty}</p>
      <div className="rv cu:mt-[40px] cu:flex cu:justify-center" style={{ '--d': '.1s' }}>
        <Button variant="secondary" href="/" iconStart="arrow-left">{P.back}</Button>
      </div>
    </SectionWrapper>
  );
}

export function initBatchesPage() {
  const grid = $('#batchGrid');
  const courseBar = $('#batchCourse')?.closest('.tabs'), monthBar = $('#batchMonth')?.closest('.tabs');
  if (!grid || !courseBar || !monthBar) return;
  const now = today();
  $$('#batchGrid [data-start]').forEach(c => { if (c.dataset.start < now) c.remove(); });
  $$('#batchGrid > section').forEach(sec => { if (!sec.querySelector('[data-start]')) sec.remove(); });
  const live = $$('#batchGrid [data-start]');
  $$('#batchCourse [data-tab]').forEach(t => { t.hidden = t.dataset.tab !== 'all' && !live.some(c => c.dataset.group === t.dataset.tab); });
  $$('#batchMonth [data-tab]').forEach(t => { t.hidden = t.dataset.tab !== 'all' && !$(`#batchGrid > section[data-month="${t.dataset.tab}"]`); });
  const pick = { group: 'all', month: 'all' };
  const tally = () => {
    let total = 0;
    $$('#batchGrid > section').forEach(sec => {
      let n = 0;
      if (pick.month === 'all' || sec.dataset.month === pick.month) {
        sec.querySelectorAll('[data-group]').forEach(c => {
          c.hidden = pick.group !== 'all' && c.dataset.group !== pick.group;
          if (!c.hidden) n++;
        });
      }
      sec.hidden = n === 0;
      sec.querySelector('[data-count]').textContent = count(n);
      total += n;
    });
    $('#batchCount').textContent = count(total);
    $('#batchEmpty').hidden = total > 0;
  };
  const apply = () => {
    tally();
    $$('#batchGrid > section:not([hidden]) > .rise').forEach(g => {
      const cards = [...g.children].filter(c => !c.hidden);
      cards.forEach((c, i) => { c.style.setProperty('--i', Math.min(i, 8)); c.style.transition = 'none'; });
      g.classList.remove('in');
      void g.offsetWidth;
      cards.forEach(c => { c.style.transition = ''; });
      requestAnimationFrame(() => g.classList.add('in'));
    });
  };
  tally();
  initTabs(courseBar, { onSelect: id => { pick.group = id; apply(); } });
  initTabs(monthBar, { onSelect: id => { pick.month = id; apply(); } });
}
