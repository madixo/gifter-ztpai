export const routes = {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    CODE: '/code',
    DASHBOARD: '/dashboard',
    SETTINGS: '/settings',
    USER_PROFILE: '/user',
    LIST_EDIT: '/list/:id/edit',
    LIST_VIEW: '/list/:id',
    PASSWORD_RESET: '/password-reset',
    WILDCARD: '*'
} satisfies Record<string, string>;