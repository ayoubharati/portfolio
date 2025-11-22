# Free Email Setup (Like Spring Boot's JavaMailSender)

This uses **Nodemailer** with **Gmail SMTP** - completely FREE, just like Spring Boot's email libraries!

## Setup Instructions:

### Step 1: Enable Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** (left sidebar)
3. Enable **2-Step Verification** (if not already enabled)
4. Go to **App passwords** (search for it or find it under Security)
5. Select **Mail** and **Other (Custom name)**
6. Enter "Portfolio Contact Form" as the name
7. Click **Generate**
8. Copy the 16-character password (you'll need this)

### Step 2: Create .env.local File

Create a file named `.env.local` in the root of your project (same level as `package.json`):

```
GMAIL_USER=ayoubharati987@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password-here
```

**Important:** 
- Use the **App Password** (16 characters), NOT your regular Gmail password
- Never commit `.env.local` to git (it's already in .gitignore)

### Step 3: Install Dependencies

The dependencies are already installed. If you need to reinstall:

```bash
npm install nodemailer @types/nodemailer
```

### Step 4: Test

1. Start your development server: `npm run dev`
2. Fill out the contact form
3. Submit it
4. Check your email at `ayoubharati987@gmail.com`

## How It Works:

- Uses **Gmail SMTP** (smtp.gmail.com) - completely FREE
- Similar to Spring Boot's `JavaMailSender` with SMTP configuration
- No paid services required
- Works with any Gmail account

## Troubleshooting:

- **"Invalid login"**: Make sure you're using the App Password, not your regular password
- **"Less secure app access"**: Enable 2-Step Verification and use App Passwords
- **Email not received**: Check spam folder, verify App Password is correct

