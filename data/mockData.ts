// Fix: Add Member and MembershipStatus to imports
import { GymClass, Payment, MemberGrowth, User, UserRole, Member, MembershipStatus, Exercise, ActivityLog, WeightEntry, MealPlan } from '../types';

export const mockUsers: User[] = [
  // Admins
  { id: 'u1', name: 'Admin Pro', email: 'admin@gympro.com', role: UserRole.Admin, password: 'password123' },
  { id: 'u2', name: 'Jane Smith (Admin)', email: 'jane.admin@gympro.com', role: UserRole.Admin, password: 'adminpass' },
  { id: 'u8', name: 'Michael Scott', email: 'michael.s@gympro.com', role: UserRole.Admin, password: 'admin123' },
  { id: 'u9', name: 'Leslie Knope', email: 'leslie.k@gympro.com', role: UserRole.Admin, password: 'admin123' },


  // Members
  { id: 'u3', name: 'Alice Johnson', email: 'alice.j@example.com', role: UserRole.User, password: 'password123' },
  { id: 'u4', name: 'Bob Williams', email: 'bob.w@example.com', role: UserRole.User, password: 'password123' },
  { id: 'u5', name: 'Charlie Brown', email: 'charlie.b@example.com', role: UserRole.User, password: 'userpass' },
  { id: 'u6', name: 'Diana Prince', email: 'diana.p@example.com', role: UserRole.User, password: 'userpass' },
  { id: 'u7', name: 'Ethan Hunt', email: 'ethan.h@example.com', role: UserRole.User, password: 'userpass' },
  { id: 'u10', name: 'Frank Reynolds', email: 'frank.r@example.com', role: UserRole.User, password: 'memberpass' },
  { id: 'u11', name: 'Grace Hopper', email: 'grace.h@example.com', role: UserRole.User, password: 'memberpass' },
  { id: 'u12', name: 'Isaac Newton', email: 'isaac.n@example.com', role: UserRole.User, password: 'memberpass' },
  { id: 'u13', name: 'Marie Curie', email: 'marie.c@example.com', role: UserRole.User, password: 'memberpass' },
  { id: 'u14', name: 'Nikola Tesla', email: 'nikola.t@example.com', role: UserRole.User, password: 'memberpass' },
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
    assignedMealPlanId: 'mp3', // Bug Fix: Changed from mp1 to mp3 for Vegan plan
    assignedAdminId: 'u1',
  },
  {
    id: 'm2',
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    joinDate: '2023-02-20',
    membershipStatus: MembershipStatus.Active,
    avatarUrl: `https://picsum.photos/seed/m2/200`,
    assignedMealPlanId: 'mp2',
    assignedAdminId: 'u1',
  },
  {
    id: 'm3',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    joinDate: '2022-11-10',
    membershipStatus: MembershipStatus.Inactive,
    avatarUrl: `https://picsum.photos/seed/m3/200`,
    assignedAdminId: 'u2',
  },
  {
    id: 'm4',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    joinDate: '2023-05-01',
    membershipStatus: MembershipStatus.Active,
    avatarUrl: `https://picsum.photos/seed/m4/200`,
    assignedMealPlanId: 'mp3',
    assignedAdminId: 'u2',
  },
  {
    id: 'm5',
    name: 'Ethan Hunt',
    email: 'ethan.h@example.com',
    joinDate: '2023-06-01',
    membershipStatus: MembershipStatus.Frozen,
    avatarUrl: `https://picsum.photos/seed/m5/200`,
    assignedAdminId: 'u1',
  },
  {
    id: 'm6',
    name: 'Frank Reynolds',
    email: 'frank.r@example.com',
    joinDate: '2023-07-11',
    membershipStatus: MembershipStatus.Active,
    avatarUrl: `https://picsum.photos/seed/m6/200`,
    assignedMealPlanId: 'mp2',
    assignedAdminId: 'u8',
  },
  {
    id: 'm7',
    name: 'Grace Hopper',
    email: 'grace.h@example.com',
    joinDate: '2023-08-01',
    membershipStatus: MembershipStatus.Active,
    avatarUrl: `https://picsum.photos/seed/m7/200`,
    assignedAdminId: 'u8',
  },
  {
    id: 'm8',
    name: 'Isaac Newton',
    email: 'isaac.n@example.com',
    joinDate: '2023-08-15',
    membershipStatus: MembershipStatus.Inactive,
    avatarUrl: `https://picsum.photos/seed/m8/200`,
    assignedMealPlanId: 'mp1',
    assignedAdminId: 'u9',
  },
  {
    id: 'm9',
    name: 'Marie Curie',
    email: 'marie.c@example.com',
    joinDate: '2023-09-01',
    membershipStatus: MembershipStatus.Active,
    avatarUrl: `https://picsum.photos/seed/m9/200`,
    assignedAdminId: 'u9',
  },
  {
    id: 'm10',
    name: 'Nikola Tesla',
    email: 'nikola.t@example.com',
    joinDate: '2023-09-05',
    membershipStatus: MembershipStatus.Frozen,
    avatarUrl: `https://picsum.photos/seed/m10/200`,
    assignedMealPlanId: 'mp3',
    assignedAdminId: 'u9',
  },
];

export const mockMealPlans: MealPlan[] = [
  {
    id: 'mp1',
    name: 'High-Protein Vegetarian',
    type: 'Veg',
    description: 'A plan focused on plant-based protein for muscle growth and satiety.',
    schedule: {
      Monday: { Breakfast: { name: 'Greek Yogurt & Berries', calories: 350 }, Lunch: { name: 'Lentil Soup', calories: 450 }, Dinner: { name: 'Tofu Stir-fry', calories: 500 }, Snack: { name: 'Apple with Peanut Butter', calories: 200 } },
      Tuesday: { Breakfast: { name: 'Oatmeal with Nuts', calories: 400 }, Lunch: { name: 'Quinoa Salad', calories: 480 }, Dinner: { name: 'Black Bean Burgers', calories: 550 }, Snack: { name: 'Handful of Almonds', calories: 180 } },
      Wednesday: { Breakfast: { name: 'Scrambled Tofu', calories: 380 }, Lunch: { name: 'Leftover Tofu Stir-fry', calories: 500 }, Dinner: { name: 'Chickpea Pasta', calories: 520 }, Snack: { name: 'Protein Smoothie', calories: 250 } },
      Thursday: { Breakfast: { name: 'Greek Yogurt & Berries', calories: 350 }, Lunch: { name: 'Leftover Black Bean Burgers', calories: 550 }, Dinner: { name: 'Paneer Tikka Masala', calories: 600 }, Snack: { name: 'Cottage Cheese', calories: 150 } },
      Friday: { Breakfast: { name: 'Oatmeal with Nuts', calories: 400 }, Lunch: { name: 'Lentil Soup', calories: 450 }, Dinner: { name: 'Veggie Pizza on Whole Wheat', calories: 650 }, Snack: { name: 'Apple with Peanut Butter', calories: 200 } },
      Saturday: { Breakfast: { name: 'Protein Pancakes', calories: 450 }, Lunch: { name: 'Large Salad with Falafel', calories: 500 }, Dinner: { name: 'Mushroom Risotto', calories: 580 }, Snack: { name: 'Handful of Almonds', calories: 180 } },
      Sunday: { Breakfast: { name: 'Scrambled Tofu', calories: 380 }, Lunch: { name: 'Leftover Paneer', calories: 600 }, Dinner: { name: 'Veggie Lasagna', calories: 620 }, Snack: { name: 'Protein Smoothie', calories: 250 } },
    }
  },
  {
    id: 'mp2',
    name: 'Balanced Omnivore',
    type: 'Non-Veg',
    description: 'A balanced diet including lean meats, fish, and plenty of vegetables.',
    schedule: {
      Monday: { Breakfast: { name: 'Scrambled Eggs & Toast', calories: 400 }, Lunch: { name: 'Grilled Chicken Salad', calories: 500 }, Dinner: { name: 'Salmon with Roasted Veggies', calories: 600 }, Snack: { name: 'Protein Shake', calories: 250 } },
      Tuesday: { Breakfast: { name: 'Oatmeal with Fruit', calories: 350 }, Lunch: { name: 'Leftover Salmon', calories: 600 }, Dinner: { name: 'Lean Beef Tacos', calories: 580 }, Snack: { name: 'Greek Yogurt', calories: 150 } },
      Wednesday: { Breakfast: { name: 'Scrambled Eggs & Toast', calories: 400 }, Lunch: { name: 'Tuna Salad Sandwich', calories: 450 }, Dinner: { name: 'Chicken Breast with Quinoa', calories: 550 }, Snack: { name: 'Beef Jerky', calories: 120 } },
      Thursday: { Breakfast: { name: 'Oatmeal with Fruit', calories: 350 }, Lunch: { name: 'Leftover Chicken & Quinoa', calories: 550 }, Dinner: { name: 'Pork Chops with Sweet Potato', calories: 620 }, Snack: { name: 'Protein Shake', calories: 250 } },
      Friday: { Breakfast: { name: 'Scrambled Eggs & Toast', calories: 400 }, Lunch: { name: 'Grilled Chicken Salad', calories: 500 }, Dinner: { name: 'Steak and Asparagus', calories: 650 }, Snack: { name: 'Greek Yogurt', calories: 150 } },
      Saturday: { Breakfast: { name: 'Bacon and Eggs', calories: 480 }, Lunch: { name: 'Turkey Wraps', calories: 400 }, Dinner: { name: 'Burger Night', calories: 700 }, Snack: { name: 'Beef Jerky', calories: 120 } },
      Sunday: { Breakfast: { name: 'Oatmeal with Fruit', calories: 350 }, Lunch: { name: 'Leftover Steak', calories: 650 }, Dinner: { name: 'Roast Chicken with Veggies', calories: 680 }, Snack: { name: 'Protein Shake', calories: 250 } },
    }
  },
  {
    id: 'mp3',
    name: 'Clean Vegan Bulk',
    type: 'Vegan',
    description: 'A whole-foods, plant-based diet for clean energy and muscle gain.',
    schedule: {
      Monday: { Breakfast: { name: 'Oatmeal with Nuts & Seeds', calories: 450 }, Lunch: { name: 'Quinoa Bowl with Black Beans', calories: 550 }, Dinner: { name: 'Chickpea Curry', calories: 500 }, Snack: { name: 'Hummus with Carrots', calories: 200 } },
      Tuesday: { Breakfast: { name: 'Tofu Scramble', calories: 400 }, Lunch: { name: 'Leftover Chickpea Curry', calories: 500 }, Dinner: { name: 'Lentil Shepherd\'s Pie', calories: 600 }, Snack: { name: 'Edamame', calories: 150 } },
      Wednesday: { Breakfast: { name: 'Oatmeal with Nuts & Seeds', calories: 450 }, Lunch: { name: 'Large Bean Burrito', calories: 580 }, Dinner: { name: 'Seitan Stir-fry', calories: 520 }, Snack: { name: 'Vegan Protein Shake', calories: 280 } },
      Thursday: { Breakfast: { name: 'Tofu Scramble', calories: 400 }, Lunch: { name: 'Leftover Seitan Stir-fry', calories: 520 }, Dinner: { name: 'Beyond Burger on Whole Wheat', calories: 650 }, Snack: { name: 'Hummus with Carrots', calories: 200 } },
      Friday: { Breakfast: { name: 'Oatmeal with Nuts & Seeds', calories: 450 }, Lunch: { name: 'Quinoa Bowl with Black Beans', calories: 550 }, Dinner: { name: 'Vegan Pizza', calories: 700 }, Snack: { name: 'Edamame', calories: 150 } },
      Saturday: { Breakfast: { name: 'Vegan Protein Pancakes', calories: 500 }, Lunch: { name: 'Tempeh Sandwiches', calories: 480 }, Dinner: { name: 'Black Bean Enchiladas', calories: 620 }, Snack: { name: 'Vegan Protein Shake', calories: 280 } },
      Sunday: { Breakfast: { name: 'Tofu Scramble', calories: 400 }, Lunch: { name: 'Leftover Enchiladas', calories: 620 }, Dinner: { name: 'Hearty Vegetable Stew', calories: 500 }, Snack: { name: 'Hummus with Carrots', calories: 200 } },
    }
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

export const mockActivityLog: ActivityLog[] = [
  { id: 'a1', date: new Date(Date.now() - 86400000 * 1).toISOString(), type: 'Weightlifting', duration: 60, caloriesBurned: 350 },
  { id: 'a2', date: new Date(Date.now() - 86400000 * 2).toISOString(), type: 'Running', duration: 30, caloriesBurned: 300 },
  { id: 'a3', date: new Date(Date.now() - 86400000 * 4).toISOString(), type: 'Yoga', duration: 45, caloriesBurned: 150 },
];

export const mockWeightHistory: WeightEntry[] = [
    { date: '2033-06-01', weight: 85 },
    { date: '2033-06-08', weight: 84.5 },
    { date: '2033-06-15', weight: 84 },
    { date: '2033-06-22', weight: 83 },
    { date: '2033-06-29', weight: 83.2 },
];

export const mockExercises: Exercise[] = [
    // Chest
    { id: 'e1', name: 'Barbell Bench Press', muscleGroup: 'Chest', description: '...', imageUrl: 'https://picsum.photos/seed/barbell-bench-press/400/300' },
    { id: 'e2', name: 'Dumbbell Bench Press', muscleGroup: 'Chest', description: '...', imageUrl: 'https://picsum.photos/seed/dumbbell-bench-press/400/300' },
    { id: 'e3', name: 'Incline Barbell Press', muscleGroup: 'Chest', description: '...', imageUrl: 'https://picsum.photos/seed/incline-barbell-press/400/300' },
    { id: 'e4', name: 'Incline Dumbbell Press', muscleGroup: 'Chest', description: '...', imageUrl: 'https://picsum.photos/seed/incline-dumbbell-press/400/300' },
    { id: 'e5', name: 'Decline Barbell Press', muscleGroup: 'Chest', description: '...', imageUrl: 'https://picsum.photos/seed/decline-barbell-press/400/300' },
    { id: 'e6', name: 'Decline Dumbbell Press', muscleGroup: 'Chest', description: '...', imageUrl: 'https://picsum.photos/seed/decline-dumbbell-press/400/300' },
    { id: 'e7', name: 'Push-Up', muscleGroup: 'Chest', description: '...', imageUrl: 'https://picsum.photos/seed/push-up/400/300' },
    { id: 'e8', name: 'Dips (Chest-focused)', muscleGroup: 'Chest', description: '...', imageUrl: 'https://picsum.photos/seed/dips-chest/400/300' },
    { id: 'e9', name: 'Dumbbell Fly', muscleGroup: 'Chest', description: '...', imageUrl: 'https://picsum.photos/seed/dumbbell-fly/400/300' },
    { id: 'e10', name: 'Incline Dumbbell Fly', muscleGroup: 'Chest', description: '...', imageUrl: 'https://picsum.photos/seed/incline-dumbbell-fly/400/300' },
    { id: 'e11', name: 'Cable Crossover', muscleGroup: 'Chest', description: '...', imageUrl: 'https://picsum.photos/seed/cable-crossover/400/300' },
    { id: 'e12', name: 'Pec Deck Machine', muscleGroup: 'Chest', description: '...', imageUrl: 'https://picsum.photos/seed/pec-deck/400/300' },
    { id: 'e13', name: 'Machine Chest Press', muscleGroup: 'Chest', description: '...', imageUrl: 'https://picsum.photos/seed/machine-chest-press/400/300' },
    // Back
    { id: 'e14', name: 'Pull-Up', muscleGroup: 'Back', description: '...', imageUrl: 'https://picsum.photos/seed/pull-up/400/300' },
    { id: 'e15', name: 'Chin-Up', muscleGroup: 'Back', description: '...', imageUrl: 'https://picsum.photos/seed/chin-up/400/300' },
    { id: 'e16', name: 'Lat Pulldown (Wide Grip)', muscleGroup: 'Back', description: '...', imageUrl: 'https://picsum.photos/seed/lat-pulldown-wide/400/300' },
    { id: 'e17', name: 'Lat Pulldown (Close Grip)', muscleGroup: 'Back', description: '...', imageUrl: 'https://picsum.photos/seed/lat-pulldown-close/400/300' },
    { id: 'e18', name: 'Bent-Over Barbell Row', muscleGroup: 'Back', description: '...', imageUrl: 'https://picsum.photos/seed/barbell-row/400/300' },
    { id: 'e19', name: 'Bent-Over Dumbbell Row', muscleGroup: 'Back', description: '...', imageUrl: 'https://picsum.photos/seed/dumbbell-row/400/300' },
    { id: 'e20', name: 'Seated Cable Row', muscleGroup: 'Back', description: '...', imageUrl: 'https://picsum.photos/seed/seated-cable-row/400/300' },
    { id: 'e21', name: 'T-Bar Row', muscleGroup: 'Back', description: '...', imageUrl: 'https://picsum.photos/seed/t-bar-row/400/300' },
    { id: 'e22', name: 'Deadlift (Conventional)', muscleGroup: 'Back', description: '...', imageUrl: 'https://picsum.photos/seed/deadlift/400/300' },
    { id: 'e23', name: 'Rack Pull', muscleGroup: 'Back', description: '...', imageUrl: 'https://picsum.photos/seed/rack-pull/400/300' },
    { id: 'e24', name: 'Back Extension', muscleGroup: 'Back', description: '...', imageUrl: 'https://picsum.photos/seed/back-extension/400/300' },
    { id: 'e25', name: 'Good Morning', muscleGroup: 'Back', description: '...', imageUrl: 'https://picsum.photos/seed/good-morning/400/300' },
    { id: 'e26', name: 'Pullover', muscleGroup: 'Back', description: '...', imageUrl: 'https://picsum.photos/seed/pullover/400/300' },
    // Shoulders
    { id: 'e27', name: 'Overhead Press (Barbell)', muscleGroup: 'Shoulders', description: '...', imageUrl: 'https://picsum.photos/seed/overhead-press/400/300' },
    { id: 'e28', name: 'Seated Dumbbell Press', muscleGroup: 'Shoulders', description: '...', imageUrl: 'https://picsum.photos/seed/seated-dumbbell-press/400/300' },
    { id: 'e29', name: 'Arnold Press', muscleGroup: 'Shoulders', description: '...', imageUrl: 'https://picsum.photos/seed/arnold-press/400/300' },
    { id: 'e30', name: 'Lateral Raise', muscleGroup: 'Shoulders', description: '...', imageUrl: 'https://picsum.photos/seed/lateral-raise/400/300' },
    { id: 'e31', name: 'Front Raise', muscleGroup: 'Shoulders', description: '...', imageUrl: 'https://picsum.photos/seed/front-raise/400/300' },
    { id: 'e32', name: 'Rear Delt Fly', muscleGroup: 'Shoulders', description: '...', imageUrl: 'https://picsum.photos/seed/rear-delt-fly/400/300' },
    { id: 'e33', name: 'Face Pull', muscleGroup: 'Shoulders', description: '...', imageUrl: 'https://picsum.photos/seed/face-pull/400/300' },
    { id: 'e34', name: 'Barbell Shrug', muscleGroup: 'Shoulders', description: '...', imageUrl: 'https://picsum.photos/seed/barbell-shrug/400/300' },
    { id: 'e35', name: 'Dumbbell Shrug', muscleGroup: 'Shoulders', description: '...', imageUrl: 'https://picsum.photos/seed/dumbbell-shrug/400/300' },
    { id: 'e36', name: 'Upright Row', muscleGroup: 'Shoulders', description: '...', imageUrl: 'https://picsum.photos/seed/upright-row/400/300' },
    // Legs
    { id: 'e37', name: 'Barbell Back Squat', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/back-squat/400/300' },
    { id: 'e38', name: 'Barbell Front Squat', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/front-squat/400/300' },
    { id: 'e39', name: 'Leg Press', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/leg-press/400/300' },
    { id: 'e40', name: 'Lunge', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/lunge/400/300' },
    { id: 'e41', name: 'Bulgarian Split Squat', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/bulgarian-split-squat/400/300' },
    { id: 'e42', name: 'Goblet Squat', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/goblet-squat/400/300' },
    { id: 'e43', name: 'Leg Extension', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/leg-extension/400/300' },
    { id: 'e44', name: 'Hack Squat', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/hack-squat/400/300' },
    { id: 'e45', name: 'Romanian Deadlift (RDL)', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/rdl/400/300' },
    { id: 'e46', name: 'Stiff-Legged Deadlift', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/stiff-leg-deadlift/400/300' },
    { id: 'e47', name: 'Lying Leg Curl', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/lying-leg-curl/400/300' },
    { id: 'e48', name: 'Seated Leg Curl', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/seated-leg-curl/400/300' },
    { id: 'e49', name: 'Glute-Ham Raise (GHR)', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/ghr/400/300' },
    { id: 'e50', name: 'Hip Thrust (Barbell)', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/hip-thrust/400/300' },
    { id: 'e51', name: 'Glute Bridge', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/glute-bridge/400/300' },
    { id: 'e52', name: 'Cable Kickback', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/cable-kickback/400/300' },
    { id: 'e53', name: 'Standing Calf Raise', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/standing-calf-raise/400/300' },
    { id: 'e54', name: 'Seated Calf Raise', muscleGroup: 'Legs', description: '...', imageUrl: 'https://picsum.photos/seed/seated-calf-raise/400/300' },
    // Arms
    { id: 'e55', name: 'Barbell Curl', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/barbell-curl/400/300' },
    { id: 'e56', name: 'Dumbbell Curl (Standing)', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/dumbbell-curl/400/300' },
    { id: 'e57', name: 'Seated Incline Dumbbell Curl', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/incline-dumbbell-curl/400/300' },
    { id: 'e58', name: 'Hammer Curl', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/hammer-curl/400/300' },
    { id: 'e59', name: 'Preacher Curl', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/preacher-curl/400/300' },
    { id: 'e60', name: 'Concentration Curl', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/concentration-curl/400/300' },
    { id: 'e61', name: 'Cable Curl', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/cable-curl/400/300' },
    { id: 'e62', name: 'Close-Grip Bench Press', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/close-grip-bench/400/300' },
    { id: 'e63', name: 'Dips (Tricep-focused)', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/dips-tricep/400/300' },
    { id: 'e64', name: 'Tricep Pushdown (Rope)', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/tricep-pushdown-rope/400/300' },
    { id: 'e65', name: 'Tricep Pushdown (V-Bar)', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/tricep-pushdown-v-bar/400/300' },
    { id: 'e66', name: 'Overhead Tricep Extension', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/overhead-tricep-extension/400/300' },
    { id: 'e67', name: 'Skullcrusher', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/skullcrusher/400/300' },
    { id: 'e68', name: 'Tricep Kickback', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/tricep-kickback/400/300' },
    { id: 'e69', name: 'Wrist Curl', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/wrist-curl/400/300' },
    { id: 'e70', name: 'Reverse Wrist Curl', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/reverse-wrist-curl/400/300' },
    { id: 'e71', name: 'Farmer\'s Walk', muscleGroup: 'Arms', description: '...', imageUrl: 'https://picsum.photos/seed/farmers-walk/400/300' },
    // Core
    { id: 'e72', name: 'Plank', muscleGroup: 'Core', description: '...', imageUrl: 'https://picsum.photos/seed/plank/400/300' },
    { id: 'e73', name: 'Side Plank', muscleGroup: 'Core', description: '...', imageUrl: 'https://picsum.photos/seed/side-plank/400/300' },
    { id: 'e74', name: 'Crunch', muscleGroup: 'Core', description: '...', imageUrl: 'https://picsum.photos/seed/crunch/400/300' },
    { id: 'e75', name: 'Cable Crunch', muscleGroup: 'Core', description: '...', imageUrl: 'https://picsum.photos/seed/cable-crunch/400/300' },
    { id: 'e76', name: 'Hanging Leg Raise', muscleGroup: 'Core', description: '...', imageUrl: 'https://picsum.photos/seed/hanging-leg-raise/400/300' },
    { id: 'e77', name: 'Hanging Knee Raise', muscleGroup: 'Core', description: '...', imageUrl: 'https://picsum.photos/seed/hanging-knee-raise/400/300' },
    { id: 'e78', name: 'Lying Leg Raise', muscleGroup: 'Core', description: '...', imageUrl: 'https://picsum.photos/seed/lying-leg-raise/400/300' },
    { id: 'e79', name: 'Ab Rollout', muscleGroup: 'Core', description: '...', imageUrl: 'https://picsum.photos/seed/ab-rollout/400/300' },
    { id: 'e80', name: 'Russian Twist', muscleGroup: 'Core', description: '...', imageUrl: 'https://picsum.photos/seed/russian-twist/400/300' },
    { id: 'e81', name: 'Bicycle Crunch', muscleGroup: 'Core', description: '...', imageUrl: 'https://picsum.photos/seed/bicycle-crunch/400/300' },
    { id: 'e82', name: 'Wood Chop (Cable)', muscleGroup: 'Core', description: '...', imageUrl: 'https://picsum.photos/seed/wood-chop/400/300' },
];