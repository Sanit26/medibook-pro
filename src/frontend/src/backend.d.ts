import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PatientProfilePublic {
    dateOfBirth: string;
    name: string;
    createdAt: Timestamp;
    role: Role;
    email: string;
    phone: string;
    principalId: UserId;
}
export type Timestamp = bigint;
export type TimeSlot = string;
export type DoctorId = bigint;
export interface AppointmentPublic {
    id: AppointmentId;
    status: AppointmentStatus;
    doctorId: DoctorId;
    patientId: UserId;
    date: string;
    fees: bigint;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    timeSlot: string;
}
export interface DaySchedule {
    day: DayOfWeek;
    slots: Array<TimeSlot>;
}
export type AppointmentId = bigint;
export interface AddDoctorInput {
    fees: bigint;
    name: string;
    availability: Array<DaySchedule>;
    specialization: string;
}
export interface DoctorPublic {
    id: DoctorId;
    fees: bigint;
    name: string;
    createdAt: Timestamp;
    isActive: boolean;
    availability: Array<DaySchedule>;
    specialization: string;
}
export interface BookAppointmentInput {
    doctorId: DoctorId;
    date: string;
    timeSlot: string;
}
export type UserId = Principal;
export interface RegisterPatientInput {
    dateOfBirth: string;
    name: string;
    email: string;
    phone: string;
}
export interface UpdateDoctorInput {
    fees?: bigint;
    name?: string;
    isActive?: boolean;
    availability?: Array<DaySchedule>;
    specialization?: string;
}
export interface RescheduleInput {
    newTimeSlot: string;
    appointmentId: AppointmentId;
    newDate: string;
}
export enum AppointmentStatus {
    Cancelled = "Cancelled",
    Completed = "Completed",
    Upcoming = "Upcoming"
}
export enum DayOfWeek {
    Saturday = "Saturday",
    Thursday = "Thursday",
    Sunday = "Sunday",
    Tuesday = "Tuesday",
    Friday = "Friday",
    Wednesday = "Wednesday",
    Monday = "Monday"
}
export enum Role {
    Admin = "Admin",
    Patient = "Patient"
}
export enum Variant_ok_notFound_unauthorized {
    ok = "ok",
    notFound = "notFound",
    unauthorized = "unauthorized"
}
export interface backendInterface {
    addDoctor(input: AddDoctorInput): Promise<DoctorPublic>;
    assignAdmin(targetPrincipal: UserId): Promise<void>;
    bookAppointment(input: BookAppointmentInput): Promise<{
        __kind__: "ok";
        ok: AppointmentPublic;
    } | {
        __kind__: "doubleBooking";
        doubleBooking: null;
    }>;
    cancelAppointment(appointmentId: AppointmentId): Promise<Variant_ok_notFound_unauthorized>;
    deleteDoctor(id: DoctorId): Promise<boolean>;
    getAllAppointments(): Promise<Array<AppointmentPublic>>;
    getAvailableSlots(doctorId: DoctorId, date: string, dayOfWeek: DayOfWeek): Promise<Array<TimeSlot>>;
    getDoctor(id: DoctorId): Promise<DoctorPublic | null>;
    getMyAppointments(): Promise<Array<AppointmentPublic>>;
    getMyProfile(): Promise<PatientProfilePublic | null>;
    isAdmin(): Promise<boolean>;
    listDoctors(): Promise<Array<DoctorPublic>>;
    registerPatient(input: RegisterPatientInput): Promise<PatientProfilePublic>;
    rescheduleAppointment(input: RescheduleInput): Promise<{
        __kind__: "ok";
        ok: AppointmentPublic;
    } | {
        __kind__: "notFound";
        notFound: null;
    } | {
        __kind__: "unauthorized";
        unauthorized: null;
    } | {
        __kind__: "alreadyBooked";
        alreadyBooked: null;
    }>;
    updateDoctor(id: DoctorId, input: UpdateDoctorInput): Promise<DoctorPublic | null>;
}
