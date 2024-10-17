import { useEffect, useState } from 'react';
import DynamicBox from '@/src/components/common/DynamicBox';
import AcceptButton from '@/src/components/buttons/order/AcceptButton';
import CancelButton from '@/src/components/buttons/order/CancelButton';

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
  item?: { name: string };
}

export default function StepModal({
  onClose,
  onConfirm,
  item,
}: ModalProps) {
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item != null) {
      setDescricao(item?.name ?? '');
    }
  }, [item]);

  const validateFields = (): boolean => {
    if (descricao.trim() === '') {
      setError('O campo descrição é obrigatório.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleSave = () => {
    if (!validateFields()) {
      return;
    }
    onConfirm();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-1/2 h-auto p-4">
        <div className="w-full p-8 flex-grow overflow-y-auto">
          <div className="flex flex-row h-full">
            <div className="grid md:grid-cols-7 gap-6 mx-auto w-full max-w-screen-lg relative">
              <div className="col-span-7">
                <DynamicBox title={(item == null ? "Cadastro" : "Edição") + " de Etapa"} extraStyle="mb-5">
                  <form className="flex flex-col gap-4">
                    {/* Descrição */}
                    <label className="font-medium text-lg text-black" htmlFor="descricao">
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
                    {/* Exibe o erro se houver */}
                    {error && (
                      <p className="text-red-600 text-sm mt-1">
                        {error}
                      </p>
                    )}
                  </form>
                </DynamicBox>

                <div className="flex justify-end space-x-4 mt-6">
                  <AcceptButton
                    title="Finalizar"
                    image="/check-icon.svg"
                    onClick={handleSave}
                  />
                  <CancelButton
                    title="Cancelar"
                    image="/trash-icon.svg"
                    onClick={onClose}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
