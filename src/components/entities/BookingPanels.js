import { useState } from "react";
import API from "../api/API.js";
import Panel from "../UI/Panel";
import { FaRegEdit } from "react-icons/fa";
import Button from "../UI/Button";
import BookingForm from "../entities/BookingForm";

export default function BookingPanels  ({bookings,loadingMessage,  reloadBookings}) {
  // Initialisation ---------
  const putEndpoint = '/bookings';

  // State --------
  const [selectedForm, setSelectedForm] = useState(0);

  // Context ---------
  // Methods ---------
const handleEdit = (id) => setSelectedForm(id === selectedForm ? 0 : id);
const handleDelete = () => {}
const handleSubmit = async (booking) => {
  const response = await API.put(`${putEndpoint}/${booking.BookingId}`, booking);
    if(response.isSuccess) {
      setSelectedForm(0);
      reloadBookings();

    }

}
const handleCancel = () => setSelectedForm(0);

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  return (
    <section>
    {
      !bookings
          ? <p>{loadingMessage}</p>
          : bookings.length === 0
              ? <p>You have no booking</p>
              : bookings.map((booking) =>
                  <Panel 
                      key={booking.BookingId} 
                      title={`${(new Date(booking.DateBooked)).toLocaleDateString(undefined, options)}`} 
                  >
                  <div className="card">
                     <div className="name">
                     Vehicle: {booking.VehicleMake} {booking.VehicleModel} {booking.VehicleYear} £{booking.VehiclePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                     </div>
                    <p>{JSON.stringify(booking.UserId)}</p>
                     <div className="name">
                        Customer Name: {booking.Customer}
                    
                     </div>
                     <div className="name">
                       Saleperson: {booking.Salesperson}
                      </div>
                  </div>


                  <Button color='(192, 192, 192)' iconName={<FaRegEdit/>} text='Edit' onClick={() => handleEdit(booking.BookingId)} ></Button>
                  <Button color='rgb(209, 69, 50)'  text='Cancel' onClick={handleDelete} ></Button>

                  {
                    (selectedForm === booking.BookingId) && 
                    <BookingForm onCancel={handleCancel} onSubmit={handleSubmit} initialBooking={booking}/>
                  }



                  

                  </Panel>
                  )  
  }
  </section>
  );
}

