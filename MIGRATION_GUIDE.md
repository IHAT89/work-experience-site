# Migration Guide: Self-Hosting on Linux with Docker

This guide will walk you through deploying your Next.js application to your new Ubuntu/Linux server.

## Prerequisites

On your Linux server, you need to have **Docker** and **Git** installed.
If they are not installed, run these commands:

```bash
# Update package list
sudo apt update

# Install Git
sudo apt install git -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## Step 1: Get the Code

1.  Navigate to the directory where you want to store your projects. For example:

    ```bash
    cd ~/projects
    ```

2.  Clone the repository. This will create a new directory called `work-experience-site`.

    ```bash
    git clone https://github.com/IHAT89/work-experience-site.git
    ```

3.  Navigate into the project directory.
    ```bash
    cd work-experience-site
    ```

## Step 2: Configure Environment Variables (CRITICAL)

Next.js needs your API keys during the **build process**. You must create the `.env.local` file before running Docker.

1. Create the file:

   ```bash
   nano .env.local
   ```

2. Paste your configuration (use your actual keys):

   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_key
   TURNSTILE_SECRET_KEY=your_turnstile_secret
   ```

3. Save and exit:
   - Press `Ctrl + X`
   - Press `Y`
   - Press `Enter`

## Step 3: Start the Application

Run the application using Docker Compose. This will build the image and start the server.

```bash
sudo docker compose up -d --build
```

- `-d`: Runs in "detached" mode (in the background).
- `--build`: Forces Docker to rebuild the image (ensuring it sees your new `.env.local` file).

## Step 4: Verify

Your app should now be running on port **3001**.
Open your browser and visit: `http://<your-server-ip>:3001`

## Maintenance

### How to Update the App

If you make changes to the code and push them to GitHub, follow these steps to update your server:

```bash
# 1. Pull the latest code
git pull

# 2. Rebuild and restart the container
sudo docker compose up -d --build
```

### How to Check Logs

If something isn't working (like the contact form), check the logs:

```bash
sudo docker compose logs -f
```
