


var j_password = ""
var j_username = ""
var from = ""
var to = ""
var jdate = ""
var autoUpgrade = ""
var confirmBirth = ""
var phone = ""

var a1 = "", a2 = "", a3 = " ", a4 = "  ", a5 = " ", a6 = "NULL_IDCARD", a7 = "", a8 = "";
var b1 = "", b2 = "", b3 = " ", b4 = "  ", b5 = " ", b6 = "NULL_IDCARD", b7 = "", b8 = "";
var c1 = "", c2 = "", c3 = " ", c4 = "  ", c5 = " ", c6 = "NULL_IDCARD", c7 = "", c8 = "";
var d1 = "", d2 = "", d3 = " ", d4 = "  ", d5 = " ", d6 = "NULL_IDCARD", d7 = "", d8 = "";
var e1 = "", e2 = "", e3 = " ", e4 = "  ", e5 = " ", e6 = "NULL_IDCARD", e7 = "", e8 = "";
var f1 = "", f2 = "", f3 = " ", f4 = "  ", f5 = " ", f6 = "NULL_IDCARD", f7 = "", f8 = "";

var g1 = "", g2 = "-1", g3 = " ";
var h1 = "", h2 = "1-", h3 = " ";
var flagClick = 0;

var quota = "";
var payMode = "", netBank = "", dbCard = "", card_type = "", card_no = "", card_expiry = "", SBIAcc = "", cvv_no = "", ccPin_id = "", card_name = "", card_expiry_year = "", ccBankName = ""; var brPoint = "";
var fCode = ""; tCode = ""; jDateM = ""; var trainNo = ""; var jclass = ""; var isValid = ""; var tTabId = ""; var uType = ""; var autoSearch = ""; var autoPay = ""; var bookDate = ""; var bookDate1 = "";
var sData = '<div style=" bottom: 0; margin: 0 auto; position: fixed; width: 100%;"><div id="ddMes" style=" background: none repeat scroll 0 0 #f1f1f1;bottom: 0; overflow: hidden;margin: 0 auto; padding:10px" align="center">Deepak Is Cool</div></div>'
var ldFlag = 0;
var divMess; var bankUID = ""; var bankPWD = ""; Otp = ""; CustomerMmid = ""; CustomerMobileNumber = "";

var sbiAssLoginHostNames = ["www.sbbjonline.com", "www.onlinesbh.com", "www.onlinesbm.com", "www.onlinesbp.com", "www.sbtonline.in"];


chrome.runtime.onConnect.addListener(function (port) {

    // chrome.tabs.executeScript(null, { code: "(" + myAlert.toString() + ")()" });
    var tab = port.sender.tab;

    port.onMessage.addListener(function (info) {
        autoSearch = info.autoSearch;
        autoPay = info.autoPay;
        ccBankName = info.ccBankName
        payMode = info.payMode
        netBank = info.netBank
        dbCard = info.dbCard
        card_type = info.card_type
        card_no = CryptoJS.AES.decrypt(info.card_no, "card_no").toString(CryptoJS.enc.Utf8);
        card_expiry = info.card_expiry
        cvv_no = CryptoJS.AES.decrypt(info.cvv_no, "cvv_no").toString(CryptoJS.enc.Utf8);
        ccPin_id = CryptoJS.AES.decrypt(info.ccPin_id, "ccPin_id").toString(CryptoJS.enc.Utf8);
        card_name = info.card_name
        card_expiry_year = info.card_expiry_year;
        
        j_username = CryptoJS.AES.decrypt(info.j_username, "j_username").toString(CryptoJS.enc.Utf8);
        j_password = CryptoJS.AES.decrypt(info.j_password, "j_password").toString(CryptoJS.enc.Utf8);
        from = info.from
        to = info.to
        jdate = info.date
        a1 = info.a1
        a2 = info.a2
        a3 = info.a3
        a4 = info.a4
        b1 = info.b1
        b2 = info.b2
        b3 = info.b3
        b4 = info.b4
        c1 = info.c1
        c2 = info.c2
        c3 = info.c3
        c4 = info.c4
        d1 = info.d1
        d2 = info.d2
        d3 = info.d3
        d4 = info.d4
        e1 = info.e1
        e2 = info.e2
        e3 = info.e3
        e4 = info.e4
        f1 = info.f1
        f2 = info.f2
        f3 = info.f3
        f4 = info.f4
        quota = info.quota
        a5 = info.a5
        a6 = info.a6
        a7 = info.a7
        a8 = info.a8
        b5 = info.b5
        b6 = info.b6
        b7 = info.b7
        b8 = info.b8
        c5 = info.c5
        c6 = info.c6
        c7 = info.c7
        c8 = info.c8
        d5 = info.d5
        d6 = info.d6
        d7 = info.d7
        d8 = info.d8
        e5 = info.e5
        e6 = info.e6
        e7 = info.e7
        e8 = info.e8
        f5 = info.f5
        f6 = info.f6
        f7 = info.f7
        f8 = info.f8
        g1 = info.g1
        g2 = info.g2
        g3 = info.g3;
        h1 = info.h1;
        h2 = info.h2;
        h3 = info.h3;
        trainNo = info.trainNo;
        jclass = info.jclass;
        phone = CryptoJS.AES.decrypt(info.phone, "phone").toString(CryptoJS.enc.Utf8);
        autoUpgrade = info.autoUpgrade;
        confirmBirth = info.confirmBirth;
        isValid = info.isValid;
        uType = info.test;
        bookDate = info.bookDate;
        bookDate1 = info.bookDate1;
        brPoint = info.brPoint;
        bankUID = CryptoJS.AES.decrypt(info.bankUID, "bankUID").toString(CryptoJS.enc.Utf8);
        bankPWD = CryptoJS.AES.decrypt(info.bankPWD, "bankPWD").toString(CryptoJS.enc.Utf8);
        SBIAcc = info.SBIAcc;
        flagClick = 0;
        Otp = info.Otp;
        CustomerMobileNumber = CryptoJS.AES.decrypt(info.CustomerMobileNumber, "CustomerMobileNumber").toString(CryptoJS.enc.Utf8);
        CustomerMmid = CryptoJS.AES.decrypt(info.CustomerMmid, "CustomerMmid").toString(CryptoJS.enc.Utf8);
        //chrome.storage.local.set({ 'bankUID': info.bankUID });

    });
});

chrome.browserAction.onClicked.addListener(function (tab) {

    chrome.tabs.create({ 'url': "http://myrailinfo.in/landing.html" });
});



chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    
    
    
    
    if (changeInfo.status == 'loading' & (tab.url.indexOf('.flipkart.') > -1 || tab.url.indexOf('.snapdeal.') > -1 || tab.url.indexOf('.amazon.') > -1)) {
        
        chrome.tabs.executeScript(tabId, { file: 'jquery.js' });
        chrome.tabs.executeScript(tabId, { file: 'runIT.js' });
        return;
       
    }

    if (changeInfo.status == 'complete') {
        if (isValid == 1) {
            chrome.tabs.executeScript(tabId, { file: 'jquery.js' });
            chrome.tabs.executeScript(tabId, { file: 'runIT.js' });
            
        }
    }

    if (changeInfo.status == 'complete' && tab.title == "myRailinfo - Browser Plugin") {
        // if (tab.url.indexOf('myrailinfo.in') > -1 & tab.title == "myRailinfo - Browser Plugin") {

        chrome.tabs.executeScript(null, { file: "content_script.js" });
        chrome.tabs.executeScript(null, { file: "aes.js" });
        tTabId = tabId;

    }

    if (changeInfo.status == 'complete' & autoPay == true) {
        //alert(tab.url.indexOf('.onlineingvysya.'));
        if (tab.url.indexOf('netbanking.hdfcbank.com') > -1 && netBank == 36) {
            if (bankPWD != "" & bankUID != "" & flagClick == 0) {
                chrome.tabs.executeScript(tabId, { code: 'var iframe = document.getElementsByName("bottom_frame")[0]; var innerDoc = iframe.contentDocument || iframe.contentWindow.document; innerDoc.getElementsByName("fldLoginUserId")[0].value = "' + bankUID + '"; var imK = innerDoc.getElementsByTagName("IMG"); for (k = 0; k < imK.length; k++) {if (imK[k].alt == "continue") { imK[k].click(); break; } }' });
                //  console.log(flagClick);
                flagClick = 1;
            }
            else if (flagClick == 1) {
                chrome.tabs.executeScript(tabId, { code: 'var iframe = document.getElementsByName("bottom_frame")[0]; var innerDoc = iframe.contentDocument || iframe.contentWindow.document; innerDoc.getElementsByName("fldPassword")[0].value = "' + bankPWD + '"; innerDoc.getElementsByName("chkrsastu")[0].click(); var imK = innerDoc.getElementsByTagName("IMG"); for (k = 0; k < imK.length; k++) {if (imK[k].alt == "Log In") { imK[k].click(); break; } }' });
                //  console.log(flagClick);
                flagClick = 2;
            }
            chrome.tabs.executeScript(tabId, { code: 'if (document.getElementsByName("selAcct")[0] != null) { document.getElementsByName("selAcct")[0].selectedIndex = 1; var imK = document.getElementsByTagName("IMG"); for (k = 0; k < imK.length; k++) {if (imK[k].alt == "Continue") { imK[k].click(); break; } }}' });
          //  chrome.tabs.executeScript(tabId, { code: 'var imK2 = document.getElementsByTagName("IMG"); for (k = 0; k < imK2.length; k++) { if (imK2[k].alt == "Confirm") { document.getElementsByName("fldRsaAuthReq")[0].value = "N";  document.getElementsByName("frmTxn")[0].submit(); break; } }' });
        }
        else if (tab.url.indexOf('.inkvb.') > -1 && netBank == 40) {

            chrome.tabs.executeScript(tabId, { code: 'document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByName("fldLoginUserId")[0].value="' + bankUID + '";' });
            chrome.tabs.executeScript(tabId, { code: 'document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByName("fldPassword")[0].value="' + bankPWD + '";' });

            if (bankPWD != "" & bankUID != "" & autoPay == true) {
                if (flagClick == 0)
                    chrome.tabs.executeScript(tabId, { code: 'document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByName("imageField")[0].click();' });
                flagClick = 1;
            }
        }
        else if (tab.url.indexOf('.syndonline.') > -1 && netBank == 54) {
            chrome.tabs.executeScript(tabId, { code: 'document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByName("fldLoginUserId")[0].value="' + bankUID + '";' });
            chrome.tabs.executeScript(tabId, { code: 'document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByName("fldPassword")[0].value="' + bankPWD + '";' });

            if (bankPWD != "" & bankUID != "" & autoPay == true) {
                if (flagClick == 0)
                    chrome.tabs.executeScript(tabId, { code: 'document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByName("imageField")[0].click();' });
                flagClick = 1;
            }
        }
        else if (tab.url.indexOf('.centralbank.') > -1 && netBank == 50) {

            chrome.tabs.executeScript(tabId, { code: 'document.getElementById("index").contentWindow.document.getElementsByName("uid")[0].value="' + bankUID + '";' });
            chrome.tabs.executeScript(tabId, { code: 'document.getElementById("index").contentWindow.document.getElementsByName("pwd")[0].value="' + bankPWD + '";' });
            if (bankPWD != "" & bankUID != "" & autoPay == true) {
                if (flagClick == 0)
                    chrome.tabs.executeScript(tabId, { code: 'var imK2 = document.getElementById("index").contentWindow.document.getElementsByTagName("IMG"); for (k = 0; k < imK2.length; k++) {  if (imK2[k].src.indexOf("btn_login.gif") > -1) {imK2[k].click();  break; } }' });
                flagClick = 1;
            }
        }
        else if (tab.url.indexOf('netbanking.yesbank.') > -1 && netBank == 60) {
            //alert();
            chrome.tabs.executeScript(tabId, { code: 'console.log("ddd");' });
            if (flagClick == 0)
                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    chrome.tabs.executeScript(tabId, { code: 'function dd(){ while (1 == 1) {if (document.getElementsByName("bottom_frame")[0].contentWindow.document.getElementsByName("fldLoginUserId")[0]!=null){ document.getElementsByName("bottom_frame")[0].contentWindow.document.getElementsByName("fldLoginUserId")[0].value = "' + bankUID + '"; document.getElementsByName("bottom_frame")[0].contentWindow.document.getElementsByName("fldPassword")[0].value = "' + bankPWD + '"; dd2(); break; } } return;} setTimeout(function () { dd(); }, 1500);' });


                    chrome.tabs.executeScript(tabId, { code: 'function dd2(){var imK2 = document.getElementsByName("bottom_frame")[0].contentWindow.document.getElementsByTagName("IMG"); for (k = 0; k < imK2.length; k++) { if (imK2[k].alt  == "Login") { imK2[k].click(); break; } }}' });

                    flagClick = 1;
                }
        }

    }
    if (changeInfo.status == 'loading') {


        if (isValid == 1) {

            if (tab.url.indexOf('ctc.co.in/eticketing') > -1) {

                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "IRCTC Next Generation eTicketing System") { document.getElementsByName("j_password")[0].value="' + j_password + '";document.getElementsByName("j_username")[0].value="' + j_username + '";document.getElementsByName("j_captcha")[0].focus(); }' });



                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Journey Planner"){ var quota = document.getElementsByName("quota"); for (i = 0; i < quota.length; i++) { if (quota[i].value == "' + quota + '") { quota[i].checked = true;break; }}}' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Journey Planner") {  var trLink = document.getElementsByTagName("A");  var trLinkFlag = 0;  for (i = 0; i < trLink.length; i++) {    if (trLink[i].id.indexOf("cllink-' + trainNo + '-' + jclass + '-") > -1) {      trLinkFlag = 1;      trLink[i].parentElement.parentElement.style.background = "yellow";      trLink[i].style.fontWeight = "bold";      trLink[i].style.color = "Red";      }  }  if (trLinkFlag == 0) {    alert("Class Link not found for Train No ' + trainNo + ', Click Class & Book Now Manually")  }}' });

                if (trainNo.length > 2) {
                    chrome.tabs.executeScript(tabId, { code: 'function dd2()            {    var bId = "' + trainNo + '" + "-" + "' + jclass + '" + "-" + "' + quota + '" + "-0";   if (document.getElementById(bId) == null)              {                setTimeout(function () { dd2("Press a button!"); }, 1);              }              else              {                if (document.getElementById(bId).innerText == "Book Now")                {                                    document.getElementById("jpBookForm:jpTrainNumber").value = "' + trainNo + '";                  document.getElementById("jpBookForm:jpFromStationCode").value = fCode;                  document.getElementById("jpBookForm:jpToStationCode").value = tCode;                  document.getElementById("jpBookForm:jpJourneydate").value = "' + bookDate + '";                  document.getElementById("jpBookForm:jpJourneyClass").value = "' + jclass + '";                  document.getElementById("jpBookForm:jpJourneyQuota").value = "' + quota + '";                  document.getElementById("jpBookForm:jpAvlSts").value = "1";                  document.getElementById("jpBookForm:jpBookNow").click()                }                else                {                  return;                }              }            };  if (document.title == "Journey Planner"){ fCode = document.getElementById("jpform:fromStation").value.split("-");             fCode = fCode[1].trim(); tCode = document.getElementById("jpform:toStation").value.split("-"); tCode = tCode[1].trim();    dd2();}' });
                }



                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "E-Ticketing") { document.getElementsByName("jpform:fromStation")[0].value="' + from + '"; document.getElementsByName("jpform:toStation")[0].value="' + to + '";document.getElementsByName("jpform:journeyDateInputDate")[0].value="' + jdate + '";}' });
                if (autoSearch == true) {
                    chrome.tabs.executeScript(tabId, { code: 'if (document.title == "E-Ticketing") { document.getElementById("jpform:jpsubmit").click();}' });
                }




                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { ddl=document.getElementsByName("addPassengerForm:boardingStation")[0]; for (i = 0; i < ddl.length; i++) {  if (ddl[i].text == "' + brPoint + '") { ddl.selectedIndex = i; break; } }}' });

                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { var pcoll = document.getElementsByClassName("input-style1 psgn-name"); pcoll[0].value = "' + a1 + '";pcoll[1].value = "' + b1 + '";pcoll[2].value = "' + c1 + '";pcoll[3].value = "' + d1 + '";pcoll[4].value = "' + e1 + '";pcoll[5].value = "' + f1 + '";}' });
                //  chrome.tabs.executeScript(tabId, { code: 'function ddlChg(ddl, txt) { for (i = 0; i < ddl.length; i++) { if (ddl[i].value == txt) { ddl.selectedIndex = i; break; } } }; if (document.title == "Book Ticket - Passengers Information") {  document.getElementsByName("addPassengerForm:psdetail:0:psgnName")[0].value="' + a1 + '";document.getElementsByName("addPassengerForm:psdetail:0:psgnAge")[0].value="' + a2 + '";document.getElementsByName("addPassengerForm:psdetail:0:psgnGender")[0].selectedIndex ="' + a3 + '";ddlChg(document.getElementsByName("addPassengerForm:psdetail:0:berthChoice")[0],"' + a4 + '");document.getElementsByName("addPassengerForm:psdetail:1:psgnName")[0].value="' + b1 + '";document.getElementsByName("addPassengerForm:psdetail:1:psgnAge")[0].value="' + b2 + '";document.getElementsByName("addPassengerForm:psdetail:1:psgnGender")[0].selectedIndex ="' + b3 + '";ddlChg(document.getElementsByName("addPassengerForm:psdetail:1:berthChoice")[0],"' + b4 + '");document.getElementsByName("addPassengerForm:psdetail:2:psgnName")[0].value="' + c1 + '";document.getElementsByName("addPassengerForm:psdetail:2:psgnAge")[0].value="' + c2 + '";document.getElementsByName("addPassengerForm:psdetail:2:psgnGender")[0].selectedIndex ="' + c3 + '";ddlChg(document.getElementsByName("addPassengerForm:psdetail:2:berthChoice")[0],"' + c4 + '");document.getElementsByName("addPassengerForm:psdetail:3:psgnName")[0].value="' + d1 + '";document.getElementsByName("addPassengerForm:psdetail:3:psgnAge")[0].value="' + d2 + '";document.getElementsByName("addPassengerForm:psdetail:3:psgnGender")[0].selectedIndex ="' + d3 + '";ddlChg(document.getElementsByName("addPassengerForm:psdetail:3:berthChoice")[0],"' + d4 + '");document.getElementsByName("addPassengerForm:psdetail:4:psgnName")[0].value="' + e1 + '";document.getElementsByName("addPassengerForm:psdetail:4:psgnAge")[0].value="' + e2 + '";document.getElementsByName("addPassengerForm:psdetail:4:psgnGender")[0].selectedIndex ="' + e3 + '";ddlChg(document.getElementsByName("addPassengerForm:psdetail:4:berthChoice")[0],"' + e4 + '");document.getElementsByName("addPassengerForm:psdetail:5:psgnName")[0].value="' + f1 + '";document.getElementsByName("addPassengerForm:psdetail:5:psgnAge")[0].value="' + f2 + '";document.getElementsByName("addPassengerForm:psdetail:5:psgnGender")[0].selectedIndex ="' + f3 + '";ddlChg(document.getElementsByName("addPassengerForm:psdetail:5:berthChoice")[0],"' + f4 + '");}' });
                chrome.tabs.executeScript(tabId, { code: 'function ddlChg(ddl, txt) { for (i = 0; i < ddl.length; i++) { if (ddl[i].value == txt) { ddl.selectedIndex = i; break; } } }; if (document.title == "Book Ticket - Passengers Information") {  document.getElementsByName("addPassengerForm:psdetail:0:psgnAge")[0].value="' + a2 + '";document.getElementsByName("addPassengerForm:psdetail:0:psgnGender")[0].selectedIndex ="' + a3 + '";ddlChg(document.getElementsByName("addPassengerForm:psdetail:0:berthChoice")[0],"' + a4 + '");document.getElementsByName("addPassengerForm:psdetail:1:psgnAge")[0].value="' + b2 + '";document.getElementsByName("addPassengerForm:psdetail:1:psgnGender")[0].selectedIndex ="' + b3 + '";ddlChg(document.getElementsByName("addPassengerForm:psdetail:1:berthChoice")[0],"' + b4 + '");document.getElementsByName("addPassengerForm:psdetail:2:psgnAge")[0].value="' + c2 + '";document.getElementsByName("addPassengerForm:psdetail:2:psgnGender")[0].selectedIndex ="' + c3 + '";ddlChg(document.getElementsByName("addPassengerForm:psdetail:2:berthChoice")[0],"' + c4 + '");document.getElementsByName("addPassengerForm:psdetail:3:psgnAge")[0].value="' + d2 + '";document.getElementsByName("addPassengerForm:psdetail:3:psgnGender")[0].selectedIndex ="' + d3 + '";ddlChg(document.getElementsByName("addPassengerForm:psdetail:3:berthChoice")[0],"' + d4 + '");document.getElementsByName("addPassengerForm:psdetail:4:psgnAge")[0].value="' + e2 + '";document.getElementsByName("addPassengerForm:psdetail:4:psgnGender")[0].selectedIndex ="' + e3 + '";ddlChg(document.getElementsByName("addPassengerForm:psdetail:4:berthChoice")[0],"' + e4 + '");document.getElementsByName("addPassengerForm:psdetail:5:psgnAge")[0].value="' + f2 + '";document.getElementsByName("addPassengerForm:psdetail:5:psgnGender")[0].selectedIndex ="' + f3 + '";ddlChg(document.getElementsByName("addPassengerForm:psdetail:5:berthChoice")[0],"' + f4 + '");}' });
                //chrome.tabs.executeScript(tabId, { code: 'function ddlChg(ddl, txt) { for (i = 0; i < ddl.length; i++) { if (ddl[i].value == txt) { ddl.selectedIndex = i; break; } } }; ' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { if (document.getElementsByName("addPassengerForm:psdetail:0:foodChoice").length > 0) { document.getElementsByName("addPassengerForm:psdetail:0:foodChoice")[0].selectedIndex = "' + a5 + '"; } ddlChg(document.getElementsByName("addPassengerForm:psdetail:0:idCardType")[0],"' + a6 + '");if (document.getElementsByName("addPassengerForm:psdetail:0:idCardNumber").length > 0) { document.getElementsByName("addPassengerForm:psdetail:0:idCardNumber")[0].value = "' + a7 + '"; } }' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { if ( ' + a8 + '==true) { document.getElementsByName("addPassengerForm:psdetail:0:concessionOpt")[0].checked = ' + a8 + '; document.getElementsByName("addPassengerForm:psdetail:0:concessionOpt")[0].disabled =false; } else  { document.getElementsByName("addPassengerForm:psdetail:0:concessionOpt")[0].checked = ' + a8 + '; document.getElementsByName("addPassengerForm:psdetail:0:concessionOpt")[0].disabled =true; } }' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { if (document.getElementsByName("addPassengerForm:psdetail:1:foodChoice").length > 0) { document.getElementsByName("addPassengerForm:psdetail:1:foodChoice")[0].selectedIndex = "' + b5 + '"; } ddlChg(document.getElementsByName("addPassengerForm:psdetail:1:idCardType")[0],"' + b6 + '");if (document.getElementsByName("addPassengerForm:psdetail:1:idCardNumber").length > 0) { document.getElementsByName("addPassengerForm:psdetail:1:idCardNumber")[0].value = "' + b7 + '"; } }' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { if ( ' + b8 + '==true) { document.getElementsByName("addPassengerForm:psdetail:1:concessionOpt")[0].checked = ' + b8 + '; document.getElementsByName("addPassengerForm:psdetail:1:concessionOpt")[0].disabled =false; } else  { document.getElementsByName("addPassengerForm:psdetail:1:concessionOpt")[0].checked = ' + b8 + '; document.getElementsByName("addPassengerForm:psdetail:1:concessionOpt")[0].disabled =true; } }' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { if (document.getElementsByName("addPassengerForm:psdetail:2:foodChoice").length > 0) { document.getElementsByName("addPassengerForm:psdetail:2:foodChoice")[0].selectedIndex = "' + c5 + '"; } ddlChg(document.getElementsByName("addPassengerForm:psdetail:2:idCardType")[0],"' + c6 + '");if (document.getElementsByName("addPassengerForm:psdetail:2:idCardNumber").length > 0) { document.getElementsByName("addPassengerForm:psdetail:2:idCardNumber")[0].value = "' + c7 + '"; } }' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { if ( ' + c8 + '==true) { document.getElementsByName("addPassengerForm:psdetail:2:concessionOpt")[0].checked = ' + c8 + '; document.getElementsByName("addPassengerForm:psdetail:2:concessionOpt")[0].disabled =false; } else  { document.getElementsByName("addPassengerForm:psdetail:2:concessionOpt")[0].checked = ' + c8 + '; document.getElementsByName("addPassengerForm:psdetail:2:concessionOpt")[0].disabled =true; } }' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { if (document.getElementsByName("addPassengerForm:psdetail:3:foodChoice").length > 0) { document.getElementsByName("addPassengerForm:psdetail:3:foodChoice")[0].selectedIndex = "' + d5 + '"; } ddlChg(document.getElementsByName("addPassengerForm:psdetail:3:idCardType")[0],"' + d6 + '");if (document.getElementsByName("addPassengerForm:psdetail:3:idCardNumber").length > 0) { document.getElementsByName("addPassengerForm:psdetail:3:idCardNumber")[0].value = "' + d7 + '"; }  }' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { if ( ' + d8 + '==true) { document.getElementsByName("addPassengerForm:psdetail:3:concessionOpt")[0].checked = ' + d8 + '; document.getElementsByName("addPassengerForm:psdetail:3:concessionOpt")[0].disabled =false; } else  { document.getElementsByName("addPassengerForm:psdetail:3:concessionOpt")[0].checked = ' + d8 + '; document.getElementsByName("addPassengerForm:psdetail:3:concessionOpt")[0].disabled =true; } }' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { if (document.getElementsByName("addPassengerForm:psdetail:4:foodChoice").length > 0) { document.getElementsByName("addPassengerForm:psdetail:4:foodChoice")[0].selectedIndex = "' + e5 + '"; } ddlChg(document.getElementsByName("addPassengerForm:psdetail:4:idCardType")[0],"' + e6 + '");if (document.getElementsByName("addPassengerForm:psdetail:4:idCardNumber").length > 0) { document.getElementsByName("addPassengerForm:psdetail:4:idCardNumber")[0].value = "' + e7 + '"; }  }' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { if ( ' + e8 + '==true) { document.getElementsByName("addPassengerForm:psdetail:4:concessionOpt")[0].checked = ' + e8 + '; document.getElementsByName("addPassengerForm:psdetail:4:concessionOpt")[0].disabled =false; } else  { document.getElementsByName("addPassengerForm:psdetail:4:concessionOpt")[0].checked = ' + e8 + '; document.getElementsByName("addPassengerForm:psdetail:4:concessionOpt")[0].disabled =true; } }' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { if (document.getElementsByName("addPassengerForm:psdetail:5:foodChoice").length > 0) { document.getElementsByName("addPassengerForm:psdetail:5:foodChoice")[0].selectedIndex = "' + f5 + '"; } ddlChg(document.getElementsByName("addPassengerForm:psdetail:5:idCardType")[0],"' + f6 + '");if (document.getElementsByName("addPassengerForm:psdetail:5:idCardNumber").length > 0) { document.getElementsByName("addPassengerForm:psdetail:5:idCardNumber")[0].value = "' + f7 + '"; } }' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { if ( ' + f8 + '==true) { document.getElementsByName("addPassengerForm:psdetail:5:concessionOpt")[0].checked = ' + f8 + '; document.getElementsByName("addPassengerForm:psdetail:5:concessionOpt")[0].disabled =false; } else  { document.getElementsByName("addPassengerForm:psdetail:5:concessionOpt")[0].checked = ' + f8 + '; document.getElementsByName("addPassengerForm:psdetail:5:concessionOpt")[0].disabled =true; } }' });

                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { document.getElementsByName("addPassengerForm:childInfoTable:0:infantName")[0].value ="' + g1 + '";document.getElementsByName("addPassengerForm:childInfoTable:0:infantAge")[0].selectedIndex ="' + g2 + '";document.getElementsByName("addPassengerForm:childInfoTable:0:infantGender")[0].selectedIndex ="' + g3 + '";}' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { document.getElementsByName("addPassengerForm:childInfoTable:1:infantName")[0].value ="' + h1 + '";document.getElementsByName("addPassengerForm:childInfoTable:1:infantAge")[0].selectedIndex ="' + h2 + '";document.getElementsByName("addPassengerForm:childInfoTable:1:infantGender")[0].selectedIndex ="' + h3 + '";}' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { if (document.getElementsByName("addPassengerForm:autoUpgrade").length > 0) { document.getElementsByName("addPassengerForm:autoUpgrade")[0].checked = ' + autoUpgrade + '; } if (document.getElementsByName("addPassengerForm:onlyConfirmBerths").length > 0) { document.getElementsByName("addPassengerForm:onlyConfirmBerths")[0].checked = ' + confirmBirth + '; } if (' + phone.length + ' == 10) { document.getElementsByName("addPassengerForm:mobileNo")[0].value = "' + phone + '" }}' });
                chrome.tabs.executeScript(tabId, { code: 'if (document.title == "Book Ticket - Passengers Information") { window.scrollTo(0,document.body.scrollHeight);document.getElementsByName("j_captcha")[0].focus();}' });

                if (payMode == "NETBANKING") {
                    payRadioValue = netBank;
                    chrome.tabs.executeScript(tabId, { code: "  if (document.URL.indexOf('ctc.co.in/eticketing/BankResponse') <= -1 & document.title == 'Book Ticket - Journey Summary') { document.getElementById('" + payMode + "').click(); for (var l = 0; l < document.getElementsByName('" + payMode + "').length; l++) {  if (document.getElementsByName('" + payMode + "')[l].value == '" + payRadioValue + "') { document.getElementsByName('" + payMode + "')[l].click()}}}" });
                    if (autoPay == true) {
                        chrome.tabs.executeScript(tabId, { code: "if (document.URL.indexOf('ctc.co.in/eticketing/BankResponse') <= -1 & document.title == 'Book Ticket - Journey Summary') {document.getElementById('validate').click();}" });
                        flagClick = 0;
                    }
                }
                else if (payMode == "CREDIT_CARD") {
                    payRadioValue = ccBankName;
                    chrome.tabs.executeScript(tabId, { code: "if (document.URL.indexOf('ctc.co.in/eticketing/BankResponse') <= -1 & document.title == 'Book Ticket - Journey Summary') { document.getElementById('" + payMode + "').click(); for (var l = 0; l < document.getElementsByName('" + payMode + "').length; l++) {  if (document.getElementsByName('" + payMode + "')[l].value == '" + payRadioValue + "') { document.getElementsByName('" + payMode + "')[l].click()}}}" });
                    chrome.tabs.executeScript(tabId, { code: 'if (document.URL.indexOf("ctc.co.in/eticketing/BankResponse") <= -1 & document.title == "Book Ticket - Journey Summary") {document.getElementsByName("card_type")[0].selectedIndex ="' + card_type + '";document.getElementsByName("card_expiry_mon")[0].selectedIndex ="' + card_expiry + '";document.getElementsByName("card_name")[0].value="' + card_name + '";document.getElementsByName("card_no")[0].value="' + card_no + '";document.getElementsByName("card_expiry_year")[0].value=' + card_expiry_year + ';document.getElementsByName("cvv_no")[0].value=' + cvv_no + ';}' });
                    chrome.tabs.executeScript(tabId, { code: 'if (document.URL.indexOf("ctc.co.in/eticketing/BankResponse") <= -1 & document.title == "Book Ticket - Journey Summary") {window.scrollTo(0,document.body.scrollHeight);document.getElementsByName("j_captcha")[0].focus();}' });
                }
                else if (payMode == "DEBIT_CARD") {
                    payRadioValue = dbCard;
                    flagClick = 0;
                    chrome.tabs.executeScript(tabId, { code: "if (document.URL.indexOf('ctc.co.in/eticketing/BankResponse') <= -1 & document.title == 'Book Ticket - Journey Summary') {document.getElementById('" + payMode + "').click(); for (var l = 0; l < document.getElementsByName('" + payMode + "').length; l++) {  if (document.getElementsByName('" + payMode + "')[l].value == '" + payRadioValue + "') { document.getElementsByName('" + payMode + "')[l].click()}}}" });
                    if (autoPay == true) {
                        chrome.tabs.executeScript(tabId, { code: 'if (document.URL.indexOf("ctc.co.in/eticketing/BankResponse") <= -1 & document.title == "Book Ticket - Journey Summary") {document.getElementById("validate").click();}' });
                    }
                }
                else {
                    chrome.tabs.executeScript(tabId, { code: "if (document.URL.indexOf('ctc.co.in/eticketing/BankResponse') <= -1 & document.title == 'Book Ticket - Journey Summary') { document.getElementById('" + payMode + "').click(); for (var l = 0; l < document.getElementsByName('" + payMode + "').length; l++) {  if (document.getElementsByName('" + payMode + "')[l].value == '" + payRadioValue + "') { document.getElementsByName('" + payMode + "')[l].click()}}}" });
                }
                chrome.tabs.executeScript(tabId, { code: "if (document.URL.indexOf('ctc.co.in/eticketing/BankResponse') <= -1 & document.title == 'Book Ticket - Journey Summary') {window.scrollTo(0,document.body.scrollHeight);}" });



            }


        }

    }
    if (changeInfo.status == 'loading' && isValid == 1) {
        {
            if (tab.url.indexOf('fssnet.co.in') > -1) {

                if (payMode == "DEBIT_CARD") {

                    if (dbCard == 25 || dbCard == 16 || dbCard == 15) {
                        chrome.tabs.executeScript(tabId, { code: 'if (document.getElementsByName("cardselectopt").length > 0) { document.getElementsByName("cardselectopt")[0].click(); }' });
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Ecom_Payment_Pin")[0].value="' + ccPin_id + '";document.getElementsByName("Ecom_Payment_Card_ExpDate_Month")[0].selectedIndex ="' + card_expiry + '";document.getElementsByName("Ecom_Payment_Card_Name")[0].value="' + card_name + '";document.getElementsByName("Ecom_Payment_Card_Number")[0].value="' + card_no + '";var quota = document.getElementsByName("Ecom_Payment_Card_ExpDate_Year")[0]; for (i = 0; i < quota.length; i++) { if (quota[i].value == "' + card_expiry_year + '") { quota.selectedIndex = i; break; } }' });
                        chrome.tabs.executeScript(tabId, { code: 'window.scrollTo(0,document.body.scrollHeight);document.getElementsByName("Ecom_Captcha_Value")[0].focus();' });

                        if (dbCard == 15) {
                            if (card_expiry != "" & ccPin_id != "" & card_name != "" & card_expiry_year != "" & card_no != "" & autoPay == true) {
                                if (flagClick == 1) {
                                    {
                                        chrome.tabs.executeScript(tabId, { code: 'document.getElementById("SubmitBtn").click();' });
                                    }
                                }
                            }
                            flagClick = flagClick + 1;
                        }

                    }
                    else if (dbCard == 3 || dbCard == 66) {

                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("debiMonth")[0].selectedIndex ="' + card_expiry + '";document.getElementsByName("debitCardholderName")[0].value="' + card_name + '";document.getElementsByName("debitCardNumber")[0].value="' + card_no + '";var quota = document.getElementsByName("debiYear")[0]; for (i = 0; i < quota.length; i++) { if (quota[i].value == "' + card_expiry_year + '") { quota.selectedIndex = i; break; } }' });
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("cardPin")[0].value="' + ccPin_id + '";' });
                        chrome.tabs.executeScript(tabId, { code: 'window.scrollTo(0,document.body.scrollHeight);document.getElementsByName("passline")[0].focus();' });

                        if (card_expiry != "" & ccPin_id != "" & card_name != "" & card_expiry_year != "" & card_no != "" & autoPay == true) {
                            if (flagClick == 0) {
                                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("passline")[0].value="TQU62"' });
                                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("captchaFlg")[0].value="0"' });
                                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("proceed")[0].click()' });
                                flagClick = 1;
                            }
                        }
                    }
                    else {

                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Ecom_Payment_Card_ExpDate_Month")[0].selectedIndex ="' + card_expiry + '";document.getElementsByName("Ecom_Payment_Card_Name")[0].value="' + card_name + '";document.getElementsByName("Ecom_Payment_Card_Number")[0].value="' + card_no + '";var quota = document.getElementsByName("Ecom_Payment_Card_ExpDate_Year")[0]; for (i = 0; i < quota.length; i++) { if (quota[i].value == "' + card_expiry_year + '") { quota.selectedIndex = i; break; } }' });
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Ecom_Payment_Pin")[0].value="' + ccPin_id + '";' });
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("testPin")[0].value="' + ccPin_id + '";' });
                        chrome.tabs.executeScript(tabId, { code: 'window.scrollTo(0,document.body.scrollHeight);document.getElementsByName("Ecom_Captcha_Value")[0].focus();' });

                        if (dbCard == 5) {
                            if (card_expiry != "" & ccPin_id != "" & card_name != "" & card_expiry_year != "" & card_no != "" & autoPay == true) {
                                if (flagClick == 1) {
                                    {
                                        chrome.tabs.executeScript(tabId, { code: 'document.getElementById("SubmitBtn").click();' });
                                    }
                                }
                            }
                            flagClick = flagClick + 1;
                        }
                    }
                }
                else if (payMode == "NETBANKING") {

                    if (netBank == 28) {
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("cardselectopt")[1].click();' });
                    }
                    else if (netBank == 29) {
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("cardselectopt")[1].click();' });
                    }
                    else if (netBank == 31) {
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("cardselectopt")[1].click();' });
                    }

                }
                if (tab.url.indexOf('gateway/payment/router.jsp?PaymentID') > -1 & payMode == "DEBIT_CARD") {
                    chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Button_Pay")[0].click();' });
                }

            }


            else if (tab.url.indexOf('ipay.icicibank.com') > -1) {
                if (autoPay == true) {
                    var cc = card_no
                    cc = cc.split("")
                    chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CardNum1")[0].value="' + cc[0] + cc[1] + cc[2] + cc[3] + '";' });
                    chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CardNum2")[0].value="' + cc[4] + cc[5] + cc[6] + cc[7] + '";' });
                    chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CardNum3")[0].value="' + cc[8] + cc[9] + cc[10] + cc[11] + '";' });
                    chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CardNum4")[0].value="' + cc[12] + cc[13] + cc[14] + cc[15] + '";' });
                    chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("NameOnCard")[0].value="' + card_name + '";' });
                    chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("ATMPIN")[0].value="' + ccPin_id + '";' });
                    chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CardTypeSelectBox")[0].selectedIndex ="' + (parseInt(card_type) + 1) + '";' });
                    chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("ExpDtMon")[0].selectedIndex ="' + card_expiry + '";' });
                    chrome.tabs.executeScript(tabId, { code: 'var quota = document.getElementsByName("ExpDtYr")[0]; for (i = 0; i < quota.length; i++) { if (quota[i].value == "' + card_expiry_year + '") { quota.selectedIndex = i; break; } }' });
                    chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CVVNum")[0].value="' + cvv_no + '"' });

                    if (card_expiry != "" & ccPin_id != "" & card_name != "" & card_expiry_year != "" & card_no != "" & cvv_no != "" & autoPay == true) {
                        //  alert();
                        if (flagClick == 0) {
                            chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("btnPay")[0].click();' });
                            flagClick = 1;
                        }
                    }
                }
            }
            else if (tab.url.indexOf('billdesk.com') > -1) {

                if (autoPay == true) {
                    if (payMode == "DEBIT_CARD") {
                        //if (dbCard == 9) {
                        //    chrome.tabs.executeScript(tabId, { code: 'if (document.getElementsByName("txtBankID").length > 0) { document.getElementsByName("txtBankID")[2].click(); }' });

                        //}
                         if (dbCard == 25 || dbCard == 16 || dbCard == 15) {
                            chrome.tabs.executeScript(tabId, { code: 'if (document.getElementsByName("cardselectopt").length > 0) { document.getElementsByName("cardselectopt")[0].click(); }' });
                            chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Ecom_Payment_Pin")[0].value="' + ccPin_id + '";document.getElementsByName("Ecom_Payment_Card_ExpDate_Month")[0].selectedIndex ="' + card_expiry + '";document.getElementsByName("Ecom_Payment_Card_Name")[0].value="' + card_name + '";document.getElementsByName("Ecom_Payment_Card_Number")[0].value="' + card_no + '";var quota = document.getElementsByName("Ecom_Payment_Card_ExpDate_Year")[0]; for (i = 0; i < quota.length; i++) { if (quota[i].value == "' + card_expiry_year + '") { quota.selectedIndex = i; break; } }' });
                            chrome.tabs.executeScript(tabId, { code: 'window.scrollTo(0,document.body.scrollHeight);document.getElementsByName("Ecom_Captcha_Value")[0].focus();' });

                        }
                        else if (dbCard == 19 || dbCard == 9) {
                            chrome.tabs.executeScript(tabId, { code: 'if (document.getElementsByName("txtBankID").length > 0) { document.getElementsByName("txtBankID")[0].click(); }' });
                            chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("cvv2")[0].value="' + ccPin_id + '";document.getElementsByName("expmon")[0].selectedIndex ="' + card_expiry + '";document.getElementsByName("cname2")[0].value="' + card_name + '";document.getElementsByName("cnumber")[0].value="' + card_no + '";var quota = document.getElementsByName("expyr")[0]; for (i = 0; i < quota.length; i++) { if (quota[i].value == "' + card_expiry_year + '") { quota.selectedIndex = i; break; } }' });
                            chrome.tabs.executeScript(tabId, { code: 'window.scrollTo(0,document.body.scrollHeight);document.getElementsByName("Imgver")[0].focus();' });
                            if (dbCard == 9) {
                                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("cvv2")[0].value="' + cvv_no + '"' });
                               // chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("btn-submit")[0].click();' });
                            }
                        }
                    }
                    else if (payMode == "NETBANKING") {
                        if (netBank == 34 || netBank == 37) {
                            chrome.tabs.executeScript(tabId, { code: 'if (document.getElementsByName("txtBankID").length > 0) { document.getElementsByName("txtBankID")[0].click(); }' });
                        }
                        else if (netBank == 48) {
                            chrome.tabs.executeScript(tabId, { code: 'if (document.getElementsByName("txtBankID").length > 0) { document.getElementsByName("txtBankID")[1].click(); }' });
                        }
                    }
                }
            }
                ///////////////////////////Net Banking/////////////////////////
                ///var sbiAssLoginHostNames = ["www.sbbjonline.com", "www.onlinesbh.com", "www.onlinesbm.com", "www.onlinesbp.com", "www.sbtonline.in"];
            else if (tab.url.indexOf('merchant.onlinesbi.com') > -1 || tab.url.indexOf('www.sbbjonline.') > -1 || tab.url.indexOf('www.onlinesbh.') > -1 || tab.url.indexOf('www.onlinesbm.') > -1 || tab.url.indexOf('www.onlinesbp.') > -1 || tab.url.indexOf('www.sbtonline.') > -1) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("userName")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("password")[0].value="' + bankPWD + '";' });
              //  chrome.tabs.executeScript(tabId, { code: 'document.getElementById("Go").click()' });
                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 0)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementById("Button2").click()' });
                    flagClick = 1;
                }
               // chrome.tabs.executeScript(tabId, { code: 'var imK2 = document.getElementsByTagName("A"); for (k = 0; k < imK2.length; k++) { if (imK2[k].innerHTML == "Click here") { imK2[k].click(); break; } }' });

            }
            else if (tab.url.indexOf('www.onlinesbi.com') > -1 && netBank == 10) {

                if (autoPay == true) {
                    chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("sbigroups")[' + SBIAcc + '].click()' });
                    chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Submit")[0].click()' });
                }
            }
            else if (tab.url.indexOf('www.axisbiconnect.co.in') > -1 && netBank == 39) {

                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonCorpId")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonPassword")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 1)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementById("button1").click()' });
                    flagClick = flagClick + 1;
                }
            }
            else if (tab.url.indexOf('shopping.icicibank.com') > -1 && netBank == 44) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("AuthenticationFG.USER_PRINCIPAL")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("AuthenticationFG.ACCESS_CODE")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 0)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Action.VALIDATE_CREDENTIALS")[0].click()' });
                    flagClick = 1;
                }
            }
            else if (tab.url.indexOf('inet.idbibank.co.in') > -1 && netBank == 52) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonCorpId")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonPassword")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 0)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Action.ShoppingMall.Signon")[0].click()' });
                    flagClick = 1;
                }
            }
            else if (tab.url.indexOf('www.indianbank.net.in') > -1 && netBank == 29) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("uid")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("pwd")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 0)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("btClear")[0].click()' });
                    flagClick = 1;
                }
            }
            else if (tab.url.indexOf('netbanking.netpnb.com') > -1 && netBank == 34) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("AuthenticationFG.USER_PRINCIPAL")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'var imK2 = document.getElementsByTagName("input"); for (k = 0; k < imK2.length; k++) { if (imK2[k].type == "password") { imK2[k].value="' + bankPWD + '"; break; } }' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 0)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Action.STU_VALIDATE_CREDENTIALS")[0].click()' });
                    else if (flagClick == 1)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Action.VALIDATE_STU_CREDENTIALS")[0].click()' });
                    flagClick = flagClick + 1;
                }
            }
            else if (tab.url.indexOf('mobile.onlinesbi.com') > -1 && netBank == 51) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CustomerMobileNumber")[0].value="' + CustomerMobileNumber + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CustomerMmid")[0].value="' + CustomerMmid + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Otp")[0].value="' + Otp + '";' });
                if (flagClick == 0) {
                    chrome.tabs.executeScript(tabId, { code: 'var imK2 = document.getElementsByTagName("input"); for (k = 0; k < imK2.length; k++) { if (imK2[k].value == "Submit") { imK2[k].click(); break; } }' });
                    flagClick = 1;
                }
            }
            else if (tab.url.indexOf('www.fednetbank.') > -1 && netBank == 22) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("AuthenticationFG.USER_PRINCIPAL")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("AuthenticationFG.ACCESS_CODE")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 1)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Action.VALIDATE_CREDENTIALS")[0].click()' });
                    flagClick = flagClick + 1;
                }
            }
            else if (tab.url.indexOf('www.unionbankonline.') > -1 && netBank == 28) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonCorpId")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonPassword")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 0)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Action.ShoppingMall.Signon")[0].click()' });
                    flagClick = 1;
                }
            }
            else if (tab.url.indexOf('www.onlineandhrabank.') > -1 && netBank == 31) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonCorpId")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonPassword")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 1)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Action.ShoppingMall.Signon")[0].click()' });
                    flagClick = flagClick + 1;
                }
            }
            else if (tab.url.indexOf('.allbankonline.') > -1 && netBank == 35) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("uid")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("pwd")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 0)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("btClear")[0].click()' });
                    flagClick = 1;
                }
            }
            else if (tab.url.indexOf('.vijayabankonline.') > -1 && netBank == 38) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonCorpId")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonPassword")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 0)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementById("button1").click()' });
                    flagClick = 1;
                }
            }
            else if (tab.url.indexOf('.bobibanking.') > -1 && netBank == 37) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonCorpId")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonPassword")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 1)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Action.Arcot.ShoppingMall.Login.Init")[0].click()' });
                    chrome.tabs.executeScript(tabId, { code: 'document.getElementById("button1").click()' });
                    flagClick = flagClick + 1;
                }
            }
            else if (tab.url.indexOf('.karnatakabank.') > -1 && netBank == 42) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonCorpId")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonPassword")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 1)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementById("button1").click()' });
                    flagClick = flagClick + 1;
                }
            }
            else if (tab.url.indexOf('.obconline.') > -1 && netBank == 43) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("AuthenticationFG.USER_PRINCIPAL")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("AuthenticationFG.ACCESS_CODE")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 0)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Action.STU_VALIDATE_CREDENTIALS")[0].click()' });
                    else if (flagClick == 1)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Action.VALIDATE_STU_CREDENTIALS")[0].click()' });
                    flagClick = flagClick + 1;
                }
            }
            else if (tab.url.indexOf('.kotak.') > -1 && netBank == 46) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("crn")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("password")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 0)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementById("next-step").click()' });
                    flagClick = 1;
                }
            }
            else if (tab.url.indexOf('onlineingvysya.kotak.') > -1 && netBank == 47) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonCorpId")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonPassword")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 0)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementById("button1").click()' });
                    flagClick = 1;
                }
            }
            else if (tab.url.indexOf('.indusind.') > -1 && netBank == 45) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonCorpId")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonPassword")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 0)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementById("submit").click()' });
                    flagClick = 1;
                }
            }
            else if (tab.url.indexOf('.bankofindia.') > -1 && netBank == 48) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonCorpId")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonPassword")[0].value="' + bankPWD + '";' });
                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 1)
                        tab.attach({ contentScript: 'document.getElementById("button3").click()' });
                    //flagClick = 1;
                }
                if (flagClick == 0)
                { tab.attach({ contentScript: 'var imK2 = document.getElementsByTagName("A"); for (k = 0; k < imK2.length; k++) {  if (imK2[k].href.indexOf("BankAwayRetail") > -1) {imK2[k].click();  break; } }' }); }
                flagClick = flagClick + 1;
            }

            else if (tab.url.indexOf('.mahaconnect.') > -1 && netBank == 53) {
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("uid")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("pwd")[0].value="' + bankPWD + '";' });
                chrome.tabs.executeScript(tabId, { code: 'var imK2 = document.getElementsByTagName("IMG"); for (k = 0; k < imK2.length; k++) { if (imK2[k].alt == "Login Retail") { imK2[k].click(); break; } }' });
                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 1)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("btClear")[0].click()' });
                    flagClick = 2;
                }
                flagClick = flagClick + 1;
            }
            else if (tab.url.indexOf('.corpretail.') > -1 && netBank == 56) {

                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("userId1")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("password1")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 0)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Submit")[0].click()' });
                    flagClick = 1;
                }
            }
            else if (tab.url.indexOf('.onlinesbiglobal.') > -1 && netBank == 64) {

                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonCorpId")[0].value="' + bankUID + '";' });
                chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("CorporateSignonPassword")[0].value="' + bankPWD + '";' });

                if (bankPWD != "" & bankUID != "" & autoPay == true) {
                    if (flagClick == 0)
                        chrome.tabs.executeScript(tabId, { code: 'document.getElementsByName("Action.ShoppingMall.Signon")[0].click()' });
                    flagClick = 1;
                }
            }
        }
    }
});

chrome.tabs.onRemoved.addListener(function (tab, removeInfo) {

    if (tTabId == tab) {
        isValid = 0;
    }
});

var myRailinfoIDLL = "";

