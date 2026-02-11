import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export function Container({
  className,
  children,
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={twMerge(
        clsx(
          'mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8',
          className
        )
      )}
    >
      {children}
    </Component>
  );
}

export default Container;
