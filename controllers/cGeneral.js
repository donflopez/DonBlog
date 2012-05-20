var editor = require('../models/mEditor')
  , site = require('../models/mSite');

module.exports = {
	  helperLayout : function (app) {
		var help = {};
		site.data(function(site){
			help.site = site;
			app.helpers({
			   help : help
			});
		});
	}

	//This function return the editor page with all of
	//necesary data.
	, buildEditorPage : function (req, res) {
		editor.getEditor(function(aEditor){
			editor.getEditorPage(function(page){
				var data = {};
				data.editor = aEditor;
				data.page = page;
				res.render('./normal/page', data);
			});
		});
	}
}