async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;
    const resultBox = document.getElementById("result");
    const shortUrlInput = document.getElementById("shortUrl");

    if (!longUrl) {
        showToast("Please enter a URL");
        return;
    }

    try {
        const res = await fetch(
            `https://api.shrtco.de/v2/shorten?url=${longUrl}`
        );
        const data = await res.json();

        if (data.ok) {
            shortUrlInput.value = data.result.full_short_link;
            resultBox.style.display = "flex";
            showToast("URL shortened successfully!");
        } else {
            showToast("Invalid URL");
        }
    } catch (err) {
        showToast("Something went wrong");
    }
}

function copyUrl() {
    const shortUrl = document.getElementById("shortUrl");
    shortUrl.select();
    navigator.clipboard.writeText(shortUrl.value);
    showToast("Copied to clipboard!");
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
    }, 2500);
}
