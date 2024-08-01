import React, { useState } from 'react'
import kitchen from '../assets/kitchen-image.jpg'
import Navbar from '../components/Navbar'
import api from '../utils/api';
import { useParams } from 'react-router-dom'
import { ReactMediaRecorder } from 'react-media-recorder';
import { Audio } from 'react-loader-spinner'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Issues = () => {
    const params = useParams(); // Extract sectionName from URL parameters
    const [audioBlob, setAudioBlob] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [gettingText, setGettingText] = useState(false);
    const [formData, setFormData] = useState({
        faultType: '',
        deviceName: '',
        deviceCode: '',
        description: '',
        issuePhoto: null,
    });

    const handleStop = (blobUrl, blob) => {
        setAudioBlob(blob);
        // Optionally, you can play the recorded audio
        // const audio = new Audio(blobUrl);
        // audio.play();
        console.log("rec stopped")
        sendAudioToBackend(blob);
    };


    const sendAudioToBackend = async (blob) => {
        console.log("sending audio...");
        setGettingText(true)
        if (!blob) return;

        const formData = new FormData();
        formData.append('audio', blob, 'recording.wav');

        try {
            const response = await fetch('http://localhost:5000/sendaudio', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                setFormData(prevData => ({
                    ...prevData,
                    faultType: data.faultType,
                    deviceName: data.deviceName,
                    deviceCode: data.deviceCode,
                    description: data.description,
                }));
            } else {
                console.error('Failed to send audio.');
            }
        } catch (error) {
            console.error('Error sending audio:', error);
        } finally {
            setGettingText(false);
        }
    };

    const handleRecordingClick = () => {
        if (!isRecording) {
            setIsRecording(true);
        } else {
            setIsRecording(false);
            sendAudioToBackend();
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, issuePhoto: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
        };

        const formDataToSend = new FormData();
        formDataToSend.append('faultType', formData.faultType);
        formDataToSend.append('deviceName', formData.deviceName);
        formDataToSend.append('deviceCode', formData.deviceCode);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('issuePhoto', formData.issuePhoto);
        formDataToSend.append('sectionName', params.id);

        try {
            await api.post('/api/auth/create', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Issue submitted successfully, Thanks!")
            setFormData({
                faultType: '',
                deviceName: '',
                deviceCode: '',
                description: '',
                issuePhoto: null,
            });
        } catch (error) {
            console.error('Error submitting complaint:', error);
            alert('Failed to submit complaint. Please try again.');
        }
    };

    return <div>
        <Navbar />
        <div className="flex">
            <img src={kitchen} aria-hidden alt="vendor image" className="w-1/2 h-screen object-cover" />
            <div className="min-h-screen w-1/2 flex items-center justify-center bg-white">
                <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-2xl">
                    <form className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-semibold mb-6 text-center">Lodge a Complaint</h2>
                        <div className="mb-4">
                            <label htmlFor="complaint" className="block mb-2 text-sm font-medium text-gray-900">Type of Fault?</label>
                            <input placeholder="connection" type="text" id="complaint" name="faultType" value={formData.faultType} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="roomNumber" className="block mb-2 text-sm font-medium text-gray-900">Device Name</label>
                            <input placeholder='WiFi' type="text" id="roomNumber" name="deviceName" value={formData.deviceName} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="area" className="block mb-2 text-sm font-medium text-gray-900">Device Code</label>
                            <input placeholder='123' type="text" id="area" name="deviceCode" value={formData.deviceCode} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Detailed Description</label>
                            <textarea placeholder='Not able to connect to WiFi in room no 303'id="description" name="description" value={formData.description} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="issuePhoto" className="block mb-2 text-sm font-medium text-gray-900">Photo of issue</label>
                            <input
                                type="file"
                                name="issuePhoto"
                                className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit Complaint</button>
                        <div className="relative my-8">
                                <hr className="border-gray-300"/>
                                <span className="absolute left-1/2 transform -translate-x-1/2 bg-white px-2 text-gray-500">OR</span>
                            </div>
                        <ReactMediaRecorder
                            audio
                            onStop={handleStop}
                            render={({ status, startRecording, stopRecording }) => (
                                <div>
                                    <div className="mb-4">
                                        <button onClick={() => {
                                            if (!isRecording) {
                                                startRecording();
                                            } else {
                                                stopRecording();
                                            }
                                            handleRecordingClick();
                                        }} type="button" style={{ display: 'flex', justifyContent: 'center' }} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2">
                                            {
                                                gettingText ? <Audio
                                                    height="16"
                                                    width="80"
                                                    radius="9"
                                                    color="white"
                                                    ariaLabel="loading"
                                                    wrapperStyle
                                                    wrapperClass
                                                />
                                                    :
                                                    (
                                                        isRecording ? 'Stop recording'
                                                            :
                                                            'Fill by voice'
                                                    )
                                            }
                                        </button>
                                    </div>
                                </div>
                            )}
                        />

                    </form>
                </div>
            </div>
        </div>
    </div>
}

export default Issues
