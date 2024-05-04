export const dataUrlToFile = async (url: string, fileName: string, mimeType: string) => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  return new File([buffer], fileName, { type: mimeType });
};
