import Cookies from "js-cookie";

const TokenKey = "JWT_TOKEN";

export function getToken(): string {
  const token = Cookies.get(TokenKey);
  if (token === "undefined" || token == undefined) {
    return "";
  }
  return token;
}

export function setToken(token: string): string | undefined {
  return Cookies.set(TokenKey, token, { expires: 30 });
}

export function removeToken(): void {
  return Cookies.remove(TokenKey);
}
