document.addEventListener("DOMContentLoaded", () => {
	const textarea = document.getElementById("message");
	const counter = document.getElementById("count");
	const clearButton = document.querySelector("[data-clear-message]");

	if (!textarea || !counter) {
		return;
	}

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
});
