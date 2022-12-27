import { MenuProps } from 'antd';

export interface Response extends Record<string, any | unknown> {
}

export interface Error extends Response {}

export type CheckResponseFn = (value: Response) => any;

export type MenuItem = Required<MenuProps>['items'][number];

export type Column = Record<string, any>;

export interface Student {
    id: number;
    name: string;
    email: string;
    gender: Gender;
}

enum Gender {
    MALE = 'male',
    FEMALE = 'FEMALE',
    OTHER = 'other'
}

export function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }