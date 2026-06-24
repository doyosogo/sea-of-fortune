export default function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="stat-card" title={hint}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
