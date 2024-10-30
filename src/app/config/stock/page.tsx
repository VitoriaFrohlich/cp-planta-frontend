'use client';
import ConfigNavbarComponent from '@/src/components/common/configNavbar';
import GenericList from '@/src/components/common/GenericList';
import Header from '@/src/components/common/header';
import DeleteModal from '@/src/components/common/modals/DeleteModal';
import StockModal from '@/src/components/common/modals/StockModal';

export default function createStock() {
  // Função que retorna os itens da lista
  const getStocks = async () => [
    { id: 1, name: 'Frezzer', quantity: 8 },
    { id: 2, name: 'Geladeira', quantity: 5 },
    { id: 3, name: 'Armário 1', quantity: 7 },
    { id: 4, name: 'Armário 2', quantity: 7 }
  ];

  const deleteStock = async (_id: string) => [
    //Deletar estoque
  ];
  return (
    <main>
      <Header />
      <ConfigNavbarComponent>
        <GenericList
          columns={[
            { label: 'Descrição', key: 'name', type: 'text', width: 'w-1/3' },
            {
              label: 'Qnt. lotes',
              key: 'quantity',
              type: 'text',
              width: 'w-1/3'
            }
          ]}
          getItems={getStocks} // Função que busca os itens
          deleteItem={deleteStock} // Função que deleta o item
          AddModal={StockModal} // Abre modal de adicionar
          EditModal={StockModal} // Abre modal de editar
          DeleteModal={DeleteModal} // Abre modal de deletar
        />
      </ConfigNavbarComponent>
    </main>
  );
}
