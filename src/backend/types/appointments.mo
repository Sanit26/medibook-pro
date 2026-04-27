import CommonTypes "common";

module {
  public type AppointmentStatus = {
    #Upcoming;
    #Completed;
    #Cancelled;
  };

  public type Appointment = {
    id : CommonTypes.AppointmentId;
    patientId : CommonTypes.UserId;
    doctorId : CommonTypes.DoctorId;
    date : Text; // ISO date string "YYYY-MM-DD"
    timeSlot : Text; // e.g. "09:00"
    var status : AppointmentStatus;
    fees : Nat;
    createdAt : CommonTypes.Timestamp;
    var updatedAt : CommonTypes.Timestamp;
  };

  public type AppointmentPublic = {
    id : CommonTypes.AppointmentId;
    patientId : CommonTypes.UserId;
    doctorId : CommonTypes.DoctorId;
    date : Text;
    timeSlot : Text;
    status : AppointmentStatus;
    fees : Nat;
    createdAt : CommonTypes.Timestamp;
    updatedAt : CommonTypes.Timestamp;
  };

  public type BookAppointmentInput = {
    doctorId : CommonTypes.DoctorId;
    date : Text;
    timeSlot : Text;
  };

  public type RescheduleInput = {
    appointmentId : CommonTypes.AppointmentId;
    newDate : Text;
    newTimeSlot : Text;
  };
};
