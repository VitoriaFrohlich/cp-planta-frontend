import CardOperation from '../../cards/operation/CardOperation';

export default function CardOperationSection() {
  return (
    <div className="space-y-8 lg:w-1/2">
      <h2 className="text-3xl text-black text-center lg:text-left">
        Ordens em Andamento
      </h2>
      {/* Colunas responsivas para operações */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <CardOperation title="Ordem batata" type="inProgress" />
        <CardOperation title="Ordem banana" type="finished" />
        <CardOperation title="Ordem batata" type="inProgress" />
        <CardOperation title="Ordem banana" type="finished" />
        <CardOperation title="Ordem batata" type="inProgress" />
        <CardOperation title="Ordem banana" type="finished" />
        <CardOperation title="Ordem batata" type="inProgress" />
        <CardOperation title="Ordem banana" type="finished" />
      </div>
    </div>
  );
}
