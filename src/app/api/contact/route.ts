import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const SITE_EMAIL = process.env.CONTACT_EMAIL || "info@soulmatesorchestra.com";

// Lazy initialization of Resend to allow builds without API key
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, company, eventType, eventDate, guestCount, message, honeypot } =
      body;

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validate required fields
    if (!name || !email || !phone || !eventType || !eventDate || !guestCount || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const eventTypeLabels: Record<string, string> = {
      corporate: "Corporate Event",
      barMitzvah: "Bar/Bat Mitzvah",
      private: "Private Event",
      other: "Other",
    };

    const resend = getResend();

    // Send notification email to Soulmates team
    await resend.emails.send({
      from: "Soulmates Orchestra <notifications@soulmatesorchestra.com>",
      to: [SITE_EMAIL],
      subject: `New Inquiry: ${eventTypeLabels[eventType] || eventType} - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #CCB380 0%, #B9A06D 100%); color: #FAFAFA; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
            .value { margin-top: 4px; color: #333; }
            .message-box { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #CCB380; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Event Inquiry</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              ${
                company
                  ? `
              <div class="field">
                <div class="label">Company</div>
                <div class="value">${company}</div>
              </div>
              `
                  : ""
              }
              <div class="field">
                <div class="label">Event Type</div>
                <div class="value">${eventTypeLabels[eventType] || eventType}</div>
              </div>
              <div class="field">
                <div class="label">Event Date</div>
                <div class="value">${new Date(eventDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</div>
              </div>
              <div class="field">
                <div class="label">Guest Count</div>
                <div class="value">${guestCount} guests</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: "Soulmates Orchestra <hello@soulmatesorchestra.com>",
      to: [email],
      subject: "Thank you for your inquiry - Soulmates Orchestra",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #0A0A0A; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .card { background: #1A1A1A; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #CCB380 0%, #B9A06D 100%); padding: 30px; text-align: center; }
            .header h1 { color: #FAFAFA; margin: 0; font-size: 24px; }
            .content { padding: 30px; color: #FAFAFA; }
            .content p { margin-bottom: 15px; color: #A1A1A1; }
            .highlight { color: #CCB380; }
            .footer { padding: 20px 30px; border-top: 1px solid #252525; text-align: center; color: #6B6B6B; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">
              <div class="header">
                <h1>Soulmates Orchestra</h1>
              </div>
              <div class="content">
                <p>Dear <span class="highlight">${name}</span>,</p>
                <p>Thank you for reaching out to Soulmates Orchestra! We've received your inquiry and are excited to learn more about your upcoming ${eventTypeLabels[eventType] || "event"}.</p>
                <p>Our team will review your request and get back to you within <span class="highlight">24 hours</span> to discuss how we can make your event unforgettable.</p>
                <p style="margin-top: 30px;">Warm regards,<br><span class="highlight">The Soulmates Orchestra Team</span></p>
              </div>
              <div class="footer">
                &copy; ${new Date().getFullYear()} Soulmates Orchestra. All rights reserved.
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
