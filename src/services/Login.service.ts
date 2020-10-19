
import ILogin from './Interfaces/ILogin';
import ILoginStatus from './Interfaces/ILoginStatus';



export default class Animals {

    fakeLogin: ILogin = {
        user: "johnny",
        password: "12345"
    };



    login(login: ILogin): Promise<ILoginStatus> {
        return new Promise(resolve => {
            setTimeout(() => resolve(
                {
                    accessToken: '1212121',
                    status: '200'
                }), 1000);
        });
    }

}