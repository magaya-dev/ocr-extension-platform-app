import http from '../http-common';
import { ExtensionData, ExtStatusEnum, ExtStatusMapping } from '../models/dataExt';

// to Enums
let statusValues: any[];
let statusMapping: Map<number, string>;

const getAll = async (): Promise<ExtensionData[]> => {
  const payload = await http.get('/RetrieveExtensionInfo').then(res => {
    const status = Object.values(ExtStatusEnum);
    statusValues = status.slice(status.length / 2);
    statusMapping = ExtStatusMapping;
    const dataResult = res.data.map(d => {
      return { ...d, status: statusMapping.get(d.status) };
    });

    const dataResultStatus = dataResult.map(d => {
      return { ...d, gateWay: getGateWayData(d.mgyGateWay, d.mgyGateWayStatus) };
    });
    
    return dataResultStatus;
  });
  return payload;
};

const getGateWayData = (gateway: boolean, gatewayStatus: boolean) => {
  if  (!gateway) {
    return "NO"
  } else if (gatewayStatus) {
    return "YES (ON)"
  } else return "YES (OFF)"
};

export const ExtensionsService = {
  getAll,
};