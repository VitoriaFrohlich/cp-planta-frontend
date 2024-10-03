'use client';
import SelectInput from '@/src/components/common/inputs/SelectInput';
import NumericInput from '@/src/components/common/inputs/NumericInput';
import AcceptButton from '@/src/components/buttons/operation/AcceptButton';
import CancelButton from '@/src/components/buttons/operation/CancelButton';
import Header from '@/src/components/common/header';
import { Button } from '@headlessui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DefaultInput from '@/src/components/common/inputs/DefaultInput';
import DefaultModal from '@/src/components/common/modals/DefaultModal';
import React from 'react';

export default function OrderCreate() {
  const router = useRouter();
  const [materiaPrima, setMateriaPrima] = useState('');
  const [lote, setLote] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [items, setItems] = useState([
    { name: 'Batata Inglesa Média', lote: '10002', quantity: 10 },
    { name: 'Batata Inglesa Média', lote: '20526', quantity: 10 },
    { name: 'Batata Inglesa Média', lote: '60205', quantity: 10 },
    { name: 'Batata Inglesa Média', lote: '47856', quantity: 10 }
  ]);

  const handleRemoveItem = (indexToRemove: number) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  const [tax, setTax] = useState<number | null>(null);

  const sumQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const calculateValue = () => {
    return tax == null ? null : sumQuantity * (tax / 100) + sumQuantity;
  };

  const etapas = ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 1'];

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddItem = (
    materiaPrima: string,
    lote: string,
    quantidade: number
  ) => {
    setItems([
      ...items,
      { name: materiaPrima, lote: lote, quantity: quantidade }
    ]);
  }; //TODO: alterar para interfaces quando back tiver pronto

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
                <h2 className="text-xl font-semibold text-black mb-6">
                  Cadastro de Ordem
                </h2>
                {/* Inputs do formulário */}
                <div className="border border-greenHortti border-10 px-5 pt-5 rounded-md mb-3">
                  <SelectInput
                    label="Produto Final"
                    placeholder="Selecione o Produto a ser produzido"
                    options={[
                      'Batata Frita',
                      'Batata Palito',
                      'Batata Rústica'
                    ]}
                  />
                </div>
                <div className="border border-greenHortti border-10 p-5 rounded-md">
                  <SelectInput
                    label="Matéria Prima"
                    options={['Batata Inglesa Média', 'Cenoura', 'Tomate']}
                    value={materiaPrima}
                    onChange={e => setMateriaPrima(e.target.value)}
                    placeholder="Selecione o tipo"
                  />
                  <NumericInput
                    label="Quantidade de Entrada de Materia Prima"
                    placeholder="0 KG"
                    value={quantidade}
                    onChange={e => {
                      const value = parseInt(e.target.value);
                      setQuantidade(value >= 0 ? value : 0);
                    }}
                  />
                  <SelectInput
                    label="Lote"
                    options={['120DED2', '1900DSC', '09OPP2D']}
                    placeholder="Selecione o lote"
                    value={lote}
                    onChange={e => setLote(e.target.value)}
                  />
                  <Button
                    className="border rounded-lg w-full p-2 mt-2 mb-4 text-white bg-greenHortti"
                    onClick={() =>
                      handleAddItem(materiaPrima, lote, quantidade)
                    }
                  >
                    Adicionar
                  </Button>

                  <div className="w-full h-px bg-greenHortti" />

                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div className="text-black font-semibold">Nome</div>
                    <div className="text-black font-semibold">Lote</div>
                    <div className="text-black font-semibold">Quantidade</div>
                  </div>

                  <div className="h-48 overflow-auto ">
                    {/* Lista de itens adicionados */}
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 gap-4 items-center mb-4 overflow-auto"
                      >
                        <div className="text-black">{item.name}</div>
                        <div className="text-black">{item.lote}</div>
                        <div className="flex justify-between text-black">
                          <span className="text-black">
                            {item.quantity + ' Kg'}
                          </span>
                          <button
                            className="text-red-600 font-semibold border border-red-600 rounded-full py-1 px-2"
                            onClick={() => handleRemoveItem(index)}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Separador Vertical */}
              <div className="flex items-center justify-center col-span-1">
                <div className="w-px bg-greenHortti h-full"></div>
              </div>

              {/* Receita Utilizada */}
              <div className="col-span-3">
                <div>
                  <h2 className="text-xl font-semibold text-black mb-6">
                    Lotes Selecionados
                  </h2>
                </div>
                <div className="border border-greenHortti border-10 p-5 rounded-md mb-4">
                  <SelectInput
                    label={'Linha selecionada'}
                    placeholder={'Selecione a Linha de Produção'}
                    options={['1', '2']}
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
                </div>
                <Button
                  className="border rounded-lg w-full p-2 mt-2 mb-4 text-balck border-greenHortti bg-greenHorttiBg"
                  onClick={() => openModal()}
                >
                  Etapas
                </Button>
                <h2 className="text-xl font-semibold text-black mb-6">
                  Nome Ordem
                </h2>
                <div className="border border-greenHortti border-10 p-5 rounded-md mb-4">
                  <h3 className="text-grayHortti">
                    Nome gerado automaticamente
                  </h3>
                  <h2 className="text-xl font-semibold text-black my-4">
                    Ordem X - XXXX
                  </h2>
                </div>
                <div className=" flex justify-end space-x-4 mt-6">
                  {/* Botões */}
                  <AcceptButton
                    title="Finalizar"
                    image="/check-icon.svg"
                    href="/desired-path"
                  />
                  <CancelButton
                    title="Cancelar"
                    image="/trash-icon.svg"
                    href="/desired-path"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DefaultModal isVisible={isModalOpen} onClose={closeModal} title="Etapas">
        {etapas.map((etapa, index) => (
          <div
            key={index}
            className="w-full border-greenHortti border rounded-lg p-2 box mt-3"
          >
            {etapa}
          </div>
        ))}
      </DefaultModal>
    </main>
  );
}
