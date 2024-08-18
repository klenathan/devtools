import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function base64Encoder(inputText: string): string {
  return btoa(inputText);
}

function base64Decoder(base64: string): string {
  return atob(base64);
}

const CONSTANT: {
  [key: string]: {
    pageTitle: string;
    converter: (input: string) => string;
    inputTitle: string;
    resultTitle: string;
  };
} = {
  encoder: {
    pageTitle: "Base64 Encoder",
    converter: base64Encoder,
    inputTitle: "Text",
    resultTitle: "Base64 String",
  },
  decoder: {
    pageTitle: "Base64 Decoder",
    converter: base64Decoder,
    inputTitle: "Base64 String",
    resultTitle: "Text",
  },
};

export default function Base64EncodeDecode() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("encoder");

  return (
    <div className="w-full h-full flex flex-col items-center select-none space-y-4">
      <h1 className="mt-4">{CONSTANT[mode].pageTitle}</h1>
      <Button
        onClick={() => {
          if (mode == "encoder") {
            setMode("decoder");
          } else {
            setMode("encoder");
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
