'use client';
import ConfigNavbarComponent from '@/src/components/common/configNavbar';
import GenericList from '@/src/components/common/GenericList';
import Header from '@/src/components/common/header';
import DeleteModal from '@/src/components/common/modals/DeleteModal';
import StepModal from '@/src/components/common/modals/StepModal';

export default function createStep() {
  // Função que retorna os itens da lista
  // Mock-data
  const getSteps = async () => [
    { id: 1, name: 'Lavar' },
    { id: 2, name: 'Descascar' },
    { id: 3, name: 'Fatiar' },
    { id: 4, name: 'Embalar' },
    { id: 5, name: 'Rotular' }
  ];

  const deleteStep = async (_id: string) => [
    //Deletar Etapa
  ];

  return (
    <main>
      <Header />
      <ConfigNavbarComponent>
        <GenericList
          columns={[
            { label: 'Descrição', key: 'name', type: 'text', width: 'w-1/2' }
          ]}
          getItems={getSteps} // Função que busca os itens
          deleteItem={deleteStep} // Função que deleta o item
          AddModal={StepModal} // Abre modal de adicionar
          EditModal={StepModal} // Abre modal de editar
          DeleteModal={DeleteModal} // Abre modal de deletar
        />
      </ConfigNavbarComponent>
    </main>
  );
}
