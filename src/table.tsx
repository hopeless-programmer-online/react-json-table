import React from 'react'
import * as kt from './key-tree'
import styles from './table.module.scss'

type Value = Date | string | number | boolean | null | undefined

class Payload {
    public static readonly symbol : unique symbol = Symbol(`Payload`)

    public element  : JSX.Element
    public value    : Value

    public constructor({
        element,
        value,
    } : {
        element  : JSX.Element,
        value    : Value
    }) {
        this.element  = element
        this.value    = value
    }

    public get symbol() : typeof Payload.symbol {
        return Payload.symbol
    }
}

type Children = { [key : string] : Entry }

export class Entry extends Payload {
    public children : Children

    public constructor({
        element,
        value,
        children = {},
    } : {
        element   : JSX.Element,
        value     : Value
        children? : Children,
    }) {
        super({ element, value })

        this.children = children
    }
}

type Node = kt.Node<Payload>

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

export class Table<Element> extends React.Component<TableProps<Element>, TableState> {
    private static state<Element>(props : TableProps<Element>) : TableState {
        const rows = props.elements
            .map(x => parse_node(x))
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
                                        className={node === sort_header ? styles.sort : ``}
                                        colSpan={node.spread}
                                        rowSpan={node.empty ? node.root.max_depth - node.depth + 1 : 1}
                                    >
                                        {node.key}
                                        <button
                                            onClick={sort(node, node === sort_header ? !sort_order : sort_order)}
                                        >
                                            {sort_order ? `↓` : `↑`}
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

export class Matrix<Row, Column, Cell> extends React.Component<MatrixProps<Row, Column, Cell>, MatrixState> {
    public static state<Row, Column, Cell>(props : MatrixProps<Row, Column, Cell>) : Readonly<MatrixState> {
        const { rows, columns, cells } = props
        const column_nodes = columns
            .map(x => parse_node(x))
        const column_header = column_nodes
            .filter((x) : x is Node => !!x)
            .reduce<Node | null>((a, x) => a ? a.merge(x) : x, null)
        const row_nodes = rows
            .map(x => parse_node(x))
        const row_header = row_nodes
            .filter((x) : x is Node => !!x)
            .reduce<Node | null>((a, x) => a ? a.merge(x) : x, null)
        const cell_nodes = cells
            .map(x => x?.map(x => parse_node(x)))
        const cell_header = cell_nodes
            .filter((x) : x is (Node)[] => !!x)
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

        const row_spread = row_header?.spread || 1
        const cell_spread = cell_header?.spread || 1
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
                {column_header && <colgroup>
                    {row_header &&
                    <col span={column_depth * row_spread}/>}
                    {column_nodes.map((_, i) =>
                        <col key={`col-${i}`} span={cell_spread}/>
                    )}
                </colgroup>}
                {column_header && <thead>
                    {column_header.leafs.map((leaf, i) =>
                        <tr key={`header-major-${i}`}>
                            {leaf.path.slice(1).reduce<React.ReactNode[]>((row, node, j) => [ ...row, ...(i == node.spread_prev ? [
                                <th
                                    key={`header-major-${i}-${j}`}
                                    className={node === column_sort_header ? styles.sort : ``}
                                    rowSpan={node.spread}
                                    colSpan={(node.empty ? node.root.max_depth - node.depth + 1 : 1) * row_spread}
                                >
                                    {node.key}
                                    <button
                                        onClick={sort_columns(node, node === column_sort_header ? !column_sort_order : column_sort_order)}
                                    >
                                        {column_sort_order ? `→` : `←`}
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
                                                colSpan={cell_spread}
                                            >
                                                {node && node.value.element}
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
                                        className={node === cell_sort_header ? styles.sort : ``}
                                        colSpan={node.spread * column_depth}
                                        rowSpan={node.empty ? max_element_depth - node.depth + 1 : 1}
                                    >
                                        {node.key}
                                        <button onClick={sort_rows(node, node === cell_sort_header ? !cell_sort_order : cell_sort_order)}>
                                            {cell_sort_order ? `↓` : `↑`}
                                        </button>
                                    </th>
                                )}
                                {cell_header && column_indices
                                .map((column_index) => cell_header
                                    .filter_all(x => x.depth === i)
                                    .map((node, j) =>
                                        <th
                                            key={`header-cells-${i}-${column_index}-${j}`}
                                            className={node === cell_sort_header ? styles.sort : ``}
                                            colSpan={node.spread}
                                            rowSpan={node.empty ? max_element_depth - node.depth + 1 : 1}
                                        >
                                            {node.key}
                                            <button onClick={sort_cells(column_index, node, node === cell_sort_header ? !cell_sort_order : cell_sort_order)}>
                                                {cell_sort_order ? `↓` : `↑`}
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
                                        {node && node.value.element}
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
                                            {node && node.value.element}
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

    const x = a.value.value ?? 0
    const y = b.value.value ?? 0

    if (x == y) return 0

    return x > y ? +1 : -1
}

function parse_entry(object : any) : Entry {
    if (object instanceof Entry) return object

    const children : Children = {}

    if (typeof object === `object` && object !== null) Object.entries(object).forEach(([ key, value ]) =>
        children[key] = parse_entry(value)
    )

    const value = (
        object instanceof Date ||
        typeof object === `string` ||
        typeof object === `number` ||
        typeof object === `boolean` ||
        object === null ||
        object === undefined
    ) ? object : undefined

    return new Entry({
        element : value,
        value,
        children,
    })
}

function parse_node(object : any, key? : string) : Node {
    const entry = parse_entry(object)
    const node = new kt.Node<Payload>({
        value : entry,
        key,
    })

    Object.entries(entry.children).forEach(([ key, entry ]) =>
        node.add(parse_node(entry, key))
    )

    return node
}
