import Link from 'next/link';

type Props = {
  description: string;
  image: string;
  href: string;
};

export default function ButtonStock({ description, image, href }: Props) {
  return (
    <Link
      href={href}
      className="border-[#F56932] border-2 rounded-lg w-[240px] h-auto flex flex-col items-start p-4 gap-y-3"
    >
      <img className="w-[247px]" src={image} alt="" />
      <h3 className="text-base whitespace-nowrap">{description}</h3>
    </Link>
  );
}
