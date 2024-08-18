import { useCallback, useEffect, useMemo, useState } from "react";
import { Editor, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";

import { Bold, Italic, Underline } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Toaster } from "../ui/toaster";
import { useToast } from "../ui/use-toast";
import { BlockButton } from "./EditorComponents";
import RenderElementCallback from "./RenderElementCallback";
import { handleKeyDown, toggleMark } from "./ShortcutHandler";

const initialValueObj = [
  {
    type: "heading-one",
    children: [{ text: "This is a Header" }],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true, italic: true },
      {
        text: ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "code",
    children: [
      {
        text: `const router = createBrowserRouter([
{
    path: "/",
    element: <MainView />,
    children: [
      { path: "/projects", element: <ProjectView /> },
      { path: "/blogs", element: <Homepage /> },
      { path: "", element: <Homepage /> },
    ],
  },
]);`,
      },
    ],
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote.", bold: true }],
  },
  {
    type: "paragraph",
    align: "center",
    children: [{ text: "Try it out for yourself!" }],
  },
];

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  return <span {...attributes}>{children}</span>;
};

export default function EditorComponent() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const initialValue = useMemo(
    // @ts-ignore
    () => JSON.parse(localStorage.getItem("editor-content")) || initialValueObj,
    []
  );

  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const renderElement = useCallback(RenderElementCallback, []);

  const [charCount, setCharCount] = useState(0);

  const { toast } = useToast();

  const [jsonValue, setJsonValue] = useState<any[]>(initialValue);
  const [openPreview, setOpenPreview] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("editor-content")) {
      localStorage.setItem("editor-content", JSON.stringify(initialValueObj));
    }
    setCharCount(Editor.string(editor, []).length);
  }, []);

  const printValue = () => {
    const data = localStorage.getItem("editor-content");
    if (!data) {
      toast({
        variant: "destructive",
        title: "Data retrieval error",
        description:
          "Try to edit something so the editor can start saving data.",
      });
    } else {
      console.log(data);
    }
  };

  const navigate = useNavigate();

  return (
    <div
      className="bg-background min-h-[50vh] w-4/5 text-foreground p-4 rounded-xl 
    flex flex-col items-center gap-2 border border-foreground"
    >
      <div className="flex flex-row gap-2">
        <Button
          variant={"default"}
          onClick={() => {
            printValue();
          }}
        >
          Print Data
        </Button>
        <Button
          variant={"secondary"}
          onClick={() => {
            localStorage.removeItem("editor-content");
            navigate(0);
          }}
        >
          Clear editor
        </Button>
      </div>

      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );

          if (isAstChange) {
            localStorage.setItem("editor-content", JSON.stringify(value));
            setCharCount(Editor.string(editor, []).length);
            setJsonValue(value);
          }
        }}
      >
        <div className="flex flex-row gap-2 p-2 rounded-xl">
          <Button
            className="p-3"
            variant={"outline"}
            onMouseDown={(event) => {
              event.preventDefault();
              toggleMark(editor, "bold");
            }}
          >
            <Bold strokeWidth={3} size={12} />
          </Button>
          <Button
            className="p-3"
            variant={"outline"}
            onMouseDown={(event) => {
              event.preventDefault();
              toggleMark(editor, "italic");
            }}
          >
            <Italic strokeWidth={3} size={12} />
          </Button>
          <Button
            className="p-3"
            variant={"outline"}
            onMouseDown={(event) => {
              event.preventDefault();
              toggleMark(editor, "underline");
            }}
          >
            <Underline strokeWidth={3} size={12} />
          </Button>
          <BlockButton editor={editor} format={"heading-one"} />
          <BlockButton editor={editor} format={"heading-two"} />
          <BlockButton editor={editor} format={"heading-three"} />
          <BlockButton editor={editor} format={"block-quote"} />
        </div>
        <Separator />
        <Editable
          className="p-4 w-full focus:outline-none focus:border-teal"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            handleKeyDown(event, editor, toast);
          }}
          spellCheck
          autoFocus
        />
        <Separator />
        <p>Character count: {charCount.toString()}</p>
      </Slate>
      <Toaster />
      <Button
        onClick={() => {
          setOpenPreview(!openPreview);
        }}
      >
        Open Preview
      </Button>
      {openPreview && (
        <pre className="w-full text-wrap bg-card p-4 rounded-xl">
          {jsonValue && JSON.stringify(jsonValue, null, 4)}
        </pre>
      )}
    </div>
  );
}
