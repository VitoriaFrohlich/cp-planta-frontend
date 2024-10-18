import { useEffect, useState } from 'react';
import GenericModal from './GenericModal';
import DefaultInput from '../inputs/DefaultInput';
import DynamicBox from '../DynamicBox';
import Image from 'next/image';
import SelectInput from '../inputs/SelectInput';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  item?: { name: string };
}

export default function RawMaterialModal({ onClose, onConfirm, item }: Props) {
  const [descricao, setDescricao] = useState('');
  const [category, setCategory] = useState('');
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
      title={(item == null ? 'Cadastro' : 'Edição') + ' de Matéria prima'}
      onClose={onClose}
      onConfirm={handleSave}
    >
      <DynamicBox extraStyle="mb-5">
        <DefaultInput
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          label="Descrição"
          error={error}
        />
        <SelectInput
          label="Categoria"
          value={category}
          placeholder="Selecione a categoria"
          onChange={e => setCategory(e.target.value)}
          options={['Fruta', 'Vegetal', 'Legume', 'Tuberculo']}
        />
      </DynamicBox>
      <DynamicBox extraStyle="mb-5">
        <p className="text-black text-2xl font-bold">Adicionar Imagem</p>
        <p className="text-gray-400">Selecione uma Imagem de no máximo 20mb</p>
        <div className="h-40 w-full">
          <Image
            src="/fruits.svg"
            alt="Imagem do Produto"
            className="mt-2 w-full h-full object-cover rounded-xl"
            layout="fixed"
            width={500}
            height={500}
          />
        </div>
      </DynamicBox>
    </GenericModal>
  );
}
