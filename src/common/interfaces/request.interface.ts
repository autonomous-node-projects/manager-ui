const methodsDict = {
  POST: 'POST',
  GET: 'GET',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
}

export type MethodsType = keyof typeof methodsDict

type HTTPMethods = MethodsType;

export type RequestConfig = {
  endpoint: string,
  method: HTTPMethods,
  headers?: object,
  data?: object,
  timeout?: number,
  debug?: boolean
}

export interface DataObject {
  [key: string]: any;
}

export type Request = {
  endpoint: string;
  method: MethodsType;
  headers?: DataObject;
  data?: DataObject;
  }
