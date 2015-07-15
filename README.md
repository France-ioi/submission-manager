# submission-manager

### Installation

Copy `config_local_template.php` to `config_local.php` and fill it.

Visit `dbv/index.php` (login/password in `dbv/config.php`) and apply schema and revisions.

Run

    php commonFramework/modelsManager/triggers.php

### Testing

Run `php tests/tests.php` to load some data.

In order to insert a submission in a page, this is the code to use :

    <iframe id="submission{{idSubmission}}" class="submission_iframe" scrolling="no" src="submission_template.html?curSubmission=&amp;showSubmission=&amp;urlfrom="> </iframe>

- curSubmission is the id of the submission (ex: 123456)
- showSubmission determines whether the whole submission will be displayed or only the header, by default (a boolean is expected)
- urlfrom refers to the current page (relative path).

Be careful concerning the order of the parameters and don't forget any of them !

Please make sure to define correctly the variable completeUrl (currently defined in config.js)
