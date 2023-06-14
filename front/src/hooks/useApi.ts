import {List} from "api/useLists";
import {useEffect, useMemo, useState} from "react";


// export interface UseApiReturnInterface {
//   data: ResponseData[] | null;
//   loading: boolean;
//   error: Error | null;
// };

export type ResponseData = List[];

export type UseApiReturn = [ResponseData | null, boolean, Error | null];

let useEffectEnvoke = false;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function useApi(url: string,options?: RequestInit): UseApiReturn {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<ResponseData | null>(null);
    const defaultFetchOptions: RequestInit = useMemo(() => ({
        credentials: 'include',
    }), []);
    const handleError = (error: unknown) => {
        if(error instanceof Error) {
            if(error?.name === "AbortError") {
                // Aborted
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

                const data = (await response.json()).lists as ResponseData;

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
