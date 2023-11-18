wikidataldf = ldf.createStore("http://data.wikidataldf.com/wikidata")

sparql = """
PREFIX wd: <http://www.wikidata.org/entity/>

SELECT ?country ?iso WHERE {
  ?country wd:P298s [ wd:P298v ?iso ]
}
"""

rdf.sparql(wikidataldf, sparql)
