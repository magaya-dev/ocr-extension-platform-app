export interface ExtensionData {
    networkId: string;
    companyName: string;
    extensionName: string;
    version: string;
    mgyVersion: string;
    latest: boolean;
    status: ExtStatus; // Off-line, Online
    mgyGateWay: boolean;
  }

  export enum ExtStatus {
    OnLine = 0,
    Off_Line = 1,
  }