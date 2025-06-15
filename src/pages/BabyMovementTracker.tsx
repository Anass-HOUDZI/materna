import { BabyMovementTrackerForm } from "@/components/tools/BabyMovementTrackerForm";
import Footer from "@/components/ui/Footer";

export default function BabyMovementTracker() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 justify-center items-center bg-background py-8 px-2 animate-fade-in">
        <BabyMovementTrackerForm />
      </div>
      <Footer />
    </div>
  );
}
