export default function authHeader() {
  const authToken = localStorage.getItem("authToken");

  if (authToken) {
    return { Authorization: 'Bearer ' + authToken };
  } else {
    return {};
  }
}
