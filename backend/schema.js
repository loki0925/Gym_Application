
export const schemaSQL = `
-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS meal_plan_schedule, member_growth, weight_history, activity_log, payments, gym_classes, members, meal_plans, users, exercises;

-- Users Table
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('Admin', 'User') NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Meal Plans Table
CREATE TABLE meal_plans (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('Veg', 'Non-Veg', 'Vegan') NOT NULL,
    description TEXT
);

-- Members Table
CREATE TABLE members (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    joinDate DATE NOT NULL,
    membershipStatus ENUM('Active', 'Inactive', 'Frozen') NOT NULL,
    avatarUrl VARCHAR(255),
    assignedMealPlanId VARCHAR(255),
    assignedAdminId VARCHAR(255),
    FOREIGN KEY (assignedMealPlanId) REFERENCES meal_plans(id) ON DELETE SET NULL,
    FOREIGN KEY (assignedAdminId) REFERENCES users(id) ON DELETE SET NULL
);

-- Gym Classes Table
CREATE TABLE gym_classes (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    instructor VARCHAR(255) NOT NULL,
    day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    time TIME NOT NULL,
    duration INT NOT NULL,
    capacity INT NOT NULL,
    enrolled INT NOT NULL,
    category ENUM('Cardio', 'Strength', 'Yoga', 'CrossFit') NOT NULL
);

-- Payments Table
CREATE TABLE payments (
    id VARCHAR(255) PRIMARY KEY,
    memberId VARCHAR(255),
    memberName VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    status ENUM('Paid', 'Pending', 'Failed') NOT NULL
);

-- Member Growth Table
CREATE TABLE member_growth (
    id INT AUTO_INCREMENT PRIMARY KEY,
    month_name VARCHAR(20) NOT NULL,
    new_members INT NOT NULL
);

-- Activity Log Table
CREATE TABLE activity_log (
    id VARCHAR(255) PRIMARY KEY,
    date DATETIME NOT NULL,
    type ENUM('Running', 'Weightlifting', 'Yoga', 'Cycling', 'Swimming') NOT NULL,
    duration INT NOT NULL,
    caloriesBurned INT NOT NULL
);

-- Weight History Table
CREATE TABLE weight_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    weight DECIMAL(5, 2) NOT NULL
);

-- Exercises Table
CREATE TABLE exercises (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    muscleGroup ENUM('Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core') NOT NULL,
    description TEXT,
    imageUrl VARCHAR(255)
);

-- Meal Plan Schedule Table (Normalized)
CREATE TABLE meal_plan_schedule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    meal_plan_id VARCHAR(255) NOT NULL,
    day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    meal_type ENUM('Breakfast', 'Lunch', 'Dinner', 'Snack') NOT NULL,
    meal_name VARCHAR(255) NOT NULL,
    calories INT NOT NULL,
    FOREIGN KEY (meal_plan_id) REFERENCES meal_plans(id) ON DELETE CASCADE
);
`;
