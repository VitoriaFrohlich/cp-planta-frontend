type Props = {
  title?: string;
  children: React.ReactNode;
  extraStyle?: string;
};

export default function DynamicBox({ title, children, extraStyle }: Props) {
  // If we use only spaces, the title will be render with the same height as if it had content
  const formattedTitle = title?.trim() ? title : '\u00A0'

  return (
    <div className="flex flex-col gap-6">
      {title && <h2 className="text-black text-2xl font-bold">{formattedTitle}</h2>}
      <div
        className={`w-auto max-w-[563px] h-auto border-2 rounded-lg border-greenHortti p-5 ${extraStyle}`}
      >
        {children}
      </div>
    </div>
  );
}
