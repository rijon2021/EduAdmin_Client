export class AuthUser {
    userAutoID: number;
    userID: string;
    userTypeID: number;
    organizationID: number;
    designationID: number;
    userFullName: string;
    roleID: number;
    tokenResult: TokenResult;
    permissions : [];
    password : string;
}
export class TokenResult {
    access_token: string;
    expiration: string | null;
    userEmail: string;
    statusCode: number;
    message: string;
}