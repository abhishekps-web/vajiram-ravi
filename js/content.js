/* Vajiram & Ravi — homepage v25: v23's layout and behaviour, with v22's card styles
   (invitation frames, scalloped AIR seals, block-print art on four grounds) and v24's
   invitation-card batches. The stories section is left out until the quotes are confirmed. */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const PHONE = '080-6220-6330';
  const SITE = 'https://vajiramandravi.com/';
  const IMG = 'assets/img/';
  const PHOTO = n => IMG + 'photos/' + n, PATTERN = n => IMG + 'patterns/' + n, ICON = n => IMG + 'icons/' + n;
  const ico = (n, s = 16) => `<img src="${ICON(n)}" alt="" width="${s}" height="${s}">`;

  /* ---------------- toppers ---------------- */
  const T = (window.TOPPERS || []).filter(p => p.r).map(p => ({ ...p, n: p.n.replace(/\b[a-z]/g, c => c.toUpperCase()) }));
  const YEARS = [...new Set(T.map(p => p.y))].sort((a, b) => b - a);
  const byYear = y => T.filter(p => p.y === y).sort((a, b) => a.r - b.r);
  const latest = byYear(YEARS[0]);
  const top10 = latest.filter(p => p.r <= 10);
  const top50 = latest.filter(p => p.r <= 50).length;
  const progOf = p => p.c ? esc(p.c) : 'Prepared with Vajiram &amp; Ravi';

  /* ---------------- courses (from v20) ---------------- */
  const CATS = [
    { t: 'UPSC GS Foundation Course', courses: ['General Studies Prelims cum Mains 2027 (1 year)', 'GS PCM 2-Year Fledgling 2028', "Ranker's Programme", 'Economics Module 2027'] },
    { t: 'Optional Subject Programme', courses: ['Agriculture', 'Anthropology', 'Commerce & Accountancy', 'Economics', 'Geography', 'History', 'Law', 'Mathematics', 'Philosophy', 'PSIR', 'Psychology', 'Public Administration', 'Sociology'].map(s => `${s} Optional Coaching`) },
    { t: 'CSAT Course', courses: ['CSAT Course', 'CSAT Test Series'] },
    { t: 'Interview Guidance Programme', courses: ['UPSC CSE Interview Guidance Programme'] },
    { t: 'Mentorship Programme', courses: ['StepUp Mentorship Programme 2027'] },
    { t: 'Mains Test Series', courses: ['Sure Shot Mains Programme 2027', 'Sure Shot Mains Programme 2027 (Hindi)', 'Mains CAMP 2027', 'Essay Test Series 2027', 'Sure Shot PYQ Dominator 2027', 'Sure Shot Mains Test Series for Seniors', 'Mains CAMP Rehearsals 2026', 'Sure Shot Mains 2026, FLT', 'Sure Shot Mains 2026, FLT Plus Sectional', 'Sure Shot Mains Test Series 2026', 'Sure Shot PYQ Dominator'] },
    { t: 'Prelims Test Series', courses: ['PowerUp Prelims Test Series', 'PowerUp Current Affairs Test Series', 'PowerUp Combo', 'Prelims Plus Test Series', 'Prelims CAMP', 'Prelims CAMP 2026 (Hindi)', 'SMART Current Affairs Programme 2027'] },
    { t: 'Optional Test Series', courses: ['Agriculture Optional Year-Long Test Series 2027', 'Agriculture Optional Mains Test Series', 'Anthropology Optional Test Series', 'Economics Optional Test Series', 'Geography Optional Comprehensive Test Series', 'History Optional Test Series', 'Law Optional Test Series', 'Mathematics Optional Test Series', 'Mathematics Optional Year-Long Test Series 2026–27', 'Philosophy Optional Test Series', 'PSIR Optional Test Series', 'Public Administration Optional Test Series', 'Sociology Optional Test Series'] }
  ];
  const CAT_D = [
    'The whole General Studies syllabus for Prelims and Mains together.',
    'Two papers, 500 marks, taught by a specialist in your optional subject.',
    'Prelims Paper II. Qualifying at 33%, but it has to be cleared.',
    'Mock boards with detailed feedback, for the 275-mark personality test.',
    'A mentor keeps your plan on track, week by week, in English or Hindi.',
    'Write to time, then read what an evaluator would change. English and Hindi.',
    'Full-length tests with the reasoning behind every answer, plus current affairs.',
    'Answer writing for your optional, evaluated paper by paper.'
  ];
  // Hindi name in each card's medallion (corrected from the Figma's set)
  const STAGES = [
    { k: 'Foundation', cats: [0] },
    { k: 'Prelims', cats: [6, 2] },
    { k: 'Mains', cats: [5, 1, 7] },
    { k: 'Interview', cats: [3] },
    { k: 'Mentorship', cats: [4] }
  ];
  const stageFor = i => STAGES.find(s => s.cats.includes(i))?.k || 'Every stage';

  /* ---------------- other content (from v20) ---------------- */
  // Names and subjects from the Figma. Portraits are the stand-ins placed in the Figma design;
  // swap for real faculty photos before launch.
  // The first four are from the Figma; the rest are STAND-INS (names, subjects and reused portraits) to show a full
  // faculty carousel. Replace with the real faculty list and photos before launch.
  const FACULTY = [['SK Manocha', 'General Studies, Polity'], ['Brijender Singh', 'Essay'], ['Md. Rizwan', 'Geography optional'], ['Md. Tarique', 'History optional'],
    ['Rajeev Mehra', 'Indian Economy'], ['Anand Iyer', 'Ethics, GS IV'], ['Pranav Sethi', 'Modern History'], ['Vikram Rao', 'Public Administration'],
    ['Harish Kumar', 'Science & Technology'], ['Suresh Nair', 'Sociology optional'], ['Alok Bansal', 'CSAT'], ['Deepak Chandra', 'Interview guidance'],
    ['Kiran Malhotra', 'Indian Society'], ['Naveen Reddy', 'Disaster Management'], ['Sanjay Verma', 'Internal Security'], ['Ramesh Pillai', 'Ancient and Medieval History'],
    ['Arvind Joshi', 'Environment and Ecology'], ['Manish Tiwari', 'International Relations'], ['Prakash Menon', 'Mathematics optional'], ['Tarun Saxena', 'Mains answer writing']];
  // LinkedIn profile URLs, in FACULTY order. Not known yet: until one is filled in, the button opens a
  // LinkedIn people search for the name, so the link works without pointing at a guessed profile.
  const FACULTY_LI = ['', '', '', ''];
  const liFor = (n, i) => FACULTY_LI[i] || `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${n} Vajiram & Ravi`)}`;
  const TESTIMONIALS = {
    1: '“The GS classes gave me a clear rhythm for Prelims and Mains. The test feedback showed me exactly what to improve each week.”',
    2: '“I needed consistency more than another resource. The current-affairs notes and regular tests kept my preparation focused.”',
    3: '“The interview guidance helped me speak with structure and confidence while still sounding like myself.”',
    // STAND-INS: ranks 4 to 9 below are placeholder wording, written around the programmes each ranker took in the results data.
    // They are NOT real quotes. Replace each with the ranker's own words (and get their approval) before launch.
    4: '“The mock interview boards felt close to the real one. I knew how to present my DAF by the day.”',
    5: '“The optional crash course gave my Sociology a clean, final revision before Mains.”',
    6: '“The Ethics module changed how I wrote case studies, and the interview sessions kept me steady.”',
    7: '“Interview guidance helped me organise my background and answer plainly.”',
    8: '“The mock interviews showed me what a panel notices. I corrected it before the day.”',
    9: '“I walked into the interview having rehearsed the hard questions, not just the easy ones.”'
  };
  // From the Figma. The year isn't given there; confirm before launch.
  const BATCHES = [
    { n: 'GS Comprehensive', full: '11-Month Prelims cum Mains General Studies Comprehensive Programme', d: '29 Jan', tgt: 'CSE 2027', what: 'The full GS syllabus for Prelims and Mains, in 11 months.', chip: 'Flagship', hi: true },
    { n: 'Prelims CAMP', full: 'Prelims CAMP, Batch 3', d: '3 Jan', tgt: 'CSE 2027', what: 'Prelims revision camp, batch 3.', chip: 'Limited seats' },
    { n: 'SMART Prelims', full: 'SMART Prelims Current Affairs Programme 2026', d: '17 Jan', tgt: 'CSE 2027', what: 'Current affairs for Prelims.' },
    { n: 'SMART', full: 'SMART Current Affairs Programme 2026', d: '17 Jan', tgt: 'CSE 2026', what: 'Current affairs for Prelims and Mains.', chip: 'Limited seats' }
  ];
  const FREE = ['Monthly magazine', 'Yojana and Kurukshetra', 'Previous year papers', "Toppers' answer sheets", 'Essay practice'];
  // Admission banners (files in assets/img/banners) with the programme each one advertises
  const BANNERS = [
    ['Desktop_Size_GS_11_Months_Banner_16_f1fa678225', 'General Studies Prelims cum Mains Programme for UPSC 2027'],
    ['Desktop_Size_GS_2_year_2_508da0d9c9', 'General Studies PCM 2-year Fledgling Programme 2028'],
    ['Desktop_Size_Stepup_6_8b18a6bbf0', 'StepUp Mentorship Programme 2027'],
    ['Desktop_Size_Powerup_9_79a81c3370', 'PowerUp Prelims Test Series 2027'],
    ['SURE_SHOT_Desktop_Size_Sure_Shot_16_4d2c3b30ad', 'Sure Shot Mains Test Series 2027'],
    ['Desktop_Size_CSAT_Banner_5eca6e8ca4', 'CSAT course for UPSC 2027'],
    ['Desktop_Size_optional_Banner_19621e0d08', 'Optional Subject Programme for UPSC CSE 2027'],
    ['Desktop_Size_History_Optional_35fde8138a', 'History Optional Enrichment and Mentorship Programme 2027'],
    ['Desktop_Size_economics_module_5_ba1f0b5527', 'Economics Module 2027 for General Studies'],
    ['SMART_Web_banner_95ee4752b3', 'SMART Current Affairs Programme for UPSC Prelims and Mains 2027'],
    ['Desktop_Size_Scholership_test_Banner_2_eeb8fb48a8', 'Scholarship test for Sure Shot Mains Programme 2027'],
    ['Desktop_Size_sureshot_hindi_8_18ae1e3e5f', 'Sure Shot Mains Programme 2027, Hindi medium'],
    ['2911_575px_Desktop_be707365f9', 'Sure Shot Seniors Super 50'],
    ['Desktop_size_14_edd2ea9021', 'Top 10 out of 10 rankers in UPSC CSE 2025 from Vajiram & Ravi']
  ];
  const FAQS = [
    ['Which coaching is best for UPSC?', 'Vajiram & Ravi is renowned for its comprehensive and structured approach, making it one of the top choices for UPSC coaching in India.'],
    ['When should I start preparing for UPSC?', 'Graduates usually join the 1-year GS Prelims cum Mains Programme. College students can start earlier with the 2-year Fledgling programme, which spreads the syllabus across their degree.'],
    ['What does the GS Prelims cum Mains Programme include?', 'Daily classes across the full General Studies syllabus, printed study material, Prelims and Mains tests, and mentoring, in the classroom or LIVE-Online.'],
    ['Can I prepare in Hindi medium?', 'Yes. Vajiram & Ravi teaches in English and Hindi, with Hindi-medium mentorship and a Mains Test Series in Hindi.'],
    ['Do you offer coaching for optional subjects?', 'Yes. Optional coaching runs for 20 to 30 weeks in subjects including Geography, History, Sociology, Psychology, Economics and Political Science, with an Optional Test Series alongside.'],
    ['How do you prepare students for the UPSC interview?', 'The Interview Guidance Programme (IGP) prepares you for the Personality Test with mock interviews and DAF preparation, so you face the board with structure and confidence.'],
    ['Can I join a test series without a full course?', 'Yes. The Prelims, Mains and Optional test series can be taken on their own, alongside your own preparation.'],
    ['Where are your centres?', 'The head campus is at 1-B/7, Pusa Road, Old Rajinder Nagar, New Delhi, next to Gate 5 of Karol Bagh Metro Station. There is also a campus in Egmore, Chennai.'],
    ['Are online classes the same as classroom classes?', 'Yes. Every programme runs in the classroom and LIVE-Online, and live online and recorded classes carry the same faculty, the same tests and the same study plan.'],
    ['How do I enrol or speak to a counsellor?', 'Book a free session with the form on this page, call 080-6220-6330 (Monday to Saturday, 9 am to 7 pm), or email admissions@vajiramandravi.com. There is no pressure to enrol.']
  ];
  const FOOTER = [
    ['Vajiram & Ravi', ['About us', 'Careers', 'Contact us', 'FAQs']],
    ['Courses', ['UPSC GS Course 2027', 'UPSC GS Online Course 2027', 'UPSC 2 Year Course', 'UPSC 2 Year Online Course', 'UPSC Online Coaching', 'UPSC CSAT Course', 'Current Affairs Course', 'UPSC Study Material']],
    ['Test series', ['UPSC Prelims Test Series 2027', 'UPSC Mains Test Series 2027', 'UPSC Mains Test Series Hindi Medium', 'UPSC Optional Test Series', 'UPSC Mentorship Program 2027', 'UPSC Mentorship Program Hindi Medium', 'UPSC Interview Guidance Program']],
    ['UPSC exam', ['UPSC 2027', 'UPSC Exam Pattern', 'UPSC Syllabus', 'UPSC CSAT Syllabus', 'UPSC Optional Subjects List', 'UPSC Selection Process', 'UPSC Interview', 'UPSC Age Limit', 'IAS Salary']],
    ['Exam updates', ['UPSC Calendar 2027', 'UPSC Admit Card', 'UPSC Prelims Answer Key', 'UPSC Cut Off', 'UPSC Final Result 2025']],
    ['Free resources', ['UPSC Current Affairs', 'UPSC Previous Year Papers', 'UPSC Books', 'Model Answers for UPSC Mains 2026']]
  ];
  const SOCIAL = ['YouTube', 'Facebook', 'Instagram', 'Telegram', 'WhatsApp'];

  /* ---------------- navigation ---------------- */
  const drawer = $('#drawer'), burger = $('#burger');
  const setDrawer = open => { drawer.hidden = !open; burger.setAttribute('aria-expanded', open); burger.classList.toggle('x', open); };
  burger.addEventListener('click', () => setDrawer(drawer.hidden));
  $$('a', drawer).forEach(a => a.addEventListener('click', () => setDrawer(false)));
  const explore = $('#explore'), exBtn = $('#exploreBtn');
  const setMega = open => { explore.classList.toggle('open', open); exBtn.setAttribute('aria-expanded', open); };
  $('#mega').innerHTML = STAGES.map(s => `<div><p>${s.k}</p><ul>${s.cats.map(c => `<li><a href="#courses" data-cat="${c}">${esc(CATS[c].t)}<span>${CATS[c].courses.length}</span></a></li>`).join('')}</ul></div>`).join('');
  exBtn.addEventListener('click', () => setMega(!explore.classList.contains('open')));
  let megaT;
  explore.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { clearTimeout(megaT); setMega(true); } });
  explore.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') megaT = setTimeout(() => setMega(false), 160); });
  document.addEventListener('click', e => { if (!explore.contains(e.target)) setMega(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') { setMega(false); setDrawer(false); } });

  /* ---------------- hero ---------------- */
  const names = top10.map(p => `<span><small>AIR ${p.r} · CSE ${p.y}</small>${esc(p.n)}<i aria-hidden="true"></i></span>`).join('');
  $('#heroNames').innerHTML = `<div>${names}</div><div aria-hidden="true">${names}</div>`;

  /* ---------------- banner carousel: hold, then slide ----------------
     The banner set is cloned so the strip loops seamlessly. Each banner holds
     centre stage for HOLD ms, then the strip slides one banner to the left.
     Hover pauses the countdown; drag snaps to the nearest banner; a dot slides
     its banner to the centre. Banners brighten as they reach the centre and the
     dots follow whichever banner is nearest the centre. */
  (() => {
    const view = $('#bnrView'), track = $('#bnrTrack'), dots = $('#bnrDots');
    const orig = $$('.bnr__s', track), n = orig.length, START = 0;   // start with the GS banner (now the first slide) centred
    const HOLD = 3000, SLIDE = 900;                                   // ms on centre stage, ms to slide to the next
    dots.innerHTML = orig.map((_, i) => `<button type="button" role="tab" aria-label="Banner ${i + 1} of ${n}"></button>`).join('');
    let sw = 0, gap = 0, setW = 0, x = 0, paused = false, visible = true, drag = null, tween = null, last = 0, active = -1, held = 0;
    const build = () => {
      $$('.bnr__s.clone', track).forEach(c => c.remove());
      sw = orig[0].getBoundingClientRect().width; gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      setW = n * (sw + gap);
      const copies = Math.ceil(view.clientWidth / setW) + 2;   // one set to the left, then enough to fill the view
      for (let k = 0; k < copies; k++) orig.forEach(s => { const c = s.cloneNode(true); c.classList.add('clone'); c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1; track.append(c); });
    };
    const centreX = i => setW + i * (sw + gap) + sw / 2;           // slide i of the second set, in track coordinates
    const xFor = i => ((centreX(i) - view.clientWidth / 2 - setW) % setW + setW) % setW;
    const all = () => $$('.bnr__s', track);
    const paint = () => {
      const t = -(setW + ((x % setW) + setW) % setW);
      track.style.transform = `translate3d(${t}px,0,0)`;
      const vc = view.clientWidth / 2;
      let best = 0, bestD = Infinity;
      all().forEach((s, k) => {
        const c = t + k * (sw + gap) + sw / 2, d = Math.abs(c - vc);
        s.style.setProperty('--dim', (.08 * Math.min(1, d / (sw * .6))).toFixed(3));
        if (d < bestD) { bestD = d; best = k % n; }
      });
      if (best !== active) { active = best; [...dots.children].forEach((b, i) => b.setAttribute('aria-selected', i === best)); }
    };
    const step = () => sw + gap;
    const slideTo = to => { tween = { from: x, to, t0: performance.now(), a: active }; held = 0; };
    const frame = now => {
      const dt = Math.min(100, (now - last) || 0); last = now;
      if (tween) {
        const k = Math.min(1, (now - tween.t0) / SLIDE), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        x = tween.from + (tween.to - tween.from) * e; if (k === 1) { tween = null; held = 0; }
      } else if (!drag && !paused && !reduce) {
        held += dt;
        if (held >= HOLD) slideTo(x + step());           // next banner takes centre stage
      }
      paint();
      dots.style.setProperty("--hp", tween ? (active === tween.a ? 1 : 0) : Math.min(1, held / HOLD).toFixed(4));
      if (visible) requestAnimationFrame(frame);
    };
    build(); x = xFor(START); paint();
    new IntersectionObserver(es => { const v = es[0].isIntersecting; if (v && !visible) { visible = true; last = performance.now(); requestAnimationFrame(frame); } visible = v; }).observe(view);
    requestAnimationFrame(t => { last = t; frame(t); });
    addEventListener('resize', () => { const i = active; build(); x = xFor(i < 0 ? START : i); paint(); });
    // chevrons step one banner either way (from wherever a slide in progress is heading)
    const nudge = dir => { const from = tween ? tween.to : x, base = xFor(START); slideTo(base + (Math.round((from - base) / step()) + dir) * step()); };
    $('#bnrPrev').addEventListener('click', () => nudge(-1));
    $('#bnrNext').addEventListener('click', () => nudge(1));
    // hover pauses the countdown (mouse only); dots slide the chosen banner to the centre, always moving forward
    view.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') paused = true; });
    view.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { paused = false; held = 0; } });
    dots.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const i = [...dots.children].indexOf(b), cur = ((x % setW) + setW) % setW;
      let to = x - cur + xFor(i); if (to < x - 1) to += setW;
      if (Math.abs(to - x) > 1) slideTo(to);
    });
    // drag / swipe
    let moved = false;
    view.addEventListener('pointerdown', e => { drag = { x0: e.clientX, start: x }; moved = false; tween = null; });
    addEventListener('pointermove', e => {
      if (!drag) return; const dx = e.clientX - drag.x0;
      if (Math.abs(dx) > 6) { moved = true; view.classList.add('drag'); }
      if (moved) x = drag.start - dx;
    });
    // on release, settle on the nearest banner (or the next one in the drag direction after a flick)
    const end = e => {
      if (!drag) return;
      const dx = (e && e.clientX != null ? e.clientX : drag.x0) - drag.x0;
      drag = null; view.classList.remove('drag');
      if (!moved) return;
      const base = xFor(START), rel = x - base;
      let k = Math.round(rel / step());
      if (Math.abs(dx) > sw * .08 && Math.round(rel / step()) === Math.round((rel + dx) / step())) k += dx < 0 ? 1 : -1;
      slideTo(base + k * step());
    };
    addEventListener('pointerup', end); addEventListener('pointercancel', end);
    view.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  })();

  /* ---------------- results: four cards ---------------- */
  const faces = l => `<span class="kc__faces">${l.map(p => `<img src="${esc(p.src)}" alt="" loading="lazy">`).join('')}</span>`;
  const KC = [
    { hi: true, lbl: `CSE ${YEARS[0]} result`, num: `${top10.length}<small>/10</small>`, t: 'Top 10 ranks', d: `Ranks 1 to 10 in UPSC CSE ${YEARS[0]} prepared with Vajiram & Ravi.`, foot: faces(top10.slice(0, 4)), a: ['See the toppers', '#toppers'] },
    { lbl: 'Programmes', num: '12', t: 'Featured UPSC CSE programmes', d: 'Classroom and LIVE-Online programmes for every stage, from Foundation to the Interview.', a: ['View programmes', '#courses'] },
    { lbl: 'Prelims 2025', num: '59', t: 'Questions from our tests', d: '59 questions in UPSC Prelims 2025 came up in our Prelims Test Series.', a: ['Prelims programmes', '#courses', 6] },
    { lbl: 'Since 1976', num: '50<small>yrs</small>', t: 'In Old Rajinder Nagar', d: 'Fifty years of teaching UPSC aspirants, next to Gate 5 of Karol Bagh Metro.', a: ['Visit the campus', '#visit'] }
  ];
  $('#kcards').innerHTML = KC.map(k => `<article class="kc${k.hi ? ' kc--hi' : ''}">
      <p class="kc__lbl">${esc(k.lbl)}</p>
      <p class="kc__num">${k.num}</p>
      <h3>${esc(k.t)}</h3>
      <p class="kc__d">${esc(k.d)}</p>
      <div class="kc__f">${k.foot || ''}<a class="kc__a" href="${k.a[1]}"${k.a[2] === 'all' ? ' data-allranks' : k.a[2] != null ? ` data-cat="${k.a[2]}"` : ''}>${esc(k.a[0])} ${ico(k.hi ? 'arrow-link-white.svg' : 'arrow-link-brand.svg')}</a></div></article>`).join('');

  /* ---------------- toppers ---------------- */
  let year = YEARS[0];
  if ($('#tgrid')) {   // the old "Toppers List" section; the newspaper toppers (js/toppers.js) replaced it
  $('#years').innerHTML = YEARS.map(y => `<button type="button" role="tab" data-y="${y}" aria-selected="${y === year}">${y}</button>`).join('');
  const renderYear = () => {
    // one newspaper page: masthead with ears, then equal ruled columns, one brief per topper
    const list = byYear(year).slice(0, 10);
    $('.tbar').append($('#years'));   // park the year tabs so the page re-render does not destroy them
    const progs = p => (p.c ? p.c.split(/,(?![^(]*\))/).map(x => x.trim()).filter(Boolean) : ['Prepared with Vajiram & Ravi']).map(x => `<li>${esc(x === 'IGP' ? 'Interview Guidance Programme' : x)}</li>`).join('');
    const item = p => `<article class="tp__i"><span class="tp__ph"><img src="${esc(p.src)}" alt="${esc(p.n)}" loading="lazy"></span><p class="tp__air"><small>AIR</small><b>${String(p.r).padStart(2, '0')}</b></p><h4 class="tp__n">${esc(p.n)}</h4><ul class="tp__p">${progs(p)}</ul></article>`;
    $('#tgrid').innerHTML = !list.length ? '' : `<div class="tp">
      <header class="tp__mast"><p class="tp__ears"><span>Est. 1976 · Delhi</span><span>Toppers from Vajiram &amp; Ravi</span><span>Old Rajinder Nagar</span></p><h2 class="tp__title">The Toppers List</h2><div class="tp__tabs"></div></header>
      <div class="tp__body">${list.map(item).join('')}</div>
      <p class="tp__foot">AIR 1 in every UPSC result since 2016</p></div>`;
    const slot = $('.tp__tabs', $('#tgrid')); if (slot) slot.append($('#years'));
  };
  $('#years').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; year = +b.dataset.y; $$('#years button').forEach(x => x.setAttribute('aria-selected', x === b)); renderYear(); });
  renderYear();
  if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const tg = $('#tgrid');
    tg.addEventListener('pointermove', e => { const c = e.target.closest('.tp__i'); if (!c) return; const r = c.getBoundingClientRect(); c.style.setProperty('--tx', ((e.clientX - r.left) / r.width - .5).toFixed(3)); c.style.setProperty('--ty', ((e.clientY - r.top) / r.height - .5).toFixed(3)); });
    tg.addEventListener('pointerout', e => { const c = e.target.closest('.tp__i'); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty('--tx', 0); c.style.setProperty('--ty', 0); } });
  }
  if (!reduce) {
    // paper confetti: bursts up, air drag bleeds off the speed, then it flutters down at a
    // paper's slow terminal speed, swaying side to side, spinning and flipping edge-on
    // brand palette (orange family + marigold + cream); each piece has a lighter face and a darker back, like paper
    const CF = [['#C2410C', '#9A3209'], ['#C2410C', '#9A3209'], ['#E85020', '#BE3C14'], ['#E85020', '#BE3C14'], ['#FEAA1C', '#D98A0A'], ['#FEAA1C', '#D98A0A'], ['#A8380A', '#832A07'], ['#FFD48A', '#E6B25E'], ['#FFF2E6', '#E8CDAE']];
    const G = .3, DRAG_X = .92, DRAG_Y = .885;
    const parts = []; let raf = 0, last = 0;
    const R = (a, b) => a + Math.random() * (b - a);
    const step = t => {
      const dt = Math.min(2, (t - (last || t)) / 16.667); last = t;
      for (let k = parts.length - 1; k >= 0; k--) {
        const p = parts[k];
        p.age += dt * 16.667;
        if (p.age < 0) continue;                                         // staggered launch
        p.vx *= Math.pow(DRAG_X, dt);
        p.vy = (p.vy + G * dt) * Math.pow(DRAG_Y, dt);
        const falling = Math.max(0, Math.min(1, p.vy / 2));            // sway grows as it settles into the fall
        p.x += (p.vx + Math.sin(p.age * p.wf + p.ph) * p.sw * falling) * dt;
        p.y += p.vy * dt;
        p.rz += p.vr * dt * (.35 + .65 * falling);
        const flip = Math.cos(p.age * p.ff + p.ph);                     // tumbling paper shows its edge
        const life = p.age / p.life;
        const side = flip >= 0 ? 0 : 1; if (side !== p.side) { p.side = side; p.el.style.background = p.c[side]; }
        p.el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) rotate(${p.rz.toFixed(1)}deg) scaleY(${flip.toFixed(3)})`;
        p.el.style.opacity = life > .72 ? Math.max(0, 1 - (life - .72) / .28).toFixed(3) : 1;
        if (life >= 1) { p.el.remove(); parts.splice(k, 1); }
      }
      if (parts.length) raf = requestAnimationFrame(step); else { raf = 0; last = 0; $$('.cft').forEach(b => b.childElementCount || b.remove()); }
    };
    const burst = card => {
      const now = performance.now();
      if (now - (card._cf || 0) < 900) return; card._cf = now;
      let box = $('.cft', card);
      if (!box) { box = document.createElement('span'); box.className = 'cft'; box.setAttribute('aria-hidden', 'true'); card.append(box); }
      const w = card.offsetWidth, small = innerWidth <= 640;
      for (let k = 0; k < 30; k++) {
        const el = document.createElement('i'), kind = [0, 0, 0, 1, 2, 0, 3][k % 7];   // mostly strips, some squares and dots
        const sw = kind === 3 ? R(4.5, 6.5) : kind === 2 ? R(5, 8) : R(3.5, 6), sh = kind >= 2 ? sw * (kind === 2 ? R(.8, 1.2) : 1) : R(7, 14);
        const c = CF[Math.floor(Math.random() * CF.length)];
        el.style.cssText = `width:${sw.toFixed(1)}px;height:${sh.toFixed(1)}px;margin:${(-sh / 2).toFixed(1)}px 0 0 ${(-sw / 2).toFixed(1)}px;background:${c[0]};border-radius:${kind === 3 ? '50%' : R(0, 1.6).toFixed(1) + 'px'}`;
        box.append(el);
        parts.push({
          el, c, side: 0, age: -R(0, 120),
          x: w * R(.2, .8), y: R(-4, 8),
          vx: R(-11, 11), vy: small ? R(-6, -2.5) : R(-15, -6),
          rz: R(0, 360), vr: R(-11, 11),
          sw: R(.5, 2), wf: R(.003, .0075), ff: R(.005, .015), ph: R(0, 6.28),
          life: R(1800, 2800),
        });
      }
      if (!raf) raf = requestAnimationFrame(step);
    };
    const tg = $('#tgrid');
    if (matchMedia('(hover: hover)').matches) tg.addEventListener('pointerover', e => { const c = e.target.closest('.tp__i'); if (c && !c.contains(e.relatedTarget)) burst(c); });
    else tg.addEventListener('click', e => { const c = e.target.closest('.tp__i'); if (c) burst(c); });
  }
  }   // end: old Toppers List (skipped when #tgrid is not on the page)
  {
    const stage = $('#heroStage'), hero = $('.hero');
    if (stage && !reduce) {
      let tx = 0, ty = 0, x = 0, y = 0, sy = 0, raf = 0;
      const paint = () => {
        x += (tx - x) * .07; y += (ty - y) * .07;
        stage.style.setProperty('--mx', x.toFixed(4)); stage.style.setProperty('--my', y.toFixed(4)); stage.style.setProperty('--sy', sy.toFixed(1));
        raf = Math.abs(tx - x) + Math.abs(ty - y) > .0008 ? requestAnimationFrame(paint) : 0;
      };
      const kick = () => { if (!raf) raf = requestAnimationFrame(paint); };
      if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
        hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - .5) * 2; ty = ((e.clientY - r.top) / r.height - .5) * 2; kick(); });
        hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
      }
      const onScroll = () => { const r = hero.getBoundingClientRect(); if (r.bottom < 0) return; sy = Math.max(0, -r.top); stage.style.setProperty('--sy', sy.toFixed(1)); };
      addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }
  }
  // books (GS and the programme books): at rest they keep the angled pose; on hover a book straightens to face
  // you, then tilts toward the pointer as it moves over it (eased); on leave it eases back to the angled pose
  const bookHover = book => {
    const flat = book.classList.contains('gsbook--p');   // programme books rest straight-on, the GS book angled
    const REST_X = flat ? 0 : 8, REST_Y = flat ? 0 : 24, TILT_X = 14, TILT_Y = 20;
    let over = false, px = 0, py = 0, rx = REST_X, ry = REST_Y, raf = 0;
    const step = () => {
      const tx = over ? -py * TILT_X : REST_X, ty = over ? px * TILT_Y : REST_Y;
      rx += (tx - rx) * .1; ry += (ty - ry) * .1;
      book.style.setProperty('--rx', rx.toFixed(3)); book.style.setProperty('--ry', ry.toFixed(3));
      if (over || Math.abs(tx - rx) > .02 || Math.abs(ty - ry) > .02) raf = requestAnimationFrame(step);
      else { raf = 0; book.classList.remove('is-live'); }
    };
    const go = () => { book.classList.add('is-live'); if (!raf) raf = requestAnimationFrame(step); };
    const track = e => {
      const r = book.getBoundingClientRect(), cl = v => Math.max(-1, Math.min(1, v));
      px = cl((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
      py = cl((e.clientY - (r.top + r.height / 2)) / (r.height / 2));
    };
    book.addEventListener('pointerenter', e => { over = true; track(e); go(); });
    book.addEventListener('pointermove', track, { passive: true });
    book.addEventListener('pointerleave', () => { over = false; go(); });
  };
  const bookFx = !reduce && matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (bookFx) $$('.gsbook').forEach(bookHover);
  const yd = $('#yd');
  const openRanks = () => {
    const l = byYear(year);
    $('#ydH').textContent = `UPSC CSE ${year}: ${l.length} rankers who prepared with us`;
    $('#ydList').innerHTML = l.map(p => `<li><img src="${esc(p.src)}" alt="" loading="lazy"><span class="mono">AIR ${p.r}</span><b>${esc(p.n)}</b><small>${progOf(p)}</small></li>`).join('');
    yd.showModal();
  };
  const allRanks = $('#allRanks'); if (allRanks) allRanks.addEventListener('click', openRanks);
  document.addEventListener('click', e => { if (e.target.closest('[data-allranks]')) { e.preventDefault(); year = YEARS[0]; openRanks(); } });
  $('#ydClose').addEventListener('click', () => yd.close());
  yd.addEventListener('click', e => { if (e.target === yd) yd.close(); });

  /* ---------------- programmes ---------------- */
  // Course catalogue (v18's interaction): a dialog listing the category's courses;
  // each course links to the counsellor form with that course pre-selected.
  const courseDlg = $('#courseDlg');
  const ALL = CATS.reduce((n, c) => n + c.courses.length, 0);
  const showCat = i => {
    $('#courseDlgH').textContent = i < 0 ? `All ${ALL} courses` : CATS[i].t;
    const list = i < 0 ? CATS.flatMap((c, k) => c.courses.map(n => [n, k])) : CATS[i].courses.map(n => [n, i]);
    $('#courseList').innerHTML = list.map(([n, k]) => `<li><a href="#contact" data-prog="${esc(n)}"><span>${esc(n)}<small>${esc(CATS[k].t)} · ${esc(stageFor(k))}</small></span>${ico('arrow-list.svg')}</a></li>`).join('');
    $('#courseList').scrollTop = 0;
  };
  const openCat = i => { setMega(false); setDrawer(false); showCat(i); if (!courseDlg.open) courseDlg.showModal(); };
  $('#courseDlgX').addEventListener('click', () => courseDlg.close());
  courseDlg.addEventListener('click', e => { if (e.target === courseDlg || e.target.closest('[data-prog]')) courseDlg.close(); });
  // v21's programme card art: textured photo under the orange wash, ellipses, rules and the Hindi name in four corners.
  // prog-4.jpg is a pattern of India outlines (no maps on the site), so card 4 reuses the tile texture.
  const PROG_IMG = [1, 2, 3, 5, 5, 6, 7, 8];
  // a different Indian pattern, faint, over each thumbnail (the v21 grid lines are gone)
  const PAT = ['buta', 'jaali', 'phool', 'bandhani', 'leheriya', 'scallop', 'star', 'chevron'];
  // washes alternate orange / brown like a chequerboard, so neighbours in a row and a column differ
  const art = i => `<div class="pc__art pc__art--w${(i + Math.floor(i / 4)) % 2}"><img class="pc__bg" src="${PHOTO(`prog-${PROG_IMG[i]}.jpg`)}" alt="" loading="lazy"><span class="pc__pat pc__pat--${PAT[i]}" aria-hidden="true"></span>
      <img class="el el--1" src="${PATTERN('ellipse-1.svg')}" alt=""><img class="el el--2" src="${PATTERN('ellipse-2.svg')}" alt=""><img class="el el--3" src="${PATTERN('ellipse-3.svg')}" alt=""><img class="el el--4" src="${PATTERN('ellipse-4.svg')}" alt=""></div>`;
  // programmes as books, grouped exactly as the "Our Featured UPSC CSE Courses" tabs the user shared:
  // All / IGP / General Studies / Optional / Module Courses / Test Series, twelve programmes, each in one tab.
  // cat: the catalogue category its "View courses" opens; without one the button enquires with the programme pre-selected.
  // c: cloth colour (.gsbook--k0..k11), so no two neighbours match
  const PTABS = ['All', 'IGP', 'General Studies', 'Optional', 'Module Courses', 'Test Series'];
  // a small illustration for each programme book, in the slot the description used to fill (same order as PROGS): gold line work with soft fills and an accent, inside a dotted medallion
  const PICON = [
    '<path class="f" d="M32 22c-4-3-10-4-16-3v22c6-1 12 0 16 3 4-3 10-4 16-3V19c-6-1-12 0-16 3Z"/><path d="M32 22v22"/><path d="M20 26c3 0 6 .6 9 2M20 31c3 0 6 .6 9 2M20 36c3 0 6 .6 9 2M44 26c-3 0-6 .6-9 2M44 31c-3 0-6 .6-9 2"/><path class="f" d="M40 19v9l3-2 3 2v-9"/><path d="M26 15l-2-3M38 15l2-3"/><circle class="a" cx="32" cy="13" r="1.6"/>',
    '<path d="M32 47V28"/><path class="f" d="M32 31c0-8-5-12-13-12 0 8 5 12 13 12Z"/><path class="f" d="M32 37c0-6 4-10 11-10 0 6-4 10-11 10Z"/><path d="M17 47h30M23 51h18"/><circle class="a" cx="46" cy="16" r="1.6"/><circle class="a" cx="17" cy="31" r="1.2"/>',
    '<path class="f" d="M36 12 22 34h9l-3 18 16-24H34l2-16Z"/><path d="M12 24h6M10 32h7M13 40h5"/><circle class="a" cx="48" cy="18" r="1.6"/><circle class="a" cx="50" cy="40" r="1.2"/>',
    '<path class="f" d="M32 14 50 23 32 32 14 23 32 14Z"/><path d="M14 31l18 9 18-9"/><path d="M14 39l18 9 18-9"/><circle class="a" cx="32" cy="23" r="2.2"/>',
    '<rect class="f" x="17" y="12" width="30" height="40" rx="4"/><rect x="22" y="17" width="20" height="9" rx="1.5"/><path d="M24 33h.01M32 33h.01M40 33h.01M24 40h.01M32 40h.01M40 40h.01M24 47h.01M32 47h.01" stroke-width="3"/><path d="M40 40v7" stroke-width="3"/>',
    '<rect class="f" x="26" y="11" width="12" height="23" rx="6"/><path d="M19 30a13 13 0 0 0 26 0"/><path d="M32 43v8M25 51h14"/><path d="M13 22c-2 3-2 8 0 11M51 22c2 3 2 8 0 11"/><path d="M29 18h6M29 23h6"/>',
    '<rect class="f" x="16" y="11" width="32" height="42" rx="4"/><circle cx="25" cy="23" r="3"/><circle class="a" cx="25" cy="33" r="3"/><circle cx="25" cy="43" r="3"/><path d="M33 23h9M33 33h9M33 43h9"/>',
    '<circle class="f" cx="23" cy="23" r="6"/><path d="M12 47c1-8 6-12 11-12s10 4 11 12"/><circle class="f" cx="43" cy="28" r="4.5"/><path d="M36 47c.8-6 4-9 7-9s6.2 3 7 9"/><path class="a" d="M47 11l1.4 3 3.2.4-2.4 2.2.7 3.2L47 18l-2.9 1.8.7-3.2-2.4-2.2 3.2-.4Z"/>',
    '<rect class="f" x="14" y="31" width="16" height="16" rx="3"/><rect class="f" x="34" y="31" width="16" height="16" rx="3"/><rect class="f" x="14" y="12" width="16" height="16" rx="3"/><rect x="36" y="10" width="16" height="16" rx="3" transform="rotate(12 44 18)"/><circle class="a" cx="22" cy="20" r="2"/>',
    '<rect class="f" x="14" y="14" width="30" height="38" rx="3"/><path d="M20 24h18M20 31h18M20 38h10"/><path class="f" d="M50 11l5 5-19 24-7 2 2-7Z"/>',
    '<path d="M20 12h24M20 52h24"/><path class="f" d="M22 12c0 12 10 14 10 20s-10 8-10 20h20c0-12-10-14-10-20s10-8 10-20Z"/><path class="a" d="M27 47h10l-5-6Z"/><circle class="a" cx="32" cy="20" r="1.3"/>',
    '<path d="M32 52V37"/><path class="f" d="M32 10 20 28h6l-8 12h28l-8-12h6L32 10Z"/><path d="M14 52h36"/><circle class="a" cx="49" cy="15" r="3"/>'
  ];
  const PROGS = [
    { t: 'General Studies PCM', tab: 'General Studies', sp: 'GS PCM', c: 0, prog: 'General Studies Prelims cum Mains 2027 (1 year)', d: 'The whole General Studies syllabus for Prelims and Mains, in one year, for graduates.' },
    { t: 'GS PCM – 2 Year Fledgling', tab: 'General Studies', sp: 'Fledgling', c: 5, prog: 'GS PCM 2-Year Fledgling 2028', d: 'The General Studies programme spread over two years, for college students.' },
    { t: 'GS Mains Crash Course', tab: 'General Studies', sp: 'GS Mains Crash', c: 4, prog: 'GS Mains Crash Course', d: 'A short, intensive run through General Studies for the Mains papers.' },
    { t: 'Optional Subjects', tab: 'Optional', sp: 'Optional', c: 1, prog: 'Optional Subject Programme', d: 'Two papers, 500 marks, taught by a specialist in your optional subject.' },
    { t: 'CSAT', tab: 'Module Courses', sp: 'CSAT', c: 2, prog: 'CSAT Course', d: 'Prelims Paper II. Qualifying at 33%, but it has to be cleared.' },
    { t: 'Interview Guidance Programme', tab: 'IGP', sp: 'Interview', c: 3, prog: 'UPSC CSE Interview Guidance Programme', d: 'Mock boards with detailed feedback, for the 275-mark personality test.' },
    { t: 'Prelims Test Series', tab: 'Test Series', sp: 'Prelims Tests', c: 6, prog: 'PowerUp Prelims Test Series', d: 'Full-length tests with the reasoning behind every answer, plus current affairs.' },
    { t: 'UPSC Mentorship Program', tab: 'IGP', sp: 'Mentorship', c: 11, prog: 'StepUp Mentorship Programme 2027', d: 'A mentor keeps your plan on track, week by week, in English or Hindi.' },
    { t: 'Module Courses', tab: 'Module Courses', sp: 'Modules', c: 8, prog: 'Module Courses', d: 'Short courses that take one subject at a time, such as the Economics module.' },
    { t: 'Mains Test Series', tab: 'Test Series', sp: 'Mains Tests', c: 9, prog: 'Sure Shot Mains Programme 2027', d: 'Write to time, then read what an evaluator would change. English and Hindi.' },
    { t: 'Optional Subject Crash Course', tab: 'Optional', sp: 'Optional Crash', c: 10, prog: 'Optional Subject Crash Course', d: 'A fast, focused revision of your optional before Mains.' },
    { t: 'IFoS Programmes', tab: 'General Studies', sp: 'IFoS', c: 7, prog: 'IFoS Programmes', d: 'Preparation for the Indian Forest Service examination.' }
  ];
  const pAct = p => p.cat != null
    ? `<button type="button" class="vbtn" data-open="${p.cat}"><span>View courses</span><span class="sq sq--30 sq--ink">${ico('arrow-white.svg')}</span></button>`
    : `<a class="vbtn" href="#contact" data-prog="${esc(p.prog)}"><span>View course</span><span class="sq sq--30 sq--ink">${ico('arrow-white.svg')}</span></a>`;
  // programmes: the original book cards (cover, spine, pages, ribbon, tag line, the button that rides on the book),
  // now standing on shelves lit like the Shopify Editions wall. Shelves of 4 on desktop, fewer on narrower screens.
  const pageG = $('#pgrid');
  pageG.className = 'shelves';
  pageG.removeAttribute('role');
  const bookHTML = (p, i, k) => `<article class="pbk" id="prog${i}" style="--k:${k}">
      <div class="gsbook gsbook--p gsbook--k${p.c}" ${p.cat != null ? `data-open="${p.cat}"` : `data-book-prog="${esc(p.prog)}"`} data-i="${i}" style="--i:${i}" role="button" tabindex="0" aria-label="${esc(p.t)}: ${p.cat != null ? 'view courses' : 'enquire'}">
        <div class="gsbook__in">
          <div class="gsbook__back"></div><div class="gsbook__pages"></div><div class="gsbook__top"></div><div class="gsbook__bottom"></div>
          <div class="gsbook__spine" aria-hidden="true"><b>${esc(p.sp)}</b></div>
          <div class="gsbook__cover"><div class="gsbook__face">
            <p class="gsbook__brand">Vajiram &amp; Ravi</p>
            <h3 class="gsbook__title">${esc(p.t)}</h3>
            <p class="gsbook__orn" aria-hidden="true"><i></i></p>
            <span class="gsbook__ico" aria-hidden="true"><svg viewBox="0 0 64 64"><circle class="r1" cx="32" cy="32" r="31"/><circle class="r2" cx="32" cy="32" r="27.5"/>${PICON[i] || PICON[0]}</svg></span>
            <p class="gsbook__foot">${esc(p.tab)}</p>
          </div></div>
          <span class="gsbook__ribbon" aria-hidden="true"></span>
        </div>
      </div>
      <div class="pbk__b" data-i="${i}"><p class="pc__tags">${esc(p.tab)}<i></i>Classroom<i></i>LIVE-Online</p>${pAct(p)}</div></article>`;
  const PGROUPS = PTABS.map(t => ({ t, items: PROGS.map((p, i) => (t === 'All' || p.tab === t) ? i : -1).filter(i => i > -1) }));
  let shelfCols = 0, active = PGROUPS[0].items;
  const renderShelves = force => {
    const w = innerWidth, cols = w > 1180 ? 4 : w > 900 ? 3 : 2;
    if (cols === shelfCols && !force) return; shelfCols = cols;
    const n = Math.ceil(active.length / cols);
    pageG.innerHTML = Array.from({ length: n }, (_, r) => {
      const idx = active.slice(r * cols, r * cols + cols), m = idx.length;
      return `<div class="shelf${r === n - 1 ? ' shelf--last' : ''}${m < cols ? ' shelf--part' : ''}" style="--r:${r};--cols:${cols};--n:${m}">
        <div class="shelf__glow" aria-hidden="true"></div>
        <div class="shelf__row">${idx.map((pi, k) => bookHTML(PROGS[pi], pi, (m > 1 ? (k - (m - 1) / 2) / ((m - 1) / 2) : 0).toFixed(2))).join('')}</div>
        <div class="shelf__board" aria-hidden="true"></div><div class="shelf__shadow" aria-hidden="true"></div></div>`;
    }).join('');
    setSp();
  };
  // vanishing point of the backward tilt = the middle of the shelf: each book needs its horizontal distance from it
  const setSp = () => $$('#pgrid .shelf').forEach(sh => {
    const bs = $$('.pbk', sh); if (bs.length < 2) return;
    const a = bs[0].getBoundingClientRect(), b = bs[1].getBoundingClientRect();
    sh.style.setProperty('--sp', (((bs.length - 1) / 2) * Math.abs((b.left + b.width / 2) - (a.left + a.width / 2))).toFixed(1) + 'px');
  });
  renderShelves();
  // tabs: All / IGP / General Studies / Optional / Module Courses / Test Series; each one re-lays the shelves with just its programmes
  pageG.insertAdjacentHTML('beforebegin', `<div class="ptabs">
      <div class="seg" id="ptabs" role="tablist" aria-label="Programme type">${PGROUPS.map((g, k) => `<button type="button" role="tab" data-g="${k}" aria-selected="${!k}" aria-controls="pgrid">${esc(g.t)}<small>${g.items.length}</small></button>`).join('')}</div></div>`);
  pageG.setAttribute('role', 'tabpanel');
  const showGroup = k => {
    $$('#ptabs button').forEach(b => b.setAttribute('aria-selected', +b.dataset.g === k));
    const tb = $('#ptabs'), sel = tb.children[k]; tb.scrollTo({ left: sel.offsetLeft - (tb.clientWidth - sel.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
    active = PGROUPS[k].items; renderShelves(true);
    pageG.classList.remove('is-swap'); void pageG.offsetWidth; pageG.classList.add('is-swap');
  };
  $('#ptabs').addEventListener('click', e => { const b = e.target.closest('[data-g]'); if (b) showGroup(+b.dataset.g); });
  $('#ptabs').addEventListener('keydown', e => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return;
    const bs = $$('#ptabs button'), cur = bs.findIndex(b => b.getAttribute('aria-selected') === 'true'), nx = (cur + d + bs.length) % bs.length;
    showGroup(nx); bs[nx].focus();
  });
  // hover physics, measured frame by frame (bottom edge and top edge tracked separately) on the Shopify Editions shelf.
  // Two parts, each with its own timing:
  //   L  the lift: the whole cover rises 20px.            U  the unfold: it stands up from ~21.5deg tipped back to straight.
  //   rise : both go together, easeOutCubic over ~1.5 s (the unfold is a touch ahead).
  //   fall : starts the moment the pointer leaves. The cover drops under gravity (accelerating) and its BOTTOM hits the shelf first (~0.45 s);
  //          only then does the TOP swing back against the wall (linear, ~0.5 s, starting just before the landing). No bounce.
  //   pointer: while lifted it follows the cursor a little (a few px, a few degrees), smoothed.
  if (bookFx) {
    const LEAN = 21.5, LIFT = 20;
    const outCubic = u => 1 - Math.pow(1 - u, 3), inQuad = u => u * u, lin = u => u;
    const st = new WeakMap();
    const get = g => { let s = st.get(g); if (!s) { s = { L: 0, U: 0, tl: null, tu: null, hover: false, hx: 0, hy: 0, vx: 0, vy: 0, tx: 0, ty: 0, last: 0, raf: 0 }; st.set(g, s); } return s; };
    const tween = (s, key, to, delay, dur, ease) => { s['t' + key.toLowerCase()] = { from: s[key], to, t0: performance.now(), delay, dur, ease }; };
    const paint = (g, s) => {
      g.style.setProperty('--p', s.L.toFixed(4));
      g.style.transform = `perspective(6000px) translate3d(${(s.hx * 7 * s.L).toFixed(2)}px, ${(-LIFT * s.L + s.hy * 4 * s.L).toFixed(2)}px, 0) rotateX(${(LEAN * (1 - s.U)).toFixed(3)}deg)`;
      const inner = g.firstElementChild; if (inner) inner.style.transform = `rotateX(${(-s.hy * 8 * s.U).toFixed(3)}deg) rotateY(${(s.hx * 11 * s.U).toFixed(3)}deg)`;
    };
    const step = (s, key, now) => {
      const tk = 't' + key.toLowerCase(), tw = s[tk]; if (!tw) return false;
      const u = (now - tw.t0 - tw.delay) / tw.dur;
      if (u < 0) return true;
      const k = Math.min(1, u);
      s[key] = tw.from + (tw.to - tw.from) * tw.ease(k);
      if (k >= 1) { s[key] = tw.to; s[tk] = null; return false; }
      return true;
    };
    const tick = (g, now) => {
      const s = get(g); s.raf = 0;
      const dt = Math.max(1, Math.min(48, now - (s.last || now - 16))); s.last = now;
      let busy = step(s, 'L', now); busy = step(s, 'U', now) || busy;
      // critically damped spring toward the pointer: smooth, no sudden changes of speed
      const sd = (cur, target, vel) => { const w = 2 / .14, x = w * (dt / 1000), e = 1 / (1 + x + .48 * x * x + .235 * x * x * x), ch = cur - target, tmp = (vel + w * ch) * (dt / 1000); return [target + (ch + tmp) * e, (vel - w * tmp) * e]; };
      [s.hx, s.vx] = sd(s.hx, s.tx, s.vx); [s.hy, s.vy] = sd(s.hy, s.ty, s.vy);
      if (Math.abs(s.tx - s.hx) > .001 || Math.abs(s.ty - s.hy) > .001 || Math.abs(s.vx) > .01 || Math.abs(s.vy) > .01) busy = true; else { s.hx = s.tx; s.hy = s.ty; s.vx = 0; s.vy = 0; }
      paint(g, s);
      if (busy) s.raf = requestAnimationFrame(t => tick(g, t));
    };
    const kick = g => { const s = get(g); if (!s.raf) { s.last = 0; s.raf = requestAnimationFrame(t => tick(g, t)); } };
    const rise = g => {
      const s = get(g); if (s.hover) return; s.hover = true;
      tween(s, 'L', 1, 0, Math.max(250, 950 * (1 - s.L)), outCubic);
      tween(s, 'U', 1, 0, Math.max(250, 800 * (1 - s.U)), outCubic);
      kick(g);
    };
    const fall = g => {
      const s = get(g); if (!s.hover) return; s.hover = false; s.tx = 0; s.ty = 0;
      tween(s, 'L', 0, 0, Math.max(120, 450 * Math.sqrt(s.L)), inQuad);                       // gravity: the bottom reaches the shelf first
      tween(s, 'U', 0, 300 * Math.sqrt(s.L), Math.max(150, 500 * s.U), lin);                  // then the top leans back against the wall
      kick(g);
    };
    pageG.addEventListener('pointerover', e => { const c = e.target.closest('.pbk'); if (!c || c.contains(e.relatedTarget)) return; rise(c.querySelector('.gsbook')); });
    pageG.addEventListener('pointerout', e => { const c = e.target.closest('.pbk'); if (!c || c.contains(e.relatedTarget)) return; fall(c.querySelector('.gsbook')); });
    pageG.addEventListener('pointermove', e => {
      const c = e.target.closest('.pbk'); if (!c) return;
      const g = c.querySelector('.gsbook'), s = get(g), r = c.getBoundingClientRect();
      s.tx = clamp((e.clientX - (r.left + r.width / 2)) / (g.offsetWidth / 2), -1, 1);
      s.ty = clamp((e.clientY - (r.top + g.offsetHeight / 2)) / (g.offsetHeight / 2), -1, 1);
      if (s.hover) kick(g);
    });
  }
  let rzS; addEventListener('resize', () => { clearTimeout(rzS); rzS = setTimeout(() => { renderShelves(); setSp(); }, 150); });
  addEventListener('load', setSp); if (document.fonts && document.fonts.ready) document.fonts.ready.then(setSp);
  // a book without a course list: clicking it does what its "Enquire now" link does
  pageG.addEventListener('click', e => { const bk = e.target.closest('[data-book-prog]'); if (bk) bk.closest('.pbk').querySelector('[data-prog]').click(); });
  if (bookFx) {
    // the book's "Enquire now" / "View courses" button follows the cursor over the book, centred on it and kept
    // inside the cover; clicks pass through to the book
    let cur = null, raf = 0;
    const step = () => {
      raf = 0; if (!cur) return;
      const s = cur; s.x += (s.tx - s.x) * .22; s.y += (s.ty - s.y) * .22;
      s.b.style.transform = `translate3d(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px, 0)`;
      if (Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) > .3) raf = requestAnimationFrame(step);
    };
    pageG.addEventListener('pointermove', e => {
      const bk = e.target.closest('.gsbook'); if (!bk) return;
      const card = bk.closest('.pbk'), b = $('.pbk__b .vbtn', card);
      const r = bk.getBoundingClientRect(), c = card.getBoundingClientRect(), w = b.offsetWidth, h = b.offsetHeight;
      const tx = r.left - c.left + clamp(e.clientX - r.left, w / 2 + 14, r.width - w / 2 - 14) - w / 2;
      const ty = r.top - c.top + clamp(e.clientY - r.top, h / 2 + 14, r.height - h / 2 - 14) - h / 2;
      if (!cur || cur.b !== b) {
        if (cur) cur.b.classList.remove('is-follow');
        cur = { b, x: tx, y: ty, tx, ty };
        b.classList.add('is-follow');
      }
      cur.tx = tx; cur.ty = ty;
      if (!raf) raf = requestAnimationFrame(step);
    });
    pageG.addEventListener('pointerout', e => {
      const bk = e.target.closest('.gsbook');
      if (bk && cur && !bk.contains(e.relatedTarget)) cur = null;
    });
    pageG.addEventListener('focusin', e => { const b = e.target.closest('.pbk__b .vbtn'); if (b) { b.classList.remove('is-follow'); b.style.transform = ''; if (cur && cur.b === b) cur = null; } });
  }

  $('#pgrid').addEventListener('click', e => { const b = e.target.closest('[data-open]'); if (b) openCat(+b.dataset.open); });
  $('#pgrid').addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.gsbook')) { e.preventDefault(); e.target.click(); } });
  // mega menu and result-card links open the catalogue on that category
  document.addEventListener('click', e => { const a = e.target.closest('[data-cat]'); if (!a) return; e.preventDefault(); openCat(+a.dataset.cat); });

  /* ---------------- GS numbers count up once ---------------- */
  const gs = $('#gs');
  if (!reduce && 'IntersectionObserver' in window) {
    const gio = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; gio.unobserve(e.target);
      $$('[data-count]', e.target).forEach(el => {
        const to = +el.dataset.count, t0 = performance.now();
        const step = t => { const k = Math.min(1, (t - t0) / 1300); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString('en-IN'); if (k < 1) requestAnimationFrame(step); };
        el.textContent = '0'; requestAnimationFrame(step);
      });
    }), { threshold: .35 });
    gio.observe(gs);
  }

  /* ---------------- faculty ---------------- */
  const FTILT = [-1.6, 1.2, -0.8, 1.6];
  const facCard = ([n, s], i, dup) => `<article class="fc pcd"${dup ? ' aria-hidden="true"' : ''} style="--t:${FTILT[i % 4]}deg"><span class="pcd__clipbox pcd__clipbox--b" aria-hidden="true"><i class="pcd__clip pcd__clip--b"></i></span><div class="pcd__in"><span class="pcd__ph"><span class="pcd__paper"><img src="${PHOTO(`faculty-${i % 4 + 1}.jpg`)}" alt="${esc(n)}" loading="lazy"></span></span><div class="pcd__to"><h3 class="pcd__n">${esc(n)}</h3><p class="pcd__l">${esc(s)}</p><a class="pcd__l pcd__l--p fc__pf" href="${esc(liFor(n, i))}" target="_blank" rel="noopener"${dup ? ' tabindex="-1"' : ''} aria-label="View ${esc(n)}'s profile on LinkedIn">View on LinkedIn <span aria-hidden="true">&rarr;</span></a></div></div><span class="pcd__clipbox pcd__clipbox--f" aria-hidden="true"><i class="pcd__clip pcd__clip--f"></i></span></article>`;
  $('#team').innerHTML = FACULTY.map((f, i) => facCard(f, i, false)).join('');

  /* ---------------- stories: postcards, as if dropped on a table ----------------
     The quotes come from the Figma and are attributed to real rankers: confirm them with the rankers before launch. */
  const PST = [[-3.2, 12], [1.8, -14], [-1.5, 6], [2.6, -6]];
  const pstCard = (p, i, dup) => `<article class="pst" ${dup ? 'aria-hidden="true" inert' : ''} style="--t:${PST[i % 4][0]}deg;--y:${PST[i % 4][1]}px;--z:${(i % 9) + 1};--n:${i};--from-r:${i % 2 ? -9 : 9}deg">
      <div class="pst__in">
        <p class="pst__hd" aria-hidden="true">TESTIMONIAL</p>
        <blockquote class="pst__q"><img class="pst__ph" src="${esc(p.src)}" alt="${dup ? '' : esc(p.n)}" loading="lazy">${esc(TESTIMONIALS[p.r].replace(/^“|”$/g, ''))}</blockquote>
        <footer class="pst__who"><b>${esc(p.n)}</b><em>AIR ${p.r}, UPSC CSE ${p.y}</em></footer>
      </div></article>`;
  const pstList = top10.filter(p => TESTIMONIALS[p.r]).slice(0, 9);
  // two identical sets in one track: it slides left by exactly one set, so the loop has no seam; hovering pauses it
  $('#tcar').innerHTML = `<div class="pst__track" style="--dur:${(pstList.length * 370 / 48).toFixed(1)}s">${pstList.map((p, i) => pstCard(p, i, false)).join('')}${pstList.map((p, i) => pstCard(p, i, true)).join('')}</div>`;
  // reveal: when the section scrolls into view the heading rises out of its line and the cards are dealt onto the table one after another
  { const st = $('#stories');
    if (st) { if ('IntersectionObserver' in window && !reduce) { const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { st.setAttribute('data-in', ''); io.disconnect(); } }, { threshold: .25 }); io.observe(st); } else st.setAttribute('data-in', ''); } }
  if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const tc = $('#tcar');
    tc.addEventListener('pointermove', e => { const c = e.target.closest('.pst'); if (!c) return; const r = c.getBoundingClientRect(); c.style.setProperty('--tx', ((e.clientX - r.left) / r.width - .5).toFixed(3)); c.style.setProperty('--ty', ((e.clientY - r.top) / r.height - .5).toFixed(3)); });
    tc.addEventListener('pointerout', e => { const c = e.target.closest('.pst'); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty('--tx', 0); c.style.setProperty('--ty', 0); } });
  }

  /* ---------------- batches: paper tickets (idea from the reference site's "Next batches"): a dyed head with the start date and a lotus line mark, the
     batch details on cream paper, and a perforated stub with the Register button ---------------- */
  const BYEAR = 2027;   // the start dates are for the 2027 attempt: confirm before launch
  $('#price').innerHTML = BATCHES.map((b, i) => {
    const [d, mon] = b.d.split(' ');
    return `<article class="inv inv--ticket" style="--i:${i}">
      <div class="inv__frame">
        <div class="ticket__head">
          <img class="ticket__lotus" src="assets/img/brand/lotus-ticket.svg" alt="" aria-hidden="true">
          <div class="ticket__date"><span>Batch starts</span><time><b>${d}</b><span>${mon || ''}<small>${BYEAR}</small></span></time></div>
          <span class="ticket__target">Target exam<strong>UPSC ${esc(b.tgt)}</strong></span>
        </div>
        <div class="ticket__body">
          <span class="inv__tag">${esc(b.chip === 'Flagship' ? 'Flagship' : 'Admissions open')}</span>
          <h3>${esc(b.n)}</h3><p class="inv__w">${esc(b.what)}</p>
          <div class="ticket__meta"><dl><div><dt>Study mode</dt><dd>Classroom and LIVE&#8209;Online</dd></div></dl>${b.chip === 'Limited seats' ? '<span class="ticket__limited" aria-label="Limited seats"><span>Limited<br>seats</span></span>' : ''}</div>
        </div>
        <div class="ticket__stub"><a class="inv__reg" href="#contact" data-prog="${esc(b.full)}" aria-label="Register for ${esc(b.full)}">Register<span class="sq sq--38 sq--brand">${ico('arrow-white.svg')}</span></a></div>
      </div></article>`;
  }).join('');
  {
    const invs = $$('.inv');
    // the tickets are laid down one after another as the section arrives
    if (!reduce && 'IntersectionObserver' in window) {
      invs.forEach(c => c.classList.add('inv--pre'));
      const io = new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { const c = e.target; c.classList.add('in'); o.unobserve(c); setTimeout(() => c.classList.remove('inv--pre', 'in'), 1500 + (+c.style.getPropertyValue('--i') || 0) * 110); } }), { threshold: .2 });   // the entrance classes drop away afterwards so they never touch the hover
      invs.forEach(c => io.observe(c));
    }
    // on hover the ticket tilts toward the pointer like a card in the hand: a light glare and a shadow that move with it
    if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) invs.forEach(c => {
      c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        c.style.setProperty('--tx', (px - .5).toFixed(3)); c.style.setProperty('--ty', (py - .5).toFixed(3)); c.style.setProperty('--gx', (px * 100).toFixed(0) + '%'); c.style.setProperty('--gy', (py * 100).toFixed(0) + '%'); });
      c.addEventListener('pointerleave', () => { c.style.setProperty('--tx', 0); c.style.setProperty('--ty', 0); });
    });
  }

  /* ---------------- all batches: every programme with admissions open ---------------- */
  const batchDlg = $('#batchDlg');
  const OPEN = BANNERS.filter(([, t]) => !/^Top 10/.test(t));   // the results banner isn't a programme
  $('#batchDlgH').textContent = `Admissions open: ${OPEN.length} programmes`;
  $('#batchList').innerHTML = OPEN.map(([f, t]) => `<li><a href="#contact" data-prog="${esc(t)}"><img src="assets/img/banners/${f}.webp" alt="" loading="lazy"><span>${esc(t)}${ico('arrow-list.svg')}</span></a></li>`).join('');
  $('#allBatches').addEventListener('click', () => batchDlg.showModal());
  $('#batchDlgX').addEventListener('click', () => batchDlg.close());
  batchDlg.addEventListener('click', e => { if (e.target === batchDlg || e.target.closest('[data-prog]')) batchDlg.close(); });

  /* ---------------- FAQ (one open at a time) ---------------- */
  $('#faqList').innerHTML = FAQS.map(([q, a], i) => `<details class="qa"${i ? '' : ' open'}><summary>${esc(q)}${ico('faq-plus.svg', 20)}</summary><p>${esc(a)}</p></details>`).join('');
  // one answer open at a time + the open/close motion: js/accordion.js

  /* ---------------- resources: six static cards in index.html; their links open the Vajiram & Ravi site until the pages exist ---------------- */
  $$('#resources [data-rs]').forEach(a => { a.href = SITE; a.target = '_blank'; a.rel = 'noopener'; });

  /* ---------------- contact form ---------------- */
  const fProg = $('#fProg');
  fProg.insertAdjacentHTML('beforeend', CATS.map(c => `<optgroup label="${esc(c.t)}">${c.courses.map(t => `<option>${esc(t)}</option>`).join('')}</optgroup>`).join('')
    + `<optgroup label="Upcoming batches">${BATCHES.map(b => `<option>${esc(b.full)}</option>`).join('')}</optgroup>`);
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-prog]'); if (!a) return;
    if (![...fProg.options].some(o => o.value === a.dataset.prog)) fProg.insertAdjacentHTML('beforeend', `<option>${esc(a.dataset.prog)}</option>`);
    fProg.value = a.dataset.prog;
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
    err.textContent = ''; fBtn.disabled = true; $('#formBtnT').textContent = 'Sending…';
    const data = Object.fromEntries(new FormData(form)); data.phone = '+91' + data.phone; data.source = 'homepage';
    try {
      await send(data);
      $('#okMsg').textContent = `A counsellor will call +91 ${$('#fPhone').value} in the ${$('#fTime').value.split(',')[0].toLowerCase()}.`;
      form.classList.add('done'); $('.form__ok', form).focus();
    } catch (ex) {
      err.textContent = ex.message === 'not-configured'
        ? `Online booking isn't connected yet, so nothing was sent. Please call ${PHONE}, Monday to Saturday, 9 am to 7 pm.`
        : `We couldn't send your request. Try again, or call ${PHONE}.`;
    } finally { fBtn.disabled = false; $('#formBtnT').textContent = 'Book a free session'; }
  });
  // footer quick call-back box (not in the v9-style footer; kept in case it returns)
  if ($('#sub')) $('#sub').addEventListener('submit', e => {
    e.preventDefault();
    $('#fPhone').value = $('#subPhone').value.replace(/\D/g, '').slice(0, 10);
    $('#contact').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    setTimeout(() => $('#fName').focus({ preventScroll: true }), reduce ? 0 : 700);
  });

  /* ---------------- footer ---------------- */
  const HREF = { 'About us': '#why', 'Contact us': '#contact', FAQs: '#faq' };
  $('#footCols').innerHTML = FOOTER.map(([h, l]) => `<div><h3>${esc(h)}</h3><ul>${l.map(x => `<li><a href="${HREF[x] || SITE}"${HREF[x] ? '' : ' target="_blank" rel="noopener"'}>${esc(x)}</a></li>`).join('')}</ul></div>`).join('');
  $('#socials').innerHTML = SOCIAL.map(n => `<li><a href="${SITE}" target="_blank" rel="noopener" aria-label="${n}">${ico(`soc-${n.toLowerCase()}.svg`, 18)}</a></li>`).join('');
  $$('.foot__bot a').forEach(a => { a.href = SITE; a.target = '_blank'; a.rel = 'noopener'; });

  /* ---------------- scroll: nav state + word-by-word headline ---------------- */
  // wrap each word, keeping the fixed line spans (.ln) intact
  const reveals = $$('.reveal').map(el => {
    const lines = $$('.ln', el);
    (lines.length ? lines : [el]).forEach(l => { l.innerHTML = l.textContent.trim().split(/\s+/).map(w => `<span class="w">${esc(w)}</span>`).join(' '); });
    return { el, words: $$('.w', el) };
  });
  // Continuous fill: scroll sets a target progress, the shown progress eases
  // toward it every frame, and each word blends ink over peach through a soft
  // edge about three words wide, so the fill glides instead of stepping.
  const SOFT = 3;
  const target = ({ el }) => { const r = el.getBoundingClientRect(), vh = innerHeight; return clamp((vh * .82 - r.top) / (r.height + vh * .3), 0, 1); };
  const paint = rv => {
    const n = rv.words.length, head = rv.p * (n + SOFT);
    rv.words.forEach((w, i) => {
      const k = clamp((head - i) / SOFT, 0, 1);
      if (Math.abs(k - w._k) > .002) { w._k = k; w.style.setProperty('--k', k.toFixed(3)); }
    });
  };
  reveals.forEach(rv => { rv.words.forEach(w => { w._k = -1; }); rv.p = reduce ? 1 : target(rv); paint(rv); });
  let raf = 0;
  const loop = () => {
    raf = 0;
    let moving = false;
    reveals.forEach(rv => {
      const t = target(rv), d = t - rv.p;
      rv.p = Math.abs(d) < .0005 ? t : rv.p + d * .12;   // ease toward the scroll position
      if (rv.p !== t) moving = true;
      paint(rv);
    });
    if (moving) raf = requestAnimationFrame(loop);
  };
  const kick = () => { if (!raf && !reduce) raf = requestAnimationFrame(loop); };
  let navTick = false;
  addEventListener('scroll', () => {
    kick();
    if (!navTick) { navTick = true; requestAnimationFrame(() => { navTick = false; $('#nav').classList.toggle('scrolled', scrollY > 20); }); }
  }, { passive: true });
  addEventListener('resize', kick, { passive: true });
  $('#nav').classList.toggle('scrolled', scrollY > 20);

  // scroll rails (stories, faculty): chevrons scroll one card; each hides at its end of the rail
  $$('.rail').forEach(rail => {
    const track = $('.rail__track', rail), prev = $('.cbtn--prev', rail), next = $('.cbtn--next', rail);
    const cardStep = () => { const c = track.children; return c.length > 1 ? c[1].offsetLeft - c[0].offsetLeft : track.clientWidth; };
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max - 2;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -cardStep() }));
    next.addEventListener('click', () => track.scrollBy({ left: cardStep() }));
    track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') next.click(); if (e.key === 'ArrowLeft') prev.click(); });
    track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    addEventListener('resize', sync, { passive: true });
    sync(); setTimeout(sync, 600);
  });

  // faculty carousel: chevrons and page dots under the rail; one dot per screenful of cards
  {
    const rail = $('#faculty .rail'), track = $('#team'), n = track.children.length;
    const nav = document.createElement('div'); nav.className = 'rnav';
    const TEER = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h11"/><path d="M8.6 3.6C9.4 5.9 11.2 7.4 13.5 8 11.2 8.6 9.4 10.1 8.6 12.4"/></svg>';   // the CTA's arrow
    const chev = d => `<button class="rnav__b rnav__b--${d}" type="button" aria-label="${d === 'prev' ? 'Previous' : 'Next'} faculty"><span class="rnav__a">${TEER}${TEER}</span></button>`;
    nav.innerHTML = `${chev('prev')}<div class="rnav__dots"></div>${chev('next')}`;
    rail.append(nav);
    const dots = $('.rnav__dots', nav), pv = $('.rnav__b--prev', nav), nx = $('.rnav__b--next', nav);
    const step = () => { const c = track.children; return c.length > 1 ? c[1].offsetLeft - c[0].offsetLeft : track.clientWidth; };
    const per = () => { const cs = getComputedStyle(track), w = track.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) + parseFloat(cs.columnGap || 0); return Math.max(1, Math.floor(w / step() + .05)); };
    let pages = 0;
    const cur = () => { const max = track.scrollWidth - track.clientWidth; return track.scrollLeft >= max - 2 ? pages - 1 : Math.min(pages - 1, Math.round(track.scrollLeft / (per() * step()))); };
    const go = k => track.scrollTo({ left: Math.max(0, Math.min(k, pages - 1)) * per() * step() });
    const sync = () => {
      const p = n <= per() ? 1 : Math.ceil((n - per()) / per()) + 1;
      if (p !== pages) {
        pages = p;
        dots.innerHTML = Array.from({ length: p }, (_, k) => `<button type="button" aria-label="Faculty, page ${k + 1} of ${p}"></button>`).join('');
      }
      nav.hidden = pages < 2;
      nav.style.setProperty('--cy', (track.offsetTop + (track.firstElementChild ? track.firstElementChild.offsetHeight : 340) / 2 + 6) + 'px');   // arrows sit level with the middle of the cards
      const k = cur();
      [...dots.children].forEach((d, j) => d.setAttribute('aria-current', j === k ? 'true' : 'false'));
      pv.disabled = k <= 0; nx.disabled = k >= pages - 1;
    };
    pv.addEventListener('click', () => go(cur() - 1));
    nx.addEventListener('click', () => go(cur() + 1));
    dots.addEventListener('click', e => { const b = e.target.closest('button'); if (b) go([...dots.children].indexOf(b)); });
    track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    addEventListener('resize', sync, { passive: true });
    sync(); setTimeout(sync, 600);
  }

  // card groups rise in once as they enter
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    $$('.kcards, .tgrid, .pgrid, .rcards, .fgrid, .qgrid, .bgrid, .agrid, .wc__cards, .wc__stats, .sm__grid').forEach(g => { g.classList.add('rise'); [...g.children].forEach((c, i) => c.style.setProperty('--i', i)); io.observe(g); });
  }
})();
