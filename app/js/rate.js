jQuery("#rating").slider({

    min: 0,

    max: 1000,

    values: [100, 500],

    range: true,

    stop: function (event, ui) {

        jQuery("input#minCost").val(jQuery("#rating").slider("values", 0));

        jQuery("input#maxCost").val(jQuery("#rating").slider("values", 1));

    },

    slide: function (event, ui) {

        jQuery("input#minCost").val(jQuery("#rating").slider("values", 0));

        jQuery("input#maxCost").val(jQuery("#rating").slider("values", 1));

    }
});

jQuery("input#minCost").change(function () {

    var value1 = jQuery("input#minCost").val();

    var value2 = jQuery("input#maxCost").val();

    if (parseInt(value1) > parseInt(value2)) {

        value1 = value2;

        jQuery("input#minCost").val(value1);

    }

    jQuery("#rating").slider("values", 0, value1);

});

jQuery("input#maxCost").change(function () {

    var value1 = jQuery("input#minCost").val();

    var value2 = jQuery("input#maxCost").val();

    if (value2 > 1000) {
        value2 = 1000;
        jQuery("input#maxCost").val(1000)
    }

    if (parseInt(value1) > parseInt(value2)) {

        value2 = value1;

        jQuery("input#maxCost").val(value2);

    }

    jQuery("#rating").slider("values", 1, value2);

});

$('.search-window-input').on('input', function(){
    var $this = $(this);
    if ($this.val() == '') {
        $this.removeClass('input-filled');
    } else {
        $this.addClass('input-filled');
    }
});
$('.entry-input').on('input', function(){
    var $this = $(this);
    if ($this.val() == '') {
        $this.removeClass('input-filled');
    } else {
        $this.addClass('input-filled');
    }
});
$('.pop-up-input').on('input', function(){
    var $this = $(this);
    if ($this.val() == '') {
        $this.removeClass('input-filled');
    } else {
        $this.addClass('input-filled');
    }
});
$('.subscription-input').on('input', function(){
    var $this = $(this);
    if ($this.val() == '') {
        $this.removeClass('input-filled');
    } else {
        $this.addClass('input-filled');
    }
});


