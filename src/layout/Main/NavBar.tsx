import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import useTheme from "@/hooks/theme/useTheme";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {!isOpen && (
        <Button
          variant={"default"}
          onClick={() => {
            handleToggleOpen();
          }}
          className="rounded-full w-15 h-15 shadow fixed top-1/2 left-5"
        >
          Open
        </Button>
      )}
      <nav
        className={` w-64
        ${isOpen ? "flex" : "hidden"}
      h-full shadow-lg bg-background border-primary border-r
      flex-col justify-start items-center space-y-4 select-none`}
      >
        <h1 className="text-foreground text-lg pt-4">Nathan's Dev tools</h1>
        <Separator />
        <Input
          className="w-4/5 focus-visible:ring-transparent"
          placeholder="Search"
        />
        <div className="h-full">
          <Button asChild variant="link" className="text-lg">
            <Link to={"/hex-to-text"}>Hex to Text</Link>
          </Button>
        </div>

        <Separator />
        <Button
          onClick={() => {
            handleToggleOpen();
          }}
        >
          Toggle Open
        </Button>

        <div className="flex flex-row items-center space-x-2 pb-4">
          <Label className="text-primary" htmlFor="dark-mode">
            Dark mode
          </Label>

          <Switch
            className="bg-red-400"
            id="dark-mode"
            checked={theme.theme == "dark"}
            onCheckedChange={theme.toggleTheme}
          />
        </div>
      </nav>
    </div>
  );
}
