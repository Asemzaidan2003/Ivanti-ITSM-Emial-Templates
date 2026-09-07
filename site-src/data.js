// Single source of truth for the portal site's content.
// Edit this file (and site-src/pages/*.html for docs/about prose), then run
// `npm run build` (or `node build.js`) to regenerate every page under
// index.html, designs/, docs/, about/. Never hand-edit the generated pages.
//
// Does NOT cover Spectrum/ or Ledger/ (the actual Ivanti-pasteable email
// template files) — those stay hand-authored, untouched by this build.

const SITE_TITLE = "Ivanti ITSM Email Templates";
const AUTHOR = "Asem Zaidan";

// Module content (title/description/template list) is identical across
// designs per the repo's design system — only accent color and the
// Spectrum/Ledger folder differ. See designs.spectrum/ledger below.
const MODULES = [
  {
    slug: "incident",
    name: "Incident",
    dir: "Incident",
    tag: "11 templates",
    pageDesc:
      "Every notification tied to an incident ticket's lifecycle — from creation through " +
      "resolution, reopening, escalation-free closure, or cancellation — plus the " +
      "post-resolution satisfaction survey. Click any template to open the real, rendered " +
      "HTML file in a new tab.",
    overviewDesc: "New ticket through resolution, reopening, closure, or cancellation — plus the CSAT survey.",
    colors: { spectrum: "#4f46e5", ledger: "#1e3a5f" },
    templates: [
      { file: "incident-email-template.html", title: "New Ticket Created", desc: "Notifies the assigned analyst that a new incident ticket has been created." },
      { file: "incident-team-assignment.html", title: "Team Queue Assignment", desc: "Broadcasts a new incident to an entire team queue before anyone claims it." },
      { file: "incident-reassigned-owner.html", title: "Reassigned — Owner", desc: "Tells an analyst a ticket has been handed to them personally." },
      { file: "incident-reassigned-team.html", title: "Reassigned — Team", desc: "Tells a whole team a ticket has been moved to their queue." },
      { file: "incident-status-waiting-customer.html", title: "Status — Waiting for Customer", desc: "Asks the customer for more information before work can continue." },
      { file: "incident-status-on-hold-vendor.html", title: "Status — On Hold (Vendor)", desc: "Explains the ticket is paused pending a third-party vendor." },
      { file: "incident-status-resolved.html", title: "Status — Resolved", desc: "Tells the customer the issue is fixed and asks them to confirm." },
      { file: "incident-status-reopened.html", title: "Status — Reopened", desc: "Confirms a ticket was reopened after the issue recurred." },
      { file: "incident-status-closed.html", title: "Status — Closed", desc: "Final closure notice with a resolution summary." },
      { file: "incident-status-cancelled.html", title: "Status — Cancelled", desc: "Confirms a ticket was cancelled and won't be worked further." },
      { file: "incident-feedback-survey.html", title: "CSAT Feedback Survey", desc: "Asks the customer to rate their support experience." },
    ],
  },
  {
    slug: "service-request",
    name: "Service Request",
    dir: "Service Request",
    tag: "12 templates",
    pageDesc:
      "Every notification tied to a service request's lifecycle — submission, assignment, " +
      "every fulfillment status, and the post-fulfillment satisfaction survey. Click any " +
      "template to open the real, rendered HTML file in a new tab.",
    overviewDesc: "Submission through fulfillment, every status in between, and the CSAT survey.",
    colors: { spectrum: "#7c3aed", ledger: "#0f766e" },
    templates: [
      { file: "service-request-email-template-customer.html", title: "Submitted — Customer View", desc: "Confirms a service request was received and is awaiting fulfillment." },
      { file: "service-request-email-template-analyst.html", title: "Assigned — Analyst View", desc: "Notifies the analyst a request has been assigned to them." },
      { file: "service-request-team-assignment.html", title: "Team Queue Assignment", desc: "Broadcasts a new request to an entire team queue." },
      { file: "service-request-reassigned-owner.html", title: "Reassigned — Owner", desc: "Tells an analyst a request has been handed to them personally." },
      { file: "service-request-reassigned-team.html", title: "Reassigned — Team", desc: "Tells a whole team a request has been moved to their queue." },
      { file: "service-request-status-waiting-customer.html", title: "Status — Waiting for Customer", desc: "Asks the customer for missing details before fulfillment can continue." },
      { file: "service-request-status-waiting-development.html", title: "Status — Waiting for Development", desc: "Explains a request needs custom engineering work." },
      { file: "service-request-status-on-hold.html", title: "Status — On Hold", desc: "Explains the request is temporarily paused." },
      { file: "service-request-status-fulfilled.html", title: "Status — Fulfilled", desc: "Tells the customer their request has been delivered." },
      { file: "service-request-status-closed.html", title: "Status — Closed", desc: "Final closure notice with a fulfillment summary." },
      { file: "service-request-status-cancelled.html", title: "Status — Cancelled", desc: "Confirms a request was cancelled." },
      { file: "service-request-feedback-survey.html", title: "CSAT Feedback Survey", desc: "Asks the customer to rate their fulfillment experience." },
    ],
  },
  {
    slug: "approval",
    name: "Approval",
    dir: "Approval",
    tag: "6 templates",
    pageDesc:
      "Notifications for the approval workflow that sits in front of service requests — the " +
      "approver's decision (with Approve/Reject buttons right in the email), and every possible " +
      "outcome. Click any template to open the real, rendered HTML file in a new tab.",
    overviewDesc: "Approve/Reject buttons right in the email, and every possible outcome.",
    colors: { spectrum: "#f59e0b", ledger: "#b45309" },
    templates: [
      { file: "approval-request-customer.html", title: "Requested — Customer View", desc: "Tells the requester their item is awaiting approval." },
      { file: "approval-request-approver.html", title: "Requested — Approver View", desc: "Asks the approver to Approve or Reject, right from the email." },
      { file: "approval-approved-customer.html", title: "Approved", desc: "Confirms the request was approved and is moving forward." },
      { file: "approval-rejected-customer.html", title: "Rejected", desc: "Explains why the request was not approved." },
      { file: "approval-timedout-customer.html", title: "Timed Out", desc: "Explains the approval window expired without a decision." },
      { file: "approval-cancelled-customer.html", title: "Cancelled", desc: "Confirms an approval request was withdrawn." },
    ],
  },
  {
    slug: "escalation",
    name: "Escalation",
    dir: "Escalation",
    tag: "4 templates",
    pageDesc:
      "A three-tier internal escalation path — Team Lead, Manager, Director — with a visual " +
      "tracker showing how far a ticket has climbed, plus a formal SLA breach notice once all " +
      "tiers are exhausted. Click any template to open the real, rendered HTML file in a new tab.",
    overviewDesc: "Team Lead → Manager → Director, plus a formal SLA breach notice.",
    colors: { spectrum: "#dc2626", ledger: "#b91c1c" },
    templates: [
      { file: "escalation-level-1.html", title: "Level 1 — Team Lead", desc: "First-tier escalation notice to a team lead." },
      { file: "escalation-level-2.html", title: "Level 2 — Manager", desc: "Second-tier escalation notice to a manager." },
      { file: "escalation-level-3.html", title: "Level 3 — Director", desc: "Final internal escalation tier, to a director." },
      { file: "sla-breach.html", title: "SLA Breach", desc: "Formal notice that an SLA has been breached." },
    ],
  },
  {
    slug: "task-management",
    name: "Task Management",
    dir: "Task Management",
    tag: "6 templates",
    pageDesc:
      "Notifications for individual work items (tasks) linked to a parent ticket — assignment, " +
      "completion, overdue, reassignment, and cancellation. Click any template to open the " +
      "real, rendered HTML file in a new tab.",
    overviewDesc: "Assignment, completion, overdue, reassignment, and cancellation.",
    colors: { spectrum: "#0891b2", ledger: "#155e75" },
    templates: [
      { file: "task-email-template-analyst.html", title: "Assigned to You", desc: "Notifies a person a task has been assigned to them." },
      { file: "task-team-assignment.html", title: "Team Queue Assignment", desc: "Broadcasts a new task to an entire team queue." },
      { file: "task-status-completed.html", title: "Status — Completed", desc: "Confirms a task was finished." },
      { file: "task-status-overdue.html", title: "Status — Overdue", desc: "Flags a task that has passed its due date." },
      { file: "task-status-reassigned.html", title: "Status — Reassigned", desc: "Tells a person a task has been handed to them." },
      { file: "task-status-cancelled.html", title: "Status — Cancelled", desc: "Confirms a task was cancelled." },
    ],
  },
  {
    slug: "asset-management",
    name: "Asset Management",
    dir: "Asset Management",
    tag: "5 templates",
    pageDesc:
      "Notifications across the hardware asset lifecycle — assignment, warranty tracking, " +
      "retirement, audit confirmation, and return. Click any template to open the real, " +
      "rendered HTML file in a new tab.",
    overviewDesc: "Assignment, warranty tracking, retirement, audit, and return.",
    colors: { spectrum: "#0ea5e9", ledger: "#1d4ed8" },
    templates: [
      { file: "asset-assigned-to-you.html", title: "Assigned to You", desc: "Notifies an employee that hardware has been checked out to them." },
      { file: "asset-warranty-expiring.html", title: "Warranty Expiring", desc: "Flags an asset whose manufacturer warranty is expiring soon." },
      { file: "asset-retirement-notice.html", title: "Retirement Notice", desc: "Explains an asset has reached end-of-life and will be retired." },
      { file: "asset-audit-required.html", title: "Audit Confirmation Required", desc: "Asks an employee to confirm they still have an assigned asset." },
      { file: "asset-returned-confirmation.html", title: "Returned Confirmation", desc: "Confirms a returned asset was received and processed." },
    ],
  },
  {
    slug: "knowledge-management",
    name: "Knowledge Management",
    dir: "Knowledge Management",
    tag: "4 templates",
    pageDesc:
      "Notifications for the knowledge base's editorial lifecycle — publishing, periodic " +
      "review, approval, and retirement. Click any template to open the real, rendered HTML " +
      "file in a new tab.",
    overviewDesc: "Publishing, periodic review, approval, and retirement.",
    colors: { spectrum: "#0d9488", ledger: "#15803d" },
    templates: [
      { file: "knowledge-article-published.html", title: "Article Published", desc: "Notifies a team that a new knowledge base article is live." },
      { file: "knowledge-article-review-due.html", title: "Review Due", desc: "Reminds an author their article is due for periodic review." },
      { file: "knowledge-article-approval-needed.html", title: "Approval Needed", desc: "Asks an editor to review and approve a draft article." },
      { file: "knowledge-article-retired.html", title: "Article Retired", desc: "Confirms an outdated article was archived." },
    ],
  },
  {
    slug: "problem-management",
    name: "Problem Management",
    dir: "Problem Management",
    tag: "3 templates",
    pageDesc:
      "Notifications for root-cause investigation — linking related incidents into a problem " +
      "record, publishing a known error and workaround, and final resolution. Click any " +
      "template to open the real, rendered HTML file in a new tab.",
    overviewDesc: "Linked incidents, known-error/workaround, and final root-cause resolution.",
    colors: { spectrum: "#a21caf", ledger: "#7c2d92" },
    templates: [
      { file: "problem-record-created.html", title: "Problem Record Created", desc: "Notifies the problem team that related incidents were linked for root-cause analysis." },
      { file: "problem-known-error-published.html", title: "Known Error Published", desc: "Announces a root cause and workaround are now available." },
      { file: "problem-resolved-closed.html", title: "Resolved &amp; Closed", desc: "Confirms a permanent fix was applied and the problem is closed." },
    ],
  },
  {
    slug: "maintenance-operations",
    name: "Maintenance Operations",
    dir: "Maintenance Operations",
    tag: "5 templates",
    pageDesc:
      "Notifications around planned maintenance windows — scheduling, reminders, progress, " +
      "completion, and rescheduling. Click any template to open the real, rendered HTML file " +
      "in a new tab.",
    overviewDesc: "Scheduling, reminders, in-progress, completion, and rescheduling.",
    colors: { spectrum: "#ea580c", ledger: "#92400e" },
    templates: [
      { file: "scheduled-maintenance-notice.html", title: "Scheduled Notice", desc: "Announces an upcoming maintenance window and expected impact." },
      { file: "maintenance-reminder-24h.html", title: "24-Hour Reminder", desc: "Reminds affected users maintenance starts tomorrow." },
      { file: "maintenance-in-progress.html", title: "In Progress", desc: "Confirms maintenance has begun." },
      { file: "maintenance-completed.html", title: "Completed", desc: "Confirms maintenance finished and systems are restored." },
      { file: "maintenance-rescheduled.html", title: "Rescheduled", desc: "Explains a maintenance window was postponed." },
    ],
  },
  {
    slug: "feedback",
    name: "Feedback",
    dir: "Feedback",
    tag: "3 templates",
    pageDesc:
      "Cross-cutting CSAT notifications that apply to both Incidents and Service Requests — " +
      "reminders, completion confirmations, and internal low-satisfaction alerts. Click any " +
      "template to open the real, rendered HTML file in a new tab.",
    overviewDesc: "CSAT reminders, completion thank-yous, and internal low-satisfaction alerts.",
    colors: { spectrum: "#d97706", ledger: "#be185d" },
    metaDescNoun: "Feedback (CSAT)",
    templates: [
      { file: "csat-reminder.html", title: "CSAT Reminder", desc: "A final nudge to rate a recently closed ticket." },
      { file: "survey-completed.html", title: "Survey Completed", desc: "Thanks a customer for the rating and comment they submitted." },
      { file: "low-satisfaction-alert.html", title: "Low Satisfaction Alert", desc: "Internal alert to a manager when a customer reports low satisfaction." },
    ],
  },
  {
    slug: "employee",
    name: "Employee",
    dir: "Employee",
    tag: "1 template",
    pageDesc:
      "Onboarding notifications for newly created user accounts. This module is intentionally " +
      "thin today — a fuller lifecycle (offboarding, role change, password reset) is planned. " +
      "Click the template below to open the real, rendered HTML file in a new tab.",
    overviewDesc: "Onboarding notification for a newly created user account.",
    colors: { spectrum: "#4f46e5", ledger: "#3730a3" },
    templates: [
      { file: "employee-welcome-new-user.html", title: "Welcome — New User Created", desc: "Welcomes a new employee and shares their account setup steps." },
    ],
  },
];

const DESIGNS = {
  spectrum: {
    slug: "spectrum",
    name: "Spectrum",
    folder: "Spectrum",
    homeDesc:
      "One accent color per ITSM module — indigo, violet, teal, amber, magenta and more — " +
      "so ticket type and severity read at a glance, before the email is even opened.",
    pageDesc:
      "One accent-color gradient per ITSM module — indigo, violet, teal, amber, magenta and more " +
      "— so ticket type and severity are readable from the inbox before the email is even " +
      "opened. 60 templates across 11 modules, every one bilingual (English / Arabic).",
  },
  ledger: {
    slug: "ledger",
    name: "Ledger",
    folder: "Ledger",
    homeDesc:
      "A letterhead masthead, a metadata strip, and a fully gridded record table — every " +
      "template reads like a page torn from a corporate ledger, favoring typographic " +
      "discipline and structure over color-gradient badges.",
    pageDesc:
      "Every template reads like a page torn from a corporate ledger — a letterhead masthead, a " +
      "metadata strip, and a fully gridded record table — favoring typographic discipline and " +
      "structure over color-gradient badges. 60 templates across 11 modules, every one " +
      "bilingual (English / Arabic).",
  },
};

module.exports = { SITE_TITLE, AUTHOR, MODULES, DESIGNS };
