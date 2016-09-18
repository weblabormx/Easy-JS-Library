function loadEJL() {
	var url = "http://weblabor.mx/libraries/easyJsLibrary/library/";
	//url = "http://localhost:82/easy-JS-Library/library/";

	// Progress bar
	if($('body[data-type~=progressbar]').length) {
		$("body").append("<div id='hideAll'></div>");
		$("body[data-type~=progressbar]").addClass("hideScroll");
		$(window).load(function() {  
			document.getElementById("hideAll").style.display = "none"; 
			$("body[data-type~=progressbar]").removeClass("hideScroll");
		});
	};
	
	$.fn.copyCSS = function (source) {
		var dom = $(source).get(0);
		var dest = {};
		var style, prop;
		if (window.getComputedStyle) {
			var camelize = function (a, b) {
					return b.toUpperCase();
			};
			if (style = window.getComputedStyle(dom, null)) {
				var camel, val;
				if (style.length) {
					for (var i = 0, l = style.length; i < l; i++) {
						prop = style[i];
						camel = prop.replace(/\-([a-z])/, camelize);
						val = style.getPropertyValue(prop);
						dest[camel] = val;
					}
				} else {
					for (prop in style) {
						camel = prop.replace(/\-([a-z])/, camelize);
						val = style.getPropertyValue(prop) || style[prop];
						dest[camel] = val;
					}
				}
				return this.css(dest);
			}
		}
		if (style = dom.currentStyle) {
			for (prop in style) {
				dest[prop] = style[prop];
			}
			return this.css(dest);
		}
		if (style = dom.style) {
			for (prop in style) {
				if (typeof style[prop] != 'function') {
					dest[prop] = style[prop];
				}
			}
		}
		return this.css(dest);
	};
	$.fn.multipleInput = function() {
		
		return this.each(function() {
			var thisg = this;
			var name = $( this ).attr( "name" );
			var type = $( this ).attr( "type" );
			var resp = [];
			
			
			// create html elements
 
			// list of email addresses as unordered list
			var list = $('<ul />');
 
			// input
			var $input = $('<input type="text" />').keyup(function(event) {
 
					if(event.which == 32 || event.which == 188) {
						// key press is space or comma
						var val = $(this).val().slice(0, -1); // remove space/comma from value
						val = $.trim(val);
						if(val.length>0) {
							resp.push(val);
							// append to list of emails with remove button
							list.append($('<li class="multipleInput-email"><span>' + val + '</span></li><input type="'+type+'" name="'+name+'[]" value="' + val + '" style="display:none" />')
								.append($('<a href="#" class="multipleInput-close" title="Remove" />')
										.click(function(e) {
											$(this).parent().remove();
											e.preventDefault();
										})
								)
							);
							$(this).attr('placeholder', '');
							// empty input
							$(this).val('');
							$(thisg).val(resp);
						}
							
					}
 
			});
 
			// container div
			var $container = $('<div class="multipleInput-container" />').click(function() {
					$input.focus();
			});
 
			// insert elements into DOM
			$container.append(list).append($input).insertAfter($(this));
	
			// pass css to div
			$container.copyCSS(thisg);
			$container.css("height","auto");
			$container.css("cursor","text");
			
			return $(this).attr('disabled','disabled').hide();
 
		});
	};
	$.fn.multipleDiv = function() {
		return this.each(function() {
			var thisg = this;
			var divname = $(this).attr("data-name");
			var value = "";
			if ($(this).attr("data-values")!==undefined) {
				value = $(this).attr("data-values");
				value = JSON.parse(value);
			}

			var hasparent = false;
			var cont = 0;

			$(this).find("input").each(function(){
				if ($(this).parent().html()==$(thisg).html()) {
					hasparent = false;
				} else {
					hasparent = true;
				}
				var name = $(this).attr("name");
				$(this).attr("name",divname+"[0]["+name+"]");
			});

			$(this).find("select").each(function(){
				if ($(this).parent().html()==$(thisg).html()) {
					hasparent = false;
				} else {
					hasparent = true;
				}
				var name = $(this).attr("name");
				$(this).attr("name",divname+"[0]["+name+"]");
			});

			var html = $(thisg).html();
			if(!hasparent) {
					html = "<div>"+html+"</div>";
			}
			$(thisg).find("."+divname+"-remove").css("display","none");
			

			$("#"+divname+"-add").click(function() {
				cont++;
				var find = divname+"\\[0\\]";
				var regex = new RegExp(find, "g");
				var htmln = html.replace(regex, divname+"["+cont+"]");


				$(thisg).append(htmln);
				loadJqueryUI();
				loadCalendar();
				loadTime();
			
				$("."+divname+"-remove").click(function() {
					if ($(this).parent().prop("tagName")=="TD") {
						$(this).parent().parent().remove();
					}else {
						$(this).parent().remove();
					}
					
				});
			});

			if (value!="") {
				var array = value;
	
				for (var key in array) {
				   	if (array.hasOwnProperty(key)) {
				       	var obj = array[key];
				        for (var prop in obj) {
				          	// important check that this is objects own property 
				          	// not from prototype prop inherited
				          	if(obj.hasOwnProperty(prop)){
				          		// If it doesn't exist the input add a field
				          		if ($("[name="+divname+"\\["+key+"\\]\\["+prop+"\\]]").val()==undefined) {
				          			$("#"+divname+"-add").trigger("click");
				          		};
				          		// Add the values
				          		$("input[type=text][name="+divname+"\\["+key+"\\]\\["+prop+"\\]]").val(obj[prop]);
				          		$("select[name="+divname+"\\["+key+"\\]\\["+prop+"\\]]").val(obj[prop]);
				          		if(obj[prop]==1)
				          			$("input[type=checkbox][name="+divname+"\\["+key+"\\]\\["+prop+"\\]]").attr('checked', 'checked');
				          	}
				       }
				    }
				}
			};
			
			return true;
		});
	};

	$('input[data-type~=multiple]').multipleInput();
	$('div[data-type~=multiple], ul[data-type~=multiple], tbody[data-type~=multiple]').multipleDiv();
	
	function loadCalendar() {
		if(
			$('input[data-type~=date]').length || 
			$('input[data-type~=datetime]').length
		) {
			$.getScript(url+"calendar/script.js", function(){
				$("input[data-type~=date]").each(function(){
					var locale = "en";
					if($(this).attr("lang")) {
						locale = $(this).attr("lang");
					}
					$(this).attr("pattern","[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])");
					$(this).appendDtpicker({
						"dateOnly": true,
						"locale": locale
					});
				});
				$("input[data-type~=datetime]").each(function(){
					var locale = "en";
					if($(this).attr("lang")) {
						locale = $(this).attr("lang");
					}
					$(this).attr("pattern","[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9])");
					$(this).appendDtpicker({
						"locale": locale
					});
				});
			});
		}
	}
	loadCalendar();
	
	// Froala
	if($('textarea[data-type~=wysiwyg]').length) {
		var froala_base = 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.3.4/';
		$('head').append('<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" type="text/css" />');
		$('head').append('<link rel="stylesheet" href="'+froala_base+'css/froala_editor.min.css" type="text/css" />');
		$('head').append('<link rel="stylesheet" href="'+froala_base+'css/froala_style.min.css" type="text/css" />');

		$('head').append('<link rel="stylesheet" href="'+froala_base+'css/plugins/code_view.css" type="text/css" />');
		$('head').append('<link rel="stylesheet" href="'+froala_base+'css/plugins/colors.css" type="text/css" />');
		//$('head').append('<link rel="stylesheet" href="'+froala_base+'css/plugins/file.css" type="text/css" />');
		$('head').append('<link rel="stylesheet" href="'+froala_base+'css/plugins/fullscreen.css" type="text/css" />');
		$('head').append('<link rel="stylesheet" href="'+froala_base+'css/plugins/image.css" type="text/css" />');
		$('head').append('<link rel="stylesheet" href="'+froala_base+'css/plugins/table.css" type="text/css" />');
		$('head').append('<link rel="stylesheet" href="'+froala_base+'css/plugins/video.css" type="text/css" />');

		$.getScript(froala_base+'js/froala_editor.min.js', function() {
			$.getScript(froala_base+'js/plugins/align.min.js', function(){});
			$.getScript(froala_base+'js/plugins/code_beautifier.min.js', function(){});
			$.getScript(froala_base+'js/plugins/code_view.min.js', function(){});
			$.getScript(froala_base+'js/plugins/colors.min.js', function(){});
			//$.getScript(froala_base+'js/plugins/file.min.js', function(){});
			$.getScript(froala_base+'js/plugins/font_size.min.js', function(){});
			$.getScript(froala_base+'js/plugins/fullscreen.min.js', function(){});
			$.getScript(froala_base+'js/plugins/image.min.js', function(){});
			$.getScript(froala_base+'js/plugins/inline_style.min.js', function(){});
			$.getScript(froala_base+'js/plugins/link.min.js', function(){});
			$.getScript(froala_base+'js/plugins/lists.min.js', function(){});
			$.getScript(froala_base+'js/plugins/paragraph_format.min.js', function(){});
			$.getScript(froala_base+'js/plugins/table.min.js', function(){});
			$.getScript(froala_base+'js/plugins/url.min.js', function(){});
			$.getScript(froala_base+'js/plugins/video.min.js', function(){});
			$.getScript(froala_base+'js/languages/es.js', function(){
				$(function() {
					$('textarea[data-type=wysiwyg]').froalaEditor({
						language: 'es',
						imageUploadURL: 'http://localhost:82/Imgur-JS-Uploader/includes/uploader.php',
						requestWithCORS: true,
						imageUploadMethod: 'POST',
					});
				});
			});
			
		});
	}
	// Jquery optionTree
	if($('input[data-type~=hselect]').length) {
		$.getScript(url+"option-tree/jquery.optionTree.js", function(){
			$("[data-type~=hselect]").each(function(){
				var src = $(this).attr("src");
				$(this).hide();
				var thisg = $(this);
				var value = $(this).attr("data-parent");
				var select = $(this).attr("data-value-select");
				if (select == undefined) {
					select = "";
				};
				var name = $(this).attr("name");

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
					$(this).siblings('select') // find all select
						.find(':selected') // and their current options
						.each(function() { labels.push($(this).text()); }); // and add option text to array
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
		});
	}
	var elements = [];
	// Jquery UI
	function loadJqueryUI(){
		if(
			$('ul[data-type~=sort]').length ||
			$('input[data-type~=autocomplete]').length ||
			$('div[data-type~=button]').length ||
			$('input[data-type~=slider]').length || 
			$('[data-type~=tooltip]').length
		) {

			$('head').append('<link rel="stylesheet" href="'+url+'jquery-ui/jquery-ui.min.css" type="text/css" />');
			$.getScript(url+"jquery-ui/jquery-ui.min.js", function(){
					
					if($('ul[data-type~=sort]').length) {
						// Sort
						$(function() {
							$('ul[data-type~=sort]').sortable();
							$('ul[data-type~=sort]').disableSelection();
							$('ul[data-type~=sort]').find("li").css("cursor","move");
						});
					} 
					if($("input[data-type~=autocomplete]").length) {
						// Autocomplete
						$("input[data-type~=autocomplete]").each(function(){
							var selectedValue = $(this).attr("data-selected-value");
							var selectedText = $(this).attr("data-selected-text");
							var isSelected = false;
							if (selectedText!==undefined && selectedValue!==undefined) {
								isSelected = true;
							};

							var reload = $(this).attr("data-reload");
							if (reload==undefined) {
								reload = false;
							}
							var actions = $(this).attr("data-action");
							if (actions==undefined) {
								actions = false;
							}

							var name = $(this).attr("name");
							name = name.replace(/\[/g,"");
							name = name.replace(/\]/g,"");
							name = name+"ce";
							var required = "";
							if ($(this).attr("required")) { required = " required"; };
							if ($(this).attr("class")) { required = required + " class='"+$(this).attr("class")+"'"; };
							if ($(this).attr("style")) { required = required + " style='"+$(this).attr("style")+"'"; };
							if (isSelected) { required = required + " value='"+selectedText+"'"};
							$("<div class='autclt'><input type='text' name='"+name+"'"+required+" /><span class='closeauto'>x</span></div>").insertAfter(this);
							$(this).css("display","none");
							var auto = $("input[name="+name+"]");
							var action = $(this).attr("src");
							var cache = {};
							var thisg = this;
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
											console.log(data);
										});
									};
									if (reload==="true" || reload) {
										//location.reload();
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
							$(this).removeAttr("data-type");
							if (isSelected) {
								$(this).val(selectedValue);
								$(auto).attr("disabled","disabled");
								$(auto).parent().find(".closeauto").css("display","inline");
							};
						});
					}
					if($('div[data-type~=button]').length) {
						// Buttons
						$(function() {
							$( "div[data-type~=button]" ).buttonset();
						});
					} 
					if($('input[data-type~=slider]').length) {
						// Slider
						$("input[data-type~=slider]").each(function(){
							var name = $(this).attr("name");
							if ( elements.indexOf(name) == -1 ) { 
								elements.push(name);
								var max = parseFloat($(this).attr("data-max"));
								var min = parseFloat($(this).attr("data-min"));
								var type = $(this).attr("data-slider");
								if (type=="range") {
									// Hide becouse array with the name and variables max and min is createad
									$(this).css("display","none");
									$(this).css("disabled","disabled");
									
									$("<div id='"+name+"-sl'></div><input name=\""+name+"['max']\" id='"+name+"-sl-max' style='display:none;' /><input name=\""+name+"[\'min\']\" id='"+name+"-sl-min' style='display: none;' />").insertAfter(this);
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
									var step = parseFloat($(this).attr("data-step"));
									$("<div id='"+name+"-sl'></div>").insertAfter(this);
									var thiss = this;
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
							};
								
						});
					} 
					if($('[data-type~=tooltip]').length) {
						$("[data-type~=tooltip]").each(function(){
							var tooltips = $(this).tooltip({
								position: {
									my: "left top",
									at: "right+5 top-5"
								}
							});
						});
					}
			});
		}
	}
	loadJqueryUI();
	// http://devgrow.com/iphone-style-switches/
	if($('[data-type~=onoff]').length) {
		$("[data-type~=onoff]").each(function(){
			$(this).css("display","none");
			var valor = $(this).val();
			valor = parseInt(valor);
			
			var name = $(this).attr("name");
			var ontitle = $(this).attr("data-on");
			var offtitle = $(this).attr("data-off");
			if (ontitle==undefined) {
					ontitle = "Enable";
			}
			if (offtitle==undefined) {
					offtitle = "Disable";
			}

			if (valor===0) {
					$('<div class="field switch"><label class="cb-enable" data-nameparent="'+name+'"><span>'+ontitle+'</span></label><label class="cb-disable selected" data-nameparent="'+name+'"><span>'+offtitle+'</span></label><div style="clear: left;"></div></div>').insertAfter(this)
					$(this).val(0);
			} else {
					$('<div class="field switch"><label class="cb-enable selected" data-nameparent="'+name+'"><span>'+ontitle+'</span></label><label class="cb-disable" data-nameparent="'+name+'"><span>'+offtitle+'</span></label><div style="clear: left;"></div></div>').insertAfter(this)
					$(this).val(1);
			}
			
		});
		$(".cb-enable").click(function(){
			var parentname = $(this).attr("data-nameparent");
			var parent = $(this).parents('.switch');
			$('.cb-disable',parent).removeClass('selected');
			$(this).addClass('selected');
			$('input[name='+parentname+']').val(1);
		});
		$(".cb-disable").click(function(){
			var parentname = $(this).attr("data-nameparent");
			var parent = $(this).parents('.switch');
			$('.cb-enable',parent).removeClass('selected');
			$(this).addClass('selected');
			$('input[name='+parentname+']').val(0);
		});
			
	}
	// Editarea
	if($('[data-type~=codeeditor]').length) {
		$.getScript(url+"ace-builds-master/src-noconflict/ace.js", function(){
			var cont = 0;
			$("textarea[data-type~=codeeditor]").each(function(cont){
					var thisg = this;
					var ide = "codeeditor-"+cont;
					var cont = $(this).html();
					$("<div class='codeeditortext' id='"+ide+"'></div>").insertAfter(this);
					$(this).css("display","none");
					$("#"+ide).html(cont);
					var typec = $(this).attr("data-lang");

					// Color
					var color = "white";
					var attr = $(this).attr("data-color");
					if (typeof attr !== typeof undefined && attr !== false) {
						color = $(this).attr("data-color");
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

					ace.config.set("basePath", url+"ace-builds-master/src-noconflict/");
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
			$.getScript(url+"ace-builds-master/src-noconflict/ext-static_highlight.js", function(){
					ace.config.set("basePath", url+"ace-builds-master/src-noconflict/");
					var highlight = ace.require("ace/ext/static_highlight")
					var dom = ace.require("ace/lib/dom")
					function qsa(sel) {
						return Array.apply(null, document.querySelectorAll(sel));
					}

					qsa("code[data-type~=codeeditor]").forEach(function (codeEl) {
						var typec = $(codeEl).attr("data-lang");
						// Color
						var color = "white";
						var attr = $(codeEl).attr("data-color");
						if (typeof attr !== typeof undefined && attr !== false) {
							color = $(codeEl).attr("data-color");
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

						highlight(codeEl, {
							mode: "ace/mode/"+typec,
							theme: theme,
							startLineNumber: 1,
							showGutter: true,
							trim: true
						}, function (highlighted) {
						
						});
					});
					
			});
		});
			
	}    
	if($('[data-type~=changeOnClick]').length) {
		$("[data-type~=changeOnClick]").each(function(cont){
			var id = $(this).attr("id");

			$(this).click(function(){
					$(this).css("display","none");
					$("[for="+id+"]").css("display","block");
			});
		});
	}
	if($('[data-type~=ajaxload]').length) {
		$("[data-type~=ajaxload]").each(function(cont){
			$(this).click(function() {
				var thisg = this;
					var id = $(this).attr("for");
				$("#"+id).html("<img src='"+url+"images/ajax-loader.gif' class='ajax-loader' />")
					var src = $(this).attr("src");
					$.post( src, function( data ) {
					$( "#"+id).html( data );
					$("[data-type~=ajaxload].selected").each(function(cont){
						$(this).removeClass("selected");
					});
					$(thisg).addClass("selected");
					loadPopup();
					});
			});
			
		});
	}
	if($('[data-type~=loadOnHover]').length) {
		$("[data-type~=loadOnHover]").each(function(cont){
			var id = $(this).attr("id");
			$("[for="+id+"]").css("display","none");

			$(this).hover(function(){
					$("[for="+id+"]").css("display","block");
			}, function() {
					$("[for="+id+"]").css("display","none");
			});
		});
	}
	if($('[data-type~=fakeButton]').length) {
		$("[data-type~=fakeButton]").each(function(cont){
			var id = $(this).attr("id");

			$(this).click(function(e){
					e.preventDefault();
					$("[for="+id+"]").trigger('click');    
			});
		});
	}
	if($('[data-type~=clickOnChange]').length) {
		$("[data-type~=clickOnChange]").each(function(cont){
			var id = $(this).attr("id");

			$(this).change(function(e){
					$("[for="+id+"]").trigger('click');    
			});
		});
	}
	if($('form[data-type~=ajax]').length) {
		$("form[data-type~=ajax]").each(function(cont){
			$( this ).submit(function( e ) {
					var url = $(this).attr("action");
					var method = $(this).attr("method");
					var id = $(this).attr("id");
					$.ajax( {
						url: url,
						type: method,
						data: new FormData( this ),
						processData: false,
						contentType: false
					} )
					.done(function( data ) {
						// Check if is a URL
						var n = data.search("http");
						if(n===0) {
							window.location.href = data;
							return false;
						}

						$("#"+id+"-msg").html(data);
						$("html, body").animate({
							scrollTop: 0
						}, 1000);   
					});
					e.preventDefault();
			});
		});
	}
	

	// Dynatable
	if(
		$('table[data-type~=tableof]').length 
	) { 
		//$('head').append('<link rel="stylesheet" href="'+url+'dynatable/jquery.dynatable.css" type="text/css" />');
		$.getScript(url+"dynatable/jquery.dynatable.js", function(){
			function ChangeUrl(page, url) {
				if (typeof (history.pushState) != "undefined") {
					var obj = { Page: page, Url: url };
					history.pushState(obj, obj.Page, obj.Url);
				} else {
					console.log("Browser does not support HTML5.");
				}
			}
			function removeURLParameter(url, parameter) {
				//prefer to use l.search if you have a location/link object
				var urlparts= url.split('?');   
				if (urlparts.length>=2) {

					var prefix= parameter+'=';
					var pars= urlparts[1].split(/[&;]/g);

					//reverse iteration as may be destructive
					for (var i= pars.length; i-- > 0;) {    
						//idiom for string.startsWith
						if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
							pars.splice(i, 1);
						}
					}

					url= urlparts[0]+'?'+pars.join('&');
					return url;
				} else {
					return url;
				}
			}
			// Clean url if is case
			var parameters = window.location.href;
			parameters = removeURLParameter(parameters, "perPage");
			parameters = removeURLParameter(parameters, "queries[search]");
			parameters = removeURLParameter(parameters, "page");
			parameters = removeURLParameter(parameters, "offset");
			ChangeUrl('', parameters);

			$("table[data-type~=tableof]").each(function(cont){
					var url = $(this).attr("data-ajax-url");
					var db = $(this).attr("data-ajax-db");
					var id = $(this).attr("id");
					var dynatable;
					//console.log(url);
					if (url!=undefined && db!=undefined) {
						//console.log("|1");
						dynatable = $(this).dynatable({
							dataset: {
								ajax: true, 
								ajaxUrl: url,
								ajaxOnLoad: true,
								records: []
							}
						}).data('dynatable');
					} else if (url!=undefined) {
						//console.log("|2");
						var thisg = this;
						$.ajax( {
							url: url,
							processData: false,
							contentType: false,
							async:   false
						} )
						.done(function( data ) { 
							//console.log("request Ajax Script.js");
							var myrecords = JSON.parse(data);
							dynatable = $(thisg).dynatable({
								dataset: {
										records: myrecords
								}
							}).data('dynatable');
						}); 
						
					} else {
						//console.log("|3");
						dynatable = $(this).dynatable().data('dynatable');
					}
					//console.log(dynatable);
					$("[for="+id+"][data-filter]").each(function(){
						$( this ).click(function() {
							//console.log(dynatable);
							var filter = $(this).attr("data-filter");
							var value = $(this).attr("data-filter-value");
							dynatable.queries.add(filter,value);
							dynatable.process();
						});     
					});
			});
			
		});
	}
	// Date 2nd style
	if($('[data-type~=date2]').length) {
		function actualizarInputDate2(thisg, name) {
			var day = $("#"+name+"-day").val();
			if (day.length<2) {
					day = "0"+day;
			};
			var res = $("#"+name+"-year").val();
			res += "-"+$("#"+name+"-month").val();
			res += "-"+day;
			$(thisg).val(res);
		}

		$("[data-type~=date2]").each(function(cont){
			var valoractual = $(this).val();
			var array = valoractual.split("-");
			if (array.length<3) {
				array = ["","",""];
			};

			var locale = $(this).attr("lang");
			var name = $(this).attr("name");
			var thisg = this;
			$(this).hide();

			var months = "<select class='date2-month' id='"+name+"-month'>";
			for (var i = 1; i <= 12; i++) {
				var value = "";
				if (i==array[1]) {
					value = "selected = 'selected'";
				};
				i = ""+i;
				if (i.length<2) {
					i = "0"+i;
				};
				var date = i+"/01/2010";
				var objDate = new Date(date),
				month = objDate.toLocaleString(locale, { month: "long" });
				monthsplit = month.split(" ");
				if (monthsplit.length!=1) {
					month = monthsplit[2];
				}
				months += "<option value='"+i+"' "+value+">"+month+"</option>";
			};
			months += "</select>";

			$("<input type='text' data-validation='day' class='date2-day' id='"+name+"-day' value='"+array[2]+"' />"+months+"<input type='text' data-validation='year' class='date2-year' id='"+name+"-year' value='"+array[0]+"' />").insertAfter(this);
			
			$( "#"+name+"-day, #"+name+"-month, #"+name+"-year" ).keyup(function() {
				actualizarInputDate2(thisg, name);
			});
			$( "#"+name+"-month" ).change(function() {
				actualizarInputDate2(thisg, name);
			});
		});
	}
	// Validation with patterns
	$("input[data-validation]").each(function(cont){
		var type = $(this).attr("data-validation");
		var pattern = ".*";
		if (type=="alphanumeric") {
			pattern = '[a-zA-Z0-9]+';
		} else if (type=="numeric") {
			pattern = '[0-9]+';
		} else if(type=="url") {
			pattern = '(https?://|www.).+';
		} else if(type=="date") {
			pattern = '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])';
		} else if(type=="datetime") {
			pattern = '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9])';
		} else if(type=="time") {
			pattern = '(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9])';
		} else if(type=="day") {
			pattern = '[0-9]{1,2}';
		} else if(type=="year") {
			pattern = '[0-9]{4}';
		} else if(type=="email") {
			pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
		}
		$(this).attr("pattern", pattern);
	});
	// Messages
	if(
		$('[data-type~=confirm]').length ||
		$('[data-type~=prompt]').length
	) {
		$('head').append('<link rel="stylesheet" href="'+url+'lobibox/css/lobibox.css" type="text/css" />');
		$.getScript(url+"lobibox/js/Lobibox.js", function(){
			$("[data-type~=confirm]").each(function(cont){
				var title = $(this).attr("title");
				var info = $(this).attr("data-info");
				var action = $(this).attr("data-action");
				var yestext = "Yes";
				var notext = "No";
				if ( typeof $(this).attr("data-button-yes") !== typeof undefined ) {
					yestext = $(this).attr("data-button-yes");
				};
				if ( typeof $(this).attr("data-button-no") !== typeof undefined ) {
					notext = $(this).attr("data-button-no");
				};
				$(this).click(function() {
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
									$.post( action, function( data ) {
										location.reload();
									});
									
							};
						}
					});
				});
			});
		
			$("[data-type~=prompt]").each(function(cont){
				var title = $(this).attr("title");
				var action = $(this).attr("data-action");
				var oktext = "OK";
				var canceltext = "Cancel";
				if ( typeof $(this).attr("data-button-ok") !== typeof undefined ) {
					oktext = $(this).attr("data-button-ok");
				};
				if ( typeof $(this).attr("data-button-cancel") !== typeof undefined ) {
					canceltext = $(this).attr("data-button-cancel");
				};
				$(this).click(function() {
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
									});
									
							};
						}
					});
				});
			});
		});  
		
	}
	// Magnific Popup
	function loadPopup() {
			$("a[data-type~=popup]").each(function(cont){
				var type = $(this).attr("data-popup-type");
				if (type=="inline") {
					var href = $(this).attr("href");
					$(href).addClass("mfp-hide");
				};
				$(this).magnificPopup({
				  	type: type
				});
			});
			$("div[data-type~=popup],ul[data-type~=popup]").each(function(cont){
				var type = $(this).attr("data-popup-type");
				$(this).magnificPopup({
				  	type: type,
				  	delegate: 'a',
				});
			});
	};

	if($('[data-type~=popup]').length) {
		$('head').append('<link rel="stylesheet" href="'+url+'magnific-popup/magnific-popup.css" type="text/css" />');
		$.getScript(url+"magnific-popup/jquery.magnific-popup.min.js", function(){
			loadPopup();
		});
	}
	
	// Owl
	if($('[data-type~=carousel]').length) {
		$('head').append('<link rel="stylesheet" href="'+url+'owl-carousel/owl.carousel.css" type="text/css" />');
		$.getScript(url+"owl-carousel/owl.carousel.min.js", function(){
			$("[data-type~=carousel]").each(function(cont){
				$(this).addClass("owl-carousel");
				var id = $(this).attr("id");
				var owl = $(this);
				var time = false;
				if ( typeof $(this).attr("data-carousel-time") !== typeof undefined ) {
					var time = $(this).attr("data-carousel-time");
				}
				var items = 5;
				if ( typeof $(this).attr("data-carousel-items") !== typeof undefined ) {
					items = $(this).attr("data-carousel-items");
				}
				var items2 = false;
				if ( typeof $(this).attr("data-carousel-items-desktop") !== typeof undefined ) {
					items2 = new Array(1000, $(this).attr("data-carousel-items-desktop"));
				}
				var items3 = false;
				if ( typeof $(this).attr("data-carousel-items-desktop-small") !== typeof undefined ) {
					items3 = new Array(900, $(this).attr("data-carousel-items-desktop-small"));
				}
				var items4 = false;
				if ( typeof $(this).attr("data-carousel-items-tablet") !== typeof undefined ) {
					items4 = new Array(600, $(this).attr("data-carousel-items-tablet"));
				}
				var items5 = false;
				if ( typeof $(this).attr("data-carousel-items-mobile") !== typeof undefined ) {
					items5 = new Array(400, $(this).attr("data-carousel-items-mobile"));
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
		});
	}

	//Sidr
	if($('[data-type~=mobmenu]').length) {
		$('head').append('<link rel="stylesheet" href="'+url+'sidr/jquery.sidr.dark.css" type="text/css" />');
		$.getScript(url+"sidr/jquery.sidr.min.js", function(){
			$("[data-type~=mobmenu]").each(function(cont){
				var forn = $(this).attr("for");
				var pos = "left";
				if ( typeof $(this).attr("data-submenu-pos") !== typeof undefined ) {
					pos = $(this).attr("data-submenu-pos");
				}
				$(this).sidr({
			      	name: forn,
			     	side: pos
			    });
			});
		});
	}
	//Timepicker
	function loadTime() {
		if($('[data-type~=time]').length) {
			$('head').append('<link rel="stylesheet" href="'+url+'time-picker/jquery.timepicker.css" type="text/css" />');
			$.getScript(url+"time-picker/jquery.timepicker.min.js", function(){
				$("[data-type~=time]").each(function(cont){
					$(this).timepicker({ 'timeFormat': 'H:i' });
				});
			});
		}
	}
	loadTime();

	// Image uploader
	if(
		$('[data-type~=imageUploader]').length 
	) {
		$('head').append('<link rel="stylesheet" href="'+url+'uploader/src/css/uploader.css" type="text/css" />');
		$('head').append('<link rel="stylesheet" href="'+url+'uploader/src/css/demo.css" type="text/css" />');
		$.getScript(url+"uploader/src/js/demo-preview.min.js", function(){
			$.getScript(url+"uploader/src/js/dmuploader.min.js", function(){
				$("[data-type~=imageUploader]").each(function(cont){
					var src = $(this).attr("src");
					$(this).dmUploader({
						url: src,
						dataType: 'json',
						allowedTypes: 'image/*',
						onInit: function(){
							$.danidemo.addLog('#demo-debug', 'default', 'Plugin initialized correctly');
						},
						onBeforeUpload: function(id){
							$.danidemo.addLog('#demo-debug', 'default', 'Starting the upload of #' + id);

							$.danidemo.updateFileStatus(id, 'default', 'Uploading...');
						},
						onNewFile: function(id, file){
							$.danidemo.addFile('#demo-files', id, file);

							/*** Begins Image preview loader ***/
							if (typeof FileReader !== "undefined"){
								
								var reader = new FileReader();

								// Last image added
								var img = $('#demo-files').find('.demo-image-preview').eq(0);

								reader.onload = function (e) {
									img.attr('src', e.target.result);
								}

								reader.readAsDataURL(file);

							} else {
								// Hide/Remove all Images if FileReader isn't supported
								$('#demo-files').find('.demo-image-preview').remove();
							}
							/*** Ends Image preview loader ***/

						},
						onComplete: function(){
							$.danidemo.addLog('#demo-debug', 'default', 'All pending tranfers completed');
						},
						onUploadProgress: function(id, percent){
							var percentStr = percent + '%';

							$.danidemo.updateFileProgress(id, percentStr);
						},
						onUploadSuccess: function(id, data){
							$.danidemo.addLog('#demo-debug', 'success', 'Upload of file #' + id + ' completed');

							$.danidemo.addLog('#demo-debug', 'info', 'Server Response for file #' + id + ': ' + JSON.stringify(data));

							$.danidemo.updateFileStatus(id, 'success', 'Upload Complete');

							$.danidemo.updateFileProgress(id, '100%');
						},
						onUploadError: function(id, message){
							$.danidemo.updateFileStatus(id, 'error', message);

							$.danidemo.addLog('#demo-debug', 'error', 'Failed to Upload file #' + id + ': ' + message);
						},
						onFileTypeError: function(file){
							$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: must be an image');
						},
						onFileSizeError: function(file){
							$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: size excess limit');
						},
						onFallbackMode: function(message){
							$.danidemo.addLog('#demo-debug', 'info', 'Browser not supported(do something else here!): ' + message);
						}
					});
				});
			});
		});  
		
	}

	if($('[data-type~=html]').length) {
		$("[data-type~=html]").each(function(){
			var html = $(this).html();
			$(this).text(html);
		});
	};

	if($('[data-type~=conditional]').length) {
		$.getScript(url+"conditionize/conditionize.jquery.js", function(){
			$("[data-type~=conditional]").conditionize();
		});
	};
	
	if($('[data-type~=imgur]').length) {
		$.getScript('http://weblabor.mx/imgur-js-uploader/imgur-js-uploader.min.js', function(){
			$("[data-type~=imgur]").each(function(cont){
				$(this).imgurUploader();
			});
		});
	}
}
(function( $ ){
	loadEJL();
})( jQuery );

//console.log(obj.element.getAttribute("data-type"));
