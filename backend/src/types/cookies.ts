export interface Cookies {
  sameSite: 'None' | 'Strict' | 'Lax' | undefined;
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  httpOnly: boolean;
  secure: boolean;
}

export interface CachedCookies {
  [p: string]: Array<Cookies>;
}
