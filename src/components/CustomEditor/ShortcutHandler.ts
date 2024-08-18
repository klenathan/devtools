// @ts-nocheck
import { Editor, Transforms, Element, Text } from "slate";
import { ToastActionElement } from "../ui/toast";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";
import { Button } from "../ui/button";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const ELEMENT_TAGS = {
  A: (el) => ({ type: "link", url: el.getAttribute("href") }),
  BLOCKQUOTE: () => ({ type: "quote" }),
  H1: () => ({ type: "heading-one" }),
  H2: () => ({ type: "heading-two" }),
  H3: () => ({ type: "heading-three" }),
  H4: () => ({ type: "heading-four" }),
  H5: () => ({ type: "heading-five" }),
  H6: () => ({ type: "heading-six" }),
  IMG: (el) => ({ type: "image", url: el.getAttribute("src") }),
  LI: () => ({ type: "list-item" }),
  OL: () => ({ type: "numbered-list" }),
  P: () => ({ type: "paragraph" }),
  PRE: () => ({ type: "code" }),
  UL: () => ({ type: "bulleted-list" }),
  TABLE: () => ({ type: "table" }),
  TBODY: () => ({ type: "tbody" }),
  THEAD: () => ({ type: "thead" }),
  TR: () => ({ type: "table-row" }),
  TD: () => ({ type: "table-cell" }),
  TH: () => ({ type: "table-cell-header" }),
  HEADER: () => ({ type: "header" }),
  SECTION: () => ({ type: "section" }),
};

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => Text.isText(n) && n[format] === true,
    universal: true,
  });
  return !!match;
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });
  return !!match;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const handleKeyDown = (
  event: React.KeyboardEvent,
  editor: Editor,
  toast: any
) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "b") {
    event.preventDefault();
    toggleMark(editor, "bold");
  }
  if ((event.ctrlKey || event.metaKey) && event.key === "i") {
    event.preventDefault();
    toggleMark(editor, "italic");
  }
  if ((event.ctrlKey || event.metaKey) && event.key === "u") {
    event.preventDefault();
    toggleMark(editor, "underline");
  }
  if ((event.ctrlKey || event.metaKey) && event.key === "s") {
    event.preventDefault();
    toast({
      title: "You hit saved!",
      description: "Nothing is wrong, just that the editor save for you :b",
    });
  }
};

export { toggleMark, isMarkActive, isBlockActive, toggleBlock, handleKeyDown };
