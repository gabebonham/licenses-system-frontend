import { Expert } from '../expert.entity'
import { productMocks } from './product.mock'

export const expertMocks: Expert[] = [
  {
    id: 'exp-001',
    name: 'Robozao Cabuloso',
    status: 'pending',
    description:
      'O H4 B3 WIN é um sistema de automação profissional desenvolvido para transformar estratégias de trading em resultados consistentes. Baseado em algoritmos de alta precisão e gestão de risco inteligente, o H4 atua 100% de forma autônoma, identificando oportunidades e executando operações com eficiência milimétrica — mesmo quando você está offline. Criado para diferentes perfis de investidores, o H4 oferece três planos sob medida (Basic, Pro e Premium), permitindo que cada trader escale seus lucros conforme seu capital e objetivo. Desde quem está começando no mercado até quem busca performance institucional, o H4 entrega velocidade, consistência e controle total.',
    initDate: '2024-01-10',
    magicNumber: 'H4B3WIN',
    caracteristics:
      'Gestão de risco profissional — protege o capital e maximiza o retorno.,Execução instantânea e precisa — elimina falhas humanas e oportunidades perdidas.,Transparência total — relatórios claros e métricas de performance em tempo real.',
    ratings: [],

    first: true,
    imgUrl: '/images/experts/robozao.png',
    fileContentUrl: '/files/robozao.pdf',
    products: productMocks,
    trades: [{}],
    performances: [{}],
  },
  {
    id: 'exp-002',
    name: 'Crypto Master 2.0',
    status: 'success',
    description:
      'O Crypto Master 2.0 é um sistema avançado de automação focado em criptomoedas. Utiliza aprendizado de máquina e análise de volatilidade para identificar padrões lucrativos e otimizar entradas e saídas. Desenvolvido para quem busca oportunidades 24/7, o bot monitora o mercado global de cripto e executa estratégias com precisão de milissegundos.',
    initDate: '2024-03-22',
    magicNumber: 'CRYPTO20',
    caracteristics:
      'Aprendizado de máquina — ajusta a estratégia conforme o comportamento do mercado.,Gestão automática de risco — calibra posições conforme a volatilidade.,Compatibilidade com múltiplas corretoras — flexibilidade total para o trader.',
    ratings: [],
    first: false,
    imgUrl: '/images/experts/crypto-master.png',
    fileContentUrl: '/files/crypto-master.pdf',
    products: productMocks,
    trades: [{}],
    performances: [{}],
  },
  {
    id: 'exp-003',
    name: 'Scalper X Turbo',
    status: 'failed',
    description:
      'O Scalper X Turbo é projetado para traders agressivos que buscam lucros rápidos em operações curtas. Equipado com lógica adaptativa e execução ultrarrápida, o sistema aproveita microvariações do mercado com controle de drawdown rigoroso e performance ajustável em tempo real.',
    initDate: '2024-06-05',
    magicNumber: 'SCLPXTB',
    caracteristics:
      'Execução em milissegundos — ideal para scalping.,Controle de drawdown em tempo real — protege o capital durante volatilidades.,Otimização automática — ajusta parâmetros com base no desempenho histórico.',
    ratings: [],

    first: false,
    imgUrl: '/images/experts/scalper-x.png',
    fileContentUrl: '/files/scalper-x.pdf',
    products: productMocks,
    trades: [{}],
    performances: [{}],
  },
]
