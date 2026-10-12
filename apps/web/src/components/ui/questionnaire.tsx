import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelButton } from "./button";
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle } from "./card";
import { PixelProgress } from "./progress";

interface Question {
  id: string;
  title: string;
  description?: string;
  options?: Array<{ value: string; label: string }>;
}

interface PixelQuestionnaireProps {
  questions: Question[];
  onSubmit?: (answers: Record<string, string>) => void;
  className?: string;
}

const questionCardVariants = cva(
  "border-2 border-foreground bg-card shadow-[var(--pixel-shadow)] p-4 font-[family-name:var(--pixel-font)]",
  {
    variants: {
      state: { default: "", active: "border-primary", answered: "border-accent" },
    },
    defaultVariants: { state: "default" },
  }
);

export function PixelQuestionnaire({ questions, onSubmit, className }: PixelQuestionnaireProps) {
  const [current, setCurrent] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const question = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent((c) => c + 1);
    else onSubmit?.(answers);
  };

  return (
    <div className={cn("w-full max-w-lg space-y-4", className)}>
      <PixelProgress value={progress} />
      <p className="text-xs text-muted-foreground">
        Question {current + 1} of {questions.length}
      </p>
      <PixelCard className={cn(questionCardVariants({ state: "active" }))}>
        <PixelCardHeader>
          <PixelCardTitle>{question.title}</PixelCardTitle>
        </PixelCardHeader>
        <PixelCardContent className="space-y-2">
          {question.description && <p className="text-xs text-muted-foreground">{question.description}</p>}
          <div className="flex flex-col gap-2">
            {question.options?.map((opt) => (
              <PixelButton
                key={opt.value}
                variant={answers[question.id] === opt.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleSelect(opt.value)}
                className="justify-start"
              >
                {opt.label}
              </PixelButton>
            ))}
          </div>
          <div className="flex justify-end pt-2">
            <PixelButton onClick={handleNext} disabled={!answers[question.id]}>
              {current < questions.length - 1 ? "Next" : "Submit"}
            </PixelButton>
          </div>
        </PixelCardContent>
      </PixelCard>
    </div>
  );
}

export type { Question };
