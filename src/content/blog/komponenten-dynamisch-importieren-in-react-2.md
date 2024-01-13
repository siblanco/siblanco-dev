---
isDraft: false
title: Komponenten dynamisch importieren in React (2)
description: Importiere Komponenten dynamisch mithilfe von @loadable/components
date: 2020-07-22T11:00:08
tags: ["reactjs"]
---

In meinem letzten Beitrag habe ich einen Weg gezeigt, wie wir in React Komponenten dynamisch importieren können. Ich bin in der Zwischenzeit auf ein sehr nettes Package gestoßen, `@loadable/components`. Das kannst du hier finden: [https://github.com/gregberge/loadable-components](https://github.com/gregberge/loadable-components). Damit kannst du unseren kompletten `useEffect` Hook weglassen und Komponenten innerhalb deines Loops mit einer Zeile importieren:

```jsx
{
  content.components.map((component) => {
    const Wrapper = loadable(() => import(`../components/${component.name}`), {
      fallback: <Loader />,
    });

    return <Wrapper {...component.props} />;
  });
}
```
