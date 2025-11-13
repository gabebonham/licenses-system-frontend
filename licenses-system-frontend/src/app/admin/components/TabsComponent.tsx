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
import { CopiesDataTable } from '@/components/shared/CopiesDataTableComponent'
import { getCopies } from '../actions/copies.service'
import PartnersGrid from './PartnersGrid'
import { getPartners } from '../actions/partners.service'
import CustomButton from '@/components/shared/buttons/CustomButton'

export default async function TabsComponent() {
  const data = await getUsers()
  const dataExperts = await getExperts()
  const dataProducts = await getProducts()
  const dataLicenses = await getLicenses()
  const dataSales = await getSales()
  const dataCopies = await getCopies()
  const dataPartners = await getPartners()
  return (
    <Tabs defaultValue="users" className="max-w-md lg:min-w-full lg:text-2xl">
      <TabsList className="bg-grayLight text-dark border-1 border-dark  w-[98%] lg:w-fit lg:min-w-3/5 lg:h-14 rounded-lg">
        <TabsTrigger
          className="lg:text-xl w-1/6 text-xs px-0 lg:text-lg rounded-lg cursor-pointer"
          value="sales"
        >
          Vendas
        </TabsTrigger>
        <TabsTrigger
          className="lg:text-xl w-1/6 text-xs px-0 lg:text-lg rounded-lg cursor-pointer"
          value="users"
        >
          Usuários
        </TabsTrigger>
        <TabsTrigger
          className="lg:text-xl w-1/6 text-xs px-0 lg:text-lg rounded-lg cursor-pointer"
          value="bots"
        >
          Robôs
        </TabsTrigger>
        <TabsTrigger
          className="lg:text-xl w-1/6 text-xs px-0 lg:text-lg rounded-lg cursor-pointer"
          value="products"
        >
          Produtos
        </TabsTrigger>
        <TabsTrigger
          className="lg:text-xl w-1/6 text-xs px-0 lg:text-lg rounded-lg cursor-pointer"
          value="licenses"
        >
          Licenças
        </TabsTrigger>
        <TabsTrigger
          className="lg:text-xl w-1/6 text-xs px-0 lg:text-lg rounded-lg cursor-pointer"
          value="copies"
        >
          Copies
        </TabsTrigger>
        <TabsTrigger
          className="lg:text-xl w-1/6 text-xs px-0 lg:text-lg rounded-lg cursor-pointer"
          value="partners"
        >
          Parceiros
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
      <TabsContent value="copies" className="w-full ">
        <CopiesDataTable copies={dataCopies.success ? dataCopies.data : []} />
      </TabsContent>
      <TabsContent value="partners" className="w-full ">
        <PartnersGrid
          partners={dataPartners.success ? dataPartners.data : []}
        />
      </TabsContent>
    </Tabs>
  )
}
