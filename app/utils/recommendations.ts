import type { Recommendation } from '~/types/content';
import type { RecommendationStatusFilter } from '~/types/recommendations';

export function isRecommendationElegible(
  recommendation:Recommendation,
  query:string,
  categories:string[],
  status:RecommendationStatusFilter,
):boolean{
  const matchesQuery=
    recommendation.title?.toLowerCase().includes(query)|| 
    recommendation.author?.toLowerCase().includes(query)||
    recommendation.description?.toLowerCase().includes(query)||
    recommendation.longDescription?.toLowerCase().includes(query);

  const matchesCategory=
    categories.length===0||
    categories.some(
      selectedCategory=>recommendation.categories?.includes(selectedCategory)
    );

  const matchesStatus=status==='all'||recommendation.status===status;

  return matchesQuery&&matchesCategory&&matchesStatus;
}
