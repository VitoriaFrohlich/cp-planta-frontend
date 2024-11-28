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
import DefaultListItems from '@/src/components/common/lists/DefaultListItems';
import Image from 'next/image';
import ReturnIcon from '@/src/components/icons/return-icon.svg';
import {
  getAllFinalProductSelect,
  getStepsByProductId,
  getAllCompositions,
  getAllBatchsByRawMaterial
} from '@/src/services/createOrderService';
import { FinalProduct } from '@/src/types/FinalProduct';
import { RawMaterialSelect } from '@/src/types/RawMaterial';
import { Step } from '@/src/types/Step';

export default function OrderCreate() {
  const router = useRouter();
  const [finalProduct, setFinalProduct] = useState<FinalProduct[]>([]);
  const [selectedFinalProduct, setSelectedFinalProduct] = useState<
    FinalProduct | undefined
  >();
  const [rawMaterials, setRawMaterials] = useState<RawMaterialSelect[]>([]);
  const [selectedRawMaterial, setSelectedRawMaterial] = useState<
    RawMaterialSelect | undefined
  >();
  const [batch, setBatch] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [itens, setItens] = useState([
    //dados mockados
    { batch: 'BATB2020', rawMaterial: 'Batata Branca Grande', quantity: 80 },
    { batch: 'CEN123193', rawMaterial: 'Cenoura', quantity: 50 },
    { batch: 'MACF63820', rawMaterial: 'Maçã Fuji', quantity: 7 }
  ]);
  const [tax, setTax] = useState<number | null>(null);
  const [line, setLine] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [composition, setComposition] = useState(null);

  const handleRemoveItem = (indexToRemove: number) => {
    setItens(itens.filter((_, index) => index !== indexToRemove));
  };

  const sumQuantity = itens.reduce((acc, item) => acc + item.quantity, 0);

  const calculateValue = () => {
    if (tax == null || isNaN(tax)) return '';
    return sumQuantity * (tax / 100) + sumQuantity;
  };

  const handleGetSteps = async (id: string) => {
    try {
      const steps = await getStepsByProductId(id);
      setSteps(steps.production_steps);
    } catch (error) {
      console.log(error);
    }
  };

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
    setFinalProduct([]);
    setLine('');
    setTax(null);
  };

  const getSelectedComposition = async () => {
    try {
      const allCompositions = await getAllCompositions();
      if (selectedFinalProduct) {
        // Filtrar as composições pelo ID do produto final selecionado
        const filteredCompositions = allCompositions.find(
          composition => composition.final_product === selectedFinalProduct.id
        );
        setComposition(filteredCompositions); // Atualizar o estado com as composições filtradas
      } else {
        console.log('Produto final sem composição');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetRawMaterials = () => {
    if (!composition || !composition.composition_items) {
      console.log('No composition selected or no items found');
      return;
    }

    // Transformar composition_items em RawMaterialSelect[]
    const rawMaterials = composition.composition_items.map(item => ({
      id: item.id.toString(), // Convertendo para string se necessário
      description: item.description
    }));

    setRawMaterials(rawMaterials); // Exibe o array transformado
  };

  const handleGetBatchs = async (id: string) => {
    const resp = await getAllBatchsByRawMaterial(id);
    console.log(resp);
  };

  useEffect(() => {
    if (selectedFinalProduct?.id) {
      const idString = selectedFinalProduct.id.toString();
      handleGetSteps(idString);
      getSelectedComposition(); // Atualiza 'composition'
    }
  }, [selectedFinalProduct]);

  // Novo useEffect para monitorar 'composition'
  useEffect(() => {
    if (composition) {
      handleSetRawMaterials(); // Executa após 'composition' ser atualizado
    }
  }, [composition]);

  useEffect(() => {
    if (selectedRawMaterial) {
      handleGetBatchs(selectedRawMaterial.id);
    }
  }, [selectedRawMaterial]);

  React.useEffect(() => {
    getAllFinalProducts();
  }, []);

  const getAllFinalProducts = async () => {
    try {
      const reponse = await getAllFinalProductSelect();
      setFinalProduct(reponse);
    } catch (error) {
      console.log(error);
      setFinalProduct([]);
    }
  };

  const handleFinalProductChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = finalProduct.find(p => p.description === e.target.value);
    setSelectedFinalProduct(selected);
  };

  const handleRawMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = rawMaterials.find(p => p.description === e.target.value);
    setSelectedRawMaterial(selected);
  };

  const handleAddItem = (
    rawMaterial: string,
    batch: string,
    quantity: number
  ) => {
    setItens([...itens, { batch, rawMaterial, quantity }]);
    setRawMaterials([]);
    setBatch('');
    setQuantity(0);
  }; //TODO: alterar para interfaces quando back tiver pronto

  const isFormValidAdd = rawMaterials && batch && quantity > 0;
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
        <div className="flex items-center justify-center ">
          <div className="w-full max-w-7xl p-8">
            <button
              className=" text-greenHortti return-button "
              onClick={() => router.push('/home')}
            >
              <Image src={ReturnIcon} alt="Retornar" width={14} height={14} />
            </button>
            <div className="grid md:grid-cols-7 gap-6 relative">
              <div className="col-span-3">
                <DynamicBox title="Cadastro Ordem" extraStyle="mb-5">
                  <SelectInput
                    label="Produto Final"
                    placeholder="Selecione o Produto a ser produzido"
                    options={finalProduct.map(product => product.description)}
                    onChange={handleFinalProductChange}
                    value={selectedFinalProduct?.description || ''}
                  />
                </DynamicBox>
                <DynamicBox>
                  <SelectInput
                    label="Matéria Prima"
                    options={rawMaterials.map(product => product.description)}
                    value={selectedRawMaterial?.description || ''}
                    onChange={handleRawMaterialChange}
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
                    onClick={() =>
                      handleAddItem(
                        selectedRawMaterial!.description,
                        batch,
                        quantity
                      )
                    }
                  >
                    Adicionar
                  </Button>

                  <div className="w-full h-px bg-greenHortti" />

                  <DefaultListItems
                    items={itens}
                    columns={[
                      { label: 'Lote', key: 'batch', type: 'text' },
                      {
                        label: 'Matéria Prima',
                        key: 'rawMaterial',
                        type: 'text'
                      },
                      { label: 'Quantidade', key: 'batch', type: 'text' }
                    ]}
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
                <DynamicBox title="Nome ordem" extraStyle="mb-5">
                  <h3 className="text-grayHortti">
                    Nome gerado automaticamente
                  </h3>
                  <h2 className="text-xl font-semibold text-black my-4">
                    Ordem X - XXXX
                  </h2>
                </DynamicBox>
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
        {Object.entries(steps).map(([key, step]) => (
          <div
            key={key}
            className="w-full text-black border-greenHortti border rounded-lg p-2 box mt-3"
          >
            {step.description}
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
