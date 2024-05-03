---
---
/***This is https://jekyllrb.com/docs/front-matter/ Write javascript under this line***/

// Init translations object
var t = {{ site.t.js | jsonify }};
var pageLang = "fi";
window.t = t;
window.pageLang = pageLang;

