import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import CommonTypes "../types/common";
import AuthTypes "../types/auth";

module {
  public func toPublic(profile : AuthTypes.PatientProfile) : AuthTypes.PatientProfilePublic {
    {
      principalId = profile.principalId;
      name = profile.name;
      email = profile.email;
      phone = profile.phone;
      dateOfBirth = profile.dateOfBirth;
      role = profile.role;
      createdAt = profile.createdAt;
    };
  };

  public func registerPatient(
    profiles : List.List<AuthTypes.PatientProfile>,
    caller : CommonTypes.UserId,
    input : AuthTypes.RegisterPatientInput,
  ) : AuthTypes.PatientProfilePublic {
    let existing = profiles.find(func(p : AuthTypes.PatientProfile) : Bool {
      Principal.equal(p.principalId, caller)
    });
    switch (existing) {
      case (?_) { Runtime.trap("Already registered") };
      case null {};
    };
    let profile : AuthTypes.PatientProfile = {
      principalId = caller;
      var name = input.name;
      var email = input.email;
      var phone = input.phone;
      var dateOfBirth = input.dateOfBirth;
      role = #Patient;
      createdAt = Time.now();
    };
    profiles.add(profile);
    toPublic(profile);
  };

  public func getProfile(
    profiles : List.List<AuthTypes.PatientProfile>,
    caller : CommonTypes.UserId,
  ) : ?AuthTypes.PatientProfilePublic {
    switch (profiles.find(func(p : AuthTypes.PatientProfile) : Bool {
      Principal.equal(p.principalId, caller)
    })) {
      case (?p) { ?toPublic(p) };
      case null { null };
    };
  };

  public func isAdmin(
    profiles : List.List<AuthTypes.PatientProfile>,
    caller : CommonTypes.UserId,
  ) : Bool {
    switch (profiles.find(func(p : AuthTypes.PatientProfile) : Bool {
      Principal.equal(p.principalId, caller)
    })) {
      case (?p) {
        switch (p.role) {
          case (#Admin) { true };
          case (_) { false };
        };
      };
      case null { false };
    };
  };

  public func assignAdmin(
    profiles : List.List<AuthTypes.PatientProfile>,
    caller : CommonTypes.UserId,
    targetPrincipal : CommonTypes.UserId,
  ) : () {
    if (not isAdmin(profiles, caller)) {
      Runtime.trap("Unauthorized: only admins can assign admin role");
    };
    let found = profiles.find(func(p : AuthTypes.PatientProfile) : Bool {
      Principal.equal(p.principalId, targetPrincipal)
    });
    switch (found) {
      case null { Runtime.trap("Target principal not registered") };
      case (?_) {};
    };
    profiles.mapInPlace(func(p : AuthTypes.PatientProfile) : AuthTypes.PatientProfile {
      if (Principal.equal(p.principalId, targetPrincipal)) {
        {
          principalId = p.principalId;
          var name = p.name;
          var email = p.email;
          var phone = p.phone;
          var dateOfBirth = p.dateOfBirth;
          role = #Admin;
          createdAt = p.createdAt;
        };
      } else { p };
    });
  };
};
