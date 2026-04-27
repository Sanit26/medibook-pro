import List "mo:core/List";
import Runtime "mo:core/Runtime";
import CommonTypes "../types/common";
import AppointmentTypes "../types/appointments";
import AppointmentsLib "../lib/appointments";
import AuthLib "../lib/auth";
import AuthTypes "../types/auth";
import DoctorsLib "../lib/doctors";
import DoctorTypes "../types/doctors";

mixin (
  profiles : List.List<AuthTypes.PatientProfile>,
  doctors : List.List<DoctorTypes.Doctor>,
  appointments : List.List<AppointmentTypes.Appointment>,
  nextAppointmentId : Nat,
) {
  var appointmentIdCounter : Nat = nextAppointmentId;

  public shared ({ caller }) func bookAppointment(input : AppointmentTypes.BookAppointmentInput) : async { #ok : AppointmentTypes.AppointmentPublic; #doubleBooking } {
    // Look up fees from doctor
    let doctorOpt = DoctorsLib.getDoctor(doctors, input.doctorId);
    let fees = switch (doctorOpt) {
      case null { Runtime.trap("Doctor not found") };
      case (?d) { d.fees };
    };
    let result = AppointmentsLib.bookAppointment(appointments, appointmentIdCounter, caller, input, fees);
    switch (result) {
      case (#ok(_)) { appointmentIdCounter += 1 };
      case (#doubleBooking) {};
    };
    result;
  };

  public shared ({ caller }) func rescheduleAppointment(input : AppointmentTypes.RescheduleInput) : async { #ok : AppointmentTypes.AppointmentPublic; #notFound; #unauthorized; #alreadyBooked } {
    AppointmentsLib.rescheduleAppointment(appointments, caller, input);
  };

  public shared ({ caller }) func cancelAppointment(appointmentId : CommonTypes.AppointmentId) : async { #ok; #notFound; #unauthorized } {
    let adminFlag = AuthLib.isAdmin(profiles, caller);
    AppointmentsLib.cancelAppointment(appointments, caller, appointmentId, adminFlag);
  };

  public shared query ({ caller }) func getMyAppointments() : async [AppointmentTypes.AppointmentPublic] {
    AppointmentsLib.getPatientAppointments(appointments, caller);
  };

  public shared ({ caller }) func getAllAppointments() : async [AppointmentTypes.AppointmentPublic] {
    if (not AuthLib.isAdmin(profiles, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    AppointmentsLib.getAllAppointments(appointments);
  };
};
