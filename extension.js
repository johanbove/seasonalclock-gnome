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
        
        log('Setting Seasonal hour');
        
        const updateHour = () => {
			const theHour = getSeasonalHour();
            this._label.set_text("  " + theHour.emoji + " (" + theHour.shortName + ")  ");
		}
		
		updateHour();
            
        this._updateInterval = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 60, () => {
			log('Updated Seasonal hour');
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
