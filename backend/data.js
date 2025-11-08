
export const dataSQL = `
-- Inserting data for users table
INSERT INTO users (id, name, email, role, password) VALUES
('u1', 'Admin Pro', 'admin@gympro.com', 'Admin', 'password123'),
('u2', 'Jane Smith (Admin)', 'jane.admin@gympro.com', 'Admin', 'adminpass'),
('u8', 'Michael Scott', 'michael.s@gympro.com', 'Admin', 'admin123'),
('u9', 'Leslie Knope', 'leslie.k@gympro.com', 'Admin', 'admin123'),
('u3', 'Alice Johnson', 'alice.j@example.com', 'User', 'password123'),
('u4', 'Bob Williams', 'bob.w@example.com', 'User', 'password123'),
('u5', 'Charlie Brown', 'charlie.b@example.com', 'User', 'userpass'),
('u6', 'Diana Prince', 'diana.p@example.com', 'User', 'userpass'),
('u7', 'Ethan Hunt', 'ethan.h@example.com', 'User', 'userpass'),
('u10', 'Frank Reynolds', 'frank.r@example.com', 'User', 'memberpass'),
('u11', 'Grace Hopper', 'grace.h@example.com', 'User', 'memberpass'),
('u12', 'Isaac Newton', 'isaac.n@example.com', 'User', 'memberpass'),
('u13', 'Marie Curie', 'marie.c@example.com', 'User', 'memberpass'),
('u14', 'Nikola Tesla', 'nikola.t@example.com', 'User', 'memberpass');

-- Inserting data for meal_plans table
INSERT INTO meal_plans (id, name, type, description) VALUES
('mp1', 'High-Protein Vegetarian', 'Veg', 'A plan focused on plant-based protein for muscle growth and satiety.'),
('mp2', 'Balanced Omnivore', 'Non-Veg', 'A balanced diet including lean meats, fish, and plenty of vegetables.'),
('mp3', 'Clean Vegan Bulk', 'Vegan', 'A whole-foods, plant-based diet for clean energy and muscle gain.');

-- Inserting data for members table
INSERT INTO members (id, name, email, joinDate, membershipStatus, avatarUrl, assignedMealPlanId, assignedAdminId) VALUES
('m1', 'Alice Johnson', 'alice.j@example.com', '2023-01-15', 'Active', 'https://picsum.photos/seed/m1/200', 'mp3', 'u1'),
('m2', 'Bob Williams', 'bob.w@example.com', '2023-02-20', 'Active', 'https://picsum.photos/seed/m2/200', 'mp2', 'u1'),
('m3', 'Charlie Brown', 'charlie.b@example.com', '2022-11-10', 'Inactive', 'https://picsum.photos/seed/m3/200', NULL, 'u2'),
('m4', 'Diana Prince', 'diana.p@example.com', '2023-05-01', 'Active', 'https://picsum.photos/seed/m4/200', 'mp3', 'u2'),
('m5', 'Ethan Hunt', 'ethan.h@example.com', '2023-06-01', 'Frozen', 'https://picsum.photos/seed/m5/200', NULL, 'u1'),
('m6', 'Frank Reynolds', 'frank.r@example.com', '2023-07-11', 'Active', 'https://picsum.photos/seed/m6/200', 'mp2', 'u8'),
('m7', 'Grace Hopper', 'grace.h@example.com', '2023-08-01', 'Active', 'https://picsum.photos/seed/m7/200', NULL, 'u8'),
('m8', 'Isaac Newton', 'isaac.n@example.com', '2023-08-15', 'Inactive', 'https://picsum.photos/seed/m8/200', 'mp1', 'u9'),
('m9', 'Marie Curie', 'marie.c@example.com', '2023-09-01', 'Active', 'https://picsum.photos/seed/m9/200', NULL, 'u9'),
('m10', 'Nikola Tesla', 'nikola.t@example.com', '2023-09-05', 'Frozen', 'https://picsum.photos/seed/m10/200', 'mp3', 'u9');

-- Inserting data for gym_classes table
INSERT INTO gym_classes (id, name, instructor, day, time, duration, capacity, enrolled, category) VALUES
('c1', 'Morning Yoga', 'Sarah K.', 'Monday', '08:00:00', 60, 20, 15, 'Yoga'),
('c2', 'HIIT Cardio', 'Mike R.', 'Monday', '18:00:00', 45, 25, 25, 'Cardio'),
('c3', 'Full Body Strength', 'John D.', 'Tuesday', '17:30:00', 75, 15, 12, 'Strength'),
('c4', 'CrossFit WOD', 'Emily W.', 'Wednesday', '19:00:00', 60, 18, 18, 'CrossFit'),
('c5', 'Vinyasa Flow', 'Sarah K.', 'Thursday', '08:00:00', 60, 20, 18, 'Yoga'),
('c6', 'Powerlifting Basics', 'John D.', 'Friday', '18:00:00', 90, 10, 8, 'Strength'),
('c7', 'Weekend Warrior Bootcamp', 'Mike R.', 'Saturday', '10:00:00', 60, 30, 22, 'Cardio'),
('c8', 'Restorative Yoga', 'Sarah K.', 'Sunday', '16:00:00', 60, 20, 19, 'Yoga');

-- Inserting data for payments table
INSERT INTO payments (id, memberId, memberName, amount, date, status) VALUES
('p1', 'm1', 'Alice Johnson', 50.00, '2023-07-01', 'Paid'),
('p2', 'm2', 'Bob Williams', 50.00, '2023-07-01', 'Paid'),
('p3', 'm3', 'Charlie Brown', 50.00, '2023-06-01', 'Failed'),
('p4', 'm4', 'Diana Prince', 50.00, '2023-07-05', 'Paid'),
('p5', 'm5', 'Ethan Hunt', 50.00, '2023-07-10', 'Pending');

-- Inserting data for member_growth table
INSERT INTO member_growth (month_name, new_members) VALUES
('Jan', 10), ('Feb', 15), ('Mar', 12), ('Apr', 20), ('May', 18), ('Jun', 25);

-- Inserting data for activity_log table
INSERT INTO activity_log (id, date, type, duration, caloriesBurned) VALUES
('a1', '2024-07-20 12:00:00', 'Weightlifting', 60, 350),
('a2', '2024-07-19 12:00:00', 'Running', 30, 300),
('a3', '2024-07-17 12:00:00', 'Yoga', 45, 150);

-- Inserting data for weight_history table
INSERT INTO weight_history (date, weight) VALUES
('2033-06-01', 85.0), ('2033-06-08', 84.5), ('2033-06-15', 84.0), ('2033-06-22', 83.0), ('2033-06-29', 83.2);

-- Inserting data for exercises table (sample)
INSERT INTO exercises (id, name, muscleGroup, description, imageUrl) VALUES
('e1', 'Barbell Bench Press', 'Chest', '...', 'https://picsum.photos/seed/barbell-bench-press/400/300'),
('e2', 'Dumbbell Bench Press', 'Chest', '...', 'https://picsum.photos/seed/dumbbell-bench-press/400/300'),
('e7', 'Push-Up', 'Chest', '...', 'https://picsum.photos/seed/push-up/400/300'),
('e14', 'Pull-Up', 'Back', '...', 'https://picsum.photos/seed/pull-up/400/300'),
('e18', 'Bent-Over Barbell Row', 'Back', '...', 'https://picsum.photos/seed/barbell-row/400/300'),
('e22', 'Deadlift (Conventional)', 'Back', '...', 'https://picsum.photos/seed/deadlift/400/300'),
('e27', 'Overhead Press (Barbell)', 'Shoulders', '...', 'https://picsum.photos/seed/overhead-press/400/300'),
('e30', 'Lateral Raise', 'Shoulders', '...', 'https://picsum.photos/seed/lateral-raise/400/300'),
('e37', 'Barbell Back Squat', 'Legs', '...', 'https://picsum.photos/seed/back-squat/400/300'),
('e39', 'Leg Press', 'Legs', '...', 'https://picsum.photos/seed/leg-press/400/300'),
('e45', 'Romanian Deadlift (RDL)', 'Legs', '...', 'https://picsum.photos/seed/rdl/400/300'),
('e55', 'Barbell Curl', 'Arms', '...', 'https://picsum.photos/seed/barbell-curl/400/300'),
('e58', 'Hammer Curl', 'Arms', '...', 'https://picsum.photos/seed/hammer-curl/400/300'),
('e62', 'Close-Grip Bench Press', 'Arms', '...', 'https://picsum.photos/seed/close-grip-bench/400/300'),
('e64', 'Tricep Pushdown (Rope)', 'Arms', '...', 'https://picsum.photos/seed/tricep-pushdown-rope/400/300'),
('e72', 'Plank', 'Core', '...', 'https://picsum.photos/seed/plank/400/300'),
('e76', 'Hanging Leg Raise', 'Core', '...', 'https://picsum.photos/seed/hanging-leg-raise/400/300'),
('e79', 'Ab Rollout', 'Core', '...', 'https://picsum.photos/seed/ab-rollout/400/300');

-- Inserting data for meal_plan_schedule table
-- High-Protein Vegetarian
INSERT INTO meal_plan_schedule (meal_plan_id, day, meal_type, meal_name, calories) VALUES
('mp1', 'Monday', 'Breakfast', 'Greek Yogurt & Berries', 350),
('mp1', 'Monday', 'Lunch', 'Lentil Soup', 450),
('mp1', 'Monday', 'Dinner', 'Tofu Stir-fry', 500),
('mp1', 'Monday', 'Snack', 'Apple with Peanut Butter', 200),
('mp1', 'Tuesday', 'Breakfast', 'Oatmeal with Nuts', 400),
('mp1', 'Tuesday', 'Lunch', 'Quinoa Salad', 480),
('mp1', 'Tuesday', 'Dinner', 'Black Bean Burgers', 550),
('mp1', 'Tuesday', 'Snack', 'Handful of Almonds', 180),
('mp1', 'Wednesday', 'Breakfast', 'Scrambled Tofu', 380),
('mp1', 'Wednesday', 'Lunch', 'Leftover Tofu Stir-fry', 500),
('mp1', 'Wednesday', 'Dinner', 'Chickpea Pasta', 520),
('mp1', 'Wednesday', 'Snack', 'Protein Smoothie', 250),
('mp1', 'Thursday', 'Breakfast', 'Greek Yogurt & Berries', 350),
('mp1', 'Thursday', 'Lunch', 'Leftover Black Bean Burgers', 550),
('mp1', 'Thursday', 'Dinner', 'Paneer Tikka Masala', 600),
('mp1', 'Thursday', 'Snack', 'Cottage Cheese', 150),
('mp1', 'Friday', 'Breakfast', 'Oatmeal with Nuts', 400),
('mp1', 'Friday', 'Lunch', 'Lentil Soup', 450),
('mp1', 'Friday', 'Dinner', 'Veggie Pizza on Whole Wheat', 650),
('mp1', 'Friday', 'Snack', 'Apple with Peanut Butter', 200),
('mp1', 'Saturday', 'Breakfast', 'Protein Pancakes', 450),
('mp1', 'Saturday', 'Lunch', 'Large Salad with Falafel', 500),
('mp1', 'Saturday', 'Dinner', 'Mushroom Risotto', 580),
('mp1', 'Saturday', 'Snack', 'Handful of Almonds', 180),
('mp1', 'Sunday', 'Breakfast', 'Scrambled Tofu', 380),
('mp1', 'Sunday', 'Lunch', 'Leftover Paneer', 600),
('mp1', 'Sunday', 'Dinner', 'Veggie Lasagna', 620),
('mp1', 'Sunday', 'Snack', 'Protein Smoothie', 250);

-- Balanced Omnivore
INSERT INTO meal_plan_schedule (meal_plan_id, day, meal_type, meal_name, calories) VALUES
('mp2', 'Monday', 'Breakfast', 'Scrambled Eggs & Toast', 400),
('mp2', 'Monday', 'Lunch', 'Grilled Chicken Salad', 500),
('mp2', 'Monday', 'Dinner', 'Salmon with Roasted Veggies', 600),
('mp2', 'Monday', 'Snack', 'Protein Shake', 250),
('mp2', 'Tuesday', 'Breakfast', 'Oatmeal with Fruit', 350),
('mp2', 'Tuesday', 'Lunch', 'Leftover Salmon', 600),
('mp2', 'Tuesday', 'Dinner', 'Lean Beef Tacos', 580),
('mp2', 'Tuesday', 'Snack', 'Greek Yogurt', 150),
('mp2', 'Wednesday', 'Breakfast', 'Scrambled Eggs & Toast', 400),
('mp2', 'Wednesday', 'Lunch', 'Tuna Salad Sandwich', 450),
('mp2', 'Wednesday', 'Dinner', 'Chicken Breast with Quinoa', 550),
('mp2', 'Wednesday', 'Snack', 'Beef Jerky', 120),
('mp2', 'Thursday', 'Breakfast', 'Oatmeal with Fruit', 350),
('mp2', 'Thursday', 'Lunch', 'Leftover Chicken & Quinoa', 550),
('mp2', 'Thursday', 'Dinner', 'Pork Chops with Sweet Potato', 620),
('mp2', 'Thursday', 'Snack', 'Protein Shake', 250),
('mp2', 'Friday', 'Breakfast', 'Scrambled Eggs & Toast', 400),
('mp2', 'Friday', 'Lunch', 'Grilled Chicken Salad', 500),
('mp2', 'Friday', 'Dinner', 'Steak and Asparagus', 650),
('mp2', 'Friday', 'Snack', 'Greek Yogurt', 150),
('mp2', 'Saturday', 'Breakfast', 'Bacon and Eggs', 480),
('mp2', 'Saturday', 'Lunch', 'Turkey Wraps', 400),
('mp2', 'Saturday', 'Dinner', 'Burger Night', 700),
('mp2', 'Saturday', 'Snack', 'Beef Jerky', 120),
('mp2', 'Sunday', 'Breakfast', 'Oatmeal with Fruit', 350),
('mp2', 'Sunday', 'Lunch', 'Leftover Steak', 650),
('mp2', 'Sunday', 'Dinner', 'Roast Chicken with Veggies', 680),
('mp2', 'Sunday', 'Snack', 'Protein Shake', 250);

-- Clean Vegan Bulk
INSERT INTO meal_plan_schedule (meal_plan_id, day, meal_type, meal_name, calories) VALUES
('mp3', 'Monday', 'Breakfast', 'Oatmeal with Nuts & Seeds', 450),
('mp3', 'Monday', 'Lunch', 'Quinoa Bowl with Black Beans', 550),
('mp3', 'Monday', 'Dinner', 'Chickpea Curry', 500),
('mp3', 'Monday', 'Snack', 'Hummus with Carrots', 200),
('mp3', 'Tuesday', 'Breakfast', 'Tofu Scramble', 400),
('mp3', 'Tuesday', 'Lunch', 'Leftover Chickpea Curry', 500),
('mp3', 'Tuesday', 'Dinner', 'Lentil Shepherd''s Pie', 600),
('mp3', 'Tuesday', 'Snack', 'Edamame', 150),
('mp3', 'Wednesday', 'Breakfast', 'Oatmeal with Nuts & Seeds', 450),
('mp3', 'Wednesday', 'Lunch', 'Large Bean Burrito', 580),
('mp3', 'Wednesday', 'Dinner', 'Seitan Stir-fry', 520),
('mp3', 'Wednesday', 'Snack', 'Vegan Protein Shake', 280),
('mp3', 'Thursday', 'Breakfast', 'Tofu Scramble', 400),
('mp3', 'Thursday', 'Lunch', 'Leftover Seitan Stir-fry', 520),
('mp3', 'Thursday', 'Dinner', 'Beyond Burger on Whole Wheat', 650),
('mp3', 'Thursday', 'Snack', 'Hummus with Carrots', 200),
('mp3', 'Friday', 'Breakfast', 'Oatmeal with Nuts & Seeds', 450),
('mp3', 'Friday', 'Lunch', 'Quinoa Bowl with Black Beans', 550),
('mp3', 'Friday', 'Dinner', 'Vegan Pizza', 700),
('mp3', 'Friday', 'Snack', 'Edamame', 150),
('mp3', 'Saturday', 'Breakfast', 'Vegan Protein Pancakes', 500),
('mp3', 'Saturday', 'Lunch', 'Tempeh Sandwiches', 480),
('mp3', 'Saturday', 'Dinner', 'Black Bean Enchiladas', 620),
('mp3', 'Saturday', 'Snack', 'Vegan Protein Shake', 280),
('mp3', 'Sunday', 'Breakfast', 'Tofu Scramble', 400),
('mp3', 'Sunday', 'Lunch', 'Leftover Enchiladas', 620),
('mp3', 'Sunday', 'Dinner', 'Hearty Vegetable Stew', 500),
('mp3', 'Sunday', 'Snack', 'Hummus with Carrots', 200);
`;
