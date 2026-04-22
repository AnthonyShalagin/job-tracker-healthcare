import { Resend } from "resend";

interface RoleWithCompany {
  title: string;
  url: string;
  location: string | null;
  salary: string | null;
  relevanceScore?: number | null;
  firstSeen: Date;
  postedDate?: Date | null;
  company: { name: string };
}

function formatPosted(date: Date | null | undefined): string {
  if (!date) return "Unknown";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Unknown";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function sendDigestEmail(
  allActiveRoles: RoleWithCompany[],
  newRoleCount: number
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("RESEND_API_KEY not set, skipping email");
    return;
  }

  const recipients = (process.env.NOTIFICATION_EMAILS || "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    console.log("NOTIFICATION_EMAILS is empty, skipping email");
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

  // Separate new roles (first seen in last 24h) from existing
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  const newRoles = allActiveRoles.filter((r) => r.firstSeen.getTime() > oneDayAgo);
  const existingRoles = allActiveRoles.filter((r) => r.firstSeen.getTime() <= oneDayAgo);

  function roleRow(r: RoleWithCompany, isNew: boolean): string {
    const posted = formatPosted(r.postedDate);
    return `
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #525252;">
          ${r.company.name}
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e5e5; font-size: 14px;">
          <a href="${r.url}" style="color: #2563eb; text-decoration: none; font-weight: 500;">
            ${r.title}
          </a>
          ${isNew ? ' <span style="background: #d1fae5; color: #065f46; padding: 1px 6px; border-radius: 4px; font-size: 11px; font-weight: 600;">NEW</span>' : ""}
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #737373;">
          ${r.location || "Remote"}
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: ${posted === "Unknown" ? "#a8a29e" : "#737373"};">
          ${posted}
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #737373;">
          ${r.salary || "—"}
        </td>
      </tr>`;
  }

  const newRoleRows = newRoles.map((r) => roleRow(r, true)).join("");
  const existingRoleRows = existingRoles.map((r) => roleRow(r, false)).join("");

  const summaryLine = newRoleCount > 0
    ? `<strong>${newRoleCount} new role${newRoleCount === 1 ? "" : "s"}</strong> found today. ${allActiveRoles.length} active total.`
    : `${allActiveRoles.length} active role${allActiveRoles.length === 1 ? "" : "s"} matching your profile. No new roles today.`;

  const subject = newRoleCount > 0
    ? `${newRoleCount} new + ${allActiveRoles.length} active — Koala Job Tracker`
    : `Daily update: ${allActiveRoles.length} active roles — Koala Job Tracker`;

  const tableRows = newRoleRows + existingRoleRows;

  const html = `
    <div style="max-width: 700px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="background: #f5f5f4; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0 0 4px 0; font-size: 20px; color: #1c1917;">
          Koala Job Tracker
        </h1>
        <p style="margin: 0; font-size: 14px; color: #78716c;">${today}</p>
      </div>
      <div style="padding: 20px 24px; background: white;">
        <p style="margin: 0 0 16px 0; font-size: 15px; color: #292524;">
          ${summaryLine}
        </p>
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e5e5; border-radius: 6px;">
          <thead>
            <tr style="background: #fafaf9;">
              <th style="padding: 10px 12px; text-align: left; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Company</th>
              <th style="padding: 10px 12px; text-align: left; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Role</th>
              <th style="padding: 10px 12px; text-align: left; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Location</th>
              <th style="padding: 10px 12px; text-align: left; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Posted</th>
              <th style="padding: 10px 12px; text-align: left; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Salary</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>
      <div style="padding: 16px 24px; background: #fafaf9; border-radius: 0 0 8px 8px; text-align: center;">
        <a href="${appUrl}" style="display: inline-block; padding: 10px 24px; background: #292524; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">
          View Dashboard
        </a>
      </div>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from: "Koala Job Tracker <onboarding@resend.dev>",
      to: recipients,
      subject,
      html,
    });
    // Resend SDK returns { data, error } — it does NOT throw on 4xx/5xx.
    // Must explicitly check result.error and surface it.
    if (result.error) {
      console.error("Resend rejected send:", JSON.stringify(result.error));
      throw new Error(
        `Resend error (${result.error.name || "unknown"}): ${result.error.message || JSON.stringify(result.error)}`
      );
    }
    console.log("Email sent:", JSON.stringify(result.data));
  } catch (err) {
    console.error("Email send failed:", err);
    throw err;
  }
}
