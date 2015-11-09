(function( $ ){
     var url = "http://weblabor.mx/libraries/easyJsLibrary/library/";

     // Progress bar
     if($('body[data-type~=progressbar]').length) {
          $("body").append("<div id='hideAll'></div>");
          $("body[data-type~=progressbar]").addClass("hideScroll");
          $(window).load(function() {  
               document.getElementById("hideAll").style.display = "none"; 
               $("body[data-type~=progressbar]").removeClass("hideScroll");
          });
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
                    $("."+divname+"-remove").click(function() {
                         $(this).parent().remove();
                    });
               });

               
               return true;
          });

 
     };
     var lang = {
          en: {
               days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
               months: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
               sep: '-',
               format: 'YYYY-MM-DD hh:mm',
               prevMonth: 'Previous month',
               nextMonth: 'Next month',
               today: 'Today'
          },
          ro:{
               days: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
               months: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
               sep: '.',
               format: 'DD.MM.YYYY hh:mm',
               prevMonth: 'Luna precedentă',
               nextMonth: 'Luna următoare',
               today: 'Azi'        
          },

          ja: {
               days: ['日', '月', '火', '水', '木', '金', '土'],
               months: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ],
               sep: '/',
               format: 'YYYY/MM/DD hh:mm'
          },
          ru: {
               days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
               months: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
               format: 'DD.MM.YYYY hh:mm'
          },
          br: {
               days: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
               months: [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ],
               format: 'DD/MM/YYYY hh:mm'
          },
          pt: {
               days: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
               months: [ "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro" ]
          },
          cn: {
               days: ['日', '一', '二', '三', '四', '五', '六'],
               months: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ]
          },
          de: {
               days: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
               months: [ "Jan", "Feb", "März", "Apr", "Mai", "Juni", "Juli", "Aug", "Sept", "Okt", "Nov", "Dez" ],
               format: 'DD.MM.YYYY hh:mm'
          },
          sv: {
               days: ['Sö', 'Må', 'Ti', 'On', 'To', 'Fr', 'Lö'],
               months: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Juni", "Juli", "Aug", "Sept", "Okt", "Nov", "Dec" ]
          },
          id: {
               days: ['Min','Sen','Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
               months: [ "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des" ]
          },
          it: {
               days: ['Dom','Lun','Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
               months: [ "Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic" ],
               format: 'DD/MM/YYYY hh:mm'
          },
          tr: {
               days: ['Pz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cu', 'Cts'],
               months: [ "Ock", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Agu", "Eyl", "Ekm", "Kas", "Arlk" ]
          },
          es: {
               days: ['dom', 'lun', 'mar', 'miér', 'jue', 'vié', 'sáb'],
               months: [ "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic" ],
               format: 'YYYY-MM-DD hh:mm'
          },
          ko: {
               days: ['일', '월', '화', '수', '목', '금', '토'],
               months: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ]
          },
          nl: {
               days: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
               months: [ "jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec" ],
               format: 'DD-MM-YYYY hh:mm'
          },
          cz: {
               days: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
               months: [ "Led", "Úno", "Bře", "Dub", "Kvě", "Čer", "Čvc", "Srp", "Zář", "Říj", "Lis", "Pro" ],
               format: 'DD.MM.YYYY hh:mm'
          },
          fr: {
               days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
               months: [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ],
               format: 'DD-MM-YYYY hh:mm'
          },
          pl: {
               days: ['N', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'],
               months: [ "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień" ],
               sep: '-',
               format: 'YYYY-MM-DD hh:mm',
               prevMonth: 'Poprzedni miesiąc',
               nextMonth: 'Następny miesiąc',
               today: 'Dzisiaj'
          },
          gr: {
               days: ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πε', 'Πα', 'Σα'],
               months: [ "Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαϊ", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ" ],
               sep: '-',
               format: 'DD-MM-YYYY hh:mm',
               prevMonth: 'Προηγ. μήνας',
               nextMonth: 'Επόμ. μήνας',
               today: 'Σήμερα'
          }
     };
     /* ----- */
     
     /**
          PickerHandler Object
     **/
     var PickerHandler = function($picker, $input){
          this.$pickerObject = $picker;
          this.$inputObject = $input;
     };
     
     /* Get a picker */
     PickerHandler.prototype.getPicker = function(){
          return this.$pickerObject;
     };

     /* Get a input-field */
     PickerHandler.prototype.getInput = function(){
          return this.$inputObject;
     };

     /* Get the display state of a picker */
     PickerHandler.prototype.isShow = function(){
          var is_show = true;
          if (this.$pickerObject.css('display') == 'none') {
               is_show = false;
          }
          return is_show;
     };

     /* Show a picker */
     PickerHandler.prototype.show = function(){
          var $picker = this.$pickerObject;
          var $input = this.$inputObject;

          $picker.show();

          ActivePickerId = $input.data('pickerId');

          if ($input != null && $picker.data('isInline') === false) { // Float mode
               // Relocate a picker to position of the appended input-field
               this._relocate();
          }
     };

     /* Hide a picker */
     PickerHandler.prototype.hide = function(){
          var $picker = this.$pickerObject;
          var $input = this.$inputObject;
          $picker.hide();
     };

     /* Get a selected date from a picker */
     PickerHandler.prototype.getDate = function(){
          var $picker = this.$pickerObject;
          var $input = this.$inputObject;
          return getPickedDate($picker);
     };

     /* Set a specific date to a picker */
     PickerHandler.prototype.setDate = function(date){
          var $picker = this.$pickerObject;
          var $input = this.$inputObject;
          if (!isObj('Date', date)) {
               date = new Date(date);
          }

          draw_date($picker, {
               "isAnim": true,
               "isOutputToInputObject": true
          }, date);
     };

     /* Destroy a picker */
     PickerHandler.prototype.destroy = function(){
          var $picker = this.$pickerObject;
          var picker_id = $picker.data('pickerId');
          PickerObjects[picker_id] = null;
          $picker.remove();
     };

     /* Relocate a picker to position of the appended input-field. */
     PickerHandler.prototype._relocate = function(){
          var $picker = this.$pickerObject;
          var $input = this.$inputObject;
          
          if ($input != null && $picker.data('isInline') === false) { // Float mode
               // Move position of a picker - vertical
               var input_outer_height = $input.outerHeight({'margin': true});
               if (!isObj('Number', input_outer_height)) {
                    input_outer_height = $input.outerHeight();
               }
               var picker_outer_height = $picker.outerHeight({'margin': true});
               if (!isObj('Number', picker_outer_height)) {
                    picker_outer_height = $picker.outerHeight();
               }
               
               if(parseInt($(window).height()) <=  ($input.offset().top - $(document).scrollTop() + input_outer_height + picker_outer_height) ){
                    // Display to top of an input-field
                    $picker.parent().css('top', ($input.offset().top - (input_outer_height / 2) - picker_outer_height) + 'px');
               } else {
                    // Display to bottom of an input-field
                    $picker.parent().css('top', ($input.offset().top + input_outer_height) + 'px');
               }
               // Move position of a picker - horizontal
               $picker.parent().css('left', $input.offset().left + 'px');
               // Display on most top of the z-index
               $picker.parent().css('z-index', 100000);
          }
     };

     /* ----- */

     var PickerObjects = [];
     var InputObjects = [];
     var ActivePickerId = -1;

     var getParentPickerObject = function(obj) {
          return $(obj).closest('.datepicker');
     };

     var getPickersInputObject = function($obj) {
          var $picker = getParentPickerObject($obj);
          if ($picker.data("inputObjectId") != null) {
               return $(InputObjects[$picker.data("inputObjectId")]);
          }
          return null;
     };

     var setToNow = function($obj) {
          var $picker = getParentPickerObject($obj);
          var date = new Date();
          draw($picker, {
               "isAnim": true,
               "isOutputToInputObject": true
          }, date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
     };

     var beforeMonth = function($obj) {
          var $picker = getParentPickerObject($obj);

          if ($picker.data('stateAllowBeforeMonth') === false) { // Not allowed
               return;
          }

          var date = getPickedDate($picker);
          var targetMonth_lastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
          if (targetMonth_lastDay < date.getDate()) {
               date.setDate(targetMonth_lastDay);
          }
          draw($picker, {
               "isAnim": true,
               "isOutputToInputObject": true
          }, date.getFullYear(), date.getMonth() - 1, date.getDate(), date.getHours(), date.getMinutes());

          var todayDate = new Date();
          var isCurrentYear = todayDate.getFullYear() == date.getFullYear();
          var isCurrentMonth = isCurrentYear && todayDate.getMonth() == date.getMonth();
          
          if (!isCurrentMonth || !$picker.data("futureOnly")) {
               if (targetMonth_lastDay < date.getDate()) {
                    date.setDate(targetMonth_lastDay);
               }
               draw($picker, {
                    "isAnim": true,
                    "isOutputToInputObject": true
               }, date.getFullYear(), date.getMonth() - 1, date.getDate(), date.getHours(), date.getMinutes());
          }
     };

     var nextMonth = function($obj) {
          var $picker = getParentPickerObject($obj);
          var date = getPickedDate($picker);
          var targetMonth_lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
          if (targetMonth_lastDay < date.getDate()) {
               date.setDate(targetMonth_lastDay);
          }

          // Check a last date of a next month
          if (getLastDate(date.getFullYear(), date.getMonth() + 1) < date.getDate()) {
               date.setDate(getLastDate(date.getFullYear(), date.getMonth() + 1));
          }

          draw($picker, {
               "isAnim": true,
               "isOutputToInputObject": true
          }, date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes());
     };

     /**
          Check a last date of a specified year and month
     **/
     var getLastDate = function(year, month) {
          var date = new Date(year, month + 1, 0);
          return date.getDate();
     };

     var getDateFormat = function(format, locale, is_date_only, is_time_only) {
          if (format == "default"){
               // Default format
               format = translate(locale,'format');
               if (is_date_only) {
                    // Convert the format to date-only (ex: YYYY/MM/DD)
                    format = format.substring(0, format.search(' '));
               } else  if (is_time_only) {
                    // Convert the format to date-only (ex: YYYY/MM/DD)
                    format = format.split(" ")[1];
               }
          }
          return format; // Return date-format
     };
     
     var normalizeYear = function (year) {
          if (year < 99) { // change year for 4 digits
               var date = new Date();
               return parseInt(year) + parseInt(date.getFullYear().toString().substr(0, 2) + "00");
          }
          return year;
     };
     
     var parseDate = function (str, opt_date_format) {
          var re, m, date;
          if(opt_date_format != null){
               // Parse date & time with date-format

               // Match a string with date format
               var df = opt_date_format.replace(/(-|\/)/g, '[-\/]')
                    .replace(/YYYY/gi, '(\\d{2,4})')
                    .replace(/(YY|MM|DD|hh|mm)/g, '(\\d{1,2})')
                    .replace(/(M|D|h|m)/g, '(\\d{1,2})');
               re = new RegExp(df);
               m = re.exec(str);
               if( m != null){

                    // Generate the formats array (convert-table)
                    var formats = [];
                    var format_buf = '';
                    var format_before_c = '';
                    var df_ = opt_date_format;
                    while (df_ != null && 0 < df_.length) {
                         var format_c = df_.substring(0, 1); df_ = df_.substring(1, df_.length);
                         if (format_before_c != format_c) {
                              if(/(YYYY|YY|MM|DD|mm|dd|M|D|h|m)/.test(format_buf)){
                                   formats.push( format_buf );
                                   format_buf = '';
                              } else {
                                   format_buf = '';
                              }
                         }
                         format_buf += format_c;
                         format_before_c = format_c;
                    }
                    if (format_buf !== '' && /(YYYY|YY|MM|DD|mm|dd|M|D|h|m)/.test(format_buf)){
                         formats.push( format_buf );
                    }

                    // Convert a string (with convert-table) to a date object
                    var year, month, day, hour, min;
                    var is_successful = false;
                    for(var i = 0; i < formats.length; i++){
                         if(m.length < i){
                              break;
                         }

                         var f = formats[i];
                         var d = m[i+1]; // Matched part of date
                         if(f == 'YYYY'){
                              year = normalizeYear(d);
                              is_successful = true;
                         } else if(f == 'YY'){
                              year = parseInt(d) + 2000;
                              is_successful = true;
                         } else if(f == 'MM' || f == 'M'){
                              month = parseInt(d) - 1;
                              is_successful = true;
                         } else if(f == 'DD' || f == 'D'){
                              day = d;
                              is_successful = true;
                         } else if(f == 'hh' || f == 'h'){
                              hour = d;
                              is_successful = true;
                         } else if(f == 'mm' || f == 'm'){
                              min = d;
                              is_successful = true;
                         } 
                    }

                    date = new Date(year, month, day, hour, min);

                    if(is_successful === true && isNaN(date) === false && isNaN(date.getDate()) === false){ // Parse successful
                         return date;
                    }
               }
          }
          
          // Parse date & time with common format
          re = /^(\d{2,4})[-\/](\d{1,2})[-\/](\d{1,2}) (\d{1,2}):(\d{1,2})$/;
          m = re.exec(str);
          if (m !== null) {
               m[1] = normalizeYear(m[1]);
               date = new Date(m[1], m[2] - 1, m[3], m[4], m[5]);
          } else {
               // Parse for date-only
               re = /^(\d{2,4})[-\/](\d{1,2})[-\/](\d{1,2})$/;
               m = re.exec(str);
               if(m !== null) {
                    m[1] = normalizeYear(m[1]);
                    date = new Date(m[1], m[2] - 1, m[3]);
               }
          }
          
          if(isNaN(date) === false && isNaN(date.getDate()) === false){ // Parse successful
               return date;
          }
          return false;
     };

     var getFormattedDate = function(date, date_format) {
          if(date == null){
               date = new Date();
          }

          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          var d = date.getDate();
          var hou = date.getHours();
          var min = date.getMinutes();

          date_format = date_format.replace(/YYYY/gi, y)
          .replace(/YY/g, y - 2000)/* century */
          .replace(/MM/g, zpadding(m))
          .replace(/M/g, m)
          .replace(/DD/g, zpadding(d))
          .replace(/D/g, d)
          .replace(/hh/g, zpadding(hou))
          .replace(/h/g, hou)
          .replace(/mm/g, zpadding(min))
          .replace(/m/g, min);
          return date_format;
     };

     var outputToInputObject = function($picker) {
          var $inp = getPickersInputObject($picker);
          if ($inp == null) {
               return;
          }
          var date = getPickedDate($picker);
          var locale = $picker.data("locale");
          var format = getDateFormat($picker.data("dateFormat"), locale, $picker.data('dateOnly'), $picker.data('timeOnly'));
          
          var old = $inp.val();                        
          $inp.val(getFormattedDate(date, format));
          if (old != $inp.val()) { // only trigger if it actually changed to avoid a nasty loop condition
               $inp.trigger("change");
          }
     };

     var getPickedDate = function($obj) {
          var $picker = getParentPickerObject($obj);
          return $picker.data("pickedDate");
     };

     var zpadding = function(num) {
          num = ("0" + num).slice(-2);
          return num;
     };

     var draw_date = function($picker, option, date) {
          //console.log("draw_date - " + date.toString());
          draw($picker, option, date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
     };
     var translate = function(locale, s) {
          if (typeof lang[locale][s] !== "undefined"){
               return lang[locale][s];
          }
          return lang.en[s];
     };
     var draw = function($picker, option, year, month, day, hour, min) {
          var date = new Date();

          if (hour != null) {
               date = new Date(year, month, day, hour, min, 0);
          } else if (year != null) {
               date = new Date(year, month, day);
          } else {
               date = new Date();
          }

          /* Read options */
          var isTodayButton = $picker.data("todayButton");
          var isScroll = option.isAnim; /* It same with isAnim */
          if($picker.data("timelistScroll") === false) {// If disabled by user option.
               isScroll = false;
          }

          var isAnim = option.isAnim;
          if($picker.data("animation") === false){ // If disabled by user option.
               isAnim = false;
          }

          var isFutureOnly = $picker.data("futureOnly");
          var minDate = $picker.data("minDate");
          var maxDate = $picker.data("maxDate");

          var isOutputToInputObject = option.isOutputToInputObject;

          var minuteInterval = $picker.data("minuteInterval");
          var firstDayOfWeek = $picker.data("firstDayOfWeek");

          var allowWdays = $picker.data("allowWdays");
          if (allowWdays == null || isObj('Array', allowWdays) === false || allowWdays.length <= 0) {
               allowWdays = null;
          }
          
          var minTime = $picker.data("minTime");
          var maxTime = $picker.data("maxTime");

          /* Check a specified date */
          var todayDate = new Date();
          if (isFutureOnly) {
               if (date.getTime() < todayDate.getTime()) { // Already passed
                    date.setTime(todayDate.getTime());
               }
          }
          if(allowWdays != null && allowWdays.length <= 6) {
               while (true) {
                    if ($.inArray(date.getDay(), allowWdays) == -1) { // Unallowed wday
                         // Slide a date
                         date.setDate(date.getDate() + 1);
                    } else {
                         break;
                    }
               }
          }

          /* Read locale option */
          var locale = $picker.data("locale");
          if (!lang.hasOwnProperty(locale)) {
               locale = 'en';
          }

          /* Calculate dates */
          var firstWday = new Date(date.getFullYear(), date.getMonth(), 1).getDay() - firstDayOfWeek;
          var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
          var beforeMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
          var dateBeforeMonth = new Date(date.getFullYear(), date.getMonth(), 0);
          var dateNextMonth = new Date(date.getFullYear(), date.getMonth() + 2, 0);
          var isCurrentYear = todayDate.getFullYear() == date.getFullYear();
          var isCurrentMonth = isCurrentYear && todayDate.getMonth() == date.getMonth();
          var isCurrentDay = isCurrentMonth && todayDate.getDate() == date.getDate();
          var isPastMonth = false;
          if (date.getFullYear() < todayDate.getFullYear() || (isCurrentYear && date.getMonth() < todayDate.getMonth())) {
               isPastMonth = true;
          }

          /* Collect each part */
          var $header = $picker.children('.datepicker_header');
          var $inner = $picker.children('.datepicker_inner_container');
          var $calendar = $picker.children('.datepicker_inner_container').children('.datepicker_calendar');
          var $table = $calendar.children('.datepicker_table');
          var $timelist = $picker.children('.datepicker_inner_container').children('.datepicker_timelist');

          /* Grasp a point that will be changed */
          var changePoint = "";
          var oldDate = getPickedDate($picker);
          if(oldDate != null){
               if(oldDate.getMonth() != date.getMonth() || oldDate.getDate() != date.getDate()){
                    changePoint = "calendar";
               } else if (oldDate.getHours() != date.getHours() || oldDate.getMinutes() != date.getMinutes()){
                    if(date.getMinutes() === 0 || date.getMinutes() % minuteInterval === 0){
                         changePoint = "timelist";
                    }
               }
          }

          /* Save newly date to Picker data */
          $($picker).data("pickedDate", date);

          /* Fade-out animation */
          if (isAnim === true) {
               if(changePoint == "calendar"){
                    $calendar.stop().queue([]);
                    $calendar.fadeTo("fast", 0.8);
               }else if(changePoint == "timelist"){
                    $timelist.stop().queue([]);
                    $timelist.fadeTo("fast", 0.8);
               }
          }
          /* Remind timelist scroll state */
          var drawBefore_timeList_scrollTop = $timelist.scrollTop();

          /* New timelist  */
          var timelist_activeTimeCell_offsetTop = -1;

          /* Header ----- */
          $header.children().remove();

          var cDate =  new Date(date.getTime());
          cDate.setMinutes(59);
          cDate.setHours(23);
          cDate.setSeconds(59);
          cDate.setDate(0); // last day of previous month

          var $link_before_month = null;
          if ((!isFutureOnly || !isCurrentMonth) && ((minDate == null) || (minDate < cDate.getTime()))
          ) {
               $link_before_month = $('<a>');
               $link_before_month.text('<');
               $link_before_month.prop('alt', translate(locale,'prevMonth'));
               $link_before_month.prop('title', translate(locale,'prevMonth') );
               $link_before_month.click(function() {
                    beforeMonth($picker);
               });
               $picker.data('stateAllowBeforeMonth', true);
          } else {
               $picker.data('stateAllowBeforeMonth', false);
          }

          cDate.setMinutes(0);
          cDate.setHours(0);
          cDate.setSeconds(0);
          cDate.setDate(1); // First day of next month
          cDate.setMonth(date.getMonth() + 1);

          var $now_month = $('<span>');
          $now_month.text(date.getFullYear() + " " + translate(locale, 'sep') + " " + translate(locale, 'months')[date.getMonth()]);

          var $link_next_month = null;
          if ((maxDate == null) || (maxDate > cDate.getTime())) {
               $link_next_month = $('<a>');
               $link_next_month.text('>');
               $link_next_month.prop('alt', translate(locale,'nextMonth'));
               $link_next_month.prop('title', translate(locale,'nextMonth'));
               $link_next_month.click(function() {
                    nextMonth($picker);
               });
          }

          if (isTodayButton) {
               var $link_today = $('<a/>');
               /*
                    This icon resource from a part of "FontAwesome" by Dave Gandy - http://fontawesome.io".
                    http://fortawesome.github.io/Font-Awesome/license/
                    Thankyou.
               */
               $link_today.html( decodeURIComponent('%3c%3fxml%20version%3d%221%2e0%22%20encoding%3d%22UTF%2d8%22%20standalone%3d%22no%22%3f%3e%3csvg%20%20xmlns%3adc%3d%22http%3a%2f%2fpurl%2eorg%2fdc%2felements%2f1%2e1%2f%22%20%20xmlns%3acc%3d%22http%3a%2f%2fcreativecommons%2eorg%2fns%23%22%20xmlns%3ardf%3d%22http%3a%2f%2fwww%2ew3%2eorg%2f1999%2f02%2f22%2drdf%2dsyntax%2dns%23%22%20%20xmlns%3asvg%3d%22http%3a%2f%2fwww%2ew3%2eorg%2f2000%2fsvg%22%20xmlns%3d%22http%3a%2f%2fwww%2ew3%2eorg%2f2000%2fsvg%22%20%20version%3d%221%2e1%22%20%20width%3d%22100%25%22%20%20height%3d%22100%25%22%20viewBox%3d%220%200%2010%2010%22%3e%3cg%20transform%3d%22translate%28%2d5%2e5772299%2c%2d26%2e54581%29%22%3e%3cpath%20d%3d%22m%2014%2e149807%2c31%2e130932%20c%200%2c%2d0%2e01241%200%2c%2d0%2e02481%20%2d0%2e0062%2c%2d0%2e03721%20L%2010%2e57723%2c28%2e153784%207%2e0108528%2c31%2e093719%20c%200%2c0%2e01241%20%2d0%2e0062%2c0%2e02481%20%2d0%2e0062%2c0%2e03721%20l%200%2c2%2e97715%20c%200%2c0%2e217084%200%2e1798696%2c0%2e396953%200%2e3969534%2c0%2e396953%20l%202%2e3817196%2c0%200%2c%2d2%2e38172%201%2e5878132%2c0%200%2c2%2e38172%202%2e381719%2c0%20c%200%2e217084%2c0%200%2e396953%2c%2d0%2e179869%200%2e396953%2c%2d0%2e396953%20l%200%2c%2d2%2e97715%20m%201%2e383134%2c%2d0%2e427964%20c%200%2e06823%2c%2d0%2e08063%200%2e05582%2c%2d0%2e210882%20%2d0%2e02481%2c%2d0%2e279108%20l%20%2d1%2e358324%2c%2d1%2e128837%200%2c%2d2%2e530576%20c%200%2c%2d0%2e111643%20%2d0%2e08683%2c%2d0%2e198477%20%2d0%2e198477%2c%2d0%2e198477%20l%20%2d1%2e190859%2c0%20c%20%2d0%2e111643%2c0%20%2d0%2e198477%2c0%2e08683%20%2d0%2e198477%2c0%2e198477%20l%200%2c1%2e209467%20%2d1%2e513384%2c%2d1%2e265289%20c%20%2d0%2e2605%2c%2d0%2e217083%20%2d0%2e682264%2c%2d0%2e217083%20%2d0%2e942764%2c0%20L%205%2e6463253%2c30%2e42386%20c%20%2d0%2e080631%2c0%2e06823%20%2d0%2e093036%2c0%2e198476%20%2d0%2e024809%2c0%2e279108%20l%200%2e3845485%2c0%2e458976%20c%200%2e031012%2c0%2e03721%200%2e080631%2c0%2e06203%200%2e1302503%2c0%2e06823%200%2e055821%2c0%2e0062%200%2e1054407%2c%2d0%2e01241%200%2e1488574%2c%2d0%2e04342%20l%204%2e2920565%2c%2d3%2e578782%204%2e292058%2c3%2e578782%20c%200%2e03721%2c0%2e03101%200%2e08063%2c0%2e04342%200%2e13025%2c0%2e04342%200%2e0062%2c0%200%2e01241%2c0%200%2e01861%2c0%200%2e04962%2c%2d0%2e0062%200%2e09924%2c%2d0%2e03101%200%2e130251%2c%2d0%2e06823%20l%200%2e384549%2c%2d0%2e458976%22%20%2f%3e%3c%2fg%3e%3c%2fsvg%3e') );
               $link_today.addClass('icon-home');
               $link_today.prop('alt', translate(locale,'today'));
               $link_today.prop('title', translate(locale,'today'));
               $link_today.click(function() {
                    setToNow($picker);
               });
               $header.append($link_today);
          }

          if ($link_before_month != null) {
               $header.append($link_before_month);
          }
          $header.append($now_month);
          if ($link_next_month != null) {
               $header.append($link_next_month);
          }

          /* Calendar > Table ----- */
          $table.children().remove();
          var $tr = $('<tr>');
          $table.append($tr);

          /* Output wday cells */
          var firstDayDiff = 7 + firstDayOfWeek;
          var daysOfWeek = translate(locale,'days');
          var $td;
          for (var i = 0; i < 7; i++) {
               $td = $('<th>');
               $td.text(daysOfWeek[((i + firstDayDiff) % 7)]);
               $tr.append($td);
          }

          /* Output day cells */
          var cellNum = Math.ceil((firstWday + lastDay) / 7) * 7;
          i = 0;
          if(firstWday < 0){
               i = -7;
          }
          var realDayObj =  new Date(date.getTime());
          realDayObj.setHours(0);
          realDayObj.setMinutes(0);
          realDayObj.setSeconds(0);
          for (var zz = 0; i < cellNum; i++) {
               var realDay = i + 1 - firstWday;

               var isPast = isPastMonth || (isCurrentMonth && realDay < todayDate.getDate());

               if (i % 7 === 0) {
                    $tr = $('<tr>');
                    $table.append($tr);
               }

               $td = $('<td>');
               $td.data("day", realDay);

               $tr.append($td);

               if (firstWday > i) {/* Before months day */
                    $td.text(beforeMonthLastDay + realDay);
                    $td.addClass('day_another_month');
                    $td.data("dateStr", dateBeforeMonth.getFullYear() + "/" + (dateBeforeMonth.getMonth() + 1) + "/" + (beforeMonthLastDay + realDay));
                    realDayObj.setDate(beforeMonthLastDay + realDay);
                    realDayObj.setMonth(dateBeforeMonth.getMonth() );
                    realDayObj.setYear(dateBeforeMonth.getFullYear() );
               } else if (i < firstWday + lastDay) {/* Now months day */
                    $td.text(realDay);
                    $td.data("dateStr", (date.getFullYear()) + "/" + (date.getMonth() + 1) + "/" + realDay);
                    realDayObj.setDate( realDay );
                    realDayObj.setMonth( date.getMonth()  );
                    realDayObj.setYear( date.getFullYear() );
               } else {/* Next months day */
                    $td.text(realDay - lastDay);
                    $td.addClass('day_another_month');
                    $td.data("dateStr", dateNextMonth.getFullYear() + "/" + (dateNextMonth.getMonth() + 1) + "/" + (realDay - lastDay));
                    realDayObj.setDate( realDay - lastDay );  
                    realDayObj.setMonth( dateNextMonth.getMonth() );
                    realDayObj.setYear( dateNextMonth.getFullYear() );
               }

               /* Check a wday */
               var wday = ((i + firstDayDiff) % 7);
               if(allowWdays != null) {
                    if ($.inArray(wday, allowWdays) == -1) {
                         $td.addClass('day_in_unallowed');
                         continue; // Skip
                    }
               } else if (wday === 0) {/* Sunday */
                    $td.addClass('wday_sun');
               } else if (wday == 6) {/* Saturday */
                    $td.addClass('wday_sat');
               }

               /* Set a special mark class */
               if (realDay == date.getDate()) { /* selected day */
                    $td.addClass('active');
               }

               if (isCurrentMonth && realDay == todayDate.getDate()) { /* today */
                    $td.addClass('today');
               }

               var realDayObjMN =  new Date(realDayObj.getTime());
               realDayObjMN.setHours(23);
               realDayObjMN.setMinutes(59);
               realDayObjMN.setSeconds(59);
                    
               if (
                    // compare to 23:59:59 on the current day (if MIN is 1pm, then we still need to show this day
                    ((minDate != null) && (minDate > realDayObjMN.getTime())) || ((maxDate != null) && (maxDate < realDayObj.getTime())) // compare to 00:00:00
               ) { // Out of range day
                    $td.addClass('out_of_range');
               } else if (isFutureOnly && isPast) { // Past day
                    $td.addClass('day_in_past');
               } else {
                    /* Set event-handler to day cell */
                    $td.click(function() {
                         if ($(this).hasClass('hover')) {
                              $(this).removeClass('hover');
                         }
                         $(this).addClass('active');

                         var $picker = getParentPickerObject($(this));
                         var targetDate = new Date($(this).data("dateStr"));
                         var selectedDate = getPickedDate($picker);
                         draw($picker, {
                              "isAnim": false,
                              "isOutputToInputObject": true
                         }, targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), selectedDate.getHours(), selectedDate.getMinutes());
                              if ($picker.data("dateOnly") === true && $picker.data("isInline") === false && $picker.data("closeOnSelected")){
                                   // Close a picker
                                   ActivePickerId = -1;
                                   $picker.hide();
                              }                        
                    });

                    $td.hover(function() {
                         if (! $(this).hasClass('active')) {
                              $(this).addClass('hover');
                         }
                    }, function() {
                         if ($(this).hasClass('hover')) {
                              $(this).removeClass('hover');
                         }
                    });
               }

               /* ---- */
          }
          
          if ($picker.data("timeOnly") === true) {
               /* dateOnly mode */
               //console.log("Entra");
               $calendar.css("display", "none");
               $header.css("display", "none");
          }
          if ($picker.data("dateOnly") === true) {
               /* dateOnly mode */
               $timelist.css("display", "none");
          } else {
               /* Timelist ----- */
               $timelist.children().remove();

               /* Set height to Timelist (Calendar innerHeight - Calendar padding) */
               if ($calendar.innerHeight() > 0) {
                    $timelist.css("height", $calendar.innerHeight() - 10 + 'px');
               }

               realDayObj =  new Date(date.getTime());
               $timelist.css("height", $calendar.innerHeight() - 10 + 'px');

               /* Output time cells */
               var hour_ = minTime[0];
               var min_ = minTime[1];

               while( hour_*100+min_ < maxTime[0]*100+maxTime[1] ){

                    var $o = $('<div>');
                    var is_past_time = hour_ < todayDate.getHours() || (hour_ == todayDate.getHours() && min_ < todayDate.getMinutes());
                    var is_past = isCurrentDay && is_past_time;
                    
                    $o.addClass('timelist_item');
                    $o.text(zpadding(hour_) + ":" + zpadding(min_));

                    $o.data("hour", hour_);
                    $o.data("min", min_);

                    $timelist.append($o);

                    realDayObj.setHours(hour_);
                    realDayObj.setMinutes(min_);

                    if (
                         ((minDate != null) && (minDate > realDayObj.getTime())) || ((maxDate != null) && (maxDate < realDayObj.getTime()))
                    ) { // Out of range cell
                         $o.addClass('out_of_range');
                    } else if (isFutureOnly && is_past) { // Past cell
                         $o.addClass('time_in_past');
                    } else { // Normal cell
                         /* Set event handler to time cell */
                         $o.click(function() {
                              if ($(this).hasClass('hover')) {
                                   $(this).removeClass('hover');
                              }
                              $(this).addClass('active');

                              var $picker = getParentPickerObject($(this));
                              var date = getPickedDate($picker);
                              var hour = $(this).data("hour");
                              var min = $(this).data("min");
                              draw($picker, {
                                   "isAnim": false,
                                   "isOutputToInputObject": true
                              }, date.getFullYear(), date.getMonth(), date.getDate(), hour, min);

                              if ($picker.data("isInline") === false && $picker.data("closeOnSelected")){
                                   // Close a picker
                                   ActivePickerId = -1;
                                   $picker.hide();
                              }
                         });

                         $o.hover(function() {
                              if (! $(this).hasClass('active')) {
                                   $(this).addClass('hover');
                              }
                         }, function() {
                              if ($(this).hasClass('hover')) {
                                   $(this).removeClass('hover');
                              }
                         });
                    }
                    
                    if (hour_ == date.getHours() && min_ == date.getMinutes()) { /* selected time */
                         $o.addClass('active');
                         timelist_activeTimeCell_offsetTop = $o.offset().top;
                    }

                    min_ += minuteInterval;
                    if (min_ >= 60){
                         min_ = min_ - 60;
                         hour_++;
                    }
                    
               }

               /* Scroll the timelist */
               if(isScroll === true){
                    /* Scroll to new active time-cell position */
                    $timelist.scrollTop(timelist_activeTimeCell_offsetTop - $timelist.offset().top);
               }else{
                    /* Scroll to position that before redraw. */
                    $timelist.scrollTop(drawBefore_timeList_scrollTop);
               }
          }
          
          /* Fade-in animation */
          if (isAnim === true) {
               if(changePoint == "calendar"){
                    $calendar.fadeTo("fast", 1.0);
               }else if(changePoint == "timelist"){
                    //$timelist.fadeTo("fast", 1.0);
               }
          }

          /* Output to InputForm */
          if (isOutputToInputObject === true) {
               outputToInputObject($picker);
          }
     };

     /* Check for object type */
     var isObj = function(type, obj) {
          /* http://qiita.com/Layzie/items/465e715dae14e2f601de */
          var clas = Object.prototype.toString.call(obj).slice(8, -1);
          return obj !== undefined && obj !== null && clas === type;
     };

     var init = function($obj, opt) {
          /* Container */
          var $picker = $('<div>');

          $picker.destroy = function() {
               window.alert('destroy!');
          };

          $picker.addClass('datepicker');
          $obj.append($picker);

          /* Set current date */
          if(!opt.current) {
               opt.current = new Date();
          } else {
               var format = getDateFormat(opt.dateFormat, opt.locale, opt.dateOnly, opt.timeOnly);
               var date = parseDate(opt.current, format);
               if (date) {
                    opt.current = date;
               } else {
                    opt.current = new Date();
               }
          }

          /* Set options data to container object  */
          if (opt.inputObjectId != null) {
               $picker.data("inputObjectId", opt.inputObjectId);
          }
          $picker.data("dateOnly", opt.dateOnly);
          $picker.data("timeOnly", opt.timeOnly);
          $picker.data("pickerId", PickerObjects.length);
          $picker.data("dateFormat", opt.dateFormat);
          $picker.data("locale", opt.locale);
          $picker.data("firstDayOfWeek", opt.firstDayOfWeek);
          $picker.data("animation", opt.animation);
          $picker.data("closeOnSelected", opt.closeOnSelected);
          $picker.data("timelistScroll", opt.timelistScroll);
          $picker.data("calendarMouseScroll", opt.calendarMouseScroll);
          $picker.data("todayButton", opt.todayButton);
          $picker.data('futureOnly', opt.futureOnly);
          $picker.data('onShow', opt.onShow);
          $picker.data('onHide', opt.onHide);
          $picker.data('onInit', opt.onInit);
          $picker.data('allowWdays', opt.allowWdays);

          var minDate = Date.parse(opt.minDate);
          if (isNaN(minDate)) { // invalid date?
               $picker.data('minDate', null); // set to null
          } else {
               $picker.data('minDate', minDate);
          }

          var maxDate = Date.parse(opt.maxDate);
          if (isNaN(maxDate)) { // invalid date?
               $picker.data('maxDate', null);  // set to null
          } else {
               $picker.data('maxDate', maxDate);
          }
          $picker.data("state", 0);

          if( 5 <= opt.minuteInterval && opt.minuteInterval <= 30 ){
               $picker.data("minuteInterval", opt.minuteInterval);
          } else {
               $picker.data("minuteInterval", 30);
          }
               opt.minTime = opt.minTime.split(':');   
               opt.maxTime = opt.maxTime.split(':');

          if(! ((opt.minTime[0] >= 0 ) && (opt.minTime[0] <24 ))){
               opt.minTime[0]="00";
          }    
          if(! ((opt.maxTime[0] >= 0 ) && (opt.maxTime[0] <24 ))){
               opt.maxTime[0]="23";
          }
          if(! ((opt.minTime[1] >= 0 ) && (opt.minTime[1] <60 ))){
               opt.minTime[1]="00";
          }    
          if(! ((opt.maxTime[1] >= 0 ) && (opt.maxTime[1] <24 ))){
               opt.maxTime[1]="59";
          }
          opt.minTime[0]=parseInt(opt.minTime[0]);
          opt.minTime[1]=parseInt(opt.minTime[1]);
          opt.maxTime[0]=parseInt(opt.maxTime[0]);
          opt.maxTime[1]=parseInt(opt.maxTime[1]);
          $picker.data('minTime', opt.minTime);
          $picker.data('maxTime', opt.maxTime);
          
          /* Header */
          var $header = $('<div>');
          $header.addClass('datepicker_header');
          $picker.append($header);
          /* InnerContainer*/
          var $inner = $('<div>');
          $inner.addClass('datepicker_inner_container');
          $picker.append($inner);
          /* Calendar */
          var $calendar = $('<div>');
          $calendar.addClass('datepicker_calendar');
          var $table = $('<table>');
          $table.addClass('datepicker_table');
          $calendar.append($table);
          $inner.append($calendar);
          /* Timelist */
          var $timelist = $('<div>');
          $timelist.addClass('datepicker_timelist');
          $inner.append($timelist);

          /* Set event handler to picker */
          $picker.hover(
               function(){
                    ActivePickerId = $(this).data("pickerId");
               },
               function(){
                    ActivePickerId = -1;
               }
          );

          /* Set event-handler to calendar */
          if (opt.calendarMouseScroll) {
               if (window.sidebar) { // Mozilla Firefox
                    $calendar.bind('DOMMouseScroll', function(e){ // Change a month with mouse wheel scroll for Fx
                         var $picker = getParentPickerObject($(this));
                         
                         // up,left [delta < 0] down,right [delta > 0]
                         var delta = e.originalEvent.detail;
                         /*
                         // this code need to be commented - it's seems to be unnecessary
                         // normalization (/3) is not needed as we move one month back or forth
                         if(e.originalEvent.axis !== undefined && e.originalEvent.axis == e.originalEvent.HORIZONTAL_AXIS){
                              e.deltaX = delta;
                              e.deltaY = 0;
                         } else {
                              e.deltaX = 0;
                              e.deltaY = delta;
                         }
                         e.deltaX /= 3;
                         e.deltaY /= 3;
                         */
                         if(delta > 0) {
                              nextMonth($picker);
                         } else {
                              beforeMonth($picker);
                         }
                         return false;
                    });
               } else { // Other browsers
                    $calendar.bind('mousewheel', function(e){ // Change a month with mouse wheel scroll
                         var $picker = getParentPickerObject($(this));
                         // up [delta > 0] down [delta < 0]
                         if(e.originalEvent.wheelDelta /120 > 0) {
                              beforeMonth($picker);
                         } else {
                              nextMonth($picker);
                         }
                         return false;
                    });
               }
          }

          PickerObjects.push($picker);

          draw_date($picker, {
               "isAnim": true,
               "isOutputToInputObject": opt.autodateOnStart
          }, opt.current);
     };
     
     var getDefaults = function() {
          return {
               "current": null,
               "dateFormat": "default",
               "locale": "en",
               "animation": true,
               "minuteInterval": 30,
               "firstDayOfWeek": 0,
               "closeOnSelected": false,
               "timelistScroll": true,
               "calendarMouseScroll": true,
               "todayButton": true,
               "dateOnly": false,
               "timeOnly": false,
               "futureOnly": false,
               "minDate" : null,
               "maxDate" : null,
               "autodateOnStart": true,
               "minTime":"00:00",
               "maxTime":"23:59",
               "onShow": null,
               "onHide": null,
               "allowWdays": null
          };
     };
     
     /**
      * Initialize dtpicker
      */
      $.fn.dtpicker = function(config) {
          var date = new Date();
          var defaults = getDefaults();
          
          defaults.inputObjectId = undefined;
          var options = $.extend(defaults, config);

          return this.each(function(i) {
               init($(this), options);
          });
      };

     /**
      * Initialize dtpicker, append to Text input field
      * */
      $.fn.appendDtpicker = function(config) {
          var date = new Date();
          var defaults = getDefaults();
          
          defaults.inline = false;
          var options = $.extend(defaults, config);

          return this.each(function(i) {
               /* Checking exist a picker */
               var input = this;
               if(0 < $(PickerObjects[$(input).data('pickerId')]).length) {
                    console.log("dtpicker - Already exist appended picker");
                    return;
               }

               /* Add input-field with inputsObjects array */
               var inputObjectId = InputObjects.length;
               InputObjects.push(input);

               options.inputObjectId = inputObjectId;

               /* Current date */
               var date, strDate, strTime;
               if($(input).val() != null && $(input).val() !== ""){
                    options.current = $(input).val();
               }

               /* Make parent-div for picker */
               var $d = $('<div>');
               if(options.inline){ // Inline mode
                    $d.insertAfter(input);   
               } else { // Float mode
                    $d.css("position","absolute");
                    $('body').append($d);
               }

               /* Initialize picker */

               var pickerId = PickerObjects.length;

               var $picker_parent = $($d).dtpicker(options); // call dtpicker() method

               var $picker = $picker_parent.children('.datepicker');

               /* Link input-field with picker*/
               $(input).data('pickerId', pickerId);

               /* Set event handler to input-field */

               $(input).keyup(function() {
                    var $input = $(this);
                    var $picker = $(PickerObjects[$input.data('pickerId')]);
                    if ($input.val() != null && (
                         $input.data('beforeVal') == null ||
                         ( $input.data('beforeVal') != null && $input.data('beforeVal') != $input.val()) )
                         ) { /* beforeValue == null || beforeValue != nowValue  */
                         var format = getDateFormat($picker.data('dateFormat'), $picker.data('locale'), $picker.data('dateOnly'), $picker.data('timeOnly'));
                         var date = parseDate($input.val(), format);
                         //console.log("dtpicker - inputKeyup - format: " + format + ", date: " + $input.val() + " -> " + date);
                         if (date) {
                              draw_date($picker, {
                                   "isAnim":true,
                                   "isOutputToInputObject":false
                              }, date);
                         }
                    }
                    $input.data('beforeVal', $input.val());
               });

               $(input).change(function(){
                    $(this).trigger('keyup');
               });

               var handler = new PickerHandler($picker, $(input));

               if(options.inline === true){
                    /* inline mode */
                    $picker.data('isInline',true);
               } else {
                    /* float mode */
                    $picker.data('isInline',false);
                    $picker_parent.css({
                         "zIndex": 100
                    });
                    $picker.css("width","auto");

                    /* Hide this picker */
                    $picker.hide();
                    
                    /* Set onClick event handler for input-field */
                    $(input).on('click, focus',function(){
                         var $input = $(this);
                         var $picker = $(PickerObjects[$input.data('pickerId')]);

                         // Generate the handler of a picker
                         var handler = new PickerHandler($picker, $input);
                         // Get the display state of a picker
                         var is_showed = handler.isShow();
                         if (!is_showed) {
                              // Show a picker
                              handler.show();

                              // Call a event-hanlder
                              var func = $picker.data('onShow');
                              if (func != null) {
                                   console.log("dtpicker- Call the onShow handler");
                                   func(handler);
                              }
                         }
                    });

                    // Set an event handler for resizing of a window
                    (function(handler){
                         $(window).resize(function(){
                              handler._relocate();
                         });
                         $(window).scroll(function(){
                              handler._relocate();
                         });
                    })(handler);
               }

               // Set an event handler for removing of an input-field
               $(input).bind('destroyed', function() {
                    var $input = $(this);
                    var $picker = $(PickerObjects[$input.data('pickerId')]);
                    // Generate the handler of a picker
                    var handler = new PickerHandler($picker, $input);
                    // Destroy a picker
                    handler.destroy();
               });

               // Call a event-handler
               var func = $picker.data('onInit');
               if (func != null) {
                    console.log("dtpicker- Call the onInit handler");
                    func(handler);
               }
          });
     };

     /**
      * Handle a appended dtpicker
      * */
     var methods = {
          show : function( ) {
               var $input = $(this);
               var $picker = $(PickerObjects[$input.data('pickerId')]);
               if ($picker != null) {
                    var handler = new PickerHandler($picker, $input);
                    // Show a picker
                    handler.show();
               }
          },
          hide : function( ) {
               var $input = $(this);
               var $picker = $(PickerObjects[$input.data('pickerId')]);
               if ($picker != null) {
                    var handler = new PickerHandler($picker, $input);
                    // Hide a picker
                    handler.hide();
               }
          },
          setDate : function( date ) {
               var $input = $(this);
               var $picker = $(PickerObjects[$input.data('pickerId')]);
               if ($picker != null) {
                    var handler = new PickerHandler($picker, $input);
                    // Set a date
                    handler.setDate(date);
               }
          },
          getDate : function( ) {
               var $input = $(this);
               var $picker = $(PickerObjects[$input.data('pickerId')]);
               if ($picker != null) {
                    var handler = new PickerHandler($picker, $input);
                    // Get a date
                    return handler.getDate();
               }
          },
          destroy : function( ) {
               var $input = $(this);
               var $picker = $(PickerObjects[$input.data('pickerId')]);
               if ($picker != null) {
                    var handler = new PickerHandler($picker, $input);
                    // Destroy a picker
                    handler.destroy();
               }
          }
     };

     $.fn.handleDtpicker = function( method ) { 
          if ( methods[method] ) {
               return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
          } else if ( typeof method === 'object' || ! method ) {
               return methods.init.apply( this, arguments );
          } else {
               $.error( 'Method ' +  method + ' does not exist on jQuery.handleDtpicker' );
          }
     };

     if (!window.console) { // Not available a console on this environment.
          window.console = {};
          window.console.log = function(){};
     }

     /* Define a special event for catch when destroy of an input-field. */
     $.event.special.destroyed = {
          remove: function(o) {
               if (o.handler) {
                    o.handler.apply(this, arguments);
               }
          }
     };
     
     /* Set event handler to Body element, for hide a floated-picker */
     $(function(){
          $('body').click(function(){
               for(var i=0;i<PickerObjects.length;i++){
                    var $picker = $(PickerObjects[i]);
                    if(ActivePickerId != i){ /* if not-active picker */
                         if($picker.data("inputObjectId") != null && $picker.data("isInline") === false && $picker.css('display') != 'none'){
                              /* if append input-field && float picker */

                              // Hide a picker
                              var $input = InputObjects[$picker.data("inputObjectId")];
                              var handler = new PickerHandler($picker, $input);
                              handler.hide();

                              // Call a event-hanlder
                              var func = $picker.data('onHide');
                              if (func != null) {
                                   console.log("dtpicker- Call the onHide handler");
                                   func(handler);
                              }
                         }
                    }
               }
          });
     });
     
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

     $('input[data-type~=multiple]').multipleInput();
     $('div[data-type~=multiple], ul[data-type~=multiple]').multipleDiv();
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
     $("input[data-type~=time]").attr("pattern","(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9])");
     $("input[data-type~=time]").appendDtpicker({
          "timeOnly": true
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
     // Froala
     if($('textarea[data-type~=wysiwyg]').length) {
          $('head').append('<link rel="stylesheet" href="'+url+'froala/css/font-awesome.min.css" type="text/css" />');
          $('head').append('<link rel="stylesheet" href="'+url+'froala/css/froala_editor.min.css" type="text/css" />');
          $('head').append('<link rel="stylesheet" href="'+url+'froala/css/froala_style.min.css" type="text/css" />');
          $.getScript(url+"froala/js/froala_editor.min.js", function(){
               
               $(function() {
                    $('textarea[data-type=wysiwyg]').editable({inlineMode: false, height: '300'})
               });
          });
     }
     // Jquery UI
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
                         var reload = $(this).attr("data-reload");
                         if (reload==undefined) {
                              reload = false;
                         }
                         var actions = $(this).attr("data-action");
                         if (actions==undefined) {
                              actions = false;
                         }

                         var name = $(this).attr("name");
                         var required = "";
                         if ($(this).attr("required")) { required = " required"; };
                         $("<div class='autclt'><input type='text' name='"+name+"ac'"+required+" /><span class='closeauto'>x</span></div>").insertAfter(this);
                         $(this).css("display","none");
                         var auto = $("input[name="+name+"ac]");
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
                         $(this).css("display","none");
                         $(this).css("disabled","disabled");
                         var name = $(this).attr("name");
                         var max = parseInt($(this).attr("data-max"));
                         var min = parseInt($(this).attr("data-min"));
                         $("<div id='"+name+"-sl'></div><input name=\""+name+"['max']\" id='"+name+"-sl-max' style='display:none;' /><input name=\""+name+"[\'min\']\" id='"+name+"-sl-min' style='display: none;' />").insertAfter(this);
                         //console.log($( "#"+name+"-sl" ));
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
                    });
               } 
               if($('[data-type~=tooltip]').length) {
                    $(function() {
                         var tooltips = $( "[title]" ).tooltip({
                              position: {
                                   my: "left top",
                                   at: "right+5 top-5"
                              }
                        });
                    });
               }
          });
     }
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
               $("[for="+id+"]").css("display","none");

               $(this).click(function(){
                    $(this).css("display","none");
                    $("[for="+id+"]").css("display","block");
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

})( jQuery );

//console.log(obj.element.getAttribute("data-type"));
