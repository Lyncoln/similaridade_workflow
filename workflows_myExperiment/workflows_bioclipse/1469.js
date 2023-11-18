// Counts the number of MetaPrint2D predicted metabolization sites.
//
// See DOI: 10.1186/1471-2105-11-362

// load the Novartis malaria data set
mols = cdk.loadMolecules("/OxfordAdmet2010/malaria box/Novartis_GNF-Pf.sdf.out")
for (block=0; block<65; block++) {
  // blocks of 100 items; size of above file is 6511 structures
  // it's up to the user to manually do the last 11 :)
  list = cdk.createMoleculeList()
  for (i =0; i<100; i++) list.add(mols.get(block*100 + i));

  results = metaprint2d.calculate(list)
  iter = results.keySet().iterator()
  while (iter.hasNext()) {
    mol = iter.next();
    container = mol.getAtomContainer()
    js.print(container.getProperty("CAS_NO"))
    reds = 0
    greens = 0
    oranges = 0
    mp = results.get(mol)
    for (i=0; i<mp.size(); i++) {
      ratio = mp.get(i).getNormalisedRatio()
      if (ratio >= 0.66) { reds++ } // ratios used in Bioclipse 2.4
      else if (ratio >= 0.33) { oranges++ }
      else if (ratio >= 0.15) { greens++ }
    }
    js.say(" r,o,g: " + reds + "," + oranges + "," + greens) 
  }
  ""
}
