'use client';
import ConfigNavbarComponent from '@/src/components/common/configNavbar';
import Header from '@/src/components/common/header';
import ImageExample from '@/public/config-image-example.svg';
import GenericList from '@/src/components/common/GenericList';
import SimpleModal from '@/src/components/common/SimpleModal';
import RawMaterialModal from '@/src/components/common/modals/RawMaterialModal';

export default function RawMaterialConfig() {
  // Função que retorna os itens da lista
  const getRawMaterials = async () => [
    { id: 1, image: ImageExample, name: 'Batata Branca', quantity: 8 },
    { id: 2, image: ImageExample, name: 'Cenoura', quantity: 5 },
    { id: 3, image: ImageExample, name: 'Maçã Fuji', quantity: 7 }
  ];

  return (
    <main>
      <Header />
      <ConfigNavbarComponent>
        <GenericList
          columns={[
            { label: 'Imagem', key: 'image', type: 'image', width: 'w-1/4' },
            { label: 'Descrição', key: 'name', type: 'text', width: 'w-1/4' },
            {
              label: 'Qnt. lotes',
              key: 'quantity',
              type: 'text',
              width: 'w-1/4'
            }
          ]}
          getItems={getRawMaterials} // Função que busca os itens
          AddModal={RawMaterialModal} // Abre modal de adicionar
          EditModal={SimpleModal} // Abre modal de editar
          DeleteModal={SimpleModal} // Abre modal de deletar
        />
      </ConfigNavbarComponent>
    </main>
  );
}
