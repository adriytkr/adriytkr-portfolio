import type { Recommendation } from '~/types/content';

export function isRecommendationElegible(
  recommendation:Recommendation,
  query:string,
  categories:string[],
):boolean{
  const matchesQuery=
    recommendation.title?.toLowerCase().includes(query)|| 
    recommendation.author?.toLowerCase().includes(query)||
    recommendation.description?.toLowerCase().includes(query);

  const matchesCategory=
    categories.length===0||
    categories.some(
      selectedCategory=>recommendation.categories?.includes(selectedCategory)
    );

  return matchesQuery&&matchesCategory;
}
