import { CreditCard, Globe2, X } from "lucide-react";
import { Button } from "../ui/Button";

type CartModalProps = {
  open: boolean;
  onClose: () => void;
  onRemove: () => void;
};

export function CartModal({ open, onClose, onRemove }: CartModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-slate-950 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Your Cart</h3>

          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/10 p-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/10">
              <Globe2 className="h-7 w-7 text-cyan-200" />
            </div>

            <div className="flex-1">
              <div className="font-semibold">ARAD Earth Studio</div>
              <div className="mt-1 text-sm text-slate-400">
                Professional License
              </div>
              <div className="mt-3 text-2xl font-bold">$1,490</div>
            </div>

            <button
              onClick={onRemove}
              className="text-sm text-red-300 hover:text-red-200"
            >
              Remove
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <Button variant="paypal">
            <CreditCard className="h-4 w-4" />
            Pay with PayPal
          </Button>

          <Button variant="secondary" onClick={onClose}>
            Continue Browsing
          </Button>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          Demo checkout. Real PayPal integration will be connected later.
        </p>
      </div>
    </div>
  );
}
