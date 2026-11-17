/* header language switcher (EN / हिं): swaps the header + drawer labels, sets <html lang>, remembers the choice.
   Other scripts can listen for the 'langchange' event on document to translate their own content. */
export default function init() {
  const sws = [...document.querySelectorAll('.lang')]; const sw = sws[0]; if (!sw) return;   // the header's and the phone drawer's
  const HI = {
    'All courses': 'सभी कोर्स', 'Toppers': 'टॉपर्स', 'Study materials': 'अध्ययन सामग्री', 'Current affairs': 'करंट अफेयर्स',
    'UPSC exam': 'UPSC परीक्षा', 'Upcoming batches': 'आगामी बैच', 'FAQs': 'सामान्य प्रश्न', 'Contact us': 'संपर्क करें', "Let's talk": 'बात करें', 'More': 'और'
  };
  const KEY = 'vr-lang';
  const targets = () => [...document.querySelectorAll('.nav__links .nav__a:not(.nav__more-b), .nav__more-t, .more__a, #drawer a:not(.btn), .nav .talk .btn__t, .drawer__talk .btn__t')];
  targets().forEach(el => { if (!el.dataset.en) el.dataset.en = el.textContent.trim(); });
  const btns = sws.flatMap(w => [...w.querySelectorAll('.lang__b')]);
  const apply = (lang, animate) => {
    sws.forEach(w => { w.dataset.cur = lang; });
    document.documentElement.lang = lang;
    btns.forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
    targets().forEach(el => {
      if (!el.dataset.en) el.dataset.en = el.textContent.trim();
      const t = lang === 'hi' ? (HI[el.dataset.en] || el.dataset.en) : el.dataset.en;
      if (el.textContent.trim() === t) return;
      el.textContent = t;
      if (animate) { const a = el.closest('.btn__label') || el; a.classList.remove('is-sw'); void a.offsetWidth; a.classList.add('is-sw'); }
    });
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  };
  let saved = 'en'; try { saved = localStorage.getItem(KEY) === 'hi' ? 'hi' : 'en'; } catch (e) {}
  // the "Let's talk" label is split into rolling spans by v49.js, which runs before this script
  apply(saved, false);
  btns.forEach(b => b.addEventListener('click', () => {
    const lang = b.dataset.lang; if (sw.dataset.cur === lang) return;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply(lang, true);
    // on phones the chosen language's button is hidden (navigation-bar.css): keep focus on the switch
    if (document.activeElement === b && !b.offsetParent) [...b.parentElement.querySelectorAll('.lang__b')].find(x => x !== b)?.focus();
  }));
}
