export class StandardResponse {
  constructor(data: any, message: string, error: boolean = false) {
    this.data = data;
    this.message = message;
    this.error = error;
    this.timestamp = new Date().toISOString();
  }
  data: any;
  error: boolean;
  message: string;
  timestamp: string;
}
