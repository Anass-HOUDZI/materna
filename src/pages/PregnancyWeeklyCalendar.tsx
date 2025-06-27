
import React from "react";
import { PregnancyWeeklyCalendarView } from "@/components/tools/PregnancyWeeklyCalendarView";
import BasePageLayout from "@/components/ui/BasePageLayout";
import BaseToolForm from "@/components/tools/BaseToolForm";

export default function PregnancyWeeklyCalendar() {
  return (
    <BasePageLayout
      crumbs={[
        { label: "Calendrier Grossesse Semaine par Semaine" },
      ]}
      title="Calendrier Grossesse Semaine par Semaine"
      description="Suivez votre grossesse étape par étape avec le développement fœtal, les examens médicaux et les conseils personnalisés pour chaque semaine."
      maxWidth="xl"
    >
      <BaseToolForm
        title="Votre Grossesse Semaine par Semaine"
        description="Découvrez les étapes clés de votre grossesse"
      >
        <PregnancyWeeklyCalendarView />
      </BaseToolForm>
    </BasePageLayout>
  );
}
