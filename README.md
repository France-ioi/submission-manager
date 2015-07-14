# submission-manager

Please copy config.sample.js to config.js and config_template.json to config.json

You can execute /tests/tests.php to load some datas.

In order to insert a submission in a page, this is the code to use :

    <iframe id="submission{{idSubmission}}" class="submission_iframe" scrolling="no" src="submission_template.html?curSubmission=&amp;showSubmission=&amp;urlfrom="> </iframe>

- curSubmission is the id of the submission (ex: 123456)
- showSubmission determines whether the whole submission will be displayed or only the header, by default (a boolean is expected)
- urlfrom refers to the current page (relative path).

Be careful concerning the order of the parameters and don't forget any of them !

Please make sure to define correctly the variable completeUrl (currently defined in config.js)
