import type { NitroFetchRequest } from 'nitropack';

export class DatabaseTable {

  static tbDictionary = 'tb_dictionary';

  static tbUser = 'tb_user';

}

const authApis: Array<NitroFetchRequest> = [
];

export const authApiSets: Set<NitroFetchRequest> = new Set(authApis);
