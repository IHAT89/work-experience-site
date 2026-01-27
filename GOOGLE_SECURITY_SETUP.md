# Google Cloud Security Setup for work-experience-site

## Forget Cloudflare - Here's the Google Way

After 3 failed attempts with Cloudflare's confusing free tier and domain deletion issues, this guide sets up proper enterprise-grade security using Google Cloud Platform.

## Architecture Overview

```
User Request
    ↓
Google Cloud Load Balancer (HTTPS)
    ↓
Google Cloud Armor (DDoS Protection, WAF)
    ↓
Google Cloud CDN (Performance)
    ↓
Vercel (Your Next.js App)
```

## What You Get

- ✅ **DDoS Protection**: Google Cloud Armor
- ✅ **Web Application Firewall (WAF)**: Built-in security rules
- ✅ **HTTPS/SSL**: Google-managed certificates
- ✅ **CDN**: Global edge caching
- ✅ **Rate Limiting**: Built-in protection
- ✅ **Bot Protection**: Without Cloudflare's nonsense
- ✅ **No Domain Deletion Drama**: Your domain stays with your registrar

## Prerequisites

1. Google Cloud account (they have $300 free credit for new users)
2. Domain: `workexperience.sg` registered at Dreamscape Networks
3. Vercel deployment already working

## Cost Estimate

- Load Balancer: ~$18/month
- Cloud Armor: ~$5-10/month
- CDN: Pay per GB (first TB is ~$0.08/GB)
- **Total**: ~$25-35/month for professional setup

Compare this to Cloudflare Pro at $20/month with their domain deletion nonsense.

---

## Step 1: Install Google Cloud CLI

On your Ubuntu machine:

```bash
# Install gcloud CLI
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Login
gcloud auth login

# Create or set project
gcloud projects create work-experience-sg --name="Work Experience Site"
gcloud config set project work-experience-sg

# Enable required APIs
gcloud services enable compute.googleapis.com
gcloud services enable cloudarmor.googleapis.com
gcloud services enable certificatemanager.googleapis.com
```

---

## Step 2: Create Backend Service (Points to Vercel)

Your Vercel deployment is at something like `work-experience-site-xyz.vercel.app`. We'll create a backend that points to it.

```bash
# Create a Network Endpoint Group (NEG) for your Vercel deployment
gcloud compute network-endpoint-groups create vercel-neg \
    --network-endpoint-type=internet-fqdn-port \
    --global

# Add your Vercel URL as the endpoint
gcloud compute network-endpoint-groups update vercel-neg \
    --global \
    --add-endpoint="fqdn=YOUR-VERCEL-SUBDOMAIN.vercel.app,port=443"

# Create backend service
gcloud compute backend-services create work-experience-backend \
    --global \
    --protocol=HTTPS \
    --port-name=https \
    --enable-cdn

# Add the NEG to the backend service
gcloud compute backend-services add-backend work-experience-backend \
    --global \
    --network-endpoint-group=vercel-neg \
    --network-endpoint-group-region=global \
    --balancing-mode=RATE \
    --max-rate-per-endpoint=100
```

---

## Step 3: Set Up Google Cloud Armor (Security)

This is where the magic happens - enterprise DDoS protection and WAF.

```bash
# Create Cloud Armor security policy
gcloud compute security-policies create work-experience-security \
    --description "Security policy for workexperience.sg"

# Add rate limiting rule (prevents spam and DDoS)
gcloud compute security-policies rules create 1000 \
    --security-policy work-experience-security \
    --expression "true" \
    --action "rate-based-ban" \
    --rate-limit-threshold-count 100 \
    --rate-limit-threshold-interval-sec 60 \
    --ban-duration-sec 600 \
    --conform-action allow \
    --exceed-action deny-403

# Block known bad bots
gcloud compute security-policies rules create 2000 \
    --security-policy work-experience-security \
    --expression "has(request.headers['user-agent']) && request.headers['user-agent'].contains('BadBot')" \
    --action deny-403

# Add geographic restrictions (optional - allow only specific countries)
# Example: Only allow Singapore, Malaysia, Indonesia
gcloud compute security-policies rules create 3000 \
    --security-policy work-experience-security \
    --expression "origin.region_code == 'SG' || origin.region_code == 'MY' || origin.region_code == 'ID'" \
    --action allow \
    --description "Allow Southeast Asia traffic"

# Attach security policy to backend service
gcloud compute backend-services update work-experience-backend \
    --security-policy work-experience-security \
    --global
```

---

## Step 4: Create Load Balancer with HTTPS

```bash
# Create URL map
gcloud compute url-maps create work-experience-lb \
    --default-service work-experience-backend

# Reserve a static IP address
gcloud compute addresses create work-experience-ip \
    --global \
    --ip-version IPV4

# Get the IP address (you'll need this for DNS)
gcloud compute addresses describe work-experience-ip --global --format="value(address)"

# Create SSL certificate (Google-managed)
gcloud compute ssl-certificates create work-experience-cert \
    --domains=workexperience.sg,www.workexperience.sg \
    --global

# Create HTTPS proxy
gcloud compute target-https-proxies create work-experience-https-proxy \
    --url-map=work-experience-lb \
    --ssl-certificates=work-experience-cert \
    --global

# Create forwarding rule (this is your entry point)
gcloud compute forwarding-rules create work-experience-https-rule \
    --global \
    --target-https-proxy=work-experience-https-proxy \
    --address=work-experience-ip \
    --ports=443

# Create HTTP to HTTPS redirect
gcloud compute url-maps import work-experience-lb \
    --global \
    --source /dev/stdin <<EOF
name: work-experience-lb
defaultService: https://www.googleapis.com/compute/v1/projects/work-experience-sg/global/backendServices/work-experience-backend
hostRules:
- hosts:
  - '*'
  pathMatcher: path-matcher-1
pathMatchers:
- name: path-matcher-1
  defaultService: https://www.googleapis.com/compute/v1/projects/work-experience-sg/global/backendServices/work-experience-backend
EOF

# Create HTTP forwarding rule for redirect
gcloud compute target-http-proxies create work-experience-http-proxy \
    --url-map=work-experience-lb \
    --global

gcloud compute forwarding-rules create work-experience-http-rule \
    --global \
    --target-http-proxy=work-experience-http-proxy \
    --address=work-experience-ip \
    --ports=80
```

---

## Step 5: Update DNS at Your Registrar (NOT Cloudflare)

**Important**: Keep your nameservers with your registrar (Dreamscape Networks). Don't change them to anyone else.

### At Dreamscape Networks DNS Management:

1. **Remove Cloudflare nameservers** (if still there):
   - Remove: `carl.ns.cloudflare.com`
   - Remove: `hattie.ns.cloudflare.com`

2. **Set back to registrar nameservers** (check with Dreamscape what they are)

3. **Add A records pointing to Google Cloud IP**:

   ```
   Type: A
   Name: @ (root domain)
   Value: [YOUR_GOOGLE_CLOUD_IP_FROM_STEP_4]
   TTL: 300

   Type: A
   Name: www
   Value: [YOUR_GOOGLE_CLOUD_IP_FROM_STEP_4]
   TTL: 300
   ```

4. **Keep your existing email records** (don't touch these):
   ```
   A record: mail.workexperience.sg → 103.11.189.189
   MX record: workexperience.sg → mail.workexperience.sg
   ```

---

## Step 6: Configure Vercel

In your Vercel project settings:

1. **Add Custom Domain**: `workexperience.sg`
2. **Vercel will show verification instructions** - IGNORE THEM
3. **Add another domain**: `www.workexperience.sg` - IGNORE THEIR DNS instructions too

The traffic flow will be:

```
User → Google Cloud IP → Google Security → Google CDN → Vercel
```

---

## Step 7: Update Environment Variables

Since we're bypassing Cloudflare, remove Turnstile and use Google reCAPTCHA instead:

### On Vercel:

1. Go to your project → Settings → Environment Variables
2. **Remove**:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - `TURNSTILE_SECRET_KEY`

3. **Add** (get from [Google reCAPTCHA](https://www.google.com/recaptcha/admin)):
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_google_recaptcha_site_key
   RECAPTCHA_SECRET_KEY=your_google_recaptcha_secret_key
   ```

### Update `.env.local`:

```env
# EmailJS (keep these)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Google reCAPTCHA (replace Cloudflare Turnstile)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_google_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_google_recaptcha_secret_key
```

---

## Step 8: Update Code (Replace Turnstile with reCAPTCHA)

We'll need to update the contact form to use Google reCAPTCHA v3 instead of Cloudflare Turnstile.

I'll create a separate guide for this code update.

---

## Verification Steps

After DNS propagates (24-48 hours):

1. **Check HTTPS is working**:

   ```bash
   curl -I https://workexperience.sg
   ```

2. **Verify security headers**:

   ```bash
   curl -I https://workexperience.sg | grep -i "x-cloud-trace"
   ```

3. **Test rate limiting**:

   ```bash
   # This should block you after 100 requests in 60 seconds
   for i in {1..150}; do curl -s https://workexperience.sg > /dev/null; done
   ```

4. **Check Cloud Armor in Console**:
   - Go to: https://console.cloud.google.com/net-security/securitypolicies/details/work-experience-security
   - You should see traffic and blocked requests

---

## Monitoring & Maintenance

### View Logs:

```bash
# View load balancer logs
gcloud logging read "resource.type=http_load_balancer" --limit 50

# View Cloud Armor blocks
gcloud logging read "resource.type=http_load_balancer AND jsonPayload.enforcedSecurityPolicy.name='work-experience-security'" --limit 50
```

### Check Performance:

```bash
# Test from different locations
curl -w "@curl-format.txt" -o /dev/null -s https://workexperience.sg
```

Create `curl-format.txt`:

```
    time_namelookup:  %{time_namelookup}s\n
       time_connect:  %{time_connect}s\n
    time_appconnect:  %{time_appconnect}s\n
   time_pretransfer:  %{time_pretransfer}s\n
      time_redirect:  %{time_redirect}s\n
 time_starttransfer:  %{time_starttransfer}s\n
                    ----------\n
         time_total:  %{time_total}s\n
```

---

## Benefits Over Cloudflare

| Feature            | Cloudflare Free          | Cloudflare Pro ($20/mo) | Google Cloud (~$30/mo) |
| ------------------ | ------------------------ | ----------------------- | ---------------------- |
| DDoS Protection    | Basic                    | Better                  | Enterprise-grade       |
| Domain Deletion    | YES (as you experienced) | Less likely             | NEVER                  |
| Nameserver Control | Must use theirs          | Must use theirs         | Keep your own          |
| Rate Limiting      | Limited                  | Basic                   | Advanced               |
| WAF Rules          | Basic                    | Basic                   | Full custom rules      |
| Support            | Email only               | Email                   | Phone + Email          |
| Uptime SLA         | None                     | 99.9%                   | 99.95%                 |
| No BS              | ❌                       | ❌                      | ✅                     |

---

## Troubleshooting

### SSL Certificate Not Provisioning

```bash
# Check status
gcloud compute ssl-certificates describe work-experience-cert --global

# If stuck, domain validation might be failing
# Make sure DNS points to the Google Cloud IP first
```

### Backend Unhealthy

```bash
# Check backend health
gcloud compute backend-services get-health work-experience-backend --global

# Your Vercel deployment must be accessible
# Test directly: curl https://your-vercel-url.vercel.app
```

### Still Getting Cloudflare Emails

1. Login to Cloudflare
2. Delete the domain completely from the account
3. They can't delete what's not there anymore

---

## Emergency Rollback

If something goes wrong:

```bash
# Just update DNS back to point directly to Vercel
A record: workexperience.sg → 76.76.21.21 (Vercel's IP)
CNAME record: www.workexperience.sg → your-vercel-url.vercel.app
```

Your site will work immediately while you troubleshoot Google Cloud setup.

---

## Next Steps

1. ✅ Complete Steps 1-5 above to set up Google Cloud infrastructure
2. ✅ Update DNS (Step 5)
3. ✅ Wait for SSL certificate to provision (2-4 hours)
4. ✅ Update code to use reCAPTCHA instead of Turnstile
5. ✅ Test everything
6. ✅ Delete Cloudflare account and never look back

---

## Support

- **Google Cloud Console**: https://console.cloud.google.com
- **Documentation**: https://cloud.google.com/load-balancing/docs
- **Status**: https://status.cloud.google.com

No more surprise domain deletions. No more confusing "free tier" limitations. Just professional infrastructure that works.
