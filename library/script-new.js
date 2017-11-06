function LibraryLoaded() {
    
    this.js_total  = 0;
    this.js_loaded = 0;
    this.eachable  = false;
    this.loaded    = false;

    this.name;
    this.function_ex;
    this.function_af;

    this.executeFunction = function() {
        if(!this.loaded)
            return;

        var selector = $(this.name);

        if(this.function_be!=null && this.function_be!=undefined)
            this.function_be(selector)

        if(this.eachable) {
            var these = this;
            selector.each(function() {
                these.function_ex($(this));
            });
        } else {
            this.function_ex(selector);
        }
        if(this.function_af!=null && this.function_af!=undefined)
            this.function_af(selector)
    }
}

function EasyController() {

    this.scripts   = [];
    this.css       = [];
    this.libraries = [];

    this.addScript = function(url, library_id) {

        var library = this.libraries[library_id];
        if(this.scripts.indexOf(url)!==-1) {
            library.js_loaded++;
            if(library.js_loaded == library.js_total)
                library.executeFunction();
            return;
        }
        var these = this;
        $.holdReady(true);
        return $.getScript(url, function(){
            these.scripts.push(url);
            library.js_loaded++;
            if(library.js_loaded == library.js_total) {
                library.loaded = true;
                library.executeFunction();
                console.log('EJL: '+url+' js loaded');
            }
            $.holdReady(false);
        });

    }

    this.addCss = function(url) {
        if(this.css.indexOf(url)!=-1)
            return;
        this.css.push(url);
        $('head').append('<link rel="stylesheet" href="'+url+'" type="text/css" />');
        console.log('EJL: '+url+' css loaded');
    }

    this.addFunctionality = function(variables, function_ex, remove_func = null) {

        // Format variables
        if(variables.js === undefined)
            variables.js = [];
        if(variables.css === undefined)
            variables.css = [];
        if(variables.js instanceof Array==false)
            variables.js = [variables.js];
        if(variables.css instanceof Array==false)
            variables.css = [variables.css];

        // make the selector
        var selector_name = '[data-type~='+variables.data_type+']';
        if(variables.selector !== undefined)
            selector_name = variables.selector+selector_name;

        if(variables.force_selector !== undefined)
            selector_name = variables.force_selector;
        
        // Look if exist selector
        if($(selector_name).length) {
            if(variables.type=='createAndDestroy')
                return this.functionalityCreateAndDestroy(selector_name, variables, function_ex, remove_func);
            if(variables.type=='oneByOne')
                return this.functionalityOneByOne(selector_name, variables, function_ex, remove_func);
            if(variables.type=='each')
                return this.functionalityEach(selector_name, variables, function_ex, remove_func);
        };
    }

    this.functionalityCreateAndDestroy = function(selector_name, variables, function_ex, remove_func) {

        if(this.existLibrary(selector_name)) {

            console.log('EJL: Reloading '+selector_name);
            var selector = $(selector_name);
            if(remove_func!==null)
                remove_func(selector);
            function_ex(selector);

        } else {

            console.log('EJL: Loading '+selector_name);
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

            variables.css.forEach(function(item) {
                these.addCss(item);
            });

            if(variables.js.length == 0)
                library.executeFunction();

        }
    }

    this.functionalityOneByOne = function(selector_name, variables, function_ex, remove_func) {

        selector_name = selector_name+':not(.EJLClass)';

        if(this.existLibrary(selector_name)) {

            var library = this.getLibrary(selector_name);
            library.executeFunction();

        } else {

            console.log('EJL: Loading '+selector_name);
            var library = new LibraryLoaded();

            library.name        = selector_name;
            library.js_total    = variables.js.length;
            library.function_ex = function_ex;
            library.function_be = function(item) {
                item.addClass('EJLClass');
            }

            var library_id = this.libraries.push(library);
            library_id--;
            var these = this;

            variables.js.forEach(function(item) {
                these.addScript(item, library_id);
            });

            variables.css.forEach(function(item) {
                these.addCss(item);
            });

            if(variables.js.length == 0)
                library.executeFunction();

        }
    }

    this.functionalityEach = function(selector_name, variables, function_ex, remove_func) {

        selector_name = selector_name+':not(.EJLClass)';

        if(this.existLibrary(selector_name)) {

            var library = this.getLibrary(selector_name);
            library.executeFunction();

        } else {

            console.log('EJL: Loading '+selector_name);
            var library = new LibraryLoaded();

            library.name        = selector_name;
            library.js_total    = variables.js.length;
            library.function_ex = function_ex;
            library.eachable    = true;
            library.function_af = function(item) {
                item.addClass('EJLClass');
            }

            var library_id = this.libraries.push(library);
            library_id--;
            var these = this;

            variables.js.forEach(function(item) {
                these.addScript(item, library_id);
            });

            variables.css.forEach(function(item) {
                these.addCss(item);
            });

            if(variables.js.length == 0)
                library.executeFunction();

        }
    }

    this.existLibrary = function(name) {
        return this.getLibrary(name)!==undefined;
    }

    this.getLibrary = function(name) {
        return this.libraries.find(function(library) {
            return library.name == name;
        });
    }
}

function EasyJsLibrary() {
    
    //this.url = "https://weblabormx.github.io/Easy-JS-Library/library/";
    this.url = "http://localhost/libraries/Easy-JS-Library/library/";
    this.controller = new EasyController();

    this.execute = function() { 
        this.loadForms();
        this.loadComplements();
    }

    this.loadForms = function() { 

        this.controller.addFunctionality({
            type: 'createAndDestroy',
            data_type: 'color',
            selector: 'input',
            js: this.url+'color-picker/jqColorPicker.min.js'
        }, function(item) {
            item.colorPicker();
        }, function(item) {
            item.colorPicker.destroy();
        });

        this.controller.addFunctionality({
            type: 'oneByOne',
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

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'date',
            selector: 'input',
            js: this.url+"weblabormx/calendar.js",
            css: this.url+"weblabormx/calendar.css"
        }, function(item) {
            var locale = "en";
            if(item.attr("lang")) {
                locale = $(this).attr("lang");
            }
            item.attr("pattern","[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])");
            item.appendDtpicker({
                "dateOnly": true,
                "locale": locale
            });
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'datetime',
            selector: 'input',
            js: this.url+"weblabormx/calendar.js",
            css: this.url+"weblabormx/calendar.css"
        }, function(item) {
            var locale = "en";
            if(item.attr("lang")) {
                locale = item.attr("lang");
            }
            item.attr("pattern","[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9])");
            item.appendDtpicker({
                "locale": locale
            });
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'time',
            selector: 'input',
            js: this.url+"time-picker/jquery.timepicker.min.js",
            css: this.url+"time-picker/jquery.timepicker.css"
        }, function(item) {
            item.timepicker({ 'timeFormat': 'H:i' });
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'hselect',
            selector: 'input',
            js: this.url+"option-tree/jquery.optionTree.js"
        }, function(item) {
            var src = item.attr("src");
            item.hide();
            var thisg = item;
            var value = item.attr("data-parent");
            var select = item.attr("data-value-select");
            if (select == undefined) {
                select = "";
            };
            var name = item.attr("name");

            var options = {
                empty_value: 'null',
                indexed: true,  // the data in tree is indexed by values (ids), not by labels
                on_each_change: src, // this file will be called with 'id' parameter, JSON data must be returned
                choose: function(level) {
                    return 'Choose level ' + level;
                },
                loading_image: '',
                show_multiple: 10, // if true - will set the size to show all options
                choose: '' // no choose item
            };
            var erase = {};
            var erase2 = new Array();
            var split = select.split(",");
            for (var i = 0; i < split.length; i++) {
                erase2[i] = split[i];
            };
            erase[name] = erase2;
            options.preselect = erase;

            var displayParents = function() {
                var labels = []; // initialize array
                item.siblings('select') // find all select
                    .find(':selected') // and their current options
                    .each(function() { labels.push(item.text()); }); // and add option text to array
                //$('<div>').text(this.value + ':' + labels.join(' > ')).appendTo('#demo7-result');  // and display the labels
            }
            $.getJSON(src, {id: value}, function(tree) { // initialize the tree by loading the file first
                $(thisg).optionTree(tree, options).change(displayParents);
                $(thisg).val("");
            })
            .fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log( "Request Failed: " + err );
            });
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'autocomplete',
            selector: 'input',
            js: this.url+"jquery-ui/jquery-ui.min.js",
            css: [
                this.url+'jquery-ui/jquery-ui.min.css',
                this.url+"weblabormx/autocomplete.css"
            ]
        }, function(item) {
            var selectedValue = item.attr("data-selected-value");
            var selectedText = item.attr("data-selected-text");
            var isSelected = false;
            if (selectedText!==undefined && selectedValue!==undefined) {
                isSelected = true;
            };

            var reload = item.attr("data-reload");
            if (reload==undefined) {
                reload = false;
            }
            var actions = item.attr("data-action");
            if (actions==undefined) {
                actions = false;
            }

            var name = item.attr("name");
            name = name.replace(/\[/g,"");
            name = name.replace(/\]/g,"");
            name = name+"ce";
            var required = "";
            if (item.attr("required")) { required = " required"; };
            if (item.attr("placeholder")) { required = " placeholder='"+item.attr("placeholder")+"'"; };
            if (item.attr("class")) { required = required + " class='"+item.attr("class")+"'"; };
            if (item.attr("style")) { required = required + " style='"+item.attr("style")+"'"; };
            if (isSelected) { required = required + " value='"+selectedText+"'"};
            $("<div class='autclt'><input type='text' name='"+name+"'"+required+" /><span class='closeauto'>x</span></div>").insertAfter(item);
            item.css("display","none");
            var auto = $("input[name="+name+"]");
            var action = item.attr("src");
            var cache = {};
            var thisg = item;
            var id;
            //console.log("action: "+action);
            $( auto ).autocomplete({
                minLength: 2,
                source: function( request, response ) {
                    $.ajax({
                        url: action,
                        dataType: "json",
                        data: {
                            term: request.term
                        },
                        success: function( data ) {
                            response( data );
                        }
                    });
                },
                select: function( event, ui ) {
                    if (actions!==false) {
                        console.log(actions);
                        var uis = ui.item;
                        var myJsonString = JSON.stringify(uis);
                        $.post( actions, { result: myJsonString })
                        .done(function( data ) {
                            // nothing
                            //console.log(data);
                        });
                    };
                    if (reload==="true" || reload) {
                        location.reload();
                    };
                    var id = ui.item.id;
                    $(thisg).val(id);
                    $(auto).attr("disabled","disabled");
                    $(auto).parent().find(".closeauto").css("display","inline");
                }
            });
            $(auto).parent().find(".closeauto").click(function() {
                $(auto).val("");
                $(thisg).val("");
                $(auto).removeAttr("disabled");
                $(this).css("display","none");
            });
            item.removeAttr("data-type");
            if (isSelected) {
                item.val(selectedValue);
                $(auto).attr("disabled","disabled");
                $(auto).parent().find(".closeauto").css("display","inline");
            };
        });

        this.controller.addFunctionality({
            type: 'oneByOne',
            data_type: 'button',
            selector: 'div',
            js: this.url+"jquery-ui/jquery-ui.min.js",
            css: this.url+'jquery-ui/jquery-ui.min.css'
        }, function(item) {
            item.buttonset();
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'slider',
            selector: 'input',
            js: this.url+"jquery-ui/jquery-ui.min.js",
            css: this.url+'jquery-ui/jquery-ui.min.css'
        }, function(item) {
            var name = item.attr("name");
            var max = parseFloat(item.attr("data-max"));
            var min = parseFloat(item.attr("data-min"));
            var type = item.attr("data-slider");
            if (type=="range") {
                // Hide becouse array with the name and variables max and min is createad
                item.css("display","none");
                item.css("disabled","disabled");
                
                $("<div id='"+name+"-sl'></div><input name=\""+name+"['max']\" id='"+name+"-sl-max' style='display:none;' /><input name=\""+name+"[\'min\']\" id='"+name+"-sl-min' style='display: none;' />").insertAfter(item);
                $( "#"+name+"-sl" ).slider({
                    range: true,
                    min: min,
                    max: max,
                    values: [ min, max ],
                    slide: function( event, ui ) {
                            $( "#"+name+"-min" ).html(ui.values[ 0 ]);
                            $( "#"+name+"-max" ).html(ui.values[ 1 ]);
                            $("#"+name+"-sl-min").val(ui.values[ 0 ]);
                            $("#"+name+"-sl-max").val(ui.values[ 1 ]);
                    }
                });
                $("#"+name+"-sl-min").val(min);
                $("#"+name+"-sl-max").val(max);
            } else if (type=="increments") {
                item.css("display","none");
                var step = parseFloat(item.attr("data-step"));
                $("<div id='"+name+"-sl'></div>").insertAfter(item);
                var thiss = item;
                $( "#"+name+"-sl" ).slider({
                    value: min,
                    min: min,
                    max: max,
                    step: step,
                    slide: function( event, ui ) {
                            $( "#"+name+"-val" ).html(ui.value);
                            $(thiss).val(ui.value);
                    }
                });
                $(thiss).val(min);
            }
        });

        this.controller.addFunctionality({
            type: 'oneByOne',
            data_type: 'wysiwyg',
            selector: 'textarea',
            js: this.url+'froala/plugins.min.js',
            css: [
                '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css',
                this.url+'froala/style.css'
            ]
        }, function(item) {
            item.froalaEditor({
                requestWithCredentials: false,
                requestWithCORS: false,
                language: 'es',
                imageUploadURL: 'https://libraries.weblabor.mx/imgur-js-uploader/uploader.php',
                imageUploadMethod: 'POST',                  
            });
            $('.fr-box a').each(function() {
                if($(this).text()=='Unlicensed Froala Editor') {
                    $(this).css('visibility', 'hidden');
                }
            });
        });

        var these = this;
        this.controller.addFunctionality({
            type: 'each',
            data_type: 'codeeditor',
            selector: 'textarea',
            js: this.url+"ace-builds-master/ace.js"
        }, function(item) {
            var thisg = item;
            var ide = "codeeditor-"+cont;
            var cont = item.html();
            $("<div class='codeeditortext' id='"+ide+"'></div>").insertAfter(item);
            item.css("display","none");
            $("#"+ide).html(cont);
            var typec = item.attr("data-lang");

            // Color
            var color = "white";
            var attr = item.attr("data-color");
            if (typeof attr !== typeof undefined && attr !== false) {
                color = item.attr("data-color");
            };

            // Theme
            var theme = "ace/theme/tomorrow"; // white for default
            if (color=="black") {
                theme = "ace/theme/monokai";
            } else if (color=="blue") {
                theme = "ace/theme/cobalt";
            } else if (color=="gray") {
                theme = "ace/theme/idle_fingers";
            }

            ace.config.set("basePath", these.url+"ace-builds-master/");
            var editor1 = ace.edit(ide);
            editor1.setTheme(theme);
            editor1.session.setMode("ace/mode/"+typec);
            editor1.setAutoScrollEditorIntoView(true);
            editor1.setOption("maxLines", 30);
            cont++;
            editor1.getSession().on('change', function(e) {
                var value = editor1.getValue();
                $(thisg).html(value);
            });
        });

        this.controller.addFunctionality({
            type: 'oneByOne',
            data_type: 'imgur',
            selector: 'input',
            js: 'https://weblabormx.github.io/Imgur-JS-Uploader/imgur-js-uploader.min.js'
        }, function(item) {
            item.imgurUploader();
        });

        this.controller.addFunctionality({
            type: 'oneByOne',
            data_type: 'conditional',
            selector: 'div',
            js: this.url+"conditionize/conditionize.jquery.js"
        }, function(item) {
            item.conditionize();
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'slug',
            selector: 'input',
        }, function(item) {

            var parent = item.attr('for');
            console.log("#"+parent );
            //item.attr('disabled','disabled');
            $( "#"+parent ).keyup(function() {
                var val = $("#"+parent).val();
                val = val.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                val = val.toLowerCase();
                val = val.replace(/ /g, '-');
                item.val(val);
            });
        });

        this.controller.addFunctionality({
            type: 'oneByOne',
            data_type: 'date2',
            selector: 'input',
            js: this.url+"weblabormx/date2.js"
        }, function(item) {
            item.date2();
        });

        this.controller.addFunctionality({
            type: 'oneByOne',
            data_type: 'data-validation',
            force_selector: 'input[data-validation]',
            js: this.url+"weblabormx/data-validation.js"
        }, function(item) {
            item.dataValidate();
        });

        this.controller.addFunctionality({
            type: 'oneByOne',
            data_type: 'multiple',
            js: this.url+"weblabormx/multipleDiv.js"
        }, function(item) {
            item.multipleDiv(function() { these.execute(); });
        });
        
    }

    this.loadComplements = function() {

        this.controller.addFunctionality({
            type: 'oneByOne',
            data_type: 'sort',
            selector: 'ul',
            js: this.url+"jquery-ui/jquery-ui.min.js",
            css: this.url+'jquery-ui/jquery-ui.min.css'
        }, function(item) {
            item.sortable();
            item.disableSelection();
            item.find("li").css("cursor","move");
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'tooltip',
            js: this.url+"jquery-ui/jquery-ui.min.js",
            css: this.url+'jquery-ui/jquery-ui.min.css'
        }, function(item) {
            item.tooltip({
                position: {
                    my: "left top",
                    at: "right+5 top-5"
                }
            });
        });

        var these = this;
        this.controller.addFunctionality({
            type: 'each',
            data_type: 'codeeditor',
            selector: 'code',
            js: this.url+"prismjs/prism.js",
            css: this.url+"prismjs/prism.css",
        }, function(item) {
            var lang = item.attr("data-lang");
            if(lang=='html')
                lang = 'markup';

            var lines = true;
            if(item.attr("data-lines")!==undefined)
                lines = item.attr("data-lines");

            item.wrap("<pre></pre>")
                .addClass('language-'+lang);

            if(lines==true) 
                item.addClass('line-numbers');
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'changeOnClick',
        }, function(item) {
            var id = item.attr("id");
            $("[for="+id+"]").css("display","none");
            item.click(function(){
                item.css("display","none");
                $("[for="+id+"]").css("display","block");
            });
        });

    }
}

jQuery(document).ready(function($){
    var script = new EasyJsLibrary();
    script.execute();
});
