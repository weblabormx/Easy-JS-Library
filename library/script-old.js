function loadEJL($) {
    var url = "https://weblabormx.github.io/Easy-JS-Library/library/";
    //url = "http://easy-js-library.test/libraries/Easy-JS-Library/library/";

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
    
    $('input[data-type~=multiple]').multipleInput();
 
    if($('[data-type~=ajaxload]').length) {
        $("[data-type~=ajaxload]").each(function(cont){
            $(this).click(function() {
                var thisg = this;
                var id = $(this).attr("for");
                $("#"+id).html("<img src='"+url+"images/ajax-loader.gif' class='ajax-loader' />")
                var src = $(this).attr("src");

                if(src.match(/\.(jpeg|jpg|gif|png)$/) != null) { // is an image
                    var zoom = $(this).attr("data-zoom");
                    // if has zoom enabled
                    var html = '<img src="'+src+'" />';
                    if (typeof zoom !== typeof undefined && zoom !== false) {
                        html = '<div data-type="zoom"><img src="'+src+'" /></div>';
                    };
                    $( "#"+id).html( html );
                    $("[data-type~=ajaxload].selected").each(function(cont){
                        $(this).removeClass("selected");
                    });
                    $(thisg).addClass("selected");
                    loadPopup();
                    loadZoom();
                } else {
                    $.post( src, function( data ) {
                        $( "#"+id).html( data );
                        $("[data-type~=ajaxload].selected").each(function(cont){
                            $(this).removeClass("selected");
                        });
                        $(thisg).addClass("selected");
                        loadPopup();
                    });
                }
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
                var automatic = $(this).attr("data-automatic");
                if (typeof automatic !== typeof undefined && automatic !== false) {
                    var days = $(this).attr("data-days");
                    if (typeof days !== typeof undefined && days !== false) {
                        if (document.cookie.indexOf('visited=true') == -1) {
                            var fifteenDays = 1000*60*60*24*days;
                            var expires = new Date((new Date()).valueOf() + fifteenDays);
                            document.cookie = "visited=true;expires=" + expires.toUTCString();
                            $(this).magnificPopup('open');
                        }
                    } else {
                        $(this).magnificPopup('open');
                    }
                }
            });
            $("div[data-type~=popup],ul[data-type~=popup]").each(function(cont){
                var type = $(this).attr("data-popup-type");
                $(this).magnificPopup({
                    type: type,
                    delegate: 'a',
                });
            });
            $("div[data-type~=popup-gallery],ul[data-type~=popup-gallery]").each(function(cont){
                var type = $(this).attr("data-popup-type");
                $(this).magnificPopup({
                    type: type,
                    delegate: 'a',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                      },
                });
            });
    };

    if($('[data-type~=popup]').length || $('[data-type~=popup-gallery]').length) {
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
    
    // Viewer 360
    if($('div[data-type~=viewer-360]').length) {
        $('head').append('<link rel="stylesheet" href="'+url+'photo-sphere/photo-sphere-viewer.min.css" type="text/css" />');

        var ps_loaded = 0;
        function executePS() {
            ps_loaded++;
            if(ps_loaded>=4) {
                $.getScript(url+'three.js/examples/js/renderers/CanvasRenderer.js', function(){ executePS2(); });
                $.getScript(url+'three.js/examples/js/renderers/Projector.js', function(){ executePS2(); });
                $.getScript(url+'photo-sphere/photo-sphere-viewer.min.js', function(){ executePS2(); });    
            }   
        }

        var ps_loaded2 = 0;
        function executePS2() {
            ps_loaded2++;
            if(ps_loaded2>=3) {
                    
                $('div[data-type~=viewer-360]').each(function() {
                    var src = $(this).attr('src');
                    var id = $(this).attr('id');
                    var title = $(this).attr('data-title');
                    var PSV = new PhotoSphereViewer({
                        panorama: src,
                        container: id,
                        caption: title,
                        loading_img: 'http://photo-sphere-viewer.js.org/assets/photosphere-logo.gif',
                        navbar: 'autorotate zoom download caption',
                        default_fov: 70,
                        mousewheel: false,
                        size: {
                            height: 500
                        }
                    });         
                });     
            }   
        }
        $.getScript(url+'three.js/build/three.min.js', function(){ executePS(); });
        $.getScript(url+'photo-sphere/D.min.js', function(){ executePS(); });
        $.getScript(url+'photo-sphere/doT.min.js', function(){ executePS(); });
        $.getScript(url+'photo-sphere/uevent.min.js', function(){ executePS(); });
    }

    loadZoom();
    function loadZoom() {
        if($('[data-type~=zoom]').length) {
            $.getScript(url+'zoom/jquery.zoom.js', function(){
                $('[data-type~=zoom]').zoom();
            });
        }
    }
        
}
jQuery(document).ready(function($){
    loadEJL($);
});
