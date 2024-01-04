import { Table as MainTable, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"

interface HeaderColumn {
    name: string;
    icon: JSX.Element;
}

interface Props {
    headerColumns: Array<HeaderColumn>;
    dataRow: Array<any>;
}

export const Table = ({ headerColumns, dataRow }: Props) => {
    return (
        <MainTable aria-label="Ususarios" color="danger">
            <TableHeader>
                {
                    headerColumns.map(({ name, icon }) => (
                        <TableColumn key={name}> {name} </TableColumn>
                    ))
                }
            </TableHeader>
            <TableBody>
                {
                    dataRow.map(() => (
                        <TableRow>
                            <TableCell className="py-5">
                                Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo
                            </TableCell>
                            <TableCell>
                                x
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </MainTable>
    )
}
