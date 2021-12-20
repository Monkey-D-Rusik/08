setInterval(() => {
	localStorage.setItem("saveForm1", document.querySelector("#form-name").value);
	localStorage.setItem("saveForm2", document.querySelector("#form-mail").value);
	localStorage.setItem("saveForm3", document.querySelector("#form-text").value);
}, 500);


updatestate = function () {
};


window.addEventListener('hashchange', updatestate);
window.addEventListener('load', updatestate);

// открыть по кнопке
$('.js-button-campaign').click(function () {
	$('.js-overlay-campaign').fadeIn();
	$('.js-overlay-campaign').addClass('disabled');
	history.pushState({ page: 2 }, null, "FormRevier");
	document.querySelector("#form-name").value = localStorage.getItem("saveForm1");
	document.querySelector("#form-mail").value = localStorage.getItem("saveForm2");
	document.querySelector("#form-text").value = localStorage.getItem("saveForm3");
});
// закрыть на крестик
$('.js-close-campaign').click(function () {
	hidePopup();
});

$(window).on("popstate", function () {
	hidePopup();
});

// закрыть по клику вне окна
$(document).mouseup(function (e) {
	var popup = $('.js-popup-campaign');
	if (e.target != popup[0] && popup.has(e.target).length === 0) {
		hidePopup();
	}
});

$('.btn-sub').click(function () {
	localStorage.clear();
});

function hidePopup() {
	$('.js-overlay-campaign').fadeOut();
	history.pushState({ page: 1 }, null, "./")
}

history.replaceState({ page: null }, "Default state", "./");