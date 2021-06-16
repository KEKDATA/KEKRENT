export const getSearchParams = (params: { [key: string]: any }) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach((param) => {
    const [key, value] = param;

    if (value) {
      searchParams.set(key, String(value));
    }
  });

  return searchParams;
};
