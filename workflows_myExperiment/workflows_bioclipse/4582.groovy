// Copyright (C) 2015  Egon Willighagen <egonw@users.sf.net>
// MIT license.
//
// Converts CGN data from [0] to RDF. It uses intermedia TSV files (never mind the file extensions)
// for the data tab. The 3char ISO country codes are available at [1], but ideally these are pulled
// out of Wikidata directly. The RDF uses the Darwin Core ontology, QUDT, and Wikidata (on top
// of regular stuff).
//
// This Groovy script uses Bioclipse (www.bioclipse.net) with the RDF plugin.
//
// 0.Menting, Frank (2015): CGN tomato passport data. figshare. http://dx.doi.org/10.6084/m9.figshare.1291646
// 1.https://gist.github.com/egonw/30fba853467a106e2240#file-gistfile1-txt

// namespaces
dwcNS = "http://rs.tdwg.org/dwc/terms/"            // Darwin Core
cgnNS = "http://purl.org/cgngenis/accenumb/"       // CGN purs
xsdNS = "http://www.w3.org/2001/XMLSchema"         // XML Schema DataTypes
qudtNS = "http://qudt.org/1.1/vocab/unit#"         // QUDT ontology (units)
wikidataNS = "https://www.wikidata.org/wiki/"      // Wikidata

// recreate an empty output file
outFilename = "/BYOD WUR/output.ttl"
if (ui.fileExists(outFilename)) {
  ui.remove(outFilename)
  ui.newFile(outFilename)
}

// read the ISO country codes and matching Wikidata URIs
fileName = bioclipse.fullPath("/BYOD WUR/Tomato_passport_countries.csv")
int lineNo = 0
countryMaps = new java.util.HashMap<String,String>()
new File(fileName).eachLine { line ->
  lineNo = lineNo + 1
  line.splitEachLine("\\t") { fields ->
    if (lineNo > 1) {
      if (fields[2]) countryMaps.put(fields[0], fields[2])
    }  
  }
}

// create an RDF model
model = rdf.createInMemoryStore()
rdf.addPrefix(model, "cgn", cgnNS)
rdf.addPrefix(model, "dwc", dwcNS)
rdf.addPrefix(model, "xs", xsdNS)
rdf.addPrefix(model, "qudt", qudtNS)
rdf.addPrefix(model, "wikidata", wikidataNS)

// read the content from the data tab from the CGN spreadsheet in TSV format
// as found in Figshare
fileName = bioclipse.fullPath("/BYOD WUR/Tomato_passport_data.csv")
new File(fileName).eachLine { line ->
  lineNo = lineNo + 1
  line.splitEachLine("\\t") { fields ->
    if (lineNo > 1) {
      cgnNumber = cgnNS + fields[1]
      if (fields[9]) rdf.addTypedDataProperty(model, cgnNumber, dwcNS + "decimalLatitude", fields[9], xsdNS + "decimal")
      if (fields[10]) rdf.addTypedDataProperty(model, cgnNumber, dwcNS + "decimalLongitude", fields[10], xsdNS + "decimal")
      if (fields[11]) rdf.addTypedDataProperty(model, cgnNumber, dwcNS + "coordinateUncertaintyInMeters", fields[11], qudtNS + "Meter")
      if (fields[7]) {
        rdf.addDataProperty(model, cgnNumber, dwcNS + "countryCode", fields[7])
        if (countryMaps.get(fields[7])) {
          rdf.addObjectProperty(model, cgnNumber, dwcNS + "country", wikidataNS + countryMaps.get(fields[7]))
        }
      }
    }
  }
}

// save the RDF output as Turtle 
ui.append(outFilename, rdf.asTurtle(model))

