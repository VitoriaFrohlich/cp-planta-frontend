import { useEffect, useState } from 'react';
import GenericModal from './GenericModal';
import DefaultInput from '../inputs/DefaultInput';
import { Button } from '@headlessui/react';
import DynamicBox from '../DynamicBox';
import SelectInput from '../inputs/SelectInput';
import DefaultListItems from '../lists/DefaultListItems';
import Image from 'next/image';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  item?: {
    name: string;
  };
}

export default function FinalProductModal({ onClose, onConfirm, item }: Props) {
  const [descricao, setDescricao] = useState('');
  const [rawMateriaCategory, setRawMaterialCategory] = useState('');
  const [category, setCategory] = useState('');
  const [step, setSteps] = useState('');

  const [categorys, setCategorys] = useState<{ category: string }[]>([]);
  const [stepsType, setStepsType] = useState<{ step: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item != null) {
      setDescricao(item?.name ?? '');
      //Adicionar campos do item para carregar na edicao
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
  const isFormValidAddType = category != '';
  const isFormValidAddSteps = step != '';

  const handleAddCategory = (category: string) => {
    setCategorys([...categorys, { category }]);
    setCategory('');
  };

  const handleAddSteps = (step: string) => {
    setStepsType([...stepsType, { step }]);
    setSteps('');
  };

  const handleRemoveCategory = (indexToRemove: number) => {
    setCategorys(categorys.filter((_, index) => index !== indexToRemove));
  };

  const handleRemoveSteps = (indexToRemove: number) => {
    setStepsType(stepsType.filter((_, index) => index !== indexToRemove));
  };
  return (
    <GenericModal
      title={(item == null ? 'Cadastro' : 'Edição') + ' de Produto Final'}
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
          value={rawMateriaCategory}
          placeholder="Selecione a categoria"
          onChange={e => setRawMaterialCategory(e.target.value)}
          options={['batata', 'cenoura']}
        />
      </DynamicBox>
      <DynamicBox extraStyle="mb-5">
        <SelectInput
          label="Tipo de Materia Prima"
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="Selecione o tipo"
          options={[
            'Batata Inglesa Media',
            'Batata Inglesa Pequena',
            'Batata Inglesa Grande'
          ]}
        />
        <Button
          className={`border rounded-lg w-full p-2 mt-2 mb-4 ${
            isFormValidAddType
              ? 'bg-greenHortti text-white'
              : 'bg-gray-100 text-black cursor-not-allowed border-x-gray-300'
          }`}
          disabled={!isFormValidAddType}
          onClick={() => handleAddCategory(category)}
        >
          Adicionar
        </Button>
        <DefaultListItems
          items={categorys}
          columns={[{ key: 'category', type: 'text' }]}
          scrollable
          onRemove={handleRemoveCategory}
        />
      </DynamicBox>
      <DynamicBox extraStyle="mb-5">
        <SelectInput
          label="Etapa"
          value={step}
          onChange={e => setSteps(e.target.value)}
          placeholder="Selecione a etapa"
          options={[
            'Batata Inglesa Media',
            'Batata Inglesa Pequena',
            'Batata Inglesa Grande'
          ]}
        />
        <Button
          className={`border rounded-lg w-full p-2 mt-2 mb-4 ${
            isFormValidAddSteps
              ? 'bg-greenHortti text-white'
              : 'bg-gray-100 text-black cursor-not-allowed border-x-gray-300'
          }`}
          disabled={!isFormValidAddSteps}
          onClick={() => handleAddSteps(step)}
        >
          Adicionar
        </Button>
        <DefaultListItems
          items={stepsType}
          columns={[{ key: 'step', type: 'text' }]}
          scrollable
          onRemove={handleRemoveSteps}
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
