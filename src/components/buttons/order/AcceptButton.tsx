import Link from 'next/link';
import Image from 'next/image';

interface AcceptButtonProps {
  title: string;
  image: string;
  href: string;
}

const acceptButton: React.FC<AcceptButtonProps> = ({ title, image, href }) => {
  return (
    <div className="w-full bg-greenHortti text-white py-2 px-4 rounded-lg hover:bg-green-700">
      <Link className="flex p-1 gap-1 justify-center" href={href}>
        <Image className="w-6" width={30} height={0} src={image} alt="Cancel" />
        <div className="flex flex-col text-black text-start gap-y-1">
          <h3 className="text-white">{title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default acceptButton;
