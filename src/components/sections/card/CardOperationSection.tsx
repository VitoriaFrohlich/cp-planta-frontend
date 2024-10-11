import CardOperation from '../../cards/operation/CardOperation';

export default function CardOperationSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl text-[#000000]">Operações em Andamento</h2>
      <div className="flex gap-16 justify-center">
        <CardOperation title="Operacao batata" type="inProgress" />
        <CardOperation title="Operacao banana" type="finished" />
      </div>
      <div className="flex gap-16 justify-center">
        <CardOperation title="Operacao batata" type="inProgress" />
        <CardOperation title="Operacao banana" type="finished" />
      </div>
      <div className="flex gap-16 justify-center">
        <CardOperation title="Operacao batata" type="inProgress" />
        <CardOperation title="Operacao banana" type="finished" />
      </div>
      <div className="flex gap-16 justify-center">
        <CardOperation title="Operacao batata" type="inProgress" />
        <CardOperation title="Operacao banana" type="finished" />
      </div>
    </div>
  );
}
