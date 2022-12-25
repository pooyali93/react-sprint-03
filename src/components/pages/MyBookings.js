import { useState } from "react";
import API from "../api/API.js";
import useLoad from "../api/useLoad.js";
import { FaPlus } from "react-icons/fa";
import Button from "../UI/Button";
import './MyBookings.scss'
import BookingForm from "../entities/BookingForm";
import BookingPanels from "../entities/BookingPanels.js";


export default function MyBookings() {
    // Initialisation ---------
    // const loggedinUserID = 3;
    const endpoint = '/bookings';

    // State --------
    const [bookings, , loadingMessage, loadBookings] = useLoad(endpoint)
    const [showAddBookingForm, setShowAddBookingForm] = useState(false);
    
    // Context ---------
    // Methods ---------
    const toggleAddForm = () => setShowAddBookingForm(!showAddBookingForm);
    const cancelAddForm = () => setShowAddBookingForm(false);

    const handleAddSubmit = async(booking) => {
        const response = await API.post(endpoint, booking);
        return response.isSuccess
            ? loadBookings(endpoint)  || true
            : false;
    }
    
    const shortTime = new Intl.DateTimeFormat("en", {
        timeStyle: "short"
      });
    // View ---------
    return (
        <section>
            {
                !bookings
                ? <p>{loadingMessage}</p>
                : bookings.length === 0
                    ? <p>You do not have any bookings</p>
                    :  <BookingPanels bookings={bookings} reloadBookings = {() => loadBookings(endpoint) }/>
            }
          
            <div  className="button">
                <Button color='rgb(58, 110, 165)' iconName={<FaPlus/>} text='Add' onClick={toggleAddForm} ></Button>
            </div>
            <div className="form-container">
                {
                    showAddBookingForm && <BookingForm onCancel={cancelAddForm} onSubmit={handleAddSubmit}/> 
                }
            </div>
        </section>
    )
}