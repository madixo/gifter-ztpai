import {UseApiReturn, useApi} from "hooks/useApi";

interface UseLists {
    id: number;
}

export interface List {
    id: number;
    name: string;
    accessCode: string;
}

export type UseListsResponse = UseApiReturn;

export function useLists({id}: UseLists): UseListsResponse {
    const [data, loading, error] = useApi(`/user/${id}/lists`, {
        method: 'GET'
    });

    return [data, loading, error] as UseApiReturn;
}