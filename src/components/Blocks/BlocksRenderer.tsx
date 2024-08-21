
import { HeadingBlock } from "./HeadingBlock";
import { ImageBlock } from "./ImageBlock";
import { ListBlock } from "./ListBlock";
import { QuoteBlock } from "./QuoteBlock";
import { TextBlock } from "./TextBlock";
import { Block } from "./Types";

export const BlocksRenderer: React.FC<{ block: Block }> = ({ block }) => {
    const renderBlock = (block: Block) => {
      switch (block.type) {
        case "text":
          return <TextBlock content={block.data.content} />;
        case "image":
          return <ImageBlock src={block.data.src} alt={block.data.alt} />;
        case "heading":
          return <HeadingBlock level={block.data.level} content={block.data.content} />;
        case "quote":
          return <QuoteBlock content={block.data.content} author={block.data.author} />;
        case "list":
          return <ListBlock items={block.data.items} ordered={block.data.ordered} />;
        default:
          return null;
      }
    };
  
    return renderBlock(block);
  };