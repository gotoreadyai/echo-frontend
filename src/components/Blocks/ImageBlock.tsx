
// Image Block Component
export const ImageBlock: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <img src={src} alt={alt} className="my-4 w-full" />
);