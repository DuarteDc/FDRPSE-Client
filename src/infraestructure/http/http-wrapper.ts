enum PromiseStatusResponse {
    Pending = 'pending', 
    Succes  = 'success',
    Error   = 'error'
}

export function wrapPomise<T>(promise: Promise<T>) {
    let status = PromiseStatusResponse.Pending;
    let response: T;

    const suspender = promise.then(
        (res: T) => {
        status = PromiseStatusResponse.Succes;
        response = res;
        },
        (error: any) => {
            status = PromiseStatusResponse.Error;
            response = error;
        }
    )

    const read = () => {
        switch (status) {
            case PromiseStatusResponse.Pending:
                throw suspender
            case PromiseStatusResponse.Error:
                throw response
            default:
                return response
        }
    }

    return { read }

}