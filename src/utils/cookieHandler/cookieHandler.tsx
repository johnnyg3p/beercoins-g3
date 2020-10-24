class cookieHandler {
    create(cookieName: string, cookieValue: string, expirationTime?: number) {
        let expiration;
        const seconds = 60;

        if (expirationTime) {
            expiration = expirationTime ? `; max-age=${(expirationTime * seconds)}` : '';
        }
           
        document.cookie = `${cookieName}=${cookieValue}${expiration}`;
    }

    read(cookieName: string) {
        const cookieArr = document.cookie.split('; ');

        for (let i = 0; i <= cookieArr.length; i++) {
            const cookie = cookieArr[i];

            if (cookie && cookie.indexOf(cookieName) === 0) {
                const parsedCookieName = `${cookieName}=`;
                const cookieValue = cookie.replace(parsedCookieName, '');

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