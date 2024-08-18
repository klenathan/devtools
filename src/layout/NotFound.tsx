import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFoundLayout() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-2">
      <h2>404, Page Not Found!</h2>
      <Button asChild variant="link" className="text-lg">
        <Link to={"/"}>Back to home</Link>
      </Button>
    </div>
  );
}
