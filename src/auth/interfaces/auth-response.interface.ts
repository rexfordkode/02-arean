export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    roles: string[];
    profile?: {
      firstName?: string;
      lastName?: string;
      [key: string]: any;
    };
  };
}
