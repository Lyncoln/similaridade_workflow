// JavaScript

var alkanesIUPACNames = [
  "methane", "ethane", "propane", "butane"
];

var alkanes = cdk.createMoleculeList()
for (var i=0; i<alkanesIUPACNames.length; i++) {
  js.say("Adding: " + alkanesIUPACNames[i]);
  alkanes.add(
    opsin.parseIUPACName(
      alkanesIUPACNames[i]
    )
  );
}

var filename = "/OpenTox/alkanes.sdf";
cdk.saveSDFile(filename, alkanes);
ui.open(filename);
