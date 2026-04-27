import CommonTypes "common";

module {
  public type PatientProfile = {
    principalId : CommonTypes.UserId;
    var name : Text;
    var email : Text;
    var phone : Text;
    var dateOfBirth : Text;
    role : CommonTypes.Role;
    createdAt : CommonTypes.Timestamp;
  };

  public type PatientProfilePublic = {
    principalId : CommonTypes.UserId;
    name : Text;
    email : Text;
    phone : Text;
    dateOfBirth : Text;
    role : CommonTypes.Role;
    createdAt : CommonTypes.Timestamp;
  };

  public type RegisterPatientInput = {
    name : Text;
    email : Text;
    phone : Text;
    dateOfBirth : Text;
  };
};
