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
export enum NotificationType
{
    All = 0,
    SMS = 1,
    Email = 2,
    Push = 3,
}
export enum NotificationAreaEnum
{
    UserRegistration = 1,
    UserLogin = 2,
}
export enum OrganizationType {
    Govt = 1,
    Private = 2
}
export enum GeoFenceType
{
    None = 0,
    All = 1
}
export enum GlobalSettingEnum {
    Login_Session_Time = 1,
    SMS_Base_Url = 2,
    Google_Map_Key = 3
}