import Link from 'next/link';
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
      <div className="flex flex-col gap-y-6">
        <h2 className="text-3xl">Estoques</h2>
        <div className="flex gap-x-8">
          <Link
            href="/raw-material/create"
            className="border-[#F56932] border-2 rounded-lg w-[240px] h-auto flex flex-col items-start p-4 gap-y-3"
          >
            <img src="/fruits.svg" alt="" />
            <h3 className="text-base">Estoque de Matéria Prima</h3>
          </Link>
          <Link
            href="/raw-material/create"
            className="border-[#F56932] border-2 rounded-lg w-[240px] h-auto flex flex-col items-start p-4 gap-y-3"
          >
            <img className="w-[247px]" src="/honeycomb.svg" alt="" />
            <h3 className="text-base whitespace-nowrap">Estoque de Produtos Finais</h3>
          </Link>
        </div>
      </div>
      <div className="flex space-x-6 justify-center mx-9">
        <CardOperation title="Operacao batata" type="inProgress" />
        <CardOperation title="Operacao banana" type="finished" />
      </div>
    </main>
  );
}
