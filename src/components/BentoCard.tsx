import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
interface BentoCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  linkTo?: string;
  variant?: 'red' | 'purple' | 'dark' | 'gold' | 'white';
  className?: string;
  children?: React.ReactNode;
}
const BentoCard = ({
  title,
  description,
  icon,
  imageSrc,
  linkTo,
  variant = 'white',
  className,
  children
}: BentoCardProps) => {
  const cardContent = <div className={cn('bento-card h-full flex flex-col', variant === 'red' && 'bg-primary text-white', variant === 'purple' && 'bg-tertiary text-white', variant === 'dark' && 'bg-darkblue text-white', variant === 'gold' && 'bg-gradient-to-br from-secondary to-amber-600 text-black', variant === 'white' && 'bg-white border shadow-sm', className)}>
      {imageSrc && <div className="relative overflow-hidden rounded-t-xl -mx-6 -mt-6 mb-4 h-40">
          <img src={imageSrc} alt={title} className="w-full h-full transition-transform duration-500 hover:scale-105 object-cover" />
        </div>}

      <div className="flex-1">
        {icon && <div className="mb-4 text-2xl">{icon}</div>}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {description && <p className="mb-4">{description}</p>}
        {children}
      </div>
    </div>;
  if (linkTo) {
    return <Link to={linkTo} className="block h-full">{cardContent}</Link>;
  }
  return cardContent;
};
export default BentoCard;