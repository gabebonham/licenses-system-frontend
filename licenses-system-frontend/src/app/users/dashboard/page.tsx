import { Card } from '@/components/ui/card'
import { Bot, Settings, ShoppingCart, TrendingUp, Users } from 'lucide-react'
import TabsComponent from '../components/TabsComponent'
import { decodeJwt } from '@/lib/jwt-decode'
import { cookies } from 'next/headers'
import { getUserById } from '@/app/admin/actions/users.service'
import { getProducts } from '@/app/admin/actions/products.service'

export default async function UsersDashboard() {
  const cookieStore = await cookies()

  const token = await decodeJwt(cookieStore.get('token')?.value as string)
  const user = await getUserById(token.id)
  return (
    <div className=" text-blueLight  ">
      <div className="lg:px-12 lg:pt-32 px-4 pt-24 space-y-12 pb-12 bg-foreground w-full">
        <div>
          <h1 className="lg:text-5xl flex items-center gap-x-4 text-2xl font-bold">
            <Settings className="lg:size-10 box-content p-3 bg-primary rounded-xl" />
            Bem vindo(a), {user.data.name}
          </h1>
        </div>
        <div className="lg:text-2xl flex md:grid lg:gap-x-24 md:gap-x-8 md:grid-cols-2 flex-col gap-y-6 w-full ">
          <Card className="border-white/10 text-blueLight px-4 bg-gradient-to-br to-foreground from-secondary w-full">
            <div className="flex items-center w-full justify-between">
              <p>Produtos Comprados</p>
              <ShoppingCart />
            </div>
            <div>
              <p className="font-bold text-3xl">{user.data.licenses.length}</p>
            </div>
          </Card>
          <Card className="border-white/10 text-blueLight px-4 bg-gradient-to-br to-foreground from-secondary w-full">
            <div className="flex items-center w-full justify-between">
              <p>Número de conta</p>
              <Bot />
            </div>
            <div>
              <p className="font-bold text-3xl">
                {user.data.accountNumber || (
                  <span className="text-red-400">
                    Adicione número de conta abaixo
                  </span>
                )}
              </p>
            </div>
          </Card>
        </div>
      </div>
      <div className="md:px-12 py-12 px-4 w-full  ">
        <div className="w-full flex justify-center">
          <TabsComponent />
        </div>
      </div>
    </div>
  )
}
