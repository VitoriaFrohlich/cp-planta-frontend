type Props<T> = {
  items: T[]; // Array de itens do tipo genérico
  renderItem: (item: T) => React.ReactNode; // Função para renderizar cada item
  editable?: boolean;
  onRemove?: (index: number) => void;
  header?: boolean;
  extraStyle?: string;
  scrollable?: boolean;
};

export default function DefaultListItems<T>({
  items,
  renderItem,
  editable = false,
  onRemove,
  header = false,
  extraStyle = '',
  scrollable = false
}: Props<T>) {
  return (
    <div>
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
      {editable && onRemove && (
        <div
          className={`h-auto max-h-28 ${extraStyle} ${scrollable ? 'overflow-auto' : 'overflow-hidden'}`}
        >
          {items?.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-10 gap-4 items-center mb-4 pb-2 w-full"
            >
              <div className="col-span-9">
                <div className="text-black font-semibold w-full grid grid-cols-1">
                  <div
                    className="col-span-3 align-middle"
                    title={String(renderItem(item))}
                  >
                    {' '}
                    {renderItem(item)}
                  </div>
                </div>
              </div>
              <div className="flex justify-center padding-right-2">
                <button
                  className="text-red-600 font-semibold border border-red-600 rounded-full py-0.5 px-1.5 hover:bg-red-600 hover:text-white transition-colors"
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
          {items?.map((item, index) => (
            <div key={index} className="mb-4 border-b pb-2 w-full">
              <div className="flex justify-between items-center text-black font-semibold w-full">
                <div
                  className="truncate w-1/3 text-center"
                  title={String(renderItem(item))}
                >
                  {renderItem(item)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
