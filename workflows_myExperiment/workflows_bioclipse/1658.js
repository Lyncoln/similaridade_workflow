// requires an unspecified Bioclipse development version
// bioclipse.requireVersion("2.6")

service = "http://apps.ideaconsult.net:8080/ambit2/";
serviceSPARQL = "http://apps.ideaconsult.net:8080/ontology/";

models = opentox.listModels(serviceSPARQL);
model = models.get(3);
say("Model: " + model);

molecules = cdk.createMoleculeList();
molecules.add(cdk.fromSMILES("COC"));
molecules.add(cdk.fromSMILES("CNC"));

say(
  opentox.predictWithModel(service, model, molecules)
);


say(
  opentox.predictWithModel(
    "http://apps.ideaconsult.net:8080/ambit2/",
    "http://apps.ideaconsult.net:8080/ambit2/model/6",
    cdk.fromSMILES("COC")
  )
);

say(
  opentox.predictWithModelWithLabel(
    "http://apps.ideaconsult.net:8080/ambit2/",
    "http://apps.ideaconsult.net:8080/ambit2/model/35",
    cdk.fromSMILES("CCCO")
  )
);
