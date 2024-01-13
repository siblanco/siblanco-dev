---
isDraft: false
title: React Native Background Timer mit Expo
description: Ein Weg zum Background-Timer mit bzw. trotz Expo.
date: 2021-01-01T12:41:09
tags: ["react-native", "reactjs", "typescript"]
---

Wenn du ejecten kannst / willst, dann nutzt du am besten das package React Native Background Timer ([https://github.com/ocetnik/react-native-background-timer](https://github.com/ocetnik/react-native-background-timer)). Wenn du aber nicht ejecten willst, gibt’s da einen kleinen Trick! Neben der BackgroundFetch API von Expo ([https://docs.expo.io/versions/latest/sdk/background-fetch/](https://docs.expo.io/versions/latest/sdk/background-fetch/)), können wir anhand vom AppState simulieren, dass unser Timer im Hintergrund weiterläuft. Die BackgroundFetch API von Expo habe ich nicht getestet, habe aber gelesen, dass die background-tasks nicht zuverlässig im angebenen Intervall erledigt werden.

Kommen wir zum „Trick“ mit dem AppState (danke für die Idee auch an [https://aloukissas.medium.com/how-to-build-a-background-timer-in-expo-react-native-without-ejecting-ea7d67478408](https://aloukissas.medium.com/how-to-build-a-background-timer-in-expo-react-native-without-ejecting-ea7d67478408) ):

```typescript
import { useEffect, useState, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

// die Sekunden die wir im Hintergrund weiter laufen lassen wollen
const [seconds, setSeconds] = useState(0);

// unser AppState
const appState = useRef(AppState.currentState);

useEffect(() => {
  AppState.addEventListener("change", handleAppStateChange);
  return () => AppState.removeEventListener("change", handleAppStateChange);
}, []);
```

Im useEffect Hook attachen wir einen Listener, welchen wir – wenn unsere Komponente unmounted – wieder enfernen. Kommen wir zur `handleAppStateChange` Funktion:

```typescript
const handleAppStateChange = async (nextAppState: AppStateStatus) => {
  if (appState.current === "background" && nextAppState === "active") {
    // Unsere App ist wieder im Vordergrund

    // kalkulieren wir die bisher vergangenen Sekunden
    const elapsedSeconds = await getElapsedSeconds();

    // unseren State updaten
    setSeconds(elapsedSeconds);
  }

  // unseren ref-value auf den aktuellen AppState setzen
  appState.current = nextAppState;
};
```

Cool, wir sehen jetzt, wann unsere App in den Vordergrund kommt bzw. in den Hintergrund geht! Unsere `getElapsedSeconds` Funktion holt sich den Startzeitpunkt des Timers aus dem AsyncStorage (du kannst natürlich den Storage deiner Wahl nutzen), welchen du beim Start des Timers speicherst und berechnet die seitdem vergangene Zeit (ich nutze dafür dayjs – [https://day.js.org/](https://day.js.org/) ):

```typescript
const getElapsedSeconds = async () => {
  try {
    const startTime = await AsyncStorage.getItem("timer-start");
    const now = dayjs();

    // Differenz in Sekunden
    return now.diff(startTime, "s");
  } catch (err) {
    // Fehler beim Lesen aus dem AsyncStorage
    console.warn(err);
  }
};
```

Ein bisschen komplexer wird es, wenn du auch eine Pause Funktion anbieten willst. Setze jedes mal eine neue Startzeit, wenn der Timer pausiert wird oder die App in den Hintergrund geht und berechne anhand dieser die bisher vergangenen Sekunden. Denk dann aber daran, dass du beim State-Update die bisherigen Sekunden dazu addierst. Dazu passen wir unsere Funktionen `getElapsedSeconds & handleAppStateChange` wie folgt an:

```typescript
const [pausedAt, setPausedAt] = useState(null);

const getElapsedSeconds = async () => {
  try {
    // gibt es eine neue Startzeit "pausedAt"? Dann nehme diese, ansonsten wie gehabt
    const startTime = pausedAt ?? (await AsyncStorage.getItem("timer-start"));
    const now = dayjs();

    // Differenz in Sekunden
    return now.diff(startTime, "s");
  } catch (err) {
    // Fehler beim Lesen aus dem AsyncStorage
    console.warn(err);
  }
};

const handleAppStateChange = async (nextAppState: AppStateStatus) => {
  if (appState.current === "background" && nextAppState === "active") {
    // Unsere App ist wieder im Vordergrund

    // kalkulieren wir die bisher vergangenen Sekunden
    const elapsedSeconds = await getElapsedSeconds();

    // unseren State updaten
    setSeconds((seconds) => {
      // falls wir einen neuen Startzeitpunkt haben, addieren wir die bisherigen Sekunden
      // mit den vergangenen
      if (pausedAt) return elapsedSeconds + seconds;

      // ansonsten wie gehabt
      return elapsedSeconds;
    });

    // Wenn der Timer pausiert wird, musst du ebenfalls einen neuen Startzeitpunkt setzen
    // das machst du natürlich bei deinem Timer

    // Falls die App in den Hintergrund geht, setzen wir einen neuen Startzeitpunkt
    if (appState.current === "active" && nextAppState === "background") {
      setPausedAt(dayjs());
    }
  }

  // unseren ref-value auf den aktuellen AppState setzen
  appState.current = nextAppState;
};
```

Ich hoffe die Kommentare sind selbsterklärend. Falls du Rückfragen hast, meld dich gerne! Hier ist übrigens mein Timer:

```typescript
// useStopWatch.ts
import dayjs from "dayjs";
import { useState, useEffect, useRef } from "react";
import { sToTime } from "../utils";

type TControls = {
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
};

export function useStopWatch(): {
  controls: TControls;
  time: string;
  running: boolean;
  seconds: number;
} {
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [pausedAt, setPausedAt] = useState(null);

  const intervalTimer = useRef();

  // handle our timer
  useEffect(() => {
    if (started) {
      intervalTimer.current = window.setInterval(
        () => setSeconds((seconds) => seconds + 1),
        1000,
      );
    } else {
      window.clearInterval(intervalTimer.current);
    }

    return () => window.clearInterval(intervalTimer.current);
  }, [started]);

  const controls: TControls = {
    start: () => setStarted(true),

    pause: () => {
      setStarted(false);

      // Hier setze ich den neuen Startzeitpunkt
      setPausedAt(dayjs());
    },

    resume: () => setStarted(true),

    stop: () => {
      setStarted(false);
      setSeconds(0);
    },
  };

  // gibt die Zeit im Format hh:mm:ss zurück
  const time = sToTime(seconds);

  return { controls, time, running: started, seconds };
}
```
