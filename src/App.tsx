import React, { useState } from 'react';
import './App.css';
import { FiHome, FiCpu, FiUsers } from 'react-icons/fi';
import Graph from './components/Graph';
import Label from './components/Label';
import Home from './pages/Home';
import { IconType } from 'react-icons/lib/cjs';
import { Router, Link, Match } from '@reach/router';
import Sensors from './pages/Sensors';
import firebase from "firebase";
import { firebaseConfig } from './config';
import Login from './pages/Login';
import { User } from './types/User';
require("firebase/firestore");
require("firebase/auth");


type NavLinkProps = {
  name: string,
  to: string,
  icon: IconType
}

firebase.initializeApp(firebaseConfig);

function NavLink({name, to, icon}: NavLinkProps) {
  const [current, setCurrent] = useState<boolean>(false);
  const Icon = icon;
  const iconClass = current ? "text-black font-semibold outline-none" : "text-gray-600 group-hover:text-black transition-all duration-300 outline-none";
  const spanClass = current ? "pl-3 font-semibold outline-none" : "pl-3 group-hover:text-black text-gray-600 transition-all duration-300";
  return (
    <Link
      to={to}
      getProps={({isCurrent}) => {
        setCurrent(isCurrent);
        return {}
      }}
      className="outline-none"
    >
      <li className="flex flex-row items-center content-center mx-auto py-2 group cursor-pointer outline-none">
        <Icon size={20} className={iconClass}/>
        <span className={spanClass}>{name}</span>
      </li>
    </Link>
  )
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string|undefined>();
  const [password, setPassword] = useState<string|undefined>();

  const [incorrect, setIncorrect] = useState<boolean>(false);

  const handleSubmit = () => {
    firebase.auth().signInWithEmailAndPassword(email ?? "", password ?? "").then((user) => {
      const uid = user.user?.uid;
      firebase.firestore().collection("administrators").doc(uid).get().then(document => {
        if(document.exists) {
          setIsAuthenticated(true);
        } else {
          setIncorrect(true);
        }
      }).catch(() => {
      })
    }).catch(err => {
      setIncorrect(true);
    })
  }

  if(isAuthenticated) {
    return (
      <div className="container grid grid-cols-8 h-screen bg-gray-200 w-screen max-w-none overflow-x-hidden w-screen">
        <aside className="bg-white col-span-1 p-5 flex flex-col">
          <h1 className="text-2xl border-b pb-3 border-gray-400 h-12">Dashboard</h1>
          <nav>
            <ul className="pt-3">
              <NavLink name="Home" to="/" icon={FiHome}/>
              <NavLink name="Sensors" to="/sensors" icon={FiCpu}/>
              <NavLink name="Users" to="/users" icon={FiUsers}/>
            </ul>
          </nav>
        </aside>
        <div className="col-span-7">
          <Router>
              <Home path="/"/>
              <Sensors path="/sensors"/>
          </Router>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container grid grid-cols-8 h-screen bg-gray-200 w-screen overflow-x-hidden max-w-none">
        <div className="col-span-2 col-start-4 flex items-center justify-center h-full">
          <div className=" w-full bg-white rounded shadow px-6 py-6">
            <h1 className="text-2xl text-center pb-6">Login</h1>
            <form onSubmit={(e) => {handleSubmit(); e.preventDefault()}}>
              <input 
                placeholder="Email"
                autoFocus 
                className="py-3 border w-full pl-3 rounded border-gray-400 mb-4 focus:border-gray-600 transition duration-100" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                placeholder="Password"
                className="py-3 border w-full pl-3 rounded border-gray-400 focus:border-gray-600 transition duration-100"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {incorrect && 
                <p className="text-center pt-8">Incorrect username or password.</p>
              }
              <button
                className="bg-blue-600 w-full py-3 mt-8 text-white rounded"
                onClick={handleSubmit}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
