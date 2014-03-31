function setupAjaxForm(form_id, form_validations) {
    var form = '#' + form_id;
    var form_message = form + '-message';
    var disableSubmit = function(val) {
        $(form + ' input[type=submit]').attr('disabled', val);
    };
    $(form).ajaxSend(function(){
        $(form_message).removeClass().addClass('loading').html('Loading...').fadeIn();
    });
    var options = {
        dataType:  'json',
        beforeSubmit: function(){
            if(typeof form_validations == "function" && !form_validations()) {
                return false;
            }
            disableSubmit(true);
        },
        success: function(json){
            $(form_message).hide();
            $(form_message).removeClass().addClass(json.type).html(json.message).fadeIn('slow');
            disableSubmit(false);
            if(json.type == 'success') {
                $(form).clearForm().hide();
                $('.thanksalot').show();
            };
        }
    };
    $(form).ajaxForm(options);
};
$(document).ready(function(){
    new setupAjaxForm('contact-us');
});