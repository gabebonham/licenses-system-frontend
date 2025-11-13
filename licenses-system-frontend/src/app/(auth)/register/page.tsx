'use client'
import CustomButton from '@/components/shared/buttons/CustomButton'
import CustomInput from '@/components/shared/inputs/CustomInput'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Bot } from 'lucide-react'
import Link from 'next/link'
import { register } from '../actions/register.action'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import logo from '@/../public/images/Vector.png'
import Image from 'next/image'
export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const lastLink = searchParams.get('lastLink')
  const [error, setError] = useState<string | undefined>()
  const handleRegister = async (formData: FormData) => {
    const result = (await register(formData)) as any
    const link = lastLink
    if (!result.success) {
      setError(result.error)
    } else {
      setError(undefined)
      if (link) {
        router.push(link)
        return
      } else {
        router.push('/users/dashboard')
        return
      }
    }
  }
  return (
    <section className="text-blueLight h-full  w-full  flex flex-col items-center  ">
      <div className="min-lg:w-2/5 gap-y-6 h-full min-lg:items-center min-md:px-12 min-md:items-start w-full px-6 py-12 flex flex-col items-center min-md:w-3/6">
        <h1 className="lg:text-3xl text-2xl gap-x-4 text-blueDark flex-col justify-center font-bold flex items-center pb-3">
          <Link href={'/home'} className="flex items-center gap-x-4 ">
            <Image
              src={logo}
              alt="logo"
              className="w-16 lg:w-24 mb-3"
              width={800}
              height={800}
            />
          </Link>
          H4Investimentos
        </h1>
        <form
          action={handleRegister}
          className=" w-full  min-w-80 max-w-full   "
        >
          <Card className="lg:px-8  p-4 h-[100%] border-blueLight space-y-4 py-8 text-grayLight rounded-2xl  border-1 shadow-2xl/50 bg-gradient-to-br from-blueDark/90 to-blueDark">
            <div className="w-full justify-center text-center space-y-2">
              <div className="flex items-center justify-between">
                <Link href="/home">
                  <ArrowLeft className="size-10" />
                </Link>
                <p className="lg:text-4xl text-xl font-bold">Cadastro</p>
                <div className="size-10"></div>
              </div>
              <p>
                {!!error && (
                  <span className="text-shadow-2xl text-red-400 [text-shadow:0_0_5px_#ef4444,0_0_10px_#ef4444]  ">
                    {error}
                  </span>
                )}
              </p>
              <p className="lg:pt-4 lg:text-xl text-blueLight/60">
                Seja Bem Vindo(a)!
              </p>
            </div>
            <div className="space-y-6">
              <div className="lg:space-y-4 space-y-2">
                <Label className="lg:text-xl font-bold text-blueLight">
                  Email
                </Label>
                <CustomInput
                  icon="AtSign"
                  type="text"
                  css="lg:text-xl lg:h-12 border-grayLight/50"
                  name="email"
                />
              </div>
              <div className="lg:space-y-4 space-y-2">
                <Label className="lg:text-xl font-bold text-blueLight">
                  Nome
                </Label>
                <CustomInput
                  name="name"
                  icon="Pencil"
                  type="text"
                  css="lg:text-xl lg:h-12 border-grayLight/50"
                />
              </div>
              <div className="lg:space-y-4 space-y-2">
                <Label className="lg:text-xl font-bold text-blueLight">
                  Senha
                </Label>
                <CustomInput
                  name="password"
                  type="password"
                  css="lg:text-xl lg:h-12"
                />
              </div>
              <div className="lg:space-y-4 space-y-2">
                <Label className="lg:text-xl font-bold text-blueLight">
                  Confirmar Senha
                </Label>
                <CustomInput
                  name="confirmPassword"
                  type="password"
                  css="lg:text-xl lg:h-12"
                />
              </div>
            </div>
            <div className="text-center space-y-4 lg:text-xl text-blueLight/60">
              <CustomButton
                label="Registrar"
                color="Option"
                css="lg:text-xl lg:py-7 border-grayLight "
                submit
              />
              {/* Esqueceu a senha?{' '}
              <Link
                className="text-blueLight lg:text-xl"
                href={`/forgot-password${
                  lastLink ? `?lastLink=${lastLink}` : ''
                }`}
              >
                Clique aqui
              </Link> */}
              <p className="lg:pt-4 lg:text-xl text-blueLight/60">
                Já tem uma conta?{' '}
                <Link
                  className="text-blueLight"
                  href={`/login${lastLink ? `?lastLink=${lastLink}` : ''}`}
                >
                  Clique Aqui
                </Link>
              </p>
            </div>
          </Card>
        </form>
      </div>
    </section>
  )
}
