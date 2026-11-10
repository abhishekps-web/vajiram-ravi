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
