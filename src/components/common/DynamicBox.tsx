type Props = {
  title?: string;
  children: React.ReactNode;
  extraStyle?: string;
};

export default function DynamicBox({ title, children, extraStyle }: Props) {
  return (
    <div>
      {title && <h2 className="text-blacks text-2xl font-bold">{title}</h2>}
      <div
        className={`w-auto max-w-[563px] h-auto border-2 rounded-lg border-greenHortti p-5 ${extraStyle}`}
      >
        {children}
      </div>
    </div>
  );
}
