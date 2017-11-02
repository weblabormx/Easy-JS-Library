function LibraryLoaded() {

    this.name;
    this.function_ex;
    this.js_total  = 0;
    this.js_loaded = 0;

}

function EasyJsLibrary() {

    this.scripts   = [];
    this.css       = [];
    this.libraries = [];

    this.addScript = function(url, library_id) {

        if(this.scripts.indexOf(url)!=-1)
            return;

        this.scripts.push(url);
        var library = this.libraries[library_id];

        return $.getScript(url).done(function(){
            library.js_loaded++;
            console.log(url+' loaded');
            if(library.js_loaded == library.js_total)
                library.function_ex($(library.name));
        });

    }

    this.addCss = function(url) {
        console.log(url+' css recibido');
    }

    this.addFunctionality = function(variables, function_ex) {

        

        // make the selector
        var selector_name = '[data-type~='+variables.data_type+']';
        if(variables.selector !== undefined)
            selector_name = variables.selector+selector_name;
        
        selector = $(selector_name);

        // Look if exist selector
        if(selector.length) {

            // Load the js
            if(variables.js !== undefined) {
                if(variables.js instanceof Array==false)
                    variables.js = [variables.js];

                var library = new LibraryLoaded();

                library.name        = selector_name;
                library.js_total    = variables.js.length;
                library.function_ex = function_ex;

                var library_id = this.libraries.push(library);
                library_id--;
                var these = this;

                variables.js.forEach(function(item) {
                    these.addScript(item, library_id);
                });
            }

        };

    }
}
 
jQuery(document).ready(function($){

    var url = "https://weblabormx.github.io/Easy-JS-Library/library/";
    var script = new EasyJsLibrary();

    //********* Forms **************

    script.addFunctionality({
        data_type: 'color',
        selector: 'input',
        js: url+'color-picker/jqColorPicker.min.js'
    }, function(item) {
        item.colorPicker();
    });

    script.addFunctionality({
        data_type: 'tagsinput',
        selector: 'input',
        js: [
            'https://www.jqueryscript.net/demo/jQuery-Tags-Input-Plugin-with-Autocomplete-Support-Mab-Tag-Input/lib/js/typeahead.bundle.min.js',
            'https://www.jqueryscript.net/demo/jQuery-Tags-Input-Plugin-with-Autocomplete-Support-Mab-Tag-Input/mab-jquery-taginput.js'
        ],
        css: 'https://www.jqueryscript.net/demo/jQuery-Tags-Input-Plugin-with-Autocomplete-Support-Mab-Tag-Input/mab-jquery-taginput.css'
    }, function(item) {
        item.tagInput({
            tagDataSeparator: '|',
            allowDuplicates: false,
            typeahead: false
        });
    });
    
});
