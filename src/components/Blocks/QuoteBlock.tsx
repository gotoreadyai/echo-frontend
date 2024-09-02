
// Quote Block Component
export type QuoteBlockT = {
  content: string;
  author?: string;
}
export const QuoteBlock: React.FC<QuoteBlockT> = ({ content, author }) => (
  <blockquote className="border-l-4 container mx-auto italic">
    {content}
    {author && <cite className="block mt-2 text-right">- {author}</cite>}
  </blockquote>
);