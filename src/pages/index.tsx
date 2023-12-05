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
                        { a : 1 },
                        { b : 2 },
                        { a : 1, b : 2 },
                        { b : { x : 3, y : 4 } },
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
                            { output : 1, status : `pass` },
                            { status : `fail` },
                            { output : 3, status : `pass` },
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
    indices : number[]
}

class Table<Element, Group> extends React.Component<TableProps<Element>, TableState> {
    public state : TableState = {
        indices : this.indices,
    }

    private get indices() {
        return this.props.elements
            .map((_, i) => i)
    }

//     private sort = (column : number, header : Node) => () => {
//         console.log(`sort by `, header)
//
//         if (`groups` in this.props) {
//             const { elements } = this.props
//             const indices = this.indices
//                 .map(i => [ i, (elements[column][i] || null) as Node | null ] as const)
//                 .sort(([ _, a ], [ __, b ]) =>
//                     !a ? -1 :
//                     !b ? +1 :
//                     (a.value == b.value) ? 0 :
//                     (a.value > b.value) ? +1 : -1
//                 )
//                 .map(([ i ]) => i)
//
//             this.setState({ indices })
//         }
//     }

    public render() {
        const { title, elements } = this.props

        const rows = elements
            .map(x => Node.from_object(x))
            .filter((x) : x is Node => !!x)
        const header = rows
            .reduce<Node | null>((a, x) => a ? a.merge(x) : x, null)

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
                                        {/* ({node.spread}|{node.empty ? node.root.max_depth - node.depth + 1 : 1}) */}
                                    </th>
                                )}
                            </tr>,
                            ...iterate(node.depth_first, i + 1)
                        ] : []
                    })(header).slice(1)}
                </thead>}
                {header && <tbody>
                    {rows.map((row, i) =>
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
type MatrixState = {}

class Matrix<Row, Column, Cell> extends React.Component<MatrixProps<Row, Column, Cell>, MatrixState> {
    public render() {
        const { caption, rows, columns, cells } = this.props
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
            .reduce<number[]>((a, x) => {
                if (a.indexOf(x) < 0) a.push(x)

                return a
            }, [])

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
                                </th>] : [])
                            ], [])}
                            {column_nodes.map((column, j) =>
                                column && function iterate(node : Node, path : Node[]) : React.ReactNode {
                                    const th = (path : Node, node : Node | null = null) => {
                                        if (i != path.spread_prev) return null

                                        return (
                                            <td
                                                key={`header-major-${i}-${leaf.path.length + j}`}
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
                        const th = (key : string, span = 1) => (node : Node, i : number) => (
                            <th
                                key={`${key}-${i}`}
                                colSpan={node.spread * span}
                                rowSpan={node.empty ? max_element_depth - node.depth + 1 : 1}
                            >
                                {node.key}
                            </th>
                        )
                        return header ? [
                            <tr key={`header-primary-${i}`}>
                                {[ header, ...header.all_next ].map(th(`header-secondary-${i}`, column_depth))}
                                {cell_header && column_nodes.map((_, k) => cell_header
                                    .filter_all(x => x.depth === i)
                                    .map(th(`header-main-${i}-${k}`))
                                )}
                            </tr>,
                            ...iterate(header.depth_first, i + 1)
                        ] : []
                    })(row_header || cell_header).slice(1)}
                </thead>
                <tbody>
                    {cell_indices.map((k) =>
                        <tr
                            key={`body-${k}`}
                        >
                            {row_header && (function process(header : Node, node : Node | null, i = 0) : React.ReactNode[] {
                                if (header.empty || !node) return [
                                    <td
                                        key={`body-${k}-${i}`}
                                        colSpan={header.spread * column_depth}
                                    >
                                        {node && node.value}
                                    </td>
                                ]

                                return header.map((header, j) => process(header, node.get(header.key) || null, i + j))
                            })(row_header, row_nodes[k])}
                            {cell_header && cell_nodes.map((nodes, j) =>
                                (function process(header : Node, node : Node | null, i = 0) : React.ReactNode[] {
                                    if (header.empty || !node) return [
                                        <td
                                            key={`body-${k}-${j}-${i}`}
                                            colSpan={header.spread}
                                        >
                                            {node && node.value}
                                        </td>
                                    ]

                                    return header.map((header, j) => process(header, node.get(header.key) || null, i + j))
                                })(cell_header, (nodes && nodes[k] || null) as Node | null))
                            }
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
}
