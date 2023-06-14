import {ResponseData, useApi} from "hooks/useApi";

interface UseGifts {
    id: string | undefined;
}

export interface Gift {
    description: string | null;
    id: string;
    image: string;
    name: string;
    price: string | null;
    taken: boolean;
}

export interface UseGiftsData extends ResponseData {
    gifts: Gift[];
}

export type UseGiftsResponse = [UseGiftsData | null, boolean, Error | null];

export function useGifts({id}: UseGifts): UseGiftsResponse {
    const [data, loading, error] = useApi(`/list/${id}`, {
        method: 'GET'
    });

    return [data, loading, error] as UseGiftsResponse;
}