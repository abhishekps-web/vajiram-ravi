import Stylesheet from '@/components/ui/Stylesheet';
import { $, reduce } from '@/lib/site';

const STATS = [
  { fig: '50+', lines: ['Years of', 'experience'], at: 0 },
  { fig: '59', lines: ['Prelims questions', 'reflected'], at: 70 },
  { fig: '10/10', lines: ['Top rankers', 'trained'], at: 140 },
  { fig: '36/50', lines: ['CSE 2025', 'rankers'], at: 210 },
];

export default function HeroStats() {
  return (
    <>
      <Stylesheet href="/css/hero-stats.css" />
      <ul className="hx__stats is-pre" aria-label="Vajiram & Ravi at a glance">
        {STATS.map(({ fig, lines, at }) => (
          <li key={fig} className="hx__stat hx__in" style={{ '--at': `${at}ms` }}>
            <span className="hx__num">
              <b className="hx__fig" data-fig={fig}>{fig}</b>
              <span className="hx__fig hx__fig--room" aria-hidden="true">{fig}</span>
            </span>
            <span className="hx__stat-t">{lines.map((l, k) => <span key={l} className="hx__stat-l">{k ? ' ' : ''}{l}</span>)}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

const ROLL_MS = 700;
function rollUp(fig, at) {
  const m = fig.dataset.fig.match(/^(\D*)(\d+)(.*)$/);
  if (!m) return;
  const [, pre, num, post] = m, to = +num;
  fig.textContent = pre + '0' + post;
  setTimeout(() => {
    const t0 = performance.now();
    const step = now => {
      const p = Math.min(1, (now - t0) / ROLL_MS), eased = 1 - Math.pow(1 - p, 3);
      fig.textContent = pre + Math.round(to * eased) + post;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, at);
}

export function initHeroStats() {
  const row = $('.hx__stats');
  if (!row) return;
  const reveal = () => { row.classList.remove('is-pre'); row.classList.add('is-in'); };
  if (reduce) { reveal(); return; }

  const start = () => {
    reveal();
    row.querySelectorAll('.hx__stat').forEach(li => rollUp(li.querySelector('.hx__fig'), parseFloat(li.style.getPropertyValue('--at')) || 0));
  };
  if (document.documentElement.classList.contains('vrv-lock')) document.addEventListener('vr:intro-done', start, { once: true });
  else start();
}
