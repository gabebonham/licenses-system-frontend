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
import { Bot } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>()
  const handleLogin = async (formData: FormData) => {
    const result = (await login(formData)) as any
    if (!result.success) {
      setError(result.error)
    } else {
      setError(undefined)
      result.admin
        ? router.push('/admin/dashboard')
        : router.push('/users/dashboard')
    }
  }
  return (
    <section className="text-blueLight   w-full  flex flex-col items-center">
      <div className="min-lg:w-2/5 min-lg:items-center min-md:px-12 min-md:items-start w-full px-6 py-6 flex flex-col items-center min-md:w-3/6">
        <h1 className="lg:text-3xl text-2xl gap-x-4 text-blueLight font-bold flex items-center pb-6">
          <Bot className="lg:size-12 size-8 box-content p-3 rounded-lg bg-primary" />
          H4Investimentos
        </h1>
        <form action={handleLogin} className=" w-full  min-w-80 max-w-full   ">
          <Card className="lg:px-8 p-4 space-y-4 py-8 rounded-lg bg-gradient-to-br from-secondary to-primary border-1 border-blueLight/30">
            <div className="w-full justify-center text-center space-y-2">
              <p className="lg:text-4xl text-xl text-blueLight font-bold">
                Login
              </p>
              <p>
                {!!error && (
                  <span className="text-shadow-2xl text-red-400 [text-shadow:0_0_5px_#ef4444,0_0_10px_#ef4444]  ">
                    {error}
                  </span>
                )}
              </p>
              <p className="lg:pt-4 lg:text-xl text-blueLight/60">
                Não tem uma conta?{' '}
                <Link className="text-blueLight" href={'/register'}>
                  Clique Aqui
                </Link>
              </p>
            </div>
            <div className="space-y-6 ">
              <div className="lg:space-y-4 space-y-2">
                <Label className="lg:text-xl font-bold text-blueLight">
                  Email
                </Label>
                <CustomInput
                  name="email"
                  icon="AtSign"
                  type="text"
                  css="lg:text-xl lg:h-12"
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
            </div>
            <div className="text-center space-y-4 lg:text-xl text-blueLight/60">
              <CustomButton
                submit
                label="Login"
                color="Action"
                css="lg:text-xl lg:py-6 "
              />
              Esqueceu a senha?{' '}
              <Link
                className="text-blueLight lg:text-xl"
                href={'/forgot-password'}
              >
                Clique aqui
              </Link>
            </div>
          </Card>
        </form>
      </div>
    </section>
  )
}
