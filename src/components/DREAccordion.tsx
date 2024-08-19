/** @format */
import { Collapse, Typography, List } from 'antd'

const { Panel } = Collapse
const { Text, Title } = Typography

const formatNumber = (value: number) =>
	value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function DREAccordion() {
	const data = {
		title: 'Demonstração de Resultados do Exercício',
		sections: [
			{
				header: 'Recursos do Tesouro',
				panels: [
					{
						header: 'Programa de gestão e manutenção do Poder Executivo / Operações especiais',
						items: [
							{
								primary:
									'Previdência de inativos e pensionistas – Servidores civis',
								secondary: formatNumber(645951872.49),
							},
							{
								primary:
									'Participação em organismos e entidades nacionais e internacionais',
								secondary: formatNumber(139422.58),
							},
							{
								primary:
									'Pessoal, benefícios, capacitação de servidores, custeio do PSS e auxílio-moradia',
								secondary: formatNumber(1000978473.99),
							},
						],
						subPanels: [
							{
								header: 'Operações especiais',
								items: [
									{
										primary:
											'Cumprimento de sentença judicial - Precatórios',
										secondary: formatNumber(0.0),
									},
									{
										primary:
											'Benefícios e pensões indenizatórias/legislação especial e/ou decisões judiciais',
										secondary: formatNumber(29088.0),
									},
									{
										primary:
											'Participação em organismos e entidades nacionais e internacionais',
										secondary: formatNumber(139422.58),
									},
									{
										primary:
											'Pessoal, benefícios, capacitação de servidores, custeio do PSS e auxílio-moradia',
										secondary: formatNumber(1000978473.99),
									},
								],
							},
						],
					},
					{
						header: 'Educação superior',
						items: [
							{
								primary:
									'Assistência ao estudante de ensino superior',
								secondary: formatNumber(37037933.42),
							},
						],
						subPanels: [
							{
								header: 'Fomento às ações de graduação, pós-graduação, ensino, pesquisa e extensão',
								items: [
									{
										primary: 'Corrente/Custeio',
										secondary: formatNumber(4642926.59),
									},
									{
										primary: 'Capital/Investimento',
										secondary: formatNumber(1849947.03),
									},
									{
										primary:
											'Emendas parlamentares individuais',
										secondary: formatNumber(400000.0),
									},
								],
							},
							{
								header: 'Funcionamento das Universidades Federais',
								items: [
									{
										primary: 'Corrente/Custeio',
										secondary: formatNumber(70602415.86),
									},
									{
										primary: 'Capital/Investimento',
										secondary: formatNumber(3334997.6),
									},
									{
										primary:
											'Emendas parlamentares individuais',
										secondary: formatNumber(149927.0),
									},
								],
							},
							{
								header: 'Reuni (Programa de Reestruturação e Expansão das Universidades Federais)',
								items: [
									{
										primary: 'Corrente/Custeio',
										secondary: formatNumber(20048568.0),
									},
									{
										primary: 'Capital/Investimento',
										secondary: formatNumber(5399791.01),
									},
									{
										primary:
											'Emendas parlamentares individuais',
										secondary: formatNumber(699812.56),
									},
								],
							},
						],
					},
				],
			},
			{
				header: 'Recursos próprios',
				items: [
					{
						primary: 'Recursos próprios',
						secondary: formatNumber(14766469.65),
					},
				],
			},
			{
				header: 'Recursos de convênios / descentralizações',
				items: [
					{
						primary: 'Recursos de convênios / descentralizações',
						secondary: formatNumber(14766469.65),
					},
				],
			},
			{
				header: 'Recursos FNS/SUS',
				items: [
					{
						primary: 'Recursos FNS/SUS',
						secondary: formatNumber(14766469.65),
					},
				],
			},
		],
	}

	return (
		<section className='flex flex-col w-[360px] h-fit'>

				{data.sections.map((section, index) => (
            <Collapse
							className='collapsable'
						>
							<Panel
								header={
									<Title level={4} style={{ color: 'white' }}>
										{section.header}
									</Title>
								}
              key={`section-${index}`}
							>
								{section.panels
									? section.panels.map(
											(panel, panelIndex) => (
												<Collapse
													key={`panel-${panelIndex}`}
                        bordered={false}
                        expandIconPosition='start'
                        ghost={true}
												>
													<Panel
                          header={
                            <Text className='font-bold text-base text-blue-800' >
                              { panel.header }
                            </Text>
                          }
														key={`panel-header-${panelIndex}`}
													>
														<List
															size='small'
															bordered={false}
														>
															{panel.items.map(
																(
																	item,
																	itemIndex,
																) => (
																	<List.Item
																		key={
																			itemIndex
																		}
																	>
																			<Text className='font-bold'>
																				{
																					item.primary
																				}
																			</Text>
																			<Text className='italic'>
																				{
																					item.secondary
																				}
																			</Text>
																	</List.Item>
																),
															)}
															{panel.subPanels &&
																panel.subPanels.map(
																	(
																		subPanel,
																		subPanelIndex,
																	) => (
																		<Collapse
																			key={`sub-panel-${subPanelIndex}`}
                                      ghost={true}
																			expandIconPosition='end'
																		>
																			<Panel
                                        header={
                                          <Text className='font-bold'>
                                            {subPanel.header}
                                          </Text>
																				}
																				key={`sub-panel-header-${subPanelIndex}`}
																			>
																				<List size='small'>
																					{subPanel.items.map(
																						(
																							subItem,
																							subItemIndex,
																						) => (
																							<List.Item
																								key={
																									subItemIndex
																								}
																							>
																									<Text className='font-bold text-zinc-600'>
																										{
																											subItem.primary
																										}
																									</Text>
																									<Text className='italic'>
																										{
																											subItem.secondary
																										}
																									</Text>
																							</List.Item>
																						),
																					)}
																				</List>
																			</Panel>
																		</Collapse>
																	),
																)}
														</List>
													</Panel>
												</Collapse>
											),
									  )
									: section.items.map((item, itemIndex) => (
											<List.Item key={itemIndex}>
													<Text className='font-bold'>{item.primary}</Text>
													<Text className='italic'>
														{item.secondary}
													</Text>
											</List.Item>
									  ))}
							</Panel>
						</Collapse>
				))}

		</section>
	)
}
