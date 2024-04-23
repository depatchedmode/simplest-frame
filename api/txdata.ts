import { encodeFunctionData } from 'viem';

export default async () => {
  try {
    // Contract details
    const CONTRACT_ADDRESS = '0x8CA328F83387519Eb8B18Ea23fc01bBe92dE2Adc'; // Counter.sol on Base    
    const abi = [{'inputs':[],'stateMutability':'nonpayable','type':'constructor'},{'inputs':[],'name':'getCurrentCount','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'incrementCount','outputs':[],'stateMutability':'nonpayable','type':'function'}];

    // Encode the transaction data for the incrementCount function
    const calldata = encodeFunctionData({
      abi: abi,
      functionName: 'incrementCount',
      args: []
    });

    const txJson = JSON.stringify(
      {
        chainId: 'eip155:8453', // base
        method: 'eth_sendTransaction',
        params: {
          abi: abi, // JSON ABI of the function selector and any errors
          to: CONTRACT_ADDRESS,
          data: calldata,
          value: '0',
        },
      }
    )

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