// requires an unspecified Bioclipse development version

ds = opentox.createDataset(
  "http://apps.ideaconsult.net:8080/ambit2/",
  cdk.fromSMILES("ClC(I)Br")
);

opentox.addMolecule(ds, cdk.fromSMILES("CCCCC[N+](C)(C)C"))

opentox.deletaDataset(ds);
