// requires an unspecified Bioclipse development version
// bioclipse.requireVersion("2.6")

service = "http://apps.ideaconsult.net:8080/ambit2/";
serviceSPARQL = "http://apps.ideaconsult.net:8080/ontology/";

stringMat = opentox.listDescriptors(serviceSPARQL);
stringMat.getColumn("algo"); // returns the descriptor services
stringMat.getColumn("desc"); // returns the BO entries

descriptor = stringMat.get(1,1);

molecules = cdk.createMoleculeList();
molecules.add(cdk.fromSMILES("COC"));
molecules.add(cdk.fromSMILES("CNC"));

say(
  opentox.calculateDescriptor(service, descriptor, molecules)
);

say(
  opentox.calculateDescriptor(service, descriptor, cdk.fromSMILES("CCC"))
);
