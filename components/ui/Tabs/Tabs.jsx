/* The site's tab bar (user 2026-11-21: one component for every tab bar): a sand bar of labels and one brand pill that slides to the
   chosen tab. Styles public/css/tabs.css; behaviour tabs-core.js (initTabs) for server-rendered bars, ControlledTabs.jsx for React ones.
   items: [{ id, label, count?, hidden?, className?, domId?, ariaLabel? }]; value: the chosen id (the first by default); controls: the id of the
   panel the tabs drive. Anything else (className, style, hidden …) goes on the bar; children sit after the tabs, inside the bar. */
export default function Tabs({ items, value, label, controls, id, className = '', listClassName = '', children, ...rest }) {
  const chosen = value ?? items[0]?.id;
  return (
    <div className={`tabs${className ? ` ${className}` : ''}`} {...rest}>
      <div className={`tabs__list${listClassName ? ` ${listClassName}` : ''}`} role="tablist" aria-label={label} id={id}>
        {items.map((it) => {
          const on = it.id === chosen;
          return (
            <button
              key={it.id}
              type="button"
              role="tab"
              id={it.domId}
              className={`tab${it.className ? ` ${it.className}` : ''}`}
              data-tab={it.id}
              aria-label={it.ariaLabel}
              aria-selected={on}
              aria-controls={controls}
              tabIndex={on ? 0 : -1}
              hidden={it.hidden || undefined}
            >
              {it.label}
              {it.count != null && <span className="tab__n">{it.count}</span>}
            </button>
          );
        })}
        <span className="tabs__ind" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}
