import { http } from "./httpClient";
import {ExtensionData} from "../models/dataExt";

export const fetchExtensions = async (): Promise<Array<ExtensionData>> => {
    return await http.get("/RetrieveExtensionInfo?code=oGi9K5wyWiF58BWs3SEh-wZ4KRt7lSXDj3o_CEo6-Zc0AzFuMlLTDg==");
};
