export interface Member {
    _id:number | 0,
    firstName:string,
    familyName:string,
    email:string,
    phoneNumber:string,
    apogee:string,
    createdAt:string | undefined
};

export interface MessageType {
    type: string,
    message: string
}