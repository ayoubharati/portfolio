import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Configure Nodemailer with Gmail SMTP (FREE - like Spring Boot's JavaMailSender)
    // You need to set these in .env.local:
    // GMAIL_USER=your-email@gmail.com
    // GMAIL_APP_PASSWORD=your-app-password (not your regular password!)

    const gmailUser = process.env.GMAIL_USER
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

    if (!gmailAppPassword) {
      // Fallback: Log to console in development
      console.log('Email would be sent:', {
        to: 'ayoubharati987@gmail.com',
        from: email,
        subject: `Portfolio Contact: ${name}`,
        message: message,
      })

      return NextResponse.json(
        {
          success: true,
          message: 'Email sent successfully (logged in development). Set GMAIL_APP_PASSWORD in .env.local to enable real emails.'
        },
        { status: 200 }
      )
    }

    // Create transporter (like Spring Boot's JavaMailSender)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword, // Use App Password, not regular password
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // Email options
    const mailOptions = {
      from: `"Portfolio Contact Form" <${gmailUser}>`,
      to: 'ayoubharati987@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact Form: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #063F1F;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #666; font-size: 12px;">This email was sent from your portfolio contact form.</p>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
    }

    // Send email (FREE - using Gmail SMTP)
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { success: true, message: 'Email sent successfully!' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send email. Please check your Gmail configuration.' },
      { status: 500 }
    )
  }
}
