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

	if (resultSection && pageShell && window.matchMedia("(max-width: 980px)").matches) {
		const docScroller = document.scrollingElement || document.documentElement;

		const getActiveScroller = () => {
			if (pageShell.scrollHeight > pageShell.clientHeight + 2) {
				return pageShell;
			}

			return docScroller;
		};

		const scrollToResult = (smooth) => {
			const scroller = getActiveScroller();
			const isDocumentScroller = scroller === docScroller;
			const scrollerTop = isDocumentScroller ? 0 : scroller.getBoundingClientRect().top;
			const currentTop = isDocumentScroller ? window.scrollY : scroller.scrollTop;
			const resultTop = resultSection.getBoundingClientRect().top;
			const targetTop = Math.max(0, resultTop - scrollerTop + currentTop - 8);

			if (isDocumentScroller) {
				window.scrollTo({
					top: targetTop,
					behavior: smooth ? "smooth" : "auto",
				});
				return;
			}

			scroller.scrollTo({
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
