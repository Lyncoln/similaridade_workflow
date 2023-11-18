// JavaScript

// Naringenin
spec = spectrum.createEmpty();
spec.addPeak(119.051, 467.616);
spec.addPeak(123.044, 370.662);
spec.addPeak(147.044, 6078.145);
spec.addPeak(153.019, 10000.0);
spec.addPeak(179.036, 141.192);
spec.addPeak(189.058, 176.358);
spec.addPeak(273.076, 10000.000);
spec.addPeak(274.083, 318.003);
//ui.open(spec)

// Also Naringenin
var compounds = cdk.createMoleculeList()

mol1=cdk.fromSMILES("C1C(OC2=CC(=CC(=C2C1=O)O)O)C3=CC=C(C=C3)O");
mol2=cdk.fromSMILES("C1=CC(=CC=C1C=CC(=O)C2=C(C=C(C=C2O)O)O)O");
mol3=cdk.fromSMILES("C1C(C(=O)C2=C(O1)C=C(C=C2)O)C3=C(C=C(C=C3)O)O");

compounds.add(mol1)
compounds.add(mol2)
compounds.add(mol3)

//ui.open(mol1)

// Try to MetFrag it ;-)
metfrag.score(spec, mol1);

metfrag.scores(spec, compounds);
