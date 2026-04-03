import React from "react";
import {setWorkingHours} from "../services/courierService";

export default function CourierProfileManagement({ user }) {
    const [data, setData] = React.useState({
        dayOfWeek: 0,
        startTime: "",
        endTime: ""
    });
    const [success, setSuccess] = React.useState("");
    const [error, setError] = React.useState(null);
    const formatTime = (time) => time.length === 5 ? `${time}:00` : time;

    async function handleSubmit() {
        setError(null);
        setSuccess("");

        const payload = {
            dayOfWeek: Number(data.dayOfWeek),
            startTime: formatTime(data.startTime),
            endTime: formatTime(data.endTime),
        };

        try{
            await setWorkingHours(payload);
            setSuccess("Working Hours added successfully.");
        } catch (error) {
            setError("Please fill in all fields. End time must be later than start time.");
        }
    }

    return (
        <div className="page-layout">
            <div className="page-header">
                <h1>Manage your profile</h1>
                <p>Hey <span id="courier-name">{user.username}</span>, just a friendly reminder to set your working hours.</p>
            </div>

            <div className="page-content">
                <div className="working-hours-form-grid">
                    <div className="field">
                        <label htmlFor="dayOfWeek">Day:</label>
                        <select name="dayOfWeek" id="dayOfWeek" value={data.dayOfWeek} onChange={(e) => setData({...data, dayOfWeek: e.target.value})}>
                            <option value={0}>Monday</option>
                            <option value={1}>Tuesday</option>
                            <option value={2}>Wednesday</option>
                            <option value={3}>Thursday</option>
                            <option value={4}>Friday</option>
                            <option value={5}>Saturday</option>
                            <option value={6}>Sunday</option>
                        </select>
                    </div>

                    <div className="field">
                        <label htmlFor="startTime">Start Time:</label>
                        <input type="time" name="startTime" id="startTime" value={data.startTime} onChange={(e) => setData({...data, startTime: e.target.value})}/>
                    </div>

                    <div className="field">
                        <label htmlFor="endTime">End Time:</label>
                        <input type="time" name="endTime" id="endTime" value={data.endTime} onChange={(e) => setData({...data, endTime: e.target.value})}/>
                    </div>

                    <button className="btn-submit" onClick={()=> handleSubmit()}>Submit</button>
                    {error && <div className="alert">{error}</div>}
                    {success && <div className="success">{success}</div>}
                </div>
            </div>

        </div>
    )
}