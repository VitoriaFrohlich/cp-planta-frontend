'use client';
import { useState } from 'react';
import ConfigNavbarComponent from '@/src/components/common/configNavbar';
import Header from '@/src/components/common/header';
import ImageExample from '@/public/config-image-example.svg';
import GenericList from '@/src/components/common/GenericList';
import ModalExample from '@/src/components/common/SimpleModal';

export default function RawMaterialConfig() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Função que retorna os itens da lista
  const getRawMaterials = () => [
    { image: ImageExample, name: 'Batata Branca', quantity: 8 },
    { image: ImageExample, name: 'Cenoura', quantity: 5 },
    { image: ImageExample, name: 'Maçã Fuji', quantity: 7 },
  ];

  return (
    <main>
      <Header />
      <ConfigNavbarComponent>
        <GenericList
          columns={[
            { label: 'Imagem', key: 'image', type: 'image', width: 'w-1/4' },
            { label: 'Descrição', key: 'name', type: 'text', width: 'w-1/4' },
            { label: 'Qnt. lotes', key: 'quantity', type: 'text', width: 'w-1/4' }
          ]}
          getItems={getRawMaterials} // Função que busca os itens
          AddModal={ModalExample} // Abre modal de adicionar
          EditModal={ModalExample} // Abre modal de editar
          DeleteModal={ModalExample} // Abre modal de deletar
        />
      </ConfigNavbarComponent>
    </main>
  );
}
