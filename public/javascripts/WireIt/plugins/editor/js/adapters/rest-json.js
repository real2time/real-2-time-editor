/**
 * Ajax Adapter using a REST interface. Expect JSON response for all queries.
 * @static 
 */
WireIt.TopologyEditor.adapters.RestJSON = {
	
	init: function() {
		YAHOO.util.Connect.setDefaultPostHeader('application/json; charset=utf-8');
	},
	
	saveTopology: function(val, callbacks) {
		try {
		
		// TODO/ 
		//var prev = project.editor.pipesByName[val.name];
		var method = 'PUT';
		var url = '';
		var topology = {};
		
		if(prev) {
			YAHOO.lang.augmentObject({},  prev);
			url = '/topologies/'+prev.id+'.json';
		}
		else {
			topology = {};
			url = '/topologies?format=json';
			method = 'POST';
		}
		
		topology.name = val.name;
		topology.config = val.working;
		
		var postData = YAHOO.lang.JSON.stringify({"topology": topology });// , 'authenticity_token':window._token });
		
		YAHOO.util.Connect.asyncRequest( method, url, {
			success: function(o) {
				var r,s;
				// TODO: store the id ?
				if( !topology ) {
					s = o.responseText;
					r = YAHOO.lang.JSON.parse(s);
				}
				else {
					r = {};
				}
			 	callbacks.success.call(callbacks.scope, r);
			},
			failure: function(o) {
				var error = o.status + " " + o.statusText;
				callbacks.failure.call(callbacks.scope, error);
			}
		},postData);
	}catch(ex) {console.log(ex);}
	},
	
	deleteTopology: function(val, callbacks) {
		
		// TODO: 
		//var topology = project.editor.pipesByName[val.name];
		
		var url ='/topologies/'+topology.id+'.json';
		YAHOO.util.Connect.asyncRequest('DELETE', url, {
			success: function(o) {
			 	callbacks.success.call(callbacks.scope, {});
			},
			failure: function(o) {
				var error = o.status + " " + o.statusText;
				callbacks.failure.call(callbacks.scope, error);
			}
		});
	},
	
	listTopologies: function(val, callbacks) {
		YAHOO.util.Connect.asyncRequest('GET', '/topologies.json', {
			success: function(o) {
				var s = o.responseText;
					v = YAHOO.lang.JSON.parse(s);
				var p = [];
				for(var i = 0 ; i < v.length ; i++) {
					p.push({
						id: v[i].id,
						name: v[i].name,
						working: v[i].config
					});
				}
			 	callbacks.success.call(callbacks.scope, p);
			},
			failure: function(o) {
				var error = o.status + " " + o.statusText;
				callbacks.failure.call(callbacks.scope, error);
			}
		});
	}
	
};