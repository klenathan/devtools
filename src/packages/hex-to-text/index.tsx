import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function hexToTextConverter(hex: string): string {
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

function textToHexConverter(text: string): string {
  let hex = "";
  for (let i = 0; i < text.length; i++) {
    hex += text.charCodeAt(i).toString(16).padStart(2, "0");
  }
  return hex;
}

// type ConvertMode = "h2t" | "t2h";

const CONSTANT: {
  [key: string]: {
    pageTitle: string;
    converter: (input: string) => string;
    inputTitle: string;
    resultTitle: string;
  };
} = {
  h2t: {
    pageTitle: "Hex to Text",
    converter: hexToTextConverter,
    inputTitle: "Hex",
    resultTitle: "Text",
  },
  t2h: {
    pageTitle: "Text to Hex",
    converter: textToHexConverter,
    inputTitle: "Text",
    resultTitle: "Hex",
  },
};

export default function HexToText() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("h2t");

  return (
    <div className="w-full h-full flex flex-col items-center select-none space-y-4">
      <h1 className="mt-4">{CONSTANT[mode].pageTitle}</h1>
      <Button
        onClick={() => {
          if (mode == "h2t") {
            setMode("t2h");
          } else {
            setMode("h2t");
          }
          setResult("");
          setInput("");
        }}
      >
        Toggle Mode
      </Button>
      <div className="w-4/5 bg-background border-2 border-accent p-4 rounded-lg space-x-2">
        <div className="w-full flex flex-col space-y-4 items-center">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="hex_value" className="text-lg">
              {CONSTANT[mode].inputTitle} values:
            </Label>
            <Textarea
              placeholder="Type your hex here."
              id="hex_value"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setResult(CONSTANT[mode].converter(e.target.value));
              }}
            />
          </div>

          <Separator />

          <div className="grid w-full gap-1.5">
            <p id="result" className="text-lg select-text">
              Result: {result}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
