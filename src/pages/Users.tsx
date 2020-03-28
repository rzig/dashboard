import React, { useEffect, useState, useReducer } from 'react';
import firebase from "firebase";
import { User } from '../types/User';
import executeCloudFunction from '../helpers/executeCloudFunction';
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
            updates.push({
                type: "CREATE",
                user: {
                    email: action.user.email,
                    password: action.user.password,
                    admin: action.user.admin
                }
            })
            return {users: [...state.users, action.user]}
        }
        case 'UPDATE_USER': {
            const newUsers = [...state.users];
            for(let i = 0; i < newUsers.length; i++) {
                if(newUsers[i].uid == action.uid) {
                    newUsers[i] = Object.assign({}, newUsers[i], action.newValues)
                }
            }
            updates.push({
                type: "UPDATE",
                uid: action.uid,
                newValues: {
                    ...action.newValues,
                    isAdmin: action.newValues.admin
                }
            });
            return {users: newUsers}
        }
        case 'DELETE_USER': {
            const newUsers = state.users.filter(user => {
                return user.uid != action.uid;
            });
            updates.push({
                type: "DELETE",
                uid: action.uid
            });
            return {users: newUsers};
        }
        default: {
            throw new Error("Action type " + action.type + " is not recognized.")
        }
    }
}

type Update = {
    type: "UPDATE"|"CREATE"|"DELETE",
    [key:string]: any
}

// it's quick but it works lmao
const updates: Array<Update> = [];

type Props = {
    path: string
}
function Users({}: Props) {
    const [usersState, usersDispatch] = useReducer(usersReducer, {users: []});
    const [usersLoaded, setUsersLoaded] = useState<boolean>(false);
    const [usersError, setUsersError] = useState<boolean>(false);
    const [idToken, setIdToken] = useState<string>("");

    useEffect(() => {
        firebase.auth().currentUser?.getIdToken().then(token => {
            setIdToken(token)
            executeCloudFunction<any>("listUsers", {token: token}).then(res => {
                usersDispatch({type: "SET_USERS", users: res.users});
                setUsersLoaded(true);
            }).catch(err => {
                setUsersError(true);
                setUsersLoaded(false);
            });
        });
    }, []);

    const flushUpdates = () => {
        if(idToken == "") { return }
        while(updates.length > 0) {
            const update = updates.shift();
            switch(update?.type) {
                case "CREATE": {
                    executeCloudFunction("createUser", {
                        token: idToken,
                        user: update.user
                    })
                    break;
                }
                case "UPDATE": {
                    executeCloudFunction("updateUser", {
                        token: idToken,
                        uid: update.uid,
                        newValues: update.newValues
                    });
                    break;
                }
                case "DELETE": {
                    executeCloudFunction("deleteUser", {
                        token: idToken,
                        uid: update.uid
                    });
                    break;
                }
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(flushUpdates, 5000);
        return () => {
            clearInterval(interval);
            flushUpdates();
        }
    })

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
                                {usersState.users.map((user, index) => (
                                    <tr className={index % 2 == 1 ? "bg-gray-400" : ""}>
                                        <td className="pt-3 pl-1 pr-5">
                                            <input
                                                value={user.email}
                                                type="email"
                                                className="pb-1 mb-1 focus:border-black focus:border-b-4 focus:border-8 border-b border-transparent border-b w-full bg-transparent"
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