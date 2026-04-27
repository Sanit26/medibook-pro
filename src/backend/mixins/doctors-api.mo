import List "mo:core/List";
import Runtime "mo:core/Runtime";
import CommonTypes "../types/common";
import DoctorTypes "../types/doctors";
import AppointmentTypes "../types/appointments";
import DoctorsLib "../lib/doctors";
import AuthLib "../lib/auth";
import AuthTypes "../types/auth";

mixin (
  profiles : List.List<AuthTypes.PatientProfile>,
  doctors : List.List<DoctorTypes.Doctor>,
  appointments : List.List<AppointmentTypes.Appointment>,
  nextDoctorId : Nat,
) {
  var doctorIdCounter : Nat = nextDoctorId;

  public shared ({ caller }) func addDoctor(input : DoctorTypes.AddDoctorInput) : async DoctorTypes.DoctorPublic {
    if (not AuthLib.isAdmin(profiles, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let result = DoctorsLib.addDoctor(doctors, doctorIdCounter, input);
    doctorIdCounter += 1;
    result;
  };

  public shared ({ caller }) func updateDoctor(id : CommonTypes.DoctorId, input : DoctorTypes.UpdateDoctorInput) : async ?DoctorTypes.DoctorPublic {
    if (not AuthLib.isAdmin(profiles, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    DoctorsLib.updateDoctor(doctors, id, input);
  };

  public shared ({ caller }) func deleteDoctor(id : CommonTypes.DoctorId) : async Bool {
    if (not AuthLib.isAdmin(profiles, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    DoctorsLib.deleteDoctor(doctors, id);
  };

  public query func listDoctors() : async [DoctorTypes.DoctorPublic] {
    DoctorsLib.listDoctors(doctors);
  };

  public query func getDoctor(id : CommonTypes.DoctorId) : async ?DoctorTypes.DoctorPublic {
    DoctorsLib.getDoctor(doctors, id);
  };

  public query func getAvailableSlots(doctorId : CommonTypes.DoctorId, date : Text, dayOfWeek : CommonTypes.DayOfWeek) : async [DoctorTypes.TimeSlot] {
    DoctorsLib.getAvailableSlots(doctors, appointments, doctorId, date, dayOfWeek);
  };
};
