export const getAuthorizationTokenHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const isAdmin = (role) => role === "admin";
