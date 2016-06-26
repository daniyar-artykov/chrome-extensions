
var captchaseconds = 0;
var millisSince1Jan1970 = 0;;
var irTime = "";
var timerCount=0;
function showIRCTCClock() {
    $("li").each(function () {
        if ($(this).text().indexOf("IST]") > 0) {
            if (timerCount == 1) {               
                console.log($(this).text());
                var anchorHoldingTime = $(this).text().trim();
                var dateMatcherRegEx = /(\d{2}-[A-Z][a-z]{2}-\d{4}) \[(\d{2}:\d{2}:\d{2}) ((GMT\+05:30)|(IST))\]/g;
                var matches = dateMatcherRegEx.exec(anchorHoldingTime);
                var capturedTime = new Date(anchorHoldingTime.replace(/\[|\]|IST|GMT\+05:30/g, '').replace(/-/g, ' '));
                millisSince1Jan1970 = capturedTime.getTime();
                // $(".header").append('<div id="tatkalnowtime" style="background-color: green; width: 180px; color: white; font-size: 30px;position:static; top:0; right:0;margin:10px;margin-top:50px">' + new Date(millisSince1Jan1970).toLocaleTimeString() + '</div>');
                $("#bluemenu > ul").append('<li><div id="tatkalnowtime" style="background-color: green; width: 180px; color: white; font-size: 30px;position:fixed;top:0;right:0">' + new Date(millisSince1Jan1970).toLocaleTimeString() + '</div></li>');
                setInterval(function () {
                    console.log($("#tatkalnowtime").text());
                    millisSince1Jan1970 += 1000;
                    $("#tatkalnowtime").text(new Date(millisSince1Jan1970).toLocaleTimeString());                   
                }, 1000);

            }
            timerCount = timerCount + 1;
        }
    });

    // if (document.title == "Book Ticket - Passengers Information") {        
    //    $("body").append('<div id="anu-dialog" data-role="popup" title="Please confirm captcha" style="visibility: hidden"><img id="anu-img-captcha1" style="visibility: hidden" /></div>');
        
    //}

    
   
}
showIRCTCClock();


if (document.title == "Journey Planner") {
    window.addEventListener("keydown", function (event) {
        if (event.keyCode == 77 && event.ctrlKey) {
            alert("Click on class manually, Book Now will click automatically !!!")
        }
    });
}

if (document.title == "Book Ticket - Passengers Information") {
    $('#bkg_captcha').height(100);
    $("input[name='j_captcha']").css("font-size", "30px")
    $("input[name='j_captcha']").width(150);
    window.scrollTo(0, document.body.scrollHeight);
}
else if (document.title == "IRCTC Next Generation eTicketing System") {
    $('#cimage').height(80);
    //$("input[name='j_captcha']").css("font-size", "20px")  
    $("body").append('<div id="anu-dialog" data-role="popup" title="Please confirm captcha" style="visibility: hidden"><img id="anu-img-captcha1" style="visibility: hidden" /></div>');
   
}


if (document.title == "logout") {
    window.location = "http://www.amazon.in/?tag=prmady-21";
}



var ProductName;

if (document.URL.indexOf('.amazon.') > -1) {  
    
    try {
        ProductName = document.getElementById("productTitle").innerText;        
        
        $('header').css("margin-top", "43px");
        $('#navbar').css("margin-top", "43px");
        $('#navbar').css("margin-top", "43px!important");
        $('body').css("margin-top", "43px");
        $("body").before("<div style='top: 0px;left:0px;background: linear-gradient(rgb(255, 214, 94) 0%, rgb(254, 191, 4) 100%); height:40px; position:fixed; text-align:center; width:100%; padding-top:2px; font-size:13px; font-family:helvetica,arial; vertical-align:baseline; '><div><span style=' font-size:16px; font-weight:bold'>COMPARE PRICE BEFORE YOU BUY THIS PRODUCT </span><a id='flipkartURL' target='_blank' href='http://shopping.myrailinfo.in/redirct.html?red=http://www.flipkart.com?affid=pritiyada' style=' text-decoration:none'><input type='button' value='Flipkart' style='cursor:pointer;border-radius: 4px; background: linear-gradient(rgb(250, 251, 252) 0%, rgb(239, 243, 245) 50%, rgb(229, 234, 237) 51%, rgb(249, 250, 251) 100%);margin-top: 3px;font-weight: bold; padding: 0px 11px;height: 30px;border: 1px solid rgb(221, 221, 221);' /></a> or<a id='amazonURL' target='_blank' href='http://shopping.myrailinfo.in/redirct.html?red=http://www.amazon.in/?tag=prmady-21' style=' text-decoration:none'><input type='button' value='Amazon' style='cursor:pointer;border-radius: 4px; background: linear-gradient(rgb(250, 251, 252) 0%, rgb(239, 243, 245) 50%, rgb(229, 234, 237) 51%, rgb(249, 250, 251) 100%);margin-top: 3px;font-weight: bold; padding: 0px 11px;height: 30px;border: 1px solid rgb(221, 221, 221);' /></a> or <a id='snapdealURL' target='_blank' href='http://shopping.myrailinfo.in/redirct.html?red=http://www.snapdeal.com?aff_id=77871' style=' text-decoration:none'><input type='button' value='Snapdeal' style='cursor:pointer;border-radius: 4px; background: linear-gradient(rgb(250, 251, 252) 0%, rgb(239, 243, 245) 50%, rgb(229, 234, 237) 51%, rgb(249, 250, 251) 100%);margin-top: 3px;font-weight: bold; padding: 0px 11px;height: 30px;border: 1px solid rgb(221, 221, 221);' /></a></div></div>");


        document.getElementById("amazonURL").href = "http://shopping.myrailinfo.in/redirct.html?red=http://www.amazon.in/s/ref=nb_sb_noss?url=search-alias%3Dwatches&field-keywords=" + ProductName + "&tag=prmady-21";
        document.getElementById("flipkartURL").href = "http://shopping.myrailinfo.in/redirct.html?red=http://www.flipkart.com/search?q=" + ProductName + "&as=off&as-show=on&otracker=start&affid=pritiyada";
        document.getElementById("snapdealURL").href = "http://shopping.myrailinfo.in/redirct.html?red=http://www.snapdeal.com/search?keyword=" + ProductName + "&santizedKeyword=&categoryId=&suggested=false&vertical=&noOfResults=20&clickSrc=go_header&lastKeyword=&prodCatId=&changeBackToAll=false&foundInAll=false&aff_id=77871";
    }
    catch (err) {
       
        document.getElementById("amazonURL").href = "http://shopping.myrailinfo.in/redirct.html?red=http://www.amazon.in/?tag=prmady-21";
    }
}

else if (document.URL.indexOf('.flipkart.') > -1 || document.URL.indexOf('.snapdeal.') > -1) {
    
    try {
         ProductName = $("h1[itemprop='name']").text();

        
         console.log(ProductName)

         if (ProductName.length != 0) {

             $('body').css("margin-top", "43px");
             $("body").before("<div style='top: 0px;left:0px;background: linear-gradient(rgb(255, 214, 94) 0%, rgb(254, 191, 4) 100%); height:40px; position:fixed; text-align:center; width:100%; padding-top:2px; font-size:13px; font-family:helvetica,arial; vertical-align:baseline; '><div><span style=' font-size:16px; font-weight:bold'>COMPARE PRICE BEFORE YOU BUY THIS PRODUCT </span><a id='flipkartURL' target='_blank' href='http://www.flipkart.com?affid=pritiyada' style=' text-decoration:none'><input type='button' value='Flipkart' style='cursor:pointer;border-radius: 4px; background: linear-gradient(rgb(250, 251, 252) 0%, rgb(239, 243, 245) 50%, rgb(229, 234, 237) 51%, rgb(249, 250, 251) 100%);margin-top: 3px;font-weight: bold; padding: 0px 11px;height: 30px;border: 1px solid rgb(221, 221, 221);' /></a> or<a id='amazonURL' target='_blank' href='http://www.amazon.in/?tag=prmady-21' style=' text-decoration:none'><input type='button' value='Amazon' style='cursor:pointer;border-radius: 4px; background: linear-gradient(rgb(250, 251, 252) 0%, rgb(239, 243, 245) 50%, rgb(229, 234, 237) 51%, rgb(249, 250, 251) 100%);margin-top: 3px;font-weight: bold; padding: 0px 11px;height: 30px;border: 1px solid rgb(221, 221, 221);' /></a> or <a id='snapdealURL' target='_blank' href='http://www.snapdeal.com?aff_id=77871' style=' text-decoration:none'><input type='button' value='Snapdeal' style='cursor:pointer;border-radius: 4px; background: linear-gradient(rgb(250, 251, 252) 0%, rgb(239, 243, 245) 50%, rgb(229, 234, 237) 51%, rgb(249, 250, 251) 100%);margin-top: 3px;font-weight: bold; padding: 0px 11px;height: 30px;border: 1px solid rgb(221, 221, 221);' /></a></div></div>");
             document.getElementById("amazonURL").href = "http://shopping.myrailinfo.in/redirct.html?red=http://www.amazon.in/s/ref=nb_sb_noss?url=search-alias%3Dwatches&field-keywords=" + ProductName + "&tag=prmady-21";
             document.getElementById("flipkartURL").href = "http://shopping.myrailinfo.in/redirct.html?red=http://www.flipkart.com/search?q=" + ProductName + "&as=off&as-show=on&otracker=start&affid=pritiyada";
             document.getElementById("snapdealURL").href = "http://shopping.myrailinfo.in/redirct.html?red=http://www.snapdeal.com/search?keyword=" + ProductName + "&santizedKeyword=&categoryId=&suggested=false&vertical=&noOfResults=20&clickSrc=go_header&lastKeyword=&prodCatId=&changeBackToAll=false&foundInAll=false&aff_id=77871";
             //fk-mainhead-id
             $('#fk-mainhead-id').css("position", "relative");
         }
    }

    
    catch (err) {
        console.log(err)
        
    }
}

