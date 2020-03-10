import React from 'react';
import Label from '../components/Label';
import Graph from '../components/Graph';

type Props = {
    path: string
}

function Home({path}: Props) {
    return (
        <>
            <div className="border-b border-gray-400 m-5 h-12 flex items-center justify-between">
                <h1 className="text-2xl mb-4">Columbus, OH</h1>
                <button className="bg-blue-600 p-2 rounded text-white hover:bg-blue-700 transition-all duration-700 self-end my-3">Manage Connections</button>
            </div>
            <div className="m-5 flex items-center justify-between">
                <div className="rounded bg-white mr-3 shadow p-2 flex-initial w-full">
                    <Label>Temperature</Label>
                    <p className="text-5xl">59°</p>
                </div>
                <div className="rounded bg-white mx-3 shadow p-2 flex-initial w-full">
                    <Label>Humidity</Label>
                    <p className="text-5xl">80%</p>
                </div>
                <div className="rounded bg-white mx-3 shadow p-2 flex-initial w-full">
                    <Label>Wind</Label>
                    <p className="text-5xl">15mph</p>
                </div>
                <div className="rounded bg-white mx-3 shadow p-2 flex-initial w-full">
                    <Label>Week High</Label>
                    <p className="text-5xl">65°</p>
                </div>
                <div className="rounded bg-white mx-3 shadow p-2 flex-initial w-full">
                    <Label>Week Low</Label>
                    <p className="text-5xl">17°</p>
                </div>
                <div className="rounded bg-white ml-3 shadow p-2 flex-initial w-full">
                    <Label>Sensors Operational</Label>
                    <p className="text-5xl">100%</p>
                </div>
            </div>
            <div className="m-5 flex items-center justify-between">
                <div className="rounded bg-white mr-3 shadow p-2 flex-initial w-full overflow-hidden">
                    <Label>Temperature</Label>
                    <Graph data={{"3/6": 50, "3/7": 20, "3/8": 40}} color="#3182ce"/>
                </div>
                <div className="rounded bg-white mx-3 shadow p-2 flex-initial w-full overflow-hidden">
                    <Label>Humidity</Label>
                    <Graph data={{"3/6": 40, "3/7": 45, "3/8": 40}} color="#3182ce"/>
                </div>
                <div className="rounded bg-white ml-3 shadow p-2 flex-initial w-full overflow-hidden">
                    <Label>Precipitation</Label>
                    <Graph data={{"3/6": 20, "3/7": 50, "3/8": 10}} color="#3182ce"/>
                </div>
            </div>
            <div className="m-5 flex items-center justify-between">
                <div className="rounded bg-white mr-3 shadow p-2 flex-initial w-full overflow-hidden">
                    <Label>Temperature</Label>
                    <Graph data={{"3/6": 50, "3/7": 20, "3/8": 40}} color="#3182ce"/>
                </div>
                <div className="rounded bg-white mx-3 shadow p-2 flex-initial w-full overflow-hidden">
                    <Label>Humidity</Label>
                    <Graph data={{"3/6": 40, "3/7": 45, "3/8": 40}} color="#3182ce"/>
                </div>
                <div className="rounded bg-white ml-3 shadow p-2 flex-initial w-full overflow-hidden">
                    <Label>Precipitation</Label>
                    <Graph data={{"3/6": 20, "3/7": 50, "3/8": 10}} color="#3182ce"/>
                </div>
            </div>
        </>
    )
}

export default Home;