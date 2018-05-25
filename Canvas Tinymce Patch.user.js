// ==UserScript==
// @name        Canvas Tinymce Patch
// @author      Wen
// @description example script to patch tinymce settings and add external plguin in Canvas richtext editor
// @include     https://*/courses/*/edit
// @version     0.2
// @grant       none
// ==/UserScript==

(function() {
    var myCheck = setInterval(checkTinymce, 1000 );
    function checkTinymce(){
      var setOnce = 0;
      if ( typeof( tinymce )!='undefined' ) {
          clearInterval(myCheck);
          tinymce.EditorManager.editors.forEach(function(editor) {
              if ( setOnce==0 ) {
                  var old_global_settings = tinymce.settings;
                  var settings = editor.settings;
                  ////////////external plugin trial
                  var externalPlugins = settings.external_plugins;
                  var plugins = settings.plugins;
                  var toolbar = settings.toolbar;

                  //add a sample chemistry plugin
                  toolbar[0] += ', tiny_mce_wiris_formulaEditorChemistry';

                  //load external plugin
                  externalPlugins['tiny_mce_wiris'] = 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js';
                  plugins += " tiny_mce_wiris";


                  settings.external_plugins = externalPlugins;
                  settings.plugins = plugins;
                  settings.toolbar = toolbar;
                  //console.log( settings );
                  /////////////////
                  //add new settings to tinymce
                  settings.media_live_embeds=false;
                  tinymce.settings = settings;
                  setOnce = 1;
              }
              tinymce.EditorManager.execCommand('mceRemoveEditor', false, editor.id);
              tinymce.EditorManager.execCommand('mceAddEditor', false, editor.id);

          });
      }
    }

})();
