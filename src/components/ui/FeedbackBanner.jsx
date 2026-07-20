export function FeedbackBanner({ message }) {
  return (
    <div className="feedback-banner" role="alert">
      <span>!</span>
      <p>{message}</p>
    </div>
  );
}
