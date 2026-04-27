export type UserId = string;
export type DoctorId = bigint;
export type AppointmentId = bigint;
export type Timestamp = bigint;

export type AppointmentStatus = "Upcoming" | "Completed" | "Cancelled";
export type Role = "Patient" | "Admin";

export interface DaySchedule {
  day: string;
  slots: string[];
}

export interface PatientProfile {
  principalId: UserId;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  role: Role;
  createdAt: Timestamp;
}

export interface Doctor {
  id: DoctorId;
  name: string;
  specialization: string;
  fees: bigint;
  availability: DaySchedule[];
  isActive: boolean;
  createdAt: Timestamp;
}

export interface Appointment {
  id: AppointmentId;
  patientId: UserId;
  doctorId: DoctorId;
  date: string;
  timeSlot: string;
  status: AppointmentStatus;
  fees: bigint;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface RegisterPatientInput {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

export interface AddDoctorInput {
  name: string;
  specialization: string;
  fees: bigint;
  availability: DaySchedule[];
}

export interface BookAppointmentInput {
  doctorId: DoctorId;
  date: string;
  timeSlot: string;
}

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}
