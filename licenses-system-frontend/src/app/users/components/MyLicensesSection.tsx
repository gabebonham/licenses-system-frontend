import { License } from '@/entities/license.entity'
import { LicensesTableComponent } from './LicensesTableComponent'

export default function MyLicensesSection({
  licenses,
}: {
  licenses: License[]
}) {
  return (
    <section className=" w-2/3 pt-4  flex justify-center ">
      <LicensesTableComponent user={undefined} licenses={licenses} />
    </section>
  )
}
