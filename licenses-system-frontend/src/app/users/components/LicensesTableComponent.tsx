'use client'
import CustomButton from '@/components/shared/buttons/CustomButton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { License } from '@/entities/license.entity'
import { handleDownload } from '@/lib/download-util'

export function LicensesTableComponent({ licenses }: { licenses: License[] }) {
  return (
    <Table>
      <TableCaption>Uma lista de suas licenças.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-blueLight">Id</TableHead>
          <TableHead className="text-blueLight">Nome</TableHead>
          <TableHead className="text-blueLight">Status</TableHead>
          <TableHead className="text-blueLight">Volume Máximo</TableHead>
          <TableHead className="text-blueLight">Conteúdo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {licenses.length > 0 &&
          licenses.map((license) => (
            <TableRow key={license.id}>
              <TableCell className="font-medium">{license.id}</TableCell>
              <TableCell>{license.product?.name}</TableCell>
              <TableCell>{license.status}</TableCell>
              <TableCell>{license.product?.maxVolume}</TableCell>
              <TableCell>
                {license.product?.expert?.fileContentUrl ? (
                  <CustomButton
                    action={() =>
                      handleDownload(
                        ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
                          license.product?.expert?.fileContentUrl) as string,
                      )
                    }
                    label="Baixar Conteúdo"
                    color="Action"
                  />
                ) : (
                  <p className="text-blueLight">Sem Arquivo</p>
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
