import { enqueueSnackbar } from 'notistack';


const basicConfig: any = { anchorOrigin: { vertical: "top", horizontal: "center" },   preventDuplicate: true }


export const succesAlert = (message: string) => enqueueSnackbar(message, { variant: "success", ...basicConfig });
export const errorAlert = (message = 'Parece que hubo un error - Intenta más tarde') => enqueueSnackbar(message, { variant: "error", ...basicConfig });
export const warningAlert = (message = 'Parece que hubo un error - Intenta más tarde') => enqueueSnackbar(message, { variant: "warning", ...basicConfig });