import { useEffect, useState } from 'react';
import GenericModal from './GenericModal';
import DefaultInput from '../inputs/DefaultInput';
import { Button } from '@headlessui/react';
import DynamicBox from '../DynamicBox';
import SelectInput from '../inputs/SelectInput';
import DefaultListItems from '../lists/DefaultListItems';
import Image from 'next/image';
import { getCategories } from '@/src/services/categoryService';
import { getListRawMaterial, getSelectRawMaterial } from '@/src/services/rawMaterialService';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  item?: {id?: string,
     description: string ,
      category_id: number ,
       category?: string};
}

export default function FinalProductModal({ onClose, onConfirm, item }: Props) {
  const [descricao, setDescricao] = useState('');
  const [rawMateriaCategory, setRawMaterialCategory] = useState('');
  const [rawMaterialSelected, setRawMaterialSelected] = useState('');
  const [category, setCategory] = useState('');
  const [step, setSteps] = useState('');
  const [categorySelectList, setCategorySelectList] = useState<{ id: string; description: string }[]>([]);
  const [rawMaterials, setRawMaterials] = useState<{ description: string }[]>([]);
  const [rawMaterialSelectList, setRawMaterialSelectList] = useState<{ id: string; description: string }[]>([]);
  const [stepsType, setStepsType] = useState<{ step: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const data = await getCategories();
        setCategorySelectList(data); // Armazene as categorias no estado
      
        // Se houver um item, preencha os campos de descrição e categoria
        if (item != null) {
          setDescricao(item.description ?? '');
          console.log(data)
          setCategory(data.find(x => x.description == item?.category)?.id ?? '');
        }

        const raw = await getSelectRawMaterial();
        setRawMaterialSelectList(raw); // Armazene as categorias no estado
      
        // Se houver um item, preencha os campos de descrição e categoria
        if (item != null) {
          setDescricao(item.description ?? '');
          console.log(data)
          setCategory(data.find(x => x.description == item?.category)?.id ?? '');
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
  
    loadItem();
  
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
  const isFormValidAddType = rawMaterialSelected != '';
  const isFormValidAddSteps = step != '';

  const handleAddRawMaterial = (description: string) => {
    setRawMaterials([...rawMaterials, { description: description }]);
    setRawMaterialSelected('');
  };

  const handleAddSteps = (step: string) => {
    setStepsType([...stepsType, { step }]);
    setSteps('');
  };

  const handleRemoveCategory = (indexToRemove: number) => {
    setRawMaterials(rawMaterials.filter((_, index) => index !== indexToRemove));
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
          value={category}
          placeholder="Selecione a categoria"
          onChange={e => setCategory(e.target.value)}
          options={categorySelectList.map(cat => ({ value: cat.id, label: cat.description }))}
        />
      </DynamicBox>
      <DynamicBox title='Composição' extraStyle="mb-5">
        <SelectInput
          label="Materia Prima"
          value={rawMaterialSelected}
          onChange={e => setRawMaterialSelected(e.target.value)}
          placeholder="Selecione o tipo"
          options={rawMaterialSelectList.map(cat => ({ value: cat.id, label: cat.description }))}
        />
        <Button
          className={`border rounded-lg w-full p-2 mt-2 mb-4 ${
            isFormValidAddType
              ? 'bg-greenHortti text-white'
              : 'bg-gray-100 text-black cursor-not-allowed border-x-gray-300'
          }`}
          disabled={!isFormValidAddType}
          onClick={() => handleAddRawMaterial(rawMaterialSelected)}
        >
          Adicionar
        </Button>
        <DefaultListItems
          items={rawMaterials}
          renderItem={item => <span>{item.description}</span>}
          editable
          scrollable
          onRemove={handleRemoveCategory}
        />
      </DynamicBox>
      <DynamicBox title='Processo de produção' extraStyle="mb-5">
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
          renderItem={item => <span>{item.step}</span>}
          editable
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
