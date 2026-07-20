import { ImagePlaceholder } from '../ui/ImagePlaceholder.jsx';

export function ProductArtwork({ product, size = 'card' }) {
  return (
    <ImagePlaceholder
      className={`product-art product-art-${size}`}
      label={`Image placeholder for ${product.name}`}
      hint={size === 'detail' ? 'Recommended 1400 × 1600' : 'Recommended 1000 × 1250'}
    />
  );
}
