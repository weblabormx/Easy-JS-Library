(function( $ ){
	
	$.fn.biMultiple = function(reload_function) {

        function bimultipleController(item, reload_function) {

            this.divname     = item.attr("data-name");
            this.data_values = [];
            this.cont        = 0;
            this.html;
            this.inside_html;

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
                var first_li = item.find('li:first-child > ul:first-child > li:not(.extra)').first();
                var first_li_not = item.find('li:first-child > ul:first-child > li.extra').first();

                // Change inputs names
                first_li.find("input, select, textarea").each(function(){
                    var name = $(this).attr("name");
                    $(this).attr("name",these.divname+"[0]["+name+"][0]");
                });
                first_li_not.find("input, select, textarea").each(function(){
                    var name = $(this).attr("name");
                    $(this).attr("name",these.divname+"[0]["+name+"]");
                });

                // Make html
                this.html = item.html();

                this.inside_html = first_li.html();
                this.executeActions();

                $("#"+this.divname+"-add-row").click(function() {
                    these.addRow();
                });

                // Hide first remove
                item.find("."+this.divname+"-remove-row").css("display","none");
                this.cont++;
            }

            this.addRow = function() {
                var these = this;
                var find = this.divname+"\\[0\\]";
                var regex = new RegExp(find, "g");
                var htmln = this.html
                    .replace(regex, this.divname+"["+this.cont+"]")
                    .replace('EJLClass', '');

                item.append(htmln);
                item.find("li > ul > li > ."+this.divname+"-remove-column:first-child").css("display","none");

                // Reload things
                this.executeActions();

                this.cont++;
            }

            this.addData = function() {
                var these = this;
                var first = true;

                // Create rows
                this.data_values.forEach(function(obj, key) {
                    var first_column = true;
                    if(first) {
                        first = false;
                    } else {
                        these.addRow();
                    }
                    for (var name in obj) {
                        var element = obj[name];
                        if(Array.isArray(element)) {
                            for (var prop in element) {

                                if(first_column) {
                                    first_column = false;
                                } else {
                                    item.find('li:nth-child('+(key+1)+') .'+these.divname+'-add-column').click();
                                }

                                $("input[name="+these.divname+"\\["+key+"\\]\\["+name+"\\]\\["+prop+"\\]]").val(element[prop]);
                                $("select[name="+these.divname+"\\["+key+"\\]\\["+name+"\\]\\["+prop+"\\]]").val(element[prop]);
                                $("textarea[name="+these.divname+"\\["+key+"\\]\\["+name+"\\]\\["+prop+"\\]]").val(element[prop]);
                                if(element[prop]==1)
                                    $("input[type=checkbox][name="+these.divname+"\\["+key+"\\]\\["+name+"\\]\\["+prop+"\\]]").attr('checked', 'checked');
                            }
                        } else {
                            $("input[name="+these.divname+"\\["+key+"\\]\\["+name+"\\]]").val(element);
                            $("select[name="+these.divname+"\\["+key+"\\]\\["+name+"\\]]").val(element);
                            $("textarea[name="+these.divname+"\\["+key+"\\]\\["+name+"\\]]").val(element);
                            if(element==1)
                                $("input[type=checkbox][name="+these.divname+"\\["+key+"\\]\\["+name+"\\]]").attr('checked', 'checked');
                        }
                            
                    }
                        
                });
                reload_function();
            }

            this.executeActions = function() {
                var these = this;
                $("."+this.divname+"-remove-row:not(.mdp)").click(function() {
                    these.removeRow(this);
                }).addClass('mdp');

                $("."+this.divname+"-add-column:not(.mdp)").click(function() {
                    these.addColumn(this);
                }).addClass('mdp');

                $("."+this.divname+"-remove-column:not(.mdp)").click(function() {
                    these.removeColumn(this);
                }).addClass('mdp');

                reload_function();
            }

            this.addColumn = function(item) {
                var split = $(item).parent()
                    .find('ul > li:last-child > input')
                    .attr('name');

                if(split===undefined)
                    return;

                split = split.replace(this.divname, '')
                    .split('][');
                var value = split[0].replace('[', '');
                var count = split[2].replace(']', '');
                var name = split[1].replace(']', '');
                count++;

                // Get html
                var find = this.divname+"\\[0\\]\\["+name+"\\]\\[0\\]";
                var regex = new RegExp(find, "g");
                var html = this.inside_html
                    .replace(regex, this.divname+"["+value+"]["+name+"]["+count+"]")
                    .replace('EJLClass', '');

                $(item).parent().find('ul:first-child').append('<li>'+html+'</li>');
                this.executeActions();
            }

            this.removeColumn = function(item) {
                var size = $(item).parent().parent().find('li:not(.extra)').size();
                if(size<=1)
                    return;
                $(item).parent().remove();
            }

            this.removeRow = function(item) {
                var these = this;
                if ($(item).parent().prop("tagName")=="TD") {
                    $(item).parent().parent().remove();
                }else {
                    $(item).parent().remove();
                }
            }
        }

		return this.each(function() {
            var controller = new bimultipleController($(this), reload_function);
            controller.execute();
        });
	};
	
})( jQuery );
