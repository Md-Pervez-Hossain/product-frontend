import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <section className="not-found store-container">
      <p className="eyebrow">Error / 404</p>
      <span>404</span>
      <h1>Nothing is displayed here.</h1>
      <Link className="button button-dark" to="/">Return home <span>→</span></Link>
    </section>
  );
}
