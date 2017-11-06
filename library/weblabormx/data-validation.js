(function( $ ){
	
	$.fn.dataValidate = function() {       
		return this.each(function() {
    		var type = $(this).attr("data-validation");

            if(type=='same') {

                var forid = $(this).attr("for");
                var thisg = this;

                function sameValidation() {

                    var forid = $(thisg).attr("for");

                    if($(thisg).val() != $('#'+forid).val()) {
                        $(thisg).get(0).setCustomValidity('Los campos deben ser iguales.');
                    } else {
                        $(thisg).get(0).setCustomValidity('');
                    }
                    
                }

                $('#'+forid).on("input", function(e) {
                    sameValidation();
                });

                $(thisg).on("input", function(e) {
                    sameValidation();
                });
                
            } else {

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

            }
		});
	};
	
})( jQuery );
