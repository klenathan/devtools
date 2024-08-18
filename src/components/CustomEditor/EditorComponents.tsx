import { Heading1, Heading2, Heading3, Quote } from "lucide-react";
import { Editor } from "slate";
import { Toggle } from "../ui/toggle";
import { isBlockActive, toggleBlock } from "./ShortcutHandler";

export function EditorHeading1(props: any) {
  return (
    <h1 className="text-3xl font-bold py-2" {...props.attributes}>
      {props.children}
    </h1>
  );
}
export function EditorHeading2(props: any) {
  return (
    <h2 className="text-2xl font-bold py-1" {...props.attributes}>
      {props.children}
    </h2>
  );
}

export function DefaultParagraph(props: any) {
  return (
    <p
      className={`
    ${props.element.align == "center" ? "text-center" : "text-left"}`}
      {...props.attributes}
    >
      {props.children}
    </p>
  );
}

export function EditorCode(props: any) {
  return (
    <pre
      {...props.attributes}
      className="text-foreground bg-slate-200 dark:bg-card p-2 rounded"
    >
      <code {...props.attributes}>{props.children}</code>
    </pre>
  );
}

export function EditorBlockQuote(props: any) {
  return (
    <blockquote className="text-xl italic text-center" {...props.attributes}>
      <i contentEditable={false}>"</i>
      {props.children}
      <i contentEditable={false}>"</i>
    </blockquote>
  );
}

export function BlockButton({
  editor,
  format,
}: {
  editor: Editor;
  format: string;
}) {
  let icon = null;
  switch (format) {
    case "heading-one":
      icon = <Heading1 size={24} />;
      break;
    case "heading-two":
      icon = <Heading2 size={24} />;
      break;
    case "heading-three":
      icon = <Heading3 size={24} />;
      break;
    case "block-quote":
      icon = <Quote size={16} />;
      break;
  }

  return (
    <Toggle
      variant={"outline"}
      pressed={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Toggle>
  );
}
