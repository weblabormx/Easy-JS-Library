(function( $ ){
	
	$.fn.multipleDiv = function(reload_function) {

        function multipleController(item, reload_function) {

            this.divname     = item.attr("data-name");
            this.data_values = [];
            this.cont        = 0;
            this.has_parent  = false;
            this.html;

            this.execute = function() {
                this.setter();
                this.prepareFirstRow();
                this.addData();
            }

            this.setter = function() {
                if (item.attr("data-values")!==undefined) {
                    this.data_values = item.attr("data-values");
                    this.data_values = JSON.parse(this.data_values);
                }
                this.divname = this.divname.replace('.', '\\.');
            }

            this.prepareFirstRow = function() {
                var these = this;
                // Change inputs names
                item.find("input, select, textarea").each(function(){
                    if ($(this).parent().html()==item.html()) {
                        this.hasparent = false;
                    } else {
                        this.hasparent = true;
                    }
                    var name = $(this).attr("name");
                    $(this).attr("name",these.divname+"[0]["+name+"]");
                });
                // Make html
                var html = item.html();
                if(!this.hasparent) {
                    this.html = html;
                }

                // Hide first remove
                item.find("."+this.divname+"-remove").css("display","none");
                this.cont++;

                // Make the add button works
                $("#"+this.divname+"-add").click(function() {
                    these.addRow();
                });
            }

            this.data_load = function() {
                if (item.attr("data-load")!==undefined) {
                    var value = item.attr("data-load");
                    window[value]();
                }
            }

            this.addRow = function() {
                var these = this;
                var find = this.divname+"\\[0\\]";
                var regex = new RegExp(find, "g");
                var htmln = this.html
                    .replace(regex, this.divname+"["+this.cont+"]")
                    .replace('EJLClass', '');

                item.append(htmln);

                reload_function();
                this.data_load();

                $("."+this.divname+"-remove:not(.mdp)").click(function() {
                    if ($(these).attr("data-remove")!==undefined) {
                        var value = $(these).attr("data-remove");
                        window[value](this);
                    }
                    if ($(this).parent().prop("tagName")=="TD") {
                        $(this).parent().parent().remove();
                    }else {
                        $(this).parent().remove();
                    }
                    $(this).addClass('mdp');
                });
                this.cont++;
            }

            this.addData = function() {
                var these = this;
                var first = true;

                // Create rows
                this.data_values.forEach(function(obj, key) {
                    if(first) {
                        first = false;
                    } else {
                        these.addRow();
                    }
                    for (var prop in obj) {
                        $("input[name="+these.divname+"\\["+key+"\\]\\["+prop+"\\]]").val(obj[prop]);
                        $("select[name="+these.divname+"\\["+key+"\\]\\["+prop+"\\]]").val(obj[prop]);
                        $("textarea[name="+these.divname+"\\["+key+"\\]\\["+prop+"\\]]").val(obj[prop]);
                        if(obj[prop]==1)
                            $("input[type=checkbox][name="+these.divname+"\\["+key+"\\]\\["+prop+"\\]]").attr('checked', 'checked');
                   }
                });
                reload_function();
                this.data_load();
            }
        }

		return this.each(function() {
            var controller = new multipleController($(this), reload_function);
            controller.execute();
        });
	};
	
})( jQuery );
