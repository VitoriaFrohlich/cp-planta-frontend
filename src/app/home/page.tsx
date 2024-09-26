import ButtonOperation from '../../components/buttons/operation/ButtonOperation';
import CardOperation from '../../components/cards/operation/CardOperation';
import ButtonStock from '@/src/components/buttons/stock/button-stock';

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
      <div className="flex flex-col gap-y-6">
        <h2 className="text-3xl">Estoques</h2>
        <div className="flex gap-x-8">
          <ButtonStock
            description="Estoque de Matéria Prima"
            image="/fruits.svg"
            href="/raw-material/stock"
          />
          <ButtonStock
            description="Estoque de Produtos Finais"
            image="/honeycomb.svg"
            href="/final-product/stock"
          />
        </div>
      </div>
      <div className="flex space-x-6 justify-center mx-9">
        <CardOperation title="Operacao batata" type="inProgress" />
        <CardOperation title="Operacao banana" type="finished" />
      </div>
    </main>
  );
}
