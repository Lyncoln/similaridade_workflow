var mols = cdk.loadMolecules("/SampleData/SDF/Fragments2.sdf")

for (i=0; i<mols.size(); i++) {
  js.say(
    mols.get(i) + " has mass " +
    cdk.calculateMass(mols.get(i))
  );
}