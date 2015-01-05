/**
 * JsonRpc Adapter (using ajax)
 * @class WireIt.TopologyEditor.adapters.JsonRpc
 * @static 
 */
WireIt.TopologyEditor.adapters.JsonRpc = {
	
	config: {
		url: '../../backend/php/TopologyEditor.php'
	},
	
	init: function() {
		YAHOO.util.Connect.setDefaultPostHeader('application/json');
	},
	
	saveTopology: function(val, callbacks) {
		
		// Make a copy of the object
		var topology = {};
		YAHOO.lang.augmentObject(topology, val);
		
		// Encode the working field as a JSON string
		topology.working = YAHOO.lang.JSON.stringify(topology.working);
		
		this._sendJsonRpcRequest("saveTopology", topology, callbacks);
	},
	
	deleteTopology: function(val, callbacks) {
		this._sendJsonRpcRequest("deleteTopology", val, callbacks);
	},
	
	listTopologies: function(val, callbacks) {
		this._sendJsonRpcRequest("listTopologies", val, callbacks);
	},
	
	// private method to send a json-rpc request using ajax
	_sendJsonRpcRequest: function(method, value, callbacks) {
		var postData = YAHOO.lang.JSON.stringify({"id":(this._requestId++),"method":method,"params":value,"version":"json-rpc-2.0"});

		YAHOO.util.Connect.asyncRequest('POST', this.config.url, {
			success: function(o) {
				var s = o.responseText,
					 r = YAHOO.lang.JSON.parse(s);
					
				var topologies = r.result;
				
				for(var i = 0 ; i < topologies.length ; i++) {
					topologies[i].working = YAHOO.lang.JSON.parse(topologies[i].working);
				}
					
			 	callbacks.success.call(callbacks.scope, r.result);
			},
			failure: function() {
				callbacks.failure.call(callbacks.scope, r);
			}
		},postData);
	},
	_requestId: 1
};
