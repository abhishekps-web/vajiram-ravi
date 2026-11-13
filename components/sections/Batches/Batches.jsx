import Button from '@/components/ui/Button/Button';
import Dialog from '@/components/ui/Dialog';

// ============ BATCHES ============
export default function Batches() {
  return (
    <>
      <section className="band dots band--gap" id="batches" aria-labelledby="batH">
        <h2 id="batH" className="h2 h2--sec rv" style={{ "--d": ".08s" }}>Next batches starting soon.</h2>
        <div className="bhead rv" style={{ "--d": ".16s" }}>
          <p className="intro">{"Register online, or call "}<a href="tel:08062206330">080-6220-6330</a>{" for registration or seat allotment, Monday to Saturday, 9 am to 7 pm."}</p>
          <Button variant="link" id="allBatches" iconEnd="arrow">View all batches</Button>
        </div>
        {/* one horizontal carousel (user 2026-11-13): the tickets in a single scroll-snapping row (the .rail primitive, v25.css;
            sizes and arrows at the end of v49.css), turned by the arrows (components/ui/rail.js), a swipe, or ← → on the focused row */}
        <div className="rail rail--batch">
          <div className="cards rail__track" id="price" tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Upcoming batches" />
          <div className="rail__nav rv" style={{ "--d": ".24s" }}>
            <Button variant="outline" iconOnly iconStart="arrow-left" label="Previous batches" className="cbtn cbtn--prev" />
            <Button variant="outline" iconOnly iconStart="arrow" label="Next batches" className="cbtn cbtn--next" />
          </div>
        </div>
      </section>
      <Dialog id="batchDlg" className="dlg dlg--cat" titleId="batchDlgH" title="Admissions open" closeId="batchDlgX" listClass="dlg__ban" listId="batchList" />
    </>
  );
}
