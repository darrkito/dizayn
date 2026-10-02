/** The root layout appends " | Dizayn" to every page title. When that pushes the title past ~60
 * characters (where SERPs truncate it), drop the brand suffix instead of the page's own words. */
export const fitTitle = (title: string): string | { absolute: string } =>
  `${title} | Dizayn`.length > 60 ? { absolute: title } : title;
