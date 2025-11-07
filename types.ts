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

export type MealPlanType = 'Veg' | 'Non-Veg' | 'Vegan';

export interface MealPlanSchedule {
  [day: string]: { // DayOfWeek
    // Fix: The original syntax `[mealType: string]?: Meal;` is invalid.
    // An index signature key cannot be optional. To allow for optional properties,
    // the value type should be a union with `undefined`.
    [mealType: string]: Meal | undefined; // MealType
  };
}

export interface MealPlan {
  id: string;
  name: string;
  type: MealPlanType;
  description: string;
  schedule: MealPlanSchedule;
}


export interface Member {
  id:string;
  name: string;
  email: string;
  joinDate: string; // ISO string
  membershipStatus: MembershipStatus;
  avatarUrl: string;
  assignedMealPlanId?: string;
  assignedAdminId?: string;
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

export interface ActivityLog {
  id: string;
  date: string; // ISO string
  type: 'Running' | 'Weightlifting' | 'Yoga' | 'Cycling' | 'Swimming';
  duration: number; // in minutes
  caloriesBurned: number;
}

export interface WeightEntry {
  date: string; // YYYY-MM-DD
  weight: number; // in kg
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core';
  description: string;
  imageUrl: string;
}

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface Meal {
  name: string;
  calories: number;
}