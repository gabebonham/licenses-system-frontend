'use client'

import CustomButton from '@/components/shared/buttons/CustomButton'
import { useRouter } from 'next/navigation'
import GraphsCarousel from '../products/components/GraphsCarousel'
import { Expert } from '@/entities/expert.entity'

export default function PresentationSection({
  handleScroll,
  experts,
  currentExpertId,
  trades,
  setCurrentExpertId,
}: {
  handleScroll: Function
  experts: Expert[]
  trades: any[]
  setCurrentExpertId: (value: string) => void
  currentExpertId: string
}) {
  const router = useRouter()
  return (
    <div
      id="presentationSection"
      className="w-full md:flex-row   flex flex-col items-center justify-center xl:justify-between py-12 gap-y-8 pb-8 xl:py-24 xl:px-20"
    >
      <div className="md:max-w-2/5 w-full  flex flex-col items-center md:items-start   w-full   xl:gap-y-8 xl:px-4 ">
        <h1 className="xl:max-w-2/5 max-w-96  text-3xl xl:text-7xl text-center md:text-start font-bold  w-full ">
          Operações Financeiras Automatizadas
        </h1>
        <div className="xl:text-5xl text-xl font-medium gap-x-4 pt-1 text-center xl:pb-12 xl:justify-start md:text-start w-full">
          Robôs de alta performance
        </div>

        <div className="w-full md:flex-row flex-col pt-4 flex items-center gap-x-8 xl:justify-start gap-y-2 xl:gap-y-16">
          <CustomButton
            action={() => router.push('/login')}
            color="Action"
            label="Começar Agora"
            css="xl:text-xl w-fit xl:py-7 xl:px-12 "
            icon="ArrowRight"
          />
          <CustomButton
            action={() => handleScroll('productsSection')}
            color="Option"
            label="Ver Produtos"
            css="xl:text-xl w-fit xl:py-7 xl:px-18 px-10 "
          />
        </div>
      </div>
      <div className="w-full  flex justify-center xl:max-w-3/5 md:w-fit xl:w-full lg:px-0 ">
        {experts && experts.length > 0 && (
          <GraphsCarousel
            setCurrentExpertId={setCurrentExpertId}
            currentExpertId={currentExpertId}
            experts={experts}
            trades={trades}
          />
        )}
      </div>
    </div>
  )
}
