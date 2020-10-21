interface ISignIn {
  username: string;
  password: string;
}

interface ISignInStatus {
  id: number;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
  tokenType: string;
  hash: string;
}

interface ISignInError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

interface IInputRef {
  value: string;
}
