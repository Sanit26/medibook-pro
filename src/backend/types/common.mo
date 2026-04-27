import Time "mo:core/Time";

module {
  public type UserId = Principal;
  public type DoctorId = Nat;
  public type AppointmentId = Nat;
  public type Timestamp = Time.Time;

  public type Role = {
    #Patient;
    #Admin;
  };

  public type DayOfWeek = {
    #Monday;
    #Tuesday;
    #Wednesday;
    #Thursday;
    #Friday;
    #Saturday;
    #Sunday;
  };
};
