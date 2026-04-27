import CommonTypes "common";

module {
  public type TimeSlot = Text; // e.g. "09:00", "09:30"

  public type DaySchedule = {
    day : CommonTypes.DayOfWeek;
    slots : [TimeSlot];
  };

  public type Doctor = {
    id : CommonTypes.DoctorId;
    var name : Text;
    var specialization : Text;
    var fees : Nat;
    var availability : [DaySchedule];
    var isActive : Bool;
    createdAt : CommonTypes.Timestamp;
  };

  public type DoctorPublic = {
    id : CommonTypes.DoctorId;
    name : Text;
    specialization : Text;
    fees : Nat;
    availability : [DaySchedule];
    isActive : Bool;
    createdAt : CommonTypes.Timestamp;
  };

  public type AddDoctorInput = {
    name : Text;
    specialization : Text;
    fees : Nat;
    availability : [DaySchedule];
  };

  public type UpdateDoctorInput = {
    name : ?Text;
    specialization : ?Text;
    fees : ?Nat;
    availability : ?[DaySchedule];
    isActive : ?Bool;
  };
};
