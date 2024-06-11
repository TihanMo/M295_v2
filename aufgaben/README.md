# Modul 295 Aufgaben

## Aufgabe 1.1: Node.js Entwicklungsumgebung einrichten

Installieren Sie eine Node.js Entwicklungsumgebung
Erstellen Sie ein Hello World-Programm `hello.js` in der Entwicklungsumgebung.
console.log("Hello, World");
Führen Sie das Programm in der Konsole aus: `node hello.js`.

## Aufgabe 1.2: Learn You The Node

Um `learnyounode` zu installieren und auszuführen, geben Sie folgenden Befehl in der Konsole ein:
`# mit npm`
npm install -g learnyounode;
Bearbeiten Sie mindestens die folgenden Aufgaben:
BABY STEPS
MY FIRST I/O!
MY FIRST ASYNC I/O
FILTERED LS
HTTP CLIENT
HTTP COLLECT
JUGGLING ASYNC
TIME SERVER

## Aufgabe 2.1: Callbacks in JavaScript

Erstellen Sie eine Funktion, die eine Zahl verdoppelt und das Ergebnis an eine Callback-Funktion übergibt.

Schreiben Sie eine Funktion verdoppeln(zahl, callback).
Die Funktion soll zahl verdoppeln.
Anschliessend soll die callback-Funktion aufgerufen werden.
Die callback-Funktion soll das Ergebnis ausgeben:

verdoppeln(5, function(ergebnis) {
console.log('Das Ergebnis ist:', ergebnis);
});

Erwartete Ausgabe: "Das Ergebnis ist: 10"

## Aufgabe 2.2: Promises in JavaScript

Erstellen Sie eine Funktion, die mit Hilfe von Promises den Inhalt einer Datei ausliest und dann dessen Länge ausgibt.

Verwenden Sie das fs Modul von Node.js mit const fs = require('node:fs');
Schreiben Sie eine Funktion leseDateiInhalt(filepath).
Die Funktion soll den Dateiinhalt als Promise zurückgeben.
Verarbeiten Sie die Promise, um die Länge des Dateiinhalts auszugeben.

Beispielaufruf
javascript const fs = require('node:fs');

// Implementierung...

leseDateiInhalt('beispiel.txt')
.then(inhalt => { console.log('Die Länge des Dateiinhalts beträgt:', inhalt.length);
})
.catch(err => { console.error('Fehler beim Lesen der Datei:', err);
});

## Aufgabe 2.3: Async/Await in JavaScript

Erstellen Sie eine asynchrone Funktion, die zwei Zahlen nach einer simulierten Verzögerung addiert und das Ergebnis ausgibt.

Schreiben Sie eine asynchrone Funktion simuliereVerzoegerung(ms).
Die Funktion soll eine Verzögerung von ms Millisekunden simulieren.
Schreiben Sie eine asynchrone Funktion addiereNachVerzoegerung(a, b, ms).
Die Funktion soll nach der Verzögerung `a` und `b` addieren und das Ergebnis ausgeben.

Beispielaufruf
addiereNachVerzoegerung(3, 7, 2000);

Erwartete Ausgabe nach 2 Sekunden: "Das Ergebnis ist: 10".

## Aufgabe 3.1: Hello World über HTTP mit Express

Erstellen Sie einen HTTP Server mit NodeJS und Express, welcher mit "Hello World!" antwortet:

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
response.send('Hello World!');
});

app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
});

## Aufgabe 3.2: Wetterdaten abrufen

Erstellen Sie einen Endpunkt, welche die Temperatur von einem in der URL übergebenen Standort zurück gibt.
Die API ist über folgende URL verfügbar: https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=818000, wobei
Die ersten 4-Zahlen des Query Parameters entsprechen der Postleitzahl.

const url = "https://jsonplaceholder.typicode.com/posts/1/comments";


try {
const response = await fetch(url)
if (response.code !== 200) {
console.error(response.code)
}
else {
const data = await response.json()
console.log(data)
}
} catch(error) {
console.error(error)
}

## Aufgabe 3.3: HTTP-Endpunkte umsetzen 1

Implementieren Sie folgende Endpunkte mit express.js. Beachten Sie dabei die korrekten HTTP Status-Codes und Content-Types in den Header zu definieren.

Einen Endpunkt /now, der die aktuelle Zeit zurück gibt.
Einen Endpunkt /zli, der den Benutzer auf die ZLI Webseite https://www.zli.ch weiterleitet.
Einen Endpunkt /name, der aus einer Liste von mindestens 20 Namen einen auswählt und zurückgibt.
Einen Endpunkt /html, der statisches HTML aus einer Datei vom Server zurück gibt.
Einen Endpunkt /image, der ein Bild zurückgibt, welches im Browser angezeigt wird.
Einen Endpunkt /teapot, der den Status 418 zurück gibt.
Einen Endpunkt /user-agent, der den Browser aus dem Request ausliest und zurück gibt.
Einen Endpunkt /secret, der immer den Status 403 zurück gibt.
Einen Endpunkt /xml, der eine statische XML Datei vom Server zurück gibt.
Einen Endpunkt /me, der ein JSON Objekt zurück gibt mit den Properties Vor- und Nachname, Alter, Wohnort und Augenfarbe.

## Aufgabe 4.1: HTTP Tools ausprobieren

Machen Sie sich mit einem HTTP Tool wie Hoppscotch oder Postman vertraut.

Installieren die das Tool, bzw. deren Browser-Extesions, falls nötig
Untersuchen Sie das User-Interface und finden Sie heraus:
Was kann man mit dem Tool grundsätzlich alles machen?
Was kann man für Einstellungen machen? Was bewirken die?
Wie kann man Anfragen speichern und wieder laden?

Machen Sie mit dem Tool verschiedene Abfragen im WWW. Untersuchen Sie auch die Response genau:
Fragen Sie die Webseite Ihres Betriebs oder von https://www.zli.ch als HTML ab
Fragen Sie die Webseite Ihres Betriebs oder von https://www.zli.ch als so ab, dass ein HTTP Status 404 zurück gegeben wird
Fragen Sie ein Bild mit einem GET Request von https://picsum.photos ab
Fragen Sie die Daten eines Pokémons von der https://pokeapi.co als JSON ab
Fragen Sie einen random Fact von https://cat-fact.herokuapp.com ab
Fragen Sie die Posts von https://jsonplaceholder.typicode.com als JSON ab
Erstellen Sie nun hier selbst einen neuen Post mit einem POST Request

## Aufgabe 4.2: HTTP-Endpunkte umsetzen 2

Experimentieren Sie mit den Request und Response Objekten und implementieren Sie verschiedene Endpunkte. Erweitern Sie die bereits erstellten Endpunkte der letzten Aufgabe. Achten Sie auf korrekte Status-Codes und Content-Types.

Einen Endpunkt GET /now, der die aktuelle Zeit zurück gibt. Per Parameter ?tz= kann die Zeitzone ausgewählt werden (z.B. "Europe/Zurich").  
Einen Endpunkt POST /names, welcher der Namensliste einen Eintrag hinzufügt. Der Name wird per Form mitgegeben  
Einen Endpunkt DELETE /names, der den Eintrag aus der Namensliste entfernt und dann 204 zurück gibt. Der Name wird per Query mitgegeben  
Einen Endpunkt GET /secret2, der den Header "Authorization" ausliest und 200 zurück gibt, wenn im Header "Basic aGFja2VyOjEyMzQ=" steht und ansonsten 401 zurück gibt  
Einen Endpunkt GET /chuck, welcher einen zufälligen Witz von der Chuck Norris API abfragt. Im Text wird "Chuck Norris" dann durch den Wert ersetzt, der per Query Paramter ?name= mitegegeben wurde  
Einen Endpunkt PATCH /me, der ein JSON Objekt entgegennimmt und die Werte, die mitgegeben wurden, im bisherigen me-Objekt überschreiben  