import { HttpStatus } from "@nestjs/common";

interface ClientResponse {
  statusCode: HttpStatus;
  message: string;
  error: boolean;
  timestamp: string;
}

export class StandardErrorResponse {
  statusCode: HttpStatus;
  message: string;
  detail: string;
  timestamp: string;
  constructor(statusCode: HttpStatus, message: string, detail: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.detail = detail;
    this.timestamp = new Date().toISOString();
  }
  toClient(): ClientResponse {
    return {
      statusCode: this.statusCode,
      message: this.message,
      error: true,
      timestamp: this.timestamp,
    };
  }
}
