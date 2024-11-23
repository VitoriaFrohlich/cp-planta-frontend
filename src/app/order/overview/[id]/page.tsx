"use client";
import DynamicBox from "@/src/components/common/DynamicBox";
import StepButton from "@/src/components/common/StepButton";
import { Step } from "@/src/types/Step";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/src/components/common/header";

export default function OrderOverview() {
  const router = useRouter();
  const { id } = useParams();
  const [steps, setSteps] = useState<Step[]>([]);

  const mockSteps = [
    {
      id: "1",
      description: "Step 1",
    },
    {
      id: "2",
      description: "Step 2",
    },
    {
      id: "3",
      description: "Step 3",
    }
  ];

  const fetchSteps = async () => {
    setSteps(mockSteps); //pegar os steps da order pela api, junto do nome da order
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  return(
    <main>
    <Header/>
    <div className="w-full h-full p-2.5">
    <DynamicBox title={"`Ordem selecionada: ${order.description}`"} extraStyle="w-full">
      <p className="text-gray-400">Selecione a etapa</p>
      <div className="flex gap-4 h-96 max-sm:flex-col">
        {steps.map((steps) => (
          <StepButton key={steps.id} step={steps} onClick={() => router.push(`/order/overview/${id}/${steps.id}`)} />
        ))}
      </div>
    </DynamicBox>
  </div>
  </main>
  );
}