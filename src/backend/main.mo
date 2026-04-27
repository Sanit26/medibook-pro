import List "mo:core/List";
import Time "mo:core/Time";
import AuthTypes "types/auth";
import DoctorTypes "types/doctors";
import AppointmentTypes "types/appointments";
import AuthApi "mixins/auth-api";
import DoctorsApi "mixins/doctors-api";
import AppointmentsApi "mixins/appointments-api";

actor {
  let profiles = List.empty<AuthTypes.PatientProfile>();
  let doctors = List.empty<DoctorTypes.Doctor>();
  let appointments = List.empty<AppointmentTypes.Appointment>();

  // Pre-populate 5 sample doctors
  do {
    let now = Time.now();
    let morningSlots : [DoctorTypes.TimeSlot] = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
    let afternoonSlots : [DoctorTypes.TimeSlot] = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30"];
    let eveningSlots : [DoctorTypes.TimeSlot] = ["16:00", "16:30", "17:00", "17:30", "18:00"];

    let weekdaySchedule : [DoctorTypes.DaySchedule] = [
      { day = #Monday; slots = morningSlots },
      { day = #Tuesday; slots = afternoonSlots },
      { day = #Wednesday; slots = morningSlots },
      { day = #Thursday; slots = afternoonSlots },
      { day = #Friday; slots = morningSlots },
    ];
    let fullWeekSchedule : [DoctorTypes.DaySchedule] = [
      { day = #Monday; slots = morningSlots },
      { day = #Tuesday; slots = morningSlots },
      { day = #Wednesday; slots = afternoonSlots },
      { day = #Thursday; slots = morningSlots },
      { day = #Friday; slots = afternoonSlots },
      { day = #Saturday; slots = eveningSlots },
    ];
    let mwfSchedule : [DoctorTypes.DaySchedule] = [
      { day = #Monday; slots = morningSlots },
      { day = #Wednesday; slots = morningSlots },
      { day = #Friday; slots = eveningSlots },
    ];
    let ttSchedule : [DoctorTypes.DaySchedule] = [
      { day = #Tuesday; slots = morningSlots },
      { day = #Thursday; slots = morningSlots },
      { day = #Saturday; slots = afternoonSlots },
    ];
    let allDaySchedule : [DoctorTypes.DaySchedule] = [
      { day = #Monday; slots = morningSlots },
      { day = #Tuesday; slots = afternoonSlots },
      { day = #Wednesday; slots = eveningSlots },
      { day = #Thursday; slots = morningSlots },
      { day = #Friday; slots = afternoonSlots },
      { day = #Saturday; slots = eveningSlots },
      { day = #Sunday; slots = morningSlots },
    ];

    doctors.add({
      id = 1;
      var name = "Dr. Sarah Chen";
      var specialization = "Cardiology";
      var fees = 150;
      var availability = weekdaySchedule;
      var isActive = true;
      createdAt = now;
    });
    doctors.add({
      id = 2;
      var name = "Dr. James Patel";
      var specialization = "Neurology";
      var fees = 200;
      var availability = fullWeekSchedule;
      var isActive = true;
      createdAt = now;
    });
    doctors.add({
      id = 3;
      var name = "Dr. Emily Rodriguez";
      var specialization = "Pediatrics";
      var fees = 100;
      var availability = mwfSchedule;
      var isActive = true;
      createdAt = now;
    });
    doctors.add({
      id = 4;
      var name = "Dr. Michael Thompson";
      var specialization = "Orthopedics";
      var fees = 180;
      var availability = ttSchedule;
      var isActive = true;
      createdAt = now;
    });
    doctors.add({
      id = 5;
      var name = "Dr. Aisha Okonkwo";
      var specialization = "Dermatology";
      var fees = 120;
      var availability = allDaySchedule;
      var isActive = true;
      createdAt = now;
    });
  };

  include AuthApi(profiles, 0);
  include DoctorsApi(profiles, doctors, appointments, 6);
  include AppointmentsApi(profiles, doctors, appointments, 1);
};
