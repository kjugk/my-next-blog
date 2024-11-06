export type ServerFunctionResponse<T> =
  | {
      status: "success";
      message: string;
      data: T;
    }
  | {
      status: "error";
      message: string;
    };
