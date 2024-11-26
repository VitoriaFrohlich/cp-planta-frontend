'use client';
import DynamicBox from '@/src/components/common/DynamicBox';
import Header from '@/src/components/common/header';
import SelectedStep from '@/src/components/common/selectedStep';
import { useSearchParams } from 'next/navigation';
import ReturnIcon from '@/src/components/icons/return-icon.svg';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

export default function OrderStep() {
  const { stepId } = useParams();
  const searchParams = useSearchParams();
  const steps = JSON.parse(searchParams.get('steps') || '[]');

  const router = useRouter();

  return (
    <main>
      <Header />
      <button
        className=" text-greenHortti  pr-2 m-5"
        onClick={() => router.back()}
      >
        <Image src={ReturnIcon} alt="Retornar" width={14} height={14} />
      </button>
      <DynamicBox extraStyle="flex justify-between gap-x-auto justify-items-center ">
        {steps.map(step => (
          <SelectedStep
            key={step.id} // Adicionando a chave única
            selected={step.id === stepId} // Marca o step selecionado
            text={step.description}
          />
        ))}
        ;
      </DynamicBox>
    </main>
  );
}
