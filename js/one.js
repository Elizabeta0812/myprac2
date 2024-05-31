
alert('грид первый и  второй подписаны!')



const easeOutQuart = (t, b, c, d) => {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};



const smoothScrollAnimation = (currentTime, distance, duration, startTime, startPositon) => {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let run = easeOutQuart(timeElapsed, startPositon, distance, duration);
    window.scrollTo(0, run);
    const SmoothScrollAnim = (currentTime) => smoothScrollAnimation(currentTime, distance, duration, startTime, startPositon);
    if (timeElapsed < duration) requestAnimationFrame(SmoothScrollAnim);
};



// ==== Скольжение вверх и вниз ===========================================================================================================================================

let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains("_slide")) {
        target.classList.add("_slide");
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + "ms";
        target.style.height = target.offsetHeight + "px";
        target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty("height");
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
        }, duration);
    }
};
let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains("_slide")) {
        target.classList.add("_slide");
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + "ms";
        target.style.height = height + "px";
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        window.setTimeout(() => {
            target.style.removeProperty("height");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
        }, duration);
    }
};
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
};



const createMatch = (string, regex) => {
    return regex.test(string);
};

const parseBoolean = (value) => {
    if (typeof value === "string") {
        value = value.replace(/^\s+|\s+$/g, "").toLowerCase();
        if (value === "true" || value === "false") return value === "true";
    }
    return;
};

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const moveAttributes = (from, to, deleteFrom = false) => {
    for (let index = 0; index < from.attributes.length; index++) {
        const attr = from.attributes.item(index);
        to.setAttribute(attr.name, attr.value);
    }
};



const smoothScroll = (target, duration) => {
    const topOffset = getComputedStyle(document.querySelector(".header__body")).position == "fixed" || getComputedStyle(document.querySelector(".header__body")).position == "sticky" ? document.querySelector(".header__body").offsetHeight + 10 : 0;

    const targetPosition = target.getBoundingClientRect().top + window.scrollY;

    const startPositon = window.pageYOffset;

    const distance = targetPosition - startPositon - topOffset;

    let startTime = null;

    const SmoothScrollAnim = (currentTime) => smoothScrollAnimation(currentTime, distance, duration, startTime, startPositon);

    requestAnimationFrame(SmoothScrollAnim);
};

const smoothScrollers = document.querySelectorAll("[data-scroll_to]");
if (smoothScrollers.length > 0) {
    smoothScrollers.forEach((smoothScroller) => {
        if (smoothScroller.dataset.scroll_to != "") {
            smoothScroller.addEventListener("click", (e) => {
                e.preventDefault();
                const target = document.querySelector(smoothScroller.dataset.scroll_to);
                smoothScroll(target, 1000);
            });
        } else {
            console.log("You must type selector in data-scroll_to");
        }
    });
};


const scrollDisabling = (element, fixed = false, position) => {
    if (!element.classList.contains("_scroll-disabled") && !element.classList.contains("_scroll-disabled_horizontal") && !element.classList.contains("_scroll-disabled_vertical")) {
        if (fixed) {
            if (element == document.body) {
                let paddingOffset = innerWidth - document.body.offsetWidth + "px";
                document.body.style.paddingRight = paddingOffset;
                if (scrollFixedElements.length > 0) {
                    for (let index = 0; index < scrollFixedElements.length; index++) {
                        const el = scrollFixedElements[index];
                        el.style.paddingRight = paddingOffset;
                    }
                }
            }
        }
        if (position == "vertical") {
            element.classList.add("_scroll-disabled_vertical");
        } else if (position == "horizontal") {
            element.classList.add("_scroll-disabled_horizontal");
        } else {
            element.classList.add("_scroll-disabled");
        }
    }
};

const scrollEnabling = (element, fixed = false, position) => {
    if (element.classList.contains("_scroll-disabled") || element.classList.contains("_scroll-disabled_horizontal") || element.classList.contains("_scroll-disabled_vertical")) {
        if (fixed) {
            if (element == document.body) {
                document.body.style.cssText = "";
            }
            if (scrollFixedElements.length > 0) {
                for (let index = 0; index < scrollFixedElements.length; index++) {
                    const el = scrollFixedElements[index];
                    el.style.cssText = "";
                }
            }
        }
        if (position == "vertical") {
            element.classList.remove("_scroll-disabled_vertical");
        } else if (position == "horizontal") {
            element.classList.remove("_scroll-disabled_horizontal");
        } else {
            element.classList.remove("_scroll-disabled");
        }
    }
};

const toggleScroll = (element, fixed = false, position) => {
    if (element.classList.contains("_scroll-disabled") || element.classList.contains("_scroll-disabled_horizontal") || element.classList.contains("_scroll-disabled_vertical")) scrollEnabling(element, fixed, position);
    else scrollDisabling(element, fixed, position);
};

const scrollDisablers = document.querySelectorAll("[data-scroll_disable]");
if (scrollDisablers.length > 0) {
    for (scrollDisabler of scrollDisablers) {
        positon = scrollDisabler.dataset.scroll_disable;
        scrollDisabling(scrollDisabler, positon);
    }
}

const scrollFixedElements = document.querySelectorAll("[data-scroll-fixed]");;



const validatePhone = (input) => {
    if (input.value.replace(/\D/g, "") === "" || input.value.replace(/\D/g, "").length < 10) {
        return false;
    } else {
        return true;
    }
};

const formAddError = (input) => {

    input.classList.add("_error");
};

const formRemoveError = (input) => {

    input.classList.remove("_error");
};

const formValidate = (form) => {
    let error = 0;
    const formReqiers = form.querySelectorAll("[data-form_require]");
    for (let index = 0; index < formReqiers.length; index++) {
        const input = formReqiers[index];
        formRemoveError(input);
        if (input.dataset.form_input_email != null) {
            if (!createMatch(input.value, /\S+@\S+\.\S+/)) {
                formAddError(input);
                ++error;
            }
        } else if (input.dataset.form_input_tel != null) {
            if (!validatePhone(input)) {
                formAddError(input);
                ++error;
            }
        } else if (input.getAttribute("type") === "checkbox" && !input.checked) {
            formAddError(input);
            ++error;
        } else {
            if (input.value === "") {
                formAddError(input);
                ++error;
            }
        }
    }

    return error;
};
const forms = document.querySelectorAll("[data-form]");
if (forms.length > 0) {
    forms.forEach((form) => {
        async function formSend(e) {
            e.preventDefault();
            let error = formValidate(form);
            if (form.hasAttribute("data-survey")) {
                error = 0;
            }
            if (error === 0) {
                form.classList.add("_sending");
                if (form.dataset.test == null) {


                    // This is a backend part!!! If you do not add an attribute [data-test] or not to make a real emptying of the letter, then will give an error and nothing happens


                    let responce = await fetch(mail.php);

                    if (responce.ok) {
                        let result = responce.json;
                        alert(result.message);
                        form.reset();
                    } else {
                        alert("Something went wrong...");
                    }
                } else {
                    let result = {
                        message: "All OK :Р",
                    };
                    alert(result.message);
                    form.reset();
                }
                form.classList.remove("_sending");
            } else {
                alert("Fill the all fields!");
            }
        }

        form.addEventListener("submit", formSend);
    });
};




const headerElement = document.querySelector('.header');
const detectingScroll = function(entries) {
    console.log(entries)
    if ((document.documentElement.clientWidth > 1340)) {
        if (entries[0].isIntersecting) {
            headerElement.classList.remove('_scroll');
        } else {
            headerElement.classList.add('_scroll');

        }
    } else {
        headerElement.classList.add('_scroll')
    }
};

const headerObserver = new IntersectionObserver(detectingScroll)
headerObserver.observe(headerElement)
