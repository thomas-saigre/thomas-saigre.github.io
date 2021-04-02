---
title: "Résolution du problème isopérimétrique"
excerpt: "Étude des transferts de chaleur et d'humidité dans les parois poreuses, et simulation<br/><img src='/images/didon/didon.png'>"
collection: portfolio
permalink: /portfolio/didon
---

**Deuxième semestre 2019-2020 :** projet dans le cadre de l'UE d'optimisation au S2 du master CSMI, avec M. Privat.

**Sujet :** Résolution du problème isopérimétrique

Travail effectué en binôme avec Romain Vallet.

Nous étudions ici le problème isopérimétrique, c'est-à-dire que l'on cherche à maximiser l'aire d'un domaine pour un périmètre donné.

Une étude analytique de ce problème est menée dans un premier temps, utilisant de l'analyse complexe.

Ensuite, une implémentation d'un cas particulier de problème isopérimétrique est faite, le [problème de la reine Didon](https://fr.wikipedia.org/wiki/Isop%C3%A9rim%C3%A9trie#Fragments_d'histoire), en utilisant une méthode d'Uzawa.

Avec des conditions bien précises, le solution au problème de Didon est un demi-cercle, ce qui est bien que ce nous donne l'algorithme itératif :

<img src='/images/didon/didon.png'>


Le contenu du travail effectué peut être trouvé sur le [dépôt Github](https://github.com/thomas-saigre/isoperimetrique).


**Bonus :** dans le cadre de l'UE contrôle optimal du S3 du master, nous avons vu une autre [méthode](https://1drv.ms/b/s!ApKvfpopznQZiLwqccF4nBFR9oZxqg) pour résoudre le problème, en utilisant le principe du  maximum de Pontryagin (travail effectué en binôme avec Philippe Pinçon). D'autres résultats numériques, obtenus avec la librairie Gekko sont donnés ici.