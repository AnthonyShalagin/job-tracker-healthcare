import { Resend } from "resend";

interface RoleWithCompany {
  title: string;
  url: string;
  location: string | null;
  salary: string | null;
  company: { name: string };
}

export async function sendDigestEmail(roles: RoleWithCompany[]): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("RESEND_API_KEY not set, skipping email");
    return;
  }

  const resend = new Resend(apiKey);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://job-tracker-healthcare.vercel.app";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const roleRows = roles
    .map(
      (r) => `
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #525252;">
          ${r.company.name}
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e5e5; font-size: 14px;">
          <a href="${r.url}" style="color: #2563eb; text-decoration: none; font-weight: 500;">
            ${r.title}
          </a>
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #737373;">
          ${r.location || "Remote"}
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #737373;">
          ${r.salary || "Not listed"}
        </td>
      </tr>`
    )
    .join("");

  const html = `
    <div style="max-width: 700px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="background: #f5f5f4; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0 0 4px 0; font-size: 20px; color: #1c1917;">
          Healthcare Job Tracker
        </h1>
        <p style="margin: 0; font-size: 14px; color: #78716c;">${today}</p>
      </div>
      <div style="padding: 20px 24px; background: white;">
        <p style="margin: 0 0 16px 0; font-size: 15px; color: #292524;">
          <strong>${roles.length} new role${roles.length === 1 ? "" : "s"}</strong> found matching your profile.
        </p>
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e5e5; border-radius: 6px;">
          <thead>
            <tr style="background: #fafaf9;">
              <th style="padding: 10px 12px; text-align: left; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Company</th>
              <th style="padding: 10px 12px; text-align: left; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Role</th>
              <th style="padding: 10px 12px; text-align: left; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Location</th>
              <th style="padding: 10px 12px; text-align: left; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Salary</th>
            </tr>
          </thead>
          <tbody>${roleRows}</tbody>
        </table>
      </div>
      <div style="padding: 16px 24px; background: #fafaf9; border-radius: 0 0 8px 8px; text-align: center;">
        <a href="${appUrl}" style="display: inline-block; padding: 10px 24px; background: #292524; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">
          View Dashboard
        </a>
      </div>
    </div>
  `;

  await resend.emails.send({
    from: "Job Tracker <onboarding@resend.dev>",
    to: ["anthony.shalagin@gmail.com", "emma.raykhman@gmail.com"],
    subject: `${roles.length} new role${roles.length === 1 ? "" : "s"} found — Healthcare Job Tracker`,
    html,
  });
}
