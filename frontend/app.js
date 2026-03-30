async function generate() {
  const prompt = document.getElementById("prompt").value;

  const response = await fetch("https://YOUR_BACKEND_URL/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  const blob = await response.blob();
  const imgUrl = URL.createObjectURL(blob);

  document.getElementById("result").src = imgUrl;
}
