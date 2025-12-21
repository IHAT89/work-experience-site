# Google Cloud Run Deployment Guide

This guide explains how to take the Docker container you built on your Linux machine and deploy it to Google Cloud Run.
This gives you a professional, auto-scaling, secure (HTTPS) hosting environment managed by Google.

## Prerequisites

1.  **Google Cloud Account**: Create an account at [cloud.google.com](https://cloud.google.com).
2.  **New Project**: Create a project (e.g., `work-experience-site`).
3.  **Billing**: Enable billing (required, but there is a generous free tier).
4.  **Enable APIs**: Enable the "Cloud Run API" and "Artifact Registry API".

## Step 1: Install Google Cloud CLI

Run this on your Linux machine to install the Google tools:

```bash
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates gnupg curl

curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg

echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -etc/apt/sources.list.d/google-cloud-sdk.list

sudo apt-get update && sudo apt-get install google-cloud-cli
```

## Step 2: Login & Configure

1.  **Login**:
    ```bash
    gcloud auth login
    ```
2.  **Set Project**:
    ```bash
    gcloud config set project YOUR_PROJECT_ID
    ```
3.  **Configure Docker**:
    This allows your local Docker to push images to Google.
    ```bash
    gcloud auth configure-docker
    ```

## Step 3: Build and Push

Since Next.js needs your API keys during the build, we will build the image on your machine (where you have your `.env.local` file) and then push it to Google.

1.  **Build the Image** (Replace `YOUR_PROJECT_ID`):

    ```bash
    docker build -t gcr.io/YOUR_PROJECT_ID/work-experience-site .
    ```

2.  **Push to Google**:
    ```bash
    docker push gcr.io/YOUR_PROJECT_ID/work-experience-site
    ```

## Step 4: Deploy

Tell Google to run the image you just uploaded.

```bash
gcloud run deploy work-experience-site \
  --image gcr.io/YOUR_PROJECT_ID/work-experience-site \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Step 5: Success!

Google will give you a URL (e.g., `https://work-experience-site-xyz.a.run.app`).
Your site is now live on Google's infrastructure.
