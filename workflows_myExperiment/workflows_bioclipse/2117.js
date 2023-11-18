// Demo showing the Oscar text mining functionality in Bioclipse

var html = bioclipse.download(
  "http://dx.doi.org/10.3762/bjoc.6.133",
  "text/html"
)

var text = oscar.extractText(html);

// the next step may take some time, while initializing the Oscar
// software for the first time
var mols = oscar.findResolvedNamedEntities(text);

var file = "/Oscar Demo/extractedMols.sdf";
cdk.saveSDFile(file, mols);
ui.open(file);
