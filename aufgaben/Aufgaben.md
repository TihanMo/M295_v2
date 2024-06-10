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