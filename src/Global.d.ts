declare module '*.module.css';
declare module '*.module.scss';
declare module '*.svg' {
  import { FC, SVGProps } from 'react';

  const content: FC<SVGProps<SVGElement>>;
  export default content;
}
