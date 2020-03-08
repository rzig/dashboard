import React from 'react'
import { AreaChart } from 'react-chartkick'
import 'chart.js'

type Data = {[key: string]: number}
type Props = {
    data: Data,
    color: string
}
function Graph({data, color}: Props) {
    return (
        <AreaChart data={data} library={{type: "bar"}}/>
    )
}

export default Graph;