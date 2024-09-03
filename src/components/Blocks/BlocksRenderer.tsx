import { CrudManager } from "../CrudManager/CrudManager";
import FormJSONInputBlock from "./Form/FormJSONInputBlock";
import FormRelationInputBlock from "./Form/FormRelationInputBlock";
import FormSelectInputBlock from "./Form/FormSelectInputBlock";
import FormTextareaBlock from "./Form/FormTextareaInputBlock";
import FormTextInputBlock from "./Form/FormTextInputBlock";
import { HeadingBlock, HeadingBlockT } from "./Content/HeadingBlock";
import { ImageBlock, ImageBlockT } from "./Content/ImageBlock";
import { ListBlock, ListBlockT } from "./Content/ListBlock";
import { QuoteBlock, QuoteBlockT } from "./Content/QuoteBlock";
import { TextBlock, TextBlockT } from "./Content/TextBlock";
import { Block } from "./Types";
import { LinkBlock, LinkBlockT } from "./Content/LinkBlock";
import { FormButtonBlock, FormButtonBlockT } from "./Form/FormButtonBlock";

export const BlocksRenderer: React.FC<{ block: Block }> = ({ block }) => {
  const renderBlock = (block: Block) => {
    switch (block.type) {
      /* Forms blocks */
      case "formTextInput":
        return (
          <FormTextInputBlock
            id={(block.data as { id: string }).id}
            label={(block.data as { label: string }).label}
            value={(block.data as { value: string }).value}
            isRequired={(block.data as { isRequired: boolean }).isRequired}
            onChange={
              (block.data as { onChange: (value: string) => void }).onChange
            }
          />
        );
      case "formTextarea":
        return (
          <FormTextareaBlock
            id={(block.data as { id: string }).id}
            label={(block.data as { label: string }).label}
            value={(block.data as { value: string }).value}
            isRequired={(block.data as { isRequired: boolean }).isRequired}
            onChange={
              (block.data as { onChange: (value: string) => void }).onChange
            }
          />
        );
      case "formJSONInput":
        return (
          <FormJSONInputBlock
            id={(block.data as { id: string }).id}
            label={(block.data as { label: string }).label}
            value={(block.data as { value: object }).value}
            isRequired={(block.data as { isRequired: boolean }).isRequired}
            onChange={
              (block.data as { onChange: (value: object) => void }).onChange
            }
          />
        );
      case "formSelectInput":
        return (
          <FormSelectInputBlock
            id={(block.data as { id: string }).id}
            label={(block.data as { label: string }).label}
            value={(block.data as { value: string }).value}
            options={
              (block.data as { options: { value: string; label: string }[] })
                .options
            }
            isRequired={(block.data as { isRequired: boolean }).isRequired}
            onChange={
              (block.data as { onChange: (value: string) => void }).onChange
            }
          />
        );
      case "formRelationInput":
        return (
          <FormRelationInputBlock
            id={(block.data as { id: string }).id}
            label={(block.data as { label: string }).label}
            value={(block.data as { value: string }).value}
            isRequired={(block.data as { isRequired: boolean }).isRequired}
            onChange={
              (block.data as { onChange: (value: string) => void }).onChange
            }
          />
        );
      case "text":
        return <TextBlock content={(block.data as TextBlockT).content} />;

      /* Content blocks */
      case "image":
        return (
          <ImageBlock
            src={(block.data as ImageBlockT).src}
            alt={(block.data as ImageBlockT).alt}
          />
        );

      case "heading":
        return (
          <HeadingBlock
            content={(block.data as HeadingBlockT).content}
            level={(block.data as HeadingBlockT).level}
          />
        );
      case "quote":
        return (
          <QuoteBlock
            content={(block.data as QuoteBlockT).content}
            author={(block.data as QuoteBlockT).author}
          />
        );
      case "list":
        return (
          <ListBlock
            items={(block.data as ListBlockT).items}
            ordered={(block.data as ListBlockT).ordered}
          />
        );
      case "link": // Dodanie obsługi bloku Link
        return (
          <LinkBlock
            to={(block.data as LinkBlockT).to}
            text={(block.data as LinkBlockT).text}
            target={(block.data as LinkBlockT).target}
          />
        );
      case "formButton": // Dodanie obsługi bloku Button
        return (
          <FormButtonBlock
            title={(block.data as FormButtonBlockT).title}
            onClick={(block.data as FormButtonBlockT).onClick}
          />
        );

      /* System blocks */
      case "crud":
        return <CrudManager />;

      default:
        return null;
    }
  };

  return renderBlock(block);
};
