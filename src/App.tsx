import React from 'react';
import './App.css';
import { FiHome, FiCpu, FiUsers } from 'react-icons/fi';
import Graph from './components/Graph';

function App() {
  return (
    <div className="container grid grid-cols-8 h-screen bg-gray-200 w-screen max-w-none">
      <aside className="bg-white col-span-1 p-5 flex flex-col">
        <h1 className="text-2xl border-b pb-3 border-gray-400 h-12">Dashboard</h1>
        <nav>
          <ul className="pt-3">
            <li className="flex flex-row items-center content-center mx-auto py-2"><FiHome size={20}/><a href="#" className="pl-3 font-semibold">Home</a></li>
            <li className="flex flex-row items-center content-center mx-auto py-2 group cursor-pointer">
              <FiCpu size={20} className="text-gray-600 group-hover:text-black transition-all duration-300"/>
              <a href="#" className="pl-3 group-hover:text-black text-gray-600 transition-all duration-300">Sensors</a>
            </li>
            <li className="flex flex-row items-center content-center mx-auto py-2 group cursor-pointer">
              <FiUsers size={20} className="text-gray-600 group-hover:text-black transition-all duration-300"/>
              <a href="#" className="pl-3 group-hover:text-black text-gray-600 transition-all duration-300">Users</a>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="col-span-7">
        <div className="border-b border-gray-400 m-5 h-12 flex items-center justify-between">
          <h1 className="text-2xl mb-4">Columbus, OH</h1>
          <button className="bg-blue-600 p-2 rounded text-white hover:bg-blue-700 transition-all duration-700 self-end my-3">Manage Connections</button>
        </div>
        <div className="m-5 flex items-center justify-between">
          <div className="rounded bg-white mr-3 shadow p-2 flex-initial w-full">
            <label className="text-xs font-bold text-gray-600">Temperature</label>
            <p className="text-5xl">59°</p>
          </div>
          <div className="rounded bg-white mx-3 shadow p-2 flex-initial w-full">
            <label className="text-xs font-bold text-gray-600">Humidity</label>
            <p className="text-5xl">80%</p>
          </div>
          <div className="rounded bg-white mx-3 shadow p-2 flex-initial w-full">
            <label className="text-xs font-bold text-gray-600">Wind</label>
            <p className="text-5xl">15mph</p>
          </div>
          <div className="rounded bg-white mx-3 shadow p-2 flex-initial w-full">
            <label className="text-xs font-bold text-gray-600">Week High</label>
            <p className="text-5xl">65°</p>
          </div>
          <div className="rounded bg-white mx-3 shadow p-2 flex-initial w-full">
            <label className="text-xs font-bold text-gray-600">Week Low</label>
            <p className="text-5xl">17°</p>
          </div>
          <div className="rounded bg-white ml-3 shadow p-2 flex-initial w-full">
            <label className="text-xs font-bold text-gray-600">Sensors Operational</label>
            <p className="text-5xl">100%</p>
          </div>
        </div>
        <div className="m-5 flex items-center justify-between">
          <div className="rounded bg-white mr-3 shadow p-2 flex-initial w-full overflow-hidden">
            <label className="text-xs font-bold text-gray-600">Temperature</label>
            <Graph data={{"3/6": 50, "3/7": 20, "3/8": 40}} color="#3182ce"/>
          </div>
          <div className="rounded bg-white mx-3 shadow p-2 flex-initial w-full overflow-hidden">
            <label className="text-xs font-bold text-gray-600">Humidity</label>
            <Graph data={{"3/6": 40, "3/7": 45, "3/8": 40}} color="#3182ce"/>
          </div>
          <div className="rounded bg-white ml-3 shadow p-2 flex-initial w-full overflow-hidden">
            <label className="text-xs font-bold text-gray-600">Precipitation</label>
            <Graph data={{"3/6": 20, "3/7": 50, "3/8": 10}} color="#3182ce"/>
          </div>
        </div>
        <div className="m-5 flex items-center justify-between">
          <div className="rounded bg-white mr-3 shadow p-2 flex-initial w-full overflow-hidden">
            <label className="text-xs font-bold text-gray-600">Temperature</label>
            <Graph data={{"3/6": 50, "3/7": 20, "3/8": 40}} color="#3182ce"/>
          </div>
          <div className="rounded bg-white mx-3 shadow p-2 flex-initial w-full overflow-hidden">
            <label className="text-xs font-bold text-gray-600">Humidity</label>
            <Graph data={{"3/6": 40, "3/7": 45, "3/8": 40}} color="#3182ce"/>
          </div>
          <div className="rounded bg-white ml-3 shadow p-2 flex-initial w-full overflow-hidden">
            <label className="text-xs font-bold text-gray-600">Precipitation</label>
            <Graph data={{"3/6": 20, "3/7": 50, "3/8": 10}} color="#3182ce"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
