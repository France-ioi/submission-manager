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
