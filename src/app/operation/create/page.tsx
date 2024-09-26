'use client';
import CommonSelect from '@/src/components/common/commonSelect';
import NumericInput from '@/src/components/common/numericInput';
import { Button } from '@headlessui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OperationCreate() {
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
      <div className="w-full h-20">header</div>
      <div className="min-h-screen bg-white">
        <button
          className=" text-greenHortti pt-10 pl-10"
          onClick={() => router.back()}
        >
          Voltar
        </button>
        <div className="flex items-center justify-center py-6">
          <div className="w-full max-w-7xl p-8">
            <div className="grid md:grid-cols-7 gap-6 relative">
              {/* Formulário - Cadastro de Operação */}
              <div className="col-span-3">
                <h2 className="text-xl font-semibold text-black mb-6">
                  Cadastro de Operação
                </h2>
                <div className="border border-greenHortti border-10 p-5 rounded-md">
                  {/* Inputs do formulário */}
                  <CommonSelect
                    label="Matéria Prima"
                    options={['Batata Inglesa Média', 'Cenoura', 'Tomate']}
                    value={materiaPrima}
                    onChange={e => setMateriaPrima(e.target.value)}
                    placeholder="Selecione o tipo"
                  />
                  <CommonSelect
                    label="Lote"
                    options={['120DED2', '1900DSC', '09OPP2D']}
                    placeholder="Selecione o lote"
                    value={lote}
                    onChange={e => setLote(e.target.value)}
                  />
                  <NumericInput
                    label="Quantidade"
                    placeholder="0"
                    value={quantidade}
                    onChange={e => {
                      const value = parseInt(e.target.value);
                      // Garante que o valor nunca será menor que 0
                      setQuantidade(value >= 0 ? value : 0);
                    }}
                  />
                  <Button
                    className="border rounded-lg w-full p-2 mt-2 mb-4 text-white bg-greenHortti"
                    onClick={() =>
                      handleAddItem(materiaPrima, lote, quantidade)
                    }
                  >
                    Adicionar
                  </Button>
                  <div className="w-full bg-greenHortti h-px mb-4"></div>

                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div className="text-black font-semibold">Nome</div>
                    <div className="text-black font-semibold">Lote</div>
                    <div className="text-black font-semibold">Quantidade</div>
                  </div>

                  {/* Lista de itens adicionados */}
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-4 items-center mb-4"
                    >
                      <div>{item.name}</div>
                      <div>{item.lote}</div>
                      <div className="flex justify-between">
                        <span>{item.quantity + ' Kg'}</span>
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

              {/* Separador Vertical */}
              <div className="flex items-center justify-center col-span-1">
                <div className="w-px bg-greenHortti h-full"></div>
              </div>

              {/* Receita Utilizada */}
              <div className="col-span-3">
                <div>
                  <h2 className="text-xl font-semibold text-black mb-6">
                    Informações Obrigatórias
                  </h2>
                </div>
                <div className="border border-greenHortti border-10 p-5 rounded-md mb-4">
                  {/* Etapas da receita */}
                  <CommonSelect
                    label="Linha selecionada"
                    placeholder="Selecione a Linha de Produção"
                    options={['1', '2']}
                  />
                  <CommonSelect
                    label="Produto Final"
                    placeholder="Selecione o Tipo"
                    options={[]}
                  ></CommonSelect>
                  <NumericInput
                    label="Quantidade esperada"
                    placeholder="0"
                  ></NumericInput>
                  <h2 className="text-black ">Receita Utilizada</h2>
                  <div className="text-lg my-4 text-center">ETAPAS</div>
                </div>
                <h2 className="text-xl font-semibold text-black mb-6">
                  Nome operação
                </h2>
                <div className="border border-greenHortti border-10 p-5 rounded-md mb-4">
                  <h3 className="text-grayHortti">
                    Nome gerado automaticamente
                  </h3>
                  <h2 className="text-xl font-semibold text-black my-4">
                    Operação X - XXXX
                  </h2>
                </div>
                <div className=" flex justify-end space-x-4 mt-6">
                  {/* Botões */}
                  <button className="w-full bg-greenHortti text-white py-2 px-4 rounded-lg hover:bg-green-700">
                    Finalizar
                  </button>
                  <button className="w-full bg-grayHortti text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
