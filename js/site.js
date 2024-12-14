var pages = ['home','art','wpaper','shop'];
$(document).ready(function(){
        const currentYear = new Date().getFullYear();
        $('.footerdate').html(currentYear);

        for(let i = 0; i < pages.length; i++) {
            $('#'+pages[i]+'button').click(function(){
                showPage($(this).attr('data'));
            });
        }
});
function showPage(page)
{
        for(let i = 0; i < pages.length; i++) {
            $('#'+pages[i]+'page').css(
                {
                        'display' : 'none',
                });
                $('#'+pages[i]+'button').css(
                {
                        'cursor' : 'pointer',
                        'pointer-events' : 'auto',
                        'color' : 'inherit',
                });
        }
        $('#'+page+'page').css('display', 'block');
        $('#'+page+'button').css({
                'cursor' : 'default',
                'pointer-events' : 'none',
                'color' : '#F00',
        });
}