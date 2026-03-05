import { THEME_STORAGE_KEY } from '@constants/storage';

export default function(){
  const isDark=useDark({
    storageKey:THEME_STORAGE_KEY,
    valueDark:'dark',
    valueLight:'light',
    initialValue:'auto',
    disableTransition:false,
  });
  return isDark;
}
