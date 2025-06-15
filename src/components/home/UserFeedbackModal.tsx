
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface UserFeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UserFeedbackModal({ open, onClose }: UserFeedbackModalProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRate = (value: number) => setRating(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Pour la démo, juste logguer le feedback
    console.log("Feedback utilisateur :", { rating, message, date: new Date().toISOString() });
    toast({
      title: "Merci pour votre retour !",
      description: "Votre avis nous aide à améliorer la suite MomTech ❤️",
    });
    setTimeout(() => {
      setRating(null);
      setMessage("");
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl shadow-2xl p-0 animate-fade-in animate-scale-in" style={{ animationDuration: "0.5s" }}>
        <form onSubmit={handleSubmit}>
          <DialogHeader className="items-center py-2">
            <DialogTitle className="flex flex-col gap-1 items-center text-2xl font-bold mt-2 mb-1 font-playfair animate-fade-in">
              <Star className="text-yellow-500" size={32} />
              Donnez votre avis
            </DialogTitle>
          </DialogHeader>
          <div className="px-8 pb-3 pt-2 text-center">
            <div className="flex justify-center gap-1 mb-3" aria-label="Note">
              {[1,2,3,4,5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => handleRate(s)}
                  className={`transition ${s <= (rating ?? 0)
                    ? "text-yellow-400"
                    : "text-gray-200 hover:text-yellow-400"} scale-100 ${s === rating ? "animate-bounce" : ""}`
                  }
                  tabIndex={0}
                  aria-label={`${s} étoile${s > 1 ? "s" : ""}`}
                >
                  <Star size={32} fill={s <= (rating ?? 0) ? "#fde68a" : "none"} />
                </button>
              ))}
            </div>
            <Textarea
              className="mt-2 mb-2"
              minLength={5}
              maxLength={400}
              rows={4}
              required
              disabled={isSubmitting}
              placeholder="Dites-nous ce que vous aimez ou souhaitez améliorer…"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          <DialogFooter className="flex justify-between items-center px-6 pb-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg px-4"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !rating || message.length < 5}
              variant="default"
              className="rounded-lg px-4"
            >
              {isSubmitting ? "Envoi…" : "Envoyer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
