import Link from 'next/link';

interface NavbarButtonProps {
  href: string;
  title: string;
  selected?: boolean;
  onClick?: () => void;
}

const NavbarButtonComponent: React.FC<NavbarButtonProps> = ({
  href,
  title,
  selected,
  onClick,
}) => {

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault(); 
      onClick(); 
    }
  };

  return (
    <div>
      <Link
        className={`text-xl hover:text-greenHortti hover:border-greenHortti w-full h-auto font-semibold ${selected ? 'text-greenHortti border-greenHortti border-b-2' : 'text-black'}`}
        href={href}
        onClick={handleClick}
      >
        {title}
      </Link>
    </div>
  );
};

export default NavbarButtonComponent;
