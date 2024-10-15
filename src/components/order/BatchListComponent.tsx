import DynamicBox from '../common/DynamicBox';

type Props = {
  itens: {
    batch: string;
    rawMaterial: string;
    quantity: number;
  }[];
  editable?: boolean;
  onRemove?: (index: number) => void;
  header?: boolean;
  extraStyle?: string;
  scrollable?: boolean;
};

export default function BatchListComponent({
  itens,
  editable = false,
  onRemove,
  header = false,
  extraStyle = '',
  scrollable = false
}: Props) {
  return (
    <div>
      {/* Header da tabela */}
      {header && editable && (
        <div className={'grid grid-cols-9 my-4 gap-4'}>
          <span className="text-black font-bold col-span-3 text-center truncate">
            Lote
          </span>
          <span className="text-black font-bold col-span-3 truncate">
            Matéria Prima
          </span>
          <span className="text-black font-bold col-span-3 truncate">
            Quantidade
          </span>
        </div>
      )}

      {header && !editable && (
        <div className={'grid grid-cols-9 my-4 gap-4'}>
          <span className="font-bold col-span-3 text-center truncate">
            Lote
          </span>
          <span className="font-bold col-span-3 text-center truncate">
            Matéria Prima
          </span>
          <span className="font-bold col-span-3 text-right truncate">
            Quantidade
          </span>
        </div>
      )}

      {editable && onRemove && (
        <div
          className={`h-auto max-h-64 ${extraStyle} ${scrollable ? 'overflow-auto' : 'overflow-hidden'}`}
        >
          {itens.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-10 gap-4 items-center mb-4 border-b pb-2 w-full"
            >
              <div className="col-span-9">
                <DynamicBox extraStyle="w-full p-3">
                  <div className="text-black font-semibold w-full grid grid-cols-9">
                    {/* Renderizando o valor do item */}
                    <div className="col-span-3 truncate" title={item.batch}>
                      {' '}
                      {item.batch}
                    </div>
                    <div
                      className="col-span-4 text-center truncate"
                      title={item.rawMaterial}
                    >
                      {' '}
                      {item.rawMaterial}
                    </div>
                    <div className="col-span-2 text-end mr-3">
                      {item.quantity}
                    </div>
                  </div>
                </DynamicBox>
              </div>
              <div className="flex justify-center">
                <button
                  className="text-red-600 font-semibold border border-red-600 rounded-full py-1 px-2 hover:bg-red-600 hover:text-white transition-colors"
                  onClick={() => onRemove(index)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!editable && (
        <div
          className={`h-auto max-h-64 ${extraStyle} ${scrollable ? 'overflow-auto' : 'overflow-hidden'}`}
        >
          {itens.map((item, index) => (
            <div key={index} className="mb-4 border-b pb-2 w-full">
              <DynamicBox extraStyle="w-full p-3">
                {/* Flexbox para organizar os itens dentro do DynamicBox */}
                <div className="flex justify-between items-center text-black font-semibold w-full">
                  {/* Renderizando o valor do item */}
                  <div
                    className="truncate w-1/3 text-center"
                    title={item.batch}
                  >
                    {item.batch}
                  </div>
                  <div className="truncate w-1/3" title={item.rawMaterial}>
                    {item.rawMaterial}
                  </div>
                  <div className="w-1/6 text-right mr-3">{item.quantity}</div>
                </div>
              </DynamicBox>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
