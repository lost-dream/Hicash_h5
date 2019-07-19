!(function(d) {
	var e,
		n =
			'<svg><symbol id="icon-history" viewBox="0 0 1024 1024"><path d="M876.8 709.12H738.56V591.36c0-15.36-10.24-25.6-25.6-25.6-15.36 0-25.6 10.24-25.6 25.6v143.36c0 15.36 10.24 25.6 25.6 25.6H876.8c15.36 0 25.6-10.24 25.6-25.6s-12.8-25.6-25.6-25.6zM705.28 463.36c-153.6 0-279.04 125.44-279.04 279.04 0 153.6 125.44 279.04 279.04 279.04 153.6 0 279.04-125.44 279.04-279.04 0-153.6-125.44-276.48-279.04-279.04z m0 506.88c-125.44 0-227.84-102.4-227.84-227.84s102.4-227.84 227.84-227.84 227.84 102.4 227.84 227.84c-2.56 128-102.4 227.84-227.84 227.84z m25.6-622.08c0-15.36-10.24-25.6-25.6-25.6h-473.6c-15.36 0-25.6 10.24-25.6 25.6 0 15.36 10.24 25.6 25.6 25.6h473.6c12.8 0 25.6-10.24 25.6-25.6z m-307.2 207.36c0-15.36-10.24-25.6-25.6-25.6h-166.4c-15.36 0-25.6 10.24-25.6 25.6s10.24 25.6 25.6 25.6h166.4c15.36 0 25.6-12.8 25.6-25.6z m-192 153.6c-15.36 0-25.6 10.24-25.6 25.6s10.24 25.6 25.6 25.6h128c15.36 0 25.6-10.24 25.6-25.6s-10.24-25.6-25.6-25.6h-128zM482.56 972.8H90.88V51.2h174.08v38.4c0 33.28 25.6 64 58.88 64 12.8 0 343.04 2.56 373.76 0 33.28 0 58.88-28.16 56.32-61.44v-38.4H928v437.76c0 15.36 10.24 25.6 25.6 25.6 15.36 0 25.6-10.24 25.6-25.6V28.16c0-15.36-10.24-25.6-25.6-25.6H728.32c-15.36 0-25.6 10.24-25.6 25.6v64c0 7.68-5.12 12.8-10.24 12.8H326.4c-7.68 0-12.8-5.12-12.8-12.8V25.6C313.6 10.24 303.36 0 288 0H65.28c-15.36 0-25.6 10.24-25.6 25.6v972.8c0 15.36 10.24 25.6 25.6 25.6h417.28c15.36 0 25.6-10.24 25.6-25.6 0-15.36-12.8-25.6-25.6-25.6zM395.52 51.2h230.4c15.36 0 25.6-10.24 25.6-25.6 0-15.36-10.24-25.6-25.6-25.6h-230.4c-15.36 0-25.6 10.24-25.6 25.6 0 15.36 12.8 25.6 25.6 25.6z" fill="#333333" ></path></symbol></svg>',
		t = (e = document.getElementsByTagName("script"))[e.length - 1].getAttribute(
			"data-injectcss"
		)
	if (t && !d.__iconfont__svg__cssinject__) {
		d.__iconfont__svg__cssinject__ = !0
		try {
			document.write(
				"<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
			)
		} catch (e) {
			console && console.log(e)
		}
	}
	!(function(e) {
		if (document.addEventListener)
			if (~["complete", "loaded", "interactive"].indexOf(document.readyState))
				setTimeout(e, 0)
			else {
				var t = function() {
					document.removeEventListener("DOMContentLoaded", t, !1), e()
				}
				document.addEventListener("DOMContentLoaded", t, !1)
			}
		else
			document.attachEvent &&
				((n = e),
				(c = d.document),
				(o = !1),
				(i = function() {
					o || ((o = !0), n())
				}),
				(s = function() {
					try {
						c.documentElement.doScroll("left")
					} catch (e) {
						return void setTimeout(s, 50)
					}
					i()
				})(),
				(c.onreadystatechange = function() {
					c.readyState == "complete" && ((c.onreadystatechange = null), i())
				}))
		var n, c, o, i, s
	})(function() {
		var e, t
		;((e = document.createElement("div")).innerHTML = n),
			(n = null),
			(t = e.getElementsByTagName("svg")[0]) &&
				(t.setAttribute("aria-hidden", "true"),
				(t.style.position = "absolute"),
				(t.style.width = 0),
				(t.style.height = 0),
				(t.style.overflow = "hidden"),
				(function(e, t) {
					t.firstChild
						? (function(e, t) {
								t.parentNode.insertBefore(e, t)
						  })(e, t.firstChild)
						: t.appendChild(e)
				})(t, document.body))
	})
})(window)
