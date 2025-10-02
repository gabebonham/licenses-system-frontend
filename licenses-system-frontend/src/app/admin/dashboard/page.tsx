import { Card } from '@/components/ui/card'
import { Bot, Settings, TrendingUp, Users } from 'lucide-react'
import TabsComponent from '../components/TabsComponent'
import { getUsers } from '../actions/users.service'
import { getExperts } from '../actions/experts.service'

export default async function AdminDashboard() {
  let userCount = 0
  let expertCount = 0
  if ((await getUsers()).data) {
    userCount = (await getUsers()).data.length
  }
  if ((await getExperts()).data) {
    expertCount = (await getExperts()).data.length
  }

  return (
    <div className=" text-blueLight ">
      <div className="lg:px-12 lg:pt-32 px-4 pt-24 space-y-12 pb-12 bg-foreground">
        <div>
          <h1 className="lg:text-5xl flex items-center gap-x-4 text-2xl font-bold">
            <Settings className="lg:size-10 box-content p-3 bg-primary rounded-xl" />
            Painel Admin
          </h1>
        </div>
        <div className="lg:text-2xl flex md:grid lg:gap-x-48 md:gap-x-8 md:grid-cols-2 flex-col gap-y-6 ">
          <Card className="border-white/10 text-blueLight px-4 bg-gradient-to-br to-foreground from-secondary">
            <div className="flex items-center w-full justify-between">
              <p>Total de Usuários</p>
              <Users />
            </div>
            <div>
              <p className="font-bold text-3xl">{userCount}</p>
            </div>
          </Card>
          <Card className="border-white/10 text-blueLight px-4 bg-gradient-to-br to-foreground from-secondary">
            <div className="flex items-center w-full justify-between">
              <p>Robôs Totais</p>
              <Bot />
            </div>
            <div>
              <p className="font-bold text-3xl">{expertCount}</p>
            </div>
          </Card>
          {/* <Card className="border-white/10 text-blueLight px-4 bg-gradient-to-br to-foreground from-secondary">
            <div className="flex items-center w-full justify-between">
              <p>Volume Total</p>
              <TrendingUp />
            </div>
            <div>
              <p className="font-bold text-3xl">R$ 12,00</p>
            </div>
          </Card> */}
        </div>
      </div>
      <div className="md:px-12 py-12 px-4 ">
        <div className="w-full">
          <TabsComponent />
        </div>
      </div>
    </div>
  )
}
