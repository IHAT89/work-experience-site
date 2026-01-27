// API endpoint to verify reCAPTCHA token

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      error: "Token is required",
    });
  }

  try {
    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY not configured");
      return res.status(500).json({
        success: false,
        error: "Server configuration error",
      });
    }

    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    // reCAPTCHA v3 returns a score from 0.0 to 1.0
    // 1.0 is very likely a good interaction
    // 0.0 is very likely a bot
    // We'll accept scores >= 0.5

    if (data.success && data.score >= 0.5) {
      return res.status(200).json({
        success: true,
        score: data.score,
      });
    } else {
      return res.status(400).json({
        success: false,
        score: data.score || 0,
        error: "reCAPTCHA verification failed",
      });
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error during verification",
    });
  }
}
