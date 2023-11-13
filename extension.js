import St from 'gi://St';
import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

import * as Seasonalhours from './seasonalhours.js';

const getSeasonalHour = () => Seasonalhours.getHourOf();
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default class SeasonalClockExtension extends Extension {
    enable() {
        this._label = new St.Label({
             y_expand: true,
             y_align: Clutter.ActorAlign.CENTER
        });

        Main.panel._centerBox.insert_child_at_index(this._label, 2);

        const updateHour = () => {
             const theHour = getSeasonalHour();
             if (!theHour || !theHour.emoji || !theHour.shortName) {
                 return;
             }
             // Force unicode rendering
             const theHourAsEmoji = theHour.emoji + "\uFE0F";
             const labelText = theHourAsEmoji + " " + capitalize(theHour.shortName);
             // I am not sure how to deal with spacing properly yet so using white-space instead
             this._label.set_text("  " + labelText + "  ");
         }

         updateHour();

         this._updateInterval = GLib.timeout_add_seconds(GLib.PRIORITY_LOW, 10, () => {
         updateHour();
             return GLib.SOURCE_CONTINUE;
         });
    }

    disable() {
         if (this._updateInterval) {
             GLib.Source.remove(this._updateInterval);
             this._updateInterval = null;
         }
         Main.panel._centerBox.remove_child(this._label);
         this._label.destroy();
         this._label = null;
    }
}
