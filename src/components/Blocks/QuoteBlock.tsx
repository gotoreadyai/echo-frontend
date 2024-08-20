
// Quote Block Component
export const QuoteBlock: React.FC<{ content: string; author?: string }> = ({ content, author }) => (
  <blockquote className="border-l-4 pl-4 my-4 italic">
    {content}
    {author && <cite className="block mt-2 text-right">- {author}</cite>}
  </blockquote>
);