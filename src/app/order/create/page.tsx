'use client';
import SelectInput from '@/src/components/common/inputs/SelectInput';
import NumericInput from '@/src/components/common/inputs/NumericInput';
import CancelButton from '@/src/components/buttons/order/CancelButton';
import Header from '@/src/components/common/header';
import { Button } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DefaultInput from '@/src/components/common/inputs/DefaultInput';
import DefaultModal from '@/src/components/common/modals/DefaultModal';
import React from 'react';
import OnClickButton from '@/src/components/buttons/OnClickButton/DefaultOnClick';
import DynamicBox from '@/src/components/common/DynamicBox';
import BatchListComponent from '@/src/components/order/BatchListComponent';
import orderService from '@/src/services/orderService';
import SelectInputWithId from '@/src/components/common/inputs/SelectInputWithId';

export default function OrderCreate() {

  const router = useRouter();
  const [finalProducts, setFinalProducts] = useState<FinalProductDTO[]>([]);
  const [selectedFinalProductId, setSelectedFinalProductId] = useState<string | null>(null);
  const [rawMaterials, setRawMaterials] = useState("");
  const [selectedRawMaterial, setSelectedRawMaterialId] = useState<string | null>(null);
  const [batch, setBatch] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [itens, setItens] = useState([
    { batch: 'BATB2020', rawMaterial: 'Batata Branca Grande', quantity: 80 },
    { batch: 'CEN123193', rawMaterial: 'Cenoura', quantity: 50 },
    { batch: 'MACF63820', rawMaterial: 'Maçã Fuji', quantity: 7 }
  ]);
  const [tax, setTax] = useState<number | null>(null);
  const [line, setLine] = useState('');
  const [isStepsModalOpen, setIsStepsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    fetchFinalProducts();
  }, []);

  const fetchFinalProducts = async () => {
    let response = await orderService.getFinalProducts();
    if (Array.isArray(response)) {
      setFinalProducts(response);
    } else {
      setFinalProducts(response.data);
    }
  };

  const handleAddItem = (rawMaterial: string, batch: string, quantity: number) => {
    setItens([...itens, { batch, rawMaterial, quantity }]);
    setRawMaterials("");
    setBatch('');
    setQuantity(0);
  };

  const handleRemoveItem = (indexToRemove: number) => {
    setItens(itens.filter((_, index) => index !== indexToRemove));
  };

  const sumQuantity = itens.reduce((acc, item) => acc + item.quantity, 0);

  const calculateValue = () => {
    if (tax == null || isNaN(tax)) return '';
    return sumQuantity * (tax / 100) + sumQuantity;
  };

  const openStepsModal = () => setIsStepsModalOpen(true);
  const closeStepsModal = () => setIsStepsModalOpen(false);
  const openSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setSelectedFinalProductId(null);
    setLine('');
    setTax(null);
  };

  const steps = [
    //dados mockados
    'Etapa 1',
    'Etapa 2',
    'Etapa 3',
    'Etapa 1',
    'Etapa 2',
    'Etapa 3',
    'Etapa 1'
  ];

  const isFormValidAdd = rawMaterials && batch && quantity > 0;
  const isFormValidCreate =
    itens.length > 0 &&
    tax != null &&
    !Number.isNaN(tax) &&
    line.length > 0 &&
    selectedFinalProductId;

  return (
    <main>
      <Header />
      <div className="min-h-screen bg-white">
        <button className="text-greenHortti pt-10 pl-10" onClick={router.back}>
          Voltar
        </button>
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-7xl p-8">
            <div className="grid md:grid-cols-7 gap-6 relative">
              <div className="col-span-3">
                <DynamicBox title="Cadastro Ordem" extraStyle="mb-5">
                  <SelectInputWithId
                    label="Produto Final"
                    placeholder="Selecione o Produto a ser produzido"
                    options={finalProducts.map(product => ({ label: product.description, value: product.id }))}
                    onChange={e => {
                      setSelectedFinalProductId(e.target.value);
                      console.log(e.target.value);
                    }}
                    value={selectedFinalProductId || ''}
                  />
                </DynamicBox>
                <DynamicBox>
                  <SelectInput
                    label="Matéria Prima"
                    options={['Batata Inglesa Média', 'Cenoura', 'Tomate']}
                    value={rawMaterials}
                    onChange={e => setRawMaterials(e.target.value)}
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
                    className={`border rounded-lg w-full p-2 mt-2 mb-4 ${isFormValidAdd ? 'bg-greenHortti text-white' : 'bg-gray-100 text-black cursor-not-allowed border-x-gray-300'}`}
                    disabled={!isFormValidAdd}
                    onClick={() => handleAddItem(rawMaterials, batch, quantity)}
                  >
                    Adicionar
                  </Button>
                  <div className="w-full h-px bg-greenHortti" />
                  <BatchListComponent
                    itens={itens}
                    header
                    editable
                    scrollable
                    onRemove={handleRemoveItem}
                  />
                </DynamicBox>
              </div>

              <div className="flex items-center justify-center col-span-1">
                <div className="w-px bg-greenHortti h-full"></div>
              </div>

              <div className="col-span-3">
                <DynamicBox title="Lotes Selecionados" extraStyle="mb-5">
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
                    label="Quantidade Esperada"
                    placeholder="Esse campo mostrará o peso estimado do produto final"
                    disable
                    value={calculateValue() == null ? '' : calculateValue()!.toString()}
                  />
                </DynamicBox>
                <Button
                  className="border rounded-lg w-full p-2 mt-2 mb-4 text-black border-greenHortti bg-greenHorttiBg"
                  onClick={() => openStepsModal()}
                >
                  Etapas
                </Button>
                <DynamicBox title="Nome ordem" extraStyle="mb-5">
                  <h3 className="text-grayHortti">Nome gerado automaticamente</h3>
                  <h2 className="text-xl font-semibold text-black my-4">
                    Ordem X - XXXX
                  </h2>
                </DynamicBox>
                <div className="w-full h-auto flex space-x-2">
                  <OnClickButton
                    className={`w-full h-auto py-2 px-4 rounded-lg flex items-center justify-items-center 
                      ${isFormValidCreate ? 'bg-greenHortti text-white hover:bg-green-700' : 'bg-gray-100 text-black cursor-not-allowed border-x-gray-300'}`}
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

      <DefaultModal isVisible={isStepsModalOpen} onClose={closeStepsModal} title="Etapas">
        {steps.map((step, index) => (
          <div key={index} className="w-full text-black border-greenHortti border rounded-lg p-2 box mt-3">
            {step}
          </div>
        ))}
      </DefaultModal>

      <DefaultModal isVisible={isSuccessModalOpen} onClose={closeSuccessModal} title="Sucesso!">
        <div className="w-full">Ordem cadastrada com sucesso!</div>
      </DefaultModal>
    </main>
  );
}
