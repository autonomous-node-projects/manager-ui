import Cookies from 'universal-cookie'
import { MethodsType, DataObject } from '../interfaces/request.interface'

const API_ENDPOINT = 'http://localhost:3000/'

const getBearerToken = async () => {
  try {
    const cookies = new Cookies()
    const sessionToken = cookies.get('authToken')
    if (sessionToken !== null && sessionToken !== undefined) {
      return { Authorization: 'Bearer ' + sessionToken }
    } else {
      return {}
    }
  } catch (error) {
    return {}
  }
}

interface HTTPFunctions {
  endpoint: string;
  data?: DataObject | undefined;
  contentType?: 'application/json';
}

type HTTPMethods = MethodsType;

export interface HTTPResponse {
  data: DataObject;
  status: number;
}

const parseData = async (response: any, headers: DataObject) => {
  const responseBlob = response.clone()
  const responseText = await response.text()
  try {
    const data = JSON.parse(responseText)
    return data
  } catch (error) {
    console.warn('Cant parse response body to json')
    if (headers['content-type'] === 'image/png') {
      const blob = await responseBlob.blob()
      const data = URL.createObjectURL(blob)
      return data
    } else {
      return responseText
    }
  }
}

const fetchMethod = (endpoint: HTTPFunctions['endpoint'], fetchConfig: DataObject, timeout = 5000) => {
  const controller = new AbortController()
  const signal = controller.signal
  fetchConfig.signal = signal
  setTimeout(() => {
    controller.abort()
  }, timeout)
  const result = fetch(endpoint, fetchConfig)
    .then((response) => {
      console.log(response)
      if (response.ok) {
        return response
      } else {
        return response
      }
    })
    .then(async (response) => {
      const responseJson: DataObject = {}
      responseJson.status = response.status
      responseJson.statusText = response.statusText
      responseJson.headers = Object.fromEntries(response.headers.entries())
      if (response.body !== null && response.body !== undefined) {
        responseJson.data = await parseData(response, responseJson.headers)
      }
      return responseJson
    }
    )
    .catch((err) => {
      console.error('error on fetch - ', err)
      const res = {
        status: 503,
        statusText: 'Service Unavailable'
      }
      return res
    })
  return result
}

const SendHTTPrequest = async (
  endpoint: HTTPFunctions['endpoint'],
  method: HTTPMethods,
  contentType: HTTPFunctions['contentType'] = 'application/json',
  data: HTTPFunctions['data'] = undefined,
  // Predefined data
  predefinedHeaders?: DataObject,
  predefinedUrl?: string,
  timeout?: number) => {
  let url
  if (predefinedUrl) {
    url = predefinedUrl
  } else {
    url = API_ENDPOINT + endpoint
  }

  let allHeaders: AnyObject
  if (predefinedHeaders) {
    allHeaders = predefinedHeaders
  } else {
    allHeaders = await getBearerToken()
    allHeaders['Content-Type'] = contentType
  }

  const fetchConfig: any = {}
  fetchConfig.headers = allHeaders
  fetchConfig.method = method
  if (method !== 'GET' && data !== undefined) {
    fetchConfig.body = JSON.stringify(data)
  }

  try {
    const result = await fetchMethod(url, fetchConfig, timeout)
    return result
  } catch (error) {
    return error
  }
}

export default SendHTTPrequest
