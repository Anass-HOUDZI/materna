import { PregnancyWeeklyCalendarView } from "@/components/tools/PregnancyWeeklyCalendarView";
import Footer from "@/components/ui/Footer";

export default function PregnancyWeeklyCalendar() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 justify-center items-center bg-background py-8 px-2 animate-fade-in">
        <PregnancyWeeklyCalendarView />
      </div>
      <Footer />
    </div>
  );
}
