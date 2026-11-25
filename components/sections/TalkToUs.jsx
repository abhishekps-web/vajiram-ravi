import Button from '@/components/ui/Button';
import SectionWrapper from '@/components/ui/section_wrapper';
import SectionLabel from '@/components/ui/SectionLabel';
import { $, $$, esc, PHONE, SITE } from '@/lib/site';
import { CATS } from '@/lib/data/courses';
import { BATCHES } from '@/lib/data/batches';
import { setButtonLoading } from '@/components/ui/Button';
import '@/app/tailwind-sections.css';
import { TIMES, MSG } from '@/lib/data/talk-to-us';



const delay = s => ({ '--d': `${s}s` });

const SECTION = [
  'cu:relative cu:isolate cu:overflow-hidden cu:text-white',
  'cu:[background:radial-gradient(48%_60%_at_85%_20%,rgba(255,190,130,.3),transparent_70%),radial-gradient(45%_55%_at_8%_100%,rgba(170,70,30,.25),transparent_70%),linear-gradient(135deg,#E8683A_0%,#D45A2A_55%,#C24E22_100%)]',
  'cu:before:absolute cu:before:inset-[-44px] cu:before:-z-1 cu:before:pointer-events-none cu:before:opacity-[.14]',
  'cu:before:[background:url(/assets/img/patterns/jaali.svg)_0_0/44px_44px_repeat] cu:max-[640px]:before:[background-size:32px_32px]',
  'cu:before:[mask:radial-gradient(78%_70%_at_50%_55%,transparent_40%,#000_100%)]',
  'cu:before:[transition:opacity_.9s_var(--ease),transform_1.2s_var(--ease)]',
  'cu:[.fx-on_&:not(:has(h2.in))]:before:opacity-0 cu:[.fx-on_&:not(:has(h2.in))]:before:[transform:translateY(18px)]',
  'cu:fine:hover:before:[transform:translate(22px,-22px)] cu:motion-reduce:before:transition-none cu:motion-reduce:before:[transform:none]',
].join(' ');

const INNER = [
  'cu:relative cu:grid cu:grid-cols-[minmax(0,1fr)_minmax(0,600px)] cu:gap-x-[56px] cu:gap-y-(--hd-gap) cu:*:min-w-0',
  'cu:min-[901px]:items-center',
  'cu:min-[1101px]:max-[1279px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] cu:min-[1101px]:max-[1279px]:gap-x-[48px]',
  'cu:max-[1100px]:grid-cols-[minmax(0,1fr)]',
].join(' ');

const HEAD = 'cu:relative cu:flex cu:flex-col';

const FORM = [
  'cu:relative cu:self-start cu:pt-[34px] cu:px-[40px] cu:pb-[30px] cu:max-[600px]:pt-[30px] cu:max-[600px]:px-[28px] cu:max-[600px]:pb-[26px]',
  'cu:rounded-(--r-form) cu:bg-white cu:text-(--ink) cu:[box-shadow:0_30px_50px_-28px_rgba(60,15,0,.6)]',
  'cu:min-[901px]:max-[1100px]:w-full cu:min-[901px]:max-[1100px]:max-w-[720px]',
  'cu:before:absolute cu:before:inset-[12px] cu:before:pointer-events-none cu:before:border-[16px] cu:before:border-solid cu:before:border-transparent',
  'cu:before:[border-image:url(/assets/img/patterns/frame.svg)_16_/_1_/_0_stretch]',
].join(' ');

const EYEBROW = 'cu:m-0 cu:[font:700_11.5px/1.2_var(--f)] cu:tracking-[.16em] cu:uppercase cu:text-(--brand)';

const SENT = [
  'cu:block cu:mt-[10px] cu:mb-[8px] cu:max-[600px]:mb-[6px] cu:tracking-[-.005em] cu:text-(--ink)',
  'cu:[font:500_clamp(19px,1.6vw,24px)/1.85_var(--f-d)] cu:max-[600px]:text-[19px] cu:max-[600px]:leading-[2]',
].join(' ');

const CLAUSE = [
  'cu:flex cu:flex-wrap cu:items-baseline cu:gap-x-[.35em] cu:gap-y-0 cu:whitespace-nowrap',
  'cu:max-[600px]:flex-col cu:max-[600px]:items-stretch cu:max-[600px]:gap-[6px] cu:max-[600px]:mb-[20px] cu:max-[600px]:whitespace-normal',
].join(' ');

const SAY = 'cu:max-[600px]:block cu:max-[600px]:leading-[1.25] cu:max-[600px]:whitespace-normal';

const BLANK = 'cu:relative cu:flex cu:flex-[1_1_9em] cu:min-w-0 cu:items-baseline cu:align-baseline cu:max-[600px]:flex-none cu:max-[600px]:w-full cu:[&_.cs]:w-full cu:[&_.cs]:max-w-none';

const FIELD = [
  'cu:min-w-0 cu:max-w-none cu:h-[1.5em] cu:px-[6px] cu:py-0 cu:border-0 cu:[border-bottom:2px_dashed_rgba(194,65,12,.6)] cu:rounded-[2px_2px_0_0] cu:[box-shadow:none]',
  'cu:[font:600_1.18em/1.5_Caveat,"Segoe_Script",cursive] cu:tracking-[0] cu:text-[#1B2A52] cu:text-ellipsis cu:outline-none',
  'cu:[transition:background-color_.2s,border-color_.2s]',
  'cu:focus:[border-bottom:2px_solid_var(--brand)] cu:focus:bg-[rgba(254,170,28,.14)]',
  'cu:aria-invalid:not-focus:[border-bottom:2px_solid_#C0362C] cu:aria-invalid:not-focus:bg-[rgba(192,54,44,.08)]',
].join(' ');
const INPUT = `${FIELD} cu:w-full cu:bg-transparent cu:placeholder:text-[rgba(27,42,82,.38)] cu:placeholder:font-medium`;
const SELECT = [
  FIELD,
  'cu:w-full cu:appearance-none cu:cursor-pointer cu:pr-[24px] cu:[background:url(/assets/img/icons/chev-down.svg)_right_4px_center/15px_15px_no-repeat_transparent]',
  'cu:invalid:text-[rgba(27,42,82,.38)] cu:invalid:font-medium cu:[&_option]:[font:500_16px_var(--f)] cu:[&_option]:text-(--ink)',
].join(' ');

const ERR = 'cu:empty:hidden cu:min-h-[22px] cu:mt-[10px] cu:mb-0 cu:text-[13.5px] cu:leading-[20px] cu:text-(--brand)';

const CONSENT = 'cu:mt-[14px] cu:mb-0 cu:[font:400_12.5px/1.6_var(--f)] cu:text-[#7A6A58] cu:text-left cu:text-pretty';
const CONSENT_LINK = [
  'cu:text-(--brand) cu:underline cu:decoration-1 cu:underline-offset-2 cu:[transition:color_.25s_var(--ease)] cu:hover:text-[#9A3412]',
  'cu:focus-visible:[outline:2px_solid_var(--brand)] cu:focus-visible:outline-offset-2 cu:focus-visible:rounded-[2px] cu:motion-reduce:transition-none',
].join(' ');

const DONE = 'cu:hidden cu:[.done_&]:flex cu:absolute cu:inset-0 cu:flex-col cu:justify-center cu:p-[28px] cu:rounded-[20px] cu:bg-white';

function Clause({ say, label, htmlFor, tel, children }) {
  return (
    <span className={CLAUSE}>
      <span className={SAY}>{say}</span>
      <label className="cu:hidden" htmlFor={htmlFor}>{label}</label>
      <span className={tel ? `${BLANK} cu:gap-[6px]` : BLANK}>{children}</span>
    </span>
  );
}

export default function TalkToUs() {
  return (
    <SectionWrapper id="contact" labelledBy="counH" compact className={SECTION}>
      <div className={INNER}>
        <div className={HEAD}>
          <SectionLabel tone="dark">Talk to us</SectionLabel>
          <h2 id="counH" className="h2 h2--sec rv cu:text-white!" style={delay(.12)}>Need assistance? Talk to our expert counsellor.</h2>
          <p className="intro rv cu:max-w-[520px]! cu:text-[rgba(255,255,255,.92)]!" style={delay(.2)}>Schedule a free call with a Vajiram & Ravi counsellor to answer your questions, with no pressure to enrol.</p>
        </div>
        <form className={`rv ${FORM}`} style={delay(.28)} id="form" noValidate data-endpoint="">
          <h3 className={EYEBROW}>Book your free session today!</h3>
          <p className={SENT}>
            <Clause say="Hi, I'm " label="Full name" htmlFor="fName">
              <input id="fName" className={INPUT} name="name" autoComplete="name" required placeholder="your full name" aria-label="Your full name" />
            </Clause>
            <Clause say="and I'm preparing for " label="Programme" htmlFor="fProg">
              <select id="fProg" className={SELECT} name="programme" required aria-label="Programme you want to join">
                <option value="">pick a programme</option>
                <option>Not sure yet</option>
              </select>
            </Clause>
            <Clause say="Please call me on " label="Mobile number" htmlFor="fPhone" tel>
              <span className="cu:[font:600_1.05em_Caveat,cursive] cu:text-[rgba(27,42,82,.6)]" aria-hidden="true">+91</span>
              <input id="fPhone" className={`${INPUT} cu:flex-[1_1_0%] cu:w-auto!`} name="phone" type="tel" inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength="10" autoComplete="tel-national" required placeholder="10-digit mobile" aria-label="Your 10-digit mobile number" />
            </Clause>
            <Clause say="in the " label="Preferred time for the call" htmlFor="fTime">
              <select id="fTime" className={SELECT} name="time" required aria-label="Preferred time for the call">
                <option value="">preferred time</option>
                {TIMES.map(t => <option key={t}>{t}</option>)}
              </select>
            </Clause>
            <Clause say="or email me on " label="Email (optional)" htmlFor="fEmail">
              <input id="fEmail" className={INPUT} name="email" type="email" autoComplete="email" placeholder="you@email.com" aria-label="Your email, optional" />
            </Clause>
          </p>
          <p className={ERR} id="formErr" role="alert" />
          <Button type="submit" id="formBtn" fullWidth iconEnd="arrow" className="cu:mt-[18px]">Book a free session</Button>
          <p className={CONSENT}>
            By submitting, you agree that Vajiram &amp; Ravi may contact you by phone, WhatsApp, SMS or email about our programmes, batches
            and events. You can opt out at any time. See our{" "}
            <a className={CONSENT_LINK} href={`${SITE}privacy-policy/`} target="_blank" rel="noopener">Privacy Policy</a> for details.
          </p>
          <div className={DONE} id="formOk" role="status" tabIndex="-1">
            <h3 className={EYEBROW}>Request received</h3>
            <p id="okMsg" />
          </div>
        </form>
      </div>
    </SectionWrapper>
  );
}

const optgroup = (label, items) => `<optgroup label="${esc(label)}">${items.map(t => `<option>${esc(t)}</option>`).join('')}</optgroup>`;

async function send(url, body) {
  if (!url) throw new Error('not-configured');
  const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), 12000);
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctrl.signal });
    if (!r.ok) throw new Error('http-' + r.status);
  } finally { clearTimeout(t); }
}

export function initTalkToUs() {
  const form = $('#form');
  if (!form) return;
  const field = Object.fromEntries(Object.keys(MSG).map(id => [id, $('#' + id)]));
  const { fName, fPhone, fProg, fTime } = field;
  const err = $('#formErr'), btn = $('#formBtn');

  fProg.insertAdjacentHTML('beforeend', CATS.map(c => optgroup(c.t, c.courses)).join('') + optgroup('Upcoming batches', BATCHES.map(b => b.full)));
  if (window.enhanceSelect) { window.enhanceSelect(fProg); window.enhanceSelect(fTime); }

  document.addEventListener('click', e => {
    const prog = e.target.closest('[data-prog]')?.dataset.prog;
    if (!prog) return;
    if (![...fProg.options].some(o => o.value === prog)) fProg.insertAdjacentHTML('beforeend', `<option>${esc(prog)}</option>`);
    fProg.value = prog;
    fProg.dispatchEvent(new Event('change', { bubbles: true }));
  });

  fPhone.addEventListener('input', () => { fPhone.value = fPhone.value.replace(/\D/g, '').replace(/^(91|0)(?=\d{10})/, '').slice(0, 10); });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (btn.disabled) return;
    $$('[aria-invalid]', form).forEach(el => el.removeAttribute('aria-invalid'));
    fName.value = fName.value.trim();
    const bad = Object.values(field).find(el => !el.checkValidity());
    if (bad) { bad.setAttribute('aria-invalid', 'true'); err.textContent = MSG[bad.id]; bad.focus(); return; }

    err.textContent = '';
    setButtonLoading(btn, true, 'Sending…');
    const data = { ...Object.fromEntries(new FormData(form)), phone: '+91' + fPhone.value, source: 'homepage' };
    try {
      await send(form.dataset.endpoint, data);
      $('#okMsg').textContent = `A counsellor will call +91 ${fPhone.value} in the ${fTime.value.split(',')[0].toLowerCase()}.`;
      form.classList.add('done');
      $('#formOk').focus();
    } catch (ex) {
      err.textContent = ex.message === 'not-configured'
        ? `Online booking isn't connected yet, so nothing was sent. Please call ${PHONE}, Monday to Saturday, 9 am to 7 pm.`
        : `We couldn't send your request. Try again, or call ${PHONE}.`;
    } finally { setButtonLoading(btn, false); }
  });
}
