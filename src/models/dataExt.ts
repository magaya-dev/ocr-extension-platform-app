export interface ExtensionData {
    networkId: string;
    companyName: string;
    extensionName: string;
    version: string;
    mgyVersion: string;
    latest: boolean;
    status: number; // Off-line, Online
    mgyGateWay: boolean;
  }

  export enum ExtStatusEnum {
    Online = 0,
    Off_Line =  1,
  }

  export const ExtStatusMapping = new Map<number, string>([
      [ExtStatusEnum.Online, 'Online'],
      [ExtStatusEnum.Off_Line, 'Off - Line'],
  ]);