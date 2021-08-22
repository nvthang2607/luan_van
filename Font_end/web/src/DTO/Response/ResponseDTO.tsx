export interface ResponseDTO<T> {
    errorCode?: number,
    data: T
}