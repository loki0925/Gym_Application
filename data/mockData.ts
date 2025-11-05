// Fix: Add Member and MembershipStatus to imports
import { GymClass, Payment, MemberGrowth, User, UserRole, Member, MembershipStatus } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Admin Pro', email: 'admin@gympro.com', role: UserRole.Admin, password: 'password123' },
  { id: 'u2', name: 'Regular User', email: 'user@gympro.com', role: UserRole.User, password: 'password123' },
];

// Fix: Add and export mockMembers array
export const mockMembers: Member[] = [
  {
    id: 'm1',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    joinDate: '2023-01-15',
    membershipStatus: MembershipStatus.Active,
    avatarUrl: `https://picsum.photos/seed/m1/200`,
  },
  {
    id: 'm2',
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    joinDate: '2023-02-20',
    membershipStatus: MembershipStatus.Active,
    avatarUrl: `https://picsum.photos/seed/m2/200`,
  },
  {
    id: 'm3',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    joinDate: '2022-11-10',
    membershipStatus: MembershipStatus.Inactive,
    avatarUrl: `https://picsum.photos/seed/m3/200`,
  },
  {
    id: 'm4',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    joinDate: '2023-05-01',
    membershipStatus: MembershipStatus.Active,
    avatarUrl: `https://picsum.photos/seed/m4/200`,
  },
  {
    id: 'm5',
    name: 'Ethan Hunt',
    email: 'ethan.h@example.com',
    joinDate: '2023-06-01',
    membershipStatus: MembershipStatus.Frozen,
    avatarUrl: `https://picsum.photos/seed/m5/200`,
  },
];


export const mockClasses: GymClass[] = [
  { id: 'c1', name: 'Morning Yoga', instructor: 'Sarah K.', day: 'Monday', time: '08:00', duration: 60, capacity: 20, enrolled: 15, category: 'Yoga' },
  { id: 'c2', name: 'HIIT Cardio', instructor: 'Mike R.', day: 'Monday', time: '18:00', duration: 45, capacity: 25, enrolled: 25, category: 'Cardio' },
  { id: 'c3', name: 'Full Body Strength', instructor: 'John D.', day: 'Tuesday', time: '17:30', duration: 75, capacity: 15, enrolled: 12, category: 'Strength' },
  { id: 'c4', name: 'CrossFit WOD', instructor: 'Emily W.', day: 'Wednesday', time: '19:00', duration: 60, capacity: 18, enrolled: 18, category: 'CrossFit' },
  { id: 'c5', name: 'Vinyasa Flow', instructor: 'Sarah K.', day: 'Thursday', time: '08:00', duration: 60, capacity: 20, enrolled: 18, category: 'Yoga' },
  { id: 'c6', name: 'Powerlifting Basics', instructor: 'John D.', day: 'Friday', time: '18:00', duration: 90, capacity: 10, enrolled: 8, category: 'Strength' },
  { id: 'c7', name: 'Weekend Warrior Bootcamp', instructor: 'Mike R.', day: 'Saturday', time: '10:00', duration: 60, capacity: 30, enrolled: 22, category: 'Cardio' },
  { id: 'c8', name: 'Restorative Yoga', instructor: 'Sarah K.', day: 'Sunday', time: '16:00', duration: 60, capacity: 20, enrolled: 19, category: 'Yoga' },
];

export const mockPayments: Payment[] = [
  { id: 'p1', memberId: '1', memberName: 'Alice Johnson', amount: 50.00, date: '2023-07-01', status: 'Paid' },
  { id: 'p2', memberId: '2', memberName: 'Bob Williams', amount: 50.00, date: '2023-07-01', status: 'Paid' },
  { id: 'p3', memberId: '3', memberName: 'Charlie Brown', amount: 50.00, date: '2023-06-01', status: 'Failed' },
  { id: 'p4', memberId: '4', memberName: 'Diana Prince', amount: 50.00, date: '2023-07-05', status: 'Paid' },
  { id: 'p5', memberId: '5', memberName: 'Ethan Hunt', amount: 50.00, date: '2023-07-10', status: 'Pending' },
];

export const memberGrowthData: MemberGrowth[] = [
    { name: 'Jan', newMembers: 10 },
    { name: 'Feb', newMembers: 15 },
    { name: 'Mar', newMembers: 12 },
    { name: 'Apr', newMembers: 20 },
    { name: 'May', newMembers: 18 },
    { name: 'Jun', newMembers: 25 },
];