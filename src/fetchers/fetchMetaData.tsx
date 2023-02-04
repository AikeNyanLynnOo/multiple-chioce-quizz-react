const metaDataApiUrl = process.env.REACT_APP_META_DATA_API_URL;

export const fetchMetaData = async (): Promise<Object> => {
  if (!metaDataApiUrl) throw Error("Meta Data API Url is undefined");
  // console.log(metaDataApiUrl);
  const response = await fetch(metaDataApiUrl);
  const json = await response.json();
  return json;
};
