import SummaryCards from '../../components/SummaryCards'
import { ufbaData } from '../../data/ufbaData';

export default function DashSummaryContainer() {
  // const gradCursos =  ufbaData.Cursos.Graduacao.EAD + ufbaData.Cursos.Graduacao.Salvador.Diurno + ufbaData.Cursos.Graduacao.Salvador.Noturno + ufbaData.Cursos.Graduacao.VitoriaDaConquista.Diurno + ufbaData.Cursos.Graduacao.VitoriaDaConquista.Noturno + ufbaData.Cursos.Graduacao.Camaçari.Diurno + ufbaData.Cursos.Graduacao.Camaçari.Noturno;
  // const postGradCursos = ufbaData.Cursos.Doutorado + ufbaData.Cursos.Mestrado;
  const alunos = ufbaData.Matriculas.Graduacao.Salvador.Diurno + ufbaData.Matriculas.Graduacao.Salvador.Noturno + ufbaData.Matriculas.Graduacao.VitoriaDaConquista.Diurno + ufbaData.Matriculas.Graduacao.Camaçari.Diurno + ufbaData.Matriculas.Graduacao.EAD;
  const extensao = ufbaData.Extensao.Programas + ufbaData.Extensao.Projetos + ufbaData.Extensao['Cursos e minicursos'] + ufbaData.Extensao['ACCS'] + ufbaData.Extensao.Outros + ufbaData.Extensao['Prestação de serviços'];

  return (
    <section className='summary-container'>
      <SummaryCards title='Receita' value='R$ 2.007.885.471,13' />
      <SummaryCards title='Alunos' value={Intl.NumberFormat('pt-BR').format(alunos)} />

      <div className='flex flex-row flex-wrap justify-between gap-4'>
      <SummaryCards title='Graduação' value={Intl.NumberFormat('pt-BR').format(36257)} className='w-[45%] justify-between '/>
      <SummaryCards title='Mest. Acad.' value={Intl.NumberFormat('pt-BR').format(ufbaData['Pos-Graduação']['Mestrado Acadêmico']['Matriculas'])} className='w-[45%] justify-between ' />
      <SummaryCards title='Mest. Prof.' value={Intl.NumberFormat('pt-BR').format(ufbaData['Pos-Graduação']['Mestrado Profissional']['Matriculas'])}  className='w-[45%] justify-between '/>
      <SummaryCards title='Doutorado' value={Intl.NumberFormat('pt-BR').format(ufbaData['Pos-Graduação']['Doutorado']['Matriculas'])} className='w-[45%] justify-between ' />
      </div>
      <SummaryCards title='Programas de Extensão' value={Intl.NumberFormat('pt-BR').format(extensao)} />
    </section>
  )
}
