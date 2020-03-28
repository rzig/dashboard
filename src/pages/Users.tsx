import React, { useEffect, useState, useReducer } from 'react';
import firebase from "firebase";
import { User } from '../types/User';
require("firebase/auth");

type UsersReducerState = {
    users: Array<User>
}
type Action = {
    type: 'SET_USERS'|'UPDATE_USER'|'ADD_USER'|'DELETE_USER',
    [key:string]: any
}
function usersReducer(state: UsersReducerState, action: Action): UsersReducerState {
    switch(action.type) {
        case 'SET_USERS': {
            return {users: action.users}
        }
        case 'ADD_USER': {
            return {users: [...state.users, action.user]}
        }
        case 'UPDATE_USER': {
            const newUsers = [...state.users];
            for(let i = 0; i < newUsers.length; i++) {
                if(newUsers[i].uid == action.uid) {
                    newUsers[i] = Object.assign({}, newUsers[i], action.newValues)
                }
            }
            return {users: newUsers}
        }
        case 'DELETE_USER': {
            const newUsers = state.users.filter(user => {
                return user.uid != action.uid;
            });
            return {users: newUsers};
        }
        default: {
            throw new Error("Action type " + action.type + " is not recognized.")
        }
    }
}

type Props = {
    path: string
}
function Users({}: Props) {
    const [usersState, usersDispatch] = useReducer(usersReducer, {users: []});
    const [usersLoaded, setUsersLoaded] = useState<boolean>(false);
    const [usersError, setUsersError] = useState<boolean>(false);
    useEffect(() => {
        firebase.auth().currentUser?.getIdToken().then(idToken => {
            fetch("https://us-central1-cbus-hack-2020.cloudfunctions.net/listUsers", {
                method: "POST",
                body: '{"token": "' + idToken + '"}',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(result => {
                return result.json()
            }).then(json => {
                usersDispatch({type: 'SET_USERS', users: json.users})
                setUsersLoaded(true);
            }).catch(err => {
                setUsersError(true);
                setUsersLoaded(false);
            });
        });
    }, []);
    return (
        <div className="h-screen overflow-x-hidden">
            <div className="border-b border-gray-400 m-5 h-12 flex items-center justify-between">
                <h1 className="text-2xl mb-4">Columbus, OH</h1>
            </div>
            <div className="m-5 grid grid-cols-12 h-full">
                {!usersLoaded && 
                    <span className="text-gray-600 text-3xl">Loading...</span>
                }
                {usersLoaded && 
                    <div className="bg-white rounded shadow p-2 col-span-8 h-full">
                        <table className="w-full table-auto">
                            <thead>
                                <th>
                                    <td className="pl-1">Email Address</td>
                                </th>
                                <th>
                                    <td>Admin</td>
                                </th>
                                <th>
                                    <td>Last login date</td>
                                </th>
                            </thead>
                            <tbody>
                                {usersState.users.map(user => (
                                    <tr>
                                        <td className="py-3 pl-1">
                                            <input
                                                value={user.email}
                                                type="email"
                                                className="pb-2 pb-2 focus:border-black focus:border-b-4 focus:border-8 border-b border-white border-b"
                                                onChange={(e) => {usersDispatch({type: "UPDATE_USER", uid: user.uid, newValues: {email: e.target.value}})}}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                value="Yes"
                                                checked={user.admin}
                                                onChange={(e) => {usersDispatch({type: "UPDATE_USER", uid: user.uid, newValues: {admin: e.target.checked}})}}
                                            />
                                        </td>
                                        <td>{user.lastLogin}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}

export default Users;