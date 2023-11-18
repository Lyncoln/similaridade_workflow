// query a service using the OpenTox API 1.1
// See: http://www.opentox.org/dev/apis/api-1.1

var service = "http://apps.ideaconsult.net:8080/ambit2/";

var datasets = opentox.listDataSets(service);
// for (set=0; set<datasets.size(); set++) {
for (set=0; set<5; set++) {
  var dataset = datasets.get(set);
  js.say("Downloading set: " + dataset);
  ui.open(
    opentox.downloadDataSetAsMDLSDfile(
       service, dataset, "/OpenTox/ambit" + set + ".sdf"
    )
  )
}
 