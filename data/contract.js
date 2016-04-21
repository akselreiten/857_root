/**
 * Created by akselreiten on 20/04/16.
 */

var abi =

    [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "bytes8",
                    "typeShort": "bytes",
                    "bits": "8",
                    "displayName": "",
                    "template": "elements_input_bytes"
                }
            ],
            "name": "allLoans",
            "outputs": [
                {
                    "name": "lender",
                    "type": "address",
                    "value": "0x0000000000000000000000000000000000000000",
                    "displayName": "lender"
                },
                {
                    "name": "borrower",
                    "type": "address",
                    "value": "0x0000000000000000000000000000000000000000",
                    "displayName": "borrower"
                },
                {
                    "name": "amount",
                    "type": "uint256",
                    "value": "0",
                    "displayName": "amount"
                },
                {
                    "name": "end_time",
                    "type": "uint256",
                    "value": "0",
                    "displayName": "end<span class=\"punctuation\">_</span>time"
                },
                {
                    "name": "bonus",
                    "type": "uint256",
                    "value": "0",
                    "displayName": "bonus"
                },
                {
                    "name": "name",
                    "type": "string",
                    "value": "",
                    "displayName": "name"
                }
            ],
            "type": "function",
            "displayName": "all Loans"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address",
                    "typeShort": "address",
                    "bits": "",
                    "displayName": "",
                    "template": "elements_input_address"
                }
            ],
            "name": "userMap",
            "outputs": [
                {
                    "name": "",
                    "type": "string",
                    "value": "",
                    "displayName": ""
                }
            ],
            "type": "function",
            "displayName": "user Map"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_id",
                    "type": "bytes8",
                    "typeShort": "bytes",
                    "bits": "8",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;id",
                    "template": "elements_input_bytes"
                }
            ],
            "name": "trigger_default",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "type": "function",
            "displayName": "trigger_default"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_amount",
                    "type": "uint256",
                    "typeShort": "uint",
                    "bits": "256",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;amount",
                    "template": "elements_input_uint"
                },
                {
                    "name": "_duration",
                    "type": "uint256",
                    "typeShort": "uint",
                    "bits": "256",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;duration",
                    "template": "elements_input_uint"
                },
                {
                    "name": "_bonus",
                    "type": "uint256",
                    "typeShort": "uint",
                    "bits": "256",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;bonus",
                    "template": "elements_input_uint"
                },
                {
                    "name": "_name",
                    "type": "string",
                    "typeShort": "string",
                    "bits": "",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;name",
                    "template": "elements_input_string"
                }
            ],
            "name": "issueRequest",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "type": "function",
            "displayName": "issue Request"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "kill",
            "outputs": [],
            "type": "function",
            "displayName": "kill"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_target",
                    "type": "address",
                    "typeShort": "address",
                    "bits": "",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;target",
                    "template": "elements_input_address"
                },
                {
                    "name": "_amount",
                    "type": "uint256",
                    "typeShort": "uint",
                    "bits": "256",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;amount",
                    "template": "elements_input_uint"
                }
            ],
            "name": "deposit",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "type": "function",
            "displayName": "deposit"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_id",
                    "type": "bytes8",
                    "typeShort": "bytes",
                    "bits": "8",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;id",
                    "template": "elements_input_bytes"
                },
                {
                    "name": "duration",
                    "type": "uint256",
                    "typeShort": "uint",
                    "bits": "256",
                    "displayName": "duration",
                    "template": "elements_input_uint"
                }
            ],
            "name": "extend",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "type": "function",
            "displayName": "extend"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address",
                    "typeShort": "address",
                    "bits": "",
                    "displayName": "",
                    "template": "elements_input_address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "value": "0",
                    "displayName": ""
                }
            ],
            "type": "function",
            "displayName": "balance Of"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_id",
                    "type": "bytes8",
                    "typeShort": "bytes",
                    "bits": "8",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;id",
                    "template": "elements_input_bytes"
                }
            ],
            "name": "payback",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "type": "function",
            "displayName": "payback"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "typeShort": "uint",
                    "bits": "256",
                    "displayName": "",
                    "template": "elements_input_uint"
                }
            ],
            "name": "requestIDs",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes8",
                    "value": "0x",
                    "displayName": ""
                }
            ],
            "type": "function",
            "displayName": "request I Ds"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "value": "0xcd6a2d83699444203a172fcb6effb611e00206dc",
                    "displayName": ""
                }
            ],
            "type": "function",
            "displayName": "owner"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address",
                    "typeShort": "address",
                    "bits": "",
                    "displayName": "",
                    "template": "elements_input_address"
                }
            ],
            "name": "debt",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "value": "0",
                    "displayName": ""
                }
            ],
            "type": "function",
            "displayName": "debt"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_id",
                    "type": "bytes8",
                    "typeShort": "bytes",
                    "bits": "8",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;id",
                    "template": "elements_input_bytes"
                }
            ],
            "name": "getRequest",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "type": "function",
            "displayName": "get Request"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "typeShort": "uint",
                    "bits": "256",
                    "displayName": "",
                    "template": "elements_input_uint"
                }
            ],
            "name": "allUsers",
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "value": "0x",
                    "displayName": ""
                }
            ],
            "type": "function",
            "displayName": "all Users"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address",
                    "typeShort": "address",
                    "bits": "",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;to",
                    "template": "elements_input_address"
                },
                {
                    "name": "_value",
                    "type": "uint256",
                    "typeShort": "uint",
                    "bits": "256",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;value",
                    "template": "elements_input_uint"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "type": "function",
            "displayName": "transfer"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address",
                    "typeShort": "address",
                    "bits": "",
                    "displayName": "",
                    "template": "elements_input_address"
                }
            ],
            "name": "reputation",
            "outputs": [
                {
                    "name": "cash_rep",
                    "type": "int256",
                    "value": "0",
                    "displayName": "cash<span class=\"punctuation\">_</span>rep"
                },
                {
                    "name": "defaulted",
                    "type": "uint256",
                    "value": "0",
                    "displayName": "defaulted"
                },
                {
                    "name": "paid",
                    "type": "uint256",
                    "value": "0",
                    "displayName": "paid"
                },
                {
                    "name": "outstanding",
                    "type": "uint256",
                    "value": "0",
                    "displayName": "outstanding"
                },
                {
                    "name": "amt",
                    "type": "uint256",
                    "value": "0",
                    "displayName": "amt"
                }
            ],
            "type": "function",
            "displayName": "reputation"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_id",
                    "type": "bytes8",
                    "typeShort": "bytes",
                    "bits": "8",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;id",
                    "template": "elements_input_bytes"
                }
            ],
            "name": "fulfillRequest",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "type": "function",
            "displayName": "fulfill Request"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address",
                    "typeShort": "address",
                    "bits": "",
                    "displayName": "",
                    "template": "elements_input_address"
                },
                {
                    "name": "",
                    "type": "uint256",
                    "typeShort": "uint",
                    "bits": "256",
                    "displayName": "",
                    "template": "elements_input_uint"
                }
            ],
            "name": "userLoans",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes8",
                    "value": "0x",
                    "displayName": ""
                }
            ],
            "type": "function",
            "displayName": "user Loans"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "bytes8",
                    "typeShort": "bytes",
                    "bits": "8",
                    "displayName": "",
                    "template": "elements_input_bytes"
                }
            ],
            "name": "requests",
            "outputs": [
                {
                    "name": "borrower",
                    "type": "address",
                    "value": "0x0000000000000000000000000000000000000000",
                    "displayName": "borrower"
                },
                {
                    "name": "amount",
                    "type": "uint256",
                    "value": "0",
                    "displayName": "amount"
                },
                {
                    "name": "duration",
                    "type": "uint256",
                    "value": "0",
                    "displayName": "duration"
                },
                {
                    "name": "bonus",
                    "type": "uint256",
                    "value": "0",
                    "displayName": "bonus"
                },
                {
                    "name": "name",
                    "type": "string",
                    "value": "",
                    "displayName": "name"
                }
            ],
            "type": "function",
            "displayName": "requests"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_target",
                    "type": "address",
                    "typeShort": "address",
                    "bits": "",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;target",
                    "template": "elements_input_address"
                },
                {
                    "name": "_amount",
                    "type": "uint256",
                    "typeShort": "uint",
                    "bits": "256",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;amount",
                    "template": "elements_input_uint"
                }
            ],
            "name": "withdraw",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "type": "function",
            "displayName": "withdraw"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_target",
                    "type": "address",
                    "typeShort": "address",
                    "bits": "",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;target",
                    "template": "elements_input_address"
                }
            ],
            "name": "getBalance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "type": "function",
            "displayName": "get Balance"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "getAllRequests",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes8[]"
                }
            ],
            "type": "function",
            "displayName": "get All Requests"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_user",
                    "type": "address",
                    "typeShort": "address",
                    "bits": "",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;user",
                    "template": "elements_input_address"
                },
                {
                    "name": "_name",
                    "type": "string",
                    "typeShort": "string",
                    "bits": "",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;name",
                    "template": "elements_input_string"
                },
                {
                    "name": "_initial",
                    "type": "uint256",
                    "typeShort": "uint",
                    "bits": "256",
                    "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;initial",
                    "template": "elements_input_uint"
                }
            ],
            "name": "register",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "type": "function",
            "displayName": "register"
        },
        {
            "inputs": [],
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        }
    ];