class AppError extends Error {
  public name: string;
  public status: string;
  public statusCode: number;
  constructor(public message: string, status : string , statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.statusCode = statusCode
  }
  static notFound(message: string) {
    return new AppError(message, "fail", 404);
  }
}

export default AppError