'use client'
import CustomButton from '@/components/shared/buttons/CustomButton'
import CustomInput from '@/components/shared/inputs/CustomInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { login } from '../actions/login.action'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Bot } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import logo from '@/../public/images/Vector.png'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const lastLink = searchParams.get('lastLink')
  const [error, setError] = useState<string | undefined>()
  const handleLogin = async (formData: FormData) => {
    const result = (await login(formData)) as any
    if (!result.success) {
      setError(result.error)
    } else {
      setError(undefined)
      if (lastLink) {
        router.push(lastLink)
        return
      }
      result.admin
        ? router.push('/admin/dashboard')
        : router.push('/users/dashboard')
    }
  }
  return (
    <section className="text-blueLight h-dvh  w-full  flex flex-col items-center  ">
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
          action={handleLogin}
          className=" w-full h-full min-w-80 max-w-full    "
        >
          <Card className="lg:px-8  p-4 h-[100%] border-blueLight space-y-4 py-8 text-grayLight rounded-2xl  border-1 shadow-2xl/50 bg-gradient-to-br from-blueDark/90 to-blueDark">
            <div className="w-full justify-center text-center space-y-2">
              <div className="flex items-center justify-between">
                <Link href="/home">
                  <ArrowLeft className="size-10" />
                </Link>
                <p className="lg:text-4xl text-xl  font-bold">Login</p>
                <div className="size-10"></div>
              </div>
              <p>
                {!!error && (
                  <span className="text-shadow-2xl text-red-400 [text-shadow:0_0_5px_#ef4444,0_0_10px_#ef4444]  ">
                    {error}
                  </span>
                )}
              </p>
              <p className="lg:pt-4 lg:text-xl text-grayLight/60">
                Bem Vindo(a) de Volta!
              </p>
            </div>
            <div className="space-y-12 ">
              <div className="lg:space-y-6 space-y-2">
                <Label className="lg:text-xl font-bold ">Email</Label>
                <CustomInput
                  name="email"
                  icon="AtSign"
                  type="text"
                  css="lg:text-xl lg:h-14 border-grayLight/50 "
                />
              </div>
              <div className="lg:space-y-6 space-y-2">
                <Label className="lg:text-xl font-bold ">Senha</Label>
                <CustomInput
                  name="password"
                  type="password"
                  css="lg:text-xl lg:h-14"
                />
              </div>
            </div>
            <div className="text-center space-y-4 lg:text-xl text-grayLight/60">
              <CustomButton
                submit
                label="Login"
                color="Option"
                css="lg:text-xl lg:py-7 border-grayLight "
              />
              {/* Esqueceu a senha?{' '}
              <Link
                className=" lg:text-xl text-white"
                href={`/forgot-password${
                  lastLink ? `?lastLink=${lastLink}` : ''
                }`}
              >
                Clique aqui
              </Link> */}
              <p className="lg:pt-4 lg:text-xl text-grayLight/60">
                Não tem uma conta?{' '}
                <Link
                  className="text-grayLight"
                  href={`/register${lastLink ? `?lastLink=${lastLink}` : ''}`}
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
