export default function authHeader() {
  const authToken = sessionStorage.getItem("authToken");

  if (authToken) {
    return { Authorization: 'Bearer ' + authToken };
  } else {
    return {};
  }
}
