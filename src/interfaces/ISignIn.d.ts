interface ISignIn {
  username: string;
  password: string;
}

type roles = "ROLE_MODERATOR" | "ROLE_USER";

interface ISignInStatus {
  id: number | null;
  username: string;
  email: string;
  roles: roles[];
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
