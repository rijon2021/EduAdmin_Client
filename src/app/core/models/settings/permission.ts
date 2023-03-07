import { PermissionType } from "../../enums/globalEnum";

export class Permission {
    permissionID: number;
    permissionName: string;
    displayName: string;
    menuGroupID: number;
    parentPermissionID: number | null;
    isActive: boolean;
    iconName: string;
    routePath: string;
    permissionType: PermissionType;
    permissionTypeStr : string
    orderNo: number;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
    isCollapsed: boolean;
    childList: Permission[];
}