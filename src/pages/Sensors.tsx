import React, { useState } from 'react';
import Label from '../components/Label';
import { FiChevronRight, FiCheckCircle, FiThermometer } from 'react-icons/fi';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import { maptoken, mapurl } from '../config';
import firebase from "firebase";
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
require("firebase/firestore");

type EditorProps = {
    uuid: string,
    onDone: () => void
}
function SensorEditor({uuid, onDone}: EditorProps) {
    const [doc, loading, error] = useDocument(firebase.firestore().collection("devices").doc(uuid));
    if(loading) {
        return (
            <span className="text-gray-600 text-3xl">Loading...</span>
        )
    } else if (error) {
        return (
            <span className="text-gray-600 text-3xl">Error loading sensor.</span>
        )
    } else if (doc) {
        return (
            <div className="w-full h-full p-2 flex flex-col">
                <input
                    value={doc.get("name")}
                    className="text-xl pb-2 focus:border-black focus:border-b-4 focus:border-8 border-b border-gray-400 border-b-4"
                    onChange={(e) => {firebase.firestore().collection("devices").doc(uuid).update({name: e.target.value})}}
                    autoFocus
                />
                <textarea
                    value={doc.get("notes")} 
                    className="resize-none mt-2 border-b border-gray-400 border-b-4 focus:border-8 focus:border-black focus:border-b-4"
                    onChange={(e) => {firebase.firestore().collection("devices").doc(uuid).update({notes: e.target.value})}}
                />
                <button 
                    className="p-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-all duration-700 self-end mt-2"
                    onClick={onDone}
                >
                        Done
                </button>
            </div>
        )
    } else {
        return (
            <span className="text-gray-600 text-3xl">Internal error.</span>
        )
    }
}

const Map = ReactMapboxGl({
    accessToken: maptoken
});

type Props = {
    path: string
}
function Sensors({}: Props) {
    const [displayDetail, setDisplayDetail] = useState<boolean>(false);

    const [sensors, sensorsLoading, sensorsError] = useCollection(
        firebase.firestore().collection("devices")
    );

    const [editorUUID, setEditorUUID] = useState<string>("");
    
    return (
        <div className="h-screen overflow-x-hidden pb-5">
            <div className="border-b border-gray-400 m-5 h-12 flex items-center justify-between">
                <h1 className="text-2xl mb-4">Columbus, OH</h1>
            </div>
            <div className="m-5 grid grid-cols-12 h-screen overflow-hidden">
                <div className="rounded bg-white mr-6 shadow col-span-3 overflow-hidden mb-5 box-border">
                    <Label className="px-2 pt-2">
                        Sensors
                    </Label>
                    <ul className="h-auto">
                        {sensorsLoading && 
                            <li>Loading...</li>
                        }
                        {sensors?.docs.map(doc => {
                            const additionalClass = doc.id === editorUUID ? "bg-gray-300" : "";
                            return (
                                <li
                                    className={"py-4 flex items-center justify-between border-b border-gray-400 cursor-pointer group px-2 transition duration-75 " + additionalClass}
                                    onClick={() => {setEditorUUID(doc.id); setDisplayDetail(true)}}
                                >
                                    <span className="flex"><FiCheckCircle size={25} className="mr-2 group-hover:bg-gray-900"/>{doc.get("name")}</span>
                                    <FiChevronRight size={20} className="group-hover:font-semibold"/>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="col-span-9 overflow-hidden flex w-full flex-col h-full box-border">
                    <div className="bg-white rounded shadow h-56 mb-5 transition duration-500 overflow-hidden flex items-center justify-center">
                        {!displayDetail && <span className="text-gray-600 text-3xl">Select a sensor to edit.</span>}
                        {displayDetail && 
                            <SensorEditor 
                                uuid={editorUUID}
                                onDone={() => {setDisplayDetail(false);setEditorUUID("")}}
                            />
                        }
                    </div>
                    <div className="bg-white rounded shadow flex-grow-1 p-2 transition duration-100 w-full h-full">
                        <Map
                            style={mapurl}
                            containerStyle={{width: "100%", height: "100%"}}
                            center={[-83.002389, 39.959194]}
                            zoom={[15]}
                            className="transition duration-100"
                        >
                            {sensors?.docs.map(doc => {
                                const backgroundColor = editorUUID == doc.id ? "#2E733C" : "#47B35C";
                                return (
                                    <Marker coordinates={[doc.get("longitude"), doc.get("latitude")]} onClick={() => {setDisplayDetail(true); setEditorUUID(doc.id)}}>
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center cursor-pointer transition duration-100" style={{backgroundColor}}>
                                            <FiThermometer size={21} color="#fff" className="mx-auto"/>
                                        </div>
                                    </Marker>
                                )
                            })}
                        </Map>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sensors;