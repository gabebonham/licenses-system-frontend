import { Star } from 'lucide-react'
import ProductCard from './ProductCard'
import CustomButton from '@/components/shared/buttons/CustomButton'
import Image from 'next/image'
import { Card } from '@/components/ui/card'

export default function ViewProducts() {
  return (
    <section className="flex flex-col w-full place-items-center gap-y-12 bg-gradient-to-b from-/60 to-secondary/30 pb-20 ">
      <div className=" w-full flex justify-center py-8">
        <Card
          className="size-70 "
          style={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage:
              'url("https://downloadserver-cdn.nelogica.com.br/content/site/midias/2022-12-12_06-12-49_CapaRobertoNogueirajpeg.jpeg")',
          }}
        ></Card>
      </div>
      <div className="px-4">
        <div>
          <div className="flex w-full items-center justify-between">
            <h1 className="text-4xl font-bold">Titulo</h1>
            <div>R$ 23432,00</div>
          </div>

          <p className="text-xl font-bold py-8 w-5/6">
            Mechanical gaming keyboard with customizable RGB lighting and
          </p>
        </div>
        <div className="pr-4">
          <h2 className="font-bold">Bagulhos</h2>
          <div className="grid grid-cols-2">
            <div>
              <p>coisa daora</p>
              <p>bagulheverson</p>
            </div>
            <div>
              <p>AAHHHHHAAMMMMMM</p>
              <p>é isso paizao</p>
            </div>
          </div>
        </div>
        <div className="py-16">
          <CustomButton label="Comprar" color="Action" css="text-xl py-6" />
        </div>
        <div className="flex flex-wrap grow shrink w-full items-center gap-x-8 justify-center gap-y-6">
          <Image
            className="size-24 rounded-2xl"
            src={
              'https://downloadserver-cdn.nelogica.com.br/content/strategy_store/41/Cruzamento2Medias.PNG'
            }
            alt=""
            width={800}
            height={800}
          />
          <Image
            className="size-24 rounded-2xl"
            src={
              'https://downloadserver-cdn.nelogica.com.br/content/strategy_store/38/variation 1.png'
            }
            alt=""
            width={800}
            height={800}
          />
          <Image
            className="size-24 rounded-2xl"
            src={
              'https://downloadserver-cdn.nelogica.com.br/content/strategy_store/12/FUNDO ACI 0001 Código Base.png'
            }
            alt=""
            width={800}
            height={800}
          />
          <Image
            className="size-24 rounded-2xl"
            src={
              'https://downloadserver-cdn.nelogica.com.br/content/strategy_store/41/Cruzamento2Medias.PNG'
            }
            alt=""
            width={800}
            height={800}
          />
        </div>
      </div>
    </section>
  )
}
