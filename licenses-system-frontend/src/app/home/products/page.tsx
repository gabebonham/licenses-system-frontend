import ViewProducts from '../components/ViewProducts'

export default function ProductsPage() {
  return (
    <section className="w-full flex flex-col items-center pt-20 ">
      <h1 className="text-5xl py-12">Produtos</h1>
      <ViewProducts />
    </section>
  )
}
