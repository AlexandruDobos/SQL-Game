# SQL Game

SQL Game is an interactive web application designed to help users enhance their SQL skills through engaging challenges and practical exercises. Whether you're a beginner or an advanced user, SQL Game provides a structured learning experience with theoretical and practical questions.

## Features

- **User Authentication:** Secure login and registration system for tracking progress.
- **Interactive SQL Challenges:** Users can answer theoretical and practical SQL questions, earning points for correct answers.
- **Difficulty Levels:** Three challenge levels - Easy, Medium, and Hard.
- **Leaderboard & Statistics:** Track performance and compare scores with other users.
- **Community-Driven Content:** Users can submit new questions for approval.
- **Competitive Mode:** Challenge other users and place point-based wagers.
- **Hints & Assistance:** Optional hints to help users answer difficult questions.
- **Administrator Panel:** Manage user-generated questions and approve contributions.

## Technologies Used

### Backend:
- **PHP** (for handling authentication, questions, and leaderboard management)
- **MySQL** (relational database to store user progress and questions)

### Frontend:
- **ReactJS** (for an interactive user experience)
- **Bootstrap** (for a responsive and modern UI)

### Additional Tools:
- **PHPMailer** (for email verification and password reset)
- **Git** (version control and collaboration)

## Setup Instructions

### Backend Setup:

1. Install **PHP** and **MySQL** on your system.
2. Import the database schema into MySQL:
   ```bash
   mysql -u root -p < database.sql
   ```
3. Configure database credentials in `config.php`:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'your_username');
   define('DB_PASS', 'your_password');
   define('DB_NAME', 'sql_game');
   ```
4. Start the backend server:
   ```bash
   php -S localhost:8000
   ```

### Frontend Setup:

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```

## Future Development

- ✅ **Real-time multiplayer SQL challenges**
- ✅ **Integration with third-party SQL learning platforms**
- ✅ **AI-generated SQL exercises for adaptive learning**
- ✅ **Mobile version for on-the-go practice**

## About

SQL Game was developed as part of a **Bachelor's thesis** at **Alexandru Ioan Cuza University**, aiming to provide an **interactive and engaging way to practice SQL**. The project is designed for **students, professionals, and anyone interested in improving their database skills**.

---

## 🚀 Contributions

Contributions are welcome! If you'd like to improve SQL Game, follow these steps:

1. **Fork the repository**  
2. **Create a new branch** (`git checkout -b feature-branch`)
3. **Commit your changes** (`git commit -m "Added a new feature"`)
4. **Push to GitHub** (`git push origin feature-branch`)
5. **Create a Pull Request**

Let's build SQL Game together! 🎯
