$.receiveMessage(function(e)
{
	console.log('Received datas');
	var datas = e.data.split('&');
	var idTag = datas[0].split('=')[1];
	var heightTmp = datas[1].split('=')[1];
	var height = parseInt(heightTmp.split('p')[0]);
	var heightString = height + 10 + 'px';
	
	console.log('Height received from ' + idTag + ' : ' + height + ' (' + heightString + ')');
	
	//alert('idTag : ' + idTag + ' height : ' + height);
	$('#' + idTag).css('height', (height >= 0) ? heightString : '70%');
	
	if(isLoadingRecentSubmissions && heightString != '0px')
	{
		$('#header-' + idTag).css('display', 'none');
	}
});
