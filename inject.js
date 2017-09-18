//nudge background script
chrome.runtime.sendMessage({ taburl: window.location.href });

//listen for response from background script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //if responded with settings, render overlay. If returned false, sit idle.
        if (request.settings) {
            _os_overlay_61445155(request.settings.settings);
        } else {
            //console.log("no action will be taken")
        }
    }
);

function _os_overlay_61445155(settings) {

    //check if os_overlay is already loaded
    var os_overlay = document.getElementById('_os_overlay_61445155');

    console.log(settings);

    //if overlay does not exist
    if (os_overlay === null) {

        //set and append overlay div
        os_overlay = document.createElement("div");
        os_overlay.id = "_os_overlay_61445155";
        document.body.appendChild(os_overlay);

        //prepare images
        os_overlay_img = [];
        os_mq = "";

        for (var i = 0; i < settings.length; i++) {
            //insert image
            os_overlay_img[i] = document.createElement("img");
            os_overlay_img[i].id = "_os_overlay_img_61445155_" + i;
            os_overlay_img[i].className = "_os_overlay_img_61445155";
            os_overlay_img[i].src = settings[i].url;
            os_overlay_img[i].style.cssText = 'left:auto; right: auto; margin-top:' + settings[i].offsetTop + 'px;' + 'margin-left:' + settings[i].offsetLeft + 'px;' + 'width: auto; opacity:' + settings[i].opacity + '; filter: grayscale(' + settings[i].grayscale + '%) ' + 'brightness(' + settings[i].brightness + '%) ' + 'contrast(' + settings[i].contrast + '%) ' + 'blur(' + settings[i].blur + 'px);';
            os_overlay.appendChild(os_overlay_img[i]);

            var min = "";
            var max = "";

            //generate media queries
            if (settings[i].min != "") {
                min = "and (min-width : " + settings[i].min + "px) ";
            }

            if (settings[i].max != "") {
                max = "and (max-width : " + settings[i].max + "px) ";
            }

            os_mq += "@media only screen " + min + max + "{ #" + os_overlay_img[i].id + " { display:inline-block;  } } ";
        }

        //set and append stylesheet + media queries
        os_overlay_css = document.createElement("style");
        os_overlay_css.id = "_os_overlay_css_61445155";
        os_overlay_css.innerHTML = "#_os_overlay_61445155 { position:absolute; z-index: 999999; top:0px; left:0; right:0; text-align:center; pointer-events: none; } ._os_overlay_img_61445155 { display:none;}" + os_mq;
        document.head.appendChild(os_overlay_css);
    }
}