import api from "./api";
export const login = async (email:string, password:string) => {
    const res = await api.post('/admin/login', { email, password })
    return res;
}

export const sendResetCode = async (email: string) => {
  const res =  await api.post("/admin/emailVerification", { email });
  return res
}

export const verifyResetCode = async (code: string, adminId: string) =>{
  const res = await api.post("/admin/codeVerification", { code, adminId });
  return res;
}

export const resetAdminPassword = async (
  adminId: string,
  newPass: string,
  verifiedPass: string
) => {
  const res = await api.post("/admin/resetPassword", {
    adminId,
    newPass,
    verifiedPass,
  });
  return res;
}