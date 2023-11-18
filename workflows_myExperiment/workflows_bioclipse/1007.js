mol = cdk.fromSMILES("COCN");

labels = new Array();
for (i=0; i<mol.getAtomContainer().getAtomCount(); i++) {
  labels[i] = mol.getAtomContainer().getAtom(i).getSymbol() + (i+1);
}
mat = comprepr.connectivityMatrix(mol);
matrix.setColumnLabels(mat, labels)
matrix.setRowLabels(mat, labels)

latex.writeMatrix(mat, "/Virtual/matrix.tex")
ui.open("/Virtual/matrix.tex")
