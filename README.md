# Seasonal Hours Clock Gnome Shell Extension

Inspired by <https://seasonalclock.org>

This concept originated in [Twodays Crossing](https://github.com/earthstar-project/twodays-crossing), an [Earthstar](https://earthstar-project.org/) chat app. This clock was created by [@cinnamon-bun](https://github.com/cinnamon-bun). _We miss you._

## About

This is a basic implementation of a ["Gnome Shell Extension"](https://extensions.gnome.org) that displays the current hour as the "Seasonal Hour" in the form of its representative emoji.

![Screenshot from 2023-08-13 23-12-47](https://github.com/johanbove/seasonalclock-gnome/assets/922765/707077c1-aa94-4888-8b4b-8226875a5820)

## Development

Read the [GJS.guide](https://gjs.guide/)

Run a debug instance:

```bash
dbus-run-session -- gnome-shell --nested --wayland
```

Install the extension:
```bash
gnome-extensions install seasonalclock-gnome@johanbove.info
```

Disable the extension:
```bash
gnome-extensions disable seasonalclock-gnome@johanbove.info
```

Enable the extension:
```bash
gnome-extensions enable seasonalclock-gnome@johanbove.info
```

Pack the extension:
```bash
gnome-extensions pack seasonal-clock@johanbove.info --extra-source=seasonalhours.js
``` 

## Changelog

### Version 1.1.1

- Fixed "candle", "ice", "mist" and "mountain" emoji rendering through unicode character.
- Preparing for Gnome Extensions release.

### Version 1.1

- Changed capitalization
- Removed parenthesis

### Version 1.0

- Initial release; nothing fancy.
- Emojis for the hours are based upon [this version](https://github.com/sgwilym/seasonal-hours-clock/blob/064d6a9545aa50f93367ed7f2a27ab4c3fc766dd/src/seasonal-hours.ts).


---
