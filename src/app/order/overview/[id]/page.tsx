/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import DynamicBox from '@/src/components/common/DynamicBox';
import StepButton from '@/src/components/common/StepButton';
import { Step } from '@/src/types/Step';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/src/components/common/header';
import { stepsByProductId } from '@/src/services/stepService';
import { getOrderById } from '@/src/services/order.service';

export default function OrderOverview() {
  const router = useRouter();
  const { id } = useParams();
  const idString = Array.isArray(id) ? id[0] : id;
  const [productId, setProductId] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);

  const mockSteps = {
    '1': {
      description: 'Corte'
    },
    '2': {
      description: 'Descascamento'
    },
    '3': {
      description: 'Seleção'
    },
    '4': {
      description: 'Desfolhamento'
    }
  };

  const orderById = async (id: string) => {
    const resp = await getOrderById(id);
    setProductId(resp.final_product_id);
  };

  const getStepsByProductId = async (id: string) => {
    // Converte o objeto em um array de Steps
    const resp = await stepsByProductId(id);
    console.log(resp);
    const stepsArray: Step[] = Object.entries(mockSteps).map(
      ([key, value]) => ({
        id: key,
        description: value.description
      })
    );
    setSteps(stepsArray);
  };

  useEffect(() => {
    if (productId) {
      getStepsByProductId(productId);
    }
  }, [productId]);

  useEffect(() => {
    orderById(idString);
  }, []);

  return (
    <main>
      <Header />
      <div className="w-full h-full p-2.5">
        <DynamicBox title={`Ordem selecionada: ${id}`} extraStyle="w-full">
          <p className="text-gray-400">Selecione a etapa</p>
          <div className="flex gap-4 h-96 max-sm:flex-col">
            {steps.map(step => (
              <StepButton
                key={step.id}
                step={step} // Passa o Step completo
                onClick={() => router.push(`/order/overview/${id}/${step.id}`)}
              />
            ))}
          </div>
        </DynamicBox>
      </div>
    </main>
  );
}
