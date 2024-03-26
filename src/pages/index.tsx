import React from 'react'
import { Table, Matrix, Entry } from '../table'

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
                        {
                            name : `test suite #1`,
                            status : `pass`,
                            KPI : {
                                a : new Entry({
                                    element : <span style={{ color : `red` }}>0.1</span>,
                                    value : 0.1,
                                }),
                                b : 0.2,
                            },
                        },
                        {
                            name : `test suite #2`,
                            status : `fail`,
                            KPI : {
                                a : 0.3,
                                b : 0.4,
                            },
                        },
                    ]}
                    rows    = {[
                        { name : `test case #1`, data : { input : 1, reference : 3 } },
                        { name : `test case #2`, data : { input : 2, reference : 1 } },
                        { name : `test case #3`, data : { input : 3, reference : 2 } },
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
    }
}
