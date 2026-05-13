const { Resend } = require("resend");
const express = require('express')
const router = express.Router()
dotenv = require("dotenv").config();

console.log(process.env.RESEND_KEY)

const resend = new Resend(process.env.RESEND_KEY);

router.post("/", async (req, res) => {
  console.log("Route entered")

  const email = req.body.email;
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const phone = req.body.phone;
  const message = req.body.message;

  console.log(email)
  console.log(firstName)
  console.log(lastName)
  console.log(phone)
  console.log(message)

  if (!(email.length > 0 && firstName.length > 0 && lastName.length > 0 && phone.length > 0 && message.length > 0)) {
    console.log("Successfully blocked bad contact")
    res.status(500).json("Contact was unsuccessful!");
    return;
  }
    
  try {
    const resendResult = await resend.batch.send([
      {
        from: "Nasir Griffin <no-reply@nasirgriffin.com>",
        to: [process.env.CLIENT_EMAIL],
        subject: "New website inquiry (Griffin Managed Web Solutions)",
        html: `
          <div style="margin:0;padding:0;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f7fb;padding:24px 0;">
              <tr>
                <td align="center">
                  <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="width:640px;max-width:94%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e9ecf2;">
                    <tr>
                      <td style="padding:24px 28px;background:#0b0b0d;">
                        <img
                          src="https://www.nasirgriffin.com/static/email_icon.png"
                          alt="Nasir Griffin"
                          style="display:block;width:120px;max-width:120px;height:auto;"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:24px 28px;color:#111827;">
                        <h1 style="margin:0 0 8px 0;font-size:20px;line-height:28px;color:#111827;">
                          You have a new contact message
                        </h1>
                        <p style="margin:0 0 16px 0;font-size:14px;line-height:22px;color:#374151;">
                          A visitor submitted a message via your website contact form. Details are below.
                        </p>

                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-top:8px;">
                          <tr>
                            <td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;width:160px;font-size:13px;color:#374151;">
                              First Name
                            </td>
                            <td style="padding:10px 12px;background:#ffffff;border:1px solid #e5e7eb;font-size:13px;color:#111827;">
                              ${String(firstName ?? "").trim()}
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;width:160px;font-size:13px;color:#374151;">
                              Last Name
                            </td>
                            <td style="padding:10px 12px;background:#ffffff;border:1px solid #e5e7eb;font-size:13px;color:#111827;">
                              ${String(lastName ?? "").trim()}
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;width:160px;font-size:13px;color:#374151;">
                              Phone
                            </td>
                            <td style="padding:10px 12px;background:#ffffff;border:1px solid #e5e7eb;font-size:13px;color:#111827;">
                              ${String(phone ?? "").trim()}
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;width:160px;font-size:13px;color:#374151;">
                              Email
                            </td>
                            <td style="padding:10px 12px;background:#ffffff;border:1px solid #e5e7eb;font-size:13px;color:#111827;">
                              <a href="mailto:${String(email ?? "").trim()}" style="color:#111827;text-decoration:underline;">
                                ${String(email ?? "").trim()}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;width:160px;font-size:13px;color:#374151;vertical-align:top;">
                              Message
                            </td>
                            <td style="padding:10px 12px;background:#ffffff;border:1px solid #e5e7eb;font-size:13px;color:#111827;">
                              ${String(message ?? "").trim()}
                            </td>
                          </tr>
                        </table>

                        <p style="margin:18px 0 0 0;font-size:12px;line-height:18px;color:#6b7280;">
                          Tip: You can reply directly to the sender using the email address above.
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:18px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;line-height:18px;">
                        This message was sent automatically from the Nasir Griffin contact form.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        `,
      },
      {
        from: "Nasir Griffin <no-reply@nasirgriffin.com>",
        to: [email],
        subject: "We received your message",
        html: `
          <div style="margin:0;padding:0;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f7fb;padding:24px 0;">
              <tr>
                <td align="center">
                  <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="width:640px;max-width:94%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e9ecf2;">
                    <tr>
                      <td style="padding:24px 28px;background:#0b0b0d;">
                        <img
                          src="https://www.nasirgriffin.com/static/email_icon.png"
                          alt="Nasir Griffin"
                          style="display:block;width:120px;max-width:120px;height:auto;"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:24px 28px;color:#111827;">
                        <h1 style="margin:0 0 8px 0;font-size:20px;line-height:28px;color:#111827;">
                          Thank you for reaching out
                        </h1>
                        <p style="margin:0 0 14px 0;font-size:14px;line-height:22px;color:#374151;">
                          Hi ${String(firstName ?? "").trim() || "there"}, we’ve received your message and will respond as soon as possible.
                        </p>

                        <div style="margin:18px 0 0 0;padding:14px 16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;">
                          <p style="margin:0 0 8px 0;font-size:13px;line-height:20px;color:#374151;">
                            <strong style="color:#111827;">Your message:</strong>
                          </p>
                          <p style="margin:0;font-size:13px;line-height:20px;color:#111827;">
                            ${String(message ?? "").trim()}
                          </p>
                        </div>

                        <p style="margin:18px 0 0 0;font-size:12px;line-height:18px;color:#6b7280;">
                          If you need to add details, you can reply to this email and reference the message above.
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:18px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;line-height:18px;">
                        This is an automated confirmation from Nasir Griffin. Please do not share sensitive personal information via email.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        `,
      },
    ]);

    if (resendResult.error) {
      throw new Error(resendResult.error);
      return;
    }

    res.status(200).json("Contact was successful!");
  } catch (err) {
    console.error(err);
    console.log(err)
    res.status(500).json("Contact was unsuccessful!");
  }
});

module.exports = router