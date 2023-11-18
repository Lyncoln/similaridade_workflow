// query a service using the OpenTox API 1.1
// See: http://www.opentox.org/dev/apis/api-1.1

var service = "http://apps.ideaconsult.net:8080/ambit2/";
serviceSPARQL = "http://apps.ideaconsult.net:8080/ontology/";

var algorithms = opentox.listAlgorithms(serviceSPARQL);
say("#Algorithms: " + algorithms.size());
var descriptors = opentox.listDescriptors(serviceSPARQL);
say("#Descriptors: " + descriptors.getRowCount());
