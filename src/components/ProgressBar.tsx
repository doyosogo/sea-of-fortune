export default function ProgressBar({ value, max, label }: { value: number; max: number; label?: string }) {
  const percent = Math.max(0, Math.min(100, (value / Math.max(1, max)) * 100));
  return (
    <div className="progress-wrap" title={label}>
      <div className="progress-label">
        <span>{label}</span>
        <span>
          {Math.ceil(value)} / {Math.ceil(max)}
        </span>
      </div>
      <div className="progress">
        <span style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
