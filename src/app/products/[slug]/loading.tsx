import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="mt-auto flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin" />
    </div>
  );
}
