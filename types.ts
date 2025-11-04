export enum MembershipStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Frozen = 'Frozen',
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password: string; // In a real app, this would be a hash, not plaintext.
}

export interface Member {
  id: string;
  name: string;
  email: string;
  joinDate: string; // ISO string
  membershipStatus: MembershipStatus;
  avatarUrl: string;
}

export interface GymClass {
  id: string;
  name: string;
  instructor: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string; // HH:MM
  duration: number; // in minutes
  capacity: number;
  enrolled: number;
  category: 'Cardio' | 'Strength' | 'Yoga' | 'CrossFit';
}

export interface Payment {
  id:string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string; // ISO string
  status: 'Paid' | 'Pending' | 'Failed';
}

export interface MemberGrowth {
  name: string;
  newMembers: number;
}