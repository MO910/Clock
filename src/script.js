// variables
import { arabic, delay, timeMode24, images, videos } from "./config.json";
// variables
const container = document.querySelector(".container");
const video = document.querySelector("video");
const fullScreen = document.querySelector(".fullScreen");

const timeText = document.querySelector(".clock .time");
const dateText = document.querySelector(".clock .date");
// flags
let isFull = false;
/**
 * Clock
 */
const time12 = (h) => (h > 12 ? h - 12 : h);
const format = (num) => (num < 9 ? `0${num}` : num);

const ticker = () => {
	// get time
	const now = new Date();
	let hour = now.getHours();
	!timeMode24 && (hour = time12(hour));
	const min = now.getMinutes();
	const lang = arabic ? "ar" : "en";
	const date = new Intl.DateTimeFormat(lang, { dateStyle: "full" }).format(
		now,
	);
	const time = `${format(hour)}:${format(min)}`;
	//
	timeText.innerHTML = time;
	dateText.innerHTML = date;
};
ticker();
setInterval(ticker, 1000);
/**
 * Background1
 */
// assign image
const assignImage = (i) => {
	container.style.backgroundImage = `url(/images/${images[i]})`;
	video.classList.remove("visible");
};
// assign video
const assignVideo = (i) => {
	video.src = `/videos/${videos[i]}`;
	video.classList.add("visible");
};
// select random image or video
const selectRandomly = () => {
	const index = Math.floor(Math.random() * (images.length + videos.length));
	// assign
	if (index < images.length) assignImage(index);
	else assignVideo(index - images.length);
	console.log(index);
};
// iterate
selectRandomly();
setInterval(selectRandomly, delay * 1000);
// Full Screen
fullScreen.addEventListener("click", () => {
	if (isFull) document.webkitExitFullscreen();
	else document.body.webkitRequestFullscreen();
	isFull = !isFull;
});
