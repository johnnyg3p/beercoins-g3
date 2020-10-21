export interface IAuthContextProps {
    signIn(login: ISignIn): Promise<void>;
    signUp(signUp: ISignUp): Promise<void>;
    signOut(): void;
    userInfo: ISignInStatus | undefined
}