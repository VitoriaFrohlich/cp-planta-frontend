import Image from 'next/image';
import { Button } from '@headlessui/react';

interface OnClickButtonProps {
  title: string;
  image: string;
  onClick: () => void;
  className: string;
  disable?: boolean;
}

const OnClickButton: React.FC<OnClickButtonProps> = ({
  title,
  image,
  onClick,
  className,
  disable
}) => {
  return (
    <div className={className}>
      <Button
        onClick={onClick}
        className="flex items-center justify-center gap-2 w-full"
        disabled={disable === undefined ? false : disable}
      >
        <Image
          className="w-6 h-6 "
          width={24}
          height={24}
          src={image}
          alt={title}
        />
        <span className="text-white">{title}</span>
      </Button>
    </div>
  );
};

export default OnClickButton;
