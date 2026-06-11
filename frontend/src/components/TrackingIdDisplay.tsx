import { useState } from "react";
import { Copy, Check } from "lucide-react";

type TrackingIdDisplayProps = {
  trackingId?: string;
  truncate?: boolean;
};

export default function TrackingIdDisplay({
  trackingId,
  truncate = true,
}: TrackingIdDisplayProps) {
  const [copied, setCopied] = useState(false);

  if (!trackingId) return null;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const displayText = truncate
    ? `${trackingId.substring(0, 8)}...`
    : trackingId;

  return (
    <div className="group relative inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500">
      <span
        title={`Full Tracking ID: ${trackingId}`}
        className="cursor-help hover:text-purple-400 transition-colors"
      >
        {displayText}
      </span>
      <button
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity p-0.5 rounded hover:bg-zinc-800"
        title="Copy Full ID to Clipboard"
      >
        {copied ? (
          <Check size={12} className="text-green-400" />
        ) : (
          <Copy size={12} />
        )}
      </button>
    </div>
  );
}
