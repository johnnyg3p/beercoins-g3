class cookieHandler {
    create(cookieName: string, cookieValue: string, expirationTime?: number) {
        let expiration;
        const date = new Date();
        const miliSeconds = 1000;
        const seconds = 60;

        if (expirationTime) {
            date.setTime(date.getTime() + (expirationTime * seconds * miliSeconds));

            expiration = expirationTime ? `; expires=${date.toUTCString()}` : '';
        }
           
        document.cookie = `${cookieName}=${cookieValue}${expiration}`;
    }

    read(cookieName: string) {
        const cookieArr = document.cookie.split('; ');

        for (let i = 0; i <= cookieArr.length; i++) {
            const cookie = cookieArr[i];

            if (cookie && cookie.indexOf(cookieName) === 0) {
                const cookieValue = cookie.replace(`userInfo=`, '');

                return cookieValue
            }
        }

        return null
    }

    remove(cookieName: string) {
        document.cookie = `${cookieName}=; Max-Age=-999`;
    }
}

export default new cookieHandler();