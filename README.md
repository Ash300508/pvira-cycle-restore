# Respectful Cycle

PVIRA CYCLE — AI-Powered Respectful Idol Disposal & Recovery Platform

Build a complete, modern, production-quality web application called PVIRA CYCLE.

1. CORE CONCEPT

PVIRA CYCLE is an AI-powered platform that helps people responsibly dispose of religious and cultural idols made from environmentally harmful or non-biodegradable materials such as Plaster of Paris, plastic, synthetic paints, and mixed materials.

Instead of offering a pickup service, PVIRA CYCLE uses a SELF DROP-OFF MODEL.

Users can:

Scan an idol → Understand its material → Find a suitable drop-off centre → Drop it off themselves → Material is recovered/recycled → Track their environmental impact

The platform should connect users with responsible disposal and recovery facilities while maintaining the respect and cultural sensitivity associated with idols.

Tagline

“Respect the Tradition. Protect the Environment. Recover the Future.”

Build this as a polished environmental-tech startup product, not a basic college website.

2. IMPORTANT PRODUCT DECISION

NO PICKUP SYSTEM

Do NOT create:

Pickup requests

Pickup scheduling

Home collection

Collector assignment

Pickup addresses

Pickup drivers

Pickup tracking

Pickup notifications

The user is responsible for taking the idol to a suitable PVIRA Drop-Off Centre.

The core feature is FIND A DROP-OFF CENTRE.

3. DESIGN & BRANDING

Create a premium environmental technology visual identity.

Color Palette

Use:

Deep forest green

Natural green

Light green

Off-white

Earthy beige

Charcoal/dark gray

Use green primarily for environmental actions and positive states.

Avoid making the website look childish or overly colorful.

Visual Style

Use:

Modern SaaS design

Clean layouts

Rounded cards

Soft shadows

Subtle gradients

Professional typography

Smooth but restrained animations

Large visual hierarchy

Responsive design

Mobile-first layouts

Modern dashboard components

Accessible contrast

Use respectful environmental imagery involving:

Clay idols

Sustainable materials

Recycling

Material recovery

Community drop-off

Clean water

Environmental conservation

Do not use imagery that could be culturally insensitive or disrespectful toward religious idols.

4. TECHNOLOGY

Use a modern stack:

React / Next.js

TypeScript

Tailwind CSS

Supabase

Supabase Authentication

Supabase PostgreSQL

Reusable component architecture

Modern chart library

AI-ready architecture

Map integration where possible

The project must work in Demo Mode even if external APIs are not configured.

Clearly separate demo/mock functionality from real API functionality.

5. NAVIGATION

Create a responsive navigation bar.

Logo

PVIRA CYCLE

Use a simple recycling/environment-inspired logo.

Main Navigation

Home

How It Works

AI Scanner

Drop-Off Centres

Impact

About

Right Side

Before login:

Login

Sign Up

After login:

Dashboard

Profile

Logout

On mobile, use a hamburger menu.

6. LANDING PAGE

Create a premium landing page.

HERO SECTION

Headline:

Respect the Tradition. Protect the Environment.

Supporting text:

“PVIRA CYCLE uses AI-powered identification and responsible drop-off systems to help communities dispose of environmental-harmful idols respectfully while enabling material recovery and recycling.”

Primary CTA:

Scan Your Idol

Secondary CTA:

Find a Drop-Off Centre

Include a visually impressive environmental image/illustration.

Add subtle animated elements representing:

AI

Recycling

Drop-off

Recovery

Sustainability

7. PROBLEM SECTION

Heading:

The Problem We Are Solving

Explain that after festivals and cultural events, many idols made from harmful or non-biodegradable materials are disposed of improperly.

Highlight:

Water pollution

Soil contamination

Harm to aquatic ecosystems

Plastic waste

Plaster of Paris waste

Synthetic paints and coatings

Non-biodegradable materials

Lack of convenient responsible disposal options

Loss of recoverable materials

Use statistics only when reliable sources are available.

If using placeholder statistics, clearly label them as sample/demo data.

8. SOLUTION SECTION

Heading:

A Respectful Way to Close the Celebration

Explain that PVIRA CYCLE provides a digital bridge between users and responsible disposal/recovery facilities.

Show the core process:

01 — SCAN

Upload or capture an image of the idol.

02 — IDENTIFY

AI estimates the material composition and environmental risk.

03 — LOCATE

Find a suitable PVIRA Drop-Off Centre based on material and location.

04 — DROP OFF

The user personally takes the idol to the selected centre.

05 — RECOVER

The centre processes, recovers, recycles, or responsibly handles the materials.

06 — IMPACT

The user receives confirmation and sees their environmental contribution.

9. AI IDOL SCANNER

Create a dedicated AI Scanner page.

The user should be able to:

Upload an image

Drag and drop an image

Use a camera on supported mobile devices

Preview the image

Remove/change image

Click Analyze Idol

After analysis, display:

AI ANALYSIS

Detected Material

Possible results:

Natural Clay

Plaster of Paris

Plastic

Metal

Paper/Mud

Mixed Material

Unknown

Confidence

Example:

87% confidence

Environmental Risk

Display:

Low

Moderate

High

Material Information

Explain briefly why the detected material matters.

Recommended Action

Example:

“Take this idol to a PVIRA Drop-Off Centre that accepts Plaster of Paris materials.”

Important AI Requirement

If no real AI vision API is connected, implement a realistic DEMO AI ANALYSIS MODE.

Clearly label it as:

Demo AI Analysis

Do not falsely claim that demo classification is real AI.

Structure the code so a real AI vision API can be integrated later.

10. FIND DROP-OFF CENTRES

This is one of the MAIN features of PVIRA CYCLE.

Create a dedicated page:

Find a Drop-Off Centre

Allow users to:

Use current location if they permit location access

Enter a city/locality manually

Search by PIN code

Search by material

Filter centres

Filters:

Clay

Plaster of Paris

Plastic

Metal

Mixed materials

Other

Each centre should be displayed as a modern card.

Drop-Off Centre Card

Show:

Centre Name

Address

Distance

Opening hours

Accepted materials

Current capacity/status

Contact information if appropriate

Buttons:

View Details

Get Directions

Select Centre

Use a map component when a map API is available.

If maps are unavailable, provide a clean demo map interface with sample locations.

Do not expose private residential addresses.

11. DROP-OFF CENTRE DETAILS

When the user opens a centre:

Display:

Centre name

Address

Map

Opening hours

Accepted materials

Environmental facilities

Current availability

Instructions

Contact information

Directions

Add:

Select This Centre

12. DROP-OFF FLOW

After selecting a centre, show:

“You're Ready to Drop Off Responsibly”

Display:

Selected centre

Accepted material

Drop-off instructions

Opening hours

Reference ID

Generate a unique reference ID such as:

PVC-2026-00124

Also generate a QR code for the drop-off reference.

The user can show the QR/reference ID at the centre.

13. DROP-OFF CONFIRMATION

After the user drops off the idol, the centre/admin can confirm the submission.

Create an admin interface where staff can enter or scan the reference ID.

After confirmation, user status becomes:

Drop-Off Completed

Show:

Date

Centre

Material

Quantity

Recovery status

Eco Points earned

Display a success message:

“Thank you for choosing responsible disposal.”

14. TRACK RECOVERY

Instead of tracking pickup, track the recovery journey.

Create a page:

Track My Idol

Users enter their reference ID.

Show a timeline:

Drop-Off Registered
↓
Material Received
↓
Sorting & Assessment
↓
Recovery / Recycling
↓
Processing Complete

Each stage should display:

Status

Date

Description

Do not include any pickup-related stages.

15. USER DASHBOARD

Create a polished user dashboard.

Welcome

Welcome back, [User Name]

Overview Cards

Idols Responsibly Disposed

Materials Recovered

Drop-Offs Completed

PVIRA Eco Points

Recent Drop-Offs

Show:

Reference ID

Centre

Material

Date

Status

View details

Environmental Impact

Show:

Material recovered

Waste diverted

Responsible disposals

Community contribution

Use realistic demo data if the database is empty.

16. ECO POINTS

Create a simple environmental reward system.

Users earn PVIRA Points for:

Completing responsible drop-offs

Participating in recovery

Referring users

Completing educational activities

Badges:

Eco Starter

Responsible Recycler

Green Guardian

PVIRA Champion

Keep gamification secondary to the environmental mission.

17. ENVIRONMENTAL IMPACT DASHBOARD

Create an Impact page.

Display:

Total idols responsibly disposed

Total material recovered

Plastic diverted

POP material responsibly processed

Waste diverted from improper disposal

Number of participating users

Number of drop-off centres

Communities served

Use:

Animated counters

Bar charts

Line charts

Donut charts

Progress cards

Clearly label demo/sample data.

18. AI ASSISTANT

Create an AI assistant called:

PVIRA Assistant

The assistant should answer questions related to responsible idol disposal.

Example questions:

“How should I dispose of this idol?”

“What is my idol likely made of?”

“Where can I drop off a POP idol?”

“What happens after I drop off my idol?”

“Why should harmful idols not be disposed of directly in water?”

“What materials can be recovered?”

Create:

Chat interface

User messages

AI responses

Loading animation

Suggested questions

If no AI API is configured, use a demo response system.

Clearly structure the code for future real AI integration.

19. ABOUT PAGE

Create:

Our Mission

“To make responsible idol disposal accessible, respectful, and environmentally sustainable.”

Our Vision

“A future where cultural celebrations and environmental responsibility go hand in hand.”

Our Approach

AI + Identification + Drop-Off + Recovery + Community

Explain:

Why responsible disposal matters

How AI helps

How drop-off centres work

How materials can be recovered

How communities participate

20. ADMIN DASHBOARD

Create a separate secure admin dashboard.

Overview

Show:

Total users

Total drop-offs

Pending confirmations

Completed drop-offs

Materials recovered

Active drop-off centres

Environmental impact

Drop-Off Records

Table:

Reference ID

User

Centre

Material

Quantity

Date

Status

Actions

Statuses:

Selected

Drop-Off Registered

Received

Processing

Recovery

Completed

Cancelled

Admins should be able to update status.

21. DROP-OFF CENTRE MANAGEMENT

Admin should be able to:

Add centre

Edit centre

Remove centre

Update opening hours

Update accepted materials

Update capacity/status

View centre statistics

Centre fields:

Name

Address

City

PIN code

Latitude

Longitude

Opening hours

Accepted materials

Contact information

Capacity

Current status

Possible status:

Open

Temporarily Closed

Full

Maintenance

22. DATABASE

Use Supabase PostgreSQL.

Create tables such as:

users

id

name

email

phone

role

eco_points

created_at

drop_off_centres

id

name

address

city

pincode

latitude

longitude

opening_hours

accepted_materials

capacity

status

created_at

drop_off_records

id

reference_id

user_id

centre_id

idol_type

detected_material

quantity

image_url

status

created_at

completed_at

recovery_records

id

drop_off_id

material

quantity

recovery_method

status

recovery_date

eco_points

id

user_id

points

reason

created_at

impact_metrics

id

metric_name

metric_value

updated_at

Use proper relationships.

Implement appropriate database security and row-level security.

23. AUTHENTICATION

Implement:

Sign Up

Login

Logout

Forgot Password

User Profile

Roles:

USER

Can:

Scan idols

Find centres

Select a centre

Generate drop-off reference

Track recovery

View dashboard

Earn points

ADMIN

Can:

Manage users

Manage drop-off centres

Confirm drop-offs

Update recovery status

Manage recovery records

View analytics

Protect admin routes.

24. NOTIFICATIONS

Create application notifications for:

Drop-off centre selected

Drop-off registered

Idol received

Recovery started

Recovery completed

Eco Points earned

For MVP, notifications can be stored inside the application.

Structure the code so email/SMS/WhatsApp notifications can be added later.

25. LOCATION & MAPS

Allow users to:

Use current location with permission

Enter location manually

Search by city

Search by PIN code

Show nearby drop-off centres.

If a map API is unavailable, use a demo map component and sample centre data.

Do not require location permission for the application to work.

26. DEMO MODE

The application must work without external API keys.

Create realistic demo data for:

Users

Drop-off centres

AI analysis

Drop-off records

Recovery records

Environmental statistics

AI Assistant

Include clear code separation between:

DEMO MODE

and

PRODUCTION/API MODE

Do not present fake demo data as real-world statistics.

27. ERROR & EMPTY STATES

Implement friendly UI for:

Invalid login

Invalid reference ID

Image upload failure

AI analysis failure

No nearby centres

Centre unavailable

Database error

Empty dashboard

Network failure

Use clear messages and retry actions.

28. ACCESSIBILITY

Implement:

Semantic HTML

Proper labels

Keyboard navigation

Accessible forms

Good contrast

Alt text

Responsive typography

Screen-reader-friendly buttons

Clear validation messages

29. MOBILE EXPERIENCE

The mobile version is extremely important.

Optimize the app for users standing at a festival/drop-off location.

Make these actions easy to access:

Scan Idol

Find Centre

Get Directions

Show Drop-Off QR

Track Recovery

Use large touch-friendly buttons.

30. LANDING PAGE STRUCTURE

Use this exact order:

Navbar

Hero

Problem

Solution

How It Works

AI Scanner Preview

Find Drop-Off Centre Preview

Environmental Impact

Why PVIRA CYCLE

Call To Action

Footer

CTA section:

Ready to Dispose Responsibly?

Buttons:

Scan Your Idol

Find a Drop-Off Centre

31. FOOTER

Display:

PVIRA CYCLE

“Respect the Tradition. Protect the Environment. Recover the Future.”

Links:

Home

How It Works

AI Scanner

Drop-Off Centres

Impact

About

Privacy Policy

Terms

Bottom:

© 2026 PVIRA CYCLE. All rights reserved.

32. COMPONENT ARCHITECTURE

Create reusable components.

Examples:

Navbar

Footer

Hero

FeatureCard

ImpactCard

Scanner

AIResultCard

CentreCard

CentreSearch

Map

DropOffQRCode

RecoveryTimeline

StatusBadge

DashboardCard

NotificationPanel

AdminTable

Modal

Toast

LoadingState

EmptyState

Do not place the entire application in one file.

Keep components modular and maintainable.

33. SECURITY

Implement:

Supabase authentication

Protected routes

Admin role protection

Secure database access

Row-level security

Input validation

File upload validation

Reasonable image upload limits

Do not expose API keys in frontend code

34. FINAL USER JOURNEY

The main user journey must be:

USER

Open PVIRA CYCLE

↓

Scan Idol

↓

AI identifies likely material

↓

View environmental risk + recommendation

↓

Find suitable Drop-Off Centre

↓

Select centre

↓

Get directions

↓

Generate Drop-Off Reference / QR

↓

Personally drop off idol

↓

Centre confirms receipt

↓

Track recovery

↓

Material recovered/recycled

↓

User receives Eco Points

↓

User sees environmental impact

35. IMPORTANT PRODUCT PHILOSOPHY

PVIRA CYCLE is NOT a traditional waste-management pickup service.

It is a:

Digital + AI + Responsible Disposal + Material Recovery platform.

The product should emphasize:

RESPECT

Respect cultural and religious traditions.

RESPONSIBILITY

Encourage users to choose environmentally responsible disposal.

RECOVERY

Treat discarded materials as resources wherever possible.

TECHNOLOGY

Use AI to make responsible disposal easier and more accessible.

COMMUNITY

Help communities participate in sustainable practices.

36. FINAL REQUIREMENT

Build the complete application as a functional MVP.

Do not only create static pages.

Make navigation work.

Make authentication work.

Make forms functional.

Make the AI Scanner work in Demo Mode.

Make centre search work.

Make centre selection work.

Generate working reference IDs.

Generate QR codes.

Make recovery tracking functional.

Make the user dashboard functional.

Make the admin dashboard functional.

Make centre management functional.

Use realistic sample data when required.

The final result should look and feel like a real environmental-tech startup platform that could be demonstrated to judges, investors, colleges, NGOs, municipalities, and potential users.

The central message throughout the product should remain:

“Respect the Tradition. Protect the Environment. Recover the Future.”

Start by building the complete project architecture and polished landing page, then implement the authentication, database, AI scanner, drop-off centre system, recovery tracking, user dashboard, admin dashboard, and impact system.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pvira-cycle-restore.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/60c92a43-6d01-4a6a-b1f8-67bc13dc2bd2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
