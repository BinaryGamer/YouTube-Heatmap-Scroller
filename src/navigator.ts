/**
 * @author Liam Smith
 * @version 0.0.1
 */

interface HeatmapEntry {
    position: number;
    height: number;
}

interface VideoPlayer extends Element {
    currentTime: number;
    duration: number;
}


/*
/**
 * A function to print out the local maxes and the video max of the data.
 * @param entries An array of HeatmapEntries
 * @returns a boolean, true if data was printed, false otherwise.
 *
function printMaxes(entries: Array<HeatmapEntry>): boolean {
    if (entries.length === 0) {
        return false
    }
    var maxEntry: HeatmapEntry = entries[0];
    var timeLength = getVideoLength();
    for (let i = 1; i < (entries.length - 1); i++) {
        let curr = entries[i];
        let prev = entries[i-1];
        let next = entries[i+1];
        if (curr.height > prev.height && curr.height > next.height) {
            let percent = curr.position / 1000;
            let occurTime = percent*timeLength;
            let mins = Math.floor(occurTime/60);
            let seconds = Math.floor(occurTime - (60*mins))
            console.log("local max at", mins, ":", seconds);
            //console.log(prev, curr, next);
            if (curr.height > maxEntry.height) {
                maxEntry = curr 
            }
        }
    }
    
    let percent = maxEntry.position/1000;
    let occurTime = percent*timeLength;
    let mins = Math.floor(occurTime/60);
    let seconds = Math.floor(occurTime - (60*mins))
    console.log("video max at", mins, ":", seconds);
    //console.log(maxEntry);

    return true;
}

function seekVideo(time: number): void {
    const player = document.getElementsByClassName('video-stream')[0];
    if ('currentTime' in player === false) {
        return;
    }
    const vidPlayer: VideoPlayer = (player as VideoPlayer);
    vidPlayer.currentTime = time;
}
*/

/*
<svg width="100%" viewBox="0 0 36 36" version="1.1" height="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-42"></use><path class="ytp-svg-fill" d="M 17,10 19,10 26,17 26,18 19,25 17,25 17,24 22,19 11,19 10,18 10,17 11,16 22,16 17,11 z" id="ytp-id-696969"></path></svg>*/


/**
 * A function to handle gathering, parsing and printing the data.
 */
function addElements(): void {

    /**
     * A function to grab the heat map data from a webpage and export it as a string.
     * Returns null if no heatmap data exists.
     * @returns string | null
     */
    function getHeatmapData(): string | null {
        const elements = document.getElementsByClassName("ytp-heat-map-path");
        if (elements.length == 0) {
            return null;
        }
        if (elements.length !== 1) {
            console.log("Haven't implemented Chapters yet.");
        }
        let output = elements[0].getAttribute('d');
        if (typeof(output) === "object") {
            return output;
        }
        return output.slice(2);
    };

    /**
     * A function to take the raw heatmap data and parse it into a more usable form.
     * @param data String containing the raw heatmap data extracted from the website.
     * @returns an array of HeatmapEntries
     */
    function parseHeatmapData(data: string): Array<HeatmapEntry> {
        const vals: Array<string> = data.split(" C ");
        const output: Array<HeatmapEntry> = [];

        vals.forEach((entries) => {
            let entryArray = entries.split(" ");
            let dataPair: string = "";
            if (entryArray.length === 1) {
                dataPair = entryArray[0]
            } else {
                dataPair = entryArray[1];
            };
            let entry = dataPairToEntry(dataPair);
            output.push(entry);
        });

        return output;
    };

    /**
     * A function to take a dataPair string and turn it into a HeatmapEntry
     * @param dataPair a comma seperated pair of position and inverted height.
     * @returns HeatmapEntry containing the same data in dataPair
     */
    function dataPairToEntry(dataPair: string): HeatmapEntry {
        let data = dataPair.split(',');
        let height = 100 - Math.floor(+data[1]);
        const output: HeatmapEntry = {
            position: +data[0],
            height: height
        };
        return output;
    };

    /**
     * a function that returns the length of the video in seconds
     * @returns length of video in seconds
     */
    function getVideoLength(): number {
        const player = document.getElementsByClassName('video-stream')[0];
        if ('duration' in player === false) {
            return 0;
        }
        const vidPlayer: VideoPlayer = (player as VideoPlayer);
        return vidPlayer.duration;
    }

    function getCurrentTime(): number | null {
        const player = document.getElementsByClassName('video-stream')[0];
        if ('play' in player === false) {
            return null;
        }
        const vidPlayer: VideoPlayer = (player as VideoPlayer);
        return vidPlayer.currentTime;
    }

    function positionToSeconds(position: number) {
        const player = document.getElementsByClassName('video-stream')[0];
        if ('duration' in player === false) {
            return 0;
        }
        const vidPlayer: VideoPlayer = (player as VideoPlayer);
        let length =  vidPlayer.duration;
        let percent = position / 1000;
        let occurTime = percent*length;
        return occurTime;
    }

    let rawData: string | null = null;
    //printMaxes(data);
    //console.log("nocie");
    const skipLeft = document.createElement("button");
    const skipMax = document.createElement("button");
    const skipRight = document.createElement("button");
    skipRight.classList.add("ytp-button");
    skipRight.title = "Next local maximum";
    skipRight.role = "button";
    skipLeft.classList.add("ytp-button");
    skipLeft.title = "Previous local maximum";
    skipLeft.role = "button";
    skipMax.classList.add("ytp-button");
    skipMax.title = "Go to most replayed part";
    skipMax.role = "button";

    let rightArrowSVG = '<svg width="100%" viewBox="0 0 36 36" version="1.1" height="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-5486314"></use><path class="ytp-svg-fill" d="M 17,10 19,10 26,17 26,18 19,25 17,25 17,24 22,19 11,19 10,18 10,17 11,16 22,16 17,11 z" id="ytp-id-5486314"></path></svg>'
    let fMaxSVG = '<svg width="100%" viewBox="0 0 36 36" version="1.1" height="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-5486315"></use><path class="ytp-svg-fill" d="M 11,24 12,23 13,22 13,21 14,20 14,17 15,16 15,14 16,13 16,12 17,11 19,11 20,12 20,13 21,14 21,15 22,16 22,20 23,21 23,22 24,23 25,24 z" id="ytp-id-5486315"></path></svg>'
    let leftArrowSVG = '<svg width="100%" viewBox="0 0 36 36" version="1.1" height="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-5486316"></use><path class="ytp-svg-fill" d="M 19,10 17,10 10,17 10,18 17,25 19,25 19,24 14,19 25,19 26,18 26,17 25,16 14,16 19,11 z" id="ytp-id-5486316"></path></svg>'
    
    const fmax = document.createElement('svg');
    fmax.innerHTML = fMaxSVG.trim();
    const fmaxChildNode = fmax.firstChild;
    if (fmaxChildNode instanceof Node) {
        skipMax.appendChild(fmaxChildNode);
    }

    const leftArrow = document.createElement('svg');
    leftArrow.innerHTML = leftArrowSVG.trim();
    const leftArrowChildNode = leftArrow.firstChild;
    if (leftArrowChildNode instanceof Node) {
        skipLeft.appendChild(leftArrowChildNode);
    }

    const rightArrow = document.createElement('svg');
    rightArrow.innerHTML = rightArrowSVG.trim();
    const rightArrowChildNode = rightArrow.firstChild;
    if (rightArrowChildNode instanceof Node) {
        skipRight.appendChild(rightArrowChildNode);
    }

    const controls = document.getElementsByClassName("ytp-left-controls")[0];
    skipRight.onclick = function () {
        const check = getHeatmapData();
        if (check !== rawData) {
            rawData = check;
        }
        if (typeof rawData === "object") {
            return;
        }
        let data = parseHeatmapData(rawData);
        //console.log("clicked");
        let currentTime = getCurrentTime();
        //console.log(rawData);
        //console.log(currentTime);
        if (typeof(rawData) === 'string' && typeof(currentTime) === "number") {
            //console.log("1");
            
            for (let i = 1; i < (data.length - 1); i++) {
                let curr = data[i];
                let prev = data[i-1];
                let next = data[i+1];
                if (curr.height > prev.height && curr.height > next.height) {
                    //console.log("2");
                    
                    const player = document.getElementsByClassName('video-stream')[0];
                    if ('duration' in player === false) {
                        return 0;
                    }
                    const vidPlayer: VideoPlayer = (player as VideoPlayer);
                    let length =  vidPlayer.duration;
                    let percent = curr.position / 1000;
                    let posTime = percent*length;
                    if (posTime > currentTime) {
                        //console.log("3");
                        vidPlayer.currentTime = posTime;
                        break;
                    }
                }
            }
        }
    }
    skipLeft.onclick = function () {
        const check = getHeatmapData();
        if (check !== rawData) {
            rawData = check;
        }
        if (typeof rawData === "object") {
            return;
        }
        let data = parseHeatmapData(rawData);
        //console.log("clicked");
        let currentTime = getCurrentTime();
        if (typeof(rawData) === 'string' && typeof(currentTime) === "number") {
            let lastMax = 0;
            for (let i = 1; i < (data.length - 1); i++) {
                let curr = data[i];
                let prev = data[i-1];
                let next = data[i+1];
                if (curr.height > prev.height && curr.height > next.height) {
                    //console.log("2");
                    
                    const player = document.getElementsByClassName('video-stream')[0];
                    if ('duration' in player === false) {
                        return 0;
                    }
                    const vidPlayer: VideoPlayer = (player as VideoPlayer);
                    let length =  vidPlayer.duration;
                    let percent = curr.position / 1000;
                    let posTime = percent*length;
                    if (posTime >= currentTime - 1) {
                        //console.log("3");
                        vidPlayer.currentTime = lastMax;
                        break;
                    } else {
                        lastMax = posTime;
                    }
                }
            }
        }
    }

    skipMax.onclick = function () {
        let maxPos = 0;
        let maxHeight = 0;
        const check = getHeatmapData();
        if (check !== rawData) {
            rawData = check;
        }
        if (typeof rawData === "object") {
            return;
        }
        let data = parseHeatmapData(rawData);
        //console.log("clicked");
        let currentTime = getCurrentTime();
        if (typeof(rawData) === 'string' && typeof(currentTime) === "number") {
            for (let i = 1; i < (data.length - 1); i++) {
                let curr = data[i];
                let prev = data[i-1];
                let next = data[i+1];
                if (curr.height > prev.height && curr.height > next.height) {
                    //console.log("2");
                    
                    const player = document.getElementsByClassName('video-stream')[0];
                    if ('duration' in player === false) {
                        return 0;
                    }
                    const vidPlayer: VideoPlayer = (player as VideoPlayer);
                    let length =  vidPlayer.duration;
                    let percent = curr.position / 1000;
                    let posTime = percent*length;
                    //console.log(curr.height, posTime, maxHeight, maxPos);
                    if (curr.height > maxHeight) {
                        maxPos = posTime;
                        maxHeight = curr.height;
                    }
                }
            }
        }
        const player = document.getElementsByClassName('video-stream')[0];
        if ('duration' in player === false) {
            return 0;
        }
        const vidPlayer: VideoPlayer = (player as VideoPlayer);

        vidPlayer.currentTime = maxPos;
    }

    controls.appendChild(skipLeft);
    controls.appendChild(skipMax);
    controls.appendChild(skipRight);
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id ? tab.id : -1},
        func: addElements
    }).then();
})