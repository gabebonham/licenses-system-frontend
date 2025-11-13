import { Card } from '@/components/ui/card'
import {
  AtSign,
  Bot,
  Calendar,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react'
import TabsComponent from '../components/TabsComponent'
import { decodeJwt } from '@/lib/jwt-decode'
import { cookies } from 'next/headers'
import { getUserById } from '@/app/admin/actions/users.service'
import { getProducts } from '@/app/admin/actions/products.service'
import { parseDate } from '@/lib/utils'
import CustomButton from '@/components/shared/buttons/CustomButton'
import { LicensesTableComponent } from '../components/LicensesTableComponent'
import { use } from 'react'
import EditProfileModalButton from '../components/EditProfileModalButton'
import { logout } from '@/lib/logout'

export default async function UsersDashboard() {
  const cookieStore = await cookies()

  const token = await decodeJwt(cookieStore.get('token')?.value as string)
  if (!token) return 'asdf'
  const user = await getUserById(token!.id)
  if (!user.success) return 'asdf'
  return (
    <div className="  md:h-dvh flex flex-col bg-gradient-to-br from-blueLight to-blueLight2/80 text-blueDark2">
      <div className="lg:px-12 lg:py-12 px-4 py-6 space-y-6   w-full">
        <div className="flex sm:flex-row flex-col items-center gap-y-6 sm:gap-y-0 w-full justify-between gap-x-4">
          <h1 className="lg:text-5xl justify-center sm:justify-start flex items-center w-full sm:w-1/2 gap-x-4 text-2xl font-bold">
            <Settings className="lg:size-10 box-content lg:p-3 lg:pl-0 pl-2 rounded-xl" />
            Bem vindo(a), {user.data.name}
          </h1>
          <div className="flex w-full lg:w-1/3  pr-4 gap-2">
            <CustomButton
              label="Home"
              color="Option"
              css="w-1/3 lg:py-6 lg:text-xl"
              href="/home"
            />
            <EditProfileModalButton userId={user.data.id} />
            <CustomButton
              label="Logout"
              color="Option"
              css="w-1/3 lg:py-6 lg:text-xl"
              logout
            />
          </div>
        </div>

        <div className="lg:text-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 grid lg:gap-x-24 md:gap-x-8 md:grid-cols-4 gap-y-4  w-full ">
          <Card className="border-grayDark  px-4 bg-grayLight w-full">
            <div className="flex items-center w-full justify-between">
              <p className="">Produtos Comprados</p>
              <ShoppingCart className="" />
            </div>
            <div>
              <p className="font-bold ">{user.data.licenses.length}</p>
            </div>
          </Card>
          <Card className="border-grayDark  px-4 bg-grayLight w-full">
            <div className="flex items-center w-full justify-between">
              <p>Email</p>
              <AtSign />
            </div>
            <div>
              <p className="font-bold ">{user.data.email}</p>
            </div>
          </Card>
          <Card className="border-grayDark  px-4 bg-grayLight w-full">
            <div className="flex items-center w-full justify-between">
              <p>Registro</p>
              <Calendar />
            </div>
            <div>
              <p className="font-bold ">{parseDate(user.data.createdAt)}</p>
            </div>
          </Card>
          <Card className="border-grayDark  px-4 bg-grayLight w-full">
            <div className="flex items-center w-full justify-between">
              <p>Número de conta</p>
              <Bot />
            </div>
            <div>
              <p className="font-bold ">
                {user.data.accountNumber || (
                  <span className="text-red-400">
                    Adicione o número da sua conta Meta Trader em Editar Dados
                  </span>
                )}
              </p>
            </div>
          </Card>
        </div>
      </div>
      <div className="md:px-12 pb-12 px-4 w-full   h-full  ">
        <Card className=" h-full border-grayDark bg-grayLight">
          <LicensesTableComponent
            user={user.data}
            licenses={user.data.licenses}
          />
        </Card>
      </div>
    </div>
  )
}
