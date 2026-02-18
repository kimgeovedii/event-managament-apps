export interface RegisterRequest {
  name: string;
  email: string;
  referralCode?: string;
  password: string;
  role?: string;
  organizerName?: string;
  organizerDescription?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  referralCode?: string;
}
