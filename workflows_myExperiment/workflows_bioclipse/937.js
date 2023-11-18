var smileses = new Array("CC(C)C", "CCCN", "CCC=O");

var unaligned = cdk.createMoleculeList();
for (i=0; i<smileses.length; i++) {
  mol = cdk.fromSMILES(smileses[i]);
  mol = cdk.generate3dCoordinates(mol)
  unaligned.add(mol);
}

var aligned = cdk.kabsch(unaligned)

for (i=0; i<aligned.size(); i++) {
  jmol.load(unaligned.get(i));
  jmol.append(aligned.get(i));
}

jmol.load(aligned.get(0));
for (i=1; i<aligned.size(); i++) {
  jmol.append(aligned.get(i));
}
