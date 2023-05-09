import React from 'react'

const ShowTimeSlot = ({ timeSlot, handleTimeSlot }) => {
    return (
        <>
            <select name="morningStart" value={timeSlot.morningStart} onChange={handleTimeSlot}>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
            </select>
            <select name="morningEnd" value={timeSlot.morningEnd} onChange={handleTimeSlot}>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
            </select>
            <select name="eveningStart" value={timeSlot.eveningStart} onChange={handleTimeSlot}>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
            </select>
            <select name="eveningEnd" value={timeSlot.eveningEnd} onChange={handleTimeSlot}>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
            </select>
        </>
    )
}

export default ShowTimeSlot