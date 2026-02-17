export interface SignUp {
  name: string;
  email: string;
  password: string;
  referralCode?: string;
  terms?: boolean;
  role: "CUSTOMER" | "ORGANIZER";
}

export interface SignIn {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  isAuthenticated: boolean;

  signUp: (data: SignUp) => Promise<boolean>;
  signIn: (data: SignIn) => Promise<boolean>;
  me: () => Promise<AuthUser | null>;
  signOut: () => Promise<boolean>;
}
