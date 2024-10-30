import { useEffect, useState } from 'react';
import GenericModal from './GenericModal';
import DefaultInput from '../inputs/DefaultInput';
import DynamicBox from '../DynamicBox';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  item?: { name: string };
}

export default function StockModal({ onClose, onConfirm, item }: Props) {
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
      title={(item == null ? 'Cadastro' : 'Edição') + ' de Estoque'}
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
