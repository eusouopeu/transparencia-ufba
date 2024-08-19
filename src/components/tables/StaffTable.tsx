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
import { StaffModel } from '../services/models/StaffModel'
import { staffData } from '../data/staffData'

type DataIndex = keyof StaffModel

export default function StaffTable() {
	const [data, setData] = useState<StaffModel[]>([])
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	const searchInput = useRef<InputRef>(null)

	useEffect(() => {
		setData(
			staffData.map((item) => ({
				id: item.id,
				nome: item.nome.toLowerCase(),
				cargo: item.cargo.toUpperCase().includes('PROFESSOR')
					? 'Professor'
					: item.cargo.toUpperCase().includes('ASSISTENTE')
					? 'Tec. Admin.'
					: 'Outro',
				unidade: item.uorgExercicio.toLowerCase(),
				admissao: item.dataIngressoCargo,
				salario: `R$ ${item.remuneracaoBasicaBruta}`,
			})),
		)
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

	const onChange: TableProps<StaffModel>['onChange'] = (
		pagination,
		filters,
		sorter,
		extra,
	) => {
		console.log('params', pagination, filters, sorter, extra)
	}

	const getColumnSearchProps = (
		dataIndex: DataIndex,
	): TableColumnType<StaffModel> => ({
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

	const receiptsTableHeader: TableColumnsType<StaffModel> = [
		{
			title: 'Nome',
			dataIndex: 'nome',
			key: 'nome',
			width: 300,
			showSorterTooltip: {
				target: 'full-header',
			},
			...getColumnSearchProps('admissao'),
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
					value: 'Tec. Admin.',
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
				) : cargo === 'Tec. Admin.' ? (
					<Tag
						className='tag-ta'
						key={cargo}
					>
						{cargo}
					</Tag>
				) : (
					<Tag
						className='tag-outros'
						key={cargo}
					>
						{cargo}
					</Tag>
				),
			filterSearch: true,
			onFilter: (value, record) => record.cargo.includes(value as string),
		},
		{
			title: 'Unidade',
			dataIndex: 'unidade',
			key: 'unidade',
			width: 300,
			showSorterTooltip: {
				target: 'full-header',
			},
			filters: [
				{
					text: 'Administração',
					value: 'Administração',
				},
				{
					text: 'Medicina',
					value: 'Medicina',
				},
			],
			// render: (_, { unidade }) => (
			//   unidade.includes('Administração')
			//     ? <Tag className='tag-professor text-x' key={unidade}>
			//       {unidade}
			//     </Tag>
			//     : unidade.includes('Medicina') ?
			//     <Tag className='tag-ta' key={unidade}>
			//       {unidade}
			//     </Tag> : <Tag className='tag-outros' key={unidade}>
			//       {unidade}
			//     </Tag>
			// ),
			filterSearch: true,
			onFilter: (value, record) =>
				record.unidade.includes(value as string),
		},
		{
			title: 'Admissão',
			dataIndex: 'admissao',
			key: 'admissao',
			width: 160,
		},
		{
			title: 'Salário',
			dataIndex: 'salario',
			key: 'salario',
			width: 180,
			defaultSortOrder: 'descend',
			sorter: {
				compare: (a: StaffModel, b: StaffModel) =>
					parseFloat(
						a.salario
							.replace('R$ ', '')
							.replace('.', '')
							.replace(',', '.'),
					) -
					parseFloat(
						b.salario
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
						headerSplitColor: 'white',
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
					pageSize: 5,
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
			{/* <Column title='Beneficiário' dataIndex='beneficiario' key='beneficiario' />
        <Column
          title="Cargo"
          dataIndex="cargo"
          key="cargo"
          render={(tags: string[]) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'professor') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          )}
        />
          <Column title='Data Início' dataIndex='dataInicio' key='dataInicio' />
          <Column title='Data Fim' dataIndex='dataFim' key='dataFim' />
          <Column title='Valor' dataIndex='valor' key='valor' />
      </Table> */}
		</ConfigProvider>
	)
}
