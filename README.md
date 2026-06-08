# clinicOS Backend 🏥🤖

A robust, enterprise-grade medical clinic management backend built with Node.js, Express, TypeScript, and MongoDB. This system features role-based access control, automated medical notifications, Cloudinary-powered medical report uploads, and an advanced AI-driven symptom analysis engine.

## 🚀 Features

- **TypeScript Native**: Full type-safety, compilation interfaces, and strict data validation across the workspace.
- **Role-Based Access Control (RBAC)**: Secure separation between Admins, Doctors, Patients, and Staff.
- **Automated Bookings**: Complex scheduling logic to eliminate appointment overlap.
- **AI Symptom Analysis**: Integrated machine learning layer for intelligent patient pre-assessment.
- **Cloud File Storage**: Instant uploading and streaming of prescription PDFs and lab reports via Cloudinary.
- **Advanced Communications**: Automated email/SMS appointment confirmations and reminders.

---

## 📁 Repository Architecture

```text
backend/
│
├── server.ts                # Entry point (Express app initialization)
├── app.ts                   # App configurations (Middlewares & routing)
├── package.json             # Scripts & dependencies
├── tsconfig.json            # TypeScript configuration
├── .env                     # Local environment variables
│
├── config/                  # External configurations ⚙️
│   ├── db.ts                # MongoDB connection instance
│   ├── cloudinary.ts        # Cloudinary setup for document storage
│   └── jwt.ts               # Core JWT settings
│
├── models/                  # Database schemas 🗄️
│   ├── User.ts              # Core Auth schema
│   ├── PatientProfile.ts    # Patient history & demography
│   ├── DoctorProfile.ts     # Clinic schedule & specialization
│   ├── Appointment.ts       # Booking schedules
│   ├── Prescription.ts      # Digital medical scripts
│   ├── Report.ts            # Lab results & files
│   └── Reminder.ts          # CRON task records
│
├── controllers/             # Business logic layers 🧠
│   ├── authController.ts
│   ├── patientController.ts
│   ├── doctorController.ts
│   ├── appointmentController.ts
│   ├── prescriptionController.ts
│   ├── reportController.ts
│   └── adminController.ts
│
├── routes/                  # API routes endpoints 🛣️
│   └── (Corresponding resource routes map)
│
├── middleware/              # Security & system hooks 🛡️
│   ├── authMiddleware.ts    # Token decode & validation
│   ├── roleMiddleware.ts    # Route gatekeeping by user permissions
│   ├── errorMiddleware.ts   # Global application fallback handler
│   └── uploadMiddleware.ts  # Multer integration
│
├── services/                # Advanced automation (PRO LEVEL) 🤖
│   ├── aiService.ts         # Diagnostic symptom analysis
│   ├── notificationService.ts # Email/SMS dispatch triggers
│   └── appointmentService.ts # Validation constraints for scheduling
│
├── utils/                   # Helper functions 🧰
└── constants/               # Global static values 📌
```

---

## 🛠️ Tech Stack & Dependencies

- **Runtime**: Node.js v18+
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **File Handling**: Multer & Cloudinary

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root directory of your backend folder and populate it with your credentials:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secure_jwt_secret
JWT_EXPIRY=7d

# Third-Party Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI & Notification Service Credentials (If Applicable)
AI_SERVICE_API_KEY=your_ai_api_key
NOTIFICATION_PROVIDER_SECRET=your_provider_secret
```

---

## 🏃 Local Development Installation

### 1. Prerequisites
Ensure you have Node.js and npm installed on your system.

### 2. Clone and Navigate
```bash
git clone https://github.com
cd clinicOS/backend
```

### 3. Install Packages
```bash
npm install
```

### 4. Run Scripts
- **Development Mode (Hot Reloading via ts-node-dev)**:
  ```bash
  npm run dev
  ```
- **Production Build compilation**:
  ```bash
  npm run build
  ```
- **Start Compiled Production Server**:
  ```bash
  npm start
  ```

---

## 🔒 API Guardrails & Security

1. **JWT Verification**: Pass the token via the `Authorization: Bearer <token>` header to access protected patient/doctor modules.
2. **RBAC Rules**: Certain routes inside `adminRoutes.ts` or `doctorRoutes.ts` require specific role declarations within your signed payload.
