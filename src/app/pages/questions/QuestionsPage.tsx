import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { QuestionControls } from "../../../infraestructure/components/questions";


export const QuestionsPage = () => {
    return (
        <QuestionControls>
            <div className="flex flex-col items-center justify-center">
                <h1 className="font-semibold text-emerald-600">Para responder las preguntas siguientes considere las condiciones ambientales de sus centro de trabajo</h1>
                <div className="text-left">
                    <div className="my-14">
                        <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
                        <span>
                            <CheckboxGroup
                                color="primary"
                                orientation="horizontal"
                                isRequired
                            >
                                <Checkbox value="0">Siempre</Checkbox>
                                <Checkbox value="1">Casi Siempre</Checkbox>
                                <Checkbox value="2">Algunas veces</Checkbox>
                                <Checkbox value="3">Casi nunca</Checkbox>
                                <Checkbox value="4">Nunca</Checkbox>
                            </CheckboxGroup>
                        </span>
                    </div>
                    <div className="my-14">
                        <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
                        <span>
                            <CheckboxGroup
                                // color="primary"
                                orientation="horizontal"
                                isRequired
                                className="text-[#01454F]"
                            >
                                <Checkbox value="buenos-aires">Siempre</Checkbox>
                                <Checkbox value="sydney">Casi Siempre</Checkbox>
                                <Checkbox value="san-francisco">Algunas veces</Checkbox>
                                <Checkbox value="london">Casi nunca</Checkbox>
                                <Checkbox value="tokyo">Nunca</Checkbox>
                            </CheckboxGroup>
                        </span>
                    </div>
                    <div className="my-14">
                        <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
                        <span>
                            <CheckboxGroup
                                color="primary"
                                orientation="horizontal"
                                isRequired
                            >
                                <Checkbox value="buenos-aires">Siempre</Checkbox>
                                <Checkbox value="sydney">Casi Siempre</Checkbox>
                                <Checkbox value="san-francisco">Algunas veces</Checkbox>
                                <Checkbox value="london">Casi nunca</Checkbox>
                                <Checkbox value="tokyo">Nunca</Checkbox>
                            </CheckboxGroup>
                        </span>
                    </div>
                    <div className="my-14">
                        <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
                        <span>
                            <CheckboxGroup
                                color="primary"
                                orientation="horizontal"
                                isRequired
                            >
                                <Checkbox value="buenos-aires">Siempre</Checkbox>
                                <Checkbox value="sydney">Casi Siempre</Checkbox>
                                <Checkbox value="san-francisco">Algunas veces</Checkbox>
                                <Checkbox value="london">Casi nunca</Checkbox>
                                <Checkbox value="tokyo">Nunca</Checkbox>
                            </CheckboxGroup>
                        </span>
                    </div>
                </div>
            </div>
        </QuestionControls>
    )
}
