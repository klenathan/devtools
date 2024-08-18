import { CommentsProvider } from "@udecode/plate-comments";
import { Plate } from "@udecode/plate-common";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CommentsPopover } from "../plate-ui/comments-popover";
import { FixedToolbar } from "../plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "../plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "../plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "../plate-ui/floating-toolbar-buttons";
import { Editor } from "@/components/plate-ui/editor";

import plugins from "./Plugins";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const initialValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Hello, World!" }],
  },
];

export function PlateEditor() {
  return (
    <div className="max-w-[90%] w-[90%]">
      <DndProvider backend={HTML5Backend}>
        <TooltipProvider>
          <CommentsProvider users={{}} myUserId="1">
            <Plate plugins={plugins} initialValue={initialValue}>
              <FixedToolbar>
                <FixedToolbarButtons />
              </FixedToolbar>

              <Editor />

              <FloatingToolbar>
                <FloatingToolbarButtons />
              </FloatingToolbar>
              <CommentsPopover />
            </Plate>
          </CommentsProvider>
        </TooltipProvider>
      </DndProvider>
    </div>
  );
}
