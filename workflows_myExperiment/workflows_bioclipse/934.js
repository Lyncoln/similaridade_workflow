var list = cdk.createMoleculeList();

list.add(cdk.fromSMILES("CC(=O)CN"));
list.add(cdk.fromSMILES("O=CC(N)O"));
list.add(cdk.fromSMILES("ClC(=O)CN"));

var mcss = cdk.mcss(list);
ui.open(mcss);
