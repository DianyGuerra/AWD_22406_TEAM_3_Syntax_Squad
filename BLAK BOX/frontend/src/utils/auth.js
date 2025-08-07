export function decodeJwt(token) {
  try {
    const payload = token.split('.')[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    console.log('Decoded JWT payload:', json); // para depurar
    return JSON.parse(json);
  } catch {
    return null;
  }
}
