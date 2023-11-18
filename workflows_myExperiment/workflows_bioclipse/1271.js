// The number of spectra in the current dataset
// To be changed manually between 5000 / 10000 / 15000 / 20000 / 25000
 var noOfSpectra = 5000;  

// Initialize Prolog modules
swipl.init();

// Load Prolog code for NMR Spectrum similarity search / reasoning
swipl.loadPrologCode( "\
findMolWithPeakValsNear( SearchShiftVals, Mols ) :- 			\n\
  % Pick the Mols in 'Mol', that match the pattern: 			\n\
  %   listPeakShiftsOfMol( Mol, MolShiftVals ), 				\n\
  %   containsListElemsNear( SearchShiftVals, MolShiftVals ) 	\n\
  % and collect them in 'Mols'. 								\n\
  setof( Mol,  													\n\
         ( listPeakShiftsOfMol( Mol, MolShiftVals ),                 % A Mol's shift values are collected  				 \n\
		   containsListElemsNear( SearchShiftVals, MolShiftVals ) ), % ...and compared against the given SearchShiftVals \n\
		   [Mols|MolTail] ).                                         % In 'Mols', all 'Mol's, for which their shift      \n\
                                                                     % values match the SearchShiftVals, are collected.  \n\
% Given a 'Mol', give it's shiftvalues in list form, in 'ListOfPeaks' \n\
listPeakShiftsOfMol( Mol, ListOfPeaks ) :- 						\n\
  hasSpectrum( Mol, Spectrum ), 								\n\
  findall( ShiftVal,  											\n\
           ( hasPeak( Spectrum, Peak ), 						\n\
             hasShiftVal( Peak, ShiftVal ) ),  					\n\
             ListOfPeaks ). 									\n\
 																\n\
% Compare two lists to see if list2 has near-matches for each of the values in list1 \n\
containsListElemsNear( [ElemHead|ElemTail], List ) :- 			\n\
  memberCloseTo( ElemHead, List ), 								\n\
  ( containsListElemsNear( ElemTail, List ); 					\n\
    ElemTail == [] ).   										\n\
 																\n\
%%%%%%%%%%%%%%%%%%%%%%%% 										\n\
% Recursive construct: % 										\n\
%%%%%%%%%%%%%%%%%%%%%%%% 										\n\
% Test first the end criterion: 								\n\
memberCloseTo( X, [ Y | Tail ] ) :- 							\n\
  closeTo( X, Y ). 												\n\
% but if the above doesn't validate, then recursively continue with the tail of List2: \n\
memberCloseTo( X, [ Y | Tail ] ) :- 							\n\
  memberCloseTo( X, Tail ). 									\n\
												 				\n\
% Numerical near-match 											\n\
closeTo( Val1, Val2 ) :- 										\n\
  abs(Val1 - Val2) =< 3. 										\n\
																\n\
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 								\n\
% Convenience accessory methods % 								\n\
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 								\n\
hasShiftVal( Peak, ShiftVal ) :- 								\n\
  rdf_db:rdf( Peak, 'http://www.nmrshiftdb.org/onto#hasShift', literal(type('http://www.w3.org/2001/XMLSchema#decimal', ShiftValLiteral))), \n\
  atom_number_create( ShiftValLiteral, ShiftVal ). 			    \n\
hasSpectrum( Subject, Predicate ) :- 						    \n\
  rdf_db:rdf( Subject, 'http://www.nmrshiftdb.org/onto#hasSpectrum', Predicate).  \n\
hasPeak( Subject, Predicate ) :- 								\n\
  rdf_db:rdf( Subject, 'http://www.nmrshiftdb.org/onto#hasPeak', Predicate). \n\
																\n\
% Wrapper method for the atom_number/2 method which converts atoms (string constants) to number. 	\n\
% The wrapper methods avoids exceptions on empty atoms, instead converting into a zero. 			\n\
atom_number_create( Atom, Number ) :- 						 	\n\
  atom_length( Atom, AtomLength ), AtomLength > 0 -> % IF atom is not empty  						\n\
  atom_number( Atom, Number );                       % THEN Convert the atom to a numerical value  	\n\
  atom_number( '0', Number ).                        % ELSE Convert to a zero ");

var searchTimes = [];

// The shift values that should be matched against the spectra in the RDF Store
var shiftsToMatch = "[203.00, 193.40, 158.30, 140.99, 78.34, 42.20, 42.00, 41.80, 33.50, 33.50, 31.70, 26.50, 22.60, 18.30, 17.60, 0.00]";

swipl.loadRDFFromFile("runningbioclipse/nmrshiftdata/nmrshiftdata." + noOfSpectra + ".rdf.xml");

	// Start timing
	var startTime = new Date().getTime();

	// The actual query
	var spectrum = swipl.queryProlog( [ "findMolWithPeakValsNear", "100", shiftsToMatch, "Mols" ] )
	js.say( spectrum.get(0).get(0) ); // We need two get(0) since queryProlog returns a 2-dim arraylist	
	
	// Stop timing
	var stopTime = new Date().getTime();
	var elapsedTime = (stopTime - startTime)/1000;
		
// Some pretty output
js.say("Total time for SPARQL:ing with " + noOfSpectra + "spectra: " + elapsedTime + " s");