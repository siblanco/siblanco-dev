---
isDraft: false
title: Komponenten dynamisch importieren in React
description: Importiere nur die Komponenten, die du wirklich brauchst
date: 2020-07-05T12:04:00
tags: ["reactjs"]
---

Angenommen du baust einen Pagebuilder, welcher über eine API gefüttert wird. Das JSON sieht bspw. so aus:

```json
{
  "components": [
    {
      "name": "Header",
      "props": {
        "title": "This is my header",
        "image": "catdog.jpg"
      }
    },
    {
      "name": "Image",
      "props": {
        "path": "tree.jpg",
        "fullWidth": true
      }
    }
  ]
}
```

Ziel ist es, die Komponenten `Header.js` und `Image.js` zu rendern. Du könntest jetzt wie folgt vorgehen:

```jsx
// home.jsx
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Image from './components/Image';

const Home = () => {
    const [pageData, setPageData] = useState(null);

    // API requesten um zu wissen, welche Komponenten wir brauchen
    // error handling lasse ich jetzt mal raus
    useEffect(() => {
        const loadPageData = async() => {
            const response = await fetch('/api/page-home');
            const content = await response.json();

            // unsere Komponenten sind in content.components (siehe oben das JSON Beispiel)
            setPageData(content);
        }

        loadPageData();
    }, []);

    return (

            {pageData.components.map((component) => {
                // react Komponenten müssen mit einem großen Buchstaben beginnen
                // daher Wrapper
                const Wrapper = component.name;
                <Wrapper {...component.props} />
            })}

    )
}
```

Ok, cool…wir rendern jetzt die Komponenten, die unsere API vorgibt. Aber was ist, wenn wir 50 Komponenten haben? Sollen wir alle 50 Komponenten importieren, auch wenn wir nur 5 brauchen? Nein, das Pflegen macht echt keinen Spaß – „neue Komponente? Kein Problem, ich importiere sie und rebuilde das Projekt“ /s…nein, die Lösung ist, die Komponente, wie folgt, dynamisch zu importieren:

```jsx
// home.jsx
import { useState, useEffect } from 'react';

const Home = () => {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const loadPageData = async() => {
            const response = await fetch('/api/page-home');
            const content = await response.json();
            return content;
        }

        const loadComponents = async () => {

            // wieder infos von der API holen, welche Komponenten wir brauchen
            const content = await loadPageData();

            const importedComponents = {};
            for (const component of content.components) {
                // haben wir die Komponente bereits importiert?
                if (importedComponents[component.name]) {
                    continue;
                }

                // falls nein, importieren wir sie
                const importedComponent = await import(`./components/${component.name}`);
                importedComponents[component.name] = importedComponent.default;
            }

            // nachdem wir alle Komponenten importiert haben
            // setzen wir den neuen State mit importierten Komponenten
            setPageData({
                content,
                importedComponents
            });
        };

        loadComponents();
    }, []);

    return (
      {pageData.content.components.map((component) => {
        // react Komponenten müssen mit einem großen Buchstaben beginnen
        // daher Wrapper
        const Wrapper = pageData.importedComponents[component.name];
        <Wrapper {...component.props} />
      })}
    )
}
```

Jetzt interessieren uns die vorgegebenen Komponenten von der API nicht mehr, wir importieren sie alle dynamisch. Natürlich solltest du noch evtl. auftretende Fehler behandeln (api request schlägt fehl, Komponenten gibt es gar nicht, etc.).
