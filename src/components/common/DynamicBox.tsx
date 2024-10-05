type Props = {
  title: string;
  children: React.ReactNode;
};

export default function DynamicBox({ title, children }: Props) {
  return (
    <>
      <h2 className="text-[#1c4060] text-2xl font-bold">{title}</h2>
      <div className="w-auto max-w-[563px] h-auto border-2 rounded-lg border-[#006F48] p-5">
        {children}
      </div>
    </>
  );
}
