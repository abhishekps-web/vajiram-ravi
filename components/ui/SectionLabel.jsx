// The section eyebrow (.lbl in styles/v49.css): a brand label with its ornament line.
//   reveal  rises in with the section (.rv, after --d)       light  for dark grounds (.lbl--w)
//   symbol  an image before the label (.lbl--sym)            delay  the reveal delay (default .05s)
export default function SectionLabel({ children, reveal = true, delay = '.05s', light = false, symbol }) {
  const cls = ['lbl', light && 'lbl--w', symbol && 'lbl--sym', reveal && 'rv'].filter(Boolean).join(' ');
  return (
    <div className={cls} style={reveal ? { '--d': delay } : undefined}>
      {symbol && <img className="lbl__sym" src={symbol.src} alt="" width={symbol.width} height={symbol.height} />}
      <span className="lbl__t">{children}</span>
      <i />
      <span className={light ? 'lbl__orn lbl__orn--w' : 'lbl__orn'} aria-hidden="true" />
    </div>
  );
}
