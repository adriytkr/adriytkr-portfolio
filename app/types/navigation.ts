import type { CustomLocale } from '~/types/i18n';

export type NavLink={
  label:string;
  to:string;
}

export type LocaleItem={
  code:CustomLocale;
  name:string;
};
