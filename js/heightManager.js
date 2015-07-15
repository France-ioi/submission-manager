/*!
 * jQuery postMessage - v0.5 - 9/11/2009
 * http://benalman.com/projects/jquery-postmessage-plugin/
 *
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 *
 * Version from
 * https://github.com/jkeys089/jquery-postmessage
 */
(function($,f){var b,d,j=1,a,g=!1,h="postMessage",c="addEventListener",e,i=f[h];
$[h]=function(k,m,l){if(!m){return;}k=typeof k==="string"?k:$.param(k);l=l||parent;if(i){f.setTimeout(function(){l[h](k,m.replace(/([^:]+:\/\/[^\/]+).*/,"$1"));
},0);}else{if(m){l.location=m.replace(/#.*$/,"")+"#"+(+new Date())+(j++)+"&"+k;}}};$.receiveMessage=e=function(m,l,k){if(i){if(m){a&&e();a=function(n){if(n.domain){l=l.split("://")[1];
n.origin=n.domain;}if((typeof l==="string"&&n.origin!==l)||($.isFunction(l)&&l(n.origin)===g)){return g;}m(n);};}if(f[c]){f[m?c:"removeEventListener"]("message",a,g);
}else{f[m?"attachEvent":"detachEvent"]("onmessage",a);}}else{b&&clearInterval(b);b=null;if(m){k=typeof l==="number"?l:typeof k==="number"?k:100;b=setInterval(function(){var o=document.location.hash,n=/^#?\d+&/;
if(o!==d&&n.test(o)){d=o;m({data:o.replace(n,"")});}},k);}}};})(jQuery,window);

var heightManager = {
	idSubmission: undefined,
	idTag: undefined,
	submissionGlobal: undefined,
	urlFrom: undefined,
	canCheckHeight: true,
	checkHeight: function(idSubmission)
	{
		this.idSubmission = idSubmission;
		this.submissionGlobal = $('.submission_global');
		this.idTag = 'submission' + idSubmission;
		$('.submission_global').resize(function(e) // We don't use $('body') to prevent errors, mainly on google chrome
		{
			if (this.canCheckHeight)
			{
				heightManager.sendMessage(true);
			}
		});
	},
	sendMessage: function(isFixedHeight)
	{
		var height = (isFixedHeight) ? $('.submission_global').css('height') : -1;

		$.postMessage({id: this.idTag, height: height}, completeUrl + this.urlFrom, parent);
	}		
};
