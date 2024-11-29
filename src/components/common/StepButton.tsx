import { Step } from '@/src/types/Step';

type Props = {
  step: Step;
  onClick: () => void;
};

export default function StepButton({ step, onClick }: Props) {
  return (
    <button
      className="w-full h-1/3 items-center p-2 bg-greenHorttiBg border-greenHortti border-2 text-black rounded-lg m-4"
      onClick={onClick}
    >
      <span>{step.description}</span>
    </button>
  );
}
