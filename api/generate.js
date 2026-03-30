export default async function handler(req, res) {
  const token = process.env.HF_TOKEN;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: req.body.prompt
        })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).send(text);
    }

    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(buffer));

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
