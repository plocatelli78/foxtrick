/**
 * rapid-id.js
 * rapid way to view something by id
 * @author ryanli
 */

var FoxtrickRapidId = {
	MODULE_NAME: "RapidId",
	MODULE_CATEGORY: Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES: ["all"],
	CSS: Foxtrick.ResourcePath+"resources/css/rapidid.css",

	options: [
		{ value: "manager", text: "Manager", url: "Club/Manager/?userId=%n" },
		{ value: "senior", text: "Senior" },
		{ value: "senior-team", text: "Team", url: "Club/?TeamID=%n" },
		{ value: "senior-series", text: "Series", url: "World/Series/Default.aspx?LeagueLevelUnitID=%n" },
		{ value: "senior-player", text: "Player", url: "Club/Players/Player.aspx?playerId=%n" },
		{ value: "senior-match", text: "Match", url: "Club/Matches/Match.aspx?matchID=%n" },
		{ value: "youth", text: "Youth" },
		{ value: "youth-team", text: "Team", url: "Club/Youth/Default.aspx?YouthTeamID=%n" },
		{ value: "youth-series", text: "Series", url: "World/Series/YouthSeries.aspx?YouthLeagueId=%n" },
		{ value: "youth-player", text: "Player", url: "Club/Players/YouthPlayer.aspx?YouthPlayerID=%n" },
		{ value: "youth-match", text: "Match", url: "Club/Matches/Match.aspx?matchID=%n&isYouth=true" }
	],

	setSelected: function(val) {
		FoxtrickPrefs.setString("module.RapidId.selected", val);
	},

	getSelected: function() {
		return FoxtrickPrefs.getString("module.RapidId.selected");
	},

	view: function(event) {
		// prevent the form from being submitted
		event.preventDefault();
		var doc = event.target.ownerDocument;
		var select = doc.getElementById("ft_rapidid_select");
		var type = select.options[select.selectedIndex].getAttribute("value");
		var input = doc.getElementsByClassName("ft_rapidid_input")[0];
		var value = input.value;
		value = Foxtrick.trim(value);
		// split the value separated by white space to a list
		var idList = value.split(/\s+/);
		// ensure the list is valid
		if (Foxtrick.any(function(n) { return isNaN(n); }, idList)
			|| value == "") {
			return;
		}
		var urlTmpl = doc.location.protocol + "//" + doc.location.host + "/" +
			Foxtrick.nth(0, function(n) { return n.value == type; }, FoxtrickRapidId.options).url;
		// open in current tab if only one ID, in new tabs if more than one
		var open = (idList.length == 1) ? doc.location.assign : Foxtrick.newTab;
		Foxtrick.map(function(id) {
			open(urlTmpl.replace("%n", id));
		}, idList);
	},

	selectionChange: function(event) {
		// to change the id of input so that auto-complete works correctly
		var doc = event.target.ownerDocument;
		var select = doc.getElementById("ft_rapidid_select");
		var input = doc.getElementsByClassName("ft_rapidid_input")[0];
		input.id = "ft_rapidid_input_" + select.value;
	},

	displayForm: function(doc) {
		try {
			var container = doc.getElementById("ft_rapidid");
			var indicator = doc.getElementById("ft_rapidid_indicator");
			container.removeChild(indicator);
			var form = doc.createElement("div");
			container.appendChild(form);

			// form
			form.id = "ft_rapidid_form";
			var select = doc.createElement("select");
			var input = doc.createElement("input");
			var button = doc.createElement("input");
			form.appendChild(select);
			form.appendChild(input);
			form.appendChild(button);

			// the select element
			select.id = "ft_rapidid_select";
			var currentGroup = null;
			var saved = this.getSelected();
			for (var i in this.options) {
				// if no url, then it's an optgroup
				if (!this.options[i].url) {
					var optgroup = doc.createElement("optgroup");
					select.appendChild(optgroup);
					optgroup.setAttribute("label", this.options[i].label);
					currentGroup = optgroup;
				}
				else {
					var option = doc.createElement("option");
					option.setAttribute("value", this.options[i].value);
					option.appendChild(doc.createTextNode(this.options[i].label));
					if (saved === this.options[i].value) {
						option.setAttribute("selected", "selected");
					}
					if (currentGroup === null) {
						select.appendChild(option);
					}
					else {
						currentGroup.appendChild(option);
					}
				}
			}
			select.addEventListener("change", this.selectionChange, false);

			// the input element
			input.id = "ft_rapidid_input_" + select.value;
			input.className = "ft_rapidid_input";
			input.type='text';
			input.setAttribute("size", "9");

			// the <input type="button" /> element
			button.setAttribute("type", "submit");
			button.setAttribute("value", Foxtrickl10n.getString("View"));
			button.addEventListener("click", this.view, true);

			// hide rightnow on demand
			var rightnow = doc.getElementById("ctl00_ctl00_ucOngoingEvents_pnlOngoingEvents");
			if (rightnow) rightnow.setAttribute('style','display:none;');
		}
		catch (e) {
			Foxtrick.log("RapidId(" + e.lineNumber + "): " + e + "");
		}
	},

	onclick: function(event) {
		event.preventDefault();
		FoxtrickRapidId.displayForm(event.target.ownerDocument);
	},

	run: function(doc) {
		// no space for rapidid with right_now in simple skin. so don't show it during matches
		var rightnow = doc.getElementById("ctl00_ctl00_ucOngoingEvents_pnlOngoingEvents");
		if (rightnow && !Foxtrick.util.layout.isStandard(doc))
			return;

		// get labels of optgroup and option
		for (var i in this.options) {
			this.options[i].label = Foxtrickl10n.getString(this.options[i].text);
		}

		var header = doc.getElementById("header");
		var online = doc.getElementById("online");
		var container = doc.createElement("div");
		header.insertBefore(container, online.nextSibling);
		container.id = "ft_rapidid";
		container.className='float_right';
		var indicator = doc.createElement("a");
		container.appendChild(indicator);

		// indicator
		indicator.id = "ft_rapidid_indicator";
		var viewById = Foxtrickl10n.getString("foxtrick.RapidId.ViewById");
		indicator.appendChild(doc.createTextNode(viewById));
		indicator.addEventListener("click", FoxtrickRapidId.onclick, true);
	}
};
Foxtrick.util.module.register(FoxtrickRapidId);
