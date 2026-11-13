// Types for the site's Button (Button.jsx), so TypeScript sections can use it. Reference: ./README.md.
import type { ReactNode, ReactElement, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'fab';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonIcon = 'arrow' | 'arrow-left' | 'close' | 'chevron' | ReactNode;

export interface ButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label?: string;
  children?: ReactNode;
  iconStart?: ButtonIcon;
  iconEnd?: ButtonIcon;
  iconOnly?: boolean;
  onDark?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  fullWidth?: boolean;
  selected?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  ariaLabel?: string;
  labelId?: string;
  [data: `data-${string}`]: string | number | boolean | undefined;
}

export default function Button(props: ButtonProps): ReactElement;
