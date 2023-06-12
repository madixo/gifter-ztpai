import {ResponseData, useApi} from "hooks/useApi";

interface UseListProps {
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

export interface UseListData extends ResponseData {
  gifts: Gift[];
}

export type UseListResponse = [UseListData | null, boolean, Error | null];

export const useList = ({id}: UseListProps) => {
  const [data, loading, error] = useApi(`/list/${id}`, {
    method: 'GET',
  });

  return [data, loading, error] as UseListResponse;
};
