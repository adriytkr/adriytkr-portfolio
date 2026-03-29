export const normalizeSlug=(slug:string|string[]|undefined):string=>
  slug===undefined
    ?''
    :Array.isArray(slug)
      ?slug[0]??''
      :slug;
