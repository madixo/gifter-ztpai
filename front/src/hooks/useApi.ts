import {useEffect, useMemo, useState} from "react";


// export interface UseApiReturnInterface {
//   data: ResponseData[] | null;
//   loading: boolean;
//   error: Error | null;
// };

export interface ResponseData {
  status: 'ok' | string;
}


export type UseApiReturn = [ResponseData | null, boolean, Error | null];

let useEffectEnvoke = false;

// TODO: FIX THAT - import var from .env file
const API_BASE_URL = /* process.env.API_BASE_URL */ "http://localhost:3001/api";

export const useApi = (
  url: string,
  options?: RequestInit,
): UseApiReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<ResponseData | null>(null);
  const defaultFetchOptions: RequestInit = useMemo(() => ({
    credentials: 'include',
  }), []);
  const handleError = (error: unknown) => {
    if(error instanceof Error) {
      if(error?.name === "AbortError") {
        // Aboreted
      }
      setError(error);
    }
  };

  useEffect(() => {
    if(useEffectEnvoke) {
      return () => {};
    }

    // Do nothing if the url is not given
    if(!url) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
          ...defaultFetchOptions,
          ...options,
        });

        if(!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as ResponseData;

        setLoading(false);
        setData(data);
      } catch(error) {
        setLoading(false);
        handleError(error);
      }
    };

    void fetchData();

    useEffectEnvoke = true;
  }, [defaultFetchOptions, options, url]);

  return [data, loading, error];
};
