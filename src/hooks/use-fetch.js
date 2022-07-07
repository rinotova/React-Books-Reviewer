import { useCallback, useState } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchError, setIsFetchError] = useState(null);

  const sendRequest = useCallback(
    async (
      url,
      requestConfig,
      postProcessCallback = (responseJson) => responseJson,
      callBack = () => {}
    ) => {
      try {
        setIsLoading(true);
        const response = await fetch(url, { ...requestConfig });

        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        const responseJson = await response.json();
        postProcessCallback(responseJson);
        callBack();
      } catch (e) {
        setIsFetchError(e.message);
      }
      setIsLoading(false);
    },
    []
  );
  return { isLoading, isFetchError, sendRequest };
};

export default useFetch;
