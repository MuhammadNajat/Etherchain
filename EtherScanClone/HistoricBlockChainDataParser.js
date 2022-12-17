class BlockDataFetcher {
    singleBlockDataFetched = true;
    async prepareSingleBlockData() {
        var web3 = new Web3('https://mainnet.infura.io/v3/b1adf29d32104e6aa8fad9eafa15392c');
        
        var data = document.getElementById('searchInput').value;
        data = data.trim();
        data = data.replace(/^0+/, '');
                
        var lastBlockNumber = await web3.eth.getBlockNumber();
        if(this.validBlockNumber(data, lastBlockNumber) == false) {
            this.singleBlockDataFetched = false;
            document.getElementById('blockSearchResultDiv').style.visibility = 'collapse';
            return false;
        }
        var blockData = await web3.eth.getBlock(data);

        document.getElementById('blockSearchResultDiv').style.visibility = 'visible';
        var table = document.getElementById('blockSearchResultTableBody');
        table.innerHTML = "";
        var row = `<tr>
                    <td>${'Number'}</td>
                    <td>${blockData.number}</td>
                    </tr>`;
        table.innerHTML += row;

        row = `<tr>
                    <td>${'Hash'}</td>
                    <td>${blockData.hash}</td>
                    </tr>`;
        table.innerHTML += row;

        row = `<tr>
                    <td>${'Miner'}</td>
                    <td>${blockData.miner}</td>
                    </tr>`;
        table.innerHTML += row;

        row = `<tr>
                    <td>${'Difficulty'}</td>
                    <td>${blockData.difficulty}</td>
                    </tr>`;
        table.innerHTML += row;

        row = `<tr>
                    <td>${'Trnx Count'}</td>
                    <td>${blockData.transactions.length}</td>
                    </tr>`;
        table.innerHTML += row;
    }

    validBlockNumber(data, lastBlockNumber) {
        //var web3 = new Web3('https://mainnet.infura.io/v3/b1adf29d32104e6aa8fad9eafa15392c');
        var lastBlockNumberText = lastBlockNumber.toString();
        var inputLength = data.length;
        var lastBlockLength = lastBlockNumberText.length;

        if(inputLength > lastBlockLength) {
            return false;
        }
        else if(inputLength < lastBlockLength) {
            return true;
        }

        for(var i=0; i<inputLength; i++) {
            if(data[i] < '0' || data[i] > '9') {
                return false;
            }
        }

        for(var i=0; i<inputLength; i++) {
            if(data[i] != lastBlockNumberText[i]) {
                return data[i] < lastBlockNumberText[i];
            }
        }
        
        return true;
    }

    async prepareBlockTableData() {
        var web3 = new Web3('https://mainnet.infura.io/v3/b1adf29d32104e6aa8fad9eafa15392c');
        //Uncomment the following line to show console data
        //const Web3 = require('web3');

        ////var web3 = new Web3('https://mainnet.infura.io/v3/b1adf29d32104e6aa8fad9eafa15392c');
        const lastBlockNumber = await web3.eth.getBlockNumber();
        var recentBlocks = []
        console.log("**Last 10 blocks");
        var total = 10;
        for (var i=0; i<total; i++) {
            recentBlocks.push(lastBlockNumber - i);
        }

        let block = await web3.eth.getBlock(lastBlockNumber);

        var blockDetails = [];
        for (var i = 0; i < recentBlocks.length; i++){
            var blockData = await web3.eth.getBlock(recentBlocks[i]);
            blockDetails.push([blockData.number, blockData.miner, blockData.transactions.length, blockData.timestamp]);
        }

        if (typeof document === 'undefined') {
            // during server evaluation
        } else {
            // during client's browser evaluation
            var table = document.getElementById('blockTableBody');
            for (var i = 0; i < recentBlocks.length; i++){
                var timestamp = Number(new Date());
                var row = `<tr>
                                <td style='width: 33.33%;'>${'Bk' + '&nbsp' + blockDetails[i][0]}</td>
                                <td style='width: 33.33%;'>${'Miner' + '&nbsp' + blockDetails[i][1].substring(0, 15) + '...'}</td>
                                <td style='width: 33.33%;'>${'Tx count' + '&nbsp' + blockDetails[i][2]}</td>
                            </tr>`;

                table.innerHTML += row
            }
        }

        return recentBlocks;
    }
}

class TransactionDataFetcher {
    singleTransactionDataFetched = true;
    async prepareSingleTransactionData() {
        var web3 = new Web3('https://mainnet.infura.io/v3/b1adf29d32104e6aa8fad9eafa15392c');
        var data = document.getElementById('searchInput').value;
        data = data.trim();
        
        var transactionData = await web3.eth.getTransaction(data);
        if(transactionData == null) {
            this.singleTransactionDataFetched = false;
            document.getElementById('tnxSearchResultDiv').style.visibility = 'collapse';
            return false;
        }

        var timeConverter = new TimeConverter();
        document.getElementById('tnxSearchResultDiv').style.visibility = 'visible';
        var table = document.getElementById('tnxSearchResultTableBody');
        table.innerHTML = "";
        row = `<tr>
                    <td>${'Hash'}</td>
                    <td>${transactionData.hash}</td>
                    </tr>`;
        table.innerHTML += row;

        var row = `<tr>
                    <td>${'Block'}</td>
                    <td>${transactionData.blockNumber}</td>
                    </tr>`;
        table.innerHTML += row;

        row = `<tr>
                    <td>${'From'}</td>
                    <td>${transactionData.from}</td>
                    </tr>`;
        table.innerHTML += row;

        row = `<tr>
                    <td>${'To'}</td>
                    <td>${transactionData.to}</td>
                    </tr>`;
        table.innerHTML += row;

        row = `<tr>
                    <td>${'Value'}</td>
                    <td>${transactionData.value + '&nbsp' + 'wei'}</td>
                    </tr>`;
        table.innerHTML += row;
        /*var time = transactionData.timestamp;
        //var date1 = new Date(parseInt(date)*1000);
        //var utcDate = date1.toUTCString();
        row = `<tr>
                    <td>${'Time'}</td>
                    <td>${transactionData.}</td>
                    </tr>`;
        table.innerHTML += row;*/
        //////////

        return true;
    }

    async prepareTransactionTableData() {
        //Uncomment the following line to show console data
        //const Web3 = require('web3');

        var web3 = new Web3('https://mainnet.infura.io/v3/b1adf29d32104e6aa8fad9eafa15392c');
        var lastBlockNumber = await web3.eth.getBlockNumber();
        /*var recentBlocks = []
        for (var i=0; i<10; i++) {
            recentBlocks.push(lastBlockNumber - i);
        }

        let block = await web3.eth.getBlock(lastBlockNumber);
        */

        var transactionData = [];
        var transactionCount = 0, total = 10, currentBlockNumber = lastBlockNumber;
        while(transactionCount < total) {
            //for (var i = 0; i < recentBlocks.length && transactionCount < total; i++) {
                var blockData = await web3.eth.getBlock(currentBlockNumber);
                var blockSize = blockData.transactions.length;
                for(var j=0; j<blockSize && transactionCount < total; j++) {
                    const transaction = await web3.eth.getTransaction(blockData.transactions[j]);
                    transactionData.push( [transaction.hash, transaction.from, transaction.to, transaction.value] );
                    transactionCount++;
                }
                currentBlockNumber--;
            //}
        }

        if (typeof document === 'undefined') {
            // during server evaluation
        } else {
            // during client's browser evaluation
            var table = document.getElementById('transactionTableBody');

            for (var i = 0; i < transactionData.length; i++){
                var row = `<tr>
                                <td style='width: 33.33%; text-align: center;'>${'Tx&nbsp' + transactionData[i][0].substring(0,15) + '...'}</td>
                                <td style='width: 33.33%;'>${'From&nbsp' + transactionData[i][1].substring(0,20) + '...\n' + 'To&nbsp' + transactionData[i][2].substring(0,20) + '...'}</td>
                                <td style='width: 33.33%;  text-align: center;'>${transactionData[i][3] + '&nbsp'+ 'wei'}</td>
                            </tr>`;
                table.innerHTML += row
            }
            document.getElementById('loadingEffeectPara').style.visibility = 'collapse';
            document.getElementById('mainContentDiv').style.visibility = 'visible';
            document.getElementById('loadingEffeectPara').style.display = 'none';
        }
    }
}

class TimeConverter {
    convertTime(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date.toString() + ' ' + month.toString() + ' ' + year.toString() + ' ' + hour.toString() + ':' + min.toString() + ':' + sec ;
        return time;
    }
}

class SearchHandler {
    processSearch() {
        const blockDataFetcher = new BlockDataFetcher();
        var blockDataFetched = blockDataFetcher.prepareSingleBlockData();

        const transactionDataFetcher = new TransactionDataFetcher();
        var transactionDataFetched = transactionDataFetcher.prepareSingleTransactionData();
    }
}

class TPSData {
    static staticTPSInfo;
}

class TPSManager {
    async generateTPSData() {
        //Uncomment the following line to show console data
        //const Web3 = require('web3');
        var web3 = new Web3('https://mainnet.infura.io/v3/b1adf29d32104e6aa8fad9eafa15392c');
        
        var lastBlockNumber = await web3.eth.getBlockNumber();
        var startTimeStamp = await web3.eth.getBlock(lastBlockNumber).timestamp;
        var totalTransactions = 0;
        var timeRange = 180; // 5 minutes in sec
        for(var i=0; i<10; i++) {
            var curBlock = await web3.eth.getBlock(lastBlockNumber - i);
            var timestamp = curBlock.timestamp;
            if(timestamp < (startTimeStamp - timeRange)) {
                break;
            }
            totalTransactions += curBlock.transactions.length; 
        }

        var tps = totalTransactions / 300.0;
        if (typeof document === 'undefined') {
            // during server evaluation
        } else {
            var data = tps.toString();
            document.getElementById('tpsInfo').innerHTML = 'Transactions per sec:&nbsp' + data.substring(0, 4);
        }
    }
}

class DataScrapper {
    scrapeTPSData() {
        const puppeteer = require('puppeteer-extra');
        const pluginStealth = require('puppeteer-extra-plugin-stealth');
        puppeteer.use(pluginStealth());
        alert(1);
      
        var url = 'https://etherscan.io/';

        alert(2);
      
        var tps = '';
        (async() => {
            const browser = await puppeteer.launch();
            try {
              alert("datascrapper->scrapeTPSData->try");
              const page = await browser.newPage();
              await page.goto(url,{timeout: 0, waitUntil: 'networkidle0'});
          
              await page.waitForXPath('//*[@id="ContentPlaceHolder1_mainboxes"]/div/div/div[2]/div[1]/div[1]/span');
              const [el]= await page.$x('//*[@id="ContentPlaceHolder1_mainboxes"]/div/div/div[2]/div[1]/div[1]/span');
      
              const txt = await el.getProperty('textContent');
              var rawTxt = await txt.jsonValue();

              tps = rawTxt;
              alert(rawTxt);
              TPSData.staticTPSInfo = rawTxt;
              console.log(rawTxt);
              if(!(typeof document === 'undefined')) {
                document.getElementById('tpsInfo').innerHTML = rawTxt;
              }
            } catch (err) {
              console.log(err.message);
            } finally {
              await browser.close();
              console.log(tps.substring(2, 6));
            }
        })();      
    }
}

class HistoricDataManager {
    prepareData() {

        const blockDataFetcher = new BlockDataFetcher();
        blockDataFetcher.prepareBlockTableData();

        const transactionDataFetcher = new TransactionDataFetcher();
        transactionDataFetcher.prepareTransactionTableData();

        //const tpsManager = new TPSManager();
        //tpsManager.generateTPSData();

        const dataScrapper = new DataScrapper();
        dataScrapper.scrapeTPSData();
    }
}

//const b = new BlockDataFetcher();
//b.testBetchPrepareBlockTableData();

//const dataManager = new HistoricDataManager();
//dataManager.prepareData();

module.exports.BlockDataFetcher = BlockDataFetcher;