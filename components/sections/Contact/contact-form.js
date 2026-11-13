// Contact: the counsellor form. Its programme list (every catalogue course and upcoming batch), the site's own dropdowns,
// pre-selecting a programme from any [data-prog] link, validation, and sending to form[data-endpoint].
import { $, $$, esc, PHONE } from '@/lib/site';
import { CATS } from '@/lib/data/courses';
import { BATCHES } from '@/components/sections/Batches/data';
import { setButtonLoading } from '@/components/ui/Button/button-core';

export function initContactForm() {
  const fProg = $('#fProg');
  fProg.insertAdjacentHTML('beforeend', CATS.map(c => `<optgroup label="${esc(c.t)}">${c.courses.map(t => `<option>${esc(t)}</option>`).join('')}</optgroup>`).join('')
    + `<optgroup label="Upcoming batches">${BATCHES.map(b => `<option>${esc(b.full)}</option>`).join('')}</optgroup>`);
  // the site's own dropdown in front of the native one (js/custom-select.js); the <select> stays the form value
  if (window.enhanceSelect) { window.enhanceSelect(fProg); window.enhanceSelect($('#fTime')); }   // both dropdowns of the sentence form
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-prog]'); if (!a) return;
    if (![...fProg.options].some(o => o.value === a.dataset.prog)) fProg.insertAdjacentHTML('beforeend', `<option>${esc(a.dataset.prog)}</option>`);
    fProg.value = a.dataset.prog; fProg.dispatchEvent(new Event('change', { bubbles: true }));
  });
  const form = $('#form'), err = $('#formErr'), fBtn = $('#formBtn');
  const MSG = { fName: 'Enter your name.', fEmail: 'Enter an email like name@example.com, or leave it blank.', fPhone: 'Enter a 10-digit mobile number starting with 6, 7, 8 or 9.', fProg: 'Choose a programme, or "Not sure yet".', fTime: 'Choose a time for the call.' };
  $('#fPhone').addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g, '').replace(/^(91|0)(?=\d{10})/, '').slice(0, 10); });
  const send = async body => {
    const url = form.dataset.endpoint;
    if (!url) throw new Error('not-configured');
    const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), 12000);
    try { const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctrl.signal }); if (!r.ok) throw new Error('http-' + r.status); }
    finally { clearTimeout(t); }
  };
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (fBtn.disabled) return;
    $$('[aria-invalid]', form).forEach(el => el.removeAttribute('aria-invalid'));
    $('#fName').value = $('#fName').value.trim();
    const bad = ['fName', 'fPhone', 'fEmail', 'fProg', 'fTime'].map(id => $('#' + id)).find(el => !el.checkValidity());
    if (bad) { bad.setAttribute('aria-invalid', 'true'); err.textContent = MSG[bad.id]; bad.focus(); return; }
    err.textContent = ''; setButtonLoading(fBtn, true, 'Sending…');
    const data = Object.fromEntries(new FormData(form)); data.phone = '+91' + data.phone; data.source = 'homepage';
    try {
      await send(data);
      $('#okMsg').textContent = `A counsellor will call +91 ${$('#fPhone').value} in the ${$('#fTime').value.split(',')[0].toLowerCase()}.`;
      form.classList.add('done'); $('.form__ok', form).focus();
    } catch (ex) {
      err.textContent = ex.message === 'not-configured'
        ? `Online booking isn't connected yet, so nothing was sent. Please call ${PHONE}, Monday to Saturday, 9 am to 7 pm.`
        : `We couldn't send your request. Try again, or call ${PHONE}.`;
    } finally { setButtonLoading(fBtn, false); }
  });
}
