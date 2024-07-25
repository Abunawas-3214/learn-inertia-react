export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    },
    message: {
        type: 'success' | 'error';
        body: string;
    },
    can: {
        post_create: boolean
    };
};

export interface Post {
    id: number;
    user_id: number;
    body: string;
    created_at: Date;
    user: User;
}