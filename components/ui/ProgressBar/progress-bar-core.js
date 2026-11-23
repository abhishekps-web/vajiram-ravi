export function createProgressBar({ className, duration, track = false } = {}) {
  const el = document.createElement('i');
  el.className = ['pbar', track && 'pbar--track', className].filter(Boolean).join(' ');
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<b></b>';
  if (duration) el.style.setProperty('--pb-t', duration);
  return el;
}

export function runProgressBar(el, duration) {
  if (duration) el.style.setProperty('--pb-t', duration);
  el.classList.remove('is-run', 'is-paused');
  void el.offsetWidth;
  el.classList.add('is-run');
}

export function pauseProgressBar(el) { el.classList.add('is-paused'); }
export function resumeProgressBar(el) { el.classList.remove('is-paused'); }
export function resetProgressBar(el) { el.classList.remove('is-run', 'is-paused'); }
