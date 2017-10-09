/* Helpers */

var slice = Array.prototype.slice;

function $(expr, parent) {
    return typeof expr === "string" ? (parent || document).querySelector(expr) : expr || null;
}

function $$(expr, parent) {
    return slice.call((parent || document).querySelectorAll(expr));
}

$.bind = function(element, o) {
    if (element) {
        for (var event in o) {
            var callback = o[event];

            event.split(/\s+/).forEach(function (event) {
                element.addEventListener(event, callback);
            });
        }
    }
};

$.toggleDetails = function (element) {
    if (element.classList.contains('open')) {
        element.classList.remove('open');
    }
    else {
        element.classList.add('open');
    }
}

/* Initialization */

function init() {
    $$('.swagger-method-title').forEach(function (title) {
        $.bind(title, {
            'click': function (e) {
                var details = $('.swagger-method-details', title.parentNode)
                $.toggleDetails(details);
                e.preventDefault();
            }
        });
    });
}


/* DOM already loaded? */
if (document.readyState !== "loading") {
    init();
}
else {
    /* Wait for it */
    document.addEventListener("DOMContentLoaded", init);
}