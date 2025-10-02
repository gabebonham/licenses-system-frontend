'use client'
import { editUser } from '@/app/admin/actions/users.service'
import CustomButton from '@/components/shared/buttons/CustomButton'
import CustomInput from '@/components/shared/inputs/CustomInput'
import { Card } from '@/components/ui/card'
import { User } from '@/entities/user.entity'
import { toast } from 'sonner'

export default function ProfileSection({ user }: { user: User }) {
  const handleEdit = async (formData: FormData) => {
    if (
      formData.has('accountNumber') ||
      formData.has('name') ||
      formData.has('email')
    ) {
      await editUser(
        user.id,
        formData.get('name')?.valueOf() as string | undefined,
        formData.get('email')?.valueOf() as string | undefined,
        formData.get('accountNumber')?.valueOf() as number | undefined,
      )
    }
  }
  return (
    <form action={handleEdit} className="flex justify-center pt-4 ">
      <Card className="w-2/3 lg:px-8 space-y-4 pt-8 border-white/10 text-blueLight px-4 bg-gradient-to-br to-foreground from-secondary">
        <div>
          <h1 className="lg:text-3xl text-xl font-bold">
            Informações Pessoais
          </h1>
        </div>
        <div>
          <p className="font-semibold pb-2">Nome</p>
          <CustomInput name="name" type="text" placeholder={user.name} />
        </div>
        <div>
          <p className="font-semibold pb-2">Email</p>
          <p>{user.email}</p>
        </div>
        <div>
          <p className="font-semibold pb-2">Número de Conta</p>
          <CustomInput
            name="accountNumber"
            type="text"
            placeholder={(
              user.accountNumber || 'Adicione número de conta '
            ).toString()}
          />
        </div>
        <div>
          <p className="font-semibold pb-2">Mêmbro desde:</p>
          <p>
            {user.createdAt &&
              new Date(user.createdAt).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <div className="w-full flex justify-center">
          <CustomButton
            action={() => toast('Atualize a página')}
            label="Editar Perfil"
            color="Action"
            css="max-w-96 lg:text-xl lg:h-12"
            submit
          />
        </div>
      </Card>
      {/* <Card className="lg:px-8 space-y-4 pt-8 border-white/10 text-blueLight px-4 bg-gradient-to-br to-foreground from-secondary">
        <div>
          <h1 className="lg:text-3xl text-xl font-bold">Suas Estatísticas</h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Total de Trades:</p>
          <p>1234</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Taxa de Sucesso</p>
          <p>87%</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Retorno Total</p>
          <p>53%</p>
        </div>
      </Card> */}
    </form>
  )
}
