/* Author:

*/
jQuery(document).ready(function() {
});

var docCookies = {
    getItem: function (sKey) {
        if (!sKey) { 
            return null; 
        }
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    hasItem: function (sKey) {
        if (!sKey) { 
            return false; 
        }
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
};
var cookieLawSupport = {
    cookieEnabled: [],
    addScript: function(d, s, id, source) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = source;
        fjs.parentNode.insertBefore(js, fjs);
    },
    enqueueScript: function( funct ) {
        if (docCookies.hasItem('eu_cookie_law') && docCookies.getItem('eu_cookie_law')) {
            funct.call();
        } else {
            this.cookieEnabled.push(funct);
        }
    },
    removeDom: function (event) {
        event.preventDefault();
        cookieLawSupport.removeBanner();
    },
    removeBanner: function () {
        var el = document.getElementById('bannercookie');
        if (el) {
            el.remove();
        }
    },
    enableRemoveDom: function(event) {
        event.preventDefault();
        cookieLawSupport.enableAll();
        cookieLawSupport.removeBanner();
    },
    enableAll: function () {
        var cookieName = 'eu_cookie_law';
        var cookieValue = '1';
        var myDate = new Date();
        myDate.setMonth(myDate.getMonth() + 120);
        document.cookie = cookieName +"=" + cookieValue + ";expires=" + myDate
                          + ";domain=dietor.it;path=/";
        for (var i = 0; i < this.cookieEnabled.length; i++) {
            try {
                this.cookieEnabled[i].call();
            } catch (error) {
                if (typeof(console) != 'undefined' && typeof(console.log) != 'undefined') {
                    console.log(error);
                }
            }
        };
    }
};

var includeSDKFacebook = function(a,b,c) {
    var d,e=a.getElementsByTagName(b)[0];
    a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src="//connect.facebook.net/it_IT/all.js#xfbml=1&appId=569630063059984",e.parentNode.insertBefore(d,e))
};
var includeSDKFacebookExec = function () {
    includeSDKFacebook(document,"script","facebook-jssdk");
};
//cookieLawSupport.enqueueScript(includeSDKFacebookExec);


(function(){

    includeSDKFacebookExec();

    COOKIES_ENABLER.init({
        scriptClass: 'ce-script',
        iframeClass: 'ce-iframe',
        acceptClass: 'ce-accept',
        dismissClass: 'ce-dismiss',
        disableClass: 'ce-disable',

        bannerClass: 'ce-banner',
        bannerHTML:
            '<div class="ce-banner__inner">'
                +'<h3>Informativa Cookie</h3>'
                +'<p class="ce-banner__text">'
                +'Questo sito utilizza cookie, anche di terze parti, per inviarti pubblicità e servizi in linea con le tue preferenze.' 
                +'Se vuoi saperne di più o negare il consenso a tutti o ad alcuni cookie ' 
                +'<a href="https://www.sperlari.it/cookie-policy/#dietor" target="_blank">clicca qui</a>.'
                +'<br/> Chiudendo questo banner, scorrendo questa pagina o cliccando qualunque suo elemento, acconsenti all\'uso dei cookie.'
                +'<a href="#" class="ce-accept">Accetto</a>'
                +'</p>'
            +'</div>',

        eventScroll: false,
        clickOutside: false,
        scrollOffset: 0,

        cookieName: 'dietor-cookie',
        cookieDuration: '180',
        wildcardDomain: false,

        iframesPlaceholder: true,
        iframesPlaceholderHTML:
            '<p>Per accedere a questo contenuto devi '
                +'<a href="#" class="ce-accept">Abilitare i cookie</a>'
            +'</p>',
        iframesPlaceholderClass: 'ce-iframe-placeholder',
    });

}());