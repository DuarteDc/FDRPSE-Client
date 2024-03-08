import { Tooltip } from "@nextui-org/react"
import { DotsVertical, FileDescription } from "../../../infraestructure/components/icons"
import { PageLayout } from "../../../infraestructure/components/ui"

export const GuidesPage = () => {
    return (
        <PageLayout title="Cuestionarios" navigateTo="/auth">
            <div className="grid grid-cols-3">
                <article className="isolate rounded-xl bg-white/20 shadow-lg relative p-5 overflow-hidden flex items-center justify-center
                    hover:border-emerald-600 border-2 transition-all duration-400 cursor-pointer
                ">
                    <span className="min-w-[5rem] min-h-[5rem] rounded-full bg-emerald-600 flex justify-center items-center mr-5 text-white">
                        <FileDescription width={40} height={40} />
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-800">CUESTIONARIO PARA IDENTIFICAR A LOS TRABAJADORES QUE FUERON SUJETOS A ACONTECIMIENTOS TRAUMÁTICOS SEVEROS</h3>
                    <span className="[&>svg]:cursor-pointer [&>svg]:hover:text-emerald-600 transition-all duration-400">
                        <Tooltip content="xd">
                            <DotsVertical />
                        </Tooltip>
                    </span>
                </article>
            </div>
        </PageLayout>
    )
}
