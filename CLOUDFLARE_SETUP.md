# ⛔ DEPRECATED - DO NOT USE CLOUDFLARE

**Date Deprecated:** January 27, 2026

**Reason:** Cloudflare deleted the domain `workexperience.sg` after 3 failed setup attempts due to their confusing free tier requirements.

**New Solution:** See [GOOGLE_SECURITY_SETUP.md](GOOGLE_SECURITY_SETUP.md) for proper enterprise security using Google Cloud Platform.

---

## ~~Cloudflare DNS Setup - Status Log~~ (OBSOLETE)

## ~~Issue Received~~

**Date:** January 20, 2026

Received email from Cloudflare stating:

> "workexperience.sg is not benefiting from Cloudflare's network. To boost speed and security, update its nameservers."

## Actions Already Completed ✅

1. **Nameservers Updated at Domain Registrar**
   - Registrar: Dreamscape Networks (Admin Contact)
   - Changed to Cloudflare nameservers:
     - `carl.ns.cloudflare.com`
     - `hattie.ns.cloudflare.com`

2. **DNS Records Configured**
   - A record: `workexperience.sg` → `76.76.21.21`
   - A record: `*.workexperience.sg` → `76.76.21.21`
   - CNAME record: `www.workexperience.sg` → `3b08c6e8de7069aa.vercel-dns-017.com`
   - CNAME record: `ftp.workexperience.sg` → `workexperience.sg`
   - A record: `localhost.workexperience.sg` → `127.0.0.1`
   - A record: `mail.workexperience.sg` → `103.11.189.189`
   - MX record: `workexperience.sg` → `mail.workexperience.sg`

## DNS Propagation Check Results

**Checked:** January 20, 2026  
**Tool:** https://www.whatsmydns.net/

### NS Record Results (7/8 locations showing Cloudflare):

- ✅ Bangkok, Thailand
- ✅ Kota Kinabalu, Malaysia
- ✅ Singapore, Singapore
- ✅ Beijing, China
- ✅ Seoul, South Korea
- ✅ Adelaide SA, Australia
- ✅ Melbourne VIC, Australia
- ❌ Coimbatore, India (still propagating)

Both nameservers showing correctly:

- `carl.ns.cloudflare.com`
- `hattie.ns.cloudflare.com`

## Current Status

**Status:** DNS propagation in progress (~87.5% complete)

The nameserver change was successful and is propagating globally. The email was likely sent before Cloudflare detected the change.

## Next Steps

### Tomorrow (January 21, 2026):

1. **Check Cloudflare Dashboard**
   - Login: https://dash.cloudflare.com/
   - Find: `workexperience.sg`
   - Expected status: Should show as "Active" (currently likely "Pending")

2. **Recheck DNS Propagation** (if needed)
   - Visit: https://www.whatsmydns.net/
   - Domain: `workexperience.sg`
   - Record type: `NS`
   - Expected: All locations showing green with Cloudflare nameservers

3. **Confirmation**
   - Should receive confirmation email from Cloudflare once domain is active

## Notes

- DNS propagation typically takes 24-48 hours
- Changes were made before the email was received
- No further action required from registrar side
- Domain is resolving correctly globally
