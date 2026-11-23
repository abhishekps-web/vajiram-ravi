export default function ProgressBar({ className, duration, track = false, as: Tag = 'span', ...rest }) {
  const cls = ['pbar', track && 'pbar--track', className].filter(Boolean).join(' ');
  return (
    <Tag aria-hidden="true" className={cls} style={duration ? { '--pb-t': duration } : undefined} {...rest}>
      <b />
    </Tag>
  );
}
