export default function useToken<T>(token: string) {

    return JSON.parse(atob(token.split('.')[1])) as T;

}