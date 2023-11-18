// JavaScript
importPackage(org.openscience.cdk.config)
importPackage(org.openscience.cdk.silent)

importClass(org.openscience.cdk.config.IsotopeFactory)
importClass(org.openscience.cdk.silent.SilentChemObjectBuilder)

builder = org.openscience.cdk.silent.SilentChemObjectBuilder.getInstance();
factory = org.openscience.cdk.config.IsotopeFactory.getInstance(builder);

searchMass = 87.90;
error = 0.01;

js.clear();
for (var i=1; i<=116; i++) {
  symbol = factory.getElement(i).getSymbol(); 
  isotopes = factory.getIsotopes(symbol);
  for (var j=0; j<isotopes.length; j++) {
    exactMass = isotopes[j].getExactMass()
    if (exactMass < (searchMass + error) &&
        exactMass > (searchMass - error)) {
      massNumber = isotopes[j].getMassNumber();
      js.say("Isotope match: " + massNumber + symbol + " has mass " + exactMass);
    }
  }
}
