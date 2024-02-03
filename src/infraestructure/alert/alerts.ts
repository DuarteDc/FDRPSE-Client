import { enqueueSnackbar } from 'notistack';


const basicConfig: any = { anchorOrigin: { vertical: "top", horizontal: "right" } }


export const succesAlert = (message: string) => enqueueSnackbar(message, { variant: "success", ...basicConfig });
export const errorAlert = (message: string) => enqueueSnackbar(message, { variant: "error", ...basicConfig });