export function StatStrip({ productCount, totalStock, orderCount }) {
  const stats = [
    ['Products', productCount],
    ['Units in stock', totalStock],
    ['Orders', orderCount],
  ];

  return (
    <dl className="stat-strip">
      {stats.map(([label, value]) => (
        <div key={label} className="stat-item">
          <dt>{label}</dt>
          <dd>{String(value).padStart(2, '0')}</dd>
        </div>
      ))}
    </dl>
  );
}
