(()=>{"use strict";function t(){let t=function(){const t=document.getElementsByClassName("ytp-heat-map-path");if(0==t.length)return null;let e=t[0].getAttribute("d");return"object"==typeof e?e:e.slice(2)}();"string"==typeof t&&function(t){if(0===t.length)return!1;var e=t[0];for(let o=1;o<t.length-1;o++){let i=t[o],n=t[o-1],l=t[o+1];if(i.height>n.height&&i.height>l.height){let t=i.position/1e3*1542,o=Math.floor(t/60),n=Math.floor(t-60*o);console.log("local max at",o,":",n),i.height>e.height&&(e=i)}}let o=e.position/1e3*1542,i=Math.floor(o/60),n=Math.floor(o-60*i);console.log("video max at",i,":",n)}(function(t){const e=t.split(" C "),o=[];return e.forEach((t=>{let e=t.split(" "),i="";i=1===e.length?e[0]:e[1];let n=function(t){let e=t.split(","),o=100-Math.floor(+e[1]);return{position:+e[0],height:o}}(i);o.push(n)})),o}(t))}chrome.action.onClicked.addListener((e=>{chrome.scripting.executeScript({target:{tabId:e.id?e.id:-1},func:t}).then()}))})();