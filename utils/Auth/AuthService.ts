class AuthService {
    private static KEY = 'authenticated';

    static setAuthenticated(): void {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            window.sessionStorage.setItem(this.KEY, 'true');
        }
    }

    static isAuthenticated(): boolean {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const authStatus = window.sessionStorage.getItem(this.KEY);
            return authStatus === 'true';
        }
        return false;
    }
}

export default AuthService;