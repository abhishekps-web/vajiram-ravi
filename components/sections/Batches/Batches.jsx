import Dialog from '@/components/ui/Dialog';
import { ArrowIcon } from '@/components/ui/ArrowIcon';

// ============ BATCHES ============
export default function Batches() {
  return (
    <>
      <section className="band dots band--gap" id="batches" aria-labelledby="batH">
        <h2 id="batH" className="h2 h2--sec rv" style={{ "--d": ".08s" }}>Next batches starting soon.</h2>
        <div className="bhead rv" style={{ "--d": ".16s" }}>
          <p className="intro">{"Register online, or call "}<a href="tel:08062206330">080-6220-6330</a>{" for registration or seat allotment, Monday to Saturday, 9 am to 7 pm."}</p>
          <button className="tlink" id="allBatches" type="button">
            <span>View all batches</span>
            <ArrowIcon />
          </button>
        </div>
        <div className="cards" id="price" />
      </section>
      <Dialog id="batchDlg" className="dlg dlg--cat" titleId="batchDlgH" title="Admissions open" closeId="batchDlgX" listClass="dlg__ban" listId="batchList" />
    </>
  );
}
