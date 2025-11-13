'use client'
import user from '@/../public/images/u2.png'
import product from '@/../public/images/p2.png'
import copy from '@/../public/images/c2.png'
import licenses from '@/../public/images/l2.png'
import expert1 from '@/../public/images/r2.png'
import expert2 from '@/../public/images/r3.png'
import partners from '@/../public/images/pa1.png'
import del from '@/../public/images/del.png'
import del2 from '@/../public/images/del2.png'
import rar2 from '@/../public/images/rar2.png'
import rar1 from '@/../public/images/rar1.png'
import rar3 from '@/../public/images/rar3.png'
import edit from '@/../public/images/edit.png'
import up from '@/../public/images/up.png'
import last1 from '@/../public/images/last1.png'
import last2 from '@/../public/images/last2.png'
import last3 from '@/../public/images/last3.png'
import last4 from '@/../public/images/last4.png'
import last5 from '@/../public/images/last5.png'
import last6 from '@/../public/images/last6.png'
import last7 from '@/../public/images/last7.png'
import last8 from '@/../public/images/last8.png'
import last9 from '@/../public/images/last9.png'
import last10 from '@/../public/images/last10.png'
import last11 from '@/../public/images/last11.png'

import Image from 'next/image'
import CustomButton from '@/components/shared/buttons/CustomButton'
export default function TutorialPage() {
  const handleDownloadHTML = () => {
    const element = document.createElement('a')
    const file = new Blob([document.documentElement.outerHTML], {
      type: 'text/html',
    })
    element.href = URL.createObjectURL(file)
    element.download = 'guia-painel-admin.html'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleDownloadPDF = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto p-6 max-w-5xl">
        {/* Header */}
        <header className="mb-6 border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl flex items-center justify-start  gap-x-4 w-full font-bold text-gray-900">
              <CustomButton
                label="Voltar"
                color="Action"
                css="w-fit"
                href="/admin/dashboard"
              />
              Guia do Painel Administrativo
            </h1>
            <p className="text-gray-600 mt-2">
              Manual passo a passo com espaços reservados para imagens — pronto
              para transformar em tutorial visual ou PDF.
            </p>
          </div>

          {/* Botões de exportação */}
          <div className="mt-4 sm:mt-0 flex gap-3 lg:w-1/6">
            <button
              onClick={handleDownloadPDF}
              className=" cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg w-full shadow hover:bg-indigo-700 transition"
            >
              📄 Baixar PDF
            </button>
          </div>
        </header>

        {/* Conteúdo */}
        <main className="prose prose-gray max-w-none">
          {/* Usuários */}
          <section
            id="usuarios"
            className="bg-white p-6 rounded-xl shadow mb-6"
          >
            <h2>👤 Usuários</h2>

            <h3>➕ Adicionar Usuário</h3>
            <ul>
              <li>Clique no botão “Adicionar Usuário”.</li>
              <li>Preencha os campos com as informações necessárias.</li>
              <li>Clique em “Criar”.</li>
            </ul>
            <figure className="mt-4 space-y-3 flex flex-col items-center">
              <Image
                src={user}
                alt="user"
                width={800}
                height={600}
                className="rounded-xl "
              />
            </figure>
            <h3 className="pt-3">🗑️ Excluir Usuário</h3>
            <ul>
              <li>
                Clique nos <strong>três pontos</strong> abaixo da coluna
                <em> Ações</em>.
              </li>
              <li>Selecione “Excluir Usuário”.</li>
            </ul>

            <figure className="mt-4 space-y-3 flex flex-col items-center">
              <Image
                src={del2}
                alt="del2"
                width={800}
                height={600}
                className="rounded-xl "
              />
            </figure>
          </section>

          {/* Robôs */}
          <section id="robos" className="bg-white p-6 rounded-xl shadow mb-6">
            <h2>🤖 Robôs</h2>

            <h3>➕ Criar Robô</h3>
            <ul>
              <li>Clique no botão “Criar Robô”.</li>
              <li>Preencha os dados solicitados.</li>
              <li>Clique em “Criar”.</li>
            </ul>
            <figure className="mt-4 space-y-3 flex flex-col items-center pb-3">
              <Image
                src={expert1}
                alt="expert1"
                width={800}
                height={600}
                className="rounded-xl "
              />
              <Image
                src={expert2}
                alt="expert2"
                width={800}
                height={600}
                className="rounded-xl "
              />
            </figure>
            <h3>✏️ Editar Robô</h3>
            <ul>
              <li>
                Arraste a tabela para a direita até encontrar o botão “Editar”.
              </li>
              <li>Altere os dados e confirme.</li>
            </ul>
            <figure className="mt-4 space-y-3 flex flex-col items-center pb-3">
              <Image
                src={edit}
                alt="edit"
                width={800}
                height={600}
                className="rounded-xl "
              />
            </figure>
            <h3>🗑️ Deletar Robô</h3>
            <ul>
              <li>
                Arraste a tabela para a direita até encontrar o botão “Deletar”.
              </li>
              <li>Clique em “Deletar”.</li>
            </ul>
            <figure className="mt-4 space-y-3 flex flex-col items-center pb-3">
              <Image
                src={del}
                alt="del"
                width={800}
                height={600}
                className="rounded-xl "
              />
            </figure>
            <h3>📁 Enviar/Alterar Arquivo</h3>
            <p>
              Ao arrastar a tabela para a direita, você verá um de dois botões:
              “Nenhum arquivo” ou “Alterar arquivo”.
            </p>
            <ul>
              <li>
                Se aparecer “Nenhum arquivo”, clique e selecione o arquivo.
              </li>
              <li>Se aparecer “Alterar arquivo”, substitua o atual.</li>
            </ul>
            <figure className="mt-4 space-y-3 flex flex-col items-center pb-3">
              <Image
                src={up}
                alt="up"
                width={800}
                height={600}
                className="rounded-xl "
              />
            </figure>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 rounded">
              ⚠️ <strong>Atenção:</strong> o sistema aceita apenas arquivos
              <code>.zip</code> ou <code>.rar</code>.
            </div>

            <h4 className="mt-4">Como criar um arquivo ZIP/RAR</h4>
            <ol className="list-decimal ml-6">
              <li>Crie uma pasta e copie os arquivos.</li>
              <li>Selecione todos com Ctrl.</li>
              <li>Botão direito → “Adicionar para o arquivo...”.</li>
              <li>Informe o nome e clique em OK.</li>
            </ol>

            <figure className="mt-4 space-y-3 flex flex-col items-center">
              <Image
                src={rar2}
                alt="rar2"
                width={800}
                height={600}
                className="rounded-xl "
              />
              <Image
                src={rar1}
                alt="rar1"
                width={800}
                height={600}
                className="rounded-xl "
              />
              <Image
                src={rar3}
                alt="rar3"
                width={800}
                height={600}
                className="rounded-xl "
              />
            </figure>
          </section>

          {/* Produto */}
          <section id="produto" className="bg-white p-6 rounded-xl shadow mb-6">
            <h2>🛍️ Produto</h2>
            <h3>➕ Criar Produto</h3>
            <ul>
              <li>Clique em “Criar Produto”.</li>
              <li>Preencha os campos necessários.</li>
              <li>
                * O ID do Expert você copia da coluna Id da tabela na aba Robôs.
              </li>
              <li>Clique em “Criar”.</li>
            </ul>
            <figure className="mt-4 space-y-3 flex flex-col items-center">
              <Image
                src={product}
                alt="product"
                width={800}
                height={600}
                className="rounded-xl "
              />
            </figure>
            <h3>🗑️ Excluir Produto</h3>
            <ul>
              <li>
                Clique nos três pontos em Ações e selecione “Excluir Produto”.
              </li>
            </ul>
            <figure className="mt-4 space-y-3 flex flex-col items-center">
              <Image
                src={del2}
                alt="del2"
                width={800}
                height={600}
                className="rounded-xl "
              />
            </figure>
          </section>

          {/* Licença */}
          <section id="licenca" className="bg-white p-6 rounded-xl shadow mb-6">
            <h2>🔐 Licença</h2>
            <ul>
              <li>
                Clique em “Criar Licença”, preencha os dados e clique em
                “Criar”.
              </li>
              <li>
                * O ID do Usuário você copia da coluna Id da tabela na aba
                Usuário.
              </li>
              <li>
                * O ID do Produtos você copia da coluna Id da tabela na aba
                Produtos.
              </li>
              <li>
                Para excluir: arraste a tabela, localize “Deletar” e clique.
              </li>
            </ul>
            <figure className="mt-4 space-y-3 flex flex-col items-center">
              <Image
                src={licenses}
                alt="licenses"
                width={800}
                height={600}
                className="rounded-xl "
              />
              <Image
                src={del}
                alt="del"
                width={800}
                height={600}
                className="rounded-xl "
              />
            </figure>
          </section>

          {/* Copy */}
          <section id="copy" className="bg-white p-6 rounded-xl shadow mb-6">
            <h2>🔄 Copy</h2>
            <ul>
              <li>Clique em “Criar Copy” e preencha os dados.</li>
              <li>Para editar, arraste e clique em “Editar”.</li>
              <li>Para deletar, clique em “Deletar”.</li>
            </ul>
            <figure className="mt-4 space-y-3 flex flex-col items-center">
              <Image
                src={copy}
                alt="copy"
                width={800}
                height={600}
                className="rounded-xl "
              />
            </figure>
          </section>

          {/* Vendas */}
          <section id="vendas" className="bg-white p-6 rounded-xl shadow mb-6">
            <h2>💰 Vendas</h2>
            <p>
              As vendas são populadas automaticamente conforme integração com o{' '}
              <strong>Last Link</strong>.
            </p>
          </section>

          {/* Parceiros */}
          <section
            id="parceiros"
            className="bg-white p-6 rounded-xl shadow mb-6"
          >
            <h2>🤝 Parceiros</h2>
            <ul>
              <li>Preencha os campos, incluindo imagem.</li>
              <li>Clique em “Adicionar Parceiro”.</li>
              <li>Para excluir, pressione “Excluir”.</li>
            </ul>
            <figure className="mt-4 space-y-3 flex flex-col items-center">
              <Image
                src={partners}
                alt="partners"
                width={800}
                height={600}
                className="rounded-xl "
              />
            </figure>
          </section>
        </main>

        {/* Rodapé */}
        <footer className="text-center text-gray-500 text-sm mt-8 pt-6 border-t"></footer>
      </div>
      {/*  */}

      {/* Integração com Last Link */}
      <div className="container mx-auto p-6 max-w-5xl">
        {/* Integração com Last Link */}
        <h2 className="lg:text-3xl text-xl font-medium">
          📡 Integração com Last Link
        </h2>

        {/* <p className="text-gray-700 mt-2">
          O painel administrativo se conecta automaticamente à sua conta do{' '}
          <strong>Last Link</strong> para importar dados de vendas, afiliados e
          produtos, além de configurar o <strong>checkout</strong> e os{' '}
          <strong>webhooks</strong> de atualização em tempo real.
        </p>

        <h3 className="mt-4">🔑 Obter as Credenciais e Dados Necessários</h3>
        <ol className="list-decimal ml-6 text-gray-700 space-y-1">
          <li>
            Acesse o site do{' '}
            <a
              href="https://lastlink.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Last Link
            </a>{' '}
            e entre na sua conta.
          </li>
          <li>
            No menu lateral, vá até{' '}
            <strong>Configurações → Integrações → API</strong>.
          </li>
          <li>
            Copie as seguintes informações:
            <ul className="list-disc ml-6 mt-2">
              <li>
                <code>Link para Checkout</code> — URL da sua página de
                pagamento.
              </li>
              <li>
                <code>Nome Last Link</code> — nome de identificação da sua
                conta.
              </li>
              <li>
                <code>Token do WebHook</code> — usado para receber notificações
                automáticas de vendas e status.
              </li>
            </ul>
          </li>
        </ol>

        <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-4 rounded">
          ✅ <strong>Dica:</strong> após conectar, as vendas e produtos serão
          sincronizados automaticamente a cada <strong>15 minutos</strong>. Você
          também pode testar o <strong>Webhook</strong> clicando em “Enviar
          Teste” no painel do Last Link.
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4 rounded">
          ⚠️ <strong>Atenção:</strong> nunca compartilhe suas credenciais de API
          ou o <code>Token do WebHook</code>. Eles concedem acesso total aos
          seus dados de vendas e afiliados.
        </div> */}
        <div className="flex flex-col items-center gap-y-8 w-full py-8">
          <h1 className="text-2xl font-medium text-start">
            Pegar o Token e Nome
          </h1>
          <Image
            alt="lastLink"
            src={last1}
            width={800}
            height={600}
            className="rounded-xl"
          />
          <Image
            alt="lastLink"
            src={last2}
            width={800}
            height={600}
            className="rounded-xl"
          />
          <Image
            alt="lastLink"
            src={last3}
            width={800}
            height={600}
            className="rounded-xl"
          />
          <Image
            alt="lastLink"
            src={last4}
            width={800}
            height={600}
            className="rounded-xl"
          />
          <Image
            alt="lastLink"
            src={last5}
            width={800}
            height={600}
            className="rounded-xl"
          />
          <Image
            alt="lastLink"
            src={last7}
            width={800}
            height={600}
            className="rounded-xl"
          />
          <Image
            alt="lastLink"
            src={last8}
            width={800}
            height={600}
            className="rounded-xl"
          />
          <h1 className="text-2xl font-medium text-start">Pegar os Links</h1>
          <Image
            alt="lastLink"
            src={last9}
            width={800}
            height={600}
            className="rounded-xl"
          />
          <Image
            alt="lastLink"
            src={last10}
            width={800}
            height={600}
            className="rounded-xl"
          />
          <Image
            alt="lastLink"
            src={last11}
            width={800}
            height={600}
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  )
}
