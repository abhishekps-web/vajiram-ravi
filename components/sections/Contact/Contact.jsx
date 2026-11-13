import Button from '@/components/ui/Button/Button';
import SectionLabel from '@/components/ui/SectionLabel';

// ============ CONTACT ============
export default function Contact() {
  return (
    <section className="sheet sheet--gap contact" id="contact" aria-labelledby="counH">
      <div className="contact__in">
        <div className="contact__l">
          <SectionLabel>Talk to us</SectionLabel>
          <h2 id="counH" className="h2 h2--sec rv" style={{ "--d": ".12s" }}>Need assistance? Talk to our expert counsellor.</h2>
          <p className="intro rv" style={{ "--d": ".2s" }}>Schedule a free call with a Vajiram & Ravi counsellor to answer your questions, with no pressure to enrol.</p>
        </div>
        <form className="form form--note rv" style={{ "--d": ".28s" }} id="form" noValidate data-endpoint="">
          <h3>Book your free session today!</h3>
          <p className="form__sent">
            <span className="line line--name">{"Hi, I'm "}<span className="blank blank--name">
              <input id="fName" name="name" autoComplete="name" required placeholder="your full name" aria-label="Your full name" />
            </span></span>
            <span className="keep">{"and I'm preparing for "}<span className="blank blank--prog">
              <select id="fProg" name="programme" required aria-label="Programme you want to join">
                <option value="">pick a programme</option>
                <option>Not sure yet</option>
              </select>
            </span></span>
            <span className="line line--tel">{"Please call me on "}<span className="blank blank--tel">
              <span className="blank__cc" aria-hidden="true">+91</span>
              <input id="fPhone" name="phone" type="tel" inputMode="numeric" pattern={"[6-9][0-9]{9}"} maxLength="10" autoComplete="tel-national" required placeholder="10-digit mobile" aria-label="Your 10-digit mobile number" />
            </span></span>
            <span className="keep">{"in the "}<span className="blank blank--time">
              <select id="fTime" name="time" required aria-label="Preferred time for the call">
                <option value="">preferred time</option>
                <option>Morning, 9 am to 12 pm</option>
                <option>Afternoon, 12 pm to 4 pm</option>
                <option>Evening, 4 pm to 7 pm</option>
              </select>
            </span></span>
            <span className="line line--mail">{"or email me on "}<span className="blank blank--mail">
              <input id="fEmail" name="email" type="email" autoComplete="email" placeholder="you@email.com" aria-label="Your email, optional" />
            </span></span>
          </p>
          <p className="form__err" id="formErr" role="alert" />
          <Button type="submit" id="formBtn" fullWidth iconEnd="arrow">Book a free session</Button>
          <div className="form__ok" role="status" tabIndex="-1">
            <h3>Request received</h3>
            <p id="okMsg" />
          </div>
        </form>
      </div>
    </section>
  );
}
