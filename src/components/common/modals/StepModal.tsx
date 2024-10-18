import { useEffect, useState } from 'react';
import GenericModal from './GenericModal';
import DefaultInput from '../inputs/DefaultInput';
import DynamicBox from '../DynamicBox';

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
  item?: { name: string };
}

export default function StepModal({ onClose, onConfirm, item }: ModalProps) {
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
    <GenericModal
      title={(item == null ? 'Cadastro' : 'Edição') + ' de Etapa'}
      onClose={onClose}
      onConfirm={handleSave}
    >
      <DynamicBox extraStyle="mb-5">
        <form className="flex flex-col gap-4">
          <DefaultInput
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            label="Descrição"
            error={error}
          />
        </form>
      </DynamicBox>
    </GenericModal>
  );
}
