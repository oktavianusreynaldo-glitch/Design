async function generate() {
  const promptInput = document.getElementById("prompt");
  const resultImg = document.getElementById("result");
  const loadingText = document.getElementById("loading");
  const button = document.getElementById("generateBtn");

  const prompt = promptInput.value.trim();

  if (!prompt) {
    alert("Masukkan deskripsi desain dulu");
    return;
  }

  // UI state
  loadingText.innerText = "⏳ Generating... (10-30 detik)";
  button.disabled = true;
  resultImg.src = "";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(errorText);
      alert("Gagal generate:\n" + errorText);
      return;
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    resultImg.src = imageUrl;

  } catch (error) {
    console.error(error);
    alert("Terjadi error koneksi");
  }

  loadingText.innerText = "";
  button.disabled = false;
}
