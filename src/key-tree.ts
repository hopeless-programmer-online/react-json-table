export class Node {
    public static from_object(object : any, key = ``) : Node | null {
        if (typeof object === `function`) return null
        if (typeof object === `symbol`) return null
        if (typeof object === `object`) {
            const root = new Node({ key })

            Object.entries(object)
                .map(([ key, object ]) => Node.from_object(object, key))
                .filter((node) : node is Node => !!node)
                .forEach(node => root.add(node))

            return root
        }

        return new Node({ key })
    }

    private __parent : Node | null = null

    public readonly key   : string
    public readonly nodes : Node[] = []

    public constructor({
        key = ``,
    } : {
        key?  : string
    }) {
        this.key = key
    }

    public get parent() {
        return this.__parent
    }
    public get root() : Node {
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

    public clone() : Node {
        const root = new Node({ key : this.key })

        this.for_each(node => root.add(node.clone()))

        return root
    }
    public merge(other : Node) : Node {
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
    public get(key : string) : Node | null {
        return this.nodes.find(node => node.key === key) || null
    }
    public add(node : Node) {
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
    public remove(node : Node) {
        if (node.parent !== this) return

        const { nodes } = this

        const index = nodes.findIndex(node => node.key === node.key)

        if (index < 0) throw new Error // @todo

        nodes.splice(index, 1)

        node.__parent = null
    }
    public for_each(callback : (node : Node, index : number, parent : typeof this) => void) {
        Object.values(this.nodes).forEach(
            (node, index) => callback(node, index, this)
        )
    }
    public map<T>(callback : (node : Node, index : number, parent : typeof this) => T) : T[] {
        const result : T[] = []

        this.for_each((...params) => result.push(callback(...params)))

        return result
    }
    public reduce<T>(acc : T, callback : (acc : T, node : Node, index : number, parent : typeof this) => T) : T {
        this.for_each((...params) => acc = callback(acc, ...params))

        return acc
    }
    public sum(callback : (node : Node, index : number, parent : typeof this) => number) : number {
        return this.reduce(0, (a, ...params) => a + callback(...params))
    }
    public max(callback : (node : Node, index : number, parent : typeof this) => number) : number {
        return this.reduce(-Infinity, (a, ...params) => Math.max(a, callback(...params)))
    }
}
