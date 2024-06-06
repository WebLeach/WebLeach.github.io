VERSION = "PWA-WL-ONLINE v6:MAIN_v6:MAKE_HTML6"


// monkey patching array.remove(index) to remove an element from an array
Array.prototype.remove = function (index) {
	if (index > -1) {
		this.splice(index, 1);
	}
};


class Config {

	constructor() {
		this.page_type = "";
		this.popup_msg_open = false;
		this.total_popup = 0;
		this.Debugging = false;
		this.allow_Debugging = true;

		this.Hammered_modal = 0;
		this.is_touch_device = 'ontouchstart' in document.documentElement;


		this.themes = ["Tron"]


		this.is_webkit = navigator.userAgent.indexOf('AppleWebKit') != -1
		this.is_edge = navigator.userAgent.indexOf('Edg') != -1

		this.previous_type = null;
	}

}



var config = new Config();

// byId(config.page_type).style.display = "contents";

var panel2disable = [];


class Datas {
	constructor() {
		this.all_image_loc = [];
		this.images_loc = [];
		this.pages_list = [];
		this.new_pages = []; // index of new pages

		this.current_page_index = -1;
		this.sp_flags = [];

		this.proj_name = "";

		this.current_page_name = ""
		this.set_page_name();

		this.last_opened = null;

		this.default_style = []; // may vary depending on project
		this.current_style = [];
		this.theme = 0;

		this.discuss_id = "";

		this.description = "";

		this.stars = "";
		this.tags = [];
		this.poster_loc = "";

		this.cssVar = document.querySelector(':root');
		this.has_script = {};

		this.last_opened_manga = [];
		this.allow_preload = true;
	}

	set_page_name(){
		this.current_page_name = "WL-"+ this.proj_name + " " + this.current_page_index;
	}

	init(){
		return 0;
	}

	async get_project_data(){
		// json from server_data_manager
		var example = {
			"proj_name": "The Project Name",
			"chapters": ["chap-01", "..."],
			"default_style": [0,0,1,1],
			"sp_flags": "['m.com', 'reverse']",
			"description": "...",
			"tags": [],
			"stars": "5",
			"poster_loc": "https://"
		}

		var data = await server_data_manager.get_server_data("./index.json")

		this.proj_name = data.title;
		this.pages_list = data.chapters;
		this.default_style = data.default_style;
		this.sp_flags = data.sp_flags;
		this.description = data.description;
		this.tags = data.tags;
		this.stars = data.stars;
		this.poster_loc = data.poster_loc;

		this.all_image_loc = data.images_loc;

		return data;
	}


	async get_chapter_data(page_id){
		// json from server_data_manager
		var example = {
			"images_loc": ["https://", "..."],
			"current_page_index": 1
		}
		var page_name = this.pages_list[page_id]

		// var data = await server_data_manager.get_server_data("./" + page_name + "/index.json")

		this.images_loc = datas.all_image_loc[page_id];
		this.current_page_index = page_id;

		var data = {
			images_loc: this.images_loc,
			current_page_index: this.current_page_index
		}

		return data;
	}







	get_css(key) {
		return getComputedStyle(this.cssVar).getPropertyValue(key);
	}



	set_css(key, value) {
		this.cssVar.style.setProperty(key, value);
	}
}

var datas = new Datas();

// function SEOpatch(){
// 	var poster = "https://i.ibb.co/D4KnFRC/emo-angel-titled-w400.png"
// 	if(datas.poster_loc!=""){
// 		poster =datas.poster_loc;
// 	}
// 	byId("seoImg").setAttribute("content", poster)
// 	byId("seoDescription").setAttribute("content", datas.description)
// }


if (!config.allow_Debugging){

	log = null_func;

	called = null_func;

}







function fuck(x="") {

	alert("fuck " + x);

}





function helped_user(set = 0) {

	if (set != 0) {

		localStorage.setItem('?helped-user', set);

		return;

	}

	var helped = localStorage.getItem('?helped-user');

	if (helped == 'undefined' || helped == null) {

		return false;

	}

	return true;

}







class Tools {

	// various tools for the page

	sleep(ms) {

		// sleeps for a given time in milliseconds

		return new Promise(resolve => setTimeout(resolve, ms));

	}



	set_brightness(input = 0) {

		// sets the brightness of the screen



		var val;

		var input_ = byId('brightness-input');

		var brightness = byId('brightness');

		if (!input) {

			val = sessionStorage.getItem('bright');

			if (val) {

				val = parseInt(val);

				input_.value = val;

			} else {

				input = 1;

			}

		}

		if (input) {

			val = input_.value;

			//   int to string

			sessionStorage.setItem('bright', val);

		}



		// to make sure opacity is not -1.11022e-16

		if (val == 10) {brightness.style.opacity = 0;return;}





		brightness.style.opacity = 0.7 - (val * 0.07);

	}





	onlyInt(str){

	if(this.is_defined(str.replace)){

	return parseInt(str.replace(/\D+/g, ""))}

	return 0;

	}



	del_child(elm){

		if(typeof(elm)=="string"){

			elm = byId(elm)

		}



		while (elm.firstChild) {

			elm.removeChild(elm.lastChild);

		}

	}

	toggle_bool(bool){

		return bool !== true;

	}



	exists(name){

		return (typeof window[name] !== 'undefined')

	}



	hasClass(element, className, partial = false) {

		if (partial) {

			className = ' ' + className;

		} else {

			className = ' ' + className + ' ';

		}



		return (' ' + element.className + ' ').indexOf(className) > -1;

	}



	addClass(element, className) {

		if (!this.hasClass(element, className)) {

			element.classList.add(className);

		}

	}



	enable_debug(){

		if(!config.allow_Debugging){

			alert("Debugging is not allowed");

			return;

		}

		if(config.Debugging){

			return

		}

		config.Debugging = true;

		var script = createElement('script'); script.src="//cdn.jsdelivr.net/npm/eruda"; document.body.appendChild(script); script.onload = function () { eruda.init() };

	}





	is_in(item, array) {

		return array.indexOf(item) > -1;

	}



	is_defined(obj){

		return typeof(obj) !== "undefined"

	}



	toggle_scroll(allow = 2, by = "someone") {

		if (allow == 0) {

			document.body.classList.add('overflowHidden');

		} else if (allow == 1) {

			document.body.classList.remove('overflowHidden');

		} else {

			document.body.classList.toggle('overflowHidden');

		}

	}

}



var tools = new Tools();

// tools.enable_debug()

function alt_script(sources, name){

	if(sources.length == 0) {return 0;}

	if (datas.has_script[name]==1) {return 0;}

	var x = createElement("script");

	x.src = sources[0];

	function validate(){

		if (tools.exists(name)){

		datas.has_script[name] = 1;

		}

		else{

		alt_script(sources.slice(1), name)



	}

	}



	x.onload = validate;

	x.onerror = validate;



	document.head.appendChild(x)

}



alt_script(["https://cdn.jsdelivr.net/npm/hammerjs@2.0.8/hammer.min.js", "/assets/scripts/hammer.min.js"], "Hammer")

//load_font("Koulen") //not implemented yet




const MAIN_JS = true;
const V = 3;
// alert(typeof datas === "undefined")
if (typeof datas === "undefined") {window["datas"] = {};log(window.datas)} // if datas is not defined

class Local_Data_Manager {
	constructor() {
	}


	show_last_opened() {
		var self = this;

		this.click_last_link = function (evt) {
			evt.preventDefault();
			var link = "./index.html?page=" + datas.last_opened;
			
			datas.current_page_index = datas.last_opened;
			popup_msg.close(); // this updates the current page index, so need to get link before updating
			handle_json_request(link);
		};

		if (!this.get_local_data()) {
			return 0;
		}

		if (
			datas.last_opened == "undefined" ||
			datas.last_opened == null ||
			datas.last_opened == -1
		) {
			datas.last_opened = datas.current_page_index;
			//log("show_last_opened used set_local_data");
			this.update_data();
			return;
		}


		// CASE: Currently open CHAPTER-LIST
		if (
			datas.current_page_index == -1 &&
			datas.last_opened != datas.current_page_index
		) {
			let header = "Psst!";
			//log("last_opened", datas.last_opened);
			let content =
				"You left the page on <a id= 'lastleft' href='./index.html?page=" +
				datas.last_opened +
				"'>" +
				datas.pages_list[datas.last_opened] +
				"</a><br> Click on the link to go there<hr>Close this dialog to continue from here";
			popup_msg.createPopup(header, content);

			byId("lastleft").onclick = this.click_last_link;

			popup_msg.onclose = function () {
				self.update_data();
			};

			popup_msg.open_popup();

			config.popup_msg_open = popup_msg;
		}
	}

	get_or_set(key, global = false) {
		const data = localStorage.getItem(key)
		// console.log("get_or_set", key, data)
		// console.trace()
		if (data == "undefined" || data === null) {
			if (global) {
				this.set_global_data()
			}
			else {
				this.set_local_data()
			}
			return this.get_or_set(key, global)
		}
		return data;
	}

	get_global_data() {
		var data = this.get_or_set("config", true);


		data = JSON.parse(data);

		datas.allow_preload = data["preload"];
		theme_controller.set_switch_mode("S-preloading", datas.allow_preload)
	}

	get_local_data() {
		// gets data from local storage
		// proj_name : [page_index, theme_index, [style...]]
		
		this.get_global_data()

		const that = this;
		function read_chapter_data() {
			var data = that.get_or_set(datas.proj_name)

			data = JSON.parse(data);

			datas.last_opened = data[0];

			datas.theme = data[1];
			datas.current_style = data[2];

			return true;
		}
		//alert(69)
		if (config.page_type == "CHAPTER") {
			return read_chapter_data();
		}

		if (config.page_type == "CHAPTER-LIST") {
			return read_chapter_data();
		}
		return true;
	}

	set_global_data() {
		const data = {
			"preload": datas.allow_preload,
		}

		localStorage.setItem("config", JSON.stringify(data))
	}

	set_local_data() {
		// sets data to local storage
		// console.trace()

		if (config.page_type == "CHAPTER") {
			datas.theme = 0;
		}

		// console.log("set_local_data", datas.last_opened, datas.theme, datas.current_style, (datas.current_style==null || !datas.current_style || datas.current_style.length == 0))
		datas.last_opened = datas.current_page_index;
		if (datas.current_style==null || !datas.current_style || datas.current_style.length == 0) {
			datas.current_style = datas.default_style;

			// console.log("...set_local_data", datas.last_opened, datas.theme, datas.current_style)
		}

		var data = [datas.last_opened, datas.theme, datas.current_style];

		localStorage.setItem(datas.proj_name, JSON.stringify(data));
	}

	set_last_manga() {
		datas.last_opened_manga = [datas.proj_name, datas.current_page_index];
		localStorage.setItem(
			"$last_open",
			JSON.stringify(datas.last_opened_manga)
		);
	}

	get_last_manga() {
		datas.last_opened_manga = JSON.parse(
			localStorage.getItem("$last_open")
		);
		return datas.last_opened_manga;
	}

	update_data() {
		this.set_global_data() // for all manga
		this.set_local_data() // for the specific manga
	}
}

let local_data_manager = new Local_Data_Manager();

class Server_Data_Manager {
	constructor() {
	}

	async get_server_data(url) {
		// gets data from server by ajax javascript
		// url : url to get data from
		// returns data in json format
		var data = null;

		function readJson(url) {
			// http://localhost:8080
			return fetch(url, {cache: "force-cache"})
				.then((response) => {
					if (!response.ok) {
						throw new Error("HTTP error " + response.status);
					}
					return response.json();
				})
				.then((json_) => {
					data = json_;
				});
		}

		try {
			if (tools.is_defined("fetch")) {
				try {
					await readJson(url); // will overwrite data
				} catch { }
			}

			if (data == null) {
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						data = JSON.parse(this.responseText);
					}
				};
				xhttp.open("GET", url, false);
				xhttp.send();
			}
		} catch {
			data = false;
		}
		return data;
	}
}

var server_data_manager = new Server_Data_Manager();

var vh = 0,
	vw = 0;
var repeat_counter = 0
class Theme_Controller {
	// TRON theme controller
	constructor() {
		this.fa_ok = false;
	}

	switch_init() {
		var that = this;
		this.switch_btn = byClass("tron-switch");

		for (var i = 0; i < this.switch_btn.length; i++) {
			let id = this.switch_btn[i].id;

			// fix initial state (add active class)
			that.set_switch_mode(id, that.switch_mode(id));

			// set click action
			this.switch_btn[i].onclick = function () {
				that.set_switch_mode(id, that.switch_mode(id), true);
			};
		}
	}

	switch_mode(id) {
		let btn = byId(id + "-mode");
		if (btn.innerText == "ON") {
			return true;
		} else return false;
	}

	set_switch_mode(id, mode, not = false) {
		// not: do the inverse of current mode
		let btn = byId(id + "-mode");
		let parent = byId(id);

		function toggle_panel(disable) {
			let Guncle = parent.parentElement.nextElementSibling;
			if (tools.is_in(id, panel2disable)) {
				if (disable == true) {
					Guncle.classList.add("disabled");
					Guncle.disabled = true;
				} else {
					Guncle.classList.remove("disabled");
					Guncle.disabled = false;
				}
			}
		}
		if (not) {
			if (mode == "ON" || mode === true) {
				btn.innerText = "OFF";
				parent.classList.remove("active");
				{
					toggle_panel(true);
				}
			} else {
				btn.innerText = "ON";
				parent.classList.add("active");
				toggle_panel(false);
			}
		} else {
			if (mode == "ON" || mode === true) {
				btn.innerText = "ON";
				parent.classList.add("active");
				toggle_panel(false);
			} else {
				btn.innerText = "OFF";
				parent.classList.remove("active");
				toggle_panel(true);
			}
		}
	}

	getViewportSize() {
		// var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
		// var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

		vh = byId("brightness").clientHeight;
		vw = byId("brightness").clientWidth;
	}

	async del_fa_alt() {
		if (this.fa_ok) {
			document.querySelectorAll(".fa").forEach(e => e.parentNode.replaceChild(Object.assign(document.createElement("i"), { className: e.className, style: e.style }), e));
		}
	}

	async load_fa() {
		if (this.fa_ok) {
			return;
		}
		var that = this;
		let link = createElement('link');
		link.rel = "stylesheet";

		link.type = "text/css";
		link.media = 'print';
		// link.href = "https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro-v6@18657a9/css/all.min.css";

		link.href = "https://cdn.jsdelivr.net/gh/RaSan147/fabkp@2f5670e/css/all.min.css";
		link.onload = function () {
			log("fa loaded")
			that.fa_ok = true;
			that.del_fa_alt()
			link.media = "all";

		}
		document.head.appendChild(link);
	}
}

var theme_controller = new Theme_Controller();

theme_controller.getViewportSize();
theme_controller.load_fa()


class Top_Bar {
	constructor() {
		this.dont_move = false;
		this.prevScrollpos = window.scrollY;
		this.top_bar = byId("TopBar");
		this.app_name = byId("app_name");
	}

	set_app_name() {
		if (vw < 300) {
			this.app_name.innerHTML = " WL";
		} else {
			this.app_name.innerHTML = "WL Reader";
		}
	}
	show() {
		this.top_bar.style.top = "0";
		document.body.style.top = "50px";
	}

	hide() {
		this.top_bar.style.top = "-50px";
		document.body.style.top = "0";
	}
}

let top_bar = new Top_Bar();
top_bar.set_app_name();

window.onscroll = function () {
	var currentScrollPos = window.scrollY;

	if (top_bar.dont_move) {
		return false;
	}

	if (top_bar.prevScrollpos > currentScrollPos + 10) {
		top_bar.show();
	}
	if (top_bar.prevScrollpos < currentScrollPos - 10) {
		top_bar.hide();
	}
	top_bar.prevScrollpos = currentScrollPos;
};

class CH_PageStyler {
	constructor() {
		// assigns required elements for theme changing in attributes
		this.border_enabled = false;
		this.border_color = "#bbb";
		this.border_width = "1";

		this.space_enabled = true;
		this.space_height = "3em";

		this.img_div1 = byId("images");

		// image border switch
		this.S_image_border = byId("S-image-border");
		this.S_image_space = byId("S-image-space");
	}

	init() {
		// assigns changing values to attributes
		this.eleIMG = byClass("per_img");
		this.breaks = byClass("Break_in_image");
	}

	set_default_style() {
		const style = datas.default_style;
		data.current_style = style;
		//[0,0,1,1]
		//0: border disabled 0/1  [default: 0]
		//1: spaceing enabled 0/1 [default: 0]
		//2: border color 1> black 2> white 3> theme #......> custom
		//3: border width [1-10]        [default: 1]


		//log("Setting default style");
		// console.log(style)
		this.set_menu_style(style);
		this.set_local_style(style);
		this.display_changes(style);
	}

	get_local_style() {
		//log("get_local_style used get_local_data");
		return local_data_manager.get_local_data();
	}

	set_local_style() {
		called("set_local_style", "set_local_data");
		local_data_manager.set_local_data();
	}

	get_menu_style() {
		var arr = [];

		if (switchBtn.switch_mode("S-image-border")) {
			arr.push(1);
		} else {
			arr.push(0);
		}

		if (switchBtn.switch_mode("S-image-space")) {
			arr.push(1);
		} else {
			arr.push(0);
		}

		var border_color_radios = byName("border-color");
		var border_color = 0;
		for (var i = 0; i < border_color_radios.length; i++) {
			if (border_color_radios[i].checked) {
				border_color = border_color_radios[i].value;
			}
		}
		arr.push(tools.onlyInt(border_color));
		arr.push(tools.onlyInt(byName("border-width")[0].value));

		//log(99, arr);
		return arr;
	}

	set_menu_style(style) {
		var style_temp = style;

		this.set_local_style();
		//log(style);
		if (style_temp[0] == 1) {
			switchBtn.set_switch_mode("S-image-border", "ON");
		} else {
			switchBtn.set_switch_mode("S-image-border", "OFF");
		}

		if (style_temp[1] == 1) {
			switchBtn.set_switch_mode("S-image-space", "ON");
		} else {
			switchBtn.set_switch_mode("S-image-space", "OFF");
		}

		var border_color_radios = byName("border-color");
		for (let i = 0; i < border_color_radios.length; i++) {
			if (border_color_radios[i].value == style_temp[2]) {
				border_color_radios[i].checked = true;
			}
		}
		byName("border-width")[0].value = style_temp[3];
	}

	display_changes(values) {
		//log("display_changes values", values);
		var border_color = "#000";
		if (values[0] == 1) {
			if (values[2] == 2) {
				border_color = "#fff";
			} else if (values[2] == 3) border_color = "var(--theme-color)";

			var border_width = values[3];
			datas.set_css("--border-width", (1 + border_width) * 1.5 + "px");
			datas.set_css("--border-color", border_color);
		} else {
			datas.set_css("--border-width", "0");
			datas.set_css("--border-color", "transparent");
		}

		if (values[1] == 0) {
			datas.set_css("--space-height", "0");
		} else {
			datas.set_css("--space-height", "3em");
		}

		slider_control.init();
	}

	load_style_on_start() {
		if (!this.get_local_style()) {
			called("load_style_on_start", "set_default_style");
			this.set_default_style();
		} else {
			//datas.current_style = this.get_local_style()
			called("load_style_on_start", "set_menu_style & display_changes");
			//log(datas.current_style);
			this.set_menu_style(datas.current_style);
			this.display_changes(datas.current_style);
		}
	}

	change_style() {
		datas.current_style = this.get_menu_style();
		this.set_local_style();
		this.display_changes(datas.current_style);
	}
}

let page_styler = new CH_PageStyler();

class Accordion_ {
	constructor() {
		this.acc = byClass("accordion");

		var that = this;
		for (let i = 0; i < this.acc.length; i++) {
			this.acc[i].addEventListener("click", function () {
				this.classList.toggle("accordion-active");
				var panel = this.nextElementSibling;
				if (panel.classList.contains("accordion-panel")) {
					if (panel.style.display === "block") {
						panel.style.display = "none";
					} else {
						panel.style.display = "block";
						slider_control.slider_fix_tick();
					}
				}
			});
		}

		byId("add_theme_name").innerHTML +=
			"[" + config.themes[datas.theme] + "]";
	}
}

let accordion = new Accordion_();

class SwitchBtn_ {
	constructor() {
		theme_controller.switch_init();
	}

	switch_mode(id) {
		return theme_controller.switch_mode(id);
	}

	set_switch_mode(id, mode, not = false) {
		return theme_controller.set_switch_mode(id, mode, not);
	}
}

let switchBtn = new SwitchBtn_();

class Pagination {
	constructor() {
		this.pagination_box = byId("pagination");
		this.prev_direction = byId("pagination-prev");

		this.next_direction = byId("pagination-next");
	}

	has_next() {
		return datas.current_page_index != datas.pages_list.length - 1
	}

	has_prev() {
		return datas.current_page_index > 0;
	}

	click_direction(change) {
		datas.current_page_index += change;
		datas.last_opened = datas.current_page_index;
		local_data_manager.update_data();

		handle_json_request(
			"./index.html?page=" + datas.current_page_index
		);
	}


	pagination() {
		const that = this;
		this.pagination_box.classList.remove("hidden");

		// to remove the else statements
		this.prev_direction.classList.add("hidden");
		this.next_direction.classList.add("hidden");


		if (this.has_prev()) {
			this.prev_direction.classList.remove("hidden");
			this.prev_direction.onclick = function () {
				that.click_direction(-1)
			};
		}


		if (this.has_next()) {
			this.next_direction.classList.remove("hidden");
			this.next_direction.onclick = function () {
				that.click_direction(1)
			};
		}


	}

	no_pagination() {
		this.pagination_box.classList.add("hidden");
	}
}

let pagination = new Pagination();

class Image_loader {
	constructor() {
		this.images_const = byId("images"); // images container

		this.preloaded = null;
		this.preload_progress = byId("preload-progress")

		this.init_preloader_button();
	
		this.cache_queue = [];
		this.cache_loading = false;
	}

	async init_preloader_button() {
		const that = this;
		byId("S-preloading").addEventListener("click", async function () {
			await tools.sleep(100);
			datas.allow_preload = switchBtn.switch_mode("S-preloading");
			local_data_manager.update_data();
			that.preload()
		});
	}
	
	

	async cache_image(src, onload = null_func) {
		var img = new Image();
		img.addEventListener("load", onload);
		img.src = src;
		
		return img
	}

	async cache_N_swap_image(elm, src) {
		this.cache_queue.push(
			[elm, src]
		)
		
		if (!this.cache_loading) {
			await this.next_cache()
		}
	}
	async next_cache(failed = 0){
		let that = this;
		
		if (this.cache_queue.length == 0) {
			this.cache_loading = false;
			return 0;
		}
		let data = this.cache_queue[0]

		let elm = data[0]
		let src = data[1]
		
		
		var onload = function () {
			elm.src = src;
			that.next_cache();
		}

		this.cache_loading = true;


		let img = await this.cache_image(src, onload)
		img.onerror = function () {
			if (failed) { elm.src = src; 
				return false;
			}
			return that.next_cache(1) // retry once
		
			this.next_cache()
		}
		this.cache_queue.remove(0)
		img.src = src;
		
		return true
	}

	load_image() {
		var that = this;

		tools.del_child(this.images_const);
		const break_in_image = createElement("div");
		break_in_image.className = "Break_in_image";

		for (var i = 0; i < datas.images_loc.length; i++) {
			var imgx = createElement("IMG");
			this.cache_N_swap_image(imgx, datas.images_loc[i]);
			imgx.src = '/assets/anim/loader-lite.png' //datas.images_loc[i];
			imgx.id = "img_id_" + i;
			imgx.className = "per_img disable_selection";

			imgx.onerror = function () {
				alt_(this, ["?assets/loader-lite.png"])
			}

			imgx.alt =
				"It seems image is not found (" + datas.images_loc[i] + ")";
			imgx.style.display = "block";
			imgx.style.margin = "auto";

			that.images_const.appendChild(imgx);
			if (i < datas.images_loc.length - 1) {
				that.images_const.appendChild(break_in_image.cloneNode(true));
			}
		}

		this.preload()
	}


	async preload() {
		const that = this;
		local_data_manager.get_global_data()
		if (!(pagination.has_next() && datas.allow_preload)) { return }

		// console.log("Preloading next page")

		// var req = "./" +
		// 	datas.pages_list[datas.current_page_index + 1] +
		// 	"/index.json"
		// var data = await server_data_manager.get_server_data(req);
		// var images = data.images_loc;

		var images = []
		if (datas.current_page_index + 1 < datas.all_image_loc.length) {
			images = datas.all_image_loc[datas.current_page_index + 1]
		}
		// console.log(images)
		this.preloaded = [0, images.length]
		for (let i = 0; i < images.length; i++) {
			let image = images[i]
			this.cache_image(image, function () {
				that.preloaded[0] += 1
				console.log("Preloaded", that.preloaded[0], "of", that.preloaded[1])
				// console.log(image)
			})
			if (!datas.allow_preload) {
				// console.log("Preloading stopped")
				break
			}
		}
	}

}

var image_loader = new Image_loader();

class Modal_img {
	//###  modal (floating image script)    #####

	constructor() {
		// is the modal on?? used for setting up event listeners
		this.is_on = false;

		// create references to the modal...
		this.modal = byId("myModal");
		// the image in the modal
		this.modalImg = byId("modal-img");
		this.modalContent = byId("image-modal-content");
		// and the modal-caption in the modal
		this.captionText = byId("modal-caption");

		this.modal_img_indx = -1;
		// Go through all of the images with our custom class

		this.LArrow = byId("prev_view");
		this.RArrow = byId("next_view");

		this.width = 0;
		this.maxWidth = 0;

		this.hammered = 0;
	}

	init() {
		var that = this;
		this.js_img_src = [];

		// to all images -- note I'm using a class!
		this.images = byClass("per_img");
		this.modalImg.onerror = function () {
			that.captionText.innerHTML =
				"<span style='color:black;background-color: white'>Failed to load</span> " +
				that._caption;
		};
	}

	get _caption() {
		return datas.images_loc[this.modal_img_indx]
			.replace(/^.*?([^\\\/]*)$/, "$1")
			.split(".")
			.slice(0, -1)
			.join("");
	}

	assign_modals_in_img() {
		this.init();
		var that = this;
		that.set_width();

		for (var i = 0; i < that.images.length; i++) {
			var img = that.images[i];
			that.js_img_src.push(img.src);
			// and attach our click listener for this image.
			img.onclick = function () {
				that.show_modal_img(this.id);

				that.toggle_event_listener();
			};
		}

		this.create_close_button();
	}

	set_modal_state(is_negative_move) {
		if (is_negative_move) {
			this.modalImg.setAttribute("data-state", 1);
		} else {
			this.modalImg.setAttribute("data-state", 2);
		}
	}

	async change_image(move) {
		const is_negative_move = move < 0;
		const after_move = this.modal_img_indx + move;
		if (after_move >= this.images.length || after_move < 0) {
			return 0;
		}

		this.modal_img_indx += move;

		this.set_modal_state(is_negative_move);

		await tools.sleep(300);
		this.show_modal_img("img_id_" + this.modal_img_indx);
	}

	set_width() {
		// reset the width
		if (vw < 700) {
			this.width = 100;
		} else {
			this.width = 80;
		}
		this.maxWidth = 900;
	}

	async show_modal_img(id) {
		var that = this;
		config.popup_msg_open = that;
		that.modal_img_indx = tools.onlyInt(id);

		// console.log(that.modal_img_indx)
		that.modalImg.src = datas.images_loc[that.modal_img_indx];

		this.modalImg.style.left = 0;


		this.modalImg.style.display = "none";

		await tools.sleep(10);

		this.modalImg.setAttribute("data-state", 0);

		that.modal.style.display = "initial";
		that.modalImg.style.display = "initial";


		if (!this.hammered) {
			hammer_handler.init();
			this.hammered = 1;
		}

		// get filename without extension
		that.captionText.innerHTML = that._caption;

		// disable scroll on body
		tools.toggle_scroll(0);

		if (that.modal_img_indx == 0) {
			that.LArrow.style.display = "none";
		} else {
			that.LArrow.style.display = "block";
		}

		if (that.modal_img_indx + 1 == that.js_img_src.length) {
			that.RArrow.style.display = "none";
		} else {
			that.RArrow.style.display = "block";
		}
		top_bar.hide();
		top_bar.dont_move = true;

		that.modal.scrollTop = 0;

		top_bar.dont_move = false;
	}

	close() {
		this.close_image_modal();
	}

	close_image_modal() {
		const that = this;
		that.modal.style.display = "none";

		this.toggle_event_listener();

		// stop_TouchEmulator();
		tools.toggle_scroll(1);

		var n = this.modal_img_indx;
		// that.hammered = 0;
		config.popup_msg_open = false;

		byId("img_id_" + n).scrollIntoView();

		// hide background modal
		// byClass('modal_bg')[0].style.display = "none";
	}

	create_close_button() {
		const that = this;
		const span = byClass("close-image-modal")[0];

		span.onclick = function () {
			that.close_image_modal();
		};
	}

	back_button(ev) {
		modal_img.key_control({ keyCode: 27 });
		// alert(1)
		return false;
	}

	key_control(event) {
		event.preventDefault();
		var that = modal_img;

		async function zoom(scale) {
			that.modalImg.setAttribute("data-state", "zoom");
			hammer_handler.event_handler({
				type: "pinch",
				scale: scale,
				deltaX: 0,
				deltaY: 0,
			});
			hammer_handler.event_handler({ type: "pinchend" });
			await tools.sleep(300);
			that.modalImg.setAttribute("data-state", 0);
		}

		if (event.keyCode == 40) {
			zoom(0.9);
		}

		if (event.keyCode == 38) {
			zoom(1.1);
		}

		if (event.keyCode == 37) {
			that.change_image(-1);
		}
		if (event.keyCode == 39) {
			that.change_image(1);
		}

		if (event.keyCode == 27) {
			that.close_image_modal();
		}
		return false;
	}

	toggle_event_listener(force_remove = false) {
		const that = this;
		var to_do;
		if (this.is_on) {
			to_do = "removeEventListener";
		} else {
			to_do = "addEventListener";
		}
		if (force_remove) {
			to_do = "removeEventListener";
		}
		document[to_do]("keydown", that.key_control);
		document[to_do]("backbutton", that.back_button);

		this.is_on = !this.is_on;
	}
}

let modal_img = new Modal_img();

class Popup_Msg {
	constructor() {
		this.create();
		this.made_popup = false;
		//this.popup_obj = byId('popup-0');
		//this.header = byId('popup-header');
		//this.content = byId('popup-content');
		//this.hr = byId('popup-hr');

		//this.scroll_disabled = false;

		this.init();
		//console.log(this)
	}

	init() {
		this.onclose = null_func;
		this.scroll_disabled = false;
	}

	create() {
		var that = this;
		this.popup_id = config.total_popup;
		this.popup_obj = createElement("div");
		this.popup_obj.id = "popup-" + this.popup_id;
		this.popup_obj.classList.add("popup");

		this.popup_bg = createElement("div");
		this.popup_bg.classList.add("modal_bg");
		this.popup_bg.id = "popup-bg-" + this.popup_id;
		this.popup_bg.style.backgroundColor = "#000000EE";
		this.popup_bg.onclick = function () {
			that.close();
		};
		this.popup_obj.appendChild(this.popup_bg);

		var popup_box = createElement("div");
		popup_box.classList.add("popup-box");
		var close_btn = createElement("div");
		close_btn.classList.add("popup-close-btn");
		close_btn.onclick = function () {
			that.close();
		};
		close_btn.innerHTML = "&times;";
		popup_box.appendChild(close_btn);

		this.header = createElement("h1");
		this.header.id = "popup-header-" + this.popup_id;
		popup_box.appendChild(this.header);

		this.hr = createElement("popup-hr-" + this.popup_id);
		this.hr.style.width = "95%";
		popup_box.appendChild(this.hr);

		this.content = createElement("div");
		this.content.id = "popup-content-" + this.popup_id;
		popup_box.appendChild(this.content);

		this.popup_obj.appendChild(popup_box);

		byId("popup-container").appendChild(this.popup_obj);
		config.total_popup += 1;
	}

	close() {
		this.onclose();
		this.dismiss();
		config.popup_msg_open = false;
	}

	hide() {
		this.popup_obj.classList.remove("active");
		if (this.scroll_disabled) {
			tools.toggle_scroll(1);
		}
	}

	dismiss() {
		this.hide();
		tools.del_child(this.header);
		tools.del_child(this.content);
		this.made_popup = false;
	}

	async togglePopup(toggle_scroll = true) {
		if (!this.made_popup) {
			return;
		}
		this.popup_obj.classList.toggle("active");
		if (toggle_scroll) {
			tools.toggle_scroll();
		}
		//log(tools.hasClass(this.popup_obj, "active"));
		if (!tools.hasClass(this.popup_obj, "active")) {
			this.close();
		}
	}

	async open_popup(allow_scroll = false) {
		if (!this.made_popup) {
			return;
		}
		this.popup_obj.classList.add("active");
		if (!allow_scroll) {
			tools.toggle_scroll(0);
			this.scroll_disabled = true;
		}
	}

	async createPopup(header = "", content = "", hr = true) {
		this.init();
		this.made_popup = true;
		if (typeof header === "string" || header instanceof String) {
			this.header.innerHTML = header;
		} else if (header instanceof Element) {
			this.header.appendChild(header);
		}

		if (typeof content === "string" || content instanceof String) {
			this.content.innerHTML = content;
		} else if (content instanceof Element) {
			this.content.appendChild(content);
		}

		if (hr) {
			this.hr.style.display = "block";
		} else {
			this.hr.style.display = "none";
		}
	}
}

let popup_msg = new Popup_Msg();

class CH_Sidebar_control {
	constructor() {
		this.left_bar = byId("mySidebarL");
		this.right_bar = byId("mySidebarR");
		this.sidebar_bg = byId("sidebar_bg");

		this.find_this_chapter = byId("find-this-chapter");
		this.find_this_chapter.onclick = this.show_current_chapter.bind(this);

	}



	is_open(side) {
		return tools.hasClass(
			byId("mySidebar" + side),
			"mySidebar-active",
			true
		);
	}

	async toggleNavL() {
		//console.log(this.is_open('L'))
		if (this.is_open("L")) {
			this.closeNavL();
			return false;
		}

		this.closeNavR();
		tools.toggle_scroll(0);
		this.sidebar_bg.style.display = "block";
		this.left_bar.classList.add("mySidebar-active");
		this.left_bar.classList.remove("mySidebar-inactive");
		byId("app_header").classList.toggle("top-titleR-active");
		this.find_this_chapter.style.display = "block";

	}


	show_current_chapter() {
		const yOffset = -210;
		const element = byClass("ch-search-item-active")[0]
		const y = element.getBoundingClientRect().top + yOffset;
		this.left_bar.scrollTo({ top: y, behavior: 'smooth' });
	}

	toggleNavR() {
		if (this.is_open("R")) {
			this.closeNavR();
			return false;
		}
		this.closeNavL();

		top_bar.hide();
		top_bar.dont_move = true; // prevent moving the top bar

		tools.toggle_scroll(0);
		this.sidebar_bg.style.display = "block";
		this.right_bar.classList.add("mySidebar-active");
		this.right_bar.classList.remove("mySidebar-inactive");
		byId("app_header").classList.toggle("top-titleR-active");
	}

	closeNavL() {
		this.left_bar.classList.remove("mySidebar-active");

		this.left_bar.classList.add("mySidebar-inactive"); // to fix animation at startup

		this.sidebar_bg.style.display = "none";
		this.find_this_chapter.style.display = "none";

		byId("app_header").classList.remove("top-titleL-active");

		tools.toggle_scroll(1);

		tools.sleep(3000);
	}

	closeNavR() {
		this.right_bar.classList.remove("mySidebar-active");
		this.right_bar.classList.add("mySidebar-inactive");

		this.sidebar_bg.style.display = "none";

		tools.sleep(3000);
		tools.toggle_scroll(1);

		top_bar.dont_move = false; // allow moving the top bar
	}

	closeNav() {
		this.closeNavL();
		this.closeNavR();
	}
}

var ch_Sidebar_control = new CH_Sidebar_control();
var sidebar_control = null;

switch (config.page_type) {
	case "CHAPTER":
		sidebar_control = ch_Sidebar_control;
		break;
}

class Slider_control_ {
	constructor() {
		this.slider = byClass("ranger");
		this.slider_ticks = byClass("slider-tick");
	}

	init() {
		var that = this;
		for (let i = 0; i < that.slider.length; i++) {
			that.slider[i].style.setProperty(
				"--value",
				that.slider[i].value * 10
			);
			that.slider[i].addEventListener("input", function () {
				// //Alert(this.value);
				this.style.setProperty("--value", this.value * 10);
			});
		}
	}
	border_slider_width(i) {
		return this.slider[i].clientWidth;
	}

	slider_fix_tick(e = "") {
		for (let i = 0; i < this.slider_ticks.length; i++) {
			// //Alert(this.border_slider_width(i));
			this.slider_ticks[i].parentElement.style.setProperty(
				"--tick-spacing",
				(this.border_slider_width(i) - 42) / 10 + "px"
			);
		}
	}
}

let slider_control = new Slider_control_();
slider_control.init();
slider_control.slider_fix_tick();



class Project_Panel_ {
	constructor() {
		this.rside_project = byId("ch-search-panel-body");
		this.input_ = byId("proj_search_input");
		this.button_ = byId("proj_search_icn"); // icon

		this.button = byClass("btn-search")[0]; // button
		this.button.onfocus = () => {
			this.input_.focus();
		}
		this.button.ondblclick = function () {
			sidebar_control.show_current_chapter();

		}
	}



	show_search_results() {
		var self = this;
		var to_search = this.input_.value.toLowerCase();
		tools.del_child(this.rside_project);
		//log(11);

		if (to_search.length > 0) {
			this.input_.setAttribute("data-state", "1");
			this.button_.innerHTML = '<span style="font-size:25px">&times;</span>';
			this.button_.onclick = function () {
				self.input_.value = "";
				self.input_.setAttribute("data-state", "0");
				if (theme_controller.fa_ok) { this.innerHTML = '<i class="fa-light fa-magnifying-glass"></i>'; }
				else {
					this.innerHTML = '<span class="fa fa-light fa-magnifying-glass" style="line-height:1.8">🔍</span>';
					theme_controller.del_fa_alt()
				}
				this.to_search = "";
				self.input_.focus();
				self.show_search_results();

			};
		} else {
			this.input_.setAttribute("data-state", "0");
			if (theme_controller.fa_ok) { this.innerHTML = '<i class="fa-light fa-magnifying-glass"></i>'; }
			else {
				this.innerHTML = '<span class="fa fa-light fa-magnifying-glass" style="line-height:1.8">🔍</span>';
				theme_controller.del_fa_alt()
			}
		}
		//log(12);
		var total_result = 0;
		for (let i = 0; i < datas.pages_list.length; i++) {
			if (datas.pages_list[i].toLowerCase().indexOf(to_search) !== -1) {
				total_result += 1;
				var loc = createElement("a");
				var box = createElement("div");
				box.classList.add("ch-search-item");
				loc.appendChild(box);
				if (total_result % 2 == 1) {
					box.classList.add("ch-search-item-even");
				} else {
					box.classList.add("ch-search-item-odd");
				}
				if (i == datas.current_page_index) {
					box.classList.add("ch-search-item-active");
				} else {
					loc.href = "./index.html?page=" + i;
					loc.onclick = function (evt) {
						evt.preventDefault();
						sidebar_control.closeNav();
						datas.current_page_index = i;
						datas.last_opened = datas.current_page_index;
						local_data_manager.update_data();
						handle_json_request(this.href);
					};
				}

				box.innerText = datas.pages_list[i];
				this.rside_project.appendChild(loc);
			}
		}

		//log(13);
	}
}

var project_panel = new Project_Panel_();


function show_ch_menus() {
	popup_msg.createPopup("Menu", `
	<div id="credits_btn" class="accordion accordion-button" onclick="popup_msg.close();show_credits()">Credits</div>
	<div id="about_btn" class="accordion accordion-button" onclick="popup_msg.close();show_about()">About</div>
	<div id="help_btn" class="accordion accordion-button" onclick="popup_msg.close();show_help()">Help</div>
	<div id="debug_btn" class="accordion accordion-button" onclick="popup_msg.close();tools.enable_debug()">Enable Debugging</div>
	<div id="clear_btn" class="accordion accordion-button" onclick="localStorage.clear();popup_msg.header='Done!';popup_msg.content='';">Clear localStorage</div>
	`)

	popup_msg.open_popup();
	config.popup_msg_open = popup_msg;
}

function show_credits() {
	let header = "Credits";
	let content =
		"<h3>Template created by Rasan147</h3><h2>Special Thanks to:<hr width='80%%'></h2><h3>Inul Haque<br>Sanjida Sirat<br>John Louis</h3>";

	sidebar_control.closeNavL();

	popup_msg.createPopup(header, content);
	popup_msg.open_popup();

	config.popup_msg_open = popup_msg;
}

function show_about() {
	sidebar_control.closeNavL();

	let head = "About";
	let content =
		"<b>App version:</b> " +
		datas.app_version +
		"<br><b>Page Version:</b> " +
		datas.page_version;

	popup_msg.createPopup(head, content);
	popup_msg.open_popup();

	config.popup_msg_open = popup_msg;
}

function show_help() {
	sidebar_control.closeNavL();

	let header = "Help";

	let content = `1. Open focus mode by clicking on image <br>
2. Use <b>Sidebar</b> to quick access other pages <br>
3. From settings you can change or customize theme style <br>
4. You can also change brightness level of the page <br>
5. On focus mode you can use keyboard to resize and move to next or previous image <br>
<hr>
<b>Note:</b> Theme style is reused all over the Project <br>
*EXCEPT Brightness level, it only stays until the session ends

1. Open focus mode by clicking on image <br>
2. Use <b>Sidebar</b> to quick access other pages <br>
3. From settings you can change or customize theme style <br>
4. You can also change brightness level of the page <br>
5. On focus mode you can use keyboard to resize and move to next or previous image <br>
<hr>
1. Open focus mode by clicking on image <br>
2. Use <b>Sidebar</b> to quick access other pages <br>
3. From settings you can change or customize theme style <br>
4. You can also change brightness level of the page <br>
5. On focus mode you can use keyboard to resize and move to next or previous image <br>
<hr>
<b>Note:</b> Theme style is reused all over the Project <br>
*EXCEPT Brightness level, it only stays until the session ends`;
	popup_msg.createPopup(header, content);
	popup_msg.open_popup();

	config.popup_msg_open = popup_msg;

	helped_user(1);
}


// source: https://stackoverflow.com/questions/18011099/pinch-to-zoom-using-hammer-js

console.log(vw, "]]", vh);

window.onresize = function () {
	theme_controller.getViewportSize();
	top_bar.set_app_name();
	slider_control.slider_fix_tick();
};

class Hammer_Handler {
	constructor(elm) {
		this.elm = elm;
		this.init();
	}

	init() {
		this.scale = 1;
		this.last_scale = 1;
		this.el = this.elm;

		this.scale = 1;
		this.last_scale = 1;
		this.width = modal_img.width;

		this.maxWidth = modal_img.maxWidth;
	}

	event_handler(ev) {
		if (ev.type == "doubletap") {
			if (this.last_scale == 1) {
				this.scale = 2;
				this.last_scale = 2;
			} else {
				this.scale = 1;
				this.last_scale = 1;
			}
		}

		// PAN
		const c = Math.ceil;

		if (!is_touch_device) {
			modal_img.modal.scrollBy(c(ev.deltaX / -23), c(ev.deltaY / -23), {
				behavior: "instant",
			});
		}

		//pinch
		if (ev.type == "pinch") {
			this.scale = Math.max(0.7, Math.min(this.last_scale * ev.scale, 3));
		}
		if (ev.type == "pinchend") {
			this.last_scale = this.scale;
		}

		var width = Math.ceil(this.width * this.scale);
		this.elm.style.width = width + "%";

		this.elm.style.maxWidth = this.maxWidth * this.scale + "px";
	}

	hammer_it() {
		if (!is_touch_device) {
			var hammertime = new Hammer(this.elm, { touchAction: "none" });
		} else {
			var hammertime = new Hammer(this.elm, {
				touchAction: "pan-y pan-x",
			});
		}

		hammertime
			.get("pan")
			.set({ direction: Hammer.DIRECTION_ALL, threshold: 0 });

		hammertime.get("pinch").set({ enable: true });

		var that = this;

		if (!is_touch_device) {
			var events = "doubletap pan pinch panend pinchend";
		} else {
			var events = "doubletap pinch panend pinchend";
		}

		hammertime.on(events, function (event) {
			that.event_handler(event);
		});
	}
}

var hammer_handler = new Hammer_Handler(byId("modal-img"));

var is_touch_device = "ontouchstart" in document.documentElement;
// console.log(is_touch_device);
var Hammered_modal = 0;
// var touchemulator = 0;

function hammer_modal() {
	window.clearInterval(check_n_run_hammer);
	if (Hammered_modal) {
		return;
	}

	if (typeof Hammer == "undefined") {
		document.body.style.touchAction = "auto";
		byId("image-modal-content").style.overflow = "scroll";
		byId("image-modal-content").style.maxHeight = "100vh";
	} else {
		hammer_handler.hammer_it();
		Hammered_modal = 1;
	}
}

var hammer_check = 0;
const check_n_run_hammer = window.setInterval(function () {
	if (hammer_check > 10) {
		window.clearInterval(check_n_run_hammer);
	}
	if (datas.has_script["Hammer"]) {
		hammer_modal();
	}
	hammer_check++;
}, 1000);

class Chapter_Handler {
	constructor() {
		this.brightness_input_done = false;
	}

	init() {

		if (helped_user() == false) {
			show_help();
		}

		byId("sidebar_bg").onclick = function () {
			sidebar_control.closeNav();
		};

		tools.set_brightness();
		if (!this.brightness_input_done) {
			byId("brightness-input").addEventListener("input", function () {
				tools.set_brightness(1);
			});
			this.brightness_input_done = true;
		}
	}

	switched_mode() {
		sidebar_control = ch_Sidebar_control;
		this.init();
		byId("CHAPTER").style.display = "contents";
		byId("mySidebarR").onclick = function () {
			page_styler.change_style();
		};
		panel2disable = ["S-image-border"];
	}

	display_data() {
		//log(tools.is_defined( sidebar_control.closeNavL));
		//log(369);
		// sets titles and Headline data and links
		//alert(69)
		document.title =
			datas.proj_name +
			" " +
			String.fromCharCode(187) +
			" " +
			datas.pages_list[datas.current_page_index];
		//log(1);
		byId("proj_name").innerHTML = datas.proj_name;
		byId("page_title").innerHTML =
			datas.pages_list[datas.current_page_index];


		project_panel.show_search_results();
		//log(3);


		project_panel.input_.oninput = function () {
			project_panel.show_search_results();
		};

		//log(4);

		page_styler.load_style_on_start();
		local_data_manager.show_last_opened();

		image_loader.load_image();

		modal_img.assign_modals_in_img();

		project_panel.show_search_results();
		page_styler.init();
		local_data_manager.set_last_manga();
		slider_control.init();
		pagination.pagination();
	}

	gen_data_set() {
		var data = {
			page_type: "CHAPTER",
			proj_name: datas.proj_name,
			images_loc: datas.images_loc,
			pages_list: datas.pages_list,
			current_page_index: datas.current_page_index,
			default_style: datas.default_style,
			discuss_id: datas.discuss_id,
		};
		return data;
	}

	dismiss() {
		byId("CHAPTER").style.display = "none";
	}
}

var chapter_handler = new Chapter_Handler();

class Chapter_List_Handler {
	constructor() {
		this.all_li = document.getElementById("allA");
	}
	init() { }

	switched_mode() {
		sidebar_control = null_func;
		byId("CHAPTER-LIST").style.display = "contents";
	}

	display_changes() {
		pagination.no_pagination();

		byId("manga_name").innerText = datas.proj_name;
		byId("manga-img").src = datas.poster_loc;
		byId("description-text").innerHTML = datas.description;

		tools.del_child("tag-list");
		tools.del_child("manga-stars");

		for (var i = 0; i < datas.tags.length; i++) {
			var tag = document.createElement("span");
			tag.className = "tag";
			tag.innerText = datas.tags[i];
			let tag_ = datas.tags[i];
			tag.onclick = function () {
				alert(tag_);
				handle_json_request("/tags/" + tag_);
			};
			byId("tag-list").appendChild(tag);
			if (i != datas.tags.length - 1) {
				var comma = document.createElement("span");
				comma.innerText = ", ";
				byId("tag-list").appendChild(comma);
			}
		}

		{
			for (let i = 0; i < Math.floor(datas.stars); i++) {
				var star = document.createElement("span");
				star.innerHTML = "&#9733;";
				byId("manga-stars").appendChild(star);
			}
			for (var i = 0; i < 5 - Math.floor(datas.stars); i++) {
				var star = createElement("span");
				star.innerHTML = "&#9734;";
				byId("manga-stars").appendChild(star);
			}

			var star_text = createElement("span");
			star_text.innerText = " (" + datas.stars + "/5)";
			byId("manga-stars").appendChild(star_text);
		}

		// byId("tg-list")

		local_data_manager.show_last_opened();

		tools.del_child("allA");


		for (let i = 0; i < datas.pages_list.length; i++) {
			var loc = createElement("a");
			var box = createElement("div");
			box.classList.add("ch-search-item");
			box.classList.add("ch-list-item");
			loc.appendChild(box);
			if (i % 2 == 1) {
				box.classList.add("ch-search-item-odd");
			} else {
				box.classList.add("ch-search-item-even");
			}
			loc.href = "./index.html?page=" + i;
			loc.onclick = function (evt) {
				evt.preventDefault();
				datas.current_page_index = i;
				datas.last_opened = datas.current_page_index;
				local_data_manager.update_data();
				handle_json_request(this.href);
			}


			box.innerText = datas.pages_list[i];
			this.all_li.appendChild(loc);
		}


	}

	gen_data_set() {
		var data = {
			page_type: "CHAPTER-LIST",
			proj_name: datas.proj_name,
			pages_list: datas.pages_list,
			new_pages: datas.new_pages,
			description: datas.description,
			tags: datas.tags,
			stars: datas.stars,
			default_style: datas.default_style,
			poster_loc: datas.poster_loc,
			discuss_id: datas.discuss_id,
		};
		return data;
	}

	dismiss() {
		byId("CHAPTER-LIST").style.display = "none";
		tools.del_child("tag-list");
		tools.del_child("allA");
		tools.del_child("manga-stars");
	}
}

var chapter_list_handler = new Chapter_List_Handler();

class PWA_Handler {
	constructor() {
		this.popup_msg_alt = new Popup_Msg();
		this.BUSY = false;
		this.dry = false;
	}

	push(data, link) {
		history.pushState(data, datas.current_page_name, link);
	}

	async dry_run(url=null){
		// get the query string from the URL with name "page"
		var query = ''
		if (url) {
			var urlObj = new URL(url, window.location.href);
			query = urlObj.search.substring(1);
		} else {
			query = window.location.search.substring(1);
		}

		// log(query)

		// split the query string into an array of key/value pairs
		var vars = query.split("&");
		// create an empty object
		var URLdata = {};
		// iterate over the key/value pairs
		for (var i = 0; i < vars.length; i++) {
			// split the key/value pair into an array
			var pair = vars[i].split("=");
			// add the key/value pair to the object
			URLdata[pair[0]] = pair[1];
		}

		var data = await datas.get_project_data();
		// log(data)
		if (!data) {
			return false;
		}



		if (URLdata.hasOwnProperty("page")) {
			var page_id = URLdata["page"];
			// convert the page_id to an integer
			page_id = parseInt(page_id);
			config.page_type = "CHAPTER";

			data = await datas.get_chapter_data(page_id);
			// console.log(data)
			if (!data) {
				return false;
			}
		} else {
			config.page_type = "CHAPTER-LIST";
		}

		// log(data)
		// log(config.page_type)

		data.page_type = config.page_type;

		var link = window.location.pathname;

		this.update(data, link, this.dry);
		this.dry = false;

		return data;
	}

	async update(data, link, dry_run = false) {
		//log(this.BUSY)
		if (this.BUSY) {
			return;
		}
		this.BUSY = true;
		if (!data) {
			document.location = link;
			return true;
		}
		await this.popup_msg_alt.createPopup(
			"",
			"<center><br><img class='loader' src='/assets/anim/loader-lite.png' onerror='alt_(this, [\"?assets/loader-lite.png\"])'></img></center>",
			false
		);
		await this.popup_msg_alt.open_popup();
		config.popup_msg_open = this.popup_msg_alt;
		await tools.sleep(200);
		datas.init();
		//log(data.page_type);
		// byId("logo").scrollIntoView({ behavior: "smooth" });
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		this.dismiss_others(data.page_type);

		// console.log(data)

		if (dry_run) {
			config.previous_type = config.current_type;
		}

		if (data.page_type == "CHAPTER") {
			if (dry_run) {
				chapter_handler.init();
			}
			if (config.previous_type != data.page_type) {
				chapter_handler.switched_mode();
			}
			datas.images_loc = data.images_loc;
			datas.current_page_index = data.current_page_index;

			datas.set_page_name();

			datas.last_opened = datas.current_page_index;

			chapter_handler.display_data();

			await tools.sleep(500);
			await tools.sleep(500);
		} else if (data.page_type == "CHAPTER-LIST") {
			if (dry_run) {
				chapter_list_handler.init();
			}
			if (config.previous_type != data.page_type) {
				chapter_list_handler.switched_mode();
			}
			this.dismiss_others(data.page_type);
			datas.proj_name = data.proj_name;
			if (datas.current_page_index != -1){
				// make sure to save the last opened page
				datas.last_opened = datas.current_page_index ;
			}
			datas.current_page_index = -1;
			datas.pages_list = data.chapters;
			datas.default_style = data.default_style;
			datas.description = data.description;
			datas.tags = data.tags;
			datas.stars = data.stars;
			datas.poster_loc = data.poster_loc;

			//this.push(data, link)

			chapter_list_handler.display_changes();
			await tools.sleep(500);
		} else {
			this.popup_msg_alt.close();
			this.BUSY = false;
			return false;
		}

		this.popup_msg_alt.close();
		this.BUSY = false;
		return true;
	}

	dismiss_others(current) {
		if (current != "CHAPTER") //log("dismiss CHAPTER");
			chapter_handler.dismiss();
		if (current != "CHAPTER-LIST") chapter_list_handler.dismiss();
		//log("dismiss CHAPTER-list");
	}
}

var pwa_handler = new PWA_Handler();
pwa_handler.dry_run();


async function handle_json_request(link, ev = null) {
	if (ev) {
		ev.preventDefault();
	}
	if (pwa_handler.BUSY) { return }
	var data = await pwa_handler.dry_run(link);

	if (data) {
		history.pushState(data, datas.current_page_name, link);
		// change the page content
		return true;
	}
	// revert to normal navigaiton
	// console.alert("Fallback to normal navigation");
	document.location = link;
	return false;
}

//////////////////////////////////////////////////
// guard against browsers w/o pushState (beware Android 2 & iOS 4)
if (window.history && "pushState" in history) {
	// encapsulate with an IIFE
	(function () {
		// because JSHint told me to
		"use strict";

		// handle click on link
		var A = byName("a");
		for (var i = 0; i < A.length; i++) {
			A[i].onclick = function (evt) {
				// prevent normal navigation
				evt.preventDefault();

				handle_json_request(this.href);
			};
		}

		// handle forward/back buttons
		window.onpopstate = async function (evt) {
			evt.preventDefault();

			// guard against popstate event on chrome init
			//log(evt.state)
			if (config.popup_msg_open) {
				config.popup_msg_open.close();
			}
			if (evt.state) {
				// get the state and change the page content

				if (
					await pwa_handler.update(evt.state, document.location.href)
				) {
					return;
				}
			}
			location.reload();
		};

		// create state on page init and replace the current history with it
		var data;
		if (config.page_type == "CHAPTER") {
			data = chapter_handler.gen_data_set();
		} else if (config.page_type == "CHAPTER-LIST") {
			data = chapter_list_handler.gen_data_set();
		} else {
			data = false;
		}
		//log(data);

		history.replaceState(data, document.title, document.location.href);
	})();
}
