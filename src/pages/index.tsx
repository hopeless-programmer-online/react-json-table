import React from 'react'

export default class IndexPage extends React.Component {
    public render() {
        return (
            <table border={1}>
                <caption>table</caption>
                    <col span={1}/>
                    <col span={2} style={{ backgroundColor : `rgb(255, 200, 200)` }}/>
                    <col span={3} style={{ backgroundColor : `rgb(200, 255, 200)` }}/>
                    <col span={3} style={{ backgroundColor : `rgb(200, 200, 255)` }}/>
                    <col span={1}/>
                <colgroup>
                </colgroup>
                <thead>
                    <tr>
                        <th rowSpan={3}/>

                        <th rowSpan={2}>Suite</th>
                        <th>Name</th>
                        <td colSpan={3}>Suite #0</td>
                        <td colSpan={3}>Suite #1</td>

                        <th rowSpan={3}/>
                    </tr>
                    <tr>
                        <th>Id</th>
                        <td colSpan={3}>0</td>
                        <td colSpan={3}>1</td>
                    </tr>
                    <tr>
                        <th colSpan={2}>Status</th>
                        <td colSpan={3}>passed</td>
                        <td colSpan={3}>failed</td>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th rowSpan={2}><input type={`checkbox`}/></th>

                        <th colSpan={2}>Case</th>

                        <th rowSpan={2}>Input</th>
                        <th colSpan={2}>Run</th>

                        <th rowSpan={2}>Input</th>
                        <th colSpan={2}>Run</th>

                        <th rowSpan={2}></th>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <th>Id</th>

                        <th>Output</th>
                        <th>Status</th>

                        <th>Output</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th/>

                        <th>
                            <input type={`search`} placeholder={`filter`}/>
                            <button role={`button`}>🔗</button>
                            <button role={`button`}>↓</button>
                        </th>
                        <th>
                            <input type={`search`} placeholder={`filter`}/>
                            <button role={`button`}>🔗</button>
                            <button role={`button`}>↓</button>
                        </th>

                        <th>
                            <input type={`search`} placeholder={`filter`}/>
                            <button role={`button`}>🔗</button>
                            <button role={`button`}>↓</button>
                        </th>
                        <th>
                            <input type={`search`} placeholder={`filter`}/>
                            <button role={`button`}>🔗</button>
                            <button role={`button`}>↓</button>
                        </th>
                        <th>
                            <input type={`search`} placeholder={`filter`}/>
                            <button role={`button`}>🔗</button>
                            <button role={`button`}>↓</button>
                        </th>

                        <th>
                            <input type={`search`} placeholder={`filter`}/>
                            <button role={`button`}>🔗</button>
                            <button role={`button`}>↓</button>
                        </th>
                        <th>
                            <input type={`search`} placeholder={`filter`}/>
                            <button role={`button`}>🔗</button>
                            <button role={`button`}>↓</button>
                        </th>
                        <th>
                            <input type={`search`} placeholder={`filter`}/>
                            <button role={`button`}>🔗</button>
                            <button role={`button`}>↓</button>
                        </th>

                        <th/>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor : `rgb(200, 200, 200)` }}>
                    <tr>
                        <th><input type={`checkbox`}/></th>

                        <td>Test #17</td>
                        <td>0</td>

                        <td>5</td>
                        <td>5</td>
                        <td>passed</td>

                        <td>5</td>
                        <td>5</td>
                        <td>passed</td>

                        <th><input type={`checkbox`} checked={true}/></th>
                    </tr>
                    <tr>
                        <th><input type={`checkbox`} checked={true}/></th>

                        <td>Test #45</td>
                        <td>0</td>

                        <td>5</td>
                        <td>5</td>
                        <td>passed</td>

                        <td>1</td>
                        <td>5</td>
                        <td>failed</td>

                        <th><input type={`checkbox`} checked={true}/></th>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <th><input type={`checkbox`}/></th>

                        <td>Test #0</td>
                        <td>0</td>

                        <td>5</td>
                        <td>5</td>
                        <td>passed</td>

                        <td>5</td>
                        <td>5</td>
                        <td>passed</td>

                        <th><input type={`checkbox`} checked={false}/></th>
                    </tr>
                    <tr>
                        <th><input type={`checkbox`} checked={true}/></th>

                        <td>Test #1</td>
                        <td>0</td>

                        <td>5</td>
                        <td>5</td>
                        <td>passed</td>

                        <td>1</td>
                        <td>5</td>
                        <td>failed</td>

                        <th><input type={`checkbox`} checked={false}/></th>
                    </tr>
                    <tr>
                        <th><input type={`checkbox`}/></th>

                        <td>Test #2</td>
                        <td>0</td>

                        <td>5</td>
                        <td>5</td>
                        <td>passed</td>

                        <td colSpan={3}>---</td>

                        <th><input type={`checkbox`} checked={false}/></th>
                    </tr>
                    <tr>
                        <th><input type={`checkbox`}/></th>

                        <td>Test #3</td>
                        <td>0</td>

                        <td>5</td>
                        <td>5</td>
                        <td>passed</td>

                        <td>5</td>
                        <td>5</td>
                        <td>passed</td>

                        <th><input type={`checkbox`} checked={false}/></th>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={10}>
                            <div>
                                <button>{`<<`}</button>
                                <button>{`<`}</button>
                                <button>1</button>
                                <button>2</button>
                                ..
                                <button>7</button>
                                <button disabled>8</button>
                                <button>9</button>
                                ..
                                <button>99</button>
                                <button>100</button>
                                <button>{`>`}</button>
                                <button>{`>>`}</button>
                            </div>
                            <div>
                                <label>
                                    📄
                                    <input type={`number`} min={1} max={100} step={1} value={4}/>
                                </label>
                            </div>
                        </th>
                    </tr>
                </tfoot>
            </table>
        )
    }
}
