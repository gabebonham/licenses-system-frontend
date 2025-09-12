import { Button } from '@/components/ui/button'
import FloatingButton from './components/FloatingButton'
import MenuDrawer from './components/MenuDrawer'
import ViewProducts from './components/ViewProducts'
import { ChevronRight } from 'lucide-react'
import FilterCard from './components/FilterCard'
import { Badge } from '@/components/ui/badge'
import CustomButton from '@/components/shared/buttons/CustomButton'
import GenericCarousel from './components/GenericCarousel'
import { Card } from '@/components/ui/card'
export default function HomePage() {
  return (
    <main className="w-full">
      <div className="pt-18 w-full flex flex-col justify-center min-xl:px-6 gap-x-36 ">
        <div
          style={{
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage:
              "url('https://images.contentstack.io/v3/assets/blt8ec5b78e9ea1d11d/blt9b4eb37eaccc01a9/6323eead9a6b39638424b3f6/TradingBot2_1600x900_WEBP.webp')",
          }}
          className="w-full flex flex-col items-center   py-14"
        >
          <div className="w-full flex flex-col items-center backdrop-blur-2xl gap-y-4 px-4 ">
            <h1 className="text-5xl text-center font-bold text-white">
              TITULO CABULOSO E SINISTRO
            </h1>
            <div className="py-4 flex flex-wrap gap-x-4 gap-y-2 justify-center text-center text-primary">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. quasi
              adipisci reiciendis eos esse exercitationem?
            </div>
            <div className="text-center text-white text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione,
              nobis quo quidem ipsum dicta rerum praesentium cum similique amet
              veniam molestias reiciendis beatae sequi libero totam tempora id
              eos commodi.
            </div>

            <div>
              <h1 className="text-4xl text-white text-center font-bold">
                Nossos Produtos
              </h1>
              <GenericCarousel
                items={[
                  {
                    image:
                      'https://images.contentstack.io/v3/assets/blt8ec5b78e9ea1d11d/blt9b4eb37eaccc01a9/6323eead9a6b39638424b3f6/TradingBot2_1600x900_WEBP.webp',
                  },
                  {
                    image:
                      'https://images.contentstack.io/v3/assets/blt8ec5b78e9ea1d11d/blt9b4eb37eaccc01a9/6323eead9a6b39638424b3f6/TradingBot2_1600x900_WEBP.webp',
                  },
                  {
                    image:
                      'https://images.contentstack.io/v3/assets/blt8ec5b78e9ea1d11d/blt9b4eb37eaccc01a9/6323eead9a6b39638424b3f6/TradingBot2_1600x900_WEBP.webp',
                  },
                  {
                    image:
                      'https://images.contentstack.io/v3/assets/blt8ec5b78e9ea1d11d/blt9b4eb37eaccc01a9/6323eead9a6b39638424b3f6/TradingBot2_1600x900_WEBP.webp',
                  },
                  {
                    image:
                      'https://images.contentstack.io/v3/assets/blt8ec5b78e9ea1d11d/blt9b4eb37eaccc01a9/6323eead9a6b39638424b3f6/TradingBot2_1600x900_WEBP.webp',
                  },
                ]}
              />
            </div>
          </div>
          <div className=" px-4 w-full">
            <CustomButton color="Action" label="Ver Produtos" />
          </div>
        </div>

        <div className="bg-primary/20">
          <div className="p-4 w-full flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-center py-4">Sobre nós</h1>
            <div className="flex flex-col gap-y-8">
              <Card className="text-center text-black text-lg px-2 bg-transparent ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ratione, nobis quo quidem ipsum dicta rerum praesentium cum
                similique amet veniam molestias reiciendis beatae sequi libero
                totam tempora id eos commodi.Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Ratione, nobis quo quidem ipsum
                dicta rerum praesentium cum similique amet veniam molestias
                reiciendis beatae sequi libero totam tempora id eos commodi.
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
