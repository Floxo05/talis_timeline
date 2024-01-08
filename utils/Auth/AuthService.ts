class AuthService {
    private static KEY = 'authenticated';
    private static ADMIN = 'admin';

    static setAuthenticated(type: string = 'user'): void {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            window.sessionStorage.setItem(this.KEY, 'true');
            if (type === 'admin') {
                window.sessionStorage.setItem(this.ADMIN, 'true');
            }
        }
    }

    static isAuthenticated(): boolean {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const authStatus = window.sessionStorage.getItem(this.KEY);
            return authStatus === 'true';
        }
        return false;
    }

    static isAdmin(): boolean {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const authStatus = window.sessionStorage.getItem(this.KEY);
            const adminStatus = window.sessionStorage.getItem(this.ADMIN);
            return authStatus === 'true' && adminStatus === 'true';
        }
        return false;
    }
}

export default AuthService;