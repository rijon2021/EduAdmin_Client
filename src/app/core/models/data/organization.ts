import { OrganizationType } from "../../enums/globalEnum";

export class Organization {
    organizationID: number;
    organizationName: string;
    organizationType: OrganizationType;
    organizationTypeStr:string;
    shortName: string;
    address: string;
    logoURL: string;
    publicURL: string;
    privateURL: string;
    contactPersonID: number | null;
    mobileNo: string;
    email: string;
    latitude: string;
    longitude: string;
}