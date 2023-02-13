let data = `M 0.0,100.0 C 1.0,84.7 2.0,30.1 5.0,23.3 C 8.0,16.4 11.0,58.4 15.0,65.8 C 19.0,73.2 21.0,59.9 25.0,60.4 C 29.0,60.9 31.0,64.3 35.0,68.3 C 39.0,72.4 41.0,78.0 45.0,80.8 C 49.0,83.7 51.0,82.5 55.0,82.4 C 59.0,82.4 61.0,81.1 65.0,80.6 C 69.0,80.2 71.0,81.2 75.0,80.3 C 79.0,79.4 81.0,77.8 85.0,76.1 C 89.0,74.4 91.0,75.3 95.0,71.9 C 99.0,68.4 101.0,64.1 105.0,58.9 C 109.0,53.7 111.0,50.9 115.0,45.9 C 119.0,40.9 121.0,33.8 125.0,33.8 C 129.0,33.8 131.0,40.7 135.0,45.8 C 139.0,51.0 141.0,58.2 145.0,59.6 C 149.0,60.9 151.0,53.9 155.0,52.7 C 159.0,51.4 161.0,48.7 165.0,53.4 C 169.0,58.2 171.0,70.0 175.0,76.4 C 179.0,82.8 181.0,83.2 185.0,85.5 C 189.0,87.7 191.0,87.3 195.0,87.7 C 199.0,88.0 201.0,87.2 205.0,87.2 C 209.0,87.2 211.0,88.4 215.0,87.7 C 219.0,87.0 221.0,86.3 225.0,83.7 C 229.0,81.2 231.0,77.5 235.0,74.9 C 239.0,72.3 241.0,72.0 245.0,70.7 C 249.0,69.3 251.0,67.9 255.0,68.2 C 259.0,68.4 261.0,70.8 265.0,71.8 C 269.0,72.8 271.0,71.2 275.0,73.2 C 279.0,75.2 281.0,79.5 285.0,81.8 C 289.0,84.1 291.0,83.2 295.0,84.8 C 299.0,86.3 301.0,89.1 305.0,89.5 C 309.0,89.9 311.0,88.6 315.0,86.9 C 319.0,85.3 321.0,84.0 325.0,81.2 C 329.0,78.5 331.0,75.4 335.0,73.0 C 339.0,70.7 341.0,71.7 345.0,69.4 C 349.0,67.0 351.0,63.3 355.0,61.3 C 359.0,59.2 361.0,60.1 365.0,59.0 C 369.0,57.8 371.0,54.4 375.0,55.6 C 379.0,56.8 381.0,64.1 385.0,65.0 C 389.0,65.8 391.0,62.6 395.0,59.7 C 399.0,56.8 401.0,54.4 405.0,50.5 C 409.0,46.7 411.0,47.5 415.0,40.5 C 419.0,33.5 421.0,23.6 425.0,15.5 C 429.0,7.4 431.0,1.5 435.0,0.0 C 439.0,-1.5 441.0,-1.4 445.0,8.1 C 449.0,17.5 451.0,36.2 455.0,47.3 C 459.0,58.4
 461.0,57.3 465.0,63.7 C 469.0,70.2 471.0,77.3 475.0,79.5 C 479.0,81.7 481.0,79.8 485.0,74.7 C 489.0,69.6 491.0,62.6 495.0,54.2 C 499.0,45.8 501.0,34.7 505.0,32.7 C 509.0,30.6 511.0,38.5 515.0,44.0 C 519.0,49.5 521.0,57.0 525.0,60.1 C 529.0,63.2 531.0,58.0 535.0,59.5 C 539.0,61.0 541.0,63.2 545.0,67.4 C 549.0,71.7 551.0,77.6 555.0,80.8 C 559.0,84.1 561.0,82.6 565.0,83.6 C 569.0,84.6 571.0,84.6 575.0,85.9 C 579.0,87.2 581.0,89.9 585.0,90.0 C 589.0,90.1 591.0,87.8 595.0,86.6 C 599.0,85.3 601.0,84.0 605.0,83.7 C 609.0,83.4 611.0,84.5 615.0,84.9 C 619.0,85.2 621.0,86.7 625.0,85.4 C 629.0,84.1 631.0,81.0 635.0,78.5 C 639.0,76.0 641.0,74.3 645.0,72.8 C 649.0,71.4 651.0,70.5 655.0,71.3 C 659.0,72.0 661.0,10.0 665.0,76.3 C 669.0,77.2 671.0,74.7 675.0,75.5 C 679.0,76.4 681.0,79.9 685.0,80.7 C 689.0,81.4 691.0,80.5 695.0,79.4 C 699.0,78.3 701.0,77.4 705.0,75.3 C 709.0,73.2 711.0,70.6 715.0,68.8 C 719.0,67.1 721.0,67.4 725.0,66.5 C 729.0,65.6 731.0,64.3 735.0,64.4 C 739.0,64.5 741.0,65.4 745.0,67.0 C 749.0,68.6 751.0,70.1 755.0,72.2 C 759.0,74.4 761.0,75.3 765.0,77.7 C 769.0,80.0 771.0,82.5 775.0,84.0 C 779.0,85.6 781.0,87.5 785.0,85.5 C 789.0,83.5 791.0,81.5 795.0,74.1 C 799.0,66.6 801.0,55.8 805.0,48.4 C 809.0,41.0 811.0,38.5 815.0,37.2 C 819.0,35.9 821.0,36.0 825.0,41.8 C 829.0,47.5 831.0,61.7 835.0,65.8 C 839.0,69.9 841.0,67.1 845.0,62.3 C 849.0,57.6 851.0,47.9 855.0,42.2 C 859.0,36.4 861.0,33.0 865.0,33.7 C 869.0,34.5 871.0,42.4 875.0,45.9 C 879.0,49.4 881.0,50.6 885.0,51.1 C 889.0,51.6 891.0,43.0 895.0,48.3 C 899.0,53.6 901.0,69.2 905.0,77.6 C 909.0,85.9 911.0,87.5 915.0,90.0 C 919.0,92.5 921.0,90.0 925.0,90.0 C 929.0,90.0 931.0,90.0 935.0,90.0 C 939.0,90.0 941.0,90.0 945.0,90.0 C 949.0,90.0 951.0,90.0 955.0,90.0 C 959.0,90.0 961.0,90.0 965.0,90.0 C 969.0,90.0 971.0,90.0 975.0,90.0 C 979.0,90.0 981.0,90.0 985.0,90.0 C 989.0,90.0 992.0,90.0 995.0,90.0 C 998.0,90.0 999.0,88.0 1000.0,90.0 C 1001.0,92.0 1000.0,98.0 1000.0,100.0`;
const vals = data.split(" C ")
const timeLength = 487;
const output = [];
vals.forEach((number, index) => {
    let val = number.split(" ");
    var value = "0.0,100.0";
    //console.log(value);
    if (val.length === 1) {
        value = val[0];
        //console.log(value);
    }
    else {
        value = val[1];
        //console.log(value);
    }
    //console.log(value);
    value = value.split(",");
    let pos = value[0];
    value = value[1];
    value = Math.floor(value);
    value = 100 - value;
    output.push([pos, value]);
});
let real_max = 0;
let max_occur = 0;
for (let i = 1; i < (output.length - 1); i++) {
    let val = output[i][1];
    let pos = output[i][0];
    let prev = output[i-1][1];
    let next = output[i+1][1];
    if (val > prev && val > next) {
        let percent = pos/1000;
        let occurTime = percent*timeLength;
        let mins = Math.floor(occurTime/60);
        let seconds = Math.floor(occurTime - (60*mins))
        console.log("local max at", mins, ":", seconds);
        if (val > real_max) {
            real_max = val;
            max_occur = pos;
        }
    }
}

let percent = max_occur/1000;
let occurTime = percent*timeLength;
let mins = Math.floor(occurTime/60);
let seconds = Math.floor(occurTime - (60*mins))
console.log("video max at", mins, ":", seconds);