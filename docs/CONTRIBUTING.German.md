# Beitrag zur Entwicklung von React Social Network

Wir freuen uns über Pull Requests (PR's) sowie über Leute, die an der Behebung der aktuellen Probleme arbeiten. Wenn Sie neu zu diesem Projekt kommen und Sie ein Problem mit dieser App bemerken, können Sie gerne einen Fehler (Issue) öffnen.

Viele Entwickler ziehen es vor, zu fragen, ob sie einen Beitrag leisten oder fragen in den Kommentaren einer Issue ob Sie die Aufgabe zugewiesen bekommen können. Das ist großartig. Wir haben eine strikte No-Gate-Keeping-Politik in allen diesen Projekten. 
Sie sind herzlich eingeladen, an jeder Aufgabe/jedem Problem zu arbeiten. Lassen Sie uns einfach wissen, dass Sie an einem Problem arbeiten werden.
Wenn Sie sich mit dem Stil und dem Design nicht sicher sind, gibt es hier eine Issue: <https://github.com/gbowne1/reactsocialnetwork/discussions/36>. Wenn Sie glauben, dass Sie länger als 72 Stunden brauchen werden, um eine PR einzureichen, sagen Sie uns Bescheid, damit die Issues nicht verstauben.

Einige Aufgaben sind möglicherweise nicht anfängerfreundlich, auch wenn sie als `good first issue` gekennzeichnet sind. Wenn Sie ein Anfänger sind, gibt es kleinere Aufgaben, an denen ein Anfänger arbeiten kann, wie z.B. Style-Probleme.

Sie sollten bereits mit React 17 und/oder 18, JavaScript ES5/ES6/ES7 vertraut sein.

## Stil

Ich habe noch keinen offiziellen Style Guide erstellt. Wenn jemand einen Style Guide für uns erstellen möchte. Erstellen Sie eine Diskussion.

Das Layout ist ein 3-Spalten-Layout, beginnend mit der Desktop-Ansicht mit einem 200-250px linken Panel, 1400-1500px mittleren Panel und einem 200-250px rechten Panel, ähnlich der Desktop-Ansicht von Facebook, wenn man auf die Root '/' schaut.

## Entwicklung

Wenn Sie nicht sicher sind, woran Sie arbeiten sollen, sehen Sie sich die Liste der Probleme an. Es gibt auch TODOs, die in der enthaltenen TODO.md Datei aufgelistet sind.

**Hinweis:** Falls Sie ein UI bauen müssen, können Sie eine unserer [wiederverwendbaren Komponenten](REUSABLE_COMPONENTS.md) verwenden (zu finden unter [src/components](../src/components) ), um das Rad nicht neu erfinden zu müssen.

### PR's

Wenn Sie einen PR auf GitHub erstellen, vergewissern Sie sich bitte, dass Sie den Abschnitt auf der rechten Seite, Assignees, Reviewers, Labels, Projects, Milestone(s) und Development ausfüllen, bevor Sie den PR einreichen. Bitte teilen Sie auch einen Screenshot mit oder zeigen Sie die funktionierende Korrektur in der Pull Request Nachricht und eine kurze Beschreibung dessen, was Sie behoben haben. Leere Probleme und Beschreibungen können nicht zusammengeführt werden.

- Verknüpfen Sie ein Problem mit der Entwicklung, das durch den PR geschlossen wird.
- Stellen Sie sicher, dass Sie einen Reviewer taggen, z.B. @gbowne1
- Wählen Sie geeignete Labels aus Labels
- Stellen Sie sicher, dass Sie der Empfänger des PR sind.
- Meilenstein, wählen Sie Frontend oder Backend (mehr dazu vielleicht später)

### Issues

@gbowne1 wird die Benutzer nach dem Prinzip "Wer zuerst kommt, mahlt zuerst" zuweisen. In Zukunft möchte ich, dass sich mindestens 2 Personen um das Frontend und 2 Personen um das Backend kümmern. Dann können wir bestimmte Gruppen von Personen zuweisen, die sich um Dinge wie CSS, Komponenten usw. kümmern.

## Editor & IDE

Das Repository enthält Ordner mit projektspezifischen Einstellungen und Konfigurationen für Visual Studio und Visual Studio Code, aber darüber hinaus sind wir Tool- und Editor/IDE-unabhängig, so dass Sie jeden beliebigen Editor oder IDE verwenden können.

## Einstellungen & Konfiguration

Die enthaltenen Workspaces, Einstellungen, Konfigurationen und Plugins sind für:

Babel
Webpack
ESLint
Prettier
VSCode (.vscode)
Visual Studio 2019+ (.vs)
GitHub (.github)

Diese sind möglicherweise nicht zu 100 % korrekt. Wenn Sie also dazu beitragen können, sie für die React-Entwicklung genauer zu machen, ist das willkommen.

## Tech Stack

Dieses Projekt wurde mit Create React App gebootstrapped.
Diese Applikation wurde entwickelt mit:

- React 18.0 - 18.2
- CSS3
- JavaScript (ES5/ES6/ES7/ES2015/etc.)
- Node
- Express
- Material UI v5.11.6

## Branches

Unsere Zweige folgen GitFlow / GitHub Flow als allgemeine Regel.

- [ main ] Hauptarbeitszweig
- [ master ] Permanent // Archivzweig
- [ test ] ungetesteter Code
- Feature Branch # of feature - {feature}
- [bugfix - { behobener Fehler }]
- [hotfix - { fix }]

Verwenden Sie einen Testzweig, um Code zu übertragen, von dem Sie glauben, dass er funktionieren sollte, der aber nicht vollständig getestet ist.
