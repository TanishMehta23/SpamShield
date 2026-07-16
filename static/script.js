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
});
