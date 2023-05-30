import { GlobalSetting } from "./settings/globalSetting";

export class AuthUser {
    userAutoID: number;
    userId: string;
    userName: string;
    userTypeID: number;
    organizationID: number;
    designationID: number;
    studentName: string;
    userRoleID: number;
    tokenResult: TokenResult;
    permissions: [];
    globalSettings: GlobalSetting[];
    password: string;
}
export class TokenResult {
    access_token: string;
    // expiration: string | null;
    // userEmail: string;
    // statusCode: number;
    // message: string;
}