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
} from 'antd'
import { fetchCreditExtract } from '../services/api/FetchCreditExtract'
import { CreditExtractModel } from '../services/models/CreditExtractModel'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'

type DataIndex = keyof CreditExtractModel

export default function CreditExtractTable() {
	const [data, setData] = useState<CreditExtractModel[]>([])
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	const searchInput = useRef<InputRef>(null)

	useEffect(() => {
		fetchCreditExtract()
			.then((extrato) => {
				setData(extrato)
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

	const onChange: TableProps<CreditExtractModel>['onChange'] = (
		pagination,
		filters,
		sorter,
		extra,
	) => {
		console.log('params', pagination, filters, sorter, extra)
	}

	const getColumnSearchProps = (
		dataIndex: DataIndex,
	): TableColumnType<CreditExtractModel> => ({
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

	const receiptsTableHeader: TableColumnsType<CreditExtractModel> = [
		{
			title: 'Estabelecimento',
			dataIndex: 'estabelecimento',
			key: 'estabelecimento',
			showSorterTooltip: {
				target: 'full-header',
			},
			...getColumnSearchProps('estabelecimento'),
		},
		// {
		//   title: 'Unidade Gestora',
		//   dataIndex: ['unidadeGestoraResponsavel','nome'],
		//   key: 'unidadeGestoraResponsavel',
		//   width: 170,
		//   // sorter: (a: CreditExtractModel, b: CreditExtractModel) => a.cnpjFornecedor - b.cnpjFornecedor,
		// },
		{
			title: 'CNPJ',
			dataIndex: 'cnpj',
			key: 'cnpj',
			width: 260,
		},
		{
			title: 'Data',
			dataIndex: 'data',
			key: 'data',
			width: 140,
		},
		{
			title: 'Valor',
			dataIndex: 'valor',
			key: 'valor',
			width: 160,
			defaultSortOrder: 'descend',
			sorter: {
				compare: (a: CreditExtractModel, b: CreditExtractModel) =>
					parseFloat(
						a.valor
							.replace('R$ ', '')
							.replace('.', '')
							.replace(',', '.'),
					) -
					parseFloat(
						b.valor
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
					pageSize: 6,
					align: 'start',
					showSizeChanger: false,
					position: ['bottomRight'],
				}}
				onChange={onChange}
				showSorterTooltip={{
					target: 'sorter-icon',
				}}
				className='data-table'
			/>
		</ConfigProvider>
	)
}
