/* Toppers newspaper (/v5 "The Aspirant's Chronicle"): the year chips. CSE 2025 is the static front page in index.html; any earlier
   year swaps in a grid of that year's top 10 (+ a "More from CSE <year>" list), as in my-app RecipeToppersPaper.tsx. Data: js/data/toppers-archive.js. */
(() => {
  const sec = document.getElementById('toppers'), data = window.NP_ARCHIVE;
  if (!sec || !data) return;
  const $ = s => sec.querySelector(s), $$ = s => [...sec.querySelectorAll(s)];
  const YEARS = data.ARCHIVE_YEARS, latest = YEARS[0];
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // same card IA as the CSE 2025 front page: photo, rule, "All India Rank N", name, "Prepared with A · B" (when the official list names programmes)
  const progs = s => s.split(/,(?![^(]*\))/).map(x => x.trim()).filter(Boolean).join(' · ');
  const card = (t, small) => `<li class="rs-yv-card${small ? ' is-small' : ''}"><div class="rs-yv-photo">${t.img
    ? `<img class="np-fill" src="${esc(t.img)}" alt="${esc(t.name)}, AIR ${t.rank}" loading="lazy" decoding="async">`
    : `<span class="rs-yv-ini">${esc(t.name.charAt(0))}</span>`}</div><div class="np-cap"><p class="rs-paper-kicker">All India Rank ${t.rank}</p><p class="np-cap-name">${esc(t.name)}</p>${t.programmes ? `<p class="rs-paper-caption">Prepared with ${esc(progs(t.programmes))}</p>` : ''}</div></li>`;
  const more = y => {
    const m = (data.ARCHIVE[y] || []).filter(t => t.rank > 10);
    if (!m.length) return '';
    return `<details class="rs-yv-more"><summary>More from CSE ${y} · AIR ${m[0].rank} to ${m[m.length - 1].rank} <span>(${m.length})</span></summary><ul class="rs-yv-grid is-small">${m.map(t => card(t, true)).join('')}</ul></details>`;
  };
  const yearView = y => {
    const all = data.ARCHIVE[y] || [], top10 = all.filter(t => t.rank <= 10);
    return `<div id="np-top3" class="rs-yv"><div class="rs-yv-head"><h3>UPSC CSE ${y}</h3><p>${top10.length} ${top10.length === 1 ? 'topper' : 'toppers'} in the top 10 · ${all.length} listed in all</p></div><ul class="rs-yv-grid">${top10.map(t => card(t)).join('')}</ul>${more(y)}</div>`;
  };

  const latestBox = $('#npLatest'), yearBox = $('#npYearView'), deck = $('#npDeck'), chips = $('#npYears');
  const deckLatest = deck.innerHTML;
  $('#npMoreLatest').innerHTML = more(latest);
  chips.innerHTML = YEARS.map(y => `<button type="button" data-y="${y}" aria-pressed="${y === latest}"${y === latest ? ' class="is-on"' : ''}>${y}</button>`).join('');

  const show = y => {
    const isLatest = y === latest;
    $$('#npYears button').forEach(b => { const on = +b.dataset.y === y; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
    latestBox.hidden = !isLatest;
    yearBox.hidden = isLatest;
    yearBox.innerHTML = isLatest ? '' : yearView(y);
    // only one element may carry id="np-top3": the static one while 2025 shows, the year view's otherwise
    $('#npLatest .rs-np-top3').id = isLatest ? 'np-top3' : '';
    $$('[data-np-latest]').forEach(a => { a.hidden = !isLatest; });
    const yl = $('[data-np-year]'); yl.hidden = isLatest; yl.textContent = `CSE ${y}`;
    deck.innerHTML = isLatest ? deckLatest : `Toppers of the Civil Services Examination ${y} who prepared with Vajiram &amp; Ravi`;
  };
  chips.addEventListener('click', e => { const b = e.target.closest('button[data-y]'); if (b) show(+b.dataset.y); });
})();

/* Press-run reveal for the Toppers paper (styles at the end of css/toppers.css). Each group fades and rises in as it reaches the screen,
   its items staggered; portraits get a paper wipe and an AIR seal stamp; the "In numbers" figures count up. Skipped for reduced motion. */
(() => {
  const sec = document.getElementById('toppers');
  if (!sec || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const GROUPS = [
    ['.rs-np-mast', '.rs-paper-folio > span, .np-mast-name, .np-mast-hi, .rs-np-nav a'],
    ['.rs-np-banner', '#npH', 'np-head'],
    ['.rs-np-banner', '#npDeck'],
    ['.rs-yr', '.rs-yr-label, .rs-yr-note'],
    ['.rs-yr', '#npYears button', 'np-pop'],
    ['.rs-np-top3', '.rs-np-hero'],
    ['.rs-np-article', '.rs-np-article > .rs-paper-kicker, .np-story-h, .rs-paper-by, .rs-np-cols > p'],
    ['.rs-np-rail', '.rs-paper-box, .rs-paper-stat, .rs-paper-ad'],
    ['#np-rest', '#np-rest > *'],
    ['.rs-np-rest', '.rs-np-rest > li'],
    ['#npMoreLatest', '#npMoreLatest > *'],
    ['#np-brief', '#np-brief > *'],
    ['.rs-np-brief', '.rs-np-brief > li'],
    ['.rs-np-end', '.rs-np-end > *']
  ];
  const groups = new Map();
  GROUPS.forEach(([box, items, extra]) => {
    const el = sec.querySelector(box); if (!el) return;
    const list = [...sec.querySelectorAll(items)].filter(n => el.contains(n) || n === el);
    list.forEach((n, i) => { n.classList.add('np-r'); if (extra) n.classList.add(extra); n.style.setProperty('--i', (groups.get(el) || []).length + i); });
    groups.set(el, (groups.get(el) || []).concat(list));
  });

  // "In numbers": count up once (10/10 from 0, 9 from 0, 1976 from 1926)
  const count = el => {
    const m = el.textContent.match(/^(\d+)(.*)$/); if (!m) return;
    const end = +m[1], rest = m[2], start = end > 999 ? end - 50 : 0, t0 = performance.now(), dur = 1100;
    const step = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(start + (end - start) * e) + rest; if (p < 1) requestAnimationFrame(step); };
    el.textContent = start + rest; requestAnimationFrame(step);
  };

  sec.classList.add('np-anim');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    (groups.get(e.target) || []).forEach(n => n.classList.add('is-in'));
    if (e.target.matches('.rs-np-rail')) e.target.querySelectorAll('.np-stat-n').forEach((n, i) => setTimeout(() => count(n), 200 + i * 120));
  }), { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
  groups.forEach((_, el) => io.observe(el));

  // a year view swapped in by the chips: stagger its cards
  const yearBox = document.getElementById('npYearView');
  if (yearBox) new MutationObserver(() => {
    const v = yearBox.querySelector('.rs-yv'); if (!v || v.classList.contains('is-swap')) return;
    v.querySelectorAll('.rs-yv-card').forEach((c, i) => c.style.setProperty('--i', Math.min(i, 14)));
    v.classList.add('is-swap');
  }).observe(yearBox, { childList: true });
})();
