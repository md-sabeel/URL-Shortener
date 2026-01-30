async function shortenUrl() {
  const longUrl = document.getElementById("longUrl").value.trim();
  const resultBox = document.getElementById("result");
  const shortUrlInput = document.getElementById("shortUrl");

  if (!longUrl) {
    showToast("Please enter a valid URL");
    return;
  }

  try {
    const response = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
    );

    const shortUrl = await response.text();

    if (shortUrl.startsWith("http")) {
      shortUrlInput.value = shortUrl;
      resultBox.classList.remove("hidden");
      showToast("URL shortened successfully ✅");
    } else {
      showToast("Failed to shorten URL ❌");
    }
  } catch (error) {
    showToast("Network error ❌");
  }
}

function copyUrl() {
  const shortUrl = document.getElementById("shortUrl");
  navigator.clipboard.writeText(shortUrl.value);
  showToast("Copied to clipboard 📋");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
  }, 2500);
}
