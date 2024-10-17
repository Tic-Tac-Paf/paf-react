export interface RestError {
  success: false;
  message: string;
}

export type RestResult<T = unknown> = { success: true } & T;

export type RestResponse<T = unknown> = RestError | RestResult<T>;
