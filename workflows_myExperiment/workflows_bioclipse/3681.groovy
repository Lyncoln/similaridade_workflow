pathway = "2537"

// file = pathvisio.getGPML(pathway)
file = bioclipse.fullPath("/Virtual/WP" + pathway + ".gpml")

def data = new XmlParser().parse(file)
def metabolites = data.DataNode.findAll{
  it.'@Type'.contains('Metabolite')
}
js.clear()
metabolites.each() { node ->
  js.print(node.'@TextLabel')
  if (node.Xref.'@Database'.text() != "" &&
      node.Xref.'@ID'.text() != "") {
    js.print(": " + node.Xref.'@Database'.text() + " -> " + node.Xref.'@ID'.text())
  }
  js.print("\n")
}

