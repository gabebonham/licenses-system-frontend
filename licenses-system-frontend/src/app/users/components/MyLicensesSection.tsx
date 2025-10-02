import CustomButton from '@/components/shared/buttons/CustomButton'
import CustomInput from '@/components/shared/inputs/CustomInput'
import { Card } from '@/components/ui/card'
import { License } from '@/entities/license.entity'
import { LicensesTableComponent } from './LicensesTableComponent'

export default function MyLicensesSection({
  licenses,
}: {
  licenses: License[]
}) {
  return (
    <section className=" w-2/3 pt-4  flex justify-center ">
      <LicensesTableComponent licenses={licenses} />
    </section>
  )
}
