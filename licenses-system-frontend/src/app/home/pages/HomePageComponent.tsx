'use client'
import { Button } from '@/components/ui/button'
import { Bot, ChevronRight, Shield, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import CustomButton from '@/components/shared/buttons/CustomButton'
import { Card } from '@/components/ui/card'
import { redirect } from 'next/navigation'
import { Product } from '@/entities/product.entity'
import ViewProducts from '../components/ViewProducts'
export default function HomePageComponent({
  res,
  performances,
  trades,
}: {
  res: { data?: any; success: boolean }
  performances: any[]
  trades: any
}) {
  const handleScroll = (target: string) => {
    const section = document.getElementById(target)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div className="pt-18 w-full flex flex-col justify-center min-xl:px-0 gap-x-0 ">
      <div className="w-fit flex flex-col items-center pb-8 lg:pb-36 bg-radial from-primary to-gradient-hero">
        <div className="w-full flex flex-col items-center pt-14  h-full  gap-y-4 lg:gap-y-16 px-4 ">
          <h1 className="lg:max-w-3/5 text-3xl lg:text-7xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-br from-white  to-blueLight">
            Operações Financeiras Automatizadas com Robôs de alta performance
          </h1>
          <div className="lg:text-3xl lg:max-w-1/2 py-4 flex flex-wrap gap-x-4 gap-y-2 justify-center text-center text-transparent bg-clip-text bg-gradient-to-br from-blueLight  to-white/50">
            Robôs de alta performance que executam suas estratégias financeiras
            24/7 com precisão milimétrica e resultados extraordinários.
          </div>

          <div className="w-full lg:flex-row flex-col flex items-center gap-x-8 justify-center gap-y-8 lg:gap-y-16">
            <CustomButton
              action={() => redirect('/login')}
              color="Action"
              label="Começar Agora"
              css="lg:text-2xl w-fit lg:py-8 px-18 "
              icon="ArrowRight"
            />
            <CustomButton
              action={() => handleScroll('productsSection')}
              color="Option"
              label="Ver Produtos"
              css="lg:text-2xl w-fit lg:py-8 px-24 "
            />
          </div>
          <div className="pt-8 px-4 w-full justify-around  lg:gap-y-16 flex lg:justify-center lg:gap-x-32 h-full text-blueLight">
            <div className="flex flex-col items-center">
              <TrendingUp className="size-4 lg:size-10" />
              <p className="lg:text-4xl font-bold">99.7%</p>
              <p>Precisão</p>
            </div>
            <div className="flex flex-col items-center">
              <Bot className="size-4 lg:size-10" />{' '}
              <p className="lg:text-4xl font-bold">24/7</p>
              <p>Operação</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="size-4 lg:size-10" />{' '}
              <p className="lg:text-4xl font-bold">100%</p>
              <p>Seguro</p>
            </div>
          </div>
        </div>
      </div>

      <div
        id="productsSection"
        className="bg-background text-blueLight py-4 lg:py-24 px-6 lg:px-24 flex flex-col items-center"
      >
        <h1 className="text-center text-2xl lg:text-6xl font-bold py-2">
          Nossos Robôs
        </h1>
        <p className="text-center text-xl  lg:text-2xl lg:max-w-3/5 py-6 lg:py-18 ">
          Escolha o robô perfeito para sua estratégia de investimento. Cada um
          foi desenvolvido com tecnologia de ponta para maximizar seus retornos.
        </p>
        {res.success && (
          <ViewProducts
            trades={trades}
            experts={res.data}
            performances={performances}
          />
        )}
      </div>
      <div className="bg-gradient-to-br from-background to-primary pb-6 lg:py-24">
        <div
          id="aboutSection"
          className="p-4 w-full flex flex-col justify-center items-center"
        >
          <h1 className="lg:max-w-3/5 text-3xl lg:text-7xl text-center font-bold text-transparent pb-6 lg:pb-12 bg-clip-text bg-gradient-to-br from-white/80  to-blueLight">
            Sobre nós
          </h1>
          <div className="flex flex-col gap-y-8 items-center">
            <Card className=" text-xl lg:text-2xl text-center transition-all px-6 text-blueLight/80 bg-gradient-to-br from-secondary to-primary border-1 border-transparent lg:w-4/6">
              Na era da transformação digital, agilidade e precisão são
              essenciais para o sucesso no mercado financeiro. Nossa empresa
              nasceu com a missão de oferecer operações automatizadas com robôs
              de alta performance, capazes de operar 24/7, analisando cenários
              em tempo real e executando ordens com máxima eficiência. Unimos
              inteligência artificial, algoritmos avançados e aprendizado de
              máquina para transformar dados em decisões inteligentes,
              adaptando-se constantemente para maximizar oportunidades e reduzir
              riscos. Mais do que tecnologia, entregamos transparência,
              confiança e soluções personalizadas, alinhadas ao perfil e
              objetivos de cada cliente. Com resultados consistentes e inovação
              contínua, atuamos como parceiros estratégicos na conquista da
              liberdade financeira, oferecendo ferramentas que mantêm nossos
              clientes sempre à frente do mercado.
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
