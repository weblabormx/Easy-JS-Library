(function( $ ){
	
	$.fn.date2 = function() {
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
        
		return this.each(function() {
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
	};
	
})( jQuery );
