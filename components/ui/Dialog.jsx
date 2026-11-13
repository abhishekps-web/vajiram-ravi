// A site dialog (.dlg): a heading, a close button and a list that a behaviour fills in.
// The ids are the hooks the behaviours use (showModal, the close button, the list); `list` is the list element ('ul' or 'ol').
export default function Dialog({ id, className = 'dlg', titleId, title, closeId, list: List = 'ul', listClass, listId }) {
  return (
    <dialog className={className} id={id} aria-labelledby={titleId}>
      <div className="dlg__head">
        <h3 id={titleId}>{title}</h3>
        <button className="dlg__x" id={closeId} type="button" aria-label="Close">
          <img src="/assets/img/icons/faq-x.svg" alt="" width="20" height="20" />
        </button>
      </div>
      <List className={listClass} id={listId} />
    </dialog>
  );
}
