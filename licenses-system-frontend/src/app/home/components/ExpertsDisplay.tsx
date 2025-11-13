'use client'

import { Expert } from '@/entities/expert.entity'
import ExpertPannel from './ExpertPannel'

export default function ExpertsDisplay({
  trades,
  experts,
  currentExpertId,
  setCurrentExpertId,
  performances,
}: {
  trades: any[]
  performances: any[]
  currentExpertId: string
  setCurrentExpertId: (value: string) => void
  experts: Expert[]
}) {
  

  return (
    <div
      id="productsSection"
      className="px-8 lg:px-24 py-8 lg:py-18 text-justify"
    >
      <div>
        <h1 className="text-4xl lg:text-7xl font-bold ">ROBÔS</h1>
        <p className="lg:text-2xl lg:max-w-2/3 py-8 text-grayDark">
          Navegue GRÁTIS pelo mercado de opções B3 através do nosso portal. Veja
          aqui uma amostra das ações com maior volume em opções agora:
        </p>
      </div>
      <div>
        <ExpertPannel
          performances={performances}
          currentExpertId={currentExpertId}
          setCurrentExpertId={setCurrentExpertId}
          experts={experts}
          trades={trades}
        />
      </div>
    </div>
  )
}
