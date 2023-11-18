
var sparql = "\
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
PREFIX dbpedia: <http://dbpedia.org/ontology/> \
PREFIX dbprop: <http://dbpedia.org/property/> \
\
SELECT DISTINCT ?compound ?smiles WHERE { \
  ?compound dbprop:section ?section . \
  ?section dbprop:smiles ?smiles . \
} ORDER BY ?compound LIMIT 10 OFFSET 0 \
";

var hits = rdf.sparqlRemote("http://dbpedia.org/sparql", sparql);
var compounds = cdk.createMoleculeList()
for (var i=1; i<=hits.getRowCount(); i++) {
  var smiles = hits.get(i, "smiles");
  smiles = smiles.replaceAll("\\s","");
  smiles = smiles.replaceAll("\\n","");
  if (smiles.endsWith("@en")) {
    smiles = smiles.substring(0, smiles.lastIndexOf('@'));
  }
  var mol = cdk.fromSMILES(smiles);
  var resource = hits.get(i, "compound");
  mol.setProperty("DBPedia", resource);
  compounds.add(mol);
}
cdk.saveSDFile("/Virtual/dbpediaHits.sdf", compounds)
ui.open("/Virtual/dbpediaHits.sdf")



