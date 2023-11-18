var toposomeURL = "http://toposome.chemistry.drexel.edu/~rguha/rest/db/pubchem/cas2smi/";

var casnumbers = ["50-00-0", "88566-80-7"];

var molList = cdk.createMoleculeList()
for (i=0;i<casnumbers.length;i++) {
  var cas = casnumbers[i];
  js.print("CAS: " + cas + "\n");
  var smiles = bioclipse.download(toposomeURL + cas).trim();
  js.print("SMILES: " + smiles + "\n");
  var mol = cdk.fromSMILES(smiles);
  mol = cdk.generate3dCoordinates(mol);
  molList.add(mol);
}
var sdFile = "/Virtual/list.sdf";
cdk.saveSDFile(sdFile, molList);
ui.open(sdFile);

