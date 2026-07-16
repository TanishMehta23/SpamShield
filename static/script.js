document.addEventListener("DOMContentLoaded", () => {
	const pageShell = document.querySelector(".page-shell");
	const textarea = document.getElementById("message");
	const counter = document.getElementById("count");
	const clearButton = document.querySelector("[data-clear-message]");
	const resultSection = document.getElementById("prediction-result");

	if (textarea && counter) {
		const updateCounter = () => {
			counter.textContent = textarea.value.length.toString();
		};

		textarea.addEventListener("input", updateCounter);

		if (clearButton) {
			clearButton.addEventListener("click", () => {
				textarea.value = "";
				updateCounter();
				textarea.focus();
			});
		}

		updateCounter();
	}

	if (resultSection && window.matchMedia("(max-width: 980px)").matches) {
		const scrollToResult = (smooth) => {
			const rect = resultSection.getBoundingClientRect();
			const targetTop = window.scrollY + rect.top - 16;
			window.scrollTo({
				top: targetTop,
				behavior: smooth ? "smooth" : "auto",
			});
		};

		let attempts = 0;
		const maxAttempts = 5;

		const runScrollPass = () => {
			attempts += 1;
			scrollToResult(attempts === 1);

			const rect = resultSection.getBoundingClientRect();
			const closeToTop = rect.top >= 0 && rect.top <= 80;

			if (!closeToTop && attempts < maxAttempts) {
				setTimeout(runScrollPass, 140);
			}
		};

		requestAnimationFrame(() => {
			setTimeout(runScrollPass, 60);
		});
	}
});
