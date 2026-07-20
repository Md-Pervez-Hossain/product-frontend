export function ProtectedPrompt({ eyebrow, title, copy, onOpenAuth }) {
  return (
    <section className="protected-prompt">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{copy}</p>
      <button className="button button-dark" type="button" onClick={onOpenAuth}>
        Sign in to continue <span>→</span>
      </button>
    </section>
  );
}
