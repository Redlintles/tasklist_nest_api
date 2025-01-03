export class StandardResponse {
  data: any;
  error: boolean;
  message: string;
  timestamp: string;
  constructor(data: any, message: string, error: boolean = false) {
    this.data = data;
    this.message = message;
    this.error = error;
    this.timestamp = new Date().toISOString();
  }
  static create(data: any, message: string, error: boolean = false) {
    const response = new StandardResponse(data, message, error);

    return response;
  }
}
