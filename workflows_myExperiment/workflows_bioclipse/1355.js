// resolves an InChIKey on ChemSpider
bioclipse.requireVersion("2.4");

var inchiKey = "WFDIJRYMOXRFFG";
var compounds = cdk.createMoleculeList()
list = chemspider.resolve(inchiKey)
for (var i=0; i<list.size(); i++) {
  var csid = list.get(i);
  compounds.add(chemspider.download(csid));
}

ui.open(compounds)

