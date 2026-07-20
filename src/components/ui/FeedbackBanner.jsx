export function FeedbackBanner({ message, onDismiss }) {
  return (
    <div className="feedback-banner" role="alert">
      <p>{message}</p>
      <button type="button" aria-label="Dismiss message" onClick={onDismiss}>×</button>
    </div>
  );
}
