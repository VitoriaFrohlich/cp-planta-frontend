'use client';
import DynamicBox from '@/src/components/common/DynamicBox';
import Header from '@/src/components/common/header';
import SelectedStep from '@/src/components/common/selectedStep';
import { useSearchParams } from 'next/navigation';
import ReturnIcon from '@/src/components/icons/return-icon.svg';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Step } from '@/src/types/Step';
import DefaultInput from '@/src/components/common/inputs/DefaultInput';

export default function OrderStep() {
  const { stepId } = useParams();
  const searchParams = useSearchParams();
  const steps = JSON.parse(searchParams.get('steps') || '[]');

  const router = useRouter();

  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* Header e botão de retorno */}
      <Header />
      <button className="text-greenHortti p-4" onClick={() => router.back()}>
        <Image src={ReturnIcon} alt="Retornar" width={14} height={14} />
      </button>

      {/* Primeira DynamicBox */}
      <DynamicBox extraStyle="flex justify-center gap-x-10 justify-items-center mx-12">
        {steps.map((step: Step) => (
          <SelectedStep
            key={step.id} // Adicionando a chave única
            selected={step.id === stepId} // Marca o step selecionado
            text={step.description}
          />
        ))}
      </DynamicBox>

      {/* Linha separadora */}

      {/* Grid para caixas menores */}
      <div className="grid grid-cols-7 gap-4 w-full px-12 mt-8">
        {/* DynamicBox menor à esquerda */}
        <div className="col-span-3">
          <DynamicBox title="Informações Obrigatórias">
            <DefaultInput label={''} placeholder={''} />
          </DynamicBox>
        </div>

        {/* Linha vertical no centro */}
        <div className="col-span-1 h-full w-px bg-greenHortti mx-auto" />

        {/* DynamicBox menor à direita */}
        <div className="col-span-3">
          <DynamicBox>
            <DefaultInput label={''} placeholder={''} />
          </DynamicBox>
        </div>
      </div>
    </main>
  );
}
