// JavaScript
function mean(xs) {
	var acc = 0.0;
	var n = xs.length;
	
	for (var i = 0; i < n; i++) {
		acc = acc + xs[i];
	}
	return (acc/n);
}

function variance(xs) {
	var acc = 0.0;
	var n = xs.length;
	var m = mean(xs);
	
	for (var i = 0; i < n; i++) {
	
		acc += Math.pow(xs[i]-m,2);
		
	}

	return acc/n;
}

function sampleVariance(xs) {
	var n = xs.length;
	return n*variance(xs)/(n-1);
}

function welchSd(xs,ys) {
	var varX = sampleVariance(xs);
	var nx = xs.length;
	var varY = sampleVariance(ys);
	var ny = ys.length;
	
	var pooled = Math.sqrt(varX/nx + varY/ny);
	
	return pooled;
}

function tscore(xs, ys) {
	return (mean(xs) - mean(ys))/welchSd(xs,ys);
}

function resample(xs, ys, evalFun) {

	var values = xs.concat(ys);
	var nx = xs.length; var ny = ys.length;
	var xs_ = new Array(nx);var ys_ = new Array(ny);

	var randomInt = function(n) {return Math.floor(Math.random()*n)};
	var pick;
	for (var i = 0; i < nx; i++) {
		pick = randomInt(values.length);	
		xs_[i] = values[pick];
		values.splice(pick,1);
	}
	
	for (var i = 0; i < ny; i++) {
		pick = randomInt(values.length);	
		ys_[i] = values[pick];
		values.splice(pick,1)
	}

	return evalFun(xs_, ys_);
	
}

function twosidedTTest(xs,ys, nSample) {
	var ref = Math.abs(tscore(xs,ys));
	var nEqualOrGreater = 0;
	
	for (var i = 0; i < nSample; i++) {
		if (Math.abs(resample(xs,ys, tscore)) >= ref) {
			nEqualOrGreater++;
		}
	}
	
	return nEqualOrGreater/nSample;
}

function getMeasurements(barcode) {

       var measurements = new java.util.Hashtable();

       var plate = brunn.getPlateByBarcode( barcode );

       var wells = plate.getWells().toArray();
       for ( var j = 0 ; j < wells.length ; j++ ) {
               var well = wells[j];
               var wellFunctions = well.getWellFunctions().toArray();
               for ( var k = 0 ; k < wellFunctions.length ; k++ ) {
                       var wf = wellFunctions[k];
                       if ( "SI%".equalsIgnoreCase( wf.getName() ) ) {
                               var key = "";
                               var substances = well.getSubstances().toArray();
                               for ( var l = 0 ; l < substances.length ; l++ ) {
                                       key = key + substances[l].toString();
                               }
                               var list = measurements.get(key);
                               if ( list == null ) {
                                       list = new java.util.ArrayList();
                                       measurements.put(key, list);
                               }
                               list.add( wf.getValue() );
                       }
               }
       }
       return measurements;
}

function javaFloatSetToJSArray( list ) {
	var array = new Array();
	for ( var i = 0 ; i < list.size() ; i++ ) {
		array[i] = list.get(i).doubleValue();
	}
	return array;
}

function getSeries(barcodes, key) {
	
	var nPlate = barcodes.length;
	var plateMeasurements;
	var siValues = new Array(nPlate);
	var replicates;
	for (var i = 0; i < nPlate; i++) {
		
		plateMeasurements = getMeasurements(barcodes[i]);
		
		replicates = javaFloatSetToJSArray( plateMeasurements.get(key) );
		
		siValues[i] = mean(replicates);
	}
	
	return siValues;
}

function generateKey(substanceName, concentration) {
	return "\t\tSubstance: " + substanceName + ", concentration " + concentration; 
}

var aml = [ '5085', '5158', '5161', '5255', '5263'];
var bt  = [ '5033', '5290', '6726' ];

var key = generateKey("Melfalan", 0.04);

var amlSeries = getSeries(aml, key);
var btSeries  = getSeries(bt,  key);

js.print( twosidedTTest(amlSeries, btSeries, 1000) + "\n" );
