// ============ FOOTER ============
// footer: v21's layout with a saree border and a Hindi line
export default function Footer() {
  return (
    <footer className="foot">
      <img className="foot__scene" src="/assets/img/photos/footer-classroom.webp" alt="" aria-hidden="true" decoding="async" loading="lazy" />
      <span className="foot__frame" aria-hidden="true" />
      {/* gold double rule + corner diamonds (Figma 2164:5557 "ornament border"); styles/v49.css */}
      <div className="foot__top">
        <div className="foot__brand">
          <a className="foot__logo foot__logo--mark" href="#top" aria-label="Vajiram & Ravi, back to top">
            <img src="/assets/img/brand/logo-white.png" alt="Vajiram & Ravi, Institute for IAS Examination" width="966" height="227" loading="lazy" decoding="async" />
          </a>
          <p>Best IAS coaching in Delhi, India. Preparing UPSC aspirants in Old Rajinder Nagar since 1976.</p>
          <ul className="socials" id="socials" />
        </div>
        <div className="foot__cols" id="footCols" />
      </div>
      <div className="foot__news" aria-labelledby="footNewsH">
        <h3 className="foot__news-k" id="footNewsH">{"Latest current affairs "}<span className="foot__news-live"><i aria-hidden="true" />Updated daily</span></h3>
        <ul className="foot__news-list">
          <li>
            <span>Mains</span>
            <a href="https://vajiramandravi.com/" target="_blank" rel="noopener">Supreme Court redefines the meaning of ‘industry’</a>
          </li>
          <li>
            <span>Mains</span>
            <a href="https://vajiramandravi.com/" target="_blank" rel="noopener">NITI Aayog flags gap between education and employment</a>
          </li>
          <li>
            <span>Prelims</span>
            <a href="https://vajiramandravi.com/" target="_blank" rel="noopener">Thiksey Monastery</a>
          </li>
        </ul>
      </div>
      <p className="foot__word" aria-hidden="true">Vajiram<span>&</span>Ravi</p>
      <div className="foot__bot">
        <span>© 2026 Vajiram & Ravi. All rights reserved.</span>
        <span>
          <a href="#">Terms and Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Grievance Redressal</a>
        </span>
      </div>
    </footer>
  );
}
