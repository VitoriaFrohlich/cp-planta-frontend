import InventorySection from '@/src/components/sections/inventory/inventory-section';
import ButtonOperation from '../../components/buttons/operation/ButtonOperation';
import CardOperation from '../../components/cards/operation/CardOperation';

export default function Home() {
  return (
    <main>
      <div className="flex gap-6 justify-center mx-9">
        <ButtonOperation
          title="Criar Operação"
          description="Selecione Etapas para a Produção"
          href="/operation/create"
        />
        <ButtonOperation
          title="Cadastrar Matéria Prima"
          description="Cadastro de Matérias Primas para Operação"
          href="/raw-material/create"
        />
        <ButtonOperation
          title="Cadastrar Produto Final"
          description="Cadastro de Produtos Finais"
          href="/final-product/create"
        />
      </div>
      <InventorySection />
      <div className="flex space-x-6 justify-center mx-9">
        <CardOperation title="Operacao batata" type="inProgress" />
        <CardOperation title="Operacao banana" type="finished" />
      </div>
    </main>
  );
}
