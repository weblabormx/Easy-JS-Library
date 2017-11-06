(function( $ ){
	
	$.fn.multipleDiv = function(reload_function) {
		return this.each(function() {
            var thisg = this;
            var divname = $(this).attr("data-name");
            var data_values = "";
            if ($(this).attr("data-values")!==undefined) {
                data_values = $(this).attr("data-values");
                data_values = JSON.parse(data_values);
            }

            var hasparent = false;
            var cont = 0;

            $(this).find("input, select, textarea").each(function(){
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
            
            var divname2 = divname;
            divname = divname.replace('.', '\\.');
            $("#"+divname+"-add").click(function() {
                cont++;
                var find = divname+"\\[0\\]";
                var regex = new RegExp(find, "g");
                var htmln = html.replace(regex, divname2+"["+cont+"]");

                $(thisg).append(htmln);
                reload_function();

                /*if ($(thisg).attr("data-load")!==undefined) {
                    var value = $(thisg).attr("data-load");
                    window[value]();
                }*/ 

                $("."+divname+"-remove").click(function() {
                    /*if ($(thisg).attr("data-remove")!==undefined) {
                        var value = $(thisg).attr("data-remove");
                        window[value](this);
                    }*/
                    if ($(this).parent().prop("tagName")=="TD") {
                        $(this).parent().parent().remove();
                    }else {
                        $(this).parent().remove();
                    }
                });
            });
            if (data_values!="") {
                var array = data_values;
    
                for (var key in array) {
                    if (array.hasOwnProperty(key)) {
                        var obj = array[key];
                        for (var prop in obj) {
                            // important check that this is objects own property 
                            // not from prototype prop inherited
                            if(obj.hasOwnProperty(prop)){
                                // If it doesn't exist the input add a field
                                if ($("[name="+divname+"\\["+key+"\\]\\["+prop+"\\]]").val()==undefined) {
                                    cont++;
                                    var find = divname+"\\[0\\]";
                                    var regex = new RegExp(find, "g");
                                    var htmln = html.replace(regex, divname2+"["+cont+"]");

                                    $(thisg).append(htmln);
                                    
                                    /*if ($(thisg).attr("data-load")!==undefined) {
                                        var value = $(thisg).attr("data-load");
                                        window[value]();
                                    }*/
                
                                    $("."+divname+"-remove").click(function() {
                                        /*if ($(thisg).attr("data-remove")!==undefined) {
                                            var value = $(thisg).attr("data-remove");
                                            window[value](this);
                                        }*/
                                        if ($(this).parent().prop("tagName")=="TD") {
                                            $(this).parent().parent().remove();
                                        }else {
                                            $(this).parent().remove();
                                        }
                                    });
                                };
                                // Add the values
                                $("input[name="+divname+"\\["+key+"\\]\\["+prop+"\\]]").val(obj[prop]);
                                $("select[name="+divname+"\\["+key+"\\]\\["+prop+"\\]]").val(obj[prop]);
                                $("textarea[name="+divname+"\\["+key+"\\]\\["+prop+"\\]]").val(obj[prop]);
                                if(obj[prop]==1)
                                    $("input[type=checkbox][name="+divname+"\\["+key+"\\]\\["+prop+"\\]]").attr('checked', 'checked');


                            }

                       }
                    }
                }
                reload_function();
            };
            // Initial charge
            /*if ($(thisg).attr("data-load")!==undefined) {
                var value = $(thisg).attr("data-load");
                window[value]();
            }*/
            return true;
        });
	};
	
})( jQuery );
