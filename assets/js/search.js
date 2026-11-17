// Einfache Volltextsuche ohne Abhängigkeiten. Index: /index.json (von Hugo erzeugt).
(function () {
  var script = document.currentScript;
  var input = document.getElementById("q");
  var list = document.getElementById("results");
  var status = document.getElementById("status");
  var index = null;

  function norm(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function score(item, terms) {
    var title = norm(item.title), tags = norm(item.tags.join(" ")),
        summary = norm(item.summary), body = norm(item.content), total = 0;
    for (var i = 0; i < terms.length; i++) {
      var t = terms[i], s = 0;
      if (title.indexOf(t) !== -1) s += 10;
      if (tags.indexOf(t) !== -1) s += 5;
      if (summary.indexOf(t) !== -1) s += 3;
      if (body.indexOf(t) !== -1) s += 1;
      if (s === 0) return 0; // alle Begriffe müssen vorkommen
      total += s;
    }
    return total;
  }

  function render(q) {
    list.replaceChildren();
    var terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) { status.textContent = ""; return; }
    var hits = index
      .map(function (item) { return { item: item, s: score(item, terms) }; })
      .filter(function (h) { return h.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 50);
    status.textContent = hits.length + " Treffer";
    hits.forEach(function (h) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = h.item.url; a.textContent = h.item.title;
      var meta = document.createElement("span");
      meta.className = "meta"; meta.textContent = " · " + h.item.section;
      var p = document.createElement("p");
      p.className = "summary"; p.textContent = h.item.summary;
      li.append(a, meta, p);
      list.append(li);
    });
  }

  function update() {
    var q = input.value;
    var url = new URL(location.href);
    if (q) url.searchParams.set("q", q); else url.searchParams.delete("q");
    history.replaceState(null, "", url);
    render(q);
  }

  status.textContent = "Lade Suchindex …";
  fetch(script.dataset.index)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      index = data;
      status.textContent = "";
      input.value = new URL(location.href).searchParams.get("q") || "";
      input.addEventListener("input", update);
      render(input.value);
    })
    .catch(function () { status.textContent = "Suchindex konnte nicht geladen werden."; });
})();
