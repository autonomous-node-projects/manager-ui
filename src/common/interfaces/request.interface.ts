const methodsDict = {
  POST: 'POST',
  GET: 'GET',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
}

export type MethodsType = keyof typeof methodsDict

export const MethodsArray = Object.keys(methodsDict) as MethodsType[]

export interface DataObject {
  [key: string]: any;
}

export type Request = {
  _id: number;
  endpoint: string;
  method: MethodsType;
  headers?: DataObject;
  data?: DataObject;
  }
