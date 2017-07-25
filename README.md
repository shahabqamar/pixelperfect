# PixelPerfect
A chrome extension for obsessive compulsive developers who like their web designs pixel perfect.

![alt text](https://blog.hubspot.com/hs-fs/hub/53/file-282852170-png/Blog-Related_Images/officespace-meme.png "QA guy in a nutshell")

## About PixelPerfect
I have been working on a Chrome extension, which I hope will make our lives a bit easier when it comes to "PSD to HTML" conversion. The extension (tentatively called PixelPerfect) allows you to overlay/onion-skin the static design on a web page, therefore, you are not solely relying on the good’ol eye-squinting technique or going back and forth between the static design and Zeplin measurements. I fished around for an extension that ticked all the boxes but could not find one so developed my own instead. Some cool features implemented here:
*	Gulp/grunt/webpack friendly (extension auto restores overlay settings on refresh, even if you close and relaunch the browser window)
*	Overlay switching using media queries (add as many screens as you like for mobile, tablet, desktop and in between)
*	Ability to add multiple filters on each overlay (opacity, grayscale, blur, etc)
*	Non-invasive overlay (so you can still interact with the content e.g. inspect element or hover)
*	Sync overlay settings across computers (if you are logged into Chrome)
*	Ability to import/export overlay settings (so you can easily switch between different cutups)

Just need to add some fancy-pants input validation before I go ahead and submit it to the Chrome store. Feedback and feature requests are welcome.

## Installation instructions
1. Clone the repo locally
2. Goto Chrome extensions manager (or type **chrome://extensions/** in the address bar)
3. Tick **Developer mode**
4. Click on **Load unpacked extension...** and select the location of the repo.
5. Enjoy!

## Known limitations
* The extension only supports web pages that are served over http or https. Web pages accessed locally (over a file:/// protocol) are currently not supported. This also holds true for static design URLs over file:///. 
* URL for static design and JSON import validation is flaky. The extension will fail silently if you put in invalid values.  
