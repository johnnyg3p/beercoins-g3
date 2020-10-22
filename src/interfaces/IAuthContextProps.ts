export interface IAuthContextProps {
  userInfo: ISignInStatus | null;
  signOut(): void;
  setUserInfo: React.Dispatch<React.SetStateAction<ISignInStatus | null>>;
}
