var pages = ['home','art','wpaper','shop','support'];
var currentpage=  'home';
$(document).ready(function(){
        const currentYear = new Date().getFullYear();
        $('.footerdate').html(currentYear);

        for(let i = 0; i < pages.length; i++) {
            $('#'+pages[i]+'button').click(function(){
                showPage($(this).attr('data'));
            });
        }
        $('#artclick').click(function(){
                if(currentpage != 'art')
                {
                        $('#artbutton').click();
                }
        })
        $('#whitepaperclick').click(function(){
                if(currentpage != 'wpaper')
                {
                        $('#wpaperbutton').click();
                }
        }) 
        $('#shopclick').click(function(){
                if(currentpage != 'shop')
                {
                        $('#shopbutton').click();
                }
        })
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
        currentpage = page;
}