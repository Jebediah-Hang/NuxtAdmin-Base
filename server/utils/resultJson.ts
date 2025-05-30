export class ResultJson {

  static success(data: any, msg: string = 'Success'): ApiResponse {
    return {
      code: 200,
      data,
      msg
    };
  };

  static failed(code: number, msg: string = 'Failed'): ApiResponse {
    return {
      data: null,
      code,
      msg
    };
  };
}
