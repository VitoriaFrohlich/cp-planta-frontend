import Link from 'next/link';
import AddIcon from '../../icons/add-icon.svg';

type Props = {
  title: string;
  description: string;
  href: string;
};

export default function ButtonOperation({ title, description, href }: Props) {
  return (
    <Link
      href={href}
      className="border-[#006F48] border-2 rounded-lg w-full h-auto flex items-start p-6 gap-x-4"
    >
      <img className="w-6" src={AddIcon.src} alt="Add Icon" />
      <div className="flex flex-col text-start gap-y-1">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-[#757575] text-sm">{description}</p>
      </div>
    </Link>
  );
}
