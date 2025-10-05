import { BotsDataTable } from '@/components/shared/BotsDataTableComponent'
import { ProductsDataTable } from '@/components/shared/ProductsDataTableComponent'
import { UsersDataTable } from '@/components/shared/UsersDataTableComponent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getUsers } from '../actions/users.service'
import { getExperts } from '../actions/experts.service'
import { getProducts } from '../actions/products.service'
import { LicensesDataTable } from '@/components/shared/LicensesDataTableComponent'
import { getLicenses } from '../actions/licences.service'
import { SalesDataTable } from '@/components/shared/SalesDataTableComponent'
import { getSales } from '../actions/sales.service'

export default async function TabsComponent() {
  const data = await getUsers()
  const dataExperts = await getExperts()
  const dataProducts = await getProducts()
  const dataLicenses = await getLicenses()
  const dataSales = await getSales()
  console.log(dataProducts)
  return (
    <Tabs defaultValue="users" className="w-full lg:text-2xl">
      <TabsList className="bg-foreground text-blueLight min-w-3/5 lg:h-14 rounded-2xl">
        <TabsTrigger
          className="lg:text-xl text-blueLight rounded-2xl cursor-pointer"
          value="sales"
        >
          Vendas
        </TabsTrigger>
        <TabsTrigger
          className="lg:text-xl text-blueLight rounded-2xl cursor-pointer"
          value="users"
        >
          Usuários
        </TabsTrigger>
        <TabsTrigger
          className="lg:text-xl text-blueLight rounded-2xl cursor-pointer"
          value="bots"
        >
          Robôs
        </TabsTrigger>
        <TabsTrigger
          className="lg:text-xl text-blueLight rounded-2xl cursor-pointer"
          value="products"
        >
          Produtos
        </TabsTrigger>
        <TabsTrigger
          className="lg:text-xl text-blueLight rounded-2xl cursor-pointer"
          value="licenses"
        >
          Licenças
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sales" className="w-full ">
        <SalesDataTable sales={dataSales.success ? dataSales.data : []} />
      </TabsContent>
      <TabsContent value="users" className="w-full ">
        <UsersDataTable users={data.success ? data.data : []} />
      </TabsContent>
      <TabsContent value="bots" className="w-full ">
        <BotsDataTable experts={dataExperts.success ? dataExperts.data : []} />
      </TabsContent>
      <TabsContent value="products" className="w-full ">
        <ProductsDataTable
          users={data.success ? data.data : []}
          products={dataProducts.success ? dataProducts.data : []}
        />
      </TabsContent>
      <TabsContent value="licenses" className="w-full ">
        <LicensesDataTable
          licenses={dataLicenses.success ? dataLicenses.data : []}
          users={data.success ? data.data : []}
        />
      </TabsContent>
    </Tabs>
  )
}
