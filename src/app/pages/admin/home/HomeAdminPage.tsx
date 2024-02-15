import { Card, CardBody } from "@nextui-org/react"
import { authService } from "../../../../domain/services/auth.service"
import { parseDate } from "../../../helpers/parseDate";

export const HomeAdminPage = () => {

  const { user } = authService();

  return (
    <section>
      <Card className="p-10 bg-emerald-600/10">
        <CardBody className=" grid grid-cols-2 lg:grid-col-2">
          <div>
            <span className="text-6xl mb-5 block text-slate-800">Bienvenido de vuelta </span>
            <span className="text-emerald-600 text-5xl font-bold">{user?.userName}</span>
          </div>
          <div className="flex justify-end text-slate-800 font-bold text-lg">
            <span>{parseDate(new Date())}</span>
          </div>
        </CardBody>
      </Card>
    </section>
  )
}
