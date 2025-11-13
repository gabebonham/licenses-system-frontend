'use client'

import { Card } from '@/components/ui/card'
import RatingCard from './RatingCard'
import RatingsCarousel from './RatingsCarousel'

export default function RatingDisplay({ ratings }: { ratings: any[] }) {
  return (
    <div id="ratingsSection" className="px-8 xl:px-24 py-18 ">
      <div>
        <h1 className="text-4xl xl:text-7xl font-bold  text-blueDark pb-16">
          AVALIAÇÕES
        </h1>
        {/* <p className="text-2xl max-w-2/3 py-8 text-grayDark">
          Navegue GRÁTIS pelo mercado de opções B3 através do nosso portal. Veja
          aqui uma amostra das ações com maior volume em opções agora:
        </p> */}
      </div>
      <div className="hidden lg:grid grid-cols-4  gap-8">
        {ratings.map((rating) => (
          <RatingCard
            key={rating.name}
            copy={rating.copy}
            description={rating.description}
            rating={rating.value}
            userName={rating.user.name}
          />
        ))}
      </div>
      <div className="lg:hidden">
        <RatingsCarousel ratings={ratings} />
      </div>
    </div>
  )
}
