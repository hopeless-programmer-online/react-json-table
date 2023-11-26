export class Node<Value> {
    public static from_object(object : any, key = ``) : Node<any> | null {
        if (typeof object === `function`) return null
        if (typeof object === `symbol`) return null
        if (typeof object === `object`) {
            const root = new Node<any>({ key, value : object })

            Object.entries(object)
                .map(([ key, object ]) => Node<any>.from_object(object, key))
                .filter((node) : node is Node<any> => !!node)
                .forEach(node => root.add(node))

            return root
        }

        return new Node<any>({ key, value : object })
    }

    private __parent : Node<Value> | null = null

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
            nodes[index].__parent = null

            nodes.splice(index, 1)
        }

        nodes.push(node)

        node.__parent = this

        return node
    }
    public remove(node : Node<Value>) {
        if (node.parent !== this) return

        const { nodes } = this

        const index = nodes.findIndex(node => node.key === node.key)

        if (index < 0) throw new Error // @todo

        nodes.splice(index, 1)

        node.__parent = null
    }
    public for_each(callback : (node : Node<Value>, index : number, parent : typeof this) => void) {
        Object.values(this.nodes).forEach(
            (node, index) => callback(node, index, this)
        )
    }
    public map<T>(callback : (node : Node<Value>, index : number, parent : typeof this) => T) : T[] {
        const result : T[] = []

        this.for_each((...params) => result.push(callback(...params)))

        return result
    }
    public reduce<T>(acc : T, callback : (acc : T, node : Node<Value>, index : number, parent : typeof this) => T) : T {
        this.for_each((...params) => acc = callback(acc, ...params))

        return acc
    }
    public sum(callback : (node : Node<Value>, index : number, parent : typeof this) => number) : number {
        return this.reduce(0, (a, ...params) => a + callback(...params))
    }
    public max(callback : (node : Node<Value>, index : number, parent : typeof this) => number) : number {
        return this.reduce(-Infinity, (a, ...params) => Math.max(a, callback(...params)))
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
}
