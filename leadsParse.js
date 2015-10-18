// Parse JSON to object
var request = new XMLHttpRequest();
request.open("GET", "leads.json", true);
request.send(null);
request.onreadystatechange = function() {
  if ( request.readyState === 4 && request.status === 200 ) { //make sure the request is ready and OK
    var leadsObj = JSON.parse(request.responseText),

// Map object to array
    leadsArray = Object.keys(leadsObj.leads).map(function(key){return leadsObj.leads[key]});
		console.log(leadsArray); // array of objects parsed from JSON

// Reverse date order to prefer newest date
    var dateSortedLeads = leadsArray.slice().sort(function(a,b){return a.entryDate < b.entryDate});
    console.log(dateSortedLeads); // array of objects sorted by date

// Loop through array to match the _id or email of the added record to the array of records. 
// Add only if _id or email exist yet.
// If either of these loops returns a number greater than -1, the record will not be added.
// Since the array is already sorted by date, the first object encountered with a later duplicate id will be the most recent.
    var uniqueLeads = dateSortedLeads.slice()
		  .reduce(function (a,b) {
			  	function indexOfProperty (a, b){
			  	for (var i=0; i<a.length; i++){
			  		if(a[i]._id === b._id || a[i].email === b.email){  // if this record id matches OR email matches...
			  			return i;              // return the index which is 0 or more
			  		}
			  	}
			  	return -1; //if nothing has been returned, it's not a match
			  }
			  console.log(a, b, indexOfProperty(a,b));
		  	if (indexOfProperty(a,b) <= 0) a.push(b);
		  	return a;
			}, []);
		function dateFormat(value) {
	    var a;
	    if (typeof value === 'string') {
	    	// 2008-01-01T12:00:00Z
	    	// 2014-05-07T17:30:20+00:00
	    		var re = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\+(\d{2}):(\d{2})?$/;
	        a = re.exec(value);
	        if (a) {
	                return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
	            }
	        }
        return value;
    };
	  for (i = 0; i < uniqueLeads.length; i++) {
      document.getElementById('leads').innerHTML +=
      '<ul class="contact"><li class="name">' + uniqueLeads[i].firstName + ' ' + uniqueLeads[i].lastName + 
      '<span class="id">' + uniqueLeads[i]._id + '</span></li>' +
      '<li class="dateAdded">' + dateFormat(uniqueLeads[i].entryDate).toUTCString() + '</li>' +
      '<li class="email">' + uniqueLeads[i].email + '</li></ul>';
		}
  } 
};