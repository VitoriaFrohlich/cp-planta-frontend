import Link from 'next/link';
import Image from 'next/image';

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
      <Image src={image} alt="" width={247} height={0} />
      <h3 className="text-base whitespace-nowrap">{description}</h3>
    </Link>
  );
}
