const hideLoadingScreen = () => {
	const loadingScreen = document.querySelector(".loading-screen");
	if (loadingScreen) {
		loadingScreen.classList.add("is-hidden");
	}

	document.body.classList.add("is-ready");
	if (window.matchMedia("(max-width: 720px)").matches) {
		document.body.classList.add("is-mobile-ready");
	}
};

document.addEventListener("DOMContentLoaded", () => {
	const textarea = document.getElementById("message");
	const counter = document.getElementById("count");
	const clearButton = document.querySelector("[data-clear-message]");

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

window.addEventListener("load", hideLoadingScreen);
