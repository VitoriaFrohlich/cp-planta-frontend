import ButtonOperation from '../../components/buttons/operation/button-operation';

export default function Home() {
  return (
    <main>
      <div className="flex space-x-6 justify-center mx-9">
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
    </main>
  );
}
