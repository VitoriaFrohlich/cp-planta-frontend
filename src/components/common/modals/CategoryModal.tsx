import { useEffect, useState } from 'react';
import GenericModal from './GenericModal';
import DefaultInput from '../inputs/DefaultInput';
import DynamicBox from '../DynamicBox';
import { categoryService } from '@/src/services/categoryService';
import { CategoryDTO } from '@/src/interfaces/CategoryDTO';

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
  item?: CategoryDTO;
}

const service = new categoryService();

export default function CategoryModal({
  onConfirm,
  onClose,
  item
}: ModalProps) {
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setDescricao(item.description);
    } else {
      setDescricao('');
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

  const handleSave = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      if (item) {
        await service.updateCategory(item.id, {
          description: descricao.trim(),
          active: true
        });
      } else {
        await service.createCategory(descricao.trim());
      }

      onConfirm();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      setError('Erro ao salvar a categoria');
    }
  };

  return (
    <GenericModal
      title={(item == null ? 'Cadastro' : 'Edição') + ' de Categoria'}
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
