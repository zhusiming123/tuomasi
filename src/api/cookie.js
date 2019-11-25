
export const setCookie = (key, value, options) => {
	// 如果没有传递 value ，则表示根据 key 读取 cookie 值
	if (typeof value === "undefined") { // 读取
		// 获取当前域下所有的 cookie，保存到 cookies 数组中
		var cookies = document.cookie.split("; ");
		// 遍历 cookies 数组中的每个元素
		for (var i = 0, len = cookies.length; i < len; i++) {
			var cookie = cookies[i].split("=");
			if (decodeURIComponent(cookie[0]) === key) {
				return decodeURIComponent(cookie[1]);
			}
		}
		return null;
	}
 
	options = options || {};
	var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	// 失效时间
	if ((typeof options.expires) !== "undefined") { // 有配置失效时间
		var d = new Date();
		if (typeof options.expires === "number") { // 失效时间为数字
			d.setTime(d.getTime() + (options.expires*60*1000))
		} 
		cookie += ";expires=" + d.toUTCString();
	}
	// 路径
	if (typeof options.path !== "undefined")
		cookie += ";path=" + options.path;
	// 域名
	if (typeof options.domain !== "undefined")
		cookie += ";domain=" + options.domain;
	// 安全连接
	if (options.secure)
		cookie += ";secure";
	// 保存
	document.cookie = cookie;
}