var Web3 = require('web3');
var web3 = new Web3();

exports.create = create;

function create(options) {
	web3.setProvider(new web3.providers.HttpProvider(options.host));

	if (options.personal) {
		web3._extend({
		  property: 'personal',
		  methods: [new web3._extend.Method({
		       name: 'unlockAccount',
		       call: 'personal_unlockAccount',
		       params: 3,
		       inputFormatter: [web3._extend.utils.toAddress, toStringVal, toIntVal],
		       outputFormatter: toBoolVal
		  })]
		});

		web3._extend({
		  property: 'personal',
		  methods: [new web3._extend.Method({
		       name: 'newAccount',
		       call: 'personal_newAccount',
		       params: 1,
		       inputFormatter: [toStringVal],
		       outputFormatter: toStringVal
		  })]
		});

		web3._extend({
		  property: 'personal',
		  methods: [new web3._extend.Method({
		       name: 'listAccounts',
		       call: 'personal_listAccounts',
		       params: 0,
		       outputFormatter: toJSONObject
		  })]
		});

		web3._extend({
		  property: 'personal',
		  methods: [new web3._extend.Method({
		       name: 'deleteAccount',
		       call: 'personal_deleteAccount',
		       params: 2,
		       inputFormatter: [web3._extend.utils.toAddress, toStringVal],
		       outputFormatter: toBoolVal
		  })]
		});
	}

	if (options.admin) {
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'chainSyncStatus',
		       call: 'admin_chainSyncStatus',
		       params: 0,
		       outputFormatter: toJSONObject
		  })]
		});
		
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'verbosity',
		       call: 'admin_verbosity',
		       params: 1,
		       inputFormatter: [toIntValRestricted]
		  })]
		});

		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'nodeInfo',
		       call: 'admin_nodeInfo',
		       params: 0,
		       outputFormatter: toJSONObject
		  })]
		});
		
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'addPeer',
		       call: 'admin_addPeer',
		       params: 1,
		       inputFormatter: [toStringVal],
		       outputFormatter: toBoolVal
		  })]
		});
		
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'peers',
		       call: 'admin_peers',
		       params: 0,
		       outputFormatter: toJSONObject
		  })]
		});
		
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'startRPC',
		       call: 'admin_startRPC',
		       params: 4,
		       inputFormatter: [toStringVal, toIntVal, toStringVal, toStringVal],
		       outputFormatter: toBoolVal
		  })]
		});
		
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'stopRPC',
		       call: 'admin_stopRPC',
		       params: 0,
		       outputFormatter: toBoolVal
		  })]
		});
		
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'sleepBlocks',
		       call: 'admin_sleepBlocks',
		       params: 1,
		       inputFormatter: [toIntVal]
		  })]
		});
		
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'datadir',
		       call: 'admin_datadir',
		       params: 0,
		       outputFormatter: toStringVal
		  })]
		});
		
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'setSolc',
		       call: 'admin_setSolc',
		       params: 1,
		       inputFormatter: [toStringVal],
		       outputFormatter: toStringVal
		  })]
		});
		
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'startNatSpec',
		       call: 'admin_startNatSpec',
		       params: 0
		  })]
		});
		
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'stopNatSpec',
		       call: 'admin_stopNatSpec',
		       params: 0
		  })]
		});
		
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: '',
		       call: 'admin_',
		       params: 0,
		       inputFormatter: [web3._extend.utils.toAddress, toStringVal, toIntVal],
		       outputFormatter: toStringVal
		  })]
		});
		
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'getContractInfo',
		       call: 'admin_getContractInfo',
		       params: 1,
		       inputFormatter: [web3._extend.utils.toAddress],
		       outputFormatter: toJSONObject
		  })]
		});
		
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'saveInfo',
		       call: 'admin_saveInfo',
		       params: 0,
		       inputFormatter: [toJSONObject, toStringVal],
		       outputFormatter: toStringVal
		  })]
		});
		
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'register',
		       call: 'admin_register',
		       params: 3,
		       inputFormatter: [web3._extend.utils.toAddress, web3._extend.utils.toAddress, toStringVal],
		       outputFormatter: toBoolVal
		  })]
		});
		
		web3._extend({
		  property: 'admin',
		  methods: [new web3._extend.Method({
		       name: 'registerUrl',
		       call: 'admin_registerUrl',
		       params: 3,
		       inputFormatter: [web3._extend.utils.toAddress, toStringVal, toStringVal],
		       outputFormatter: toBoolVal
		  })]
		});
		
	}

	if (options.debug) {
		web3._extend({
		  property: 'debug',
		  methods: [new web3._extend.Method({
		       name: 'setHead',
		       call: 'debug_setHead',
		       params: 1,
		       inputFormatter: [toIntVal],
		       outputFormatter: toBoolVal
		  })]
		});

		web3._extend({
		  property: 'debug',
		  methods: [new web3._extend.Method({
		       name: 'seedHash',
		       call: 'debug_seedHash',
		       params: 1,
		       inputFormatter: [toIntVal],
		       outputFormatter: toStringVal
		  })]
		});

		web3._extend({
		  property: 'debug',
		  methods: [new web3._extend.Method({
		       name: 'processBlock',
		       call: 'debug_processBlock',
		       params: 1,
		       inputFormatter: [toIntVal],
		       outputFormatter: toBoolVal
		  })]
		});

		web3._extend({
		  property: 'debug',
		  methods: [new web3._extend.Method({
		       name: 'getBlockRlp',
		       call: 'debug_getBlockRlp',
		       params: 1,
		       inputFormatter: [toIntVal],
		       outputFormatter: toStringVal
		  })]
		});

		web3._extend({
		  property: 'debug',
		  methods: [new web3._extend.Method({
		       name: 'printBlock',
		       call: 'debug_printBlock',
		       params: 1,
		       inputFormatter: [toIntVal],
		       outputFormatter: toStringVal
		  })]
		});

		web3._extend({
		  property: 'debug',
		  methods: [new web3._extend.Method({
		       name: 'dumpBlock',
		       call: 'debug_dumpBlock',
		       params: 1,
		       inputFormatter: [toIntVal],
		       outputFormatter: toStringVal
		  })]
		});

		web3._extend({
		  property: 'debug',
		  methods: [new web3._extend.Method({
		       name: 'metrics',
		       call: 'debug_metrics',
		       params: 1,
		       inputFormatter: [toBoolVal],
		       outputFormatter: toStringVal
		  })]
		});
	}

	function toStringVal(val) {
		return String(val);
	}

	function toBoolVal(val) {
		console.log(val);
		if (String(val) == 'true') {
			return true;
		} else {
			return false;
		}
	}

	function toIntVal(val) {
		return parseInt(val);
	}

	function toIntValRestricted(val) {
		var check = parseInt(val);
		if (check > 0 && check <= 6) {
			return check;
		} else {
			return null;
		}
		
	}

	function toJSONObject(val) {
		try {
			return JSON.parse(val);
		} catch (e){
			return String(val);
		}
	}

	return web3;
}


	