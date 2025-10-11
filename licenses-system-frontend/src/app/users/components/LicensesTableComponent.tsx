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
import { Expert } from '@/entities/expert.entity'
import { License } from '@/entities/license.entity'
import { handleDownload } from '@/lib/download-util'

export function LicensesTableComponent({ licenses }: { licenses: License[] }) {
  const handler = async (expert:Expert) => {
    try {
      const finalName = expert.fileContentUrl?.split('/').pop() as string
      // Call the backend endpoint to download the file
      const response = await fetch(`/api/download/${expert.id}`,{method:"POST",body:JSON.stringify({name:finalName})});

      if (!response.ok) {
        throw new Error('Error fetching the file');
      }

      // Create a blob from the response data
      const blob = await response.blob();

      // Create a temporary link to trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download =finalName; // Set the download filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

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
                      handler(license.product?.expert as Expert)
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
