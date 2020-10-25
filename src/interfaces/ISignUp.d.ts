interface ISignUp {
  cnpj: string;
  email: string;
  nome: string;
  phonenumber: string;
  password: string;
  username: string;
}

interface ISignUpStatus {
  id: number;
  username: string;
  email: string;
  roles: IRoles;
  accessToken: string;
  tokenType: string;
  hash: string;
}

interface ISignUpError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

interface IInputRef {
  value: string;
}

interface ICheckBoxRef {
  value: string[];
}

interface IInputValidationObject {
  cnpj?: string | undefined;
  phonenumber?: string | undefined;
  email?: string | undefined;
  nome?: string | undefined;
  password?: string | undefined;
  username?: string | undefined;
}
