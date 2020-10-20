interface ILoginStatus {
  id: number;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
  tokenType: string;
}

interface ILoginError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
