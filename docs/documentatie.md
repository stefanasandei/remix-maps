# InfoEducatie Maps

Proiectul are doua componente principale:
 - frontend: Redux, Remix, TypeScript, Tailwind, Leaflet 
 - backend: Python, Flask, OpenCV, YOLOv3 

 ## Frontend

 Exista doua pagini: "/" (sistem GPS pentru harta lumii, nu apeleaza backend-ul ci in schimb foloseste API-ul OpenStreetMap) si "/bucharest" (harta a Bucurestiului ce comunica cu backend-ul pentru feed live din camere, identificarea traficului si generarea rutelor).

 Privind accesibilitatea, interfata este responsive, continutul adaptandu-se si pentru desktop cat si pentru telefoane. Contrastul dintre elemente este optim, iar imaginele contint tag-ul "alt", pentru a optimiza folosirea unui screen reader. Harta poate fi utilizata si prin intermediul mouse/tastatura cat si prin touch. 
 
 Utilizatorii pot alege intre romana si engleza.

 Locatiile pot fi cautate folosind limbaj natural.

 ## Backend

 Un server Flask are mai multe cai, pentru identificarea masinilor din feed-ul camerelor si pentru generarea rutelor.

 Pentru camerele de filmare:
  - daca timpul dintre doua request-uri pentru a cere datele camerelor este mai mare de o mie de secunde, va fi rulat din nou algoritmul de identificare a masinilor
- imaginile si metadata sunt stocate intr-un cache local si sunt folosite intre regenerari
- este folosit modelul YOLOv3 pentru a detecta masinile din imagine
- imaginile sunt procesate in paralel

Din punct de vedere al securitatii, una din caile API ("/cache?path=") are ca argument calea catre un fisier din cache, ce continte imaginea de la camera procesata. Utilizatorul ar trebui sa foloseasca ca "path" doar una din valorile returnate de calea "/cameras", daca acesta nu este cazul, calea este verificata si curatata astfel incat backend-ul sa nu returneze un fisier la care utilizatorul nu are acces.

Comunicarea dintre backend si frontend se face folosind formatul JSON.
