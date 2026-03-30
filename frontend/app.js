async function generate() {
  const prompt = document.getElementById("prompt").value;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
    {
      method: "POST",
      headers: {
        "Authorization": "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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    }
  );

  const blob = await response.blob();
  const imgUrl = URL.createObjectURL(blob);

  document.getElementById("result").src = imgUrl;
}
