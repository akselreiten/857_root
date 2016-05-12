# MicroChain
MicroChain implements a distributed, verifiable and transparent microlending system, built on the Ethereum platform. 
Here is how MicroChain works: 

<a href="http://www.youtube.com/watch?feature=player_embedded&v=qx8hrhBZJ98
" target="_blank"><img src="http://img.youtube.com/vi/qx8hrhBZJ98/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="720" height="540" border="10" /></a>

## Getting It Running
##### Last updated on 5.11.2016
This set of instructions is known to work on Mac OS X only and requires Internet connectivity. It assumes some familiarity with the command line and Homebrew. In general, Ethereum is quite a new platform, so there may be unforeseen technical challenges. Don’t hesitate to email fxchen12@gmail.com or aksel.reiten@gmail.com for support.

1. Ethereum Wallet is a GUI that simplifies some blockchain interactions. Download it here: https://github.com/ethereum/mist/releases/download/0.7.2/Ethereum-Wallet-macosx-0-7-2.zip

2. Geth is a command-line client that allows some more advanced Ethereum interactions. Follow the installation instructions (we recommend using Homebrew instead of building from source) here:
https://github.com/ethereum/go-ethereum/wiki/Installation-Instructions-for-Mac

3. Open up the Mac terminal and start Geth with the following command: 
 ```   
 $ geth --testnet --rpc --rpccorsdomain "*" 
 ```
 This will start an Ethereum node and spit out a lot of log lines[1].

4. Wait for your node to finish downloading the blockchain (probably up to a few hours the first time, but much faster subsequently). After running the above command, you’ll soon start seeing new log lines in your terminal that look like this:

 ```
 I0510 15:51:55.329332   73607 blockchain.go:1251] imported 256 block(s) 
 (0 queued 0 ignored) including 693 txs in 4.336050032s. #851761 [51b20ba6 / f40d2e79]
 ```

 You know your node is up-to-date when the rate of import logging decreases to about one every 15 seconds[2] and blocks are added approximately one at a time:

5.	Open Ethereum Wallet (from Applications). You should see an interface like this:
![alt text](https://github.com/akselreiten/857_root/blob/master/img/rm1.png "Account Overview")
 Create a new account—click “Wallets” (blue oval), then click “Add Account” (green oval). Choose and type in a password. You should see your new account appear around where the red oval is.

6. At this point, I’ll need to register your account as a user of MicroChain, and give you some ether (the Ethereum currency) on the testnet, so you can send transactions. Click your new account (the red oval in the above figure)—you’ll get to the following view:
 
 ![alt text](https://github.com/akselreiten/857_root/blob/master/img/rm2.png "Public Key")
 
 Copy your public key (purple box), and send an email to fxchen12@gmail.com with the name you want on your MicroChain account (e.g. Ben Bitdiddle), and your public key. I’ll register your account with some initial fake currency for demo purposes (you can always ask me for more). I’ll let you know when you’re ready to proceed to the next step.

7.	Once you’ve received ether and are registered, open up a new terminal window and run the following command:
 ```
 $ geth attach
 ```

 This gives you a console to interact with the Ethereum blockchain through Geth.
 
8. Copy your public key from Ethereum wallet (see Step 6), and run the following command in the Geth console (the terminal where you ran the above command):
 ```
 $ personal.unlockAccount(“<YOUR PUBLIC KEY>”)
 ```

 Where <YOUR PUBLIC KEY> is replaced by your actual public key. Type your password when prompted. The terminal interaction should look like this:
 ```
 > personal.unlockAccount("0xCd6a...")
 Unlock account cd6a...
 Passphrase: 
 true
 ```

9. At this point, you’re ready to use the MicroChain front end to actually use the lending system. Navigate to http://akselreiten.github.io/857_root/. Alternatively, clone or otherwise download the MicroChain code (in the same repository as these instructions), go the repo root, and open up views/index.html in your favorite browser. It should look like this:

 ![alt text](https://github.com/akselreiten/857_root/blob/master/img/rm3.png "MicroChain web interface")


10. Type in your public key (see Step 6) and click “Get Started.” You should get to a screen that looks like this:
 
 ![alt text](https://github.com/akselreiten/857_root/blob/master/img/rm4.png "In")

 You’re in! Feel free to navigate around, and play with any of the functionalities of the system. Note that your actions will have some latency (~one minute) in terms of yielding results, because the blockchain takes time to reach consensus. Take a look at the demo video in the repository to see what’s possible.
 
## Notes
If you want to read more about Ethereum in general, start here:
-	https://www.ethereum.org/
-	https://github.com/ethereum/
-	https://blog.ethereum.org/

Google will probably also be your friend—the developer community seems pretty active, so there are a lot of resources out there.

1.	geth starts an Ethereum node.

 --testnet points your node to the Morden Testnet. It’s a network that’s used for testing Ethereum distributed applications (as opposed to the main Ethereum network). Read more here:
https://github.com/ethereum/wiki/wiki/Morden

 --rpc allows your node to serve RPCs, which is what our front-end uses to send requests to it. MicroChain is a “distributed application”, which means that the P2P Ethereum network is the server, and the client (your browser) can interact by talking to any node.

 --rpccorsdomain “*” modifies the Cross-Origin Resource Sharing (CORS) policy on your browser, so it can talk to your local Ethereum node. (Technically, we only need to enable it for localhost, but we haven’t found a way to make this work.) Since the node can only be contacted by your local machine, this should be secure. Read more about CORS here:
 https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
 
 Read more about how to connect a web site to a geth node here: http://ethereum.stackexchange.com/questions/647/how-to-connect-a-web-site-to-a-geth-node

2.	The block time for Ethereum is around 15 seconds. See here:
 https://etherscan.io/charts/blocktime










