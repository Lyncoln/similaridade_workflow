// Initialize Prolog modules
swipl.init();

// Load Prolog code for NMR Spectrum similarity search / reasoning
swipl.loadPrologCode("  \n\
% Register RDF namespaces, for use in the convenience methods at the end       \n\
:- rdf_db:rdf_register_ns(nmr, 'http://www.nmrshiftdb.org/onto#').             \n\
:- rdf_db:rdf_register_ns(xsd, 'http://www.w3.org/2001/XMLSchema#').           \n\
                                                                               \n\
findMolWithPeakValsNear( SearchShiftVals, Mols ) :-                            \n\
                                                                               \n\
% Pick the Moleculess in 'Mol', that match the pattern:                        \n\
%% listPeakShiftsOfMol( Mol, MolShiftVals ),                                   \n\
%% containsListElemsNear( SearchShiftVals, MolShiftVals )                      \n\
% and collect them in 'Mols'.                                                  \n\
%                                                                              \n\
% A Mol(ecule)'s shift values are collected and compared against the given     \n\
% SearchShiftVals. Then, in 'Mols', all 'Mol's, for which their shift values   \n\
% match the SearchShiftVals, are collected.                                    \n\
setof( Mol,                                                                    \n\
       (   listPeakShiftsOfMol( Mol, MolShiftVals ),                           \n\
           containsListElemsNear( SearchShiftVals, MolShiftVals )),            \n\
       [Mols|MolTail] ).                                                       \n\
                                                                               \n\
% Given a 'Mol', give it's shiftvalues in list form, in 'ListOfPeaks'          \n\
listPeakShiftsOfMol( Mol, ListOfPeaks ) :-                                     \n\
  hasSpectrum( Mol, Spectrum ),                                                \n\
  findall( ShiftVal,                                                           \n\
           ( hasPeak( Spectrum, Peak ),                                        \n\
             hasShiftVal( Peak, ShiftVal ) ),                                  \n\
             ListOfPeaks ).                                                    \n\
                                                                               \n\
% Compare two lists to see if list2 has near-matches for each value in list1   \n\
containsListElemsNear( [ElemHead|ElemTail], List ) :         -                 \n\
  memberCloseTo( ElemHead, List ),                                             \n\
  ( containsListElemsNear( ElemTail, List );                                   \n\
    ElemTail == [] ).                                                          \n\
                                                                               \n\
%%%%%%%%%%%%%%%%%%%%%%%%                                                       \n\
% Recursive construct: %                                                       \n\
%%%%%%%%%%%%%%%%%%%%%%%%                                                       \n\
                                                                               \n\
% Test first the end criterion:                                                \n\
memberCloseTo( X, [ Y | Tail ] ) :-                                            \n\
  closeTo( X, Y ).                                                             \n\
% but if the above doesn't validate, recursively continue with tail of List2:  \n\
memberCloseTo( X, [ Y | Tail ] ) :-                                            \n\
  memberCloseTo( X, Tail ).                                                    \n\
								                                               \n\
% Numerical near-match                                                         \n\
closeTo( Val1, Val2 ) :-                                                       \n\
  abs(Val1 - Val2) =< 0.3.                                                     \n\
                                                                               \n\
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                                              \n\
% Convenience accessory methods %                                              \n\
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                                              \n\
                                                                               \n\
hasShiftVal( Peak, ShiftVal ) :-                                               \n\
  rdf_db:rdf( Peak, nmr:hasShift, literal(type(xsd:decimal, ShiftValLiteral))),\n\
  atom_number_create( ShiftValLiteral, ShiftVal ). 			                   \n\
hasSpectrum( Subject, Predicate ) :- 				                           \n\
  rdf_db:rdf( Subject, nmr:hasSpectrum, Predicate).                            \n\
hasPeak( Subject, Predicate ) :-                                               \n\
  rdf_db:rdf( Subject, nmr:hasPeak, Predicate).                                \n\
                                                                               \n\
% Wrapper method for the atom_number/2 method which converts atoms (string     \n\
% constants) to number. The wrapper methods avoids exceptions on empty atoms,  \n\
% instead converting into a zero.                                              \n\
atom_number_create( Atom, Number ) :- 			                               \n\
  % IF atom is not empty  			                                           \n\
  atom_length( Atom, AtomLength ), AtomLength > 0 ->                           \n\
  % THEN Convert the atom to a numerical value                                 \n\
  atom_number( Atom, Number );                                                 \n\
  % ELSE Convert to a zero                                                     \n\
  atom_number( '0', Number ).");

// The shift values that should be matched against the spectra in the RDF Store
var shiftsToMatch = "[17.6, 18.3, 22.6, 26.5, 31.7, 33.5, 33.5, 41.8, 42.0, 42.2, 78.34, 140.99, 158.3, 193.4, 203.0, 0]";

swipl.loadRDFToProlog("runningbioclipse/nmrshiftdata/nmrshiftdata.works.rdf.xml");

// Start timing
var startTime = new Date().getTime();

// The actual query
var spectrum = swipl.queryProlog( [ "findMolWithPeakValsNear", "10", shiftsToMatch, "Mols" ] )
js.say( spectrum ); 	

// Stop timing
var stopTime = new Date().getTime();
var elapsedTime = (stopTime - startTime)/1000;
	
// Some pretty output
js.say("Total time for SPARQL:ing with " + noOfSpectra + "spectra: " + elapsedTime + " s");

