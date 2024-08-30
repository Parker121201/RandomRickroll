chrome.storage.sync.get(
    {extensionEnabled: true, rickRollCount: 1},
    (items) => {
        var enabled = items.extensionEnabled;
        var replaceCount = items.rickRollCount;

        if (enabled) {
            var images = Array.from(document.getElementsByTagName("img"));
            console.log("Images: ", images);

            while (images.length != 0 && replaceCount != 0) {
                const index = Math.floor(Math.random() * (images.length));
                images[index].src=chrome.runtime.getURL("images/rickRollGif.gif")
                images.splice(index, 1);
                replaceCount--;
                console.log("replaceCount: ", replaceCount);
            }
        }
    }
);