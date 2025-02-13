import { GlobalSetting } from "./settings/globalSetting";

export class AuthUser {
    userAutoID: number;
    userId: string;
    studentId: string;
    batchId: string;
    classId: string;
    groupId: string;
    userName: string;
    userTypeID: number;
    organizationID: number;
    designationID: number;
    studentName: string;
    image: string;
    userRoleID: number;
    accessToken: string;
    // tokenResult: TokenResult;
    permissions: [];
    globalSettings: GlobalSetting[];
    password: string;
}
export class TokenResult {
    // access_token: string;
    // accessToken: string;
    
    // expiration: string | null;
    // userEmail: string;
    // statusCode: number;
    // message: string;
}