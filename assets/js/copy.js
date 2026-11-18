// Fügt jedem Codeblock einen "Kopieren"-Knopf hinzu.
(function () {
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    var ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } finally { document.body.removeChild(ta); }
    return Promise.resolve();
  }
  document.querySelectorAll("pre").forEach(function (pre) {
    var box = pre.parentElement;
    if (!box.classList.contains("highlight")) {
      box = document.createElement("div");
      box.className = "highlight";
      pre.parentNode.insertBefore(box, pre);
      box.appendChild(pre);
    }
    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "copy-btn"; btn.textContent = "Kopieren";
    btn.addEventListener("click", function () {
      var code = pre.querySelector("code") || pre;
      copy(code.innerText.replace(/\n$/, "")).then(function () {
        btn.textContent = "Kopiert ✓";
      }, function () {
        btn.textContent = "Fehler";
      }).then(function () {
        setTimeout(function () { btn.textContent = "Kopieren"; }, 1500);
      });
    });
    box.appendChild(btn);
  });
})();
