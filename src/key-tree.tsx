export class Node<Value> {
    public static from_object(object : any, key = ``) : Node<any> | null {
        if (typeof object === `function`) return null
        if (typeof object === `symbol`) return null
        if (typeof object === `object`) {
            const root = new Node<any>({ key, value : object })

            Object.entries(object)
                .map(([ key, object ]) => Node.from_object(object, key))
                .filter((node) : node is Node<any> => !!node)
                .forEach(node => root.add(node))

            return root
        }

        return new Node<any>({ key, value : object })
    }

    private __parent : Node<Value> | null = null
    private __prev   : Node<Value> | null = null
    private __next   : Node<Value> | null = null

    public readonly value : Value
    public readonly key   : string
    public readonly nodes : Node<Value>[] = []

    public constructor({
        value,
        key = ``,
    } : {
        value : Value
        key?  : string
    }) {
        this.value = value
        this.key   = key
    }

    public get parent() {
        return this.__parent
    }
    public get root() : Node<Value> {
        return this.parent ? this.parent.root : this
    }
    public get prev() {
        return this.__prev
    }
    public get next() {
        return this.__next
    }
    public get depth_prev() : Node<Value> | null {
        const { prev } = this

        if (prev) return prev

        let node = this.parent
        let level = 0

        while (true) {
            ++level

            if (!node) return null
            if (node.prev) break

            node = node.parent
        }

        node = node.prev

        for (;level > 0; --level) {
            if (!node.last) return null

            node = node.last
        }

        return node
    }
    public get depth_next() : Node<Value> | null {
        const { next } = this

        if (next) return next

        let node = this.parent
        let level = 0

        while (true) {
            ++level

            if (!node) return null
            if (node.next) break

            node = node.parent
        }

        node = node.next

        for (;level > 0; --level) {
            if (!node.first) return null

            node = node.first
        }

        return node
    }
    public get all_next() {
        const result : Node<Value>[] = []
        let node = this.depth_next

        while (node) {
            result.push(node)

            node = node.depth_next
        }

        return result
    }
    public get first() : Node<Value> | null {
        const { nodes } = this

        return nodes.length > 0 ? nodes[0] : null
    }
    public get last() : Node<Value> | null {
        const { nodes } = this
        const { length } = nodes

        return length > 0 ? nodes[length - 1] : null
    }
    public get depth_first() : Node<Value> | null {
        const { first } = this

        if (first) return first

        const { depth_next } = this

        return depth_next ? depth_next.depth_first : null
    }
    public get path() : Node<Value>[] {
        const { parent } = this

        return parent ? [ ...parent.path, this ] : [ this ]
    }
    public get empty() {
        return Object.values(this.nodes).length < 1
    }
    public get depth() : number {
        return this.parent ? this.parent.depth + 1 : 0
    }
    public get max_depth() : number {
        return Math.max(this.depth, this.max(node => node.max_depth))
    }
    public get spread() : number {
        return this.empty ? 1 : this.sum(node => node.spread)
    }
    public get spread_prev() : number {
        let spread = 0
        let { prev } = this

        while (prev) {
            spread += prev.spread
            prev = prev.prev
        }

        const { parent } = this

        if (parent) spread += parent.spread_prev

        return spread
    }
    public get leafs() : Node<Value>[] {
        if (this.empty) return [ this ]

        return this.map(node => node.leafs).flat()
    }

    public clone() : Node<Value> {
        const root = new Node<Value>({ key : this.key, value : this.value })

        this.for_each(node => root.add(node.clone()))

        return root
    }
    public merge(other : Node<Value>) : Node<Value> {
        const clone = this.clone()

        other.for_each(node => {
            const existed = clone.get(node.key)

            if (existed) node = existed.merge(node)
            else node = node.clone()

            clone.add(node)
        })

        return clone
    }
    public has(key : string) : boolean {
        return !!this.get(key)
    }
    public get(key : string) : Node<Value> | null {
        return this.nodes.find(node => node.key === key) || null
    }
    public add(node : Node<Value>) {
        const { nodes } = this

        const index = nodes.findIndex(child => child.key === node.key)

        if (index >= 0) {
            const existed = nodes[index]

            node.__prev = existed.__prev
            node.__next = existed.__next

            if (node.__prev) node.__prev.__next = node
            if (node.__next) node.__next.__prev = node

            existed.__parent = null
            existed.__prev = null
            existed.__next = null
            nodes[index] = node
        }
        else {
            const { length } = nodes

            if (length > 0) {
                node.__prev = nodes[length - 1]
                node.__prev.__next = node
            }

            nodes.push(node)
        }

        node.__parent = this

        return node
    }
    public for_each(callback : (node : Node<Value>, index : number, parent : Node<Value>) => void) {
        Object.values(this.nodes).forEach(
            (node, index) => callback(node, index, this)
        )
    }
    public map<T>(callback : (node : Node<Value>, index : number, parent : Node<Value>) => T) : T[] {
        const result : T[] = []

        this.for_each((...params) => result.push(callback(...params)))

        return result
    }
    public reduce<T>(acc : T, callback : (acc : T, node : Node<Value>, index : number, parent : Node<Value>) => T) : T {
        this.for_each((...params) => acc = callback(acc, ...params))

        return acc
    }
    public sum(callback : (node : Node<Value>, index : number, parent : Node<Value>) => number) : number {
        return this.reduce(0, (a, ...params) => a + callback(...params))
    }
    public max(callback : (node : Node<Value>, index : number, parent : Node<Value>) => number) : number {
        return this.reduce(-Infinity, (a, ...params) => Math.max(a, callback(...params)))
    }
    public filter_all(callback : (node : Node<Value>) => boolean) : Node<Value>[] {
        let result : Node<Value>[] = []

        if (callback(this)) result.push(this)

        this.for_each(x => result = result.concat(x.filter_all(callback)))

        return result
    }
    public trace(node : Node<Value>) {
        const { path } = this
        let last : Node<Value> = node

        if (last.key !== path[0].key) return null

        for (const x of path.slice(1)) {
            const next = last.get(x.key)

            if (!next) return null

            last = next
        }

        return last
    }
    public as_top_down_thead(id = ``) {
        let index = 0
        const rows : React.ReactNode[][] = []

        function iterate(node : Node<Value>, level = 0) {
            if (!(level in rows)) rows[level] = []

            rows[level].push(
                <th
                    key={`${id}${index}`}
                    colSpan={node.spread}
                    rowSpan={node.empty ? node.root.max_depth - node.depth + 1 : 1}
                >
                    {node.key}
                </th>
            )

            ++index

            node.for_each(x => iterate(x, level + 1))
        }

        iterate(this)

        return rows
    }
    public as_tr_match(data : Node<Value>, id = ``) {
        let index = 0

        function process(header : Node<any>, row : Node<any> | null) : JSX.Element[] {
            ++index

            if (!row) return [
                <td key={`${id}-${index}`} colSpan={header.spread}/>
            ]
            if (row.empty && header.key === row.key) return [
                <td key={`${id}-${index}`} colSpan={header.spread}>
                    {`${row.value}`}
                </td>
            ]

            return header
                .map(header => process(header, row.get(header.key)))
                .flat()
        }

        return (
            <tr key={id}>
                {process(this, data)}
            </tr>
        )
    }
    public as_left_right_thead(id = ``) {
        let i = 0
        const rows : React.ReactNode[][] = []

        function iterate(node : Node<Value>, row : number = 0) {
            const colspan = node.empty ? node.root.max_depth - node.depth + 1 : 1
            const rowspan = node.spread

            if (!(row in rows)) rows[row] = []

            rows[row].push(
                <th colSpan={colspan} rowSpan={rowspan} id={`${id}-${i}`}>
                    {node.key}
                </th>
            )

            ++i

            if (!node.empty) node.for_each((node) => {
                iterate(node, row)

                row += node.spread
            })
        }

        iterate(this)

        return rows
    }
}
