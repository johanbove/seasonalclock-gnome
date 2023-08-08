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
            // I am not sure how to deal with spacing properly yet so using white-space instead
            this._label.set_text("  " + theHour.emoji + " " + capitalize(theHour.shortName) + "  ");
        }

        // log('Setting Seasonal hour');
        updateHour();

        this._updateInterval = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 10, () => {
            // log('Updated Seasonal hour');
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
