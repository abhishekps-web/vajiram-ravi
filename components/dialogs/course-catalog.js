// Course catalogue dialog (#courseDlg, v18's interaction): lists a category's courses (or all of them);
// each course links to the counsellor form with that course pre-selected.
import { $, esc, ico } from '@/lib/site';
import { CATS, stageFor } from '@/lib/data/courses';
import { setMega, setDrawer } from '@/components/layout/NavigationBar/nav-menus';

let courseDlg;
const ALL = CATS.reduce((n, c) => n + c.courses.length, 0);
const showCat = i => {
  $('#courseDlgH').textContent = i < 0 ? `All ${ALL} courses` : CATS[i].t;
  const list = i < 0 ? CATS.flatMap((c, k) => c.courses.map(n => [n, k])) : CATS[i].courses.map(n => [n, i]);
  $('#courseList').innerHTML = list.map(([n, k]) => `<li><a href="#contact" data-prog="${esc(n)}"><span>${esc(n)}<small>${esc(CATS[k].t)} · ${esc(stageFor(k))}</small></span>${ico('arrow-list.svg')}</a></li>`).join('');
  $('#courseList').scrollTop = 0;
};

// open the catalogue on category i (-1: every course), closing the nav menus first
export const openCat = i => { setMega(false); setDrawer(false); showCat(i); if (!courseDlg.open) courseDlg.showModal(); };

export function initCourseCatalog() {
  courseDlg = $('#courseDlg');
  $('#courseDlgX').addEventListener('click', () => courseDlg.close());
  courseDlg.addEventListener('click', e => { if (e.target === courseDlg || e.target.closest('[data-prog]')) courseDlg.close(); });
  // any [data-cat] link on the page (the nav's All courses menu, the GS "View GS courses" button, the results cards) opens the
  // catalogue on that category (this lived in the old Programmes behaviour, which the ported section replaced, 2026-11-13)
  document.addEventListener('click', e => { const a = e.target.closest('[data-cat]'); if (!a) return; e.preventDefault(); openCat(+a.dataset.cat); });
}
