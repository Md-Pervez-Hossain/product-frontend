export function ImagePlaceholder({ className = '', label = 'Image placeholder', hint }) {
  return (
    <div className={`image-placeholder ${className}`} role="img" aria-label={label}>
      <div className="image-placeholder-copy">
        <span>Image placeholder</span>
        {hint && <small>{hint}</small>}
      </div>
    </div>
  );
}
