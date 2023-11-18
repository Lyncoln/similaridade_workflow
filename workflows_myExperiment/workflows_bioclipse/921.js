bioclipse.requireVersion("2.4")

model = rdf.createInMemoryStore()
rdf.importRDFa(model, "http://egonw.github.com/")
rdf.saveRDFN3(model, "/Virtual/egonw.n3")
