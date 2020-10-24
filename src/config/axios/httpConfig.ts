export default class HttpConfig {
    private token: string;
    private userInfo: any;


    constructor() {        
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo") || '');
        this.token = this.userInfo.accessToken;
    }

    getToken(): string {
        return this.token;
    }

    getUserInfo(): string {
        return this.token;
    }

}