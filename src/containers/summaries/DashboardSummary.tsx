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
      <SummaryCards title='Alunos' value={formatNumber(alunos, 'pt-BR')} />

      <div className='flex flex-row flex-wrap justify-between gap-4'>
      <SummaryCards title='Graduação' value={formatNumber(36257, 'pt-BR')} className='w-[45%] justify-between '/>
      <SummaryCards title='Mest. Acad.' value={formatNumber(ufbaData['Pos-Graduação']['Mestrado Acadêmico']['Matriculas'], 'pt-BR')} className='w-[45%] justify-between ' />
      <SummaryCards title='Mest. Prof.' value={formatNumber(ufbaData['Pos-Graduação']['Mestrado Profissional']['Matriculas'], 'pt-BR')}  className='w-[45%] justify-between '/>
      <SummaryCards title='Doutorado' value={formatNumber(ufbaData['Pos-Graduação']['Doutorado']['Matriculas'], 'pt-BR')} className='w-[45%] justify-between ' />
      </div>
      <SummaryCards title='Programas de Extensão' value={formatNumber(extensao, 'pt-BR')} />
    </section>
  )
}
