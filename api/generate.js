export default async function handler(req, res) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
    {
      method: "POST",
      headers: {
        Authorization: "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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: req.body.prompt
      })
    }
  );

  const buffer = await response.arrayBuffer();

  res.setHeader("Content-Type", "image/png");
  res.send(Buffer.from(buffer));
}
