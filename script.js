async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value.trim();
    const resultBox = document.getElementById("result");
    const shortUrlInput = document.getElementById("shortUrl");

    if (!longUrl) {
        showToast("Please enter a valid URL");
        return;
    }

    try {
        const response = await fetch("https://cleanuri.com/api/v1/shorten", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ url: longUrl })
        });

        const data = await response.json();

        if (data.result_url) {
            shortUrlInput.value = data.result_url;
            resultBox.classList.remove("hidden");
            showToast("URL shortened successfully ✅");
        } else {
            showToast("Invalid URL ❌");
        }
    } catch {
        showToast("Something went wrong ❌");
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
