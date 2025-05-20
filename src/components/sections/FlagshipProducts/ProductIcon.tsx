import { Route, FileText, Receipt, Bot, MessageSquare } from 'lucide-react';

interface ProductIconProps {
  name: 'route' | 'file-text' | 'receipt' | 'bot' | 'message-square';
  className?: string;
}

export const ProductIcon: React.FC<ProductIconProps> = ({ name, className }) => {
  const icons = {
    'route': Route,
    'file-text': FileText,
    'receipt': Receipt,
    'bot': Bot,
    'message-square': MessageSquare
  };

  const IconComponent = icons[name];
  return <IconComponent className={className} />;
};