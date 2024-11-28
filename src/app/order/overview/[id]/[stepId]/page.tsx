'use client';
import DynamicBox from '@/src/components/common/DynamicBox';
import Header from '@/src/components/common/header';
import SelectedStep from '@/src/components/common/selectedStep';
import { useSearchParams } from 'next/navigation';
import { useParams, useRouter } from 'next/navigation';
import { Step } from '@/src/types/Step';
import DefaultInput from '@/src/components/common/inputs/DefaultInput';
import { useState } from 'react';
import DefaultModal from '@/src/components/common/modals/DefaultModal';
export default function OrderStep() {
  const { stepId } = useParams();
  const searchParams = useSearchParams();
  const [isModalVisible, setModalVisible] = useState(false);
  const steps = JSON.parse(searchParams.get('steps') || '[]');

  const router = useRouter();

  return (
    <main className="flex flex-col min-h-screen w-full">
      <Header />

      <DynamicBox extraStyle="flex justify-center gap-x-10 justify-items-center mx-12 mt-6">
        {steps.map((step: Step) => (
          <SelectedStep
            key={step.id} // Adicionando a chave única
            selected={step.id === stepId} // Marca o step selecionado
            text={step.description}
          />
        ))}
      </DynamicBox>

      <div className="grid grid-cols-7 gap-4 w-full px-12 my-8">
        <div className="col-span-3">
          <DynamicBox title="Informações Obrigatórias">
            <p className="text-gray-400 mb-2">Adicionado automaticamente</p>
            <DefaultInput label={'Produto final'} placeholder={''} disable />
            <DefaultInput
              label={'Peso ao inicio da etapa'}
              placeholder={''}
              disable
            />
            <DefaultInput
              label={'Peso ao final da etapa'}
              placeholder={''}
              disable
            />
            <button
              onClick={() => setModalVisible(true)}
              className="h-auto w-full bg-red-600 p-2 border rounded-lg mt-2"
            >
              Reportar erro
            </button>
          </DynamicBox>
        </div>

        <div className="col-span-1 h-full w-px bg-greenHortti mx-auto" />

        <div className="col-span-3">
          <DynamicBox>
            <p className="text-gray-400 mb-4">Checagem da Operação:</p>
            <div className="grid grid-cols-2 gap-y-2">
              <p className="text-black text-2xl text-left font-semibold">
                Quantidade Esperada:
              </p>
              <p className="text-black text-2xl text-right">X KG</p>

              <p className="text-black text-2xl text-left font-semibold">
                Data de entrada:
              </p>
              <p className="text-black text-2xl text-right">01/01/2024</p>

              <p className="text-black text-2xl text-left font-semibold">
                Erros:
              </p>
              <p className="text-black text-2xl text-right">0</p>
            </div>
          </DynamicBox>
          <button
            className="border-2 w-full border-greenHortti h-auto rounded-lg p-3 text-2xl bg-greenHorttiBg my-6"
            onClick={() => router.back()}
          >
            <p className="text-black font-bold text-4xl">OK</p>
            <p className="text-gray-400">Confirmar checagem da etapa atual</p>
          </button>
          <button
            className="bg-greenHortti rounded-lg h-auto px-8 py-2 text-lg w-full"
            onClick={() => router.back()}
          >
            <p>Voltar</p>
          </button>
        </div>
      </div>
      <DefaultModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        title="Enviar erro"
      >
        <DefaultInput
          label={''}
          placeholder={'Informe o erro aqui'}
        ></DefaultInput>
      </DefaultModal>
    </main>
  );
}
