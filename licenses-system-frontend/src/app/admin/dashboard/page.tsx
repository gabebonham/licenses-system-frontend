import { Card } from '@/components/ui/card'
import { Bot, Settings, TrendingUp, Users } from 'lucide-react'
import TabsComponent from '../components/TabsComponent'
import { getUsers } from '../actions/users.service'
import { getExperts } from '../actions/experts.service'
import CustomButton from '@/components/shared/buttons/CustomButton'
import { logout } from '@/lib/logout'

export default async function AdminDashboard() {
  let userCount = 0
  let expertCount = 0
  const resUsers = (await getUsers()).data
  if (resUsers) {
    userCount = resUsers.length
  }
  const resExperts = (await getExperts()).data
  if (resExperts) {
    expertCount = resExperts.length
  }

  return (
    <div className="min-h-screen text-dark bg-gradient-to-br from-grayLight to-blueDark2/30">
      <div className="lg:px-12 lg:pt-22 px-4 pt-16 space-y-12 pb-12 ">
        <div className="flex items-center justify-between">
          <h1 className="lg:text-5xl w-2/3 flex items-center gap-x-4 text-2xl font-bold">
            <Settings className="lg:size-10 box-content size-4 box-border rounded-xl" />
            Painel Admin
          </h1>
          <div className="flex w-1/3 gap-y-4 flex-col lg:flex-row items-center gap-x-4">
            <CustomButton
              label="TUTORIAL"
              css="lg:w-1/3 w-full lg:px-12 lg:py-6 lg:text-xl"
              href="/admin/tutorial"
              color="Action"
            />
            <CustomButton
              color="Option"
              label="Home"
              css="lg:w-1/3 w-full lg:px-12 lg:py-6 lg:text-xl"
              href="/home"
            />
            <CustomButton
              color="Option"
              label="Logout"
              css="lg:w-1/3 w-full lg:px-12 lg:py-6 lg:text-xl"
              logout
            />
          </div>
        </div>
        <div className="lg:text-2xl flex md:grid lg:gap-x-48 md:gap-x-8 md:grid-cols-2 flex-col gap-y-6 ">
          <Card className="border-dark text-dark px-4 bg-grayLight">
            <div className="flex items-center w-full justify-between">
              <p>Total de Usuários</p>
              <Users />
            </div>
            <div>
              <p className="font-bold text-3xl">{userCount}</p>
            </div>
          </Card>
          <Card className="border-dark text-dark px-4 bg-grayLight">
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
      <div className="md:px-12 py-12 px-4 w-full ">
        <div className="w-full">
          <TabsComponent />
        </div>
      </div>
    </div>
  )
}
