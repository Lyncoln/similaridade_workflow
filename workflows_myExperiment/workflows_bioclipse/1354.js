// JavaScript
bioclipse.requireVersion("2.4")

// use with care; at the time of writing there are not so many
// workflows, but hopefully that will change :)
list = myexperiment.list();
for (i=0; i<list.size(); i++) {
  ui.open(
    myexperiment.downloadWorkflow(list.get(i))
  );
}
