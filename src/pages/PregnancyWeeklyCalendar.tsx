
import React from "react";
import { PregnancyWeeklyCalendarView } from "@/components/tools/PregnancyWeeklyCalendarView";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ToolCard from "@/components/ui/ToolCard";

export default function PregnancyWeeklyCalendar() {
  return (
    <ToolPageLayout
      crumbs={[
        { label: "Calendrier Grossesse Semaine par Semaine" },
      ]}
      title="Calendrier Grossesse Semaine par Semaine"
      description="Accédez semaine par semaine à votre suivi personnalisé avec le développement fœtal, les examens médicaux et les conseils adaptés."
    >
      <ToolCard variant="elevated" size="lg">
        <PregnancyWeeklyCalendarView />
      </ToolCard>
    </ToolPageLayout>
  );
}
