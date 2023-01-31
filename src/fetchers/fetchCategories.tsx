const categoriesApiUrl = process.env.REACT_APP_CATEGORIES_API_URL;

export const fetchCategories = async (): Promise<string[]> => {
  if (!categoriesApiUrl) throw Error("Categories API Url is undefined");
  console.log(categoriesApiUrl);
  const response = await fetch(categoriesApiUrl);
  const json = await response.json();
  return Object.keys(json);
};
