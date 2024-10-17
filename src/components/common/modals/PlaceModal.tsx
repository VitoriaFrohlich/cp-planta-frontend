import { useState } from 'react';
import DynamicBox from '@/src/components/common/DynamicBox';
import AcceptButton from '@/src/components/buttons/order/AcceptButton';
import CancelButton from '@/src/components/buttons/order/CancelButton';
interface ModalProps {
    onClose?: () => void; // Função chamada para fechar o modal
    item?: { name: string }; // Item opcional para exibição ou manipulação
  }
  
export default function StockModal({
    onClose,
    item,
  }: ModalProps) {
  const [descricao, setDescricao] = useState('');

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-1/2 h-auto p-4 ">
        <div className="w-full p-8 flex-grow overflow-y-auto">
          <div className="flex flex-row h-full">
            <div className="grid md:grid-cols-7 gap-6 mx-auto w-full max-w-screen-lg relative">
              {/* Coluna da esquerda */}
              <div className="col-span-3">
                <DynamicBox title={(item == null ? "Cadastro" : "Edição")+ " de Estoque"} extraStyle="mb-5">
                  <form className="flex flex-col gap-4">
                    {/* Descrição */}
                    <label
                      className="font-medium text-lg text-black"
                      htmlFor="descricao"
                    >
                      Descrição
                    </label>
                    <input
                      type="text"
                      id="descricao"
                      placeholder="Descrição"
                      value={descricao}
                      onChange={e => setDescricao(e.target.value)}
                      className="w-full text-black mt-1 border border-greenHortti rounded-lg p-2"
                    />

                  </form>
                </DynamicBox>

                <div className=" flex justify-end space-x-4 mt-6">
                  <AcceptButton
                    title="Finalizar"
                    image="/check-icon.svg"
                    onClick={onClose}
                  />
                  <CancelButton
                    title="Cancelar"
                    image="/trash-icon.svg"
                    href="/config/raw-material"
                  />
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

