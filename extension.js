/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

const { Clutter, St } = imports.gi;
const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const GLib = imports.gi.GLib;

// You can import your modules using the extension object we imported as `Me`.
const seasonalhours = Me.imports.seasonalhours;

function getSeasonalHour() {
    return seasonalhours.getHourOf();
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

class Extension {
    constructor() {
        this._label = null;
        this._updateInterval = null;
    }

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

        // log('Setting Seasonal hour');
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

function init() {
    return new Extension();
}
