import React from 'react'
import * as kt from '../key-tree'
import styles from './table.module.scss'

type Node = kt.Node<any>
const Node = kt.Node<any>

export default class IndexPage extends React.Component {
    public render() {
        return (
            <>
                <Table
                    title={`test case runs`}
                    elements={[
                        { a : 1, b : 2 },
                        { a : 3, b : 1 },
                        { a : 2, b : 3 },
                        // { a : 1 },
                        // { b : 2 },
                        // { a : 1, b : 2 },
                        // { b : { x : 3, y : 4 } },
                    ]}
                />
                <Matrix
                    caption = {`test case runs`}
                    columns = {[
                        { name : `test suite #1`, status : `pass`, KPI : { a : 0.1, b : 0.2 } },
                        { name : `test suite #2`, status : `fail`, KPI : { a : 0.3, b : 0.4 } },
                    ]}
                    rows    = {[
                        { name : `text case #1`, data : { input : 1, reference : 1 } },
                        { name : `text case #2`, data : { input : 2, reference : 2 } },
                        { name : `text case #3`, data : { input : 3, reference : 3 } },
                    ]}
                    cells   = {[
                        [
                            { output : 1, status : `pass` },
                            { output : 2, status : `pass` },
                            { output : 3, status : `pass` },
                        ],
                        [
                            { output : 3, status : `pass` },
                            { status : `fail` },
                            { output : 2, status : `pass` },
                        ],
                    ]}
                />
            </>
        )

        // return (
        //     <table className={styles.table}>
        //         <caption>
        //             Test Case Runs (4)
        //         </caption>
        //         <colgroup>
        //             <col span={2}/>
        //             <col span={2} style={{ backgroundColor : `rgb(255, 240, 240)` }}/>
        //             <col span={2} style={{ backgroundColor : `rgb(240, 255, 240)` }}/>
        //             <col span={2} style={{ backgroundColor : `rgb(240, 240, 255)` }}/>
        //         </colgroup>
        //         <thead>
        //             <tr>
        //                 <th rowSpan={3}>Test Suite Run</th>
        //                 <th>Name</th>
        //                 <td colSpan={2}>Test Suite Run #1</td>
        //                 <td colSpan={2}>Test Suite Run #2</td>
        //                 <td colSpan={2}>Test Suite Run #3</td>
        //             </tr>
        //             <tr>
        //                 <th>Date</th>
        //                 <td colSpan={2}>2023/01/01</td>
        //                 <td colSpan={2}>2023/01/02</td>
        //                 <td colSpan={2}>2023/01/03</td>
        //             </tr>
        //             <tr>
        //                 <th>Status</th>
        //                 <td colSpan={2}>FAIL</td>
        //                 <td colSpan={2}>PASS</td>
        //                 <td colSpan={2}>PASS</td>
        //             </tr>
        //         </thead>
        //         <thead>
        //             <tr>
        //                 <th colSpan={2}>Test Case</th>
        //                 <th colSpan={6}>Test Case Run</th>
        //                 {/* <th rowSpan={2}>Status</th>
        //                 <th rowSpan={2}>Actual</th>
        //                 <th rowSpan={2}>Status</th>
        //                 <th rowSpan={2}>Actual</th>
        //                 <th rowSpan={2}>Status</th>
        //                 <th rowSpan={2}>Actual</th> */}
        //             </tr>
        //             <tr>
        //                 <th rowSpan={1}>Name</th>
        //                 <th rowSpan={1}>Expected</th>
        //                 {/* <th colSpan={2}>Test Suite Run #1</th>
        //                 <th colSpan={2}>Test Suite Run #2</th>
        //                 <th colSpan={2}>Test Suite Run #3</th> */}
        //                 <th>Status</th>
        //                 <th>Actual</th>
        //                 <th>Status</th>
        //                 <th>Actual</th>
        //                 <th>Status</th>
        //                 <th>Actual</th>
        //             </tr>
        //             {/* <tr>
        //                 <th>Status</th>
        //                 <th>Actual</th>
        //                 <th>Status</th>
        //                 <th>Actual</th>
        //                 <th>Status</th>
        //                 <th>Actual</th>
        //             </tr> */}
        //         </thead>
        //         <tbody>
        //             <tr>
        //                 <td>test case #1</td>
        //                 <td>101</td>
        //                 <td>pass</td>
        //                 <td>101</td>
        //                 <td>pass</td>
        //                 <td>101</td>
        //                 <td>pass</td>
        //                 <td>101</td>
        //             </tr>
        //             <tr>
        //                 <td>test case #2</td>
        //                 <td>102</td>
        //                 <td>fail</td>
        //                 <td>101</td>
        //                 <td>pass</td>
        //                 <td>102</td>
        //                 <td>pass</td>
        //                 <td>102</td>
        //             </tr>
        //             <tr>
        //                 <td>test case #3</td>
        //                 <td>103</td>
        //                 <td>pass</td>
        //                 <td>103</td>
        //                 <td>pass</td>
        //                 <td>103</td>
        //                 <td>pass</td>
        //                 <td>103</td>
        //             </tr>
        //             <tr>
        //                 <td>test case #4</td>
        //                 <td>104</td>
        //                 <td>pass</td>
        //                 <td>104</td>
        //                 <td>pass</td>
        //                 <td>104</td>
        //                 <td>pass</td>
        //                 <td>104</td>
        //             </tr>
        //         </tbody>
        //         {/* <tfoot>
        //             <tr>
        //                 <th colSpan={2}>mean</th>
        //                 <td>pass</td>
        //                 <td>102</td>
        //             </tr>
        //             <tr>
        //                 <th colSpan={2}>median</th>
        //             </tr>
        //         </tfoot> */}
        //     </table>
        // )
    }
}

type TableProps<Element> = {
    title?   : React.ReactNode
    elements : Element[]
}
type TableState = {
    rows        : Node[]
    header      : Node | null,
    indices     : number[]
    sort_header : Node | null,
    sort_order  : boolean,
}

class Table<Element> extends React.Component<TableProps<Element>, TableState> {
    private static state<Element>(props : TableProps<Element>) : TableState {
        const rows = props.elements
            .map(x => Node.from_object(x))
            .filter((x) : x is Node => !!x)
        const header = rows
            .reduce<Node | null>((a, x) => a ? a.merge(x) : x, null)
        const indices = props.elements
            .map((_, i) => i)

        return { rows, header, indices, sort_header : null, sort_order : false }
    }

    public state : TableState = Table.state(this.props)

    private sort = (sort_header : Node, sort_order : boolean) => () => {
        const { state } = this
        const order_factor = sort_order ? +1 : -1
        const indices = state.indices
            .map(i => {
                let node = (state.rows[i] || null) as Node | null

                if (node) node = sort_header.trace(node)

                return [ i, node ] as const
            })
            .sort(([ _, a ], [ __, b ]) => compare(a, b) * order_factor)
            .map(([ i ]) => i)

        this.setState({ indices, sort_header, sort_order })
    }

    public render() {
        const {
            props : { title },
            state : { rows, header, indices, sort_header, sort_order },
            sort,
        } = this

        return (
            <table className={styles.table}>
                {title && <caption>
                    {title}
                </caption>}
                {header && <thead>
                    {(function iterate(node : Node | null, i = 0) : React.ReactNode[] {
                        return node ? [
                            <tr key={`header-${i}`}>
                                {[ node, ...node.all_next ].map((node, j) =>
                                    <th
                                        key={`header-${i}-${j}`}
                                        colSpan={node.spread}
                                        rowSpan={node.empty ? node.root.max_depth - node.depth + 1 : 1}
                                    >
                                        {node.key}
                                        <button onClick={sort(node, node === sort_header ? !sort_order : sort_order)}>
                                            {sort_order ? `↑` : `↓`}
                                        </button>
                                    </th>
                                )}
                            </tr>,
                            ...iterate(node.depth_first, i + 1)
                        ] : []
                    })(header).slice(0)}
                </thead>}
                {header && <tbody>
                    {indices
                    .map(i => rows[i])
                    .map((row, i) =>
                        header.as_tr_match(row, `body-row-${i}`)
                    )}
                </tbody>}
            </table>
        )
    }
}

type MatrixProps<Row, Column, Cell> = {
    caption? : React.ReactNode
    columns  : Column[]
    rows     : Row[]
    cells    : ((Cell | undefined | null)[] | undefined | null)[]
}
type MatrixState = {
    column_nodes       : (Node | null)[]
    column_header      : Node | null
    row_nodes          : (Node | null)[]
    row_header         : Node | null
    cell_nodes         : ((Node | null)[] | undefined)[]
    cell_header        : Node | null
    cell_indices       : number[]
    cell_sort_header   : Node | null,
    cell_sort_order    : boolean,
    column_indices     : number[]
    column_sort_header : Node | null,
    column_sort_order  : boolean,
}

class Matrix<Row, Column, Cell> extends React.Component<MatrixProps<Row, Column, Cell>, MatrixState> {
    public static state<Row, Column, Cell>(props : MatrixProps<Row, Column, Cell>) : Readonly<MatrixState> {
        const { rows, columns, cells } = props
        const column_nodes = columns
            .map(x => Node.from_object(x))
        const column_header = column_nodes
            .filter((x) : x is Node => !!x)
            .reduce<Node | null>((a, x) => a ? a.merge(x) : x, null)
        const row_nodes = rows
            .map(x => Node.from_object(x))
        const row_header = row_nodes
            .filter((x) : x is Node => !!x)
            .reduce<Node | null>((a, x) => a ? a.merge(x) : x, null)
        const cell_nodes = cells
            .map(x => x?.map(x => Node.from_object(x)))
        const cell_header = cell_nodes
            .filter((x) : x is (Node | null)[] => !!x)
            .flat()
            .filter((x) : x is Node => !!x)
            .reduce<Node | null>((a, x) => a ? a.merge(x) : x, null)
        const cell_indices = cells
            .filter((x) : x is Cell[] => !!x)
            .map(x => x.map((_, i) => i))
            .flat()
            .concat(rows
                .filter((x) : x is Row => !!x)
                .map((_, i) => i)
            )
            .reduce<number[]>((a, x) => {
                if (a.indexOf(x) < 0) a.push(x)

                return a
            }, [])
        const column_indices = columns
            .filter((x) : x is Column => !!x)
            .map((_, i) => i)

        return {
            column_nodes,
            column_header,
            row_nodes,
            row_header,
            cell_nodes,
            cell_header,
            cell_indices,
            cell_sort_header : null,
            cell_sort_order : false,
            column_indices,
            column_sort_header : null,
            column_sort_order : false,
        }
    }

    public state : Readonly<MatrixState> = Matrix.state(this.props)

    private sort_columns = (header : Node, order : boolean) => () => {
        const { state } = this
        const order_factor = order ? +1 : -1
        const column_indices = state.column_nodes
            .map((node, i) => {
                if (node) node = header.trace(node)

                return [ i, node ] as const
            })
            .sort(([ _, a ], [ __, b ]) => compare(a, b) * order_factor)
            .map(([ i ]) => i)

        this.setState({ column_indices, column_sort_header: header, column_sort_order: order })
    }
    private sort_rows = (header : Node, order : boolean) => () => {
        const { state } = this
        const order_factor = order ? +1 : -1
        const cell_indices = state.row_nodes
            .map((node, i) => {
                if (node) node = header.trace(node)

                return [ i, node ] as const
            })
            .sort(([ _, a ], [ __, b ]) => compare(a, b) * order_factor)
            .map(([ i ]) => i)

        this.setState({ cell_indices, cell_sort_header: header, cell_sort_order: order })
    }
    private sort_cells = (column : number, header : Node, order : boolean) => () => {
        const { state } = this
        const order_factor = order ? +1 : -1
        const cell_indices = state.cell_indices
            .map(i => {
                let node = (state.cell_nodes[column]?.at(i) || null) as Node | null

                if (node) node = header.trace(node)

                return [ i, node ] as const
            })
            .sort(([ _, a ], [ __, b ]) => compare(a, b) * order_factor)
            .map(([ i ]) => i)

        this.setState({ cell_indices, cell_sort_header: header, cell_sort_order: order })
    }

    public render() {
        const {
            props : { caption },
            state : {
                column_nodes,
                column_header,
                row_nodes,
                row_header,
                cell_nodes,
                cell_header,
                cell_indices,
                cell_sort_header,
                cell_sort_order,
                column_indices,
                column_sort_header,
                column_sort_order,
            },
            sort_columns,
            sort_rows,
            sort_cells,
        } = this

        const primary_spread = row_header?.spread || 1
        const secondary_spread = cell_header?.spread || 1
        const max_element_depth = Math.max(
            row_header?.max_depth || 0,
            cell_header?.max_depth || 0,
        )
        const column_depth = column_header?.max_depth || 1

        return (
            <table className={styles.table}>
                {caption && <caption>
                    {caption}
                </caption>}
                {column_header && <thead>
                    {column_header.leafs.map((leaf, i) =>
                        <tr key={`header-major-${i}`}>
                            {leaf.path.slice(1).reduce<React.ReactNode[]>((row, node, j) => [ ...row, ...(i == node.spread_prev ? [
                                <th
                                    key={`header-major-${i}-${j}`}
                                    rowSpan={node.spread}
                                    colSpan={(node.empty ? node.root.max_depth - node.depth + 1 : 1) * primary_spread}
                                >
                                    {node.key}
                                    <button
                                        onClick={sort_columns(node, node === column_sort_header ? !column_sort_order : column_sort_order)}
                                    >
                                        {cell_sort_order ? `←` : `→`}
                                    </button>
                                </th>] : [])
                            ], [])}
                            {column_indices
                            .map(i => column_nodes[i])
                            .map((column, column_index) =>
                                column && function iterate(node : Node, path : Node[]) : React.ReactNode {
                                    const th = (path : Node, node : Node | null = null) => {
                                        if (i != path.spread_prev) return null

                                        return (
                                            <td
                                                key={`header-major-${i}-${leaf.path.length + column_index}`}
                                                rowSpan={path.spread}
                                                colSpan={secondary_spread}
                                            >
                                                {node && `${node.value}`}
                                            </td>
                                        )
                                    }

                                    if (node.empty || path.length < 2) return th(path[0], node)

                                    const nested = node.get(path[1].key)

                                    if (!nested) return th(path[1])

                                    return iterate(nested, path.slice(1))
                                }(column, leaf.path)
                            )}
                        </tr>
                    )}
                </thead>}
                <thead>
                    {(function iterate(header : Node | null, i = 0) : React.ReactNode[] {
                        return header ? [
                            <tr key={`header-${i}`}>
                                {[ header, ...header.all_next ].map((node, j) =>
                                    <th
                                        key={`header-rows-${i}-${j}`}
                                        colSpan={node.spread * column_depth}
                                        rowSpan={node.empty ? max_element_depth - node.depth + 1 : 1}
                                    >
                                        {node.key}
                                        <button onClick={sort_rows(node, node === cell_sort_header ? !cell_sort_order : cell_sort_order)}>
                                            {cell_sort_order ? `↑` : `↓`}
                                        </button>
                                    </th>
                                )}
                                {cell_header && column_indices
                                .map((column_index) => cell_header
                                    .filter_all(x => x.depth === i)
                                    .map((node, j) =>
                                        <th
                                            key={`header-cells-${i}-${column_index}-${j}`}
                                            colSpan={node.spread}
                                            rowSpan={node.empty ? max_element_depth - node.depth + 1 : 1}
                                        >
                                            {node.key}
                                            <button onClick={sort_cells(column_index, node, node === cell_sort_header ? !cell_sort_order : cell_sort_order)}>
                                                {cell_sort_order ? `↑` : `↓`}
                                            </button>
                                        </th>
                                    )
                                )}
                            </tr>,
                            ...iterate(header.depth_first, i + 1)
                        ] : []
                    })(row_header || cell_header).slice(1)}
                </thead>
                <tbody>
                    {cell_indices.map((row_index) =>
                        <tr
                            key={`body-${row_index}`}
                        >
                            {row_header && (function process(header : Node, node : Node | null, i = 0) : React.ReactNode[] {
                                if (header.empty || !node) return [
                                    <td
                                        key={`body-${row_index}-${i}`}
                                        colSpan={header.spread * column_depth}
                                    >
                                        {node && node.value}
                                    </td>
                                ]

                                return header.map((header, j) => process(header, node.get(header.key) || null, i + j))
                            })(row_header, row_nodes[row_index])}
                            {cell_header && column_indices
                            .map(i => cell_nodes[i])
                            .map((column_nodes, column_index) =>
                                (function process(header : Node, node : Node | null, i = 0) : React.ReactNode[] {
                                    if (header.empty || !node) return [
                                        <td
                                            key={`body-${row_index}-${column_index}-${i}`}
                                            colSpan={header.spread}
                                        >
                                            {node && node.value}
                                        </td>
                                    ]

                                    return header.map((header, j) => process(header, node.get(header.key) || null, i + j))
                                })(cell_header, (column_nodes && column_nodes[row_index] || null) as Node | null))
                            }
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
}

function compare(a : Node | null, b : Node | null) {
    if (!a && !b) return 0
    if (!a) return -1
    if (!b) return +1
    if (a.value == b.value) return 0

    return a.value > b.value ? +1 : -1
}
