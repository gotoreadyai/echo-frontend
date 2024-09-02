
// Image Block Component
export type ImageBlockT = {
  src: string;
  alt: string;
}
export const ImageBlock: React.FC<ImageBlockT> = ({ src, alt }) => (
  <img src={src} alt={alt} className="container mx-auto w-full" />
);