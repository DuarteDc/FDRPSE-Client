import { Card, CardBody } from "@nextui-org/react"
import { authService } from "../../../../domain/services/auth.service"
import { parseDate } from "../../../helpers/parseDate";
import { HomeIcon, SectionIcon, UserIcon } from "../../../../infraestructure/components/icons";

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
      <div className="grid grid-cols-3 mt-20">
        <Card shadow="sm" isPressable className="bg-purple-500/50">
          <CardBody className="overflow-visible p-5 lg:p-10 flex flex-row items-center justify-between font-bold">
            <span className="text-4xl lg:text-5xl">
              <h3 className="text-xs font-semibold">Inventarios</h3>
              50
            </span>
            <span className="p-1 lg:p-5 bg-purple-500 rounded-lg">
              <SectionIcon width={60} height={60} />
            </span>
          </CardBody>
        </Card>
        <Card shadow="sm" isPressable className="bg-emerald-500/50">
          <CardBody className="overflow-visible p-5 lg:p-10 flex flex-row items-center justify-between font-bold">
            <span className="text-4xl lg:text-5xl">
              <h3 className="text-xs font-semibold">Usuarios</h3>
              20
            </span>
            <span className="p-1 lg:p-5 bg-emerald-500 rounded-lg">
              <UserIcon width={60} height={60} />
            </span>
          </CardBody>
        </Card>
        <Card shadow="sm" isPressable className="bg-amber-500/50">
          <CardBody className="overflow-visible p-5 lg:p-10 flex flex-row items-center justify-between font-bold">
            <span className="text-4xl lg:text-5xl">
              <h3 className="text-xs font-semibold">Unidades Administrativas</h3>
              60
            </span>
            <span className="p-1 lg:p-5 bg-amber-500 rounded-lg">
              <HomeIcon width={60} height={60} />
            </span>
          </CardBody>
        </Card>
      </div>
    </section>
  )
}
