export enum StatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum StatusMessage {
  OK = 'Ok',
  BAD_REQUEST = 'Bad Request',
  NOT_FOUND = 'Not Found',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
}

export class StatusCodesMapper {
  private static readonly statusMessageMap: Record<StatusCode, StatusMessage> = {
    [StatusCode.OK]: StatusMessage.OK,
    [StatusCode.BAD_REQUEST]: StatusMessage.BAD_REQUEST,
    [StatusCode.NOT_FOUND]: StatusMessage.NOT_FOUND,
    [StatusCode.INTERNAL_SERVER_ERROR]: StatusMessage.INTERNAL_SERVER_ERROR,
  };

  static getStatusMessage(statusCode: StatusCode): StatusMessage {
    return this.statusMessageMap[statusCode];
  }
}
