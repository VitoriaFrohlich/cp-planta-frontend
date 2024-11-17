import { useEffect, useState } from 'react';
import GenericModal from './GenericModal';
import DefaultInput from '../inputs/DefaultInput';
import DynamicBox from '../DynamicBox';
import { categoryService } from '@/src/services/categoryService';

interface ModalProps {
  onClose: () => void;
  onConfirm?: () => void;
  item?: CategoryDTO;
}

const service = new categoryService();

export default function CategoryModal({
  onClose,
  item,
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

    if (item) {
      // Edição: Se o item já existe, atualiza a categoria
      await service.updateCategory(item.id, { description: descricao, active: true }); // Método para editar a categoria
      console.log('Categoria atualizada com sucesso: ', descricao);
    } else {
      // Criação: Se o item não existe, cria uma nova categoria
      await service.createCategory(descricao);  // Método para criar a categoria
      console.log('Categoria criada com sucesso: ', descricao);
    }

    onClose(); // Fecha o modal após salvar
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
