import { useState } from 'react';
import DynamicBox from '@/src/components/common/DynamicBox';
import Image from 'next/image';
import GenericModal from '@/src/components/common/modals/GenericModal';
import SelectInput from '../inputs/SelectInput';
import DefaultInput from '../inputs/DefaultInput';

const RawMaterialModal: React.FC = () => {
  const [rawMaterial, setRawMaterial] = useState('');

  // rever esses pontos:
  // const openModal = () => setIsModalOpen(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <GenericModal
      isOpen={isModalOpen} //ajustar esse ponto
      onClose={closeModal}
      title="Cadastrar Materia Prima"
    >
      <DynamicBox extraStyle="mb-5">
        <DefaultInput label="Descricao" placeholder="Descricao" />
        <SelectInput
          label="Categoria"
          value={rawMaterial}
          placeholder="Selecione a categoria"
          onChange={e => setRawMaterial(e.target.value)}
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
};

export default RawMaterialModal;
