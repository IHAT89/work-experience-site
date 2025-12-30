# Ubuntu Setup & Vercel Deployment Guide

This guide will walk you through setting up your development environment on Ubuntu and deploying your Next.js application to Vercel.

## Part 1: Setting Up Your Ubuntu Development Environment

These commands will prepare your new Ubuntu machine for development.

### 1. Install Node.js and npm

We'll use `nvm` (Node Version Manager) as it's the most flexible way to manage Node.js versions.

```bash
# Install curl if you don't have it
sudo apt update
sudo apt install curl -y

# Download and install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# IMPORTANT: Close and reopen your terminal now for nvm to be available.

# Install the latest Long-Term Support (LTS) version of Node.js
nvm install --lts
```

### 2. Install Git

```bash
sudo apt install git -y
```

### 3. Clone Your Project

```bash
git clone https://github.com/IHAT89/work-experience-site.git
cd work-experience-site/work-experience-site
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Create Environment File

This step is crucial for running the app locally.

1.  Create the `.env.local` file:

    ```bash
    nano .env.local
    ```

2.  Paste your configuration (use your actual keys). You will need keys for EmailJS and Turnstile.

    ```env
    # For EmailJS client-side sending
    NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

    # For Cloudflare Turnstile
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
    TURNSTILE_SECRET_KEY=your_turnstile_secret_key
    ```

3.  Save and exit `nano`:
    - Press `Ctrl + X`
    - Press `Y`
    - Press `Enter`

### 6. Test Locally

Run the development server to make sure everything works.

```bash
npm run dev
```

Your site should be running at `http://localhost:3001`.

---

## Part 2: Deploying to Vercel

This process connects your GitHub repository to Vercel for automatic deployments.

### 1. Create a Vercel Account

- Go to [vercel.com](https://vercel.com) and sign up using your GitHub account. This is the easiest way to link them.

### 2. Import Your Project

- From your Vercel dashboard, click **"Add New..."** -> **"Project"**.
- Find your `IHAT89/work-experience-site` repository and click **"Import"**.

### 3. Configure the Project

Vercel will automatically detect that it's a Next.js project. You just need to add your environment variables.

- In the "Configure Project" screen, expand the **"Environment Variables"** section.
- Add the **same keys and values** you used in your `.env.local` file.
  - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
  - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
  - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

> **Note:** The `TURNSTILE_SECRET_KEY` and SMTP variables are not currently used by the frontend contact form, so you can skip them if you are only using the EmailJS integration.

### 4. Deploy

- Click the **"Deploy"** button.
- Vercel will build and deploy your site, giving you a live URL.

From now on, every time you `git push` to your `main` branch, Vercel will automatically redeploy the site with the changes.
