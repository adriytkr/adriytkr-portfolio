import { ProjectService } from '~/services/ProjectService';
import type { CustomLocale } from '~~/i18n/config/types';

export async function useProjects(locale:Ref<CustomLocale>){
  const {data}=await useAsyncData(
    `projects-${locale}`,
    async()=>await ProjectService.getAllProjects(locale.value),
    {watch:[locale]},
  );

  return{
    data,
  };
}
