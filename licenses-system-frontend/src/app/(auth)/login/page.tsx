'use client'
import CustomButton from '@/components/shared/buttons/CustomButton'
import CustomInput from '@/components/shared/inputs/CustomInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { login } from '../actions/login.action'
import { useState } from 'react'

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>()
  const handleLogin = async (formData: FormData) => {
    const result = (await login(formData)) as any
    if (!result.success) {
      setError(result.error)
    } else {
      setError(undefined)
    }
  }
  return (
    <section className="min-md:flex-row  w-full  flex flex-col items-center">
      <div className="min-lg:w-2/5 min-lg:items-center min-md:px-12 min-md:items-start w-full px-6 py-16 flex flex-col items-center min-md:w-3/6">
        <form
          action={handleLogin}
          className="min-lg:w-3/4 min-md:w-full space-y-8 min-w-80 max-w-full  "
        >
          <div className="w-full justify-center text-center space-y-5">
            <p className="text-4xl font-bold">SeedProd</p>
            <p className="text-2xl font-bold">Login</p>
            <p className="text-red-600">{!!error && <span> {error}</span>}</p>
            <p>
              Não tem uma conta?{' '}
              <Link className="text-secondary" href={'/register'}>
                Clique Aqui
              </Link>
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="font-bold">Email</Label>
              <CustomInput name="email" icon="AtSign" type="text" />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Senha</Label>
              <CustomInput name="password" type="password" />
            </div>
          </div>
          <div className="text-center space-y-4">
            <CustomButton submit label="Login" color="Action" />
            Esqueceu a senha?{' '}
            <Link className="text-secondary" href={'/forgot-password'}>
              Clique aqui
            </Link>
          </div>
        </form>
      </div>
      <div
        className="min-lg:w-3/5 min-md:block hidden w-full h-screen bg-red-500"
        style={{
          backgroundImage:
            'url("https://static.vecteezy.com/system/resources/thumbnails/006/852/804/small_2x/abstract-blue-background-simple-design-for-your-website-free-vector.jpg")',
          backgroundSize: 'cover',
        }}
      ></div>
    </section>
  )
}
