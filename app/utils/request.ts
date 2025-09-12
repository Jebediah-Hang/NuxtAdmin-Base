import type { NitroFetchOptions, NitroFetchRequest } from "nitropack";

interface FetchOptions extends NitroFetchOptions<string> {
  headers?: HeadersInit & Record<string, string>;
  url: NitroFetchRequest;
}

interface ApiError extends Error {
  response?: Response;
}

export async function $request<T = any>(options: FetchOptions): Promise<ApiResponse<T>> {
  if (!options.headers) {
    options.headers = {};
  }

  // const token = sessionStorage.getItem(constantVariable.sessionTokenKey);
  // const token = "aaa";
  // if (token) {
  //   options.headers.Authorization = `Bearer ${token}`;
  // }

  try {
    const response = await $fetch<ApiResponse>(options.url, options);
    return Promise.resolve(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      const statusCode = (<ApiError>error).response?.status;
      if (statusCode) {
        switch (statusCode) {
          case 401:
            console.log('No Auth !!!')
            // ElMessage.error('请求未授权');
            // sessionStorage.removeItem(constantVariable.sessionTokenKey);
            // location.reload();
            break;
          default:
            // ElMessage.error(error.message);
            break;
        }
      } else {
        // ElMessage.error('Service Unavailable');
      }
    } else {
      // ElMessage.error('Unknown Error');
    }

    return Promise.reject(error);
  }
}
