import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import CommonTypes "../types/common";
import AppointmentTypes "../types/appointments";

module {
  public func toPublic(appt : AppointmentTypes.Appointment) : AppointmentTypes.AppointmentPublic {
    {
      id = appt.id;
      patientId = appt.patientId;
      doctorId = appt.doctorId;
      date = appt.date;
      timeSlot = appt.timeSlot;
      status = appt.status;
      fees = appt.fees;
      createdAt = appt.createdAt;
      updatedAt = appt.updatedAt;
    };
  };

  public func isSlotBooked(
    appointments : List.List<AppointmentTypes.Appointment>,
    doctorId : CommonTypes.DoctorId,
    date : Text,
    timeSlot : Text,
  ) : Bool {
    appointments.any(func(a : AppointmentTypes.Appointment) : Bool {
      a.doctorId == doctorId and
      a.date == date and
      a.timeSlot == timeSlot and
      a.status == #Upcoming
    });
  };

  public func bookAppointment(
    appointments : List.List<AppointmentTypes.Appointment>,
    nextId : Nat,
    caller : CommonTypes.UserId,
    input : AppointmentTypes.BookAppointmentInput,
    fees : Nat,
  ) : { #ok : AppointmentTypes.AppointmentPublic; #doubleBooking } {
    if (isSlotBooked(appointments, input.doctorId, input.date, input.timeSlot)) {
      return #doubleBooking;
    };
    let now = Time.now();
    let appt : AppointmentTypes.Appointment = {
      id = nextId;
      patientId = caller;
      doctorId = input.doctorId;
      date = input.date;
      timeSlot = input.timeSlot;
      var status = #Upcoming;
      fees = fees;
      createdAt = now;
      var updatedAt = now;
    };
    appointments.add(appt);
    #ok(toPublic(appt));
  };

  public func rescheduleAppointment(
    appointments : List.List<AppointmentTypes.Appointment>,
    caller : CommonTypes.UserId,
    input : AppointmentTypes.RescheduleInput,
  ) : { #ok : AppointmentTypes.AppointmentPublic; #notFound; #unauthorized; #alreadyBooked } {
    let found = appointments.find(func(a : AppointmentTypes.Appointment) : Bool {
      a.id == input.appointmentId
    });
    switch (found) {
      case null { return #notFound };
      case (?appt) {
        if (not Principal.equal(appt.patientId, caller)) {
          return #unauthorized;
        };
        // Check new slot not already booked (by another appointment)
        let alreadyBooked = appointments.any(func(a : AppointmentTypes.Appointment) : Bool {
          a.id != input.appointmentId and
          a.doctorId == appt.doctorId and
          a.date == input.newDate and
          a.timeSlot == input.newTimeSlot and
          a.status == #Upcoming
        });
        if (alreadyBooked) {
          return #alreadyBooked;
        };
        // date and timeSlot are immutable fields, so we replace the item in the list
        let now = Time.now();
        var rescheduled : AppointmentTypes.AppointmentPublic = toPublic(appt);
        appointments.mapInPlace(func(a : AppointmentTypes.Appointment) : AppointmentTypes.Appointment {
          if (a.id == input.appointmentId) {
            let newAppt : AppointmentTypes.Appointment = {
              id = a.id;
              patientId = a.patientId;
              doctorId = a.doctorId;
              date = input.newDate;
              timeSlot = input.newTimeSlot;
              var status = a.status;
              fees = a.fees;
              createdAt = a.createdAt;
              var updatedAt = now;
            };
            rescheduled := toPublic(newAppt);
            newAppt;
          } else { a };
        });
        #ok(rescheduled);
      };
    };
  };

  public func cancelAppointment(
    appointments : List.List<AppointmentTypes.Appointment>,
    caller : CommonTypes.UserId,
    appointmentId : CommonTypes.AppointmentId,
    isAdmin : Bool,
  ) : { #ok; #notFound; #unauthorized } {
    let found = appointments.find(func(a : AppointmentTypes.Appointment) : Bool {
      a.id == appointmentId
    });
    switch (found) {
      case null { #notFound };
      case (?appt) {
        if (not isAdmin and not Principal.equal(appt.patientId, caller)) {
          return #unauthorized;
        };
        appt.status := #Cancelled;
        appt.updatedAt := Time.now();
        #ok;
      };
    };
  };

  public func getPatientAppointments(
    appointments : List.List<AppointmentTypes.Appointment>,
    patientId : CommonTypes.UserId,
  ) : [AppointmentTypes.AppointmentPublic] {
    appointments
      .filter(func(a : AppointmentTypes.Appointment) : Bool {
        Principal.equal(a.patientId, patientId)
      })
      .map<AppointmentTypes.Appointment, AppointmentTypes.AppointmentPublic>(func(a) { toPublic(a) })
      .toArray();
  };

  public func getAllAppointments(
    appointments : List.List<AppointmentTypes.Appointment>,
  ) : [AppointmentTypes.AppointmentPublic] {
    appointments
      .map<AppointmentTypes.Appointment, AppointmentTypes.AppointmentPublic>(func(a) { toPublic(a) })
      .toArray();
  };
};
