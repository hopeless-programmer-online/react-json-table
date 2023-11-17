import React from 'react'
import styles from './table.module.scss'

export default class IndexPage extends React.Component {
    public render() {
        return (
            <Table data={[
                // 1, 2, 3,
                // { name : `John`, surname : `Doe`, age : 20 },
                // { name : `Sarah`, surname : `Conor` },
                // { name : `John`, surname : `Conor`, age : 15 },
                // { name : { a : `a`, b : `b` } },
                // { name : { x : `x`, y : `y` } },
                { [`test case`] : { name : `test case #1`, expectation : 42 }, [`test suite runs`] : {
                    [`test suite #1`] : { result : 42, status : `pass` },
                    [`test suite #2`] : { result : 42, status : `pass` },
                    [`test suite #3`] : { result : 42, status : `pass` },
                } },
                { [`test case`] : { name : `test case #2`, expectation : 25 }, [`test suite runs`] : {
                    [`test suite #1`] : { result : 25, status : `pass` },
                    [`test suite #2`] : { result : 26, status : `fail` },
                    [`test suite #3`] : { result : -1, status : `fail` },
                } },
                { [`test case`] : { name : `test case #3`, expectation : 99 }, [`test suite runs`] : {
                    [`test suite #1`] : { result : 98, status : `fail` },
                    [`test suite #2`] : { result : 99, status : `pass` },
                    [`test suite #3`] : { result : 99, status : `pass` },
                } },
            ]}/>
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

class RowNode {
    private __parent : RowGroup | null = null
    private __key    : string | null   = null

    public set _parent(parent : RowGroup) {
        if (this.__parent) throw new Error // @todo

        this.__parent = parent
    }
    public get parent() {
        return this.__parent
    }
    public get key() {
        let { __key } = this

        if (__key !== null) return __key

        const { parent } = this

        if (!parent) return null

        __key = Object.entries(parent.children)
            .find(([ key, value ]) => value === (this as unknown as RowGroup | RowCell))
            ?.[0] || null

        this.__key = __key

        return __key
    }
}

class RowCell extends RowNode {
    public static readonly symbol = Symbol(`RowCell`)

    public readonly element : JSX.Element
    public readonly value   : any

    public constructor({
        element,
        value,
    } : {
        element : JSX.Element
        value   : any
    }) {
        super()

        this.element = element
        this.value   = value
    }

    public get symbol() : typeof RowCell.symbol {
        return RowCell.symbol
    }
}

type RowChildren = {
    [key : string] : RowCell | RowGroup
}

class RowGroup extends RowNode {
    public static readonly symbol = Symbol(`RowGroup`)

    public readonly children : RowChildren

    public constructor({
        children,
    } : {
        children : RowChildren
    }) {
        super()

        this.children = children

        Object.values(children).forEach(child => child._parent = this)
    }

    public get symbol() : typeof RowGroup.symbol {
        return RowGroup.symbol
    }
}

type Row = RowCell | RowGroup

class HeaderNode {
    private __parent : HeaderGroup | null = null
    private __depth  : number | null      = null
    private __key    : string | null      = null

    public set _parent(parent : HeaderGroup) {
        if (this.__parent) throw new Error // @todo

        this.__parent = parent
    }
    public get parent() {
        return this.__parent
    }
    public get root() : HeaderGroup | HeaderCell {
        let last : HeaderGroup | HeaderCell = this as unknown as HeaderGroup | HeaderCell

        while (true) {
            const parent : HeaderGroup | null = last.parent

            if (!parent) return last

            last = parent
        }
    }
    public get depth() : number {
        let { __depth } = this

        if (__depth !== null) return __depth

        const { parent } = this

        __depth = parent ? parent.depth + 1 : 0

        this.__depth = __depth

        return __depth
    }
    public get max_depth() {
        return this.depth
    }
    public get row_span() {
        const { parent } = this

        if (!parent) return 1

        return parent.max_depth - parent.depth
    }
    public get by_rows() {
        let rows : (HeaderGroup | HeaderCell)[][] = []

        function process(node : HeaderGroup | HeaderCell, level : number = 0) {
            if (!(level in rows)) rows[level] = []

            rows[level].push(node)

            if (node.symbol === HeaderGroup.symbol) {
                Object.values(node.children).forEach(child => process(child, level + 1))
            }
        }

        process(this as unknown as HeaderGroup | HeaderCell)

        return rows
    }
    public get by_cells() : HeaderCell[] {
        const node = this as unknown as HeaderGroup | HeaderCell

        if (node.symbol === HeaderCell.symbol) return [ node ]
        if (node.symbol === HeaderGroup.symbol) return (
            Object.values(node.children)
            .map(child => child.by_cells)
            .flat()
        )

        ;((never : never) => { throw new Error })(node) // @todo
    }
    public get key() {
        let { __key } = this

        if (__key !== null) return __key

        const { parent } = this

        if (!parent) return null

        __key = Object.entries(parent.children)
            .find(([ key, value ]) => value === (this as unknown as HeaderGroup | HeaderCell))
            ?.[0] || null

        this.__key = __key

        return __key
    }
}

class HeaderCell extends HeaderNode {
    public static readonly symbol = Symbol(`HeaderCell`)

    public get symbol() : typeof HeaderCell.symbol {
        return HeaderCell.symbol
    }
    public get col_span() {
        return 1
    }

    public clone() {
        return new HeaderCell
    }
    public merge(header : Header) {
        if (header.symbol === HeaderCell.symbol) return this
        if (header.symbol === HeaderGroup.symbol) return header

        ;((never : never) => { throw new Error })(header) // @todo
    }
}

type HeaderChildren = {
    [key : string] : HeaderCell | HeaderGroup
}

class HeaderGroup extends HeaderNode {
    public static readonly symbol = Symbol(`HeaderGroup`)

    private __max_depth : number | null = null

    public readonly children : HeaderChildren

    public constructor({
        children = {},
    } : {
        children? : HeaderChildren
    } = {}) {
        super()

        this.children = children

        Object.values(children).forEach(child => child._parent = this)
    }

    public get max_depth() : number {
        let { __max_depth } = this

        if (__max_depth !== null) return __max_depth

        __max_depth = this.depth + Math.max(0,
            ...Object.values(this.children)
            .map(child => child.max_depth)
        )

        this.__max_depth = __max_depth

        return __max_depth
    }
    public get row_span() {
        return 1
    }
    public get symbol() : typeof HeaderGroup.symbol {
        return HeaderGroup.symbol
    }
    public get col_span() : number {
        return Object.entries(this.children)
            .reduce((a, [ _, x ]) => a + x.col_span, 0)
    }

    public clone() : HeaderGroup {
        return new HeaderGroup({
            children : Object.fromEntries(
                Object.entries(this.children)
                .map(([ key, child ]) => [ key, child.clone() ])
            )
        })
    }
    public merge(header : Header) : HeaderGroup {
        if (header.symbol === HeaderCell.symbol) return this
        if (header.symbol === HeaderGroup.symbol) return new HeaderGroup({
            children : {
                ...Object.fromEntries(
                    Object.entries(this.children)
                    .map(([ key, child ]) => [ key, key in header.children
                        ? child.merge(header.children[key])
                        : child
                    ] as const)
                    .map(([ key, child ]) => [ key, child.clone() ]),
                ),
                ...Object.fromEntries(
                    Object.entries(header.children)
                    .filter(([ key ]) => !(key in this.children))
                    .map(([ key, child ]) => [ key, child.clone() ]),
                ),
            },
        })

        ;((never : never) => { throw new Error })(header) // @todo
    }
}

type Header = HeaderCell | HeaderGroup

type TableProps = {
    data : any[]
}
type TableState = {
    //
}

class Table extends React.Component<TableProps, TableState> {
    public state : TableState = {
        //
    }

    public componentDidUpdate(props : TableProps) {
        //
    }
    public render() {
        const { data } = this.props
        const rows = parse_rows(data)
        const header = parse_header(rows)

        // console.log(header)

        return (
            <table className={styles.table}>
                <caption>
                    test case runs
                </caption>
                {   header &&
                    <thead>
                        {header.by_rows
                        .slice(1)
                        .map((row, i) =>
                            <tr key={`header-${i}`}>
                                {row.map((cell, j) =>
                                    <th
                                        key={`header-${i}-${j}`}
                                        colSpan={cell.col_span}
                                        rowSpan={cell.row_span}
                                    >
                                        {cell.key}
                                    </th>
                                )}
                            </tr>
                        )}
                    </thead>
                }
                {   header &&
                    <tbody>
                        {rows.map((row, i) => {
                            let j = 0

                            function process(header : Header, row? : Row) : JSX.Element[] {
                                ++j

                                if (row && header.key === row.key) {
                                    if (row.symbol === RowCell.symbol) return [
                                        <td
                                            key={j}
                                            colSpan={header.col_span}
                                        >
                                            {row.element}
                                        </td>
                                    ]
                                    if (header.symbol === HeaderGroup.symbol && row.symbol === RowGroup.symbol) return (
                                        Object.entries(header.children)
                                        .map(([ key, header ]) => process(header, row.children[key]))
                                        .flat()
                                    )
                                }

                                return [
                                    <td
                                        key={j}
                                        colSpan={header.col_span}
                                    />
                                ]
                            }

                            return (
                                <tr key={`body-${i}`}>
                                    {process(header, row)}
                                </tr>
                            )
                        })}
                    </tbody>
                }
                {   header &&
                    <tfoot>
                        <tr>
                            <th colSpan={header.col_span}>
                                footer
                            </th>
                        </tr>
                    </tfoot>
                }
            </table>
        )
    }
}

function parse_rows(data : any[]) : Row[] {
    function process(element : any) : Row | null {
        const type = typeof element

        if (
            type === `undefined` ||
            type === `boolean` ||
            type === `number` ||
            type === `string` ||
            type === `bigint` ||
            element === null
        ) return new RowCell({
            element : (
                <>{`${element}`}</>
            ),
            value   : element,
        })
        if (type === `object`) return new RowGroup({
            children : Object.fromEntries(
                Object.entries(element)
                .map(([ key, value ]) => [ key, process(value) ] as const)
                .filter((x) : x is [ string, RowCell | RowGroup ] => x[1] !== null)
            )
        })

        return null
    }

    return data
        .map(process)
        .filter((x) : x is Row => x !== null)
}

function parse_header(rows : Row[]) {
    function process(row : Row) : Header {
        if (row.symbol === RowCell.symbol) return new HeaderCell
        if (row.symbol === RowGroup.symbol) return new HeaderGroup({
            children : Object.fromEntries(
                Object.entries(row.children)
                .map(([ key, node ]) => [ key, process(node) ] as const)
            )
        })

        ;((never : never) => { throw new Error })(row) // @todo
    }

    return rows
        .map(process)
        .reduce<Header | null>((a, x) => a ? a.merge(x) : x, null)
}
