/* Affiche « Last updated : <date> » en bas de chaque page.
   Les dates viennent de assets/last-updated.json, généré avant le build
   par scripts/gen_last_updated.py (date du dernier commit git de chaque page). */
(function () {
  var cache = null;
  var ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 13.1c-.1 0-.3.1-.4.2l-1 1 2.1 2.1 1-1c.2-.2.2-.6 0-.8l-1.3-1.3c-.1-.1-.2-.2-.4-.2m-1.9 1.8-6.1 6V23h2.1l6.1-6.1zM12.5 7v5.2l4 2.4-1 1L11 13V7zM11 21.9c-5.1-.5-9-4.8-9-9.9C2 6.5 6.5 2 12 2c5.3 0 9.6 4.1 10 9.3-.3-.1-.6-.2-1-.2s-.7.1-1 .2C19.6 7.2 16.2 4 12 4c-4.4 0-8 3.6-8 8 0 4.1 3.1 7.5 7.1 7.9l-.1.2z"/></svg>';

  function load(base) {
    if (!cache) {
      var url = new URL("assets/last-updated.json", base);
      cache = fetch(url)
        .then(function (r) {
          if (!r.ok) {
            console.warn("[last-updated] " + url + " introuvable (HTTP " + r.status +
              ") : lancer scripts/gen_last_updated.py avant le build.");
            return {};
          }
          return r.json();
        })
        .catch(function (e) {
          console.warn("[last-updated] lecture de " + url + " impossible :", e);
          return {};
        });
    }
    return cache;
  }

  function render() {
    var article = document.querySelector("article.md-content__inner");
    if (!article) {
      console.warn("[last-updated] article.md-content__inner introuvable.");
      return;
    }

    // Chemin de la page relatif à la racine du site (ex. "research/", "" pour l'accueil)
    var scope = typeof __md_scope !== "undefined" ? __md_scope : new URL("/", location);
    var key = decodeURIComponent(location.pathname)
      .slice(decodeURIComponent(scope.pathname).length)
      .replace(/index\.html$/, "");

    load(scope).then(function (dates) {
      var iso = dates[key];
      if (!iso) {
        console.warn('[last-updated] pas de date pour la clé "' + key +
          '". Clés disponibles :', Object.keys(dates));
        return;
      }

      var old = article.querySelector(".md-source-file");
      if (old) old.remove();

      var lang = document.documentElement.lang || "en";
      var text = new Date(iso).toLocaleDateString(lang, {
        year: "numeric", month: "long", day: "numeric"
      });

      var aside = document.createElement("aside");
      aside.className = "md-source-file";
      var fact = document.createElement("span");
      fact.className = "md-source-file__fact";
      // Icône horloge + crayon (material/clock-edit-outline), comme le plugin MkDocs
      var icon = document.createElement("span");
      icon.className = "md-icon";
      icon.title = "Last update";
      icon.innerHTML = ICON;
      fact.appendChild(icon);
      fact.appendChild(document.createTextNode(" "));
      var time = document.createElement("time");
      time.dateTime = iso;
      time.textContent = text;
      fact.appendChild(time);
      aside.appendChild(fact);
      article.appendChild(aside);
    });
  }

  // document$ est fourni par le thème (compatible navigation.instant)
  if (typeof document$ !== "undefined") document$.subscribe(render);
  else document.addEventListener("DOMContentLoaded", render);
})();