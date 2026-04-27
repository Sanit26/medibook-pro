import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import DoctorTypes "../types/doctors";
import AppointmentTypes "../types/appointments";

module {
  public func toPublic(doctor : DoctorTypes.Doctor) : DoctorTypes.DoctorPublic {
    {
      id = doctor.id;
      name = doctor.name;
      specialization = doctor.specialization;
      fees = doctor.fees;
      availability = doctor.availability;
      isActive = doctor.isActive;
      createdAt = doctor.createdAt;
    };
  };

  public func addDoctor(
    doctors : List.List<DoctorTypes.Doctor>,
    nextId : Nat,
    input : DoctorTypes.AddDoctorInput,
  ) : DoctorTypes.DoctorPublic {
    let doctor : DoctorTypes.Doctor = {
      id = nextId;
      var name = input.name;
      var specialization = input.specialization;
      var fees = input.fees;
      var availability = input.availability;
      var isActive = true;
      createdAt = Time.now();
    };
    doctors.add(doctor);
    toPublic(doctor);
  };

  public func updateDoctor(
    doctors : List.List<DoctorTypes.Doctor>,
    id : CommonTypes.DoctorId,
    input : DoctorTypes.UpdateDoctorInput,
  ) : ?DoctorTypes.DoctorPublic {
    let found = doctors.find(func(d : DoctorTypes.Doctor) : Bool { d.id == id });
    switch (found) {
      case null { null };
      case (?doc) {
        switch (input.name) { case (?n) { doc.name := n }; case null {} };
        switch (input.specialization) { case (?s) { doc.specialization := s }; case null {} };
        switch (input.fees) { case (?f) { doc.fees := f }; case null {} };
        switch (input.availability) { case (?a) { doc.availability := a }; case null {} };
        switch (input.isActive) { case (?a) { doc.isActive := a }; case null {} };
        ?toPublic(doc);
      };
    };
  };

  public func deleteDoctor(
    doctors : List.List<DoctorTypes.Doctor>,
    id : CommonTypes.DoctorId,
  ) : Bool {
    let found = doctors.find(func(d : DoctorTypes.Doctor) : Bool { d.id == id and d.isActive });
    switch (found) {
      case null { false };
      case (?doc) {
        doc.isActive := false;
        true;
      };
    };
  };

  public func listDoctors(
    doctors : List.List<DoctorTypes.Doctor>,
  ) : [DoctorTypes.DoctorPublic] {
    let active = doctors.filter(func(d : DoctorTypes.Doctor) : Bool { d.isActive });
    active.map<DoctorTypes.Doctor, DoctorTypes.DoctorPublic>(func(d) { toPublic(d) }).toArray();
  };

  public func getDoctor(
    doctors : List.List<DoctorTypes.Doctor>,
    id : CommonTypes.DoctorId,
  ) : ?DoctorTypes.DoctorPublic {
    switch (doctors.find(func(d : DoctorTypes.Doctor) : Bool { d.id == id and d.isActive })) {
      case (?d) { ?toPublic(d) };
      case null { null };
    };
  };

  public func getAvailableSlots(
    doctors : List.List<DoctorTypes.Doctor>,
    appointments : List.List<AppointmentTypes.Appointment>,
    doctorId : CommonTypes.DoctorId,
    date : Text,
    dayOfWeek : CommonTypes.DayOfWeek,
  ) : [DoctorTypes.TimeSlot] {
    // Find the doctor
    let doctorOpt = doctors.find(func(d : DoctorTypes.Doctor) : Bool { d.id == doctorId and d.isActive });
    let doctor = switch (doctorOpt) {
      case null { return [] };
      case (?d) { d };
    };
    // Find the day's scheduled slots
    let scheduleOpt = doctor.availability.find(
      func(s : DoctorTypes.DaySchedule) : Bool { s.day == dayOfWeek }
    );
    let allSlots = switch (scheduleOpt) {
      case null { return [] };
      case (?s) { s.slots };
    };
    // Filter out already-booked slots
    allSlots.filter(
      func(slot : DoctorTypes.TimeSlot) : Bool {
        not appointments.any(func(a : AppointmentTypes.Appointment) : Bool {
          a.doctorId == doctorId and
          a.date == date and
          a.timeSlot == slot and
          a.status == #Upcoming
        })
      }
    );
  };
};
