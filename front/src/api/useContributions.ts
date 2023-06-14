import {ResponseData, useApi} from "hooks/useApi";
import {List} from "./useLists";

interface UseContributions {
    id: number;
}

export interface Contribution {
    id: number;
    list: List;
}

export interface UseContributionsData extends ResponseData {
    contributions: Contribution[];
}

export type UseContributionsResponse = [UseContributionsData | null, boolean, Error | null];

export function useLists({id}: UseContributions): UseContributionsResponse {
    const [data, loading, error] = useApi(`/user/${id}/contributions`, {
        method: 'GET'
    });

    return [data, loading, error] as UseContributionsResponse;
}