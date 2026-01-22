/**
 * Authentication utilities for the frontend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface User {
    id: string;
    username: string;
    email: string | null;
    avatar_url: string | null;
    github_url: string;
}

/**
 * Get the stored auth token
 */
export function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('marathon_token');
}

/**
 * Store the auth token
 */
export function setToken(token: string): void {
    localStorage.setItem('marathon_token', token);
}

/**
 * Remove the auth token
 */
export function removeToken(): void {
    localStorage.removeItem('marathon_token');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    return !!getToken();
}

/**
 * Redirect to GitHub OAuth login
 */
export function login(): void {
    window.location.href = `${API_URL}/auth/login`;
}

/**
 * Logout the user
 */
export async function logout(): Promise<void> {
    try {
        await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        });
    } catch (error) {
        console.error('Logout error:', error);
    }
    removeToken();
    window.location.href = '/';
}

/**
 * Get the current user profile
 */
export async function getCurrentUser(): Promise<User | null> {
    const token = getToken();
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                removeToken();
            }
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Get user error:', error);
        return null;
    }
}
