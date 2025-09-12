import CustomButton from '@/components/shared/buttons/CustomButton'
import CustomInput from '@/components/shared/inputs/CustomInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <section className="min-md:flex-row w-full flex flex-col items-center ">
      <div className="min-lg:w-2/5 min-lg:items-center min-md:px-12 min-md:items-start w-full px-6 py-16 flex flex-col items-center min-md:w-3/6">
        <form className="min-lg:w-3/4 min-md:w-full space-y-8 min-w-80 max-w-full text-center">
          <p className="text-4xl font-bold">SeedProd</p>
          <p className="text-2xl font-bold">Registro</p>
          <p>
            Já tem uma conta?{' '}
            <Link className="text-secondary" href={'/login'}>
              Clique Aqui
            </Link>
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="font-bold">Email</Label>
              <CustomInput icon="AtSign" type="text" />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Senha</Label>
              <CustomInput type="password" />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Confirmar Senha</Label>
              <CustomInput type="password" />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Account Number</Label>
              <CustomInput icon="Bot" type="text" />
            </div>
          </div>

          <div className="text-center space-y-4">
            <CustomButton label="Registrar" color="Action" />
            Esqueceu a senha?{' '}
            <Link className="text-secondary" href={'/forgot-password'}>
              Clique aqui
            </Link>
          </div>
        </form>
      </div>

      <div
        className="min-lg:w-3/5 min-md:block hidden w-full h-dvh"
        style={{
          backgroundImage:
            'url("https://static.vecteezy.com/system/resources/thumbnails/006/852/804/small_2x/abstract-blue-background-simple-design-for-your-website-free-vector.jpg")',
          backgroundSize: 'cover',
        }}
      ></div>
    </section>
  )
}
