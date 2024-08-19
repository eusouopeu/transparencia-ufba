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
import { fetchTrips } from '../../api/FetchTrips'
import { TripModel } from '../../models/TripsModel'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import Column from 'antd/es/table/Column'

type DataIndex = keyof TripModel

export default function TripTable() {
	const [data, setData] = useState<TripModel[]>([])
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	const searchInput = useRef<InputRef>(null)

	useEffect(() => {
		fetchTrips()
			.then((viagens) => {
				setData(viagens)
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

	const onChange: TableProps<TripModel>['onChange'] = (
		pagination,
		filters,
		sorter,
		extra,
	) => {
		console.log('params', pagination, filters, sorter, extra)
	}

	const getColumnSearchProps = (
		dataIndex: DataIndex,
	): TableColumnType<TripModel> => ({
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
			record[dataIndex]
				.toString()
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

	const receiptsTableHeader: TableColumnsType<TripModel> = [
		{
			title: 'Beneficiario',
			dataIndex: 'beneficiario',
			key: 'beneficiario',
			showSorterTooltip: {
				target: 'full-header',
			},
			...getColumnSearchProps('beneficiario'),
		},
		{
			title: 'Cargo',
			dataIndex: 'cargo',
			key: 'cargo',
			showSorterTooltip: {
				target: 'full-header',
			},
			filters: [
				{
					text: 'Professor',
					value: 'Professor',
				},
				{
					text: 'Tec. Admin.',
					value: 'Gerente',
				},
				{
					text: 'Estagiário',
					value: 'Estagiário',
				},
			],
			render: (_, { cargo }) =>
				cargo === 'Professor' ? (
					<Tag
						className='tag-professor'
						key={cargo}
					>
						{cargo}
					</Tag>
				) : cargo === 'Gerente' ? (
					<Tag
						color='geekblue'
						key={cargo}
					>
						{cargo}
					</Tag>
				) : cargo === 'Estagiário' ? (
					<Tag
						color='green'
						key={cargo}
					>
						{cargo}
					</Tag>
				) : null,
			filterSearch: true,
			onFilter: (value, record) => record.cargo.includes(value as string),
		},
		// {
		//   title: 'Unidade Gestora',
		//   dataIndex: ['unidadeGestoraResponsavel','nome'],
		//   key: 'unidadeGestoraResponsavel',
		//   width: 170,
		//   // sorter: (a: TripModel, b: TripModel) => a.cnpjFornecedor - b.cnpjFornecedor,
		// },
		{
			title: 'Data Início',
			dataIndex: 'dataInicio',
			key: 'dataInicio',
		},
		{
			title: 'Data Fim',
			dataIndex: 'dataFim',
			key: 'dataFim',
		},
		{
			title: 'Valor',
			dataIndex: 'valorTotal',
			key: 'valorTotal',
			width: 140,
			defaultSortOrder: 'descend',
			sorter: {
				compare: (a: TripModel, b: TripModel) =>
					parseFloat(
						a.valorTotal
							.replace('R$ ', '')
							.replace('.', '')
							.replace(',', '.'),
					) -
					parseFloat(
						b.valorTotal
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
					pageSize: 8,
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
