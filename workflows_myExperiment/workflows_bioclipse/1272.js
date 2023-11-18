// The number of spectra in the current dataset
// To be changed manually between 5000 / 10000 / 15000 / 20000 / 25000
 var noOfSpectra = 5000;  
 
// Initialize Prolog modules
swipl.init();

// Load Prolog code for NMR Spectrum similarity search / reasoning
swipl.loadPrologCode( "\
:- rdf_register_ns(nmr, 'http://www.nmrshiftdb.org/onto#').  \n\
:- rdf_register_ns(xsd, 'http://www.w3.org/2001/XMLSchema#').\n\
\n\
select_mol_w_pshifts( Mol ) :-\n\
  q( Mol, 203.0 ),\n\
  q( Mol, 193.4 ),\n\
  q( Mol, 158.3 ),\n\
  q( Mol, 140.99 ),\n\
  q( Mol, 78.34 ),\n\
  q( Mol, 42.2 ),\n\
  q( Mol, 42.0 ),\n\
  q( Mol, 41.8 ),\n\
  q( Mol, 33.5 ),\n\
  q( Mol, 33.5 ),\n\
  q( Mol, 31.7 ),\n\
  q( Mol, 26.5 ),\n\
  q( Mol, 22.6 ),\n\
  q( Mol, 18.3 ),\n\
  q( Mol, 17.6 ),\n\
  q( Mol, 0 ).\n\
\n\
%%% Query method %%%\n\
q( Mol, RefShiftVal ) :-\n\
  rdf( Mol, nmr:hasSpectrum, Spec),\n\
  rdf( Spec, nmr:hasPeak, Peak),\n\
  rdf( Peak, nmr:hasShift, literal(type(xsd:decimal, ShiftValLiteral))),\n\
  atom_number_fixzero( ShiftValLiteral, ShiftVal ),\n\
  abs(ShiftVal - RefShiftVal) =< 3.\n\
\n\
atom_number_fixzero( Atom, Num ) :-\n\
  atom_length( Atom, AtomLen ), AtomLen > 0 -> % IF atom is not empty\n\
  atom_number( Atom, Num );                    % THEN Convert to num. val.\n\
  atom_number( '0', Num ).                     % ELSE Convert to a zero");

var searchTimes = [];

swipl.loadRDFFromFile("runningbioclipse/nmrshiftdata/nmrshiftdata." + noOfSpectra + ".rdf.xml");

	// Start timing
	var startTime = new Date().getTime();

	// The actual query
	var spectrum = swipl.queryProlog( [ "select_mol_w_pshifts", "100", "Mols" ] )
	js.say( spectrum.get(0).get(0) ); // We need two get(0) since queryProlog returns a 2-dim arraylist	
	
	// Stop timing
	var stopTime = new Date().getTime();
	var elapsedTime = (stopTime - startTime)/1000;
		
// Some pretty output
js.say("Total time for SPARQL:ing with " + noOfSpectra + "spectra: " + elapsedTime + " s");
