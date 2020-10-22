export interface IAuthContextProps {
  userInfo: ISignInStatus;
  signOut(): void;
  setUserInfo: React.Dispatch<React.SetStateAction<ISignInStatus>>;
}
