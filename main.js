// INIT
var init_settings = [{
    "img_url": "images/os_overlay_starter.jpg",
    "url": "",
    "opacity": 1,
    "grayscale": 0,
    "brightness": 100,
    "contrast": 100,
    "blur": 0,
    "min": null,
    "max": null
}];

//get stored settings & init UI
chrome.storage.sync.get(["settings"], function(stored_settings) {
    //console.log(stored_settings);
    if (!jQuery.isEmptyObject(stored_settings.settings)) {
        initUI(stored_settings.settings);
    } else {
        initUI(init_settings);
    }
});

//EVENTS

//on update
$("#update").click(function() {

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.storage.sync.set({
            'project_url': tabs[0].url,
            'settings': generateSettings()
        }, function() {
            chrome.notifications.create({
                type: "basic",
                title: "PixelPerfect",
                message: "Settings applied and saved for\n" + tabs[0].url,
                iconUrl: 'icons/icon128.png'
            }, function() {
                chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
                window.close();
            });
        });
    });
});

//on add screen
$('#add-screen').on('click', function() {
    addScreen();
});

//on remove screen
$('#screens-container').on('click', '.remove-screen', function() {
    $(this).closest('.screen-block').slideUp(500, function() {
        $(this).closest('.screen-block').remove();
    });
});

//on image url update

//on static design image update
$('#screens-container').on('change', '.setting-url', function() {
    var image_url;
    if ($(this).val() == "") {
        image_url = "images/os_overlay_starter.jpg";
    } else {
        image_url = $(this).val();
    }
    $(this).closest('.screen-block').find('.image-object').attr('src', image_url);
});

//on opacity update
$('#screens-container').on('input', '.setting-filter', function() {
    $(this).closest('.field-setting').find('code').text($(this).val());
    var image = $(this).closest('.screen-block').find('.image-object');
    var opacity = $(this).closest('.screen-block').find('input[data-setting=opacity]').val();
    var grayscale = $(this).closest('.screen-block').find('input[data-setting=grayscale]').val();
    var brightness = $(this).closest('.screen-block').find('input[data-setting=brightness]').val();
    var contrast = $(this).closest('.screen-block').find('input[data-setting=contrast]').val();
    var blur = $(this).closest('.screen-block').find('input[data-setting=blur]').val();
    image.css('opacity', opacity);
    image.css('filter', 'grayscale(' + grayscale + '%) ' + 'brightness(' + brightness + '%)' + 'contrast(' + contrast + '%)' + 'blur(' + blur + 'px)');
    generateSettings();
});

//on greyscale update
$('#screens-container').on('change', '.setting-greyscale', function() {
    $(this).closest('.screen-block').find('.image-object').css('filter', 'grayscale(' + $(this).val() + ')');
});

//on import
$('#import-settings').on('click', function() {
    // var import_settings = prompt("Paste JSON settings");
    // if (import_settings != null) {
    //     initUI(import_settings);
    // }
    var import_settings = JSON.parse($("#import-settings-value").val());
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.storage.sync.set({
            'project_url': tabs[0].url,
            'settings': import_settings
        }, function() {

            chrome.notifications.create({
                type: "basic",
                title: "PixelPerfect",
                message: "Settings imported and saved for\n" + tabs[0].url,
                iconUrl: 'icons/icon128.png'
            }, function() {
                initUI(import_settings);
                chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
                $('#modal-import .modal-close').trigger('click');
                $("#import-settings-value").val("");
            });
        });
    });
});

//on export
$('#export').on('click', function() {
    $("#exported-settings").val(JSON.stringify(generateSettings()));
});

//METHODS

//generate settings from UI
var generateSettings = function() {
    var screens = $('.screen-block');
    var settings = [];
    $(screens).each(function(index) {
        settings.push({
            "url": $(this).find('input[data-setting=url]').val(),
            "img_url": $(this).find('input[data-setting=url]').val(),
            "opacity": $(this).find('input[data-setting=opacity]').val(),
            "grayscale": $(this).find('input[data-setting=grayscale]').val(),
            "brightness": $(this).find('input[data-setting=brightness]').val(),
            "contrast": $(this).find('input[data-setting=contrast]').val(),
            "blur": $(this).find('input[data-setting=blur]').val(),
            "min": $(this).find('input[data-setting=min]').val(),
            "max": $(this).find('input[data-setting=max]').val()
        });
    });
    return settings;
}

//add screen
var addScreen = function() {
    var screens = { "screens": init_settings };
    var targetContainer = $(".screens"),
        template = $("#screen-template").html();

    var html = Mustache.to_html(template, screens);
    $(targetContainer).append(html);
}

//init UI from saved settings
var initUI = function(settings) {

    var screens = { "screens": [] };

    settings.forEach(function(screen) {
        if (screen.img_url == "images/os_overlay_starter.jpg") {
            screen.url = "";
        }
        if (screen.url == "") {
            screen.img_url = "images/os_overlay_starter.jpg";
        }
        screens.screens.push(screen);
    });

    var targetContainer = $(".screens"),
        template = $("#screen-template").html();

    var html = Mustache.to_html(template, screens);

    $(targetContainer).html(html);

    $(".setting-filter").trigger('input');
}

// Modals
var $html = document.documentElement;
var $modals = getAll('.modal');
var $modalButtons = getAll('.modal-button');
var $modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button');

if ($modalButtons.length > 0) {
    $modalButtons.forEach(function($el) {
        $el.addEventListener('click', function() {
            var target = $el.dataset.target;
            var $target = document.getElementById(target);
            $html.classList.add('is-clipped');
            $target.classList.add('is-active');
        });
    });
}

if ($modalCloses.length > 0) {
    $modalCloses.forEach(function($el) {
        $el.addEventListener('click', function() {
            $html.classList.remove('is-clipped');
            closeModals();
        });
    });
}

document.addEventListener('keydown', function(e) {
    if (e.keyCode === 27) {
        $html.classList.remove('is-clipped');
        closeModals();
    }
});

function closeModals() {
    $modals.forEach(function($el) {
        $el.classList.remove('is-active');
    });
}

//HELPER

//getall
function getAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}

//copy to clipboard
var clipboard = new Clipboard('.btn-clipboard');