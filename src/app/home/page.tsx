import InventorySection from '@/src/components/sections/inventory/InventorySection';
import ButtonOperation from '../../components/buttons/operation/ButtonOperation';
import Header from '../../components/common/header';
import CardOperationSection from '@/src/components/sections/card/CardOperationSection';
import ButtonSettings from '@/src/components/buttons/settings/ButtonSettings';

export default function Home() {
  return (
    <main>
      <Header />
      <ButtonSettings href="/settings" />
      <div>
        <div className="flex gap-6 justify-center mx-9 my-[34px]">
          <ButtonOperation
            title="Criar Ordem"
            description="Selecione Etapas para a Produção"
            href="/operation/create"
          />
          <ButtonOperation
            title="Cadastrar Lote"
            description="Cadastro de Matérias Primas para Operação"
            href="/raw-material/create"
          />
          <ButtonOperation
            title="Cadastrar Produto Final"
            description="Cadastro de Produtos Finais"
            href="/final-product/create"
          />
        </div>
        <hr className="border-[#006F48] border-1 mx-9" />
        <div className="flex justify-center gap-[67px] my-8">
          <CardOperationSection />
          <InventorySection />
        </div>
      </div>
    </main>
  );
}
