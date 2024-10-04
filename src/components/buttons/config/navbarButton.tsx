/* eslint-disable prettier/prettier */

import Link from 'next/link';

interface navbarButtonProps {
  href: string;
  title: string;
  selected?: boolean;
}

const navbarButtonComponent: React.FC<navbarButtonProps> = ({
  href,
  title,
  selected
}) => {
  return (
    <div className="m-4 ml-6">
      <Link
        className={`border-b text-xl hover:text-greenHortti hover:border-greenHortti ${selected ? 'text-greenHortti border-greenHortti border-b-2' : 'text-black border-black'}`}
        href={href}
      >
        {title}
      </Link>
    </div>
  );
};

export default navbarButtonComponent;
