import { encodeAbiParameters, encodeFunctionData } from 'viem';
import { parseRequest } from '../modules/utils.js';
import { FrameActionDataParsed, getFrameMessage } from 'frames.js';

export default async (req) => {
  try {
    const payload = await parseRequest(req);
    const frameMessage = payload ? await getFrameMessage(payload, {
        hubHttpUrl: process.env.FARCASTER_HUB
    }) : {} as FrameActionDataParsed;
    
    // Contract details
    const CONTRACT_ADDRESS = '0xc6d4848c9f01d649dfba170c65a964940a93dca5';
    const mintFee = 777000000000000;
    
    const partialZora1155ABI = [
      {
        'inputs': [],
        'name': 'mintFee',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [
            {
                'internalType': 'contract IMinter1155',
                'name': 'minter',
                'type': 'address'
            },
            {
                'internalType': 'uint256',
                'name': 'tokenId',
                'type': 'uint256'
            },
            {
                'internalType': 'uint256',
                'name': 'quantity',
                'type': 'uint256'
            },
            {
                'internalType': 'bytes',
                'name': 'minterArguments',
                'type': 'bytes'
            },
            {
                'internalType': 'address',
                'name': 'mintReferral',
                'type': 'address'
            }
        ],
        'name': 'mintWithRewards',
        'outputs': [],
        'stateMutability': 'payable',
        'type': 'function'
    },
    ];

    const minterAddress = '0x04e2516a2c207e84a1839755675dfd8ef6302f0a';
    const mintReferral = '0x76963eE4C482fA4F9E125ea3C9Cc2Ea81fe8e8C6';

    const tokenId = 2;
    const quantity = frameMessage.state ? JSON.parse(frameMessage.state).mintQuantity : 1;
    const mintToAddress = frameMessage.connectedAddress; 
    const comment = frameMessage.inputText || ''; 
    
    let minterArguments;
    if (comment.length > 0) {
      minterArguments = encodeAbiParameters(
          [
              { name: 'addressArg', type: 'address' },
              { name: 'commentArg', type: 'string' }
          ],
          [mintToAddress as `0x${string}`, comment]
      );
    } else {
      minterArguments = encodeAbiParameters(
          [
              { name: 'addressArg', type: 'address' }
          ],
          [mintToAddress as `0x${string}`]
      );
    }

    // Encode the transaction data for the incrementCount function
    const calldata = encodeFunctionData({
      abi: partialZora1155ABI,
      functionName: 'mintWithRewards',
      args: [minterAddress, tokenId, quantity, minterArguments, mintReferral]
    });

    const txJson = JSON.stringify(
      {
        chainId: 'eip155:7777777', // zora
        method: 'eth_sendTransaction',
        params: {
          abi: partialZora1155ABI, 
          to: CONTRACT_ADDRESS,
          data: calldata,
          value: (mintFee * quantity).toString(),
        },
      }
    );

    // Return the transaction details to the client for signing
    return new Response(
      txJson,
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `Failed to process request: ${error.message}`
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
      }
    );
  }
};

export const config = {
  path: '/txdata'
};