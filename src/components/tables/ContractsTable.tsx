/** @format */

import { useEffect, useRef, useState } from 'react'
import {
	Space,
	Button,
	Table,
	TableProps,
	InputRef,
	Input,
	TableColumnType,
	TableColumnsType,
	ConfigProvider,
	Tag,
} from 'antd'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import Column from 'antd/es/table/Column'
import { ContractModel } from '../../models/ContractsModel'
import { fetchContracts } from '../../api/FetchContracts'

type DataIndex = keyof ContractModel

export default function ContractsTable() {
	const [data, setData] = useState<ContractModel[]>([])
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	const searchInput = useRef<InputRef>(null)

	useEffect(() => {
		fetchContracts()
			.then((contract) => {
				setData(contract)
			})
			.catch((erro) => {
				console.error('Deu ruim: ', erro)
			})
	}, [])

	const handleSearch = (
		selectedKeys: string[],
		confirm: FilterDropdownProps['confirm'],
		dataIndex: DataIndex,
	) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}

	const handleReset = (clearFilters: () => void) => {
		clearFilters()
		setSearchText('')
	}

	const onChange: TableProps<ContractModel>['onChange'] = (
		pagination,
		filters,
		sorter,
		extra,
	) => {
		console.log('params', pagination, filters, sorter, extra)
	}

	const getColumnSearchProps = (
		dataIndex: DataIndex,
	): TableColumnType<ContractModel> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}: FilterDropdownProps) => (
			<div
				style={{ padding: 8 }}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(
							selectedKeys as string[],
							confirm,
							dataIndex,
						)
					}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type='primary'
						onClick={() =>
							handleSearch(
								selectedKeys as string[],
								confirm,
								dataIndex,
							)
						}
						icon={<SearchOutlined />}
						size='small'
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() =>
							clearFilters && handleReset(clearFilters)
						}
						size='small'
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							confirm({ closeDropdown: false })
							setSearchText((selectedKeys as string[])[0])
							setSearchedColumn(dataIndex)
						}}
					>
						Filter
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							close()
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined
				style={{ color: filtered ? '#1677ff' : undefined }}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex]!.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: (visible: boolean) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100)
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: '#4ade80',
						padding: 1.5,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	})

	const receiptsTableHeader: TableColumnsType<ContractModel> = [
		{
			title: 'Publicação',
			dataIndex: 'publicacao',
			key: 'publicacao',
			width: 150,
			showSorterTooltip: {
				target: 'full-header',
			},
		},
		{
			title: 'Modalidade',
			dataIndex: 'modalidade',
			key: 'modalidade',
			showSorterTooltip: {
				target: 'full-header',
			},
			filters: [
				{
					text: 'Pregão',
					value: 'Pregão',
				},
				{
					text: 'Dispensa de Licitação',
					value: 'Dispensa de Licitação',
				},
			],
			render: (_, { modalidade }) =>
				modalidade === 'Pregão' ? (
					<Tag
						className='tag-professor'
						key={modalidade}
					>
						{modalidade}
					</Tag>
				) : modalidade === 'Dispensa de Licitação' ? (
					<Tag
						className='tag-ta'
						key={modalidade}
					>
						{modalidade}
					</Tag>
				) : (
					<Tag
						className='tag-outros'
						key={modalidade}
					>
						{modalidade}
					</Tag>
				),
			filterSearch: true,
			onFilter: (value, record) =>
				record.modalidade.includes(value as string),
		},
		// {
		//   title: 'Unidade Gestora',
		//   dataIndex: ['unidadeGestoraResponsavel','nome'],
		//   key: 'unidadeGestoraResponsavel',
		//   width: 170,
		//   // sorter: (a: ContractModel, b: ContractModel) => a.cnpjFornecedor - b.cnpjFornecedor,
		// },
		{
			title: 'Fornecedor',
			dataIndex: 'fornecedor',
			key: 'fornecedor',
			...getColumnSearchProps('fornecedor'),
		},
		{
			title: 'Valor Final',
			dataIndex: 'valorFinal',
			key: 'valorFinal',
			width: 160,
			defaultSortOrder: 'descend',
			sorter: {
				compare: (a: ContractModel, b: ContractModel) =>
					parseFloat(
						a.valorFinal
							.replace('R$ ', '')
							.replace('.', '')
							.replace(',', '.'),
					) -
					parseFloat(
						b.valorFinal
							.replace('R$ ', '')
							.replace('.', '')
							.replace(',', '.'),
					),
			},
		},
	]

	return (
		<ConfigProvider
			theme={{
				components: {
					Table: {
						bodySortBg: 'transparent',
						borderColor: 'transparent',
						headerBg:
							'linear-gradient(to bottom, rgb(96 165 250), rgb(37 99 235))',
						headerSortHoverBg:
							'linear-gradient(to bottom, rgb(96 165 250), rgb(37 99 235))',
						headerSortActiveBg:
							'linear-gradient(to bottom, rgb(96 165 250), rgb(37 99 235))',
						headerColor: 'white',
					},
					Pagination: {
						itemActiveBg: 'rgb(37 99 235)',
						colorPrimary: 'white',
					},
				},
			}}
		>
			<Table
				rowHoverable={false}
				columns={receiptsTableHeader}
				dataSource={data}
				pagination={{
					pageSize: 7,
					align: 'start',
					showSizeChanger: false,
					position: ['bottomRight'],
				}}
				onChange={onChange}
				showSorterTooltip={{
					target: 'sorter-icon',
				}}
				className='data-table'
			>
				<Column
					title='Beneficiário'
					dataIndex='beneficiario'
					key='beneficiario'
				/>
				<Column
					title='Cargo'
					dataIndex='cargo'
					key='cargo'
					render={(tags: string[]) => (
						<>
							{tags.map((tag) => {
								let color =
									tag.length > 5 ? 'geekblue' : 'green'
								if (tag === 'professor') {
									color = 'volcano'
								}
								return (
									<Tag
										color={color}
										key={tag}
									>
										{tag.toUpperCase()}
									</Tag>
								)
							})}
						</>
					)}
				/>
				<Column
					title='Data Início'
					dataIndex='dataInicio'
					key='dataInicio'
				/>
				<Column
					title='Data Fim'
					dataIndex='dataFim'
					key='dataFim'
				/>
				<Column
					title='Valor'
					dataIndex='valor'
					key='valor'
				/>
			</Table>
		</ConfigProvider>
	)
}
