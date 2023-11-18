var sparql = "PREFIX mebase: <http://rdf.myexperiment.org/ontologies/base/> \
PREFIX dcterms: <http://purl.org/dc/terms/> \
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
 \
SELECT ?workflow ?title WHERE { \
  ?workflow mebase:has-content-type ?type . \
  ?workflow dcterms:title ?title . \
  ?type rdf:type mebase:ContentType . \
  ?type dcterms:title ?typetitle . \
  FILTER regex(?typetitle, \"Taverna 2\") . \
} ";

var results = rdf.sparqlRemote("http://rdf.myexperiment.org/sparql", sparql);
