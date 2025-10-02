import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProfileSection from './ProfileSection'
import { BotsDataTable } from '@/components/shared/BotsDataTableComponent'
import MyLicensesSection from './MyLicensesSection'
import { getUserById, getUsers } from '@/app/admin/actions/users.service'
import { decodeJwt } from '@/lib/jwt-decode'
import { cookies } from 'next/headers'

export default async function TabsComponent() {
  const cookieStore = await cookies()
  const token = await decodeJwt(cookieStore.get('token')?.value as string)
  const user = await getUserById(token!.id)
  return (
    <Tabs
      defaultValue="bots"
      className="w-full lg:text-2xl flex justify-center "
    >
      <TabsList className="bg-foreground text-blueLight  lg:h-14 rounded-2xl w-2/3 flex self-center">
        <TabsTrigger
          className="lg:text-xl text-blueLight rounded-2xl cursor-pointer"
          value="profile"
        >
          Perfil
        </TabsTrigger>

        <TabsTrigger
          className="lg:text-xl text-blueLight rounded-2xl cursor-pointer"
          value="licenses"
        >
          Licenças
        </TabsTrigger>
      </TabsList>

      <TabsContent value="licenses" className="w-full flex justify-center ">
        <MyLicensesSection licenses={user.data.licenses || []} />
      </TabsContent>
      <TabsContent value="profile" className="w-full ">
        <ProfileSection user={user.data} />
      </TabsContent>
    </Tabs>
  )
}
