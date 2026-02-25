import api from "./api"
import type { Member } from "../types/types";

export const addMember = async (data:Member) => {
    const res = await api.post('/member/add', data)
    return res;
}

export const updateMember = async (data: Member, id: number) => {
    const res = await api.put(`/member/edit/${id}`, data)
    return res;
}

export const getAllMembers = async () => {
    const res = await api.get("/member/getAll");
    return res;
}

export const getMember = async (id: number) => {
    const res = await api.get(`/member/getOne/${id}`)
    return res;
}

export const verifyQrcode = async (data: {token:string}) => {
    const res = await api.post("/member/verify", data)
    return res;
}