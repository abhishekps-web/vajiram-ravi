'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Button from '@/components/ui/button';
import SectionWrapper from '@/components/ui/section-wrapper';
import BatchCard from '@/components/ui/batch-card';
import FilterBar from '@/components/ui/filter-bar';
import { MEDIUMS } from '@/lib/data/course-finder';
import '@/app/tailwind-sections.css';

const fmt = (iso, opts) => new Intl.DateTimeFormat('en-IN', { timeZone: 'UTC', ...opts }).format(new Date(`${iso}T00:00:00Z`));
const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
const GRID = 'cu:grid cu:grid-cols-4 cu:gap-(--card-gap) cu:mt-[20px] cu:max-[1180px]:grid-cols-3 cu:max-[900px]:grid-cols-2 cu:max-[640px]:grid-cols-1 cu:max-[640px]:max-w-[420px] cu:max-[640px]:mx-auto';

export default function BatchesPage({ items, groups, copy: P }) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('all');
  const [month, setMonth] = useState('all');
  const [medium, setMedium] = useState('all');
  const [now, setNow] = useState(null);
  const first = useRef(true);

  useEffect(() => { setNow(today()); }, []);

  const months = useMemo(() => [...new Set(items.map(b => b.start.slice(0, 7)))], [items]);
  const live = useMemo(() => (now ? items.filter(b => b.start >= now) : items), [items, now]);
  const terms = useMemo(() => query.toLowerCase().split(/\s+/).filter(Boolean), [query]);
  const shown = b => live.includes(b)
    && (group === 'all' || b.group.id === group)
    && (month === 'all' || b.start.startsWith(month))
    && (medium === 'all' || b.medium === medium)
    && terms.every(w => `${b.name} ${b.group.t}`.toLowerCase().includes(w));
  const count = items.filter(shown).length;
  const label = n => `${n} ${n === 1 ? P.one : P.many}`;

  const liveMonths = months.filter(m => live.some(b => b.start.startsWith(m)));
  const firstYear = liveMonths[0]?.slice(0, 4);
  const filters = [
    { label: P.courseLabel, value: group, onChange: setGroup, items: [{ id: 'all', label: P.allCourses }, ...groups.filter(g => live.some(b => b.group.id === g.id)).map(g => ({ id: g.id, label: g.t }))] },
    { label: P.monthLabel, value: month, onChange: setMonth, items: [{ id: 'all', label: P.allMonths }, ...liveMonths.map(m => ({ id: m, label: fmt(`${m}-01`, m.startsWith(firstYear) ? { month: 'long' } : { month: 'long', year: 'numeric' }) }))] },
    { label: P.mediumLabel, value: medium, onChange: setMedium, items: MEDIUMS.filter(o => o.id === 'all' || live.some(b => b.medium === o.id)) },
  ];
  const clearAll = () => { setGroup('all'); setMonth('all'); setMedium('all'); setQuery(''); };

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    document.querySelectorAll('#batchGrid > section:not([hidden]) > .rise').forEach(g => {
      const cards = [...g.children].filter(c => !c.hidden);
      cards.forEach((c, i) => { c.style.setProperty('--i', Math.min(i, 8)); c.style.transition = 'none'; });
      g.classList.remove('in');
      void g.offsetWidth;
      cards.forEach(c => { c.style.transition = ''; });
      requestAnimationFrame(() => g.classList.add('in'));
    });
  }, [group, month, medium, query]);

  return (
    <>
      <FilterBar query={query} onQuery={setQuery} searchLabel={P.searchLabel} filters={filters} count={count} noun={[P.one, P.many]} />
      <SectionWrapper id="all-batches" aria-label={P.listLabel} tight>
        <div id="batchGrid" className="cu:grid cu:gap-[48px] cu:text-left cu:[&_[hidden]]:hidden!">
          {months.map(m => {
            const inMonth = items.filter(b => b.start.startsWith(m));
            const n = inMonth.filter(shown).length;
            return (
              <section key={m} data-month={m} aria-labelledby={`bm-${m}`} hidden={n === 0}>
                <h2 id={`bm-${m}`} className="rv cu:m-0 cu:flex cu:items-baseline cu:justify-between cu:gap-3 cu:border-b-2 cu:border-(--line) cu:pb-[10px] cu:[font:500_28px/1.2_Newsreader,Georgia,serif] cu:text-(--ink) cu:max-[640px]:text-[24px]">
                  {fmt(`${m}-01`, { month: 'long', year: 'numeric' })}
                  <span className="cu:[font:500_14px/1_var(--f)] cu:text-(--muted)">{label(n)}</span>
                </h2>
                <div className={GRID}>
                  {inMonth.map(b => (
                    <div key={b.key} data-group={b.group.id} hidden={!shown(b)} className="cu:flex cu:[&>article]:w-full">
                      <BatchCard b={{ n: b.name, full: b.name, d: `${fmt(b.start, { day: 'numeric' })} ${fmt(b.start, { month: 'short' })}`, tgt: b.tgt }} fam={b.group} year={b.start.slice(0, 4)} />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
        {count === 0 && <p className="cf-none">{P.empty} <button type="button" className="cf-clear" onClick={clearAll}>Clear filters</button></p>}
        <div className="rv cu:mt-[40px] cu:flex cu:justify-center" style={{ '--d': '.1s' }}>
          <Button variant="secondary" href="/" iconStart="arrow-left">{P.back}</Button>
        </div>
      </SectionWrapper>
    </>
  );
}
