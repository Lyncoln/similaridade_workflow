// open this URL in a browser first
bioclipse.requireVersion("2.5")

google.setUserCredentials("your.account", "secretPassword")
google.listSpreadsheets()
google.listWorksheets("SolubilitiesSum") // needs 2.5.0 from 2011-06-06 or later
spreadsheet = google.loadWorksheet("SolubilitiesSum", "Sheet1")


