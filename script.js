(function($){
    $.fn.extend({
        numAnim: function(options) {
            if ( ! this.length)
                return false;

            this.defaults = {
                endAt: 90,
                numClass: 'autogen-num',
                duration: 0.5,  
                interval: 25 
            };
            var settings = $.extend({}, this.defaults, options);

            var $num = $('<span/>', {
                'class': settings.numClass 
            });

            return this.each(function() {
                var $this = $(this);

                var frag = document.createDocumentFragment(),
                    numLen = settings.endAt.toString().length;
                for (x = 0; x < numLen; x++) {
                    var rand_num = Math.floor( Math.random() * 10 );
                    frag.appendChild( $num.clone().text(rand_num)[0] )
                }
                $this.empty().append(frag);

                var get_next_num = function(num) {
                    ++num;
                    if (num > 9) return 0;
                    return num;
                };

                $this.find('.' + settings.numClass).each(function() {
                    var $num = $(this),
                        num = parseInt( $num.text() );

                    var interval = setInterval( function() {
                        num = get_next_num(num);
                        $num.text(num);
                    }, settings.interval);

                    setTimeout( function() {
                        clearInterval(interval);
                    }, settings.duration * 1000 - settings.interval);
                });

                setTimeout( function() {
                    $this.text( settings.endAt.toString() );
                    $("#num-" + settings.endAt).addClass("generated");
                    generated_numbers.push(settings.endAt);
                }, settings.duration * 1000);
            });
        }
    });
})(jQuery);

var generated_numbers = [];

$(function(){
    for(i=1; i<=90; i++){
        $("<div />").addClass("num").html(i).attr("id","num-" + i).appendTo("#grid-container");
    }

    var cw = 0.88*$('.num').width();
    $('.num').css({'height':cw+'px','line-height':cw+'px'});
});

function generateNum(){

    while(true){
        var i = getRandomInt(1, 90);
        if($.inArray(i, generated_numbers) == -1){

            $("#number").numAnim({
                endAt: i
            });
            
            break;
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}