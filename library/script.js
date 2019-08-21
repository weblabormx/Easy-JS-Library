var url = "https://weblabormx.github.io/Easy-JS-Library/library/";
//var url = "library/";

jQuery(document).ready(function($){
    $.getScript(url+'script-old.js', function(){
        
    });
    $.getScript(url+'script-new.js', function(){
        
    });
});