export interface ServerResponse {
    status: 'ok' | 'error';
    message: string;
}

export interface LoginResponse extends ServerResponse {
    token: string;
}

export interface List {

}

export interface ListResponse extends ServerResponse {
    lists: List[];
}

export type RegisterResponse = ServerResponse;