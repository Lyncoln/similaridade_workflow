var sparql = "\
select distinct ?pdbid where { \
?s <http://purl.org/dc/elements/1.1/title> ?title . \
?s <http://purl.org/dc/elements/1.1/identifier> ?pdbid . \
FILTER regex(?title, \"HIV\") . \
FILTER regex(?pdbid, \"pdb\") .} \
LIMIT 10";

var hits = rdf.sparqlRemote("http://pdb.bio2rdf.org/sparql", sparql);
ui.newProject("PDB")
for (var i=1; i<=hits.getRowCount(); i++) {
  var pdbID = hits.get(i, "pdbid");
  pdbID = pdbID.substring(pdbID.indexOf(":")+1);
  protein = ws.queryPDB(pdbID);
  for (var j=0; j<protein.size(); j++) {
    ui.open(protein.get(j));
  }
}