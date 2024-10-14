import DynamicBox from "../common/DynamicBox";

type Props = {
  itens: BatchItemDTO[];
  editable?: boolean;
  onRemove?: (index: number) => void;
  header?: boolean;
};

export default function BatchListComponent({
  itens,
  editable,
  onRemove,
  header,
}: Props) {
  return (
    <div>
      {/* Header da tabela */}
      {header && (
        <div className={`grid grid-cols-3 gap-4 my-4 lg:mx-10`}>
          <div>Lote</div>
          <div>Matéria Prima</div>
          <div>Quantidade</div>
        </div>
      )}

      {/* Lista de itens adicionados */}
      <div className="h-auto max-h-48 overflow-auto">
        {itens.map((item, index) => (
          <div
            key={index}
            className="flex gap-6 items-center mb-4 overflow-auto border-b pb-2 w-full "
          >
            <DynamicBox>
              <div className="text-black font-semibold w-full justify-between">
                {/* Renderizando o valor do item */}
                {item.batch} {item.rawMaterial} {item.quantity}
              </div>
            </DynamicBox>

            {editable && onRemove && (
              <div className="w-1/4 flex justify-end">
                <button
                  className="text-red-600 font-semibold border border-red-600 rounded-full py-1 px-2"
                  onClick={() => onRemove(index)}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
