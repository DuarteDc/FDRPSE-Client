import { Button, Progress, Radio, RadioGroup } from "@nextui-org/react"
import { ChevonLeft } from "../../../infraestructure/components/icons"


export const UserQuestion = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1 className="font-semibold text-emerald-600">Para responder las preguntas siguientes considere las condiciones ambientales de sus centro de trabajo</h1>
                <div className="text-left">
                    <div className="my-14">
                        <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
                        <span>
                            <RadioGroup
                                color="primary"
                                orientation="horizontal"
                                isRequired
                            >
                                <Radio value="0">Siempre</Radio>
                                <Radio value="1">Casi Siempre</Radio>
                                <Radio value="2">Algunas veces</Radio>
                                <Radio value="3">Casi nunca</Radio>
                                <Radio value="4">Nunca</Radio>
                            </RadioGroup>
                        </span>
                    </div>
                    <div className="my-14">
                        <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
                        <span>
                            <RadioGroup
                                // color="primary"
                                orientation="horizontal"
                                isRequired
                                className="text-[#01454F]"
                            >
                                <Radio value="buenos-aires">Siempre</Radio>
                                <Radio value="sydney">Casi Siempre</Radio>
                                <Radio value="san-francisco">Algunas veces</Radio>
                                <Radio value="london">Casi nunca</Radio>
                                <Radio value="tokyo">Nunca</Radio>
                            </RadioGroup>
                        </span>
                    </div>
                    <div className="my-14">
                        <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
                        <span>
                            <RadioGroup
                                color="primary"
                                orientation="horizontal"
                                isRequired
                            >
                                <Radio value="buenos-aires">Siempre</Radio>
                                <Radio value="sydney">Casi Siempre</Radio>
                                <Radio value="san-francisco">Algunas veces</Radio>
                                <Radio value="london">Casi nunca</Radio>
                                <Radio value="tokyo">Nunca</Radio>
                            </RadioGroup>
                        </span>
                    </div>
                    <div className="my-14">
                        <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
                        <span>
                            <RadioGroup
                                color="primary"
                                orientation="horizontal"
                                isRequired
                            >
                                <Radio value="buenos-aires">Siempre</Radio>
                                <Radio value="sydney">Casi Siempre</Radio>
                                <Radio value="san-francisco">Algunas veces</Radio>
                                <Radio value="london">Casi nunca</Radio>
                                <Radio value="tokyo">Nunca</Radio>
                            </RadioGroup>
                        </span>
                    </div>
                </div>
            </div>
            <footer className="absolute left-0 bottom-0 w-full backdrop-blur-lg bg-background/70 border-t border-divider">
                <Progress value={80} aria-label="question-pogress" classNames={{ indicator: "bg-gradient-to-r from-primary via-emerald-500 to-emerald-500", }} />
                <div className="flex justify-between py-2 px-96">
                    <Button className="hover:border-slate-800 hover:border-2 border-2 border-transparent" variant="bordered" startContent={
                        <ChevonLeft />
                    }>
                        Regresar
                    </Button>
                    <Button color="primary">
                        Siguiente
                    </Button>
                </div>
            </footer>
        </>
    )
}
