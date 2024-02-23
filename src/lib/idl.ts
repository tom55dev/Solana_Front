export type AbToken = {
  "version": "0.1.0",
  "name": "ab_token",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateOldToken",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "oldToken",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "updateNewToken",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newToken",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "tokenTransferMintTo",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTreasury",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong edition is supplied"
          ]
        },
        {
          "name": "tokenDestination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "oldDecimal",
          "type": "u8"
        },
        {
          "name": "newDecimal",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "globalInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "oldToken",
            "type": "publicKey"
          },
          {
            "name": "newToken",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAutority",
      "msg": "You should transfer mint authority of new token to program"
    },
    {
      "code": 6001,
      "name": "InvalidSuperOwner",
      "msg": "Invalid Super Owner"
    }
  ]
};

export const IDL: AbToken = {
  "version": "0.1.0",
  "name": "ab_token",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateOldToken",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "oldToken",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "updateNewToken",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newToken",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "tokenTransferMintTo",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTreasury",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong edition is supplied"
          ]
        },
        {
          "name": "tokenDestination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "oldDecimal",
          "type": "u8"
        },
        {
          "name": "newDecimal",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "globalInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "oldToken",
            "type": "publicKey"
          },
          {
            "name": "newToken",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAutority",
      "msg": "You should transfer mint authority of new token to program"
    },
    {
      "code": 6001,
      "name": "InvalidSuperOwner",
      "msg": "Invalid Super Owner"
    }
  ]
};
