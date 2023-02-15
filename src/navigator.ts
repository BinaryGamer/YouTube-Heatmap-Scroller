/**
 * @author Liam Smith
 * @version 0.0.1
 */

interface HeatmapEntry {
    position: number;
    height: number;
}

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
 * a function that returns the length of the video in seconds
 * @returns length of video in seconds
 */
function getVideoLength(): number {
    const multipliers: number[] = [1, 60, 3600, 86400];
    let rawTime = document.getElementsByClassName("ytp-time-duration")[0].textContent;
    if (typeof rawTime === "object") {
        return 0;
    }
    let time = rawTime.split(":");
    let output = 0;
    for (let i = 1; i <= time.length; i++) {
        var nextVal = time.at(-i);
        if (typeof nextVal === 'undefined') {
            return 0;
        }
        output += +nextVal*multipliers[i-1];
    }
    return output;
}

/**
 * A function to print out the local maxes and the video max of the data.
 * @param entries An array of HeatmapEntries
 * @returns a boolean, true if data was printed, false otherwise.
 */
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

/**
 * A function to handle gathering, parsing and printing the data.
 */
function addElements(): void {
    console.log("nocie");
    const copying = document.getElementsByClassName("ytp-play-button")[0].cloneNode(true);
    const newSkip = document.createElement("button");
    newSkip.classList.add("ytp-button");
    newSkip.title = "Tee Hee";
    newSkip.role = "button";
    const children = copying.childNodes;
    for (let i = 0; i < children.length; i++) {
        newSkip.appendChild(children[i]);
    }
    const controls = document.getElementsByClassName("ytp-left-controls")[0];
    newSkip.onclick = function () {
        let rawData = getHeatmapData();
        if (typeof(rawData) === 'string') {
            let data = parseHeatmapData(rawData);
            printMaxes(data);
        }
    }
    controls.appendChild(newSkip);
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id ? tab.id : -1},
        func: addElements
    }).then();
})