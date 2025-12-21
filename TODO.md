# Project Tasks & Future Improvements

## Email & Enquiry Handling

- [x] **Implement Transactional Email Service**: Move away from direct Google SMTP (if used) or basic handling.
  - _Context_: User recalls a recommendation for an "internet email software" (likely SendGrid, Mailgun, or Formspree) to handle enquiries.
  - _Goal_: Register for a free tier of a service and route enquiry data to specific destinations (x, y, z).
  - _Update_: Implemented EmailJS (@emailjs/browser) in `pages/contact.js`. User needs to provide `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` in `.env.local`.

## UI/UX Improvements

- [x] **Redesign Cookie Consent Banner**: Fix the issue where the Google/Cookie consent banner takes up too much screen space.
  - _Current State_: User reports it takes up a "huge chunk" of the page.
  - _Action_: Customize the styling or switch libraries to make it less intrusive while maintaining compliance.
