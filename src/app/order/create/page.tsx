'use client';
import SelectInput from '@/src/components/common/inputs/SelectInput';
import NumericInput from '@/src/components/common/inputs/NumericInput';
import CancelButton from '@/src/components/buttons/order/CancelButton';
import Header from '@/src/components/common/header';
import { Button } from '@headlessui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DefaultInput from '@/src/components/common/inputs/DefaultInput';
import DefaultModal from '@/src/components/common/modals/DefaultModal';
import React from 'react';
import OnClickButton from '@/src/components/buttons/OnClickButton/DefaultOnClick';
import DynamicBox from '@/src/components/common/DynamicBox';
import BatchListComponent from '@/src/components/order/BatchListComponent';

export default function OrderCreate() {
  const router = useRouter();
  const [finalProduct, setFinalProduct] = useState('');
  const [rawMaterial, setMateriaPrima] = useState('');
  const [batch, setBatch] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [itens, setItens] = useState([
    //dados mockados
    { batch: "BATB202012", rawMaterial: 'Batata Branca', quantity: 8 },
    { batch: "CEN123193", rawMaterial: 'Cenoura', quantity: 5 },
    { batch: "MACF63820", rawMaterial: 'Maçã Fuji', quantity: 7 },
  ]);
  const [tax, setTax] = useState<number | null>(null);
  const [line, setLine] = useState('');

  const handleRemoveItem = (indexToRemove: number) => {
    setItens(itens.filter((_, index) => index !== indexToRemove));
  };

  const sumQuantity = itens.reduce((acc, item) => acc + item.quantity, 0);

  const calculateValue = () => {
    if (tax == null || isNaN(tax)) return '';
    return sumQuantity * (tax / 100) + sumQuantity;
  };

  const steps = [
    'Etapa 1',
    'Etapa 2',
    'Etapa 3',
    'Etapa 1',
    'Etapa 2',
    'Etapa 3',
    'Etapa 1'
  ];

  const [isStepsModalOpen, setIsStepsModalOpen] = React.useState(false);

  const openStepsModal = () => {
    setIsStepsModalOpen(true);
  };

  const closeStepsModal = () => {
    setIsStepsModalOpen(false);
  };

  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const getBatchs = async () => {
    return itens;
  };
  const handleAddItem = (
    rawMaterial: string,
    batch: string,
    quantity: number
  ) => {
    setItens([
      ...itens,
      {batch, rawMaterial,  quantity }
    ]);
    setMateriaPrima('');
    setBatch('');
    setQuantity(0);
  }; //TODO: alterar para interfaces quando back tiver pronto

  const isFormValidAdd = rawMaterial && batch && quantity > 0;
  const isFormValidCreate =
    itens.length > 0 &&
    tax != null &&
    !Number.isNaN(tax) &&
    line.length > 0 &&
    finalProduct.length > 0;

  return (
    <main>
      <Header />
      <div className="min-h-screen bg-white">
        <button
          className=" text-greenHortti pt-10 pl-10"
          onClick={() => router.back()}
        >
          Voltar
        </button>
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-7xl p-8">
            <div className="grid md:grid-cols-7 gap-6 relative">
              {/* Formulário - Cadastro de Ordem */}
              <div className="col-span-3">
                {/* Inputs do formulário */}
                <DynamicBox title="Cadastro Ordem">
                  <SelectInput
                    label="Produto Final"
                    placeholder="Selecione o Produto a ser produzido"
                    options={[
                      //dados mockados
                      'Batata Frita',
                      'Batata Palito',
                      'Batata Rústica'
                    ]}
                    onChange={e => setFinalProduct(e.target.value)}
                  />
                </DynamicBox>
                <DynamicBox>
                  <SelectInput
                    label="Matéria Prima"
                    options={['Batata Inglesa Média', 'Cenoura', 'Tomate']}
                    value={rawMaterial}
                    onChange={e => setMateriaPrima(e.target.value)}
                    placeholder="Selecione o tipo"
                  />
                  <SelectInput
                    label="Lote"
                    options={['120DED2', '1900DSC', '09OPP2D']}
                    placeholder="Selecione o lote"
                    value={batch}
                    onChange={e => setBatch(e.target.value)}
                  />
                  <NumericInput
                    label="Quantidade de Entrada de Materia Prima"
                    placeholder="0 KG"
                    value={quantity}
                    onChange={e => {
                      const value = parseInt(e.target.value);
                      setQuantity(value >= 0 ? value : 0);
                    }}
                  />
                  <Button
                    className={`border rounded-lg w-full p-2 mt-2 mb-4 ${
                      isFormValidAdd
                        ? 'bg-greenHortti text-white'
                        : 'bg-gray-100 text-black cursor-not-allowed border-x-gray-300'
                    }`}
                    disabled={!isFormValidAdd}
                    onClick={() => handleAddItem(rawMaterial, batch, quantity)}
                  >
                    Adicionar
                  </Button>

                  <div className="w-full h-px bg-greenHortti" />

                <BatchListComponent 
                itens={itens} header editable onRemove={handleRemoveItem}/>
                </DynamicBox>
              </div>

              {/* Separador Vertical */}
              <div className="flex items-center justify-center col-span-1">
                <div className="w-px bg-greenHortti h-full"></div>
              </div>

              {/* Receita Utilizada */}
              <div className="col-span-3">
                <DynamicBox title="Lotes Selecionados">
                  <SelectInput
                    label={'Linha selecionada'}
                    placeholder={'Selecione a Linha de Produção'}
                    options={['1', '2']}
                    onChange={e => setLine(e.target.value)}
                    value={line}
                  />

                  <NumericInput
                    label="Diferença Esperada (%)"
                    placeholder="-10"
                    onChange={e => setTax(parseInt(e.target.value))}
                  />

                  <DefaultInput
                    label="Quantidade esperada"
                    placeholder="Esse campo mostrará o peso estimado do produto final"
                    disable
                    value={
                      calculateValue() == null
                        ? ''
                        : calculateValue()!.toString()
                    }
                  />
                </DynamicBox>
                <Button
                  className="border rounded-lg w-full p-2 mt-2 mb-4 text-black border-greenHortti bg-greenHorttiBg"
                  onClick={() => openStepsModal()}
                >
                  Etapas
                </Button>
                <DynamicBox title="Nome ordem">
                  <h3 className="text-grayHortti">
                    Nome gerado automaticamente
                  </h3>
                  <h2 className="text-xl font-semibold text-black my-4">
                    Ordem X - XXXX
                  </h2>
                </DynamicBox>
                {/* Botões */}
                <div className="w-full h-auto flex space-x-2">
                  <OnClickButton
                    className={`w-full h-auto py-2 px-4 rounded-lg flex items-center justify-items-center 
                    ${isFormValidCreate ? 'bg-greenHortti text-white  hover:bg-green-700' : 'bg-gray-100 text-black cursor-not-allowed border-x-gray-300'} `}
                    title="Finalizar"
                    image="/check-icon.svg"
                    disable={!isFormValidCreate}
                    onClick={() => openSuccessModal()}
                  />
                  <CancelButton
                    title="Cancelar"
                    image="/trash-icon.svg"
                    href="/home"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DefaultModal
        isVisible={isStepsModalOpen}
        onClose={closeStepsModal}
        title="Etapas"
      >
        {steps.map((steps, index) => (
          <div
            key={index}
            className="w-full text-black border-greenHortti border rounded-lg p-2 box mt-3"
          >
            {steps}
          </div>
        ))}
      </DefaultModal>

      <DefaultModal
        isVisible={isSuccessModalOpen}
        onClose={closeSuccessModal}
        title="Sucesso!"
      >
        <div className="w-full">Ordem cadastrada com sucesso!</div>
      </DefaultModal>
    </main>
  );
}
