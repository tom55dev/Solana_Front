export const IDL ={
  "version": "0.1.0",
  "name": "ab_token",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oldTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
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
        }
      ]
    },
    {
      "name": "updateOldToken",
      "accounts": [
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
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
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
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
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oldTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
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
        }
      ]
    },
    {
      "name": "redeem",
      "accounts": [
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "newTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newTokenMint",
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
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "GlobalInfo",
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
  ],
  "metadata": {
    "address": "7vfAZgrKyYV2e3XTKuwisXfVcdSY7vMZ7N5m6ppNMboP"
  }
}