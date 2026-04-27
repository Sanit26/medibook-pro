import List "mo:core/List";
import CommonTypes "../types/common";
import AuthTypes "../types/auth";
import AuthLib "../lib/auth";

mixin (
  profiles : List.List<AuthTypes.PatientProfile>,
  nextAdminSeed : Nat,
) {
  public shared ({ caller }) func registerPatient(input : AuthTypes.RegisterPatientInput) : async AuthTypes.PatientProfilePublic {
    AuthLib.registerPatient(profiles, caller, input);
  };

  public shared query ({ caller }) func getMyProfile() : async ?AuthTypes.PatientProfilePublic {
    AuthLib.getProfile(profiles, caller);
  };

  public shared query ({ caller }) func isAdmin() : async Bool {
    AuthLib.isAdmin(profiles, caller);
  };

  public shared ({ caller }) func assignAdmin(targetPrincipal : CommonTypes.UserId) : async () {
    AuthLib.assignAdmin(profiles, caller, targetPrincipal);
  };
};
