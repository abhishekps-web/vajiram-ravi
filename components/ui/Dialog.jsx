import Button from '@/components/ui/Button';
// A site dialog (.dlg): a heading, a close button and a list, server-rendered from `children` or filled in by a behaviour.
// The ids are the hooks the behaviours use (showModal, the close button, the list); `list` is the list element ('ul' or 'ol').
export default function Dialog({ id, className = 'dlg', titleId, title, closeId, list: List = 'ul', listClass, listId, children }) {
  return (
    <dialog className={className} id={id} aria-labelledby={titleId}>
      <div className="dlg__head">
        <h3 id={titleId}>{title}</h3>
        <Button variant="outline" size="sm" className="dlg__x" id={closeId} iconOnly iconStart="close" label="Close" />
      </div>
      <List className={listClass} id={listId}>{children}</List>
    </dialog>
  );
}
