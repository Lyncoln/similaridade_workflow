// download all GPML files for a species, and save those in /WikiPathways/data/

dataMap = bioclipse.fullPath("/WikiPathways/data/")
gpmlFiles = new File(dataMap).listFiles()

structureList = cdk.createMoleculeList()
gpmlFiles.each { file ->
  def data = new XmlParser().parse(file)
  def metabolites = data.DataNode.findAll{
    it.'@Type'.contains('Metabolite')
  }
  metabolites.each() { node ->
    name = node.'@TextLabel'.trim()
    try {
      molecule = opsin.parseIUPACName(name)
      js.print("IUPAC name found: $name \n")
      structureList.add(molecule)
    } catch (Exception exception) {
      // OK, it was not an IUPAC name
    }
  }
}
ui.open(structureList)


