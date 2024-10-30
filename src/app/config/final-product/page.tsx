'use client';
import ConfigNavbarComponent from '@/src/components/common/configNavbar';
import GenericList from '@/src/components/common/GenericList';
import Header from '@/src/components/common/header';
import ImageExample from '@/public/config-image-example.svg';
import DeleteModal from '@/src/components/common/modals/DeleteModal';
import FinalProductModal from '@/src/components/common/modals/FinalProductModal';

export default function createFinalProduct() {
  // Função que retorna os itens da lista
  const getFinalProduct = async () => [
    { id: 1, image: ImageExample, name: 'Batata palito', quantity: 4 },
    { id: 2, image: ImageExample, name: 'Cenoura Fatiada', quantity: 2 },
    { id: 3, image: ImageExample, name: 'Maçã Fuji em Cubos', quantity: 9 }
  ];
  const deleteFinalProduct = async (_id: string) => [
    //Deletar produto final
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
          getItems={getFinalProduct} // Função que busca os itens
          deleteItem={deleteFinalProduct} // Função que deleta o item
          AddModal={FinalProductModal} // Abre modal de adicionar
          EditModal={FinalProductModal} // Abre modal de editar
          DeleteModal={DeleteModal} // Abre modal de deletar
        />
      </ConfigNavbarComponent>
    </main>
  );
}
