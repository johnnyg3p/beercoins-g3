export interface IAuthContextProps {
    userInfo: ISignInStatus | undefined;
    signOut(): void;
    setUserInfo: React.Dispatch<React.SetStateAction<ISignInStatus | undefined>>
}