bioclipse.requireVersion("2.6.1")

species = "human"

// download all GPML files for a species, and save those in /WikiPathways/data/$species

dataMap = bioclipse.fullPath("/WikiPathways/data/$species/")
gpmlFiles = new File(dataMap).listFiles()

logFilename = bioclipse.fullPath("/WikiPathways/report_${species}.txt")
logFile = new File(logFilename)
logFile.setText("")
logFile << "" + new Date() + "\n";

js.clear()
structureList = cdk.createMoleculeList()
gpmlFiles.each { file ->
  def filename = file.name
  def data = new XmlParser().parse(file)
  def metabolites = data.Label.findAll{
    it
  }
  metabolites.each() { node ->
    def nodeID = node.'@GraphId'
    def name = node.'@TextLabel'.trim()
    try {
      def molecule = opsin.parseIUPACName(name)
      structureList.add(molecule)
      def inchiObj = inchi.generate(molecule)
      def inchiVal = inchiObj.getValue()
      def inchiKey = inchiObj.getKey()
      def csid = chemspider.resolve(inchiKey)
      reportLine = "${filename}: node $nodeID -> $name -> $inchiKey -> CSID: $csid";
      logFile << reportLine + "\n" 
      js.say(reportLine)
    } catch (Exception exception) {
      // OK, it was not an IUPAC name, or no InChIKey, or ...
    }
  }
}
editor = ui.open(structureList)
