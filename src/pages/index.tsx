import React from 'react'
import * as kt from '../key-tree'
import styles from './table.module.scss'

type Node = kt.Node<any>
const Node = kt.Node<any>

export default class IndexPage extends React.Component {
    public render() {
        const test_suite_1 = {
            group : {
                name   : `test suite #1`,
                date   : new Date(`2023-01-01T01:00:00.000Z`),
                status : `passed`,
                KPI    : {
                    accuracy  : 0.1,
                    precision : 0.1,
                    recall    : 0.3,
                    F1        : 0.4,
                },
            },
            elements : [
                { name : `test case #1`, status : `pass` },
                { name : `test case #2`, status : `pass` },
                { name : `test case #3`, status : `pass` },
            ],
        }
        const test_suite_2 = {
            group : {
                name : `test suite #2`,
                date : new Date(`2023-01-01T02:00:00.000Z`),
                status : `failed`,
                KPI    : {
                    accuracy  : 0.5,
                    precision : 0.6,
                    recall    : 0.7,
                    F1        : 0.8,
                },
            },
            elements : [
                { name : `test case #1`, status : `pass` },
                { name : `test case #2`, status : `pass` },
                { name : `test case #3`, status : `pass` },
            ],
        }

        return (
            <>
                <Table
                    title={`test case runs`}
                    elements={[
                        { a : 1 },
                        { b : 2 },
                        { a : 1, b : 2 },
                        { b : { x : 3, y : 4 } },
                        // { a : 1, b : { x : 2, y : 3 } },
                        // ...test_cases_1,
                    ]}
                />
                <Table
                    title={`test case runs`}
                    groups={[
                        // { group : { a : 1 }, elements : [] },
                        // { group : { b : 2 }, elements : [] },
                        // { group : { a : 1, b : 2 }, elements : [] },
                        // // { group : { a : { x : 3, y : 4 } }, elements : [] },
                        // { group : { b : { x : 3, y : 4 } }, elements : [] },
                        // // { group : { a : 1, b : { x : 2, y : 3 } }, elements : test_cases_1 },
                        // // { group : { a : 1, b : { x : 2, z : 4 } }, elements : test_cases_2 },
                        // // { group : { a : 1, b : 5 }, elements : [] },
                        // // { group : test_suite_1, elements : test_cases_1 },
                        test_suite_1,
                        test_suite_2,
                    ]}
                    identity={(a, b) => false}
                    // identity={(a, b) => a.name == b.name}
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

type TableProps<Element, Group> = (
    & {
        title? : React.ReactNode
    }
    & (
        | {
            elements : Element[]
        }
        | {
            groups : {
                group : Group
                elements : Element[]
            }[]
            identity : (a : Element, b : Element) => boolean
        }
    )
)
type TableState = {
    //
}

class Table<Element, Group> extends React.Component<
    TableProps<Element, Group>,
    TableState
> {
    public state : TableState = {
        //
    }

    public render() {
        const { title } = this.props

        if (`elements` in this.props) {
            const { elements } = this.props

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

        const { groups, identity } = this.props
        const group_rows = groups
            .map(({ group }) => Node.from_object(group))
        const group_header = group_rows
            .filter((x) : x is Node => !!x)
            .reduce<Node | null>((a, x) => a ? a.merge(x) : x, null)

        return (
            <table className={styles.table}>
                {title && <caption>
                    {title}
                </caption>}
                {group_header && <thead>
                    {group_header.leafs.map((leaf, i) =>
                        <tr key={`header-${i}`}>
                            {leaf.path
                            .slice(1)
                            .reduce<React.ReactNode[]>((row, node, j) => [ ...row, ...(i == node.spread_prev ? [
                                <th
                                    key={`header-${i}-${j}`}
                                    rowSpan={node.spread}
                                    colSpan={node.empty ? node.root.max_depth - node.depth + 1 : 1}
                                >
                                    {node.key}
                                </th>] : [])
                            ], [])}
                            {group_rows
                            .map((group, j) =>
                                group && function iterate(node : Node, path : Node[]) : React.ReactNode {
                                    if (node.empty || path.length < 2) {
                                        if (i != path[0].spread_prev) return null

                                        return (
                                            <td
                                                key={`header-${i}-${leaf.path.length + j}`}
                                                rowSpan={path[0].spread}
                                            >
                                                {`${node.value}`}
                                            </td>
                                        )
                                    }

                                    const nested = node.get(path[1].key)

                                    if (!nested) {
                                        if (i != path[1].spread_prev) return null

                                        return (
                                            <td
                                                key={`header-${i}-${leaf.path.length + j}`}
                                                rowSpan={path[1].spread}
                                            />
                                        )
                                    }

                                    return iterate(nested, path.slice(1))
                                }(group, leaf.path)
                            )}
                        </tr>
                    )}
                </thead>}
            </table>
        )
    }
}

