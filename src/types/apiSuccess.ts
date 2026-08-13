
export interface ISuccessResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
export interface IApiSuccess<T> {
    statusCode: number,
    data: ISuccessResponse<T>
}