function LibraryLoaded() {
    
    this.js_total  = 0;
    this.js_loaded = 0;
    this.eachable  = false;
    this.loaded    = false;

    this.name;
    this.function_ex;
    this.function_af;
    this.function_destroy;

    this.executeFunction = function() {
        if(!this.loaded)
            return;
        var selector = $(this.name);

        if(this.function_be!=null && this.function_be!=undefined)
            this.function_be(selector)

        if(this.eachable) {
            var these = this;
            selector.each(function() {
                var sel = $(this);
                these.function_ex(sel);
                these.executeFunctionAfter(sel);
            });
        } else {
            this.function_ex(selector);
            this.executeFunctionAfter(selector);
        }
            
    }

    this.executeFunctionAfter = function(selector) {
        if(this.function_af!=null && this.function_af!=undefined)
            this.function_af(selector);
    }

    this.destroyFunction = function() {
        if(!this.loaded)
            return;

        var selector = $(this.name);
        if(this.function_destroy!==null)
            this.function_destroy(selector);
    }

}

function EasyController() {

    this.scripts_to_load = [];
    this.scripts         = [];
    this.css             = [];
    this.libraries       = [];
    this.key             = 0;

    this.addScript = function(url, library_id) {

        if(!Array.isArray(this.scripts_to_load[url])) {
            this.scripts_to_load[url] = [];
        }

        this.scripts_to_load[url].push(library_id);

    }

    this.executeScripts = function() {

        var scripts = [];
        for(let key in this.scripts_to_load) {
            const item = scripts[key];
            scripts.push([key, this.scripts_to_load[key]]);
        }

        scripts.sort((a, b) => a[1] - b[1]);
        this.scripts_to_load = scripts;
        this.executeScript();
        
    }

    this.executeScript = function() {

        if(!Array.isArray(this.scripts_to_load[this.key])) {
            return;
        }

        var valor = this.scripts_to_load[this.key];
        this.key++;

        var these = this;
        var url = valor[0];
        var libraries = valor[1].map(function(item) {
            return these.libraries[item];
        });
        $.getScript(url).done(function(data, status) {
            //console.log('EJL: '+url+' js loaded');
            these.executeScript();
            these.scripts.push(url);
            libraries.forEach(function(library) {
                library.js_loaded++;
                if(library.js_loaded == library.js_total) {
                    library.loaded = true;
                    library.executeFunction();
                }
            });
            $.holdReady(false);
        }).fail(function(jqxhr, settings, e) {
            console.log('EJL: Failed when trying to load '+url);
        });
    }

    this.addCss = function(url) {
        if(this.css.indexOf(url)!=-1) {
            return;
        }
        this.css.push(url);
        $('head').append('<link rel="stylesheet" href="'+url+'" type="text/css" />');
        //console.log('EJL: '+url+' css loaded');
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

            var library = this.getLibrary(selector_name);
            library.destroyFunction();
            library.executeFunction();

        } else {

            //console.log('EJL: Loading '+selector_name);
            var library = new LibraryLoaded();

            library.name             = selector_name;
            library.js_total         = variables.js.length;
            library.function_ex      = function_ex;
            library.function_destroy = remove_func;

            var library_id = this.libraries.push(library);
            library_id--;
            var these = this;

            variables.js.forEach(function(item) {
                these.addScript(item, library_id);
            });

            variables.css.forEach(function(item) {
                these.addCss(item);
            });

            if(variables.js.length == 0) {
                library.loaded = true;
                library.executeFunction();
            }

        }
    }

    this.functionalityOneByOne = function(selector_name, variables, function_ex, remove_func) {

        selector_name = selector_name+':not(.EJLClass)';

        if(this.existLibrary(selector_name)) {

            var library = this.getLibrary(selector_name);
            library.executeFunction();

        } else {

            //console.log('EJL: Loading '+selector_name);
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

            if(variables.js.length == 0) {
                library.loaded = true;
                library.executeFunction();
            }

        }
    }

    this.functionalityEach = function(selector_name, variables, function_ex, remove_func) {

        selector_name = selector_name+':not(.EJLClass)';

        if(this.existLibrary(selector_name)) {

            var library = this.getLibrary(selector_name);
            library.executeFunction();

        } else {

            //console.log('EJL: Loading '+selector_name);
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

            if(variables.js.length == 0) {
                library.loaded = true;
                library.executeFunction();
            }

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
    
    this.url = "https://weblabormx.github.io/Easy-JS-Library/library/";
    //this.url = "http://easy-js-library.test/library/";
    this.controller = new EasyController();

    this.load = function() { 
        this.loadForms();
        this.loadComplements();
        this.loadMessages();
    }

    this.execute = function() { 
        this.load();
        this.controller.executeScripts();
    }

    this.loadForms = function() { 

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'color',
            selector: 'input',
            js: this.url+'colorPicker/jqColorPicker.min.js'
        }, function(item) {
            item.colorPicker();
        });

        this.controller.addFunctionality({
            type: 'oneByOne',
            data_type: 'tagsinput',
            selector: 'input',
            js: 'https://www.jqueryscript.net/demo/jQuery-Tags-Input-Plugin-with-Autocomplete-Support-Mab-Tag-Input/js/bundle/demo.js',
            css: 'https://www.jqueryscript.net/demo/jQuery-Tags-Input-Plugin-with-Autocomplete-Support-Mab-Tag-Input/css/demo.css'
        }, function(item) {
            item.addClass('tag-input');
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
            js: "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js",
            css: [
                'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css',
                this.url+"weblabormx/autocomplete.css"
            ]
        }, function(item) {
            var selectedValue = item.attr("data-selected-value");
            var selectedText = item.attr("data-selected-text");
            var isSelected = false;
            if (selectedText!==undefined && selectedValue!==undefined) {
                isSelected = true;
                selectedText = selectedText.replace(/"/g, "");
                selectedText = selectedText.replace(/'/g, "");
            };

            var reload = item.attr("data-reload");
            if (reload==undefined) {
                reload = false;
            }
            var actions = item.attr("data-action");
            if (actions==undefined) {
                actions = false;
            }
            var show_text_input = item.attr("data-text-input");
            if (show_text_input==undefined) {
                show_text_input = true;
            } else if(show_text_input=='false' || show_text_input=='0') {
                show_text_input = false;
            }

            var name = item.attr("name");
            name = name.replace(/\[/g,"");
            name = name.replace(/\]/g,"");
            var org_name = name;
            name = name+"ce";
            var required = "";
            if (item.attr("required")) { required = " required"; };
            if (item.attr("placeholder")) { required = " placeholder='"+item.attr("placeholder")+"'"; };
            if (item.attr("class")) { required = required + " class='"+item.attr("class")+"'"; };
            if (item.attr("style")) { required = required + " style='"+item.attr("style")+"'"; };
            if (isSelected) { required = required + " value='"+selectedText+"'"};
            $("<div class='autclt'><input type='text' name='"+name+"'"+required+" /><span class='closeauto'>x</span></div>").insertAfter(item);
            if(show_text_input) {
                $("<input type='hidden' name='"+org_name+"_text' />").insertAfter(item);    
            }
            item.css("display","none");
            var auto = $("input[name="+name+"]");
            if(show_text_input) {
                var text = $("input[name="+org_name+"_text]");
                if(isSelected) {
                    $(text).val(selectedText);
                }
            }
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
                    if(show_text_input) {
                        $(text).val(ui.item.label);
                    }
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
            type: 'each',
            data_type: 'button',
            selector: 'div',
            js: 'https://code.jquery.com/ui/1.12.1/jquery-ui.min.js',
            css: 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css'
        }, function(item) {
            item.buttonset();
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'slider',
            selector: 'input',
            js: 'https://code.jquery.com/ui/1.12.1/jquery-ui.min.js',
            css: 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css'
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
            var language = 'en';
            if (typeof item.attr("data-lang") !== typeof undefined && item.attr("data-lang") !== false) {
                language = item.attr("data-lang");
            };

            var uploader = 'https://libraries.weblabor.mx/imgur-js-uploader/uploader.php';
            if (typeof item.attr("data-upload-url") !== typeof undefined && item.attr("data-upload-url") !== false) {
                uploader = item.attr("data-upload-url");
            };

            item.froalaEditor({
                requestWithCredentials: false,
                requestWithCORS: false,
                language: language,
                imageUploadURL: uploader,
                imageUploadMethod: 'POST',
                heightMin: 250,
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
            var name = item.attr('name');
            var ide = "codeeditor-"+name;
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
            editor1.getSession().on('change', function(e) {
                var value = editor1.getValue();
                $(thisg).val(value);
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
            data_type: 'conditional2',
            selector: 'div',
            js: "https://cdn.jsdelivr.net/gh/rguliev/conditionize2.js@2.0.1/jquery.conditionize2.min.js"
        }, function(item) {
            item.conditionize();
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
            item.multipleDiv(function() { these.load(); });
        });

        this.controller.addFunctionality({
            type: 'oneByOne',
            data_type: 'bimultiple',
            js: this.url+"weblabormx/biMultiple.js"
        }, function(item) {
            item.biMultiple(function() { these.load(); });
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'onoff',
            css: this.url+"onoff/style.css"
        }, function(item) {
            if($(item).attr('data-activated') == 'on') {
                return true;
            }
            $(item).css("display","none");
            var valor = $(item).val();
            valor = parseInt(valor);
            
            var name = $(item).attr("name");
            var ontitle = $(item).attr("data-on");
            var offtitle = $(item).attr("data-off");
            $(item).attr('data-activated', 'on');
            
            if (ontitle==undefined)
                ontitle = "Enable";
            
            if (offtitle==undefined)
                offtitle = "Disable";
            
            if (valor===0) {
                $('<div class="field switch"><label class="cb-enable" data-nameparent="'+name+'"><span>'+ontitle+'</span></label><label class="cb-disable selected" data-nameparent="'+name+'"><span>'+offtitle+'</span></label><div style="clear: left;"></div></div>').insertAfter(item)
                $(item).val(0);
            } else {
                $('<div class="field switch"><label class="cb-enable selected" data-nameparent="'+name+'"><span>'+ontitle+'</span></label><label class="cb-disable" data-nameparent="'+name+'"><span>'+offtitle+'</span></label><div style="clear: left;"></div></div>').insertAfter(item)
                $(item).val(1);
            }
                
            $(item).parent().find(".cb-enable").click(function(){
                var parentname = $(this).attr("data-nameparent");
                var parent = $(this).parents('.switch');
                $('.cb-disable',parent).removeClass('selected');
                $(this).addClass('selected');
                $('input[name="'+parentname+'"]').val(1);
                $('input[name="'+parentname+'"]').change();
            });
            $(item).parent().find(".cb-disable").click(function(){
                var parentname = $(this).attr("data-nameparent");
                var parent = $(this).parents('.switch');
                $('.cb-enable',parent).removeClass('selected');
                $(this).addClass('selected');
                $('input[name="'+parentname+'"]').val(0);
                $('input[name="'+parentname+'"]').change();
            });
        });
        
    }

    this.loadComplements = function() {

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'sort',
            selector: 'ul',
            js: 'https://code.jquery.com/ui/1.12.1/jquery-ui.min.js',
            css: 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css'
        }, function(item) {

            // Check connect
            var data_connect = item.attr("data-connect");
            var connect = false;
            if (data_connect != undefined) {
                connect = "."+data_connect;
            }

            // Check handle
            var data_handle = item.attr("data-handle");
            var handle = false;
            if (data_handle != undefined) {
                handle = "."+data_handle;
            }

            // Call sortable function
            item.sortable({
                connectWith: connect,
                handle: handle,
            });
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'tooltip',
            js: 'https://code.jquery.com/ui/1.12.1/jquery-ui.min.js',
            css: 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css'
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

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'popup',
            js: this.url+"magnific-popup/jquery.magnific-popup.min.js",
            css: this.url+'magnific-popup/magnific-popup.css'
        }, function(item) {
            var type = item.attr("data-popup-type");
            var tag_name = item.prop("tagName").toLowerCase();
            if(tag_name=='a') {
                var type = item.attr("data-popup-type");
                if (type=="inline") {
                    var href = item.attr("href");
                    $(href).addClass("mfp-hide");
                } else if(type=='ajax') {
                    $(document).on('click', '.js-link', function(e) { 
                        var url = $(this).attr('href'); 
                        $.magnificPopup.close(); 
                        $.magnificPopup.open({ items: { src: url, type: 'ajax' } }); 
                        e.preventDefault(); 
                    });
                }
                item.magnificPopup({
                    type: type
                });
                var automatic = item.attr("data-automatic");
                if (typeof automatic !== typeof undefined && automatic !== false) {
                    var days = item.attr("data-days");
                    if (typeof days !== typeof undefined && days !== false) {
                        if (document.cookie.indexOf('visited=true') == -1) {
                            var days = 1000*60*60*24*days;
                            var expires = new Date((new Date()).valueOf() + days);
                            document.cookie = "visited=true;expires=" + expires.toUTCString();
                            item.magnificPopup('open');
                        }
                    } else {
                        item.magnificPopup('open');
                    }
                }
            } else {
                var delegate = "a";
                if ( typeof item.attr("data-popup-link-class") !== typeof undefined ) {
                    delegate = delegate+'.'+item.attr("data-popup-link-class");
                }
                var type = item.attr("data-popup-type");
                item.magnificPopup({
                    type: type,
                    delegate: delegate,
                });
            }
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'popup-gallery',
            js: this.url+"magnific-popup/jquery.magnific-popup.min.js",
            css: this.url+'magnific-popup/magnific-popup.css'
        }, function(item) {
            var type = item.attr("data-popup-type");
            var delegate = "a";
            if ( typeof item.attr("data-popup-link-class") !== typeof undefined ) {
                delegate = delegate+'.'+item.attr("data-popup-link-class");
            }
            var title_src = 'title';
            item.magnificPopup({
                type: type,
                delegate: delegate,
                gallery: {
                    enabled: true,
                    navigateByImgClick: false,
                    preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    // options for image content type
                    titleSrc: function(item) {
                        text_url = item.el.attr('data-text-url');
                        if (typeof text_url !== typeof undefined && text_url !== false) {
                            var text = null;
                            $.ajax({
                                url: text_url,
                                type: 'get',
                                dataType: 'html',
                                async: false,
                                success: function(data) {
                                    result = data;
                                } 
                            });
                            return result;
                        }
                        return item.el.attr('title');
                    }
                  }
            });
        });

        this.controller.addFunctionality({
            type: 'createAndDestroy',
            data_type: 'fitty',
            js: "https://cdnjs.cloudflare.com/ajax/libs/fitty/2.3.3/fitty.min.js",
        }, function(item) {
            fitty('[data-type=fitty');
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'zoom',
            js: this.url+'zoom/jquery.zoom.js',
        }, function(item) {
            item.zoom();
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'clickOnChange'
        }, function(item) {
            var id = item.attr("id");
            item.change(function(e){
                $("[for="+id+"]").trigger('click');    
            });
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'image-viewer',
            selector: 'img',
            js: [
                "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js",
                this.url + "leaflet/leaflet.js",
                this.url + "img-viewer/imgViewer2.min.js"
            ],
            css: [
                'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css',
                this.url + "leaflet/leaflet.css",
                this.url + "img-viewer/imgViewer2.css",
            ]
        }, function (item) {

            let dragable = true;
            let zoomable = true;
            let button = true;
            let iconUrl;
            let zoomMax = item.attr("data-zoom-max") ?? null;
            let zoomStep = item.attr("data-zoom-step") ?? 0.5;
            let notes = [];

            if (typeof item.attr("data-dragable") !== typeof undefined) {
                dragable = (item.attr("data-dragable") != 'false');
            }
            if (typeof item.attr("data-zoom") !== typeof undefined) {
                zoomable = (item.attr("data-zoom") != 'false');
            }
            if (typeof item.attr("data-button") !== typeof undefined) {
                // Always true unless false
                button = !(item.attr("data-button") == 'false');
            }
            if (typeof item.attr("data-notes") !== typeof undefined) {
                notes = item.attr("data-notes");
                notes = JSON.parse(notes);
            };
            if (typeof item.attr("data-icon") !== typeof undefined) {
                iconUrl = item.attr("data-icon");
            };

            $.widget("wgm.imgNotes2", $.wgm.imgViewer2, {
                options: {
                    addNote: function (data) {
                        var map = this.map, loc = this.relposToLatLng(data.x, data.y);
                        const options = iconUrl == undefined ? {} :
                        { 
                            icon: new L.Icon({iconUrl: iconUrl})
                        };

                        var marker = L.marker(loc, options).addTo(map);
                        
                        if (typeof data.url !== typeof undefined) {
                            marker.bindTooltip(`${data.url} &rarr;`);
                            marker.on("click", function () { window.location.href = data.url });
                            return;
                        }

                        const buttonElement = button == true ? "</br><input type='button' value='Delete' class='marker-delete-button'/>" : "";

                        marker.bindPopup(data.note + buttonElement);
                        marker.on("popupopen", function () {
                            var temp = this;
                            $(".marker-delete-button:visible").click(function () {
                                temp.remove();
                            });
                        });
                        
                    },
                },
                import: function (notes) {
                    if (this.ready) {
                        var self = this;
                        $.each(notes, function () {
                            self.options.addNote.call(self, this);
                        });
                    }
                },
                checkOptions: function () {
                    if (this.ready) {
                        if (!zoomable) {
                            this.map.removeControl(this.map.zoomControl);
                        }
                        
                    }
                }
            });

            item.imgNotes2({
                onReady: function () {
                    this.checkOptions();
                    this.import(notes);
                },
                dragable: dragable,
                zoomable: zoomable,
                zoomStep: zoomStep,
                zoomMax: zoomMax,
            });

            // Fix for height-readjusting pages
            setTimeout(function () {
                item[0].nextElementSibling.style.top = `${item[0].offsetTop}px`
            }, 1000);
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'carousel',
            js: this.url+"owl-carousel/owl.carousel.min.js",
            css: this.url+"owl-carousel/owl.carousel.css"
        }, function(item) {
            item.addClass("owl-carousel");
            var id = item.attr("id");
            var owl = item;
            var time = false;
            if ( typeof item.attr("data-carousel-time") !== typeof undefined ) {
                var time = item.attr("data-carousel-time");
            }
            var items = 5;
            if ( typeof item.attr("data-carousel-items") !== typeof undefined ) {
                items = item.attr("data-carousel-items");
            }
            var items2 = false;
            if ( typeof item.attr("data-carousel-items-desktop") !== typeof undefined ) {
                items2 = new Array(1000, item.attr("data-carousel-items-desktop"));
            }
            var items3 = false;
            if ( typeof item.attr("data-carousel-items-desktop-small") !== typeof undefined ) {
                items3 = new Array(900, item.attr("data-carousel-items-desktop-small"));
            }
            var items4 = false;
            if ( typeof item.attr("data-carousel-items-tablet") !== typeof undefined ) {
                items4 = new Array(600, item.attr("data-carousel-items-tablet"));
            }
            var items5 = false;
            if ( typeof item.attr("data-carousel-items-mobile") !== typeof undefined ) {
                items5 = new Array(400, item.attr("data-carousel-items-mobile"));
            }
            owl.owlCarousel({
                autoPlay: time,
                items: items,
                itemsDesktop: items2,
                itemsDesktopSmall: items3,
                itemsTablet: items4,
                itemsMobile: items5
            });

            // Custom Navigation Events
            $("[data-carousel-type=next][for="+id+"]").click(function(){
                owl.trigger('owl.next');
            })
            $("[data-carousel-type=prev][for="+id+"]").click(function(){
                owl.trigger('owl.prev');
            })
            $("[data-carousel-type=play][for="+id+"]").click(function(){
                owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
            })
            $("[data-carousel-type=stop][for="+id+"]").click(function(){
                owl.trigger('owl.stop');
            })
        });
    }

    this.loadMessages = function() {
        this.controller.addFunctionality({
            type: 'each',
            data_type: 'confirm',
            js: this.url+"lobibox/Lobibox.js",
            css: this.url+'lobibox/lobibox.css'
        }, function(item) {
            var title = item.attr("title");
            var info = item.attr("data-info");
            var action = item.attr("data-action");
            var yestext = "Yes";
            var notext = "No";
            var data = "{}";
            var redirection = "";
            if ( typeof item.attr("data-button-yes") !== typeof undefined )
                yestext = item.attr("data-button-yes");
            if ( typeof item.attr("data-button-no") !== typeof undefined )
                notext = item.attr("data-button-no");
            if ( typeof item.attr("data-variables") !== typeof undefined ) {
                data = item.attr("data-variables");
                data = JSON.parse(data);
            };
            if ( typeof item.attr("data-redirection") !== typeof undefined )
                redirection = item.attr("data-redirection");

            item.click(function() {
                Lobibox.confirm({
                    msg: info,
                    title: title,
                    buttons: {
                        yes: {
                            text: yestext,
                        }, 
                        no: {
                            text: notext,
                        }
                    },
                    callback: function ($this, type) {
                        if (type=="yes") {
                            $.ajax({
                                type: 'POST',
                                url: action,
                                data: data
                            }).done(function( msg ) {
                                if(redirection=="") {
                                    location.reload();
                                } else {
                                    window.location = redirection;
                                }
                            });
                        };
                    }
                });
            });
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'prompt',
            js: this.url+"lobibox/Lobibox.js",
            css: this.url+'lobibox/lobibox.css'
        }, function(item) {
            var title = item.attr("title");
            var action = item.attr("data-action");
            var oktext = "OK";
            var canceltext = "Cancel";
            if ( typeof item.attr("data-button-ok") !== typeof undefined )
                oktext = item.attr("data-button-ok");
            if ( typeof item.attr("data-button-cancel") !== typeof undefined )
                canceltext = item.attr("data-button-cancel");
            item.click(function() {
                var lobibox = Lobibox.prompt('text', {
                    title: title,
                    buttons: {
                        cancel: {
                                text: canceltext,
                        }, 
                        ok: {
                                text: oktext,
                        }
                    },
                    callback: function ($this, type, ev) {
                        if (type=="ok") {
                            var valor = lobibox.getValue();
                            $.post( action, { value: valor })
                            .done(function( data ) {
                                location.reload();
                            })
                            .fail(function( error ) {
                                console.log(error);
                            });
                        };
                    }
                });
            });
        });

        this.controller.addFunctionality({
            type: 'each',
            data_type: 'cropper',
            js: "https://cdnjs.cloudflare.com/ajax/libs/jquery-jcrop/0.9.15/js/jquery.Jcrop.min.js",
            css: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-jcrop/0.9.15/css/jquery.Jcrop.min.css'
        }, function(item) {
            var value = item.val();
            var image = item.attr("data-image");
            var box_width = 0;
            var box_height = 0;
            var ratio = 0;
            var handler = null;
            var minSize = [0,0];
            var maxSize = [0,0];

            if ( typeof item.attr("data-width") !== typeof undefined ) {
                box_width = item.attr("data-width");
            }
            if(box_width.includes("%")) {
                var porcentage = box_width.replace('%', '');
                var width = $('#'+image).parent().width();
                box_width = (width / 100) * porcentage;
            }
            if ( typeof item.attr("data-height") !== typeof undefined ) {
                box_height = item.attr("data-height");
            }
            if ( typeof item.attr("data-ratio") !== typeof undefined ) {
                ratio = item.attr("data-ratio");
            }
            if ( typeof item.attr("data-handler") !== typeof undefined ) {
                handler = item.attr("data-handler");
            }
            if ( typeof item.attr("data-min-sizes") !== typeof undefined ) {
                minSize = item.attr("data-min-sizes").split(',').map(function (x) { 
                    return parseInt(x, 10); 
                });
            }
            if ( typeof item.attr("data-max-sizes") !== typeof undefined ) {
                maxSize = item.attr("data-max-sizes").split(',').map(function (x) { 
                    return parseInt(x, 10); 
                });
            }

            function showCoords(c) {
                $(item).val(JSON.stringify(c));
                if(handler !== null) {
                    window[handler](c);
                }
                
            }

            function clearCoords()
            {
                $(item).val('');
            };

            var api;
            var cropOptions = {
                onChange: showCoords,
                onSelect: showCoords,
                onRelease:  clearCoords,
                boxWidth: box_width,
                boxHeight: box_height,
                aspectRatio: ratio,
                minSize: minSize,
                maxSize: maxSize,
            };
            $('#'+image).Jcrop(cropOptions,function(){
                api = this;
                if (cropOptions.maxSize && cropOptions.maxSize[0]!=0 && cropOptions.maxSize[1]!=0) {
                    api.setOptions({
                        maxSize: [cropOptions.maxSize[0] / api.getScaleFactor()[0], cropOptions.maxSize[1] / api.getScaleFactor()[1]]
                    })
                    api.release();
                }
            });

            if(value.length > 0) {
                value = JSON.parse(value);
                var coords = [value.x, value.y, value.x2, value.y2];
                api.setSelect(coords);
            }
        });
        this.controller.addFunctionality({
            type: 'each',
            data_type: 'image-coordinate',
        }, function(item) {
            var value = item.val();
            var image = item.attr("data-image");

            $('#'+image).wrap( "<div style='position:relative; cursor:pointer;'></div>" );
            $("<i class='marker' style='display: none; position: absolute; width:20px;height:20px;border-radius:20px;background:rgb(231,231,231,0.7);border: 1px solid #777;'></i>").insertBefore('#'+image);
            $('#'+image).click(function(event) 
            {
                bounds=this.getBoundingClientRect();
                var left = bounds.left + window.scrollX;
                var top  = bounds.top  + window.scrollY;
                var x    = event.pageX - left;
                var y    = event.pageY - top;
                
                var cw = this.clientWidth;
                var ch = this.clientHeight;
                var iw = this.naturalWidth;
                var ih = this.naturalHeight;
                var px = Math.round( x / cw * iw );
                var py = Math.round( y / ch * ih );

                //console.log("click on "+this.tagName+" at pixel ("+px+","+py+") mouse pos ("+x+"," + y+ ") relative to boundingClientRect at ("+left+","+top+") client image size: "+cw+" x "+ch+" natural image size: "+iw+" x "+ih );
                $(item).val(px+','+py);
                $(this).parent().find('.marker').css('left', x-10).css('top', y-10).show();
            });

            // Show default value
            if(value.length > 0) {
                value = value.split(',');
                var img = document.querySelector("#"+image);
                var iw = img.naturalWidth;
                var ih = img.naturalHeight;
                var cw = img.width;
                var ch = img.height;
                var diff = iw / cw;

                var x = Math.round( value[0] / diff );
                var y = Math.round( value[1] / diff );
                $('#'+image).parent().find('.marker').css('left', x-10).css('top', y-10).show();
            }
        });
    }
}

jQuery(document).ready(function($){
    window.script = new EasyJsLibrary();
    script.execute();
    if (typeof Livewire !== 'undefined') {
        Livewire.hook('message.processed', (message, component) => 
        {
            script.execute();
        })
    }
});

// Function to work with livewire, add on the submit button with on click action.
function triggerEvents()
{
    $("[data-type]").each(function(index) {
        this.dispatchEvent(new Event('input'));
    });
}
