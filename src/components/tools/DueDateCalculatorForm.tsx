
import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays, isAfter } from "date-fns";
import { CalendarIcon, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover, PopoverTrigger, PopoverContent
} from "@/components/ui/popover";
import {
  Form, FormField, FormLabel, FormControl, FormItem, FormDescription, FormMessage
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const formSchema = z.object({
  lastPeriod: z.date({
    required_error: "La date des dernières règles est requise",
  }),
  cycleLength: z
    .number()
    .min(21, "Minimum 21 jours")
    .max(35, "Maximum 35 jours"),
  isRegular: z.boolean(),
  conception: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function calculateDueDate({ lastPeriod, cycleLength }: { lastPeriod: Date; cycleLength: number }) {
  // Méthode Naegele (correction si cycle != 28)
  const baseDays = 280;
  const cycleDifference = cycleLength - 28;
  return addDays(lastPeriod, baseDays + cycleDifference);
}

export function DueDateCalculatorForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastPeriod: undefined,
      cycleLength: 28,
      isRegular: true,
      conception: undefined,
    },
    mode: "onChange", // Feedback immédiat
    reValidateMode: "onChange",
  });

  const [result, setResult] = React.useState<Date | null>(null);

  function onSubmit(data: FormValues) {
    let date: Date;
    if (data.conception) {
      // Si la date de conception est fournie, calcul direct (date conception + 266j)
      date = addDays(data.conception, 266);
    } else {
      date = calculateDueDate({ lastPeriod: data.lastPeriod, cycleLength: data.cycleLength });
    }
    setResult(date);
  }

  return (
    <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Champ Dernières règles */}
          <FormField
            control={form.control}
            name="lastPeriod"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1">
                  <FormLabel>Dernières règles *</FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-label="Informations sur ce champ"
                        className="p-0.5"
                      >
                        <Info className="w-4 h-4 text-blue-500" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Saisissez le premier jour de vos dernières règles. Cette information est essentielle pour estimer le terme.
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        {field.value ? format(field.value, "dd/MM/yyyy") : <span>Choisissez une date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date => isAfter(date, new Date())}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Le premier jour de vos dernières règles.</FormDescription>
                {/* Message animé feedback immédiat */}
                <div className="transition-all duration-300">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          {/* Champ Durée du cycle */}
          <FormField
            control={form.control}
            name="cycleLength"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1">
                  <FormLabel>Durée habituelle du cycle (jours)</FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-label="Aide durée cycle"
                        className="p-0.5"
                      >
                        <Info className="w-4 h-4 text-blue-500" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Entre 21 et 35 jours. La moyenne est 28 jours. Adaptez pour les cycles longs ou courts.
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Input
                    type="number"
                    min={21}
                    max={35}
                    step={1}
                    {...field}
                    value={field.value ?? ""}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Entre 21 et 35 jours.</FormDescription>
                <div className="transition-all duration-300">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          {/* Champ Régularité */}
          <FormField
            control={form.control}
            name="isRegular"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1">
                  <FormLabel>Cycle régulier ?</FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-label="Aide régularité cycle"
                        className="p-0.5"
                      >
                        <Info className="w-4 h-4 text-blue-500" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Décochez si vos cycles varient de plus de 4 jours d’un mois à l’autre.
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <input
                    type="checkbox"
                    className="accent-primary mr-2"
                    checked={field.value}
                    onChange={e => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <FormDescription>Décochez si vos cycles sont irréguliers.</FormDescription>
                <div className="transition-all duration-300">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          {/* Champ Date conception */}
          <FormField
            control={form.control}
            name="conception"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1">
                  <FormLabel>Date conception (optionnelle)</FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-label="Aide date conception"
                        className="p-0.5"
                      >
                        <Info className="w-4 h-4 text-blue-500" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Si connue : donne une estimation directe du terme (conception + 266 jours).
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        {field.value ? format(field.value, "dd/MM/yyyy") : <span>Choisissez une date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date => isAfter(date, new Date())}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Laissez vide si vous ne connaissez pas la date exacte.</FormDescription>
                <div className="transition-all duration-300">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Calculer la date d’accouchement</Button>
          {result && (
            <div className="bg-primary/10 border border-primary rounded p-4 text-center mt-4">
              <div className="font-semibold text-primary text-xl">Date estimée d’accouchement</div>
              <div className="text-2xl mt-2">{format(result, "PPP")}</div>
              <div className="text-xs mt-2 text-muted-foreground">Méthode Naegele (cycle personnalisé ou conception)</div>
            </div>
          )}
        </form>
      </Form>
    </TooltipProvider>
  );
}
