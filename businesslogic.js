window.onload = function () {
    const COOKIE_EXPIRE_DATE = 2000000000;
	const allowedContent = 'h1 h2 h3 p blockquote strong em;' +
    'a[href,data-*];script[src!,async,defer,type];' +
    'img(left,right)[!src,alt,width,height];';
    // https://stackoverflow.com/questions/3620116/get-css-path-from-dom-element/12222317#12222317
    var cssPath = function (el) {
        if (!(el instanceof Element))
            return;
        var path = [];
        while (el.nodeType === Node.ELEMENT_NODE) {
            var selector = el.nodeName.toLowerCase();
            if (el.id) {
                selector += '#' + el.id;
                path.unshift(selector);
                break;
            } else {
                var sib = el, nth = 1;
                while (sib = sib.previousElementSibling) {
                    if (sib.nodeName.toLowerCase() == selector)
                        nth++;
                }
                if (nth != 1)
                    selector += ":nth-of-type(" + nth + ")";
            }
            path.unshift(selector);
            el = el.parentNode;
        }
        return path.join(" > ");
    }
	
    var textareas = document.getElementsByTagName('textarea');

    for (i = 0; i < textareas.length; i++) {
        let cur = textareas[i];
        let editor;
        let btn = document.createElement("button");
        let textboxId = window.location.search + cssPath(cur);

        function create(e) {
            if (e)
                e.preventDefault();
            editor = CKEDITOR.replace(cur,{
			allowedContent:allowedContent
			});
            btn.innerText = "Close visual editor";
            btn.onclick = destroy;
            Cookies.set(textboxId, 'enabled', { path: '', expires: COOKIE_EXPIRE_DATE })
        }

        function destroy(e) {
            if (e)
                e.preventDefault();
            if (editor)
                editor.destroy();
            btn.innerText = "Open visual editor";
            btn.onclick = create;
            Cookies.set(textboxId, 'disabled', { path: '', expires: COOKIE_EXPIRE_DATE })
        }

        let curCookieVal = Cookies.get(textboxId, { path: '' });
        if (curCookieVal == 'enabled')
            create();
        else
            destroy()

        var next = cur.nextSibling;
        if (next === undefined)
            next = null;

        cur.parentNode.insertBefore(btn, cur);
    }
};