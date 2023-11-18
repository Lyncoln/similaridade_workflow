// The number of spectra in the current dataset
// To be changed manually between 5000 / 10000 / 15000 / 20000 / 25000
 var noOfSpectra = 5000;  

sparql_query = "\
PREFIX owl: <http://www.w3.org/2002/07/owl#> \
PREFIX afn: <http://jena.hpl.hp.com/ARQ/function#> \
PREFIX fn: <http://www.w3.org/2005/xpath-functions#> \
PREFIX nmr: <http://www.nmrshiftdb.org/onto#>  \
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \
SELECT  ?m \
WHERE {\
  ?m nmr:hasSpectrum ?s . \
  ?s nmr:hasPeak [ nmr:hasShift ?s1 ] , \
                 [ nmr:hasShift ?s2 ] , \
                 [ nmr:hasShift ?s3 ] , \
                 [ nmr:hasShift ?s4 ] , \
                 [ nmr:hasShift ?s5 ] , \
                 [ nmr:hasShift ?s6 ] , \
                 [ nmr:hasShift ?s7 ] , \
                 [ nmr:hasShift ?s8 ] , \
                 [ nmr:hasShift ?s9 ] , \
                 [ nmr:hasShift ?s10 ] , \
                 [ nmr:hasShift ?s11 ] , \
                 [ nmr:hasShift ?s12 ] , \
                 [ nmr:hasShift ?s13 ] , \
                 [ nmr:hasShift ?s14 ] , \
                 [ nmr:hasShift ?s15 ] , \
                 [ nmr:hasShift ?s16 ] . \
FILTER ( fn:abs(?s1 - 203.0) < 3 ) . \
FILTER ( fn:abs(?s2 - 193.4) < 3 ) . \
FILTER ( fn:abs(?s3 - 158.3) < 3 ) . \
FILTER ( fn:abs(?s4 - 140.99) < 3 ) . \
FILTER ( fn:abs(?s5 - 78.34) < 3 ) . \
FILTER ( fn:abs(?s6 - 42.2) < 3 ) . \
FILTER ( fn:abs(?s7 - 42.0) < 3 ) . \
FILTER ( fn:abs(?s8 - 41.8) < 3 ) . \
FILTER ( fn:abs(?s9 - 33.5) < 3 ) . \
FILTER ( fn:abs(?s10 - 33.5) < 3 ) . \
FILTER ( fn:abs(?s11 - 31.7) < 3 ) . \
FILTER ( fn:abs(?s12 - 26.5) < 3 ) . \
FILTER ( fn:abs(?s13 - 22.6) < 3 ) . \
FILTER ( fn:abs(?s14 - 18.3) < 3 ) . \
FILTER ( fn:abs(?s15 - 17.6) < 3 ) . \
FILTER ( fn:abs(?s16 - 0) < 3 ) . \
}"

var myStore = rdf.createStore();
var myRDFDataFile = "runningbioclipse/nmrshiftdata/nmrshiftdata." + noOfSpectra + ".rdf.xml"

rdf.importFile(myStore, myRDFDataFile, "RDF/XML");

js.say("Current store:\n" + myStore + "\n------------------------");

	// Start timing
	var startTime = new Date().getTime();

	// The actual query -- on 1 peak dataset
	js.say("Output:\n" + rdf.sparql( myStore, sparql_query ));
	
	// Stop timing
	var stopTime = new Date().getTime();
	var elapsedTime = (stopTime - startTime)/1000;
	
// Some pretty output
js.say("Total time for SPARQL:ing with " + noOfSpectra + "spectra: " + elapsedTime + " s");
	
js.say( "\nElapsed time:\n" + elapsedTime );

