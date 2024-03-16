import { Button, Spinner } from "@nextui-org/react";
import { useState } from "react"

export const XD = () => {

    const [cargando, setCargando] = useState(false);

    const enviarFolio = async () => {
        setCargando(true)
        const data = await fetch('/datos', {});
        const resultado = await data.json();
        setCargando(false)
    }

    const enviarFolio = async () => {
        return new Promise((resolve, reject) => {
            setCargando(true);
            const data = fetch('/datos', {})
                .then((data) => data.json());
            resolve(data);
            reject(console.log("Esta mal"));
            setCargando(false)
        })
    }

    return (
        <div>
            <Button isLoading={cargando} spinner={<Spinner />} onClick={enviarFolio}>
                Enviar
            </Button>
        </div>
    )
}
