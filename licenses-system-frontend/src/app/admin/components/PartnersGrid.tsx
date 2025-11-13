'use client'

import CustomButton from '@/components/shared/buttons/CustomButton'
import CustomInput from '@/components/shared/inputs/CustomInput'
import { Card, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import { createPartner, deletePartner } from '../actions/partners.service'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function PartnersGrid({ partners }: { partners: any[] }) {
  const handleCreatePartner = async (formData: FormData) => {
    if (
      !formData.has('name') ||
      !formData.has('image') ||
      !formData.has('link')
    ) {
      toast('Verifique os dados e envie novamente')
      return
    }
    await createPartner(
      formData.get('name') as string,
      formData.get('link') as string,
      formData.get('image') as File,
    )
  }
  const handleDelete = async (id: string) => {
    await deletePartner(id)
    toast('Atualize a página.')
  }
  return (
    <div className="flex flex-col items-start">
      <form
        action={handleCreatePartner}
        className="flex items-center justify-center gap-x-4 w-1/2"
      >
        <Input
          type="text"
          name="name"
          placeholder="Nome..."
          className="border-dark/50 border-1 rounded-md flex items-center pr-2 transition-all duration-200 focus-within:shadow-[0_0_05px_0_#a7e6ff] w-full text-dark w-1/4 border-dark"
        />
        <Input
          type="text"
          name="link"
          placeholder="Link..."
          className="border-dark/50 border-1 rounded-md flex items-center pr-2 transition-all duration-200 focus-within:shadow-[0_0_05px_0_#a7e6ff] w-full text-dark w-1/4 border-dark"
        />
        <Input
          type="file"
          name="image"
          placeholder="Imagem..."
          className="border-dark/50 border-1 rounded-md flex items-center pr-2 transition-all duration-200 focus-within:shadow-[0_0_05px_0_#a7e6ff] w-full text-dark w-1/4 border-dark"
        />
        <CustomButton
          label="Adicionar Parceiro"
          submit
          css="w-1/4 "
          color="Option"
        />
      </form>
      <div className="grid grid-cols-1 d:grid-cols-2 lg:grid-cols-4 py-4 gap-6">
        {partners.map((partner) => (
          <Card className="bg-transparent font-medium h-full text-center border-dark text-dark px-4">
            <Image
              alt="partner"
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL + partner.imgUrl}`}
              width={800}
              height={800}
              className=""
            />
            <p>{partner.name}</p>
            <Link href={partner.link}>link</Link>
            <CardFooter className="justify-self-end h-full">
              <CustomButton
                label="Excluir"
                color="Action"
                action={() => handleDelete(partner.id)}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
