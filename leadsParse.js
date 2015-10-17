// Parse JSON to object

var request = new XMLHttpRequest();
request.open("GET", "leads.json", true);
request.send(null);
request.onreadystatechange = function() {
  if ( request.readyState === 4 && request.status === 200 ) {
    var leadsObj = JSON.parse(request.responseText),
        leadsArray = Object.keys(leadsObj.leads).map(function(key){return leadsObj.leads[key]});
		console.log(leadsArray); // array of objects parsed from JSON
    var dateSortedLeads = leadsArray.slice().sort(function(a,b){return a.entryDate < b.entryDate});
    console.log(dateSortedLeads); // array of objects sorted by date
    var uniqueLeads = dateSortedLeads.slice()
			  .reduce(function (a,b) {
				  	function indexOfProperty (a, b){
				  	for (var i=0; i<a.length; i++){
				  		if(a[i]._id === b._id){
				  			return i
				  		}
				  	}
				  	return -1;
				  }
			  	if (indexOfProperty(a,b) < 0) a.push(b);
			  	return a;
			}, []);
			console.log(uniqueLeads); // array of objects with oldest duplicates removed
  } 
};