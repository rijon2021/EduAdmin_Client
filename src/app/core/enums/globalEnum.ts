export enum Action {
    Insert = 1,
    Update,
    View,
    Delete,
}
export enum ReturnStatus {
    Success = 1,
    Failed = -1,
    Duplicate = 2,
    PendingOTPAuthentication = 3,
}
export enum PermissionType
{
    Menu = 1,
    Button = 2,
    Role = 3,
}