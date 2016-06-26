
document.getElementById('Button1').onclick = function () {
    var quota = document.getElementsByName("quota")
    for (i = 0; i < quota.length; i++) {
        if (quota[i].checked == true) {
            quota = quota[i].value
            break;
        }
    }

    
    
    var additionalInfo = {
        "j_username": CryptoJS.AES.encrypt(document.getElementsByName("j_username")[0].value, "j_username").toString(),
        "j_password": CryptoJS.AES.encrypt(document.getElementsByName("j_password")[0].value, "j_password").toString(),
        "from": document.getElementsByName("jpform:fromStation")[0].value,
        "to": document.getElementsByName("jpform:toStation")[0].value,
        "date": document.getElementsByName("jpform:journeyDateInputDate")[0].value,
        "a1": document.getElementsByName("addPassengerForm:psdetail:0:psgnName")[0].value,
        "a2": document.getElementsByName("addPassengerForm:psdetail:0:psgnAge")[0].value,
        "a3": document.getElementsByName("addPassengerForm:psdetail:0:psgnGender")[0].selectedIndex,
        "a4": document.getElementsByName("addPassengerForm:psdetail:0:berthChoice")[0].value,
        "b1": document.getElementsByName("addPassengerForm:psdetail:1:psgnName")[0].value,
        "b2": document.getElementsByName("addPassengerForm:psdetail:1:psgnAge")[0].value,
        "b3": document.getElementsByName("addPassengerForm:psdetail:1:psgnGender")[0].selectedIndex,
        "b4": document.getElementsByName("addPassengerForm:psdetail:1:berthChoice")[0].value,
        "c1": document.getElementsByName("addPassengerForm:psdetail:2:psgnName")[0].value,
        "c2": document.getElementsByName("addPassengerForm:psdetail:2:psgnAge")[0].value,
        "c3": document.getElementsByName("addPassengerForm:psdetail:2:psgnGender")[0].selectedIndex,
        "c4": document.getElementsByName("addPassengerForm:psdetail:2:berthChoice")[0].value,
        "d1": document.getElementsByName("addPassengerForm:psdetail:3:psgnName")[0].value,
        "d2": document.getElementsByName("addPassengerForm:psdetail:3:psgnAge")[0].value,
        "d3": document.getElementsByName("addPassengerForm:psdetail:3:psgnGender")[0].selectedIndex,
        "d4": document.getElementsByName("addPassengerForm:psdetail:3:berthChoice")[0].value,
        "e1": document.getElementsByName("addPassengerForm:psdetail:4:psgnName")[0].value,
        "e2": document.getElementsByName("addPassengerForm:psdetail:4:psgnAge")[0].value,
        "e3": document.getElementsByName("addPassengerForm:psdetail:4:psgnGender")[0].selectedIndex,
        "e4": document.getElementsByName("addPassengerForm:psdetail:4:berthChoice")[0].value,
        "f1": document.getElementsByName("addPassengerForm:psdetail:5:psgnName")[0].value,
        "f2": document.getElementsByName("addPassengerForm:psdetail:5:psgnAge")[0].value,
        "f3": document.getElementsByName("addPassengerForm:psdetail:5:psgnGender")[0].selectedIndex,
        "f4": document.getElementsByName("addPassengerForm:psdetail:5:berthChoice")[0].value,
        "quota": quota,
        "a5": document.getElementsByName("addPassengerForm:psdetail:0:foodChoice")[0].selectedIndex,
        "a6": document.getElementsByName("addPassengerForm:psdetail:0:idCardType")[0].value,
        "a7": document.getElementsByName("addPassengerForm:psdetail:0:idCardNumber")[0].value,
        "a8": document.getElementsByName("addPassengerForm:psdetail:0:concessionOpt")[0].checked,
        "b5": document.getElementsByName("addPassengerForm:psdetail:1:foodChoice")[0].selectedIndex,
        "b6": document.getElementsByName("addPassengerForm:psdetail:1:idCardType")[0].value,
        "b7": document.getElementsByName("addPassengerForm:psdetail:1:idCardNumber")[0].value,
        "b8": document.getElementsByName("addPassengerForm:psdetail:1:concessionOpt")[0].checked,
        "c5": document.getElementsByName("addPassengerForm:psdetail:2:foodChoice")[0].selectedIndex,
        "c6": document.getElementsByName("addPassengerForm:psdetail:2:idCardType")[0].value,
        "c7": document.getElementsByName("addPassengerForm:psdetail:2:idCardNumber")[0].value,
        "c8": document.getElementsByName("addPassengerForm:psdetail:2:concessionOpt")[0].checked,
        "d5": document.getElementsByName("addPassengerForm:psdetail:3:foodChoice")[0].selectedIndex,
        "d6": document.getElementsByName("addPassengerForm:psdetail:3:idCardType")[0].value,
        "d7": document.getElementsByName("addPassengerForm:psdetail:3:idCardNumber")[0].value,
        "d8": document.getElementsByName("addPassengerForm:psdetail:3:concessionOpt")[0].checked,
        "e5": document.getElementsByName("addPassengerForm:psdetail:4:foodChoice")[0].selectedIndex,
        "e6": document.getElementsByName("addPassengerForm:psdetail:4:idCardType")[0].value,
        "e7": document.getElementsByName("addPassengerForm:psdetail:4:idCardNumber")[0].value,
        "e8": document.getElementsByName("addPassengerForm:psdetail:4:concessionOpt")[0].checked,
        "f5": document.getElementsByName("addPassengerForm:psdetail:5:foodChoice")[0].selectedIndex,
        "f6": document.getElementsByName("addPassengerForm:psdetail:5:idCardType")[0].value,
        "f7": document.getElementsByName("addPassengerForm:psdetail:5:idCardNumber")[0].value,
        "f8": document.getElementsByName("addPassengerForm:psdetail:5:concessionOpt")[0].checked,
        "g1": document.getElementsByName("addPassengerForm:childInfoTable:0:infantName")[0].value,
        "g2": document.getElementsByName("addPassengerForm:childInfoTable:0:infantAge")[0].selectedIndex,
        "g3": document.getElementsByName("addPassengerForm:childInfoTable:0:infantGender")[0].selectedIndex,
        "h1": document.getElementsByName("addPassengerForm:childInfoTable:1:infantName")[0].value,
        "h2": document.getElementsByName("addPassengerForm:childInfoTable:1:infantAge")[0].selectedIndex,
        "h3": document.getElementsByName("addPassengerForm:childInfoTable:1:infantGender")[0].selectedIndex,
        "autoUpgrade":document.getElementsByName("addPassengerForm:autoUpgrade")[0].checked,
        "confirmBirth":document.getElementsByName("addPassengerForm:onlyConfirmBerths")[0].checked,
        "phone": CryptoJS.AES.encrypt(document.getElementsByName("addPassengerForm:mobileNo")[0].value, "phone").toString(),
        "payMode": document.getElementById("ddlPaymentMode").options[document.getElementById("ddlPaymentMode").selectedIndex].value,
        "netBank": document.getElementById("jpBook:bankINBList").options[document.getElementById("jpBook:bankINBList").selectedIndex].value,
        "dbCard":  document.getElementById("jpBook:bankDCList").options[document.getElementById("jpBook:bankDCList").selectedIndex].value,
        "card_type": document.getElementById("card_type_id").selectedIndex,
        "card_no": CryptoJS.AES.encrypt(document.getElementById("card_no_id").value, "card_no").toString(),
        "card_expiry": document.getElementById("card_expiry_mon_id").selectedIndex,
        "cvv_no": CryptoJS.AES.encrypt(document.getElementById("cvv_no_id").value, "cvv_no").toString(),
        "ccPin_id": CryptoJS.AES.encrypt(document.getElementById("ccPin_id").value, "ccPin_id").toString(),
        "card_name": document.getElementById("card_name_id").value,
        "card_expiry_year": document.getElementById("card_expiry_year_id").value,
        "ccBankName": document.getElementById("jpBook:bankPGList").options[document.getElementById("jpBook:bankPGList").selectedIndex].value,
        "trainNo":document.getElementById("txttrainNo").value,
        "jclass": document.getElementById("ddlClass").options[document.getElementById("ddlClass").selectedIndex].text,
        "isValid": document.getElementById("txtHid").value,
        "test": document.getElementById("txttest").value,
        "autoSearch":document.getElementById("chkAutoSearch").checked,
        "autoPay": document.getElementById("chkAutoPay").checked,
        "bookDate": document.getElementById("txtHbookDate").value,
        "bookDate1": document.getElementById("txtHbookDate1").value,
        "brPoint": document.getElementById("boardingStation").value,
        "bankUID": CryptoJS.AES.encrypt(document.getElementById("bankUID").value, "bankUID").toString(),
        "bankPWD": CryptoJS.AES.encrypt(document.getElementById("bankPWD").value, "bankPWD").toString(),
        "SBIAcc": document.getElementById("ddlSBIASS").selectedIndex,
        "CustomerMobileNumber": CryptoJS.AES.encrypt(document.getElementById("txtCustomerMobileNumber").value, "CustomerMobileNumber").toString(),
        "CustomerMmid": CryptoJS.AES.encrypt(document.getElementById("txtCustomerMmid").value, "CustomerMmid").toString(),
        "Otp": document.getElementById("txtOtp").value
    };
    
    
    chrome.runtime.connect().postMessage(additionalInfo);
};

var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isChrome = !!window.chrome;              // Chrome 1+
var isIE = /*@cc_on!@*/false || !!document.documentMode;   // At least IE6

myA = document.getElementById("linDownload");

myA.innerHTML = "Chrome Plugin Installed";
myA.style.borderColor = "green";


