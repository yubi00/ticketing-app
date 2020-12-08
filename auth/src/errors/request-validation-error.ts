import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();
    //because we are extending built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
