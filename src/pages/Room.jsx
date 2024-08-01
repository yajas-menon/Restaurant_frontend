import Navbar from '../components/Navbar'
import axios from "axios"
import { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import { Audio } from 'react-loader-spinner'

const Room = () => {
    const [audioBlob, setAudioBlob] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [gettingText, setGettingText] = useState(false);
    const [formData, setFormData] = useState({
        complaint: '',
        roomNumber: '',
        area: '',
        department: 'general',
        description: '',
        priority: 'Low',
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
                    complaint: data.complaint,
                    roomNumber: data.roomNumber,
                    area: data.area,
                    department: data.department,
                    description: data.description,
                    priority: data.priority
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            "name": "Rahul",
            "eid": 1452434,
            "time": new Date(),
            ...formData
        }
        try {
            await axios.post('http://localhost:8000/lodgecomplaint', payload);
            alert('Complaint submitted successfully!');
            setFormData({
                complaint: '',
                roomNumber: '',
                area: '',
                department: 'General',
                description: '',
                priority: 'Low',
            });
        } catch (error) {
            console.error('Error submitting complaint:', error);
            alert('Failed to submit complaint. Please try again.');
        }
    };

    return <div>
        <Navbar />
        <form className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-6 text-center">Lodge a Complaint</h2>
            <div className="mb-4">
                <label htmlFor="complaint" className="block mb-2 text-sm font-medium text-gray-900">Complaint</label>
                <input type="text" id="complaint" name="complaint" value={formData.complaint} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div className="mb-4">
                <label htmlFor="roomNumber" className="block mb-2 text-sm font-medium text-gray-900">Room Number</label>
                <input type="text" id="roomNumber" name="roomNumber" value={formData.roomNumber} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="mb-4">
                <label htmlFor="area" className="block mb-2 text-sm font-medium text-gray-900">Area</label>
                <input type="text" id="area" name="area" value={formData.area} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>

            <div className="mb-4">
                <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900">Department</label>
                <select id="department" name="department" value={formData.department} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="plubming">Plubming</option>
                    <option value="electrical">Electrical</option>
                    <option value="hvac">HVAC (Heating, Ventilation, Air Conditioning)</option>
                    <option value="housekeeping">Housekeeping</option>
                    <option value="general">General</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Detailed Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required></textarea>
            </div>
            {/* plubming, electrical, hvac, housekeeping, general */}
            <div className="mb-4">
                <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900">Priority</label>
                <select id="priority" name="priority" value={formData.priority} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
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
                            }} type="button" style={{ display: 'flex', justifyContent: 'center' }} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
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
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit Complaint</button>
        </form>

    </div>
}

export default Room;