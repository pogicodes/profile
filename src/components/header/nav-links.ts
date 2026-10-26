import type {AnchorHTMLAttributes} from 'react';

export const navigationLinks: NavLink[] = [
  {url: '/resume', label: 'resume'},
  {url: '/about', label: 'about'},
  {url: '/blog', label: 'blog'},
  {url: 'https://note.carlogino.com', label: 'Notes'},
];

type NavLink = {
  label: string;
  url: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
};
