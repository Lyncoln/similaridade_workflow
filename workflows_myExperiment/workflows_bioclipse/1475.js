// bioclipse.requireVersion("2.4.1","2.6")

model = rdf.createInMemoryStore()
rdf.importRDFa(model, "http://egonw.github.com/cheminformatics.classics/classic1.html")

data = rdf.sparql(model,
"PREFIX cc:   <http://github.com/egonw/cheminformatics.classics/1/#> " +
"PREFIX chem: <http://www.blueobelisk.org/chemistryblogs/> " +
"SELECT ?t0 ?smi WHERE {" +
"  ?mol a cc:molecule ;" +
"       cc:t0 ?t0 ;" +
"       chem:smiles ?smi ." +
"}");

allData = ""
for (i=1; i<data.getRowCount(); i++) {
  t0 = data.get(i, "t0")
  t1 = cdk.fromSMILES(data.get(i, "smi")).getAtomContainer().getAtomCount()
  allData = allData + t1 + " " + t0 + " "
}
mat = matrix.create(allData, 2)
matrix.setColumnLabels(mat, ["Atom Count", "Boiling Point"])
file = "/Virtual/wiener.csv"
matrix.saveAsCSV(mat, file)
ui.open(file)

