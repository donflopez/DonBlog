var editor = require('../models/mEditor');

module.exports = {
	buildEditorPage : function (req, res) {
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